/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.5.0
 */
import React from "react";
import PropTypes from "prop-types";
import {
  AdminAccountRecoveryContextStep,
  withAdminAccountRecovery
} from "../../../contexts/AdminAccountRecoveryContext";
import {withDialog} from "../../../contexts/DialogContext";
import ProvideOrganizationKey from "../ProvideOrganizationKey/ProvideOrganizationKey";
import ConfirmSaveAccountRecoverySettings from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";

/**
 * This component handle the save admin account recovery.
 */
class HandleSaveAccountRecovery extends React.Component {
  componentDidMount() {
    this.handleSaveAccountRecoveryStep();
  }

  componentDidUpdate(prevProps) {
    this.handleSaveAccountRecoveryStep(prevProps.adminAccountRecoveryContext.step);
  }

  /**
   * Handle the step of the save account recovery
   * @param previousStep
   */
  handleSaveAccountRecoveryStep(previousStep = AdminAccountRecoveryContextStep.INITIAL_STATE) {
    const stepAccountRecoveryHasChanged = this.props.adminAccountRecoveryContext.step !== previousStep;
    if (stepAccountRecoveryHasChanged) {
      if (this.props.adminAccountRecoveryContext.step === AdminAccountRecoveryContextStep.DISPLAY_SUMMARY) {
        const accountRecoveryPolicy = {
          currentPolicy: this.props.adminAccountRecoveryContext.currentPolicy,
          newPolicy: this.props.adminAccountRecoveryContext.newPolicy,
          confirmSaveRequested: this.props.adminAccountRecoveryContext.confirmSaveRequested
        };
        this.props.dialogContext.open(ConfirmSaveAccountRecoverySettings, {accountRecoveryPolicy});
      } else if (this.props.adminAccountRecoveryContext.step === AdminAccountRecoveryContextStep.ENTER_CURRENT_ORK) {
        const accountRecoveryPolicy = {
          currentPolicy: this.props.adminAccountRecoveryContext.currentPolicy,
          newPolicy: this.props.adminAccountRecoveryContext.newPolicy,
          save: this.props.adminAccountRecoveryContext.save
        };
        this.props.dialogContext.open(ProvideOrganizationKey, {accountRecoveryPolicy});
      }
    }
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleSaveAccountRecovery.propTypes = {
  dialogContext: PropTypes.any, // The dialog context
  adminAccountRecoveryContext: PropTypes.any, // the admin account recovery context
};

export default withDialog(withAdminAccountRecovery(HandleSaveAccountRecovery));
