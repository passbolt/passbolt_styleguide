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

import { v4 as uuidv4 } from "uuid";
import browser from "webextension-polyfill";
import ShadowDomQueryService from "../../services/ShadowDom/ShadowDomQueryService";
import InFormFieldGeometryService from "./InFormFieldGeometryService";

/**
 * Grace period between the pointer leaving the field and the call-to-action being removed, letting
 * the pointer travel the gap between the two.
 * @type {number}
 */
export const CALL_TO_ACTION_REMOVAL_GRACE_DELAY = 150;

/**
 * An InFormCallToActionField is represented by a DOM element identified as an username field and to which
 * in-form call-to-action and/or menu can be attached
 */
class InFormCallToActionField {
  /**
   * Default constructor
   * @param field The DOM element
   * @param fieldType The type of field
   * @param shadowRoot The shadow root
   */
  constructor(field, fieldType, shadowRoot) {
    /** The field to which the in-form is attached */
    this.field = field;
    /** Type of the field ("username" or "password") */
    this.fieldType = fieldType;
    /** A unique identifier for the InFormCallToActionField */
    this.id = uuidv4();
    /** A unique identifier for the iframe */
    this.iframeId = uuidv4();
    /** The scrollable field parent */
    this.scrollableFieldParent = null;
    /** Flag telling if the user is mousing over the call-to-action (iframe) */
    this.isCallToActionMousingOver = false;
    /** In-form call-to-action click watcher */
    this.callToActionClickWatcher = null;
    /** In-form call-to-action click listener callback */
    this.callToActionClickCallback = null;
    /** The shadow root **/
    this.shadowRoot = shadowRoot;
    /** Rectangle coordinates of the field */
    this.viewableRect = null;
    /** Pending removal scheduled while the pointer travels from the field to the call-to-action */
    this.removalTimeout = null;

    this.bindCallbacks();
    this.handleInsertionEvent();
    this.handleRemoveEvent();
    this.handleScrollEvent();
    this.cacheViewableRect();
  }

