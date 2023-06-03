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
import browser from "webextension-polyfill";
import DomUtils from "../Dom/DomUtils";

/**
 * An InFormMenuField is represented by a DOM element identified as a menu field
 */
class InFormMenuField {
  /**
   * Default constructor
   * @param field
   */
  constructor(field) {
    /** The field to which the in-form is attached */
    this.field = field;
    /** An unique identifier for the iframe */
    this.iframeId = uuidv4();
    /** Flag telling if the user is mousing over the menu (iframe) */
    this.isMenuMousingOver = false;
    /** The scrollable field parent */
    this.scrollableFieldParent = null;

    this.bindCallbacks();
    this.insertInformMenuIframe();
    this.handleRemoveEvent();
    this.handleScrollEvent();
  }

  /**
   * Binds methods callbacks
   */
  bindCallbacks() {
    this.removeInFormMenu = this.removeInFormMenu.bind(this);
    this.removeMenuIframe = this.removeMenuIframe.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /** MENU INSERTION */

  /**
   * Insert an in-form menu iframe
   */
  async insertInformMenuIframe() {
    const iframes = document.querySelectorAll('iframe');
    // Use of Array prototype some method cause NodeList is not an array !
    const iframeId = this.iframeId;
    const isIframeAlreadyInserted = Array.prototype.some.call(iframes, iframe => iframe.id === iframeId);
    if (!isIframeAlreadyInserted) {
      const iframe = await this.createMenuIframe();
      this.handleMenuClicked(iframe);
    }
  }

  /**
   * Create an iframe dedicated to the menu
   * @return {HTMLIFrameElement} The created iframe
   */
  async createMenuIframe() {
    // IMPORTANT: Calculate position before inserting iframe in document to avoid issue
    const {top, left} = this.calculateIframePosition();
    const portId = await port.request("passbolt.port.generate-id", "InFormMenu");
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const browserExtensionUrl = browser.runtime.getURL("/");
    iframe.id = this.iframeId;
    iframe.style.position = "fixed";
    iframe.style.top = `${top}px`;
    iframe.style.left = `${left}px`;
    iframe.style.border = 0;
    iframe.style.width = '370px'; // width of the menu 350px + 20px to display shadows
    iframe.style.height = '220px'; // For 3 items in a row to be display
    iframe.style.zIndex = "123456";
    iframe.contentWindow.location = `${browserExtensionUrl}webAccessibleResources/passbolt-iframe-in-form-menu.html?passbolt=${portId}`;
    return iframe;
  }

  /**
   * Calculates the position on the screen of the DOM field
   * @return {{top: number, left: number}}
   */
  calculateIframePosition() {
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
     * If there is no scroll on the page, we use the getBoundingClientRect to have the position of the field
     * this avoid a position issue if there is a transform style in css
     */
    if (!hasScroll && !isInIframe) {
      x = left + width - 367; // (-370 width of the iframe + 10 to adjust with the shadow) (-7 adjustment of the call to action menu (18-25))
      y = top + height; // Calculate the bottom position of the input
    } else {
      // Then we add the body offset (notably in case of window scroll) + some local adjustments (margin / vertical aligment ) to align with the call to action icon
      x = x + leftBody + width - 367; // (-370 width of the iframe + 10 to adjust with the shadow) (-7 adjustment of the call to action menu (18-25))
      y = y + topBody + height; // Calculate the bottom position of the input
    }
    // If x is negative force zero
    return {top: y, left: x < 0 ? 0 : x};
  }

  /**
   * Whenever the user clicked on the call-to-action iframe
   * @param iframe The menu iframe
   */
  handleMenuClicked(iframe) {
    /*
     * We need to know which iframe the user click on. We cannot add a listener on iframe
     * since there are from different domains (target page vs extension pagemods)
     */
    iframe.addEventListener('mouseover', () => this.isMenuMousingOver = true);
    iframe.addEventListener('mouseout', () => this.isMenuMousingOver = false);
  }

  /** MENU REMOVE */

  /**
   * Whenever the menu must be removed
   */
  handleRemoveEvent() {
    this.field.addEventListener("blur",  this.removeInFormMenu);
  }

  /**
   * Removes the in-form menu iframe from the field
   */
  removeInFormMenu() {
    const isIframeMouseOver = this.isMenuMousingOver;
    const isActiveElement = document.activeElement === this.field;
    if (!isIframeMouseOver && !isActiveElement) {
      this.removeMenuIframe();
    }
  }

  /**
   * Remove the menu (iframe)
   */
  removeMenuIframe() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const identifierToMatch = this.iframeId;
      if (iframe.id === identifierToMatch) {
        iframe.parentNode.removeChild(iframe);
        port.emit("passbolt.port.disconnect", "InFormMenu");
      }
    });
  }

  /** SCROLL REPOSITION */

  /**
   * Whenever the user scrolls the page
   */
  handleScrollEvent() {
    // Remove the in form menu
    this.scrollableFieldParent = DomUtils.getScrollParent(this.field);
    this.scrollableFieldParent.addEventListener('scroll', this.removeMenuIframe);
  }

  /** DESTROY */

  /**
   * Remove all listener and iframe to clean the page and avoid issue on extension update
   */
  destroy() {
    this.field.removeEventListener("blur",  this.removeInFormMenu);
    this.scrollableFieldParent.removeEventListener('scroll', this.removeMenuIframe);
    this.removeMenuIframe();
  }
}

export default InFormMenuField;
