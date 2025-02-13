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
 * @since         4.4.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import {Trans} from 'react-i18next';
import {MfaSettingsWorkflowStates, withMfa} from "../../../../contexts/MFAContext";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import TotpPhoneIllustration from "./TotpPhoneIllustration";
import TotpSignInIllustration from "./TotpSignInIllustration";
import TotpEnterCodeIllustration from "./TotpEnterCodeIllustration";


/**
 * This component will display the get started Totp setup
 */
class TotpGetStarted extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleGetStartedClick = this.handleGetStartedClick.bind(this);
  }

  handleGetStartedClick() {
    this.props.mfaContext.navigate(MfaSettingsWorkflowStates.SCANTOTPCODE);
  }

  handleCancelClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="main-column mfa-setup totp-get-started">
          <div className="main-content how-it-works">
            <h3><Trans>Getting started with Time based One Time Password (TOTP)</Trans></h3>
            <h4 className="no-border"><Trans>How does it work?</Trans></h4>
            <div className="instruction">
              <div className="step sign-in-illustration">
                <TotpSignInIllustration />
                <p><Trans>You sign in to passbolt just like you normally do.</Trans></p>
              </div>
              <div className="step phone-illustration">
                <TotpPhoneIllustration />
                <p><Trans>When using a new browser, you need an additional code from your phone.</Trans></p>
              </div>
              <div className="step enter-code-illustration">
                <TotpEnterCodeIllustration />
                <p><Trans>Once you enter this code, you can log in.</Trans></p>
              </div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            className="button cancel secondary"
            type='button'
            onClick={this.handleCancelClick}>
            <span><Trans>Cancel</Trans></span>
          </button>
          <button
            className="button primary form"
            type='button'
            onClick={this.handleGetStartedClick}>
            <span><Trans>Get started</Trans></span>
          </button>
        </div>
      </>
    );
  }
}

TotpGetStarted.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
};

export default withAppContext(withMfa(withTranslation("common")(TotpGetStarted)));
