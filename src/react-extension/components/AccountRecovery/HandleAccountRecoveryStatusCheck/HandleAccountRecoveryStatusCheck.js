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
 * @since         3.6.0
 */

import React from 'react';
import {withRouter} from 'react-router-dom';
import {withAppContext} from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import PropTypes from "prop-types";
import {AccountRecoveryUserContextProvider} from "../../../contexts/AccountRecoveryUserContext";
import AccountRecoveryInviteUserSettingPreferenceDialog from '../AccountRecoveryInviteUserSettingPreferenceDialog/AccountRecoveryInviteUserSettingPreferenceDialog';

/**
 * This component listens any event related to passphrase entry dialog actions to perform
 */
class HandleAccountRecoveryStatusCheck extends React.Component {
  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
    if (!this.isOrganizationPolicyRequiresAUserChoice()) {
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
    if (pathname.startsWith("/app/settings/account-recovery")) {
      return;
    }

    this.props.dialogContext.open(AccountRecoveryInviteUserSettingPreferenceDialog, {
      policy: this.props.accountRecoveryContext.getPolicy()
    });
  }

  isOrganizationPolicyRequiresAUserChoice() {
    const policy = this.props.accountRecoveryContext.getPolicy();
    return policy === AccountRecoveryUserContextProvider.POLICY_MANDATORY
      || policy === AccountRecoveryUserContextProvider.POLICY_OPT_OUT;
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return null;
  }
}

HandleAccountRecoveryStatusCheck.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  context: PropTypes.object, // the application context
  location: PropTypes.object, // the current page location
};

export default withRouter(withAppContext(withAccountRecovery(withDialog(HandleAccountRecoveryStatusCheck))));