  /**
   * Binds methods callbacks
   */
  bindCallbacks() {
    this.insertInformCallToActionIframe = this.insertInformCallToActionIframe.bind(this);
    this.removeInFormCallToActionWhenMouseOut = this.removeInFormCallToActionWhenMouseOut.bind(this);
    this.removeInFormCallToAction = this.removeInFormCallToAction.bind(this);
    this.removeIframe = this.removeIframe.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * Cache the field's viewport rect, measured once at discovery.
   */
  cacheViewableRect() {
    this.viewableRect = this.field.getBoundingClientRect();
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
    const fieldRoot = ShadowDomQueryService.scopeRoot(this.field);
    if (
      // document.activeElement stops at the top-level shadow host, so look for the focused element through the open shadow roots.
      this.field === ShadowDomQueryService.deepActiveElement() ||
      // Closed shadow root: the focus is retargeted to the host, so compare the host with the active element.
      (ShadowDomQueryService.isShadowRoot(fieldRoot) && fieldRoot.host === document.activeElement)
    ) {
      this.insertInformCallToActionIframe();
    }
    this.field.addEventListener("mouseover", this.insertInformCallToActionIframe);
    this.field.addEventListener("focus", this.insertInformCallToActionIframe);
  }

  /**
   * Insert an in-form call-to-action iframe
   */
  async insertInformCallToActionIframe() {
    // The pointer came back onto the field: whatever removal was pending is no longer wanted.
    this.cancelScheduledRemoval();
    const iframes = this.shadowRoot.querySelectorAll("iframe");
    // Use of Array prototype some method cause NodeList is not an array !
    const iframeId = this.iframeId;
    const isIframeAlreadyInserted = Array.prototype.some.call(iframes, (iframe) => iframe.id === iframeId);
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
    const { top, left } = this.calculateFieldPosition();
    const portId = await port.request("passbolt.port.generate-id", "InFormCallToAction");
    const iframe = document.createElement("iframe");
    this.shadowRoot.appendChild(iframe);
    const browserExtensionUrl = browser.runtime.getURL("/");
    iframe.id = this.iframeId;
    iframe.style.position = "fixed";
    iframe.style.display = "block";
    iframe.style.top = `${top}px`;
    iframe.style.left = `${left}px`;
    iframe.style.border = "none";
    iframe.style.width = "18px";
    iframe.style.height = "18px";
    iframe.style.colorScheme = "auto"; // To have the transparency on dark theme
    iframe.contentWindow.location = `${browserExtensionUrl}webAccessibleResources/passbolt-iframe-in-form-call-to-action.html?passbolt=${portId}&applicationId=${this.id}&fieldType=${this.fieldType}`;
    return iframe;
  }

  /**
   * Calculates the position on the screen of the DOM field
   * @return {{top: number, left: number}}
   */
  calculateFieldPosition() {
    return InFormFieldGeometryService.calculateFieldPosition(this.field, this.shadowRoot);
  }

  /**
   * Whenever the user clicked on the call-to-action iframe
   * @param iframe The call-to-action iframe
   */
  handleCallToActionClicked(iframe) {
    // Stop the watcher left by a previous insertion before starting a new one.
    clearInterval(this.callToActionClickWatcher);
    /*
     * In case of click on iframe, the field lose the focus. Since it loses the focus, the iframe is removed.
     * And so the call-to-action. So, we need to restore the focus on the input. In case, it did not have
     * previously the focus, no matter since a click on the call-to-action should be a way to focus on the input
     */
    this.callToActionClickWatcher = setInterval(() => {
      // Check if a click has been applied on some iframe
      const elem = this.shadowRoot.activeElement;
      if (elem && elem.tagName === "IFRAME" && elem.id === this.iframeId) {
        this.field.focus();
        this.callToActionClickCallback();
        clearInterval(this.callToActionClickWatcher);
      }
    }, 100);
    /*
     * We need to know which iframe the user click on. We cannot add a listener on iframe
     * since there are from different domains (target page vs extension pagemods)
     */
    iframe.addEventListener("mouseover", () => {
      this.isCallToActionMousingOver = true;
      // The pointer made it across: keep the call-to-action.
      this.cancelScheduledRemoval();
    });
    iframe.addEventListener("mouseout", () => {
      this.isCallToActionMousingOver = false;
      // Leaving the call-to-action itself: same grace period, the pointer may be heading back to the field.
      this.scheduleRemoval();
    });
  }

  /** CALL-TO-ACTION REMOVE */

  /**
   * Whenever the call-to-action must be removed
   */
  handleRemoveEvent() {
    this.field.addEventListener("mouseout", this.removeInFormCallToActionWhenMouseOut);
    this.field.addEventListener("blur", this.removeInFormCallToAction);
  }

  /**
   * Removes the in-form call-to-action iframe from the username or password field
   */
  removeInFormCallToAction() {
    const isIframeMouseOver = this.isCallToActionMousingOver;
    const isActiveElementAnAuthenticationField = ShadowDomQueryService.deepActiveElement() === this.field;
    if (!isIframeMouseOver && !isActiveElementAnAuthenticationField) {
      this.removeIframe();
    }
  }

  /**
   * Schedules the removal of the call-to-action when the pointer leaves the field.
   *
   *
   * @param {MouseEvent} event The mouse-out event
   */
  removeInFormCallToActionWhenMouseOut(event) {
    // Same-document shortcut: the pointer is demonstrably entering the call-to-action, keep it.
    if (event.relatedTarget === this.shadowRoot.host) {
      return;
    }
    this.scheduleRemoval();
  }

  /**
   * Schedules a removal, replacing any already pending one.
   */
  scheduleRemoval() {
    this.cancelScheduledRemoval();
    this.removalTimeout = setTimeout(() => {
      this.removalTimeout = null;
      this.removeInFormCallToAction();
    }, CALL_TO_ACTION_REMOVAL_GRACE_DELAY);
  }

  /**
   * Cancels a pending removal, if any.
   */
  cancelScheduledRemoval() {
    clearTimeout(this.removalTimeout);
    this.removalTimeout = null;
  }

  /**
   * Remove the call-to-action (iframe)
   */
  removeIframe() {
    // The iframe goes away, so stop watching for a click on it and drop any pending removal.
    clearInterval(this.callToActionClickWatcher);
    this.cancelScheduledRemoval();
    const iframes = this.shadowRoot.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
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
    this.scrollableFieldParent = InFormFieldGeometryService.getScrollParent(this.field);
    this.scrollableFieldParent.addEventListener("scroll", this.removeIframe);
  }

  /** DESTROY */

  /**
   * Remove all listener and iframe to clean the page and avoid issue on extension update
   */
  destroy() {
    this.field.removeEventListener("mouseover", this.insertInformCallToActionIframe);
    this.field.removeEventListener("focus", this.insertInformCallToActionIframe);
    this.field.removeEventListener("mouseout", this.removeInFormCallToActionWhenMouseOut);
    this.field.removeEventListener("blur", this.removeInFormCallToAction);
    this.scrollableFieldParent.removeEventListener("scroll", this.removeIframe);
    this.cancelScheduledRemoval();
    this.removeIframe();
  }
}

export default InFormCallToActionField;
