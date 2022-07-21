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
import {withActionFeedback} from "../../../../react-extension/contexts/ActionFeedbackContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";

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
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      loading: true, // component is loading or not
      processing: false, // component is processing or not

      hasDatabaseSetting: false, // has database setting
      hasFileConfigSetting: false, // has file config setting
      // Email delivery

      // Passwords
      passwordCreate: true, // send email when a password is created
      passwordShare: true, // send email when a password is shared
      passwordUpdate: true, // send email when a password is updated
      passwordDelete: true, // send email when a password is deleted
      // Folders
      folderCreate: true, // send email when a folder is created
      folderUpdate: true, // send email when a folder is updated
      folderDelete: true, // send email when a folder is deleted
      folderShare: true, // send email when a folder is shared
      // Comment
      commentAdd: true, // send email when a commend is added
      // Group Membership
      groupDelete: true, // send email when a group is deleted
      groupUserAdd: true, // send email when a user is added in a group
      groupUserDelete: true, // send email when a user is deleted in a group
      groupUserUpdate: true, // send email when a user is updated in a group
      // Group Manager
      groupManagerUpdate: true, // send email when a group manager is updated
      // Registration & Recovery
      userCreate: true, // send email when a user is created
      userRecover: true, // send email when a user is recovered
      userRecoverComplete: true, //send email when a user complete a recovery of the account
      userRecoverAbortAdmin: true, //send email to the admins when a user aborted a recover
      userRecoverCompleteAdmin: true, //send email to the admins when a user completed a recover

      // Account Recovery
      accountRecoveryRequestAdmin: true, //send email to the admins when a user did an account recovery request
      accountRecoveryRequestGuessing: true, //send email to the admin when a suspicious attempt to recovery a key is made
      accountRecoveryRequestCreatedAmin: true, //send email to the admin when when an account recovery response has been created
      accountRecoveryRequestCreatedAllAdmins: true, //send email to all admins when an account recovery response has been created
      accountRecoveryRequestPolicyUpdate: true, //send email to the admins when the account recovery organization policy has been updated
      accountRecoveryRequestUser: true, //send email to the user when an account recovery request has been made
      accountRecoveryRequestUserApproved: true, //send email to the user when the account recovery request has been approved
      accountRecoveryRequestUserRejected: true, //send email to the user when the account recovery request has been rejected

      // Email content visibility

      // Passwords
      showDescription: true, // show description in email
      showSecret: true, // show secret in email
      showUri: true, // show uri in email
      showUsername: true, // show username in email
      // Comments
      showComment: true, // show comment in email,
    };
  }

  async componentDidMount() {
    this.findAllEmailNotificationsSettings();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleMustSave(prevProps.administrationWorkspaceContext.must.save);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle the must save change
   * @param previousMustSaveSettings Previous must save settings
   */
  async handleMustSave(previousMustSaveSettings) {
    const hasMustSaveChanged = this.props.administrationWorkspaceContext.must.save !== previousMustSaveSettings;
    if (hasMustSaveChanged && this.props.administrationWorkspaceContext.must.save) {
      await this.handleFormSubmit();
      this.props.administrationWorkspaceContext.onResetActionsSettings();
    }
  }

  /**
   * fetch the email notifications settings
   */
  async findAllEmailNotificationsSettings() {
    const result = await this.props.administrationWorkspaceContext.onGetEmailNotificationsRequested();
    const body = result.body;

    const hasDatabaseSetting =  body.sources_database;
    const hasFileConfigSetting =  body.sources_file;
    // Email delivery

    // Passwords
    const passwordCreate = body.send_password_create;
    const passwordShare = body.send_password_share;
    const passwordUpdate = body.send_password_update;
    const passwordDelete = body.send_password_delete;
    // Folders
    const folderCreate = body.send_folder_create;
    const folderUpdate = body.send_folder_update;
    const folderDelete = body.send_folder_delete;
    const folderShare = body.send_folder_share;
    // Comment
    const commentAdd = body.send_comment_add;
    // Group Membership
    const groupDelete = body.send_group_delete;
    const groupUserAdd = body.send_group_user_add;
    const groupUserDelete = body.send_group_user_delete;
    const groupUserUpdate = body.send_group_user_update;
    // Group Manager
    const groupManagerUpdate = body.send_group_manager_update;
    // Registration & Recovery
    const userCreate = body.send_user_create;
    const userRecover = body.send_user_recover;
    const userRecoverComplete = body.send_user_recoverComplete;
    const userRecoverAbortAdmin = body.send_admin_user_recover_abort;
    const userRecoverCompleteAdmin = body.send_admin_user_recover_complete;
    const userSetupCompleteAdmin = body.send_admin_user_setup_completed;

    // Email content visibility

    // Passwords
    const  showDescription = body.show_description;
    const  showSecret = body.show_secret;
    const  showUri = body.show_uri;
    const  showUsername = body.show_username;
    // Comments
    const  showComment = body.show_comment;

    // Account recovery
    const accountRecoveryRequestUser = body.send_accountRecovery_request_user;
    const accountRecoveryRequestAdmin = body.send_accountRecovery_request_admin;
    const accountRecoveryRequestGuessing = body.send_accountRecovery_request_guessing;
    const accountRecoveryRequestUserApproved = body.send_accountRecovery_response_user_approved;
    const accountRecoveryRequestUserRejected = body.send_accountRecovery_response_user_rejected;
    const accountRecoveryRequestCreatedAmin = body.send_accountRecovery_response_created_admin;
    const accountRecoveryRequestCreatedAllAdmins = body.send_accountRecovery_response_created_allAdmins;
    const accountRecoveryRequestPolicyUpdate = body.send_accountRecovery_policy_update;

    this.setState({
      loading: false,
      hasDatabaseSetting,
      hasFileConfigSetting,
      passwordCreate,
      passwordShare,
      passwordUpdate,
      passwordDelete,
      folderCreate,
      folderUpdate,
      folderDelete,
      folderShare,
      commentAdd,
      groupDelete,
      groupUserAdd,
      groupUserDelete,
      groupUserUpdate,
      groupManagerUpdate,
      userCreate,
      userRecover,
      userRecoverComplete,
      userRecoverCompleteAdmin,
      userSetupCompleteAdmin,
      showDescription,
      showSecret,
      showUri,
      showUsername,
      showComment,
      accountRecoveryRequestUser,
      accountRecoveryRequestAdmin,
      accountRecoveryRequestGuessing,
      accountRecoveryRequestUserApproved,
      accountRecoveryRequestUserRejected,
      accountRecoveryRequestCreatedAmin,
      accountRecoveryRequestCreatedAllAdmins,
      accountRecoveryRequestPolicyUpdate,
      userRecoverAbortAdmin,
    });
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    this.setState({[name]: value});
    this.handleEnabledSaveButton();
  }

  /**
   * Handle enabled the save button
   */
  handleEnabledSaveButton() {
    if (!this.props.administrationWorkspaceContext.can.save) {
      this.props.administrationWorkspaceContext.onSaveEnabled();
    }
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      try {
        await this.saveEmailNotifications();
        await this.handleSaveSuccess();
      } catch (error) {
        await this.handleSaveError(error);
      }
    }
  }

  /**
   * save Email settings
   * @returns {Promise<*>}
   */
  async saveEmailNotifications() {
    const emailNotifications = {
      sources_database: this.state.hasDatabaseSetting,
      sources_file: this.state.hasFileConfigSetting,
      send_password_create: this.state.passwordCreate,
      send_password_share: this.state.passwordShare,
      send_password_update: this.state.passwordUpdate,
      send_password_delete: this.state.passwordDelete,
      send_folder_create: this.state.folderCreate,
      send_folder_update: this.state.folderUpdate,
      send_folder_delete: this.state.folderDelete,
      send_folder_share: this.state.folderShare,
      send_comment_add: this.state.commentAdd,
      send_group_delete: this.state.groupDelete,
      send_group_user_add: this.state.groupUserAdd,
      send_group_user_delete: this.state.groupUserDelete,
      send_group_user_update: this.state.groupUserUpdate,
      send_group_manager_update: this.state.groupManagerUpdate,
      send_user_create: this.state.userCreate,
      send_user_recover: this.state.userRecover,
      send_user_recoverComplete: this.state.userRecoverComplete,
      send_admin_user_setup_completed: this.state.userSetupCompleteAdmin,
      send_admin_user_recover_abort: this.state.userRecoverAbortAdmin,
      send_admin_user_recover_complete: this.state.userRecoverCompleteAdmin,
      send_accountRecovery_request_user: this.state.accountRecoveryRequestUser,
      send_accountRecovery_request_admin: this.state.accountRecoveryRequestAdmin,
      send_accountRecovery_request_guessing: this.state.accountRecoveryRequestGuessing,
      send_accountRecovery_response_user_approved: this.state.accountRecoveryRequestUserApproved,
      send_accountRecovery_response_user_rejected: this.state.accountRecoveryRequestUserRejected,
      send_accountRecovery_response_created_admin: this.state.accountRecoveryRequestCreatedAmin,
      send_accountRecovery_response_created_allAdmins: this.state.accountRecoveryRequestCreatedAllAdmins,
      send_accountRecovery_policy_update: this.state.accountRecoveryRequestPolicyUpdate,
      show_description: this.state.showDescription,
      show_secret: this.state.showSecret,
      show_uri: this.state.showUri,
      show_username: this.state.showUsername,
      show_comment: this.state.showComment,
    };

    await this.props.administrationWorkspaceContext.onSaveEmailNotificationsRequested(emailNotifications);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The email notification settings were updated."));
    this.setState({processing: false});
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
      this.setState({processing: false});
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
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
  }

  /**
   * Has database setting
   * @returns {boolean}
   */
  hasDatabaseSetting() {
    return this.state.hasDatabaseSetting;
  }

  /**
   * Has file config setting
   * @returns {boolean}
   */
  hasFileConfigSetting() {
    return this.state.hasFileConfigSetting;
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
    return (
      <div className="row">
        <div className="email-notification-settings col8 main-column">
          {this.hasDatabaseSetting() && this.hasFileConfigSetting() &&
          <div className="warning message" id="email-notification-setting-overridden-banner">
            <p>
              <Trans>Settings have been found in your database as well as in your passbolt.php (or environment variables).</Trans> <Trans>The settings displayed in the form below are the one stored in your database and have precedence over others.</Trans>
            </p>
          </div>
          }
          {!this.hasDatabaseSetting() && this.hasFileConfigSetting() &&
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
                  onChange={this.handleInputChange} checked={this.state.passwordCreate} id="send-password-create-toggle-button"/>
                <label className="text" htmlFor="send-password-create-toggle-button">
                  <Trans>When a password is created, notify its creator.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordUpdate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.passwordUpdate} id="send-password-update-toggle-button"/>
                <label className="text" htmlFor="send-password-update-toggle-button">
                  <Trans>When a password is updated, notify the users who have access to it.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordDelete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.passwordDelete} id="send-password-delete-toggle-button"/>
                <label className="text" htmlFor="send-password-delete-toggle-button">
                  <Trans>When a password is deleted, notify the users who had access to it.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordShare" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.passwordShare} id="send-password-share-toggle-button"/>
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
                    onChange={this.handleInputChange} checked={this.state.folderCreate} id="send-folder-create-toggle-button"/>
                  <label className="text" htmlFor="send-folder-create-toggle-button">
                    <Trans>When a folder is created, notify its creator.</Trans>
                  </label>
                </span>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderUpdate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderUpdate} id="send-folder-update-toggle-button"/>
                  <label className="text" htmlFor="send-folder-update-toggle-button">
                    <Trans>When a folder is updated, notify the users who have access to it.</Trans>
                  </label>
                </span>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderDelete" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderDelete} id="send-folder-delete-toggle-button"/>
                  <label className="text" htmlFor="send-folder-delete-toggle-button">
                    <Trans>When a folder is deleted, notify the users who had access to it.</Trans>
                  </label>
                </span>
                <span className="input toggle-switch form-element">
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderShare" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderShare} id="send-folder-share-toggle-button"/>
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
                  onChange={this.handleInputChange} checked={this.state.commentAdd} id="send-comment-add-toggle-button"/>
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
                  onChange={this.handleInputChange} checked={this.state.groupDelete} id="send-group-delete-toggle-button"/>
                <label className="text" htmlFor="send-group-delete-toggle-button">
                  <Trans>When a group is deleted, notify the users who were members of it.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserAdd" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.groupUserAdd} id="send-group-user-add-toggle-button"/>
                <label className="text" htmlFor="send-group-user-add-toggle-button">
                  <Trans>When users are added to a group, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserDelete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.groupUserDelete} id="send-group-user-delete-toggle-button"/>
                <label className="text" htmlFor="send-group-user-delete-toggle-button">
                  <Trans>When users are removed from a group, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserUpdate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.groupUserUpdate} id="send-group-user-update-toggle-button"/>
                <label className="text" htmlFor="send-group-user-update-toggle-button">
                  <Trans>When user roles change in a group, notify the corresponding users.</Trans>
                </label>
              </span>
            </div>
            <div className="group-admin-section">
              <label><Trans>Group manager</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupManagerUpdate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.groupManagerUpdate} id="send-group-manager-update-toggle-button"/>
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
                  onChange={this.handleInputChange} checked={this.state.userSetupCompleteAdmin} id="user-setup-complete-admin-toggle-button"/>
                <label className="text" htmlFor="user-setup-complete-admin-toggle-button">
                  <Trans>When a user completed a setup, notify all the administrators.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecoverCompleteAdmin" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.userRecoverCompleteAdmin} id="user-recover-complete-admin-toggle-button"/>
                <label className="text" htmlFor="user-recover-complete-admin-toggle-button">
                  <Trans>When a user completed a recover, notify all the administrators.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecoverAbortAdmin" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.userRecoverAbortAdmin} id="user-recover-abort-admin-toggle-button"/>
                <label className="text" htmlFor="user-recover-abort-admin-toggle-button">
                  <Trans>When a user aborted a recover, notify all the administrators.</Trans>
                </label>
              </span>
            </div>
            <div className="user-section">
              <label><Trans>User</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userCreate" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.userCreate} id="send-user-create-toggle-button"/>
                <label className="text" htmlFor="send-user-create-toggle-button">
                  <Trans>When new users are invited to passbolt, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecover" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.userRecover} id="send-user-recover-toggle-button"/>
                <label className="text" htmlFor="send-user-recover-toggle-button">
                  <Trans>When users try to recover their account, notify them.</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecoverComplete" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.userRecoverComplete} id="user-recover-complete-toggle-button"/>
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
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestAdmin} id="account-recovery-request-admin-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-request-admin-toggle-button">
                      <Trans>When an account recovery is requested, notify the administrators.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestPolicyUpdate" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestPolicyUpdate} id="account-recovery-policy-update-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-policy-update-toggle-button">
                      <Trans>When an account recovery policy is updated, notify the administrators.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestCreatedAmin" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestCreatedAmin} id="account-recovery-response-created-admin-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-created-admin-toggle-button">
                      <Trans>When an administrator answered to an account recovery request, notify the administrator.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestCreatedAllAdmins" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestCreatedAllAdmins} id="account-recovery-response-created-all-admin-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-created-all-admin-toggle-button">
                      <Trans>When an administrator answered to an account recovery request, notify all the administrators.</Trans>
                    </label>
                  </span>
                </div>
                <div className="user-section">
                  <label><Trans>User</Trans></label>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestUser" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestUser} id="account-recovery-request-user-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-request-user-toggle-button">
                      <Trans>When an account recovery is requested, notify the user.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestUserApproved" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestUserApproved} id="account-recovery-response-user-approved-toggle-button"/>
                    <label className="text" htmlFor="account-recovery-response-user-approved-toggle-button">
                      <Trans>When an account recovery is approved, notify the user.</Trans>
                    </label>
                  </span>
                  <span className="input toggle-switch form-element">
                    <input type="checkbox" className="toggle-switch-checkbox checkbox" name="accountRecoveryRequestUserRejected" disabled={this.hasAllInputDisabled()}
                      onChange={this.handleInputChange} checked={this.state.accountRecoveryRequestUserRejected} id="account-recovery-response-user-rejected-toggle-button"/>
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
                  onChange={this.handleInputChange} checked={this.state.showUsername} id="show-username-toggle-button"/>
                <label className="text" htmlFor="show-username-toggle-button">
                  <Trans>Username</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showUri" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.showUri} id="show-uri-toggle-button"/>
                <label className="text" htmlFor="show-uri-toggle-button">
                  <Trans>URI</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element ready">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showSecret" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.showSecret} id="show-secret-toggle-button"/>
                <label className="text" htmlFor="show-secret-toggle-button">
                  <Trans>Encrypted secret</Trans>
                </label>
              </span>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showDescription" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.showDescription} id="show-description-toggle-button"/>
                <label className="text" htmlFor="show-description-toggle-button">
                  <Trans>Description</Trans>
                </label>
              </span>
            </div>
            <div className="comment-section">
              <label><Trans>Comments</Trans></label>
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showComment" disabled={this.hasAllInputDisabled()}
                  onChange={this.handleInputChange} checked={this.state.showComment} id="show-comment-toggle-button"/>
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
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withAdministrationWorkspace(withTranslation('common')(DisplayEmailNotificationsAdministration))));
