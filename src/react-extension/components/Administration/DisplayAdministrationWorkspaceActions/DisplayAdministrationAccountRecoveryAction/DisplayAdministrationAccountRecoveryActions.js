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
import PropTypes from "prop-types";
import Icon from "../../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAdminAccountRecovery} from "../../../../contexts/AdminAccountRecoveryContext";
import {AccountRecoveryUserContextProvider} from "../../../../contexts/AccountRecoveryUserContext";
import {withWorkflow} from "../../../../contexts/WorkflowContext";
import HandleSaveAccountRecoveryOrganizationPolicyWorkflow
  from "../../HandleSaveAccountRecoveryOrganizationPolicyWorkflow/HandleSaveAccountRecoveryOrganizationPolicyWorkflow";

/**
 * This component is a container of multiple actions applicable on setting
 */
class DisplayAdministrationWorkspaceActions extends React.Component {
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
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleEditSubscriptionClick = this.handleEditSubscriptionClick.bind(this);
  }

  /**
   * Handle save settings
   */
  handleSaveClick() {
    this.props.workflowContext.start(HandleSaveAccountRecoveryOrganizationPolicyWorkflow, {});
  }

  /**
   * Handle reset account recovery policy settings
   */
  handleEditSubscriptionClick() {
    this.props.adminAccountRecoveryContext.resetChanges();
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    if (!this.props.adminAccountRecoveryContext.hasPolicyChanges()) { //there is currently no change
      return false;
    }
    const changes = this.props.adminAccountRecoveryContext.policyChanges;
    const currentPolicy = this.props.adminAccountRecoveryContext.currentPolicy;

    if (changes?.policy ===  AccountRecoveryUserContextProvider.POLICY_DISABLED) {
      // the new policy type to save is now disabled, there is no need to check for the key, we can save
      return true;
    }

    const effectiveOrk = changes.publicKey || currentPolicy.account_recovery_organization_public_key?.armored_key;
    if (Boolean(changes.policy) && Boolean(effectiveOrk)) {
      //the policy has changed to an enabled type and there is an applicable ORK, we can save
      return true;
    }

    //the policy didn't changed, so we check if the applicable one is enabled and if we have a new key defined
    return currentPolicy.policy !== AccountRecoveryUserContextProvider.POLICY_DISABLED && Boolean(changes.publicKey);
  }

  /**
   * Is save button enable
   */
  isResetEnabled() {
    return this.props.adminAccountRecoveryContext.hasPolicyChanges();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <div>
            <li>
              <button type="button" disabled={!this.isSaveEnabled()} onClick={this.handleSaveClick}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </div>
          <div>
            <li>
              <button type="button" disabled={!this.isResetEnabled()} onClick={this.handleEditSubscriptionClick}>
                <Icon name="edit"/>
                <span><Trans>Reset settings</Trans></span>
              </button>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationWorkspaceActions.propTypes = {
  adminAccountRecoveryContext: PropTypes.object, // The admin account recovery context
  workflowContext: PropTypes.any, // the workflow context
};

export default withWorkflow(withAdminAccountRecovery(withTranslation("common")(DisplayAdministrationWorkspaceActions)));
