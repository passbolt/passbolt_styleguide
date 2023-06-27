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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayAdministrationEmailNotificationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationEmailNotificationActions/DisplayAdministrationEmailNotificationActions";
import {withAdminEmailNotification} from "../../../contexts/Administration/AdministrationEmailNotification/AdministrationEmailNotificationContext";

/**
 * This component allows to display the email notifications for the administration
 */
class DisplayEmailNotificationsAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
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

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationEmailNotificationActions);
    this.props.adminEmailNotificationContext.findEmailNotificationSettings();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminEmailNotificationContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const value = event.target.checked;
    const name = event.target.name;
    this.props.adminEmailNotificationContext.setSettings(name, value);
  }

  /**
   * Should input be disabled? True if processing actions
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminEmailNotificationContext.isProcessing();
  }

  /**
   * Has database setting
   * @returns {boolean}
   */
  hasDatabaseSetting() {
    return this.props.adminEmailNotificationContext.getSettings().hasDatabaseSetting;
  }

  /**
   * Has file config setting
   * @returns {boolean}
   */
  hasFileConfigSetting() {
    return this.props.adminEmailNotificationContext.getSettings().hasFileConfigSetting;
  }

  /**
   * Can use folders
   * @returns {*}
   */
  canUseFolders() {
    return this.props.context.siteSettings.canIUse("folders");
  }

  /**
   * Can use folders
   * @returns {*}
   */
  canUseAccountRecovery() {
    return this.props.context.siteSettings.canIUse("accountRecovery");
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const settings = this.props.adminEmailNotificationContext.getSettings();
    return (
      <div className="row">
        <div className="email-notification-settings col8 main-column">
          {settings && this.hasDatabaseSetting() && this.hasFileConfigSetting() &&
          <div className="warning message" id="email-notification-setting-overridden-banner">
            <p>
              <Trans>Settings have been found in your database as well as in your passbolt.php (or environment variables).</Trans> <Trans>The settings displayed in the form below are the one stored in your database and have precedence over others.</Trans>
            </p>
          </div>
          }
          {settings && !this.hasDatabaseSetting() && this.hasFileConfigSetting() &&
          <div className="warning message" id="email-notification-fileconfig-exists-banner">
            <p>
              <Trans>You seem to have Email Notification Settings defined in your passbolt.php (or via environment variables).</Trans> <Trans>Submitting the form will overwrite those settings with the ones you choose in the form below.</Trans>
            </p>
          </div>
          }
          <h3><Trans>Email delivery</Trans></h3>
          <p>
            <Trans>In this section you can choose which email notifications will be sent.</Trans>
          </p>
          <div className="section">
            <div className="password-section">
              <label><Trans>Passwords</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordCreate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.passwordCreate} id="send-password-create-toggle-button"/>
                <label className="text" htmlFor="send-password-create-toggle-button">
                  <Trans>When a password is created, notify its creator.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordUpdate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.passwordUpdate} id="send-password-update-toggle-button"/>
                <label className="text" htmlFor="send-password-update-toggle-button">
                  <Trans>When a password is updated, notify the users who have access to it.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordDelete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.passwordDelete} id="send-password-delete-toggle-button"/>
                <label className="text" htmlFor="send-password-delete-toggle-button">
                  <Trans>When a password is deleted, notify the users who had access to it.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordShare" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.passwordShare} id="send-password-share-toggle-button"/>
                <label className="text" htmlFor="send-password-share-toggle-button">
                  <Trans>When a password is shared, notify the users who gain access to it.</Trans>
                </label>
              </span>
            </div>
            {this.canUseFolders() &&
              <div className="folder-section">
                <label><Trans>Folders</Trans></label>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderCreate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={settings.folderCreate} id="send-folder-create-toggle-button"/>
                  <label className="text" htmlFor="send-folder-create-toggle-button">
                    <Trans>When a folder is created, notify its creator.</Trans>
                  </label>
                </span>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderUpdate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={settings.folderUpdate} id="send-folder-update-toggle-button"/>
                  <label className="text" htmlFor="send-folder-update-toggle-button">
                    <Trans>When a folder is updated, notify the users who have access to it.</Trans>
                  </label>
                </span>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderDelete" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={settings.folderDelete} id="send-folder-delete-toggle-button"/>
                  <label className="text" htmlFor="send-folder-delete-toggle-button">
                    <Trans>When a folder is deleted, notify the users who had access to it.</Trans>
                  </label>
                </span>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderShare" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={settings.folderShare} id="send-folder-share-toggle-button"/>
                  <label className="text" htmlFor="send-folder-share-toggle-button">
                    <Trans>When a folder is shared, notify the users who gain access to it.</Trans>
                  </label>
                </span>
              </div>
            }
          </div>
          <div className="section">
            <div className="comment-section">
              <label><Trans>Comments</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="commentAdd" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.commentAdd} id="send-comment-add-toggle-button"/>
                <label className="text" htmlFor="send-comment-add-toggle-button">
                  <Trans>When a comment is posted on a password, notify the users who have access to this password.</Trans>
                </label>
              </span>
            </div>
          </div>
          <div className="section">
            <div className="group-section">
              <label><Trans>Group membership</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupDelete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.groupDelete} id="send-group-delete-toggle-button"/>
                <label className="text" htmlFor="send-group-delete-toggle-button">
                  <Trans>When a group is deleted, notify the users who were members of it.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserAdd" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.groupUserAdd} id="send-group-user-add-toggle-button"/>
                <label className="text" htmlFor="send-group-user-add-toggle-button">
                  <Trans>When users are added to a group, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserDelete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.groupUserDelete} id="send-group-user-delete-toggle-button"/>
                <label className="text" htmlFor="send-group-user-delete-toggle-button">
                  <Trans>When users are removed from a group, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserUpdate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.groupUserUpdate} id="send-group-user-update-toggle-button"/>
                <label className="text" htmlFor="send-group-user-update-toggle-button">
                  <Trans>When user roles change in a group, notify the corresponding users.</Trans>
                </label>
              </span>
            </div>
            <div className="group-admin-section">
              <label><Trans>Group manager</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupManagerUpdate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.groupManagerUpdate} id="send-group-manager-update-toggle-button"/>
                <label className="text" htmlFor="send-group-manager-update-toggle-button">
                  <Trans>When members of a group change, notify the group manager(s).</Trans>
                </label>
              </span>
            </div>
          </div>
          <h3><Trans>Registration & Recovery</Trans></h3>
          <div className="section">
            <div className="admin-section">
              <label><Trans>Admin</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userSetupCompleteAdmin" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.userSetupCompleteAdmin} id="user-setup-complete-admin-toggle-button"/>
                <label className="text" htmlFor="user-setup-complete-admin-toggle-button">
                  <Trans>When a user completed a setup, notify all the administrators.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecoverCompleteAdmin" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.userRecoverCompleteAdmin} id="user-recover-complete-admin-toggle-button"/>
                <label className="text" htmlFor="user-recover-complete-admin-toggle-button">
                  <Trans>When a user completed a recover, notify all the administrators.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecoverAbortAdmin" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.userRecoverAbortAdmin} id="user-recover-abort-admin-toggle-button"/>
                <label className="text" htmlFor="user-recover-abort-admin-toggle-button">
                  <Trans>When a user aborted a recover, notify all the administrators.</Trans>
                </label>
              </span>
            </div>
            <div className="user-section">
              <label><Trans>User</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userCreate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.userCreate} id="send-user-create-toggle-button"/>
                <label className="text" htmlFor="send-user-create-toggle-button">
                  <Trans>When new users are invited to passbolt, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecover" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.userRecover} id="send-user-recover-toggle-button"/>
                <label className="text" htmlFor="send-user-recover-toggle-button">
                  <Trans>When users try to recover their account, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecoverComplete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.userRecoverComplete} id="user-recover-complete-toggle-button"/>
                <label className="text" htmlFor="user-recover-complete-toggle-button">
                  <Trans>When users completed the recover of their account, notify them.</Trans>
                </label>
              </span>
            </div>
          </div>
          {this.canUseAccountRecovery() &&
            <>
              <h3><Trans>Account recovery</Trans></h3>
              <div className="section">
                <div className="admin-section">
                  <label><Trans>Admin</Trans></label>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestAdmin" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestAdmin} id="account-recovery-request-admin-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-request-admin-toggle-button">
                      <Trans>When an account recovery is requested, notify all the administrators.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestPolicyUpdate" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestPolicyUpdate} id="account-recovery-policy-update-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-policy-update-toggle-button">
                      <Trans>When an account recovery policy is updated, notify all the administrators.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestCreatedAmin" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestCreatedAmin} id="account-recovery-response-created-admin-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-created-admin-toggle-button">
                      <Trans>When an administrator answered to an account recovery request, notify the administrator at the origin of the action.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestCreatedAllAdmins" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestCreatedAllAdmins} id="account-recovery-response-created-all-admin-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-created-all-admin-toggle-button">
                      <Trans>When an administrator answered to an account recovery request, notify all the administrators.</Trans>
                    </label>
                  </span>
                </div>
                <div className="user-section">
                  <label><Trans>User</Trans></label>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestUser" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestUser} id="account-recovery-request-user-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-request-user-toggle-button">
                      <Trans>When an account recovery is requested, notify the user.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestUserApproved" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestUserApproved} id="account-recovery-response-user-approved-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-user-approved-toggle-button">
                      <Trans>When an account recovery is approved, notify the user.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestUserRejected" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={settings.accountRecoveryRequestUserRejected} id="account-recovery-response-user-rejected-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-user-rejected-toggle-button">
                      <Trans>When an account recovery is rejected, notify the user.</Trans>
                    </label>
                  </span>
                </div>
              </div>
            </>
          }
          <h3><Trans>Email content visibility</Trans></h3>
          <p><Trans>In this section you can adjust the composition of the emails, e.g. which information will be included in the notification.</Trans></p>
          <div className="section">
            <div className="password-section">
              <label><Trans>Passwords</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showUsername" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.showUsername} id="show-username-toggle-button"/>
                <label className="text" htmlFor="show-username-toggle-button">
                  <Trans>Username</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showUri" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.showUri} id="show-uri-toggle-button"/>
                <label className="text" htmlFor="show-uri-toggle-button">
                  <Trans>URI</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element ready">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showSecret" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.showSecret} id="show-secret-toggle-button"/>
                <label className="text" htmlFor="show-secret-toggle-button">
                  <Trans>Encrypted secret</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showDescription" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.showDescription} id="show-description-toggle-button"/>
                <label className="text" htmlFor="show-description-toggle-button">
                  <Trans>Description</Trans>
                </label>
              </span>
            </div>
            <div className="comment-section">
              <label><Trans>Comments</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showComment" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={settings.showComment} id="show-comment-toggle-button"/>
                <label className="text" htmlFor="show-comment-toggle-button">
                  <Trans>Comment content</Trans>
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about email notification, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/notification/email" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayEmailNotificationsAdministration.propTypes = {
  context: PropTypes.any, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminEmailNotificationContext: PropTypes.object, // The administration email notification context
};

export default withAppContext(withAdminEmailNotification(withAdministrationWorkspace(withTranslation('common')(DisplayEmailNotificationsAdministration))));
