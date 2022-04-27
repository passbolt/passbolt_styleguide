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

import React from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {withAdminAccountRecovery} from "../../../contexts/AdminAccountRecoveryContext";
import {withDialog} from "../../../contexts/DialogContext";
import ProvideAccountRecoveryOrganizationKey from "../ProvideAccountRecoveryOrganizationKey/ProvideAccountRecoveryOrganizationKey";
import ConfirmSaveAccountRecoverySettings from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withAppContext} from "../../../contexts/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

/**
 * This component handle the account recovery organization policy save.
 */
class HandleSaveAccountRecoveryOrganizationPolicyWorkflow extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.displayConfirmSummaryDialog();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleConfirmSave = this.handleConfirmSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Display the confirmation summary dialog
   * @returns {Promise<void>}
   */
  async displayConfirmSummaryDialog() {
    this.props.dialogContext.open(ConfirmSaveAccountRecoverySettings, {
      policy: this.props.adminAccountRecoveryContext.policyChanges?.policy,
      keyInfo: await this.getNewOrganizationKeyInfo(),
      onClose: this.handleCloseDialog,
      onSubmit: this.handleConfirmSave
    });
  }

  /**
   * Get the new organization public key info.
   * @returns {Promise<null|object>}
   */
  getNewOrganizationKeyInfo() {
    const organizationKey = this.props.adminAccountRecoveryContext.policyChanges?.publicKey;
    if (organizationKey) {
      return this.props.adminAccountRecoveryContext.getKeyInfo(organizationKey);
    }
    return null;
  }

  /**
   * Display the capture account recovery organization key dialog dialog
   * @returns {Promise<void>}
   */
  displayProvideAccountRecoveryOrganizationKeyDialog() {
    this.props.dialogContext.open(ProvideAccountRecoveryOrganizationKey, {
      onClose: this.handleCloseDialog,
      onSubmit: this.handleSave,
    });
  }

  /**
   * Whenever the user close a dialog, stop the workflow.
   */
  handleCloseDialog() {
    this.props.onStop();
  }

  /**
   * Handle the confirmation.
   * @return {Promise<void>}
   */
  async handleConfirmSave() {
    const hasKey = Boolean(this.props.adminAccountRecoveryContext.currentPolicy?.account_recovery_organization_public_key);
    if (hasKey) {
      this.displayProvideAccountRecoveryOrganizationKeyDialog();
    } else {
      await this.handleSave();
    }
  }

  /**
   * Handle the actual registration of the new ORK.
   * @param {Object|null} privateGpgKeyDto the private ORK given by the admin if any.
   */
  async handleSave(privateGpgKeyDto = null) {
    try {
      await this.props.adminAccountRecoveryContext.save(privateGpgKeyDto);
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The organization recovery policy has been updated successfully"));
      this.props.onStop();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle error
   * @param error
   */
  handleError(error) {
    const dialogControlledErrors = [
      "UserAbortsOperationError",
      "WrongOrganizationRecoveryKeyError",
      "InvalidMasterPasswordError",
      "BadSignatureMessageGpgKeyError",
      "GpgKeyError"
    ];
    // If the error is controlled by the dialogs, throw it to let the dialogs handle it.
    if (dialogControlledErrors.includes(error.name)) {
      throw error;
    }

    if (error.name === "PassboltApiFetchError" && error?.data?.body?.account_recovery_organization_public_key?.fingerprint?.isNotAccountRecoveryOrganizationPublicKeyFingerprintRule) {
      this.props.dialogContext.open(NotifyError, {error: new Error(this.translate("The new organization recovery key should not be a formerly used organization recovery key."))});
    } else {
      // Handle unexpected error.
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.props.onStop();
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

HandleSaveAccountRecoveryOrganizationPolicyWorkflow.propTypes = {
  dialogContext: PropTypes.any, // The dialog context
  adminAccountRecoveryContext: PropTypes.any, // the admin account recovery context
  actionFeedbackContext: PropTypes.object, // the admin action feedback context
  context: PropTypes.object, // the app context,
  onStop: PropTypes.func.isRequired, // The callback to stop the workflow
  t: PropTypes.func // the translation function
};

export default withAppContext(withDialog(withActionFeedback(withAdminAccountRecovery(withTranslation("common")(HandleSaveAccountRecoveryOrganizationPolicyWorkflow)))));
