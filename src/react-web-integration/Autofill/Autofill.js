/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */
import UserEventsService from "../lib/User/UserEventsService";
import InFormFieldSelector from "../lib/InForm/InFormFieldSelector";
import InFormCallToActionField from "../lib/InForm/InFormCallToActionField";

/**
 * Fill the login form.
 *
 * @param {Object} formData
 * - {string} loginUsername The username to use
 * - {string} secret The password to use
 * - {string} url to get domain
 */
const fillForm = function(formData) {
  try {
    // Validate the fillForm parameters
    validateData(formData);

    // Check the requested document, current active document is initiated from same origin
    if (!isRequestInitiatedFromSameOrigin(formData.url, document.location.origin)) {
      throw new Error('The request is not initiated from same origin');
    }

    // Get password element
    const passwordElement = getPasswordElement();
    let usernameElement = null;
    /*
     * If password element exists
     * Get username element by using `password's` parent element as reference
     */
    if (passwordElement !== null) {
      usernameElement = getUsernameElementBasedOnPasswordElement(formData, passwordElement.parentElement);
      // If username element exists, fill username
      if (usernameElement !== null) {
        UserEventsService.autofill(usernameElement, formData.username);
      }
      // Fill password
      UserEventsService.autofill(passwordElement, formData.secret);
    } else {
      /*
       * When no password element found on the page
       * Check for the username element by giving `document` as reference
       */
      usernameElement = getUsernameElement(formData, document);
      // If username element exists, fill username
      if (usernameElement !== null) {
        UserEventsService.autofill(usernameElement, formData.username);
      } else {
        throw new Error('Unable to find the username element on this page.');
      }
    }
    // Throw an error when no password and username elements found on the page
    if (passwordElement === null && usernameElement === null) {
      throw new Error('Unable to find the input elements on this page.');
    } else {
      // Success message
      port.emit(formData.requestId, 'SUCCESS');
    }
  } catch (error) {
    console.error(error);
    port.emit(formData.requestId, 'ERROR', {name: "Error", message: error.message});
  }
};

/**
 * Check the requested document, top document and an iframe form is initiated from same domain.
 *
 * @param {string} requestedUrl The requested document url
 * @param {string} documentUrl The current active document url
 * @return {Boolean} true
 */
const isRequestInitiatedFromSameOrigin = function(requestedUrl, documentUrl) {
  try {
    // requestedUrl - from quickaccess
    const parsedRequestedUrl = new URL(requestedUrl);
    // Request initiated document origin
    const requestedOrigin = parsedRequestedUrl.origin;
    // documentUrl - from current active page
    const parsedDocumentUrl = new URL(documentUrl);
    // Top level document/an iframe document origin
    const documentOrigin = parsedDocumentUrl.origin;

    // Requested document and top/iframe document origin is same
    return requestedOrigin === documentOrigin;
  } catch (error) {
    console.error(error);
    // Empty url or about:blank should not block all the process of autofill
    return false;
  }
};

/**
 * Validate the fillForm parameters
 * @param {object} formData
 * - {string} username The autofill request username parameter
 * - {string} secret The autofill request secret parameter
 *  - {url} url The autofill request url parameter
 */
const validateData = function(formData) {
  const {username, secret, url} = formData;
  if (typeof username !== 'string') {
    throw new Error('The parameter username is not valid');
  }
  if (typeof secret !== 'string') {
    throw new Error('The parameter secret is not valid');
  }
  if (typeof url !== 'string') {
    throw new Error('The parameter url is not valid');
  }
};

/**
 * Get input elements from an iframe
 * @param {string} type - either `password` or `username` to find elements
 * @param {Object} formData - to check same origin request
 */
const getInputElementFromIframe = function(type, formData) {
  const iframes = document.querySelectorAll("iframe");
  let inputElement = null;
  for (const iframe of iframes) {
    // Get accessible iframe document
    const contentDocument = getAccessedIframeContentDocument(iframe);
    if (!contentDocument) {
      /*
       * The iframe document is not accessible.
       * It is the case when the iframe is protected by CSP.
       */
      continue;
    } else {
      /*
       * Proceed to search input elements in the iframe document
       * When it's accessible cross check whether the iframe is requested from same origin.
       */
      if (isRequestInitiatedFromSameOrigin(formData.url, contentDocument.location.origin)) {
        inputElement = findInputElementInIframe(type, contentDocument);
        if (inputElement || '') {
          break;
        }
      }
    }
  }
  return inputElement;
};

/**
 * Returns an accessible iframe document in the page
 * @param {DomElement} iframe found on the page
 * @return {DomElement} iframe document
 */
