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
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DisplaySimulateSynchronizeUserDirectoryAdministration from "../../DisplaySimulateSynchronizeUserDirectoryAdministration/DisplaySimulateSynchronizeUserDirectoryAdministration";
import DisplaySynchronizeUserDirectoryAdministration from "../../DisplaySynchronizeUserDirectoryAdministration/DisplaySynchronizeUserDirectoryAdministration";
import UserDirectoryFormService from "../../../../../shared/services/forms/userDirectory/UserDirectoryFormService";
import { withAdminUserDirectory } from "../../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import { withActionFeedback } from "../../../../contexts/ActionFeedbackContext";
import { withDialog } from "../../../../contexts/DialogContext";
import DisplayTestUserDirectoryAdministration from "../../DisplayTestUserDirectoryAdministration/DisplayTestUserDirectoryAdministration";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import TestSVG from "../../../../../img/svg/test.svg";
import SimulateSyncSVG from "../../../../../img/svg/simulate-sync.svg";
import RevertSVG from "../../../../../img/svg/revert.svg";

/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationUserDirectoryActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState;
    this.userDirectoryFormService = UserDirectoryFormService.getInstance(
      this.props.adminUserDirectoryContext,
      this.props.t,
    );
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  componentDidUpdate() {
    if (this.props.adminUserDirectoryContext.mustOpenSynchronizePopUp()) {
      this.props.adminUserDirectoryContext.requestSynchronization(false);
      this.handleSynchronizeClick();
    }
  }

  /**
   * Handle save settings
   */
  async handleSaveClick() {
    const settings = this.props.adminUserDirectoryContext.getSettings();
    if (settings.userDirectoryToggle) {
      await this.props.adminUserDirectoryContext.save();
    } else {
      await this.props.adminUserDirectoryContext.delete();
    }
    this.handleSaveSuccess();
  }

  async handleFormSubmit(action) {
    try {
      const isValid = this.userDirectoryFormService.validate();
      if (isValid) {
        switch (action) {
          case "save":
            await this.handleSaveClick();
            break;
          case "test":
            await this.handleTestClick();
            break;
        }
      }
    } catch (error) {
      this.handleSubmitError(error);
    } finally {
      this.props.adminUserDirectoryContext.setSubmitted(true);
      this.props.adminUserDirectoryContext.setProcessing(false);
    }
  }

  /**
   * handle test settings
   */
  async handleTestClick() {
    const result = await this.props.adminUserDirectoryContext.test();
    const displayTestUserDirectoryDialogProps = {
      userDirectoryTestResult: result.body,
    };
    this.props.context.setContext({ displayTestUserDirectoryDialogProps });
    this.props.dialogContext.open(DisplayTestUserDirectoryAdministration);
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    return (
      !this.props.adminUserDirectoryContext.isProcessing() && this.props.adminUserDirectoryContext.hasSettingsChanges()
    );
  }

  /**
   * Is test button is enable
   * @returns {boolean}
   */
  isTestEnabled() {
    return (
      !this.props.adminUserDirectoryContext.isProcessing() &&
      this.props.adminUserDirectoryContext.getSettings().userDirectoryToggle
    );
  }

  /**
   * Is Synchronize button is enable
   * @returns {boolean}
   */
  isSynchronizeEnabled() {
    return (
      !this.props.adminUserDirectoryContext.isProcessing() &&
      this.props.adminUserDirectoryContext.getSettings().userDirectoryToggle &&
      this.props.adminUserDirectoryContext.getCurrentSettings().userDirectoryToggle
    );
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTestClick = this.handleTestClick.bind(this);
    this.handleSimulateSynchronizeClick = this.handleSimulateSynchronizeClick.bind(this);
    this.handleSynchronizeClick = this.handleSynchronizeClick.bind(this);
  }

  /**
   * Handle simulate synchronize settings
   */
  handleSimulateSynchronizeClick() {
    this.props.dialogContext.open(DisplaySimulateSynchronizeUserDirectoryAdministration);
  }

  /**
   * Handle synchronize settings
   */
  handleSynchronizeClick() {
    this.props.dialogContext.open(DisplaySynchronizeUserDirectoryAdministration);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(
      this.props.t("The user directory settings for the organization were updated."),
    );
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSubmitError(error) {
    // It can happen when the userx has closed the passphrase entry dialog by instance.
    if (error.name !== "UserAbortsOperationError") {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  async handleError(error) {
    await this.props.actionFeedbackContext.displayError(error.message);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="actions-wrapper">
        <div className="left-actions-wrapper">
          <button
            type="button"
            className="button secondary"
            disabled={!this.isTestEnabled()}
            onClick={() => this.handleFormSubmit("test")}
          >
            <TestSVG />
            <span>
              <Trans>Test settings</Trans>
            </span>
          </button>
          <button
            type="button"
            className="button secondary "
            disabled={!this.isSynchronizeEnabled()}
            onClick={this.handleSimulateSynchronizeClick}
          >
            <SimulateSyncSVG />
            <span>
              <Trans>Simulate synchronize</Trans>
            </span>
          </button>
          <button
            type="button"
            className="button secondary"
            disabled={!this.isSynchronizeEnabled()}
            onClick={this.handleSynchronizeClick}
          >
            <RevertSVG />
            <span>
              <Trans>Synchronize</Trans>
            </span>
          </button>
        </div>
        <button
          type="button"
          className="button primary form"
          disabled={!this.isSaveEnabled()}
          onClick={() => this.handleFormSubmit("save")}
        >
          <span>
            <Trans>Save</Trans>
          </span>
        </button>
      </div>
    );
  }
}

DisplayAdministrationUserDirectoryActions.propTypes = {
  context: PropTypes.object, // Application context
  dialogContext: PropTypes.object, // The dialog notification context
  adminUserDirectoryContext: PropTypes.object, // The email notification context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withActionFeedback(
    withDialog(withAdminUserDirectory(withTranslation("common")(DisplayAdministrationUserDirectoryActions))),
  ),
);
