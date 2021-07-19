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

/**
 * The bootstrap of the setup application served by the browser extension.
 * This application is inserted in the page served by the BP and inject the iframe that will contain the InFormMenu application.
 */
class ExtInFormMenuBootstrap extends Component {
  constructor(props) {
    super(props);
    this.createRefs();
  }
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleRemoveIframeRequested();
    this.loadIframe();
  }

  /**
   * Whenever the background page request the setup iframe to be removed.
   */
  handleRemoveIframeRequested() {
    this.props.port.on("passbolt.in-form-menu-bootstrap.remove-iframe", this.removeSetupIframe.bind(this));
  }

  createRefs() {
    this.iframeRef = React.createRef();
  }

  /**
   * Load the react app iframe
   * @returns {void}
   */
  loadIframe() {
    const iframeUrl = `${this.props.browserExtensionUrl}data/passbolt-iframe-in-form-menu.html?passbolt=passbolt-iframe-in-form-menu`;
    this.iframeRef.current.contentWindow.location = iframeUrl;
  }

  /**
   * Remove the iframe
   */
  removeSetupIframe() {
    const iframe = document.getElementById("passbolt-iframe-in-form-menu");
    if (iframe) {
      iframe.remove();
    }
  }

  render() {
    return (
      <iframe id="passbolt-iframe-in-form-menu" ref={this.iframeRef}/>
    );
  }
}
ExtInFormMenuBootstrap.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  port: PropTypes.object, // The communication port
};

export default ExtInFormMenuBootstrap;
