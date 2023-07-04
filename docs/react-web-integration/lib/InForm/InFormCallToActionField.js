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

import {v4 as uuidv4} from "uuid";
import DomUtils from "../Dom/DomUtils";
import browser from "webextension-polyfill";

/**
 * An InFormCallToActionField is represented by a DOM element identified as an username field and to which
 * in-form call-to-action and/or menu can be attached
 */
class InFormCallToActionField {
  /**
   * Retrieve all the DOM elements which can be an in-form username fields
   */
  static findAll(selector) {
    const domFields =  Array.from(document.querySelectorAll(selector));
    const iframesFields = InFormCallToActionField.findAllInIframes(selector);
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

  /**
   * Default constructor
   * @param field The DOM element
   * @param fieldType The type of field
   */
  constructor(field, fieldType) {
    /** The field to which the in-form is attached */
    this.field = field;
    /** Type of the field ("username" or "password") */
    this.fieldType = fieldType;
    /** An unique identifier for the iframe */
    this.iframeId = uuidv4();
    /** The scrollable field parent */
    this.scrollableFieldParent = null;
    /** Flag telling if the user is mousing over the call-to-action (iframe) */
    this.isCallToActionMousingOver = false;
    /** In-form call-to-action click watcher */
    this.callToActionClickWatcher = null;
    /** In-form call-to-action click listener callback */
    this.callToActionClickCallback = null;

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

  /**
   * Handle a callback after on click on the in-form-call-to-action
   * @param callback
   */
  onClick(callback) {
    this.callToActionClickCallback = callback;
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
  async insertInformCallToActionIframe() {
    const iframes = document.querySelectorAll('iframe');
    // Use of Array prototype some method cause NodeList is not an array !
    const iframeId = this.iframeId;
    const isIframeAlreadyInserted = Array.prototype.some.call(iframes, iframe => iframe.id === iframeId);
    if (!isIframeAlreadyInserted) {
      const iframe = await this.createCallToActionIframe();
      this.handleCallToActionClicked(iframe);
    }
  }

  /**
   * Create an iframe dedicated to the call-to-action
   * @return {HTMLIFrameElement} The created iframe
   */
  async createCallToActionIframe() {
    // IMPORTANT: Calculate position before inserting iframe in document to avoid issue
    const {top, left} = this.calculateFieldPosition();
    const portId = await port.request("passbolt.port.generate-id", "InFormCallToAction");
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const browserExtensionUrl = browser.runtime.getURL("/");
    iframe.id = this.iframeId;
    iframe.style.position = "fixed";
    iframe.style.top = `${top}px`;
    iframe.style.left = `${left}px`;
    iframe.style.border = 0;
    iframe.style.width = '18px';
    iframe.style.height = '18px';
    iframe.style.zIndex = "123456";  // For you Yahoo with love
    iframe.contentWindow.location = `${browserExtensionUrl}webAccessibleResources/passbolt-iframe-in-form-call-to-action.html?passbolt=${portId}`;
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
    let hasScroll = false;
    const isInIframe = this.field.ownerDocument !== document;
    const {top, left, height, width} = this.field.getBoundingClientRect();
    // If the field is in iframe get the top and left of the iframe else get the top and the left of the body
    const {top: topBody, left: leftBody} = isInIframe ? this.field.ownerDocument.defaultView.frameElement.getBoundingClientRect() : document.documentElement.getBoundingClientRect();

    /*
     * We loop to calculate the cumulated position of the field
     * from its ancestors and itself differential offset / scroll position
     */
    while (currentElement && !isNaN(currentElement.offsetLeft) && !isNaN(currentElement.offsetTop)) {
      hasScroll = hasScroll || currentElement.scrollLeft + currentElement.scrollTop > 0;
      x += currentElement.offsetLeft - currentElement.scrollLeft;
      y += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent;
    }
    /*
     * If there is no scroll and not in iframe on the page, we use the getBoundingClientRect to have the position of the field
     * this avoid a position issue if there is a transform style in css
     */
    if (!hasScroll && !isInIframe) {
      x = left + width - 25;
      y = top + Math.floor(height / 2) - 9;
    } else {
      // Then we add the body offset (notably in case of window scroll) + some local adjustments (margin / vertical aligment )
      x = x + leftBody + width - 25;
      y = y + topBody + Math.floor(height / 2) - 9; // Calculate the middle position of the input, 9 is the half of the iframe height
    }
    return {top: y, left: x};
  }


  /**
   * Whenever the user clicked on the call-to-action iframe
   * @param iframe The call-to-action iframe
   */
  handleCallToActionClicked(iframe) {
    /*
     * In case of click on iframe, the field lose the focus. Since it loses the focus, the iframe is removed.
     * And so the call-to-action. So, we need to restore the focus on the input. In case, it did not have
     * previously the focus, no matter since a click on the call-to-action should be a way to focus on the input
     */
    this.callToActionClickWatcher = setInterval(() => {
      // Check if a click has been applied on some iframe
      const elem = document.activeElement;
      if (elem && elem.tagName === 'IFRAME' && elem.id === this.iframeId) {
        this.field.focus();
        this.callToActionClickCallback();
        clearInterval(this.callToActionClickWatcher);
      }
    }, 100);
    /*
     * We need to know which iframe the user click on. We cannot add a listener on iframe
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
   * Removes the in-form call-to-action iframe from the username or password field
   */
  removeInFormCallToAction() {
    const isIframeMouseOver = this.isCallToActionMousingOver;
    const isActiveElementAnAuthenticationField = document.activeElement === this.field;
    if (!isIframeMouseOver && !isActiveElementAnAuthenticationField) {
      this.removeCallToActionIframe();
    }
  }

  /**
   * Removes the call-to-action iframe from the username or password field when one moused out
   * @param event The mouse-out event
   */
  removeInFormCallToActionWhenMouseOut(event) {
    const isNotCallToActionIframe = event.relatedTarget && event.relatedTarget.id !== this.iframeId;
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
      const identifierToMatch = this.iframeId;
      if (iframe.id === identifierToMatch) {
        iframe.parentNode.removeChild(iframe);
        port.emit("passbolt.port.disconnect", "InFormCallToAction");
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

export default InFormCallToActionField;
