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

import React, {Component} from "react";
import {Route} from "react-router-dom";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import {withDialog} from "../../../contexts/DialogContext";
import ManageAccountRecoveryUserSettings from "../../AccountRecovery/ManageAccountRecoveryUserSettings/ManageAccountRecoveryUserSettings";
import HandleAccountRecoveryUserSettingsRoute from "../../AccountRecovery/HandleAccountRecoveryUserSettingsRoute/HandleAccountRecoveryUserSettingsRoute";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import {getUserStatus} from "../../../../shared/utils/userUtils";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";

class DisplayAccountRecoveryUserSettings extends Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleReviewClick = this.handleReviewClick.bind(this);
  }

  /**
   * Is the account recovery approved?
   * @returns {boolean}
   */
  hasNotApprovedStatus() {
    return this.props.accountRecoveryContext.status !== "approved";
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns string
   */
  formatFingerprint(fingerprint) {
    if (!fingerprint) {
      return "";
    }
    return fingerprint.toUpperCase().replace(/.{4}(?=.)/g, "$& ");
  }

  /**
   * Returns true if user has rejected the account recovery policy
   * @return {bool}
   */
  isStatusApproved() {
    return this.props.accountRecoveryContext.status === "approved";
  }

  /**
   * Handle user clicking on review click.
   */
  handleReviewClick() {
    this.props.dialogContext.open(ManageAccountRecoveryUserSettings, {
      organizationPolicy: this.props.accountRecoveryContext.getOrganizationPolicy()
    });
  }

  /**
   * Get the user requesting the current user to subscribe to the account recovery program.
   * @returns {object|void}
   */
  get requestor() {
    return this.props.accountRecoveryContext.getRequestor();
  }

  /**
   * Get the user role who initiated the account recovery request.
   * @returns {object}
   */
  get requestorRole() {
    const roleName = this.props.context.roles.find(role => role.id === this.requestor.role_id).name;
    return roleName;
  }

  /**
   * Get the user name requesting the current user to subscribe to the account recovery program.
   * @returns {string}
   */
  get requestorName() {
    return (<>{this.requestor.profile.first_name} {this.requestor.profile.last_name} ({this.requestor.username})</>);
  }

  /**
   * Get the user requesting the current user to subscribe to the account recovery program.
   * @returns {string|void}
   */
  get requestorFingerprint() {
    const requestor = this.requestor;
    return requestor && requestor.gpgkey.fingerprint;
  }

  /**
   * Get the time at when the setup of the account recovery user setting policy has been requested.
   * @returns {string}
   */
  get requestedDate() {
    return this.props.accountRecoveryContext.getRequestedDate();
  }

  /**
   * Returns true if the account recovery feature is not disabled
   * @returns {boolean}
   */
  get isAccountRecoveryFeatureEnabled() {
    return this.policy !== "disabled";
  }

  /**
   * Return the organization policy type.
   * @returns {string|void}
   */
  get policy() {
    return this.props.accountRecoveryContext.getPolicy();
  }

  /**
   * Returns true when the data is fully loaded.
   * @returns {boolean}
   */
  get isReady() {
    return this.props.accountRecoveryContext.isReady();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const requestorStatus = getUserStatus(this.requestor);
    return (
      <>
        {this.props.context.loggedInUser && this.props.accountRecoveryContext.getOrganizationPolicy() &&
          <Route exact path="/app/settings/account-recovery/edit" component={HandleAccountRecoveryUserSettingsRoute}/>
        }
        <div className="main-column account-recovery-profile">
          <div className="main-content">
            {this.isReady && this.isAccountRecoveryFeatureEnabled &&
              <>
                <h3><Trans>Account Recovery</Trans></h3>
                <p>
                  <Trans>It is possible to share securely your recovery kit with the administrator.</Trans>&nbsp;
                  <Trans>They will be able to help you in case you lose it.</Trans>&nbsp;
                  <Trans>Otherwise, you may lose access to your data.</Trans>
                </p>
                <div className="account-recovery-status">
                  <div className="account-recovery-review">
                    <p className="status-wrapper">
                      <span className="title"><Trans>Status</Trans></span>:
                      <span className={`account-recovery-hints ${this.props.accountRecoveryContext.status}`}/>
                      <span className="status">{this.props.accountRecoveryContext.status}</span>
                    </p>
                  </div>
                  {this.hasNotApprovedStatus() &&
                  <ul>
                    <li className="usercard-detailed-col-2">
                      <div className="content-wrapper">
                        <div className="content">
                          <div>
                            <TooltipPortal message={<Fingerprint fingerprint={this.requestorFingerprint} />}>
                              <span className="name-with-tooltip">{this.requestorName}</span>
                            </TooltipPortal>
                            <span className="name"><Trans>requested this operation</Trans></span>
                          </div>
                          <div className="subinfo light">
                            <span className="dateTimeAgo">{formatDateTimeAgo(this.requestedDate, this.props.t, this.props.context.locale)}</span>
                            <span className="chips-group">
                              <span className={`chips user-status ${requestorStatus}`}>{this.props.t(requestorStatus)}</span>
                              <span className={`chips user-role ${this.requestorRole}`}>{this.requestorRole}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <UserAvatar user={this.requestor} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
                    </li>
                  </ul>
                  }
                </div>
              </>
            }
            {this.isReady && !this.isAccountRecoveryFeatureEnabled &&
              <>
                <h3><Trans>Account Recovery</Trans></h3>
                <h4 className="no-border"><Trans>Sorry the account recovery feature is not enabled for this organization.</Trans></h4>
                <p>
                  <Trans>Please contact your administrator to enable the account recovery feature.</Trans>
                </p>
              </>
            }
          </div>
        </div>
        <div className="actions-wrapper">
          {this.hasNotApprovedStatus() && !this.isStatusApproved() &&
            <button type='button' className="button primary" onClick={this.handleReviewClick}><Trans>Review</Trans></button>
          }
        </div>
      </>
    );
  }
}

DisplayAccountRecoveryUserSettings.propTypes = {
  context: PropTypes.any, // The application context
  accountRecoveryContext: PropTypes.any, // The account recovery context
  date: PropTypes.string, // The date of the request
  t: PropTypes.func, // The translation function
  dialogContext: PropTypes.object, // The dialog context
};
export default withAppContext(withAccountRecovery(withDialog(withTranslation('common')(DisplayAccountRecoveryUserSettings))));
