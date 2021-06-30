/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 *
 */

import {v4 as uuidv4} from "uuid";
import DomUtils from "../Dom/DomUtils";

/**
 * An InFormField is represented by a DOM element identified as an username field and to which
 * in-form call-to-action and/or menu can be attached
 */
class InFormField {

  /**
   * Retrieve all the DOM elements which can be an in-form username fields
   */
  static findAll(selector) {
    const domFields =  Array.from(document.querySelectorAll(selector));
    const iframesFields = InFormField.findAllInIframes(selector);
    return domFields.concat(iframesFields);
  }

  /**
   * Retrieve all the iframes elements which can be an in-form username fields
   * @return {*}
   */
  static findAllInIframes(selector) {
    const iframes = DomUtils.getAccessibleAndSameDomainIframes();
    const queryMapper = iframe => Array.from(iframe.contentDocument.querySelectorAll(selector));
    return iframes
      .map(queryMapper)
      .flat();
  }

  /** The field to which the in-form is attached */
  field;

  /** An unique identifier for the field */
  fieldId;

  /** The scrollable field parent */
  scrollableFieldParent;

  /** Flag telling if the user is mousing over the call-to-action (iframe) */
  isCallToActionMousingOver;

  /** In-form call-to-action click watcher */
  callToActionClickWatcher;

  /**
   * Default constructor
   * @param field
   */
  constructor(field) {
    this.field = field;
    this.fieldId = uuidv4();
    this.scrollableFieldParent = null;
    this.isCallToActionMousingOver = false;
    this.bindCallbacks();
    this.handleInsertionEvent();
    this.handleRemoveEvent();
    this.handleScrollEvent();
  }

  /**
   * Binds methods callbacks
   */
  bindCallbacks() {
    this.insertInformCallToActionIframe = this.insertInformCallToActionIframe.bind(this);
    this.removeInFormCallToActionWhenMouseOut = this.removeInFormCallToActionWhenMouseOut.bind(this);
    this.removeInFormCallToAction = this.removeInFormCallToAction.bind(this);
    this.removeCallToActionIframe = this.removeCallToActionIframe.bind(this);
    this.destroy = this.destroy.bind(this);
  }


  /** CALL-TO-ACTION INSERTION */

  /**
   * Whenever the call-to-action must be inserted
   */
  handleInsertionEvent() {
    if (document.activeElement === this.field) {
      this.insertInformCallToActionIframe();
    }
    this.field.addEventListener("mouseover", this.insertInformCallToActionIframe);
    this.field.addEventListener("focus",  this.insertInformCallToActionIframe);
  }

  /**
   * Insert an in-form call-to-action iframe
   */
  insertInformCallToActionIframe() {
    const iframes = document.querySelectorAll('iframe');
    // Use of Array prototype some method cause NodeList is not an array !
    const iframeId =  this.fieldId;
    const isIframeAlreadyInserted = Array.prototype.some.call(iframes, iframe => iframe.id === iframeId);
    if (!isIframeAlreadyInserted) {
      const iframe = this.createCallToActionIframe();
      this.handleCallToActionClicked(iframe);
    }
  }

  /**
   * Create an iframe dedicated to the call-to-action
   * @return {HTMLIFrameElement} The created iframe
   */
  createCallToActionIframe() {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const browserExtensionUrl = chrome.runtime.getURL("/");
    const {top, left} = this.calculateFieldPosition();
    iframe.id = this.fieldId;
    iframe.style.position = "fixed";
    iframe.style.top = top + 'px'
    iframe.style.left =  left + 'px';
    iframe.style.border = 0;
    iframe.style.width = '16px';
    iframe.style.height = '16px';
    iframe.style.zIndex = "1000";  // For you Yahoo with love
    iframe.contentWindow.location = `${browserExtensionUrl}data/passbolt-iframe-in-form-call-to-action.html?passbolt=passbolt-iframe-in-form-call-to-action`;
    return iframe;
  }

