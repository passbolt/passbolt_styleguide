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
import InsertSetupAuthenticationIframe from "./components/AuthenticationSetup/SetupAuthentication/InsertSetupAuthenticationIframe";
import InsertFileIframe from "./components/InsertFileIframe";

/**
 * The bootstrap of the setup application served by the browser extension.
 * This application is inserted in the page served by the API and inject the iframe that will contain the setup application.
 */
class ExtBootstrapSetup extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    const skeleton = document.getElementById("temporary-skeleton");
    if (skeleton) {
      skeleton.remove();
    }
    this.handleRemoveIframeRequested();
  }

  /**
   * Whenever the background page request the setup iframe to be removed.
   */
  handleRemoveIframeRequested() {
    this.props.port.on("passbolt.setup-bootstrap.remove-iframe", this.removeSetupIframe.bind(this));
  }

  /**
   * Remove the iframe
   */
  removeSetupIframe() {
    const iframe = document.getElementById("passbolt-iframe-setup");
    if (iframe) {
      iframe.remove();
    }
  }

  render() {
    return (
      <>
        <InsertSetupAuthenticationIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
        <InsertFileIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
      </>
    );
  }
}
ExtBootstrapSetup.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  port: PropTypes.object, // The communication port
};

export default ExtBootstrapSetup;
