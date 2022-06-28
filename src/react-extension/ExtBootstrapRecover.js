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
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import InsertRecoverAuthenticationIframe
  from "./components/AuthenticationRecover/RecoverAuthentication/InsertRecoverAuthenticationIframe";

/**
 * The bootstrap of the recover application served by the browser extension.
 * This application is inserted in the page served by the API and inject the iframe that will contain the recover application.
 */
class ExtBootstrapRecover extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.removeSkeleton();
    this.handleRemoveIframeRequested();
  }

  /**
   * It returns true if the page is detected as a passbolt app.
   * For that purpose, it simply checks if <html> has a class 'passbolt' set.
   * @returns {boolean}
   */
  isPassboltApp() {
    const rootNode = document.getRootNode();
    const htmlTag = rootNode.lastChild;

    return htmlTag?.tagName === "HTML"
      && htmlTag.classList.contains('passbolt');
  }

  /**
   * Remove skeleton preloaded in html if any
   */
  removeSkeleton() {
    const skeleton = document.getElementById("temporary-skeleton");
    if (skeleton) {
      skeleton.remove();
    }
  }

  /**
   * Whenever the background page request the recover iframe to be removed.
   */
  handleRemoveIframeRequested() {
    this.props.port.on("passbolt.recover-bootstrap.remove-iframe", this.removeRecoverIframe.bind(this));
  }

  /**
   * Remove the iframe
   */
  removeRecoverIframe() {
    const iframe = document.getElementById("passbolt-iframe-recover");
    if (iframe) {
      iframe.remove();
    }
  }

  render() {
    if (!this.isPassboltApp()) {
      return null;
    }

    return (
      <>
        <InsertRecoverAuthenticationIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
      </>
    );
  }
}
ExtBootstrapRecover.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  port: PropTypes.object, // The communication port
};

export default ExtBootstrapRecover;
