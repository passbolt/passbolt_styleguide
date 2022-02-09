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
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {
  AdminAccountRecoveryContextStep,
  withAdminAccountRecovery
} from "../../../contexts/AdminAccountRecoveryContext";
import {withDialog} from "../../../contexts/DialogContext";
import ProvideAccountRecoveryOrganizationKey from "../ProvideAccountRecoveryOrganizationKey/ProvideAccountRecoveryOrganizationKey";
import ConfirmSaveAccountRecoverySettings from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withAppContext} from "../../../contexts/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

/**
 * This component handle the save admin account recovery.
 */
class HandleSaveAccountRecovery extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  componentDidMount() {
    this.handleSaveAccountRecoveryStep();
  }

  componentDidUpdate(prevProps) {
    this.handleSaveAccountRecoveryStep(prevProps.adminAccountRecoveryContext.step);
  }

  bindCallbacks() {
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleConfirmSave = this.handleConfirmSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Handle the step of the save account recovery
   * @param previousStep
   */
  handleSaveAccountRecoveryStep(previousStep = AdminAccountRecoveryContextStep.INITIAL_STATE) {
    const step = this.props.adminAccountRecoveryContext.step;
    if (step === previousStep) {
      return;
    }

    if (step === AdminAccountRecoveryContextStep.DISPLAY_SUMMARY) {
      this.displayDialogForDisplaySummaryStep();
    } else if (step === AdminAccountRecoveryContextStep.ENTER_CURRENT_ORK) {
      this.displayDialogForEnterCurrentOrkStep();
    }
  }

  displayDialogForDisplaySummaryStep() {
    const accountRecoveryPolicy = {
      currentPolicy: this.props.adminAccountRecoveryContext.currentPolicy,
      newPolicy: this.props.adminAccountRecoveryContext.newPolicy,
      currentKeyDetail: this.props.adminAccountRecoveryContext.currentKeyDetail,
      newKeyDetail: this.props.adminAccountRecoveryContext.newKeyDetail
    };

    this.props.dialogContext.open(ConfirmSaveAccountRecoverySettings, {
      accountRecoveryPolicy,
      onCancel: this.handleCancelDialog,
      onError: this.handleError,
      onSubmit: this.handleConfirmSave
    });
  }

  displayDialogForEnterCurrentOrkStep() {
    const accountRecoveryPolicy = {
      currentPolicy: this.props.adminAccountRecoveryContext.currentPolicy,
      newPolicy: this.props.adminAccountRecoveryContext.newPolicy
    };

    this.props.dialogContext.open(ProvideAccountRecoveryOrganizationKey, {
      accountRecoveryPolicy,
      onCancel: this.handleCancelDialog,
      onError: this.handleError,
      onSubmit: this.handleSave,
    });
  }

  handleCancelDialog() {
    this.props.adminAccountRecoveryContext.cancelSaveOperation();
  }

  handleConfirmSave() {
    this.props.adminAccountRecoveryContext.confirmSaveRequested();
  }

  /**
   * Handle the actual registration of the new ORK.
   * @param {Object|null} privateGpgKeyDto the private ORK given by the admin if any.
   */
  async handleSave(privateGpgKeyDto) {
    try {
      await this.props.adminAccountRecoveryContext.save(privateGpgKeyDto);
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The organization recovery policy has been updated successfully"));
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  }

  async handleError(error) {
    const errorDialogProps = {
      title: this.translate("There was an unexpected error..."),
      message: error.message
    };
    this.props.context.setContext({errorDialogProps});
    this.props.dialogContext.open(NotifyError);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
  actionFeedbackContext: PropTypes.object, // the admin action feedback context
  context: PropTypes.object, // the app context,
  t: PropTypes.func // the translation function
};

export default withAppContext(withDialog(withActionFeedback(withAdminAccountRecovery(withTranslation("common")(HandleSaveAccountRecovery)))));
