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
 * @since        3.0.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

class HandleLegacyAdministrationAppjs extends Component {
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    window.addEventListener('passbolt.auth.is-authenticated', this.onIsAuthenticatedRequested.bind(this));
    window.addEventListener('passbolt.plugin.auth.logout', this.onLogoutRequested.bind(this));
    this.markPluginAsReady();
  }

  /**
   * componentWillUnmount
   * Invoked immediately before the component is removed from the tree
   * @return {void}
   */
  componentWillUnmount() {
    window.removeEventListener('passbolt.auth.is-authenticated', this.onIsAuthenticatedRequested.bind(this));
    window.removeEventListener('passbolt.plugin.auth.logout', this.onLogoutRequested.bind(this));
  }

  /**
   * Mark plugin as ready.
   * The legacy user setting mfa page requires this to work properly.
   */
  markPluginAsReady() {
    document.getElementsByTagName("html")[0].classList.add("passboltplugin-ready");
  }

  /**
   * Emit a message to the page
   * @param {string} message The event name
   * @param {object} data The associated data
   */
  emitToPage(message, data) {
    // Bundle the event data;
    let eventData = {
      event: message,
      data: data
    };
    /*
     * The method cloneInto is called only for Firefox.
     * the content script needs to explicitly clone the message payload into
     * the page script's scope using the global cloneInto().
     * @see https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Content_Scripts/Interacting_with_page_scripts#Content_script_to_page_script_2
     */
    if (typeof cloneInto !== 'undefined') {
      // eslint-disable-next-line no-undef
      eventData = cloneInto(eventData, document.defaultView);
    }
    const event = new CustomEvent('addon-message', {bubbles: true, cancelable: true, detail: eventData});
    document.documentElement.dispatchEvent(event);
  }

  /**
   * Listen when the appjs requests the authenticated status
   */
  onIsAuthenticatedRequested(event) {
    const requestId = event.detail[0];
    this.emitToPage(requestId, {status: 'SUCCESS', body: true});
  }

  /**
   * Listen when the user wants to logout.
   * The legacy appjs requires the browser extension to logout.
   * This method works great with the navigation menu but not very well with the legacy user badge menu.
   */
  onLogoutRequested() {
    this.props.port.request('passbolt.app-boostrap.navigate-to-logout');
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <></>
    );
  }
}

HandleLegacyAdministrationAppjs.propTypes = {
  port: PropTypes.object, // The browser extension communication port
};

export default HandleLegacyAdministrationAppjs;
