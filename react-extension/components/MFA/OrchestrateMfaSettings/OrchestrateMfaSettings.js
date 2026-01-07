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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { MfaSettingsWorkflowStates, withMfa } from "../../../contexts/MFAContext";
import DisplayProviderList from "../DisplayProviderList/DisplayProviderList";
import ScanTotpCode from "../TotpSetup/ScanTotpCode/ScanTotpCode";
import TotpGetStarted from "../TotpSetup/TotpGetStarted/TotpGetStarted";
import DisplayMfaProviderConfiguration from "../DisplayMfaProviderConfiguration/DisplayMfaProviderConfiguration";
import YubikeySetup from "../YubikeySetup/YubikeySetup";
import DuoGetStarted from "../DuoSetup/DuoGetStarted";
import { withRouter } from "react-router-dom";

/**
 * The component orchestrates the mfa settings flow.
 */
class OrchestrateMfaSettings extends Component {
  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.props.mfaContext.findMfaSettings();
    await this.initInitialView();
  }

  async initInitialView() {
    const provider = this.props.match.params.provider;

    if (provider) {
      this.props.mfaContext.setProvider(provider);
      this.props.mfaContext.navigate(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
    } else {
      await this.props.mfaContext.goToProviderList();
    }
  }
  /**
   * Render the component
   */
  render() {
    switch (this.props.mfaContext.state) {
      case MfaSettingsWorkflowStates.OVERVIEW:
        return <DisplayProviderList />;
      case MfaSettingsWorkflowStates.TOTPOVERVIEW:
        return <TotpGetStarted />;
      case MfaSettingsWorkflowStates.SCANTOTPCODE:
        return <ScanTotpCode />;
      case MfaSettingsWorkflowStates.SETUPYUBIKEY:
        return <YubikeySetup />;
      case MfaSettingsWorkflowStates.SETUPDUO:
        return <DuoGetStarted />;
      case MfaSettingsWorkflowStates.VIEWCONFIGURATION:
        return <DisplayMfaProviderConfiguration />;
    }
  }
}
OrchestrateMfaSettings.propTypes = {
  t: PropTypes.func, // The translation function
  context: PropTypes.any.isRequired, // The application context
  match: PropTypes.object, // The router match helper
  mfaContext: PropTypes.any.isRequired, // The mfa content
};
export default withAppContext(withMfa(withRouter(withTranslation("common")(OrchestrateMfaSettings))));
