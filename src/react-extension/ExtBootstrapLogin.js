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
import InsertLoginAuthenticationIframe from "./components/AuthenticationLogin/Login/InsertLoginAuthenticationIframe";

/**
 * The bootstrap of the login application served by the browser extension.
 * This application is inserted in the page served by the API and inject the iframe that will contain the setup application.
 */
class ExtBootstrapLogin extends Component {
  render() {
    return (
      <>
        <InsertLoginAuthenticationIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
      </>
    );
  }
}
ExtBootstrapLogin.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
};

export default ExtBootstrapLogin;