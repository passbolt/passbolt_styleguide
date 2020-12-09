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
  render() {
    return (
      <>
        <InsertRecoverAuthenticationIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
      </>
    );
  }
}
ExtBootstrapRecover.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
};

export default ExtBootstrapRecover;
