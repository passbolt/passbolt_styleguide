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

class InsertSetupAuthenticationIframe extends Component {
  constructor(props) {
    super(props);
    this.createRefs();
  }

  componentDidMount() {
    this.loadIframe();
  }

  createRefs() {
    this.iframeRef = React.createRef();
  }

  /**
   * Load the react app iframe
   * @returns {void}
   */
  async loadIframe() {
    const portId = await this.props.port.request("passbolt.port.generate-id", "Setup");
    this.iframeRef.current.contentWindow.location = `${this.props.browserExtensionUrl}webAccessibleResources/passbolt-iframe-setup.html?passbolt=${portId}`;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <iframe id="passbolt-iframe-setup" ref={this.iframeRef} className="full-screen" />
    );
  }
}

InsertSetupAuthenticationIframe.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  port: PropTypes.object, // The communication port
};

export default InsertSetupAuthenticationIframe;
