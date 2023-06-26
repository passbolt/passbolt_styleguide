/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.10.0
 */

import React from 'react';
import {withRouter} from 'react-router-dom';
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../contexts/DialogContext";
import {withAccountRecovery} from "../../contexts/AccountRecoveryUserContext";
import PropTypes from "prop-types";
import {AccountRecoveryUserContextProvider} from "../../contexts/AccountRecoveryUserContext";
import AccountRecoveryInviteUserSettingPreferenceDialog from '../AccountRecovery/AccountRecoveryInviteUserSettingPreferenceDialog/AccountRecoveryInviteUserSettingPreferenceDialog';
import {MfaPolicyEnumerationTypes} from '../../../shared/models/mfaPolicy/MfaPolicyEnumeration';
import {withMfa} from '../../contexts/MFAContext';
import MfaInviteUserSettingsPreferenceDialog from '../MFA/MfaInviteUserSettingsPreferenceDialog';

/**
 * This component listens any event related to passphrase entry dialog actions to perform
 */
class HandleStatusCheck extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Returns the component default state
   */
  getDefaultState() {
    return {
      shouldDisplayMFA: false,
      shouldDisplayAccountRecovery: false,
    };
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.checkToDisplayDialog();
    await this.displayDialog();
  }

  /**
   * Whenever the component has been updated
   */
  async componentDidUpdate() {
    if (this.state.shouldDisplayAccountRecovery || this.state.shouldDisplayMFA) {
      await this.displayDialog();
    }
  }

  async checkToDisplayDialog() {
    if (this.props.context.siteSettings.canIUse('accountRecovery')) {
      const shouldDisplayAccountRecovery = await this.checkAccountRecovery();
      this.setState({shouldDisplayAccountRecovery});
    }
    if (this.props.context.siteSettings.canIUse('mfaPolicies')) {
      const shouldDisplayMFA = await this.checkMfaPolicy();
      this.setState({shouldDisplayMFA});
    }
  }

  isOrganizationPolicyRequiresAUserChoiceForAccountRecovery() {
    const policy = this.props.accountRecoveryContext.getPolicy();
    return policy === AccountRecoveryUserContextProvider.POLICY_MANDATORY
      || policy === AccountRecoveryUserContextProvider.POLICY_OPT_OUT;
  }

  isOrganizationPolicyRequiresAUserChoiceForMfa() {
    const policy = this.props.mfaContext.getPolicy();
    return policy === MfaPolicyEnumerationTypes.MANDATORY;
  }

  async checkAccountRecovery() {
    await this.props.accountRecoveryContext.loadAccountRecoveryPolicy();

    if (!this.isOrganizationPolicyRequiresAUserChoiceForAccountRecovery()) {
      return;
    }

    const isResponsePostpone = await this.props.context.port.request("passbolt.account-recovery.has-user-postponed-user-setting-invitation");

    if (isResponsePostpone) {
      return;
    }

    const isUserAccountRecoverySubscriptionStatusPending = this.props.accountRecoveryContext.getUserAccountRecoverySubscriptionStatus() === AccountRecoveryUserContextProvider.STATUS_PENDING;
    if (!isUserAccountRecoverySubscriptionStatusPending) {
      return;
    }

    const pathname = this.props.location.pathname;
    if (pathname.startsWith("/app/settings/account-recovery") || pathname.startsWith("/app/settings/mfa")) {
      return;
    }

    return true;
  }


  async checkMfaPolicy() {
    await this.props.mfaContext.findPolicy();
    await this.props.mfaContext.findMfaSettings();

    if (!this.isOrganizationPolicyRequiresAUserChoiceForMfa()) {
      return;
    }
    const isResponsePostpone = await this.props.context.port.request("passbolt.mfa-policy.has-user-postponed-user-setting-invitation");
    if (isResponsePostpone) {
      return;
    }

    const pathname = this.props.location.pathname;
    if (pathname.startsWith("/app/settings/mfa") || pathname.startsWith("/app/settings/account-recovery")) {
      return;
    }

    const hasSettingsAlreadyDefined = this.props.mfaContext.hasMfaSettings();
    if (hasSettingsAlreadyDefined) {
      return;
    }
    return true;
  }

  async displayDialog() {
    await this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
    const numberOfDialogs = this.props.dialogContext.dialogs.length;

    if (numberOfDialogs === 0) {
      if (!this.state.shouldDisplayAccountRecovery && this.state.shouldDisplayMFA) {
        this.props.dialogContext.open(MfaInviteUserSettingsPreferenceDialog);
        this.setState({shouldDisplayMFA: false});
      } else if (this.state.shouldDisplayAccountRecovery) {
        const policy = this.props.accountRecoveryContext.getPolicy();
        this.props.dialogContext.open(AccountRecoveryInviteUserSettingPreferenceDialog, {
          policy
        });
        this.setState({shouldDisplayAccountRecovery: false});
      }
    }
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return null;
  }
}

HandleStatusCheck.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
  navigationContext: PropTypes.any, // The application navigation context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  mfaContext: PropTypes.object, // The mfa context
  context: PropTypes.object, // the application context
  location: PropTypes.object, // the current page location
};

export default withRouter(withAppContext(withAccountRecovery(withMfa(withDialog(HandleStatusCheck)))));
