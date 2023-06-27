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
 * @since        3.6.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import ManageAccountRecoveryUserSettings from "../ManageAccountRecoveryUserSettings/ManageAccountRecoveryUserSettings";
import {AccountRecoveryUserContextProvider} from "../../../contexts/AccountRecoveryUserContext";

class HandleAccountRecoveryUserSettingsRoute extends React.Component {
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.handleRoute();
  }

  /**
   * Handle the review account recovery request route.
   * @returns {Promise<void>}
   */
  async handleRoute() {
    const isPolicyDisabled = this.props.accountRecoveryContext.getPolicy() === AccountRecoveryUserContextProvider.POLICY_DISABLED;
    if (isPolicyDisabled) {
      this.redirectToSettingsPage();
      return;
    }

    const hasUserAlreadyEnrolledTheProgram = this.props.accountRecoveryContext.getUserAccountRecoverySubscriptionStatus() === AccountRecoveryUserContextProvider.STATUS_APPROVED;
    if (hasUserAlreadyEnrolledTheProgram) {
      this.showAlreadyEnrolledFeedback();
      this.redirectToSettingsPage();
      return;
    }

    this.props.dialogContext.open(ManageAccountRecoveryUserSettings, {
      organizationPolicy: this.props.accountRecoveryContext.getOrganizationPolicy()
    });
  }

  /**
   * Notify the user that the enrollment has been done already.
   */
  async showAlreadyEnrolledFeedback() {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("You already enrolled to the account recovery program"));
  }

  /**
   * Redirect to the account recovery user settings page.
   */
  redirectToSettingsPage() {
    this.props.history.push("/app/settings/account-recovery");
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return null;
  }
}

HandleAccountRecoveryUserSettingsRoute.propTypes = {
  dialogContext: PropTypes.any, // The application context
  accountRecoveryContext: PropTypes.object, // The user account recovery context
  history: PropTypes.object, // The router history helper
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withRouter(withDialog(withAccountRecovery(withActionFeedback(withTranslation("common")(HandleAccountRecoveryUserSettingsRoute)))));