  /**
   * Calculates the position on the screen of the DOM field
   * @return {{top: number, left: number}}
   */
  calculateFieldPosition() {
    let x = 0;
    let y = 0;
    let currentElement = this.field;
    const {height, width} = this.field.getBoundingClientRect();
    const {top: topBody, left: leftBody} = document.body.getBoundingClientRect();
    // We loop to calculate the cumulated position of the field
    // from its ancestors and itself differential offset / scroll position
    while( currentElement && !isNaN( currentElement.offsetLeft ) && !isNaN( currentElement.offsetTop ) ) {
      x += currentElement.offsetLeft - currentElement.scrollLeft;
      y += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent;
    }
    // Then we add the body offset (notably in case of window scroll) + some local adjustments (margin / vertical aligment )
    x = x + leftBody + width - 25;
    y = y + topBody + Math.floor(height / 2) - 8; // Calculate the middle position of the input, 8 is the half of the iframe height
    return { top: y, left: x };
  }


  /**
   * Whenever the user clicked on the call-to-action iframe
   * @param iframe The call-to-action iframe
   */
  handleCallToActionClicked(iframe) {
    /* In case of click on iframe, the field lose the focus. Since it loses the focus, the iframe is removed.
     * And so the call-to-action. So, we need to restore the focus on the input. In case, it did not have
     * previously the focus, no matter since a click on the call-to-action should be a way to focus on the input
     */
    this.callToActionClickWatcher = setInterval(() => {
      // Check if a click has been applied on some iframe
      const elem = document.activeElement;
      if (elem && elem.tagName == 'IFRAME' && elem.id === this.fieldId) {
        this.field.focus();
        clearInterval(this.callToActionClickWatcher);
      }
    }, 100);
    /* We need to know which iframe the user click on. We cannot add a listener on iframe
     * since there are from different domains (target page vs extension pagemods)
     */
    iframe.addEventListener('mouseover', () => this.isCallToActionMousingOver = true);
    iframe.addEventListener('mouseout', () => this.isCallToActionMousingOver = false);
  }

  /** CALL-TO-ACTION REMOVE */

  /**
   * Whenever the call-to-action must be removed
   */
  handleRemoveEvent() {
    this.field.addEventListener("mouseout", this.removeInFormCallToActionWhenMouseOut);
    this.field.addEventListener("blur",  this.removeInFormCallToAction);
  }

  /**
   * Removes the in-form call-to-action iframe from the username field
   */
  removeInFormCallToAction() {
    const isUsernameIframeMouseOver = this.isCallToActionMousingOver;
    const isActiveElementAnAuthenticationField = document.activeElement === this.field;
    if (!isUsernameIframeMouseOver && !isActiveElementAnAuthenticationField) {
      this.removeCallToActionIframe();
    }
  }

  /**
   * Removes the call-to-action iframe from the username field when one moused out
   * @param event The mouse-out event
   */
  removeInFormCallToActionWhenMouseOut(event) {
    const isNotCallToActionIframe = event.relatedTarget && event.relatedTarget.id !== this.fieldId;
    const isActiveElementAnAuthenticationField = document.activeElement === this.field;
    if (isNotCallToActionIframe && !isActiveElementAnAuthenticationField) {
      this.removeCallToActionIframe();
    }
  }

  /**
   * Remove the call-to-action (iframe)
   */
  removeCallToActionIframe() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const identifierToMatch = this.fieldId;
      if (iframe.id === identifierToMatch) {
        iframe.parentNode.removeChild(iframe);
      }
    });
  }

  /** SCROLL REPOSITION */

  /**
   * Whenever the user scrolls the page
   */
  handleScrollEvent() {
    // Remove the call-to-action
    this.scrollableFieldParent = DomUtils.getScrollParent(this.field);
    this.scrollableFieldParent.addEventListener('scroll', this.removeCallToActionIframe);
  }

  /** DESTROY */

  /**
   * Remove all listener and iframe to clean the page and avoid issue on extension update
   */
  destroy() {
    this.field.removeEventListener("mouseover", this.insertInformCallToActionIframe);
    this.field.removeEventListener("focus",  this.insertInformCallToActionIframe);
    this.field.removeEventListener("mouseout", this.removeInFormCallToActionWhenMouseOut);
    this.field.removeEventListener("blur",  this.removeInFormCallToAction);
    this.scrollableFieldParent.removeEventListener('scroll', this.removeCallToActionIframe);
    this.removeCallToActionIframe();
  }
}

export default InFormField;


