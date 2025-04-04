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
 * @since         3.0.0
 */

import React from 'react';
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import {Trans} from 'react-i18next';
import Icon from '../../../../shared/components/Icons/Icon';

/**
 * This component displays the user MFA information
 */
class DisplayUserMfa extends React.Component {
  /**
   * Returns true if the current URL is using the protocol HTTPS
   * @returns {boolean}
   */
  get isRunningUnderHttps() {
    const trustedDomain = this.props.context.trustedDomain;
    const url = new URL(trustedDomain);
    return url.protocol === "https:";
  }

  /**
   * Render the component
   */
  render() {
    return (
      <>
        {this.isRunningUnderHttps &&
          <iframe id="setup-mfa" src={`${this.props.context.trustedDomain}/mfa/setup/select`} width="100%" height="100%"/>
        }
        {!this.isRunningUnderHttps &&
          <>
            <div className="grid grid-responsive-12 profile-detailed-information">
              <div className="row">
                <div className="profile col6 main-column">
                  <h3><Trans>Multi Factor Authentication</Trans></h3>
                  <h4 className="no-border"><Trans>Sorry the multi factor authentication feature is only available in a secure context (HTTPS).</Trans></h4>
                  <p><Trans>Please contact your administrator to enable multi-factor authentication.</Trans></p>
                </div>
                <div className="col4 last">
                  <div className="sidebar-help">
                    <h3><Trans>Need some help?</Trans></h3>
                    <p><Trans>Contact your administrator with the error details.</Trans></p>
                    <p><Trans>Alternatively you can also get in touch with support on community forum or via the paid support channels.</Trans></p>
                    <a className="button" href="https://help.passbolt.com/" target="_blank" rel="noopener noreferrer">
                      <Icon name="document"/>
                      <span><Trans>Help site</Trans></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </>
    );
  }
}

DisplayUserMfa.propTypes = {
  context: PropTypes.any, // The application context provider
};

export default withAppContext(DisplayUserMfa);
