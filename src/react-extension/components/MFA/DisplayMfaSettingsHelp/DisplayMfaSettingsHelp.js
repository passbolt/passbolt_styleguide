/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import FileTextSVG from "../../../../img/svg/file_text.svg";
import {Providers, withMfa} from "../../../contexts/MFAContext";
import PropTypes from "prop-types";

class DisplayMfaSettingsHelp extends Component {
  isDuo() {
    return this.props.mfaContext.provider === Providers.DUO;
  }

  isTotp() {
    return this.props.mfaContext.provider === Providers.TOTP;
  }

  isDefault() {
    return !this.isDuo() && !this.isTotp();
  }
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>

        {
          this.isDefault() &&
          <div className="sidebar-help-section">
            <h3><Trans>What is multi-factor authentication?</Trans></h3>
            <p className="description"><Trans>Multi-factor authentication (MFA) is a method of confirming a user&apos;s identity that requires presenting two or more pieces of evidence (or factor).</Trans></p>
            <a className="button" href="https://help.passbolt.com/start" target="_blank" rel="noopener noreferrer">
              <FileTextSVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        }

        {
          this.isDuo() &&
          <div className="sidebar-help-section">
            <h3><Trans>Requirements</Trans></h3>
            <p className="description"><Trans>To proceed, you need to install the Duo mobile application or to have a device to authenticate which is supported by Duo. For the list of supported devices, see: </Trans><a href="https://duo.com/product/multi-factor-authentication-mfa/authentication-methods" target="_blank" rel="noopener noreferrer">Duo authentication methods</a>.</p>
            <a className="button" href="https://help.passbolt.com/start" target="_blank" rel="noopener noreferrer">
              <FileTextSVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        }
        {
          this.isTotp() &&
          <div className="sidebar-help-section">
            <h3><Trans>Requirements</Trans></h3>
            <p className="description"><Trans>To proceed you need to install an application that supports Time Based One Time Passwords (TOTP) on your phone or tablet such as: </Trans><a href="https://freeotp.github.io/" target="_blank" rel="noopener noreferrer">Google Authenticator</a> <Trans>or</Trans> <a href="https://support.google.com/accounts/answ" target="_blank" rel="noopener noreferrer">FreeOTP</a>.</p>
            <a className="button" href="https://help.passbolt.com/start" target="_blank" rel="noopener noreferrer">
              <FileTextSVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        }
      </>
    );
  }
}

DisplayMfaSettingsHelp.propTypes = {
  context: PropTypes.object, // The application context
  mfaContext: PropTypes.object, // The mfa context
};


export default withMfa(withTranslation('common')(DisplayMfaSettingsHelp));
