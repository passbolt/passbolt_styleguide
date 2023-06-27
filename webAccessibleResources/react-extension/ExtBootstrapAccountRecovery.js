/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import InsertAccountRecoveryIframe
  from "./components/AuthenticationAccountRecovery/OrchestrateAccountRecovery/InsertAccountRecoveryIframe";
import InsertFileIframe from "./components/InsertFileIframe";

/**
 * The bootstrap of the account recovery application served by the browser extension.
 * This application is inserted in the page served by the API and inject the iframe that will contain the recover application.
 */
class ExtBootstrapAccountRecovery extends Component {
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
    this.props.port.on("passbolt.account-recovery-bootstrap.remove-iframe", this.removeAccountRecoveryIframe.bind(this));
  }

  /**
   * Remove the iframe
   */
  removeAccountRecoveryIframe() {
    const iframe = document.getElementById("passbolt-iframe-account-recovery");
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
        <InsertAccountRecoveryIframe port={this.props.port} browserExtensionUrl={this.props.browserExtensionUrl}/>
        <InsertFileIframe port={this.props.port} browserExtensionUrl={this.props.browserExtensionUrl}/>
      </>
    );
  }
}
ExtBootstrapAccountRecovery.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  port: PropTypes.object, // The communication port
};

export default ExtBootstrapAccountRecovery;