const getAccessedIframeContentDocument = function(iframe) {
  let iframeContentDocument = null;
  try {
    iframeContentDocument = iframe.contentDocument;
  } catch (error) {
    console.error(error);
  }
  return iframeContentDocument;
};

/**
 * Returns an input element in the iframe
 * @param {string} type - either `password` or `username` to find elements
 * @param {DomElement} iframe document to start the search.
 * @return {DomElement} iframe document
 */
const findInputElementInIframe = function(type, iframeDocument) {
  let inputElement = null;
  if (type === 'password') {
    inputElement = iframeDocument.querySelectorAll(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);
    //  Password element has been found.
    if (inputElement.length) {
      return inputElement[0];
    }
  } else if (type === 'username') {
    inputElement = iframeDocument.querySelectorAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
    if (inputElement.length) {
      // When username element found, extract it from an array of dom elements.
      inputElement = extractUsernameElementWithFallback(inputElement);
      //  Username element has been found.
      if (inputElement) {
        return inputElement;
      }
    }
  }
  return null;
};

/**
 * Find the password element on the page.
 * @return {HTMLInputElement/null}
 */
const getPasswordElement = function() {
  const passwordElements = InFormCallToActionField.findAll(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);

  // A password element has been found.
  if (passwordElements.length) {
    for (const passwordElement of passwordElements) {
      if (passwordElement.offsetWidth > 0) {
        return passwordElement;
      }
    }
  }
  // If all passwords are hidden return null to autofill only the username input (PB-20173)
  return null;
};

/**
 * Find the username element on the page based on password's parent as reference element.
 * @param {DomElement} referenceElement The element reference to start the search.
 * @return {HTMLInputElement/null}
 */
const getUsernameElementBasedOnPasswordElement = function(formData, referenceElement) {
  // No parent element found.
  if (referenceElement || '') {
    const parentElement = referenceElement.parentElement;
    if (!parentElement) {
      return null;
    }
  }

  let usernameElement = null;

  // The username field can be an input field of type email or text.
  const elements = referenceElement.querySelectorAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);

  /*
   * No input fields found in the reference element.
   * Search in the parent.
   */
  if (!elements.length) {
    return getUsernameElementBasedOnPasswordElement(formData, referenceElement.parentElement);
  } else {
    // When username element found, extract it from an array of dom elements.
    usernameElement = extractUsernameElementWithFallback(elements);
  }

  /*
   * If no username/email element found on the page, the login form could be served by an iframe.
   * Search the username/email element in the page iframes. By instance reddit.com signup page serves its login
   * form in an iframe.
   */
  if (!usernameElement) {
    usernameElement = getInputElementFromIframe('username', formData);
  }

  // A username element has been found.
  return usernameElement;
};

/**
 * Find the username element on the page.
 * @param {DomElement} fallbackUsernameElement The element reference to start the search.
 * @return {HTMLInputElement/null}
 */
const getUsernameElement = function(formData, fallbackUsernameElement) {
  let usernameElement = null;

  // The username field can be an input field of type email or text.
  const elements = fallbackUsernameElement.querySelectorAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);

  // When username element found, extract it from an array of dom elements.
  if (elements.length) {
    usernameElement = extractUsernameElementWithFallback(elements);
  } else {
    /*
     * If no username/email element found on the page, the login form could be served by an iframe.
     * Search the username/email element in the page iframes. By instance reddit.com signup page serves its login
     * form in an iframe.
     */
    usernameElement = getInputElementFromIframe('username', formData);
  }

  // A username element has been found.
  return usernameElement;
};

/**
 * Extract the username element from an array of dom elements.
 * @param {array} elements An array of dom elements
 * @return {DomElement/null}
 */
const extractUsernameElementWithFallback = function(elements) {
  let usernameElement = null;
  // Filter elements to find the field that has the highest odd to be the username field.
  const inputAttributes = ['id', 'class', 'name', 'placeholder'];
  // @todo Translations should be added in order to increase the algorithm success.
  const inputAttrValues = ['user', 'email', 'name', 'login'];

  // Iterate over visible input list to find the matching input based on filter elements.
  foundBreakPoint: {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      for (let j = 0; j < inputAttributes.length; j++) {
        for (let k = 0; k < inputAttrValues.length; k++) {
          const matchedInput = element.querySelectorAll(`input[${inputAttributes[j]}*='${inputAttrValues[k]}' i]`);
          if (matchedInput.length) {
            usernameElement = matchedInput[0];
            break foundBreakPoint;
          }
        }
      }
    }
  }

  // When filters fail to find matched elements on the page, use first element from an array of dom elements as username element
  if (!usernameElement) {
    usernameElement = elements[0];
  }

  // Return either matched username element based on filters or fallback element
  return usernameElement;
};

export const Autofill = {fillForm};
