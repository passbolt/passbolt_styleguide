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

class ExtBootstrapSetup extends Component {
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
};

export default ExtBootstrapSetup;
