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
 * @since         3.11.0
 */

import React from 'react';
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import {MfaProviders} from "../../../../shared/models/Mfa/MfaEnumeration";
import {Redirect} from "react-router-dom";

/**
 * This component displays the user MFA information
 */
class DisplayUserMfaProvider extends React.Component {
  /**
   * Extract the provider from the url and return it. Return null if the provider is not valid
   * @return {string|null}
   */
  getProvider() {
    const provider = this.props.match.params.provider;
    const allowedMfaProviders = Object.values(MfaProviders);

    if (!allowedMfaProviders.includes(provider)) {
      console.warn('The provider should be a valid provider .');
      // this.props.history.push({pathname: '/app/settings/mfa'});
      return null;
    }

    return provider;
  }
  /**
   * Render the component
   */
  render() {
    const provider = this.getProvider();

    return (
      <>
        {!provider &&
          <Redirect to="/app/settings/mfa"/>
        }
        {provider &&
          <iframe id="setup-mfa" src={`${this.props.context.trustedDomain}/mfa/setup/${provider}`} width="100%" height="100%"/>
        }
      </>
    );
  }
}

DisplayUserMfaProvider.propTypes = {
  match: PropTypes.any, // The component provider parameter in the url
  history: PropTypes.any, // The router history property
  context: PropTypes.any, // The application context provider
};

export default withAppContext(DisplayUserMfaProvider);
