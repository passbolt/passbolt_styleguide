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
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withTranslation} from "react-i18next";

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

      // Email content visibility

      // Passwords
      showDescription: true, // show description in email
      showSecret: true, // show secret in email
      showUri: true, // show uri in email
      showUsername: true, // show username in email
      // Comments
      showComment: true, // show comment in email
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
    await this.handleMustSave(prevProps.administrationWorkspaceContext.mustSaveSettings);
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
    const hasMustSaveChanged = this.props.administrationWorkspaceContext.mustSaveSettings !== previousMustSaveSettings;
    if (hasMustSaveChanged && this.props.administrationWorkspaceContext.mustSaveSettings) {
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
    // Email content visibility

    // Passwords
    const  showDescription = body.show_description;
    const  showSecret = body.show_secret;
    const  showUri = body.show_uri;
    const  showUsername = body.show_username;
    // Comments
    const  showComment = body.show_comment;

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
      showDescription,
      showSecret,
      showUri,
      showUsername,
      showComment
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
    if (!this.props.administrationWorkspaceContext.isSaveEnabled) {
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
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The email notification settings were updated."));
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
    return (
      <div className="row">
        <div className="email-notification-settings col8">
          {this.hasDatabaseSetting() && this.hasFileConfigSetting() &&
          <div className="warning message" id="email-notification-setting-overridden-banner">
            <p>
              {this.translate("Settings have been found in your database as well as in your passbolt.php (or environment variables).")} {this.translate("The settings displayed in the form below are the one stored in your database and have precedence over others.")}
            </p>
          </div>
          }
          {!this.hasDatabaseSetting() && this.hasFileConfigSetting() &&
          <div className="warning message hidden" id="email-notification-fileconfig-exists-banner">
            <p>
              {this.translate("You seem to have Email Notification Settings defined in your passbolt.php (or via environmentvariables).")} {this.translate("Submitting the form will overwrite those settings with the ones you choose in the form below.")}
            </p>
          </div>
          }
          <h3>{this.translate("Email delivery")}</h3>
          <p>
            {this.translate("In this section you can choose which email notifications will be sent.")}
          </p>
          <form className="form">
            <div className="row">
              <div className="col6">
                <label>Passwords</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-password-create-toggle-button">{this.translate("When a password is created, notify its creator.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordCreate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.passwordCreate} id="send-password-create-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-password-create-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-password-update-toggle-button">{this.translate("When a password is updated, notify the users who have access to it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordUpdate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.passwordUpdate} id="send-password-update-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-password-update-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-password-delete-toggle-button">{this.translate("When a password is deleted, notify the users who had access to it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordDelete" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.passwordDelete} id="send-password-delete-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-password-delete-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-password-share-toggle-button">{this.translate("When a password is shared, notify the users who gain access to it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordShare" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.passwordShare} id="send-password-share-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-password-share-toggle-button"/>
                </span>
              </div>
              <div className="col6 last">
                <label>Folders</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-folder-create-toggle-button">{this.translate("When a folder is created, notify its creator.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderCreate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderCreate} id="send-folder-create-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-folder-create-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-folder-update-toggle-button">{this.translate("When a folder is updated, notify the users who have access to it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderUpdate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderUpdate} id="send-folder-update-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-folder-update-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-folder-delete-toggle-button">{this.translate("When a folder is deleted, notify the users who had access to it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderDelete" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderDelete} id="send-folder-delete-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-folder-delete-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-folder-share-toggle-button">{this.translate("When a folder is shared, notify the users who gain access to it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="folderShare" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.folderShare} id="send-folder-share-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-folder-share-toggle-button"/>
                </span>
              </div>
              <div className="row">
              </div>
              <div className="col6 last">
                <label>{this.translate("Comments")}</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-comment-add-toggle-button">{this.translate("When a comment is posted on a password, notify the users who have access to this password.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="commentAdd" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.commentAdd} id="send-comment-add-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-comment-add-toggle-button"/>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col6">
                <label>{this.translate("Group membership")}</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-group-delete-toggle-button">{this.translate("When a group is deleted, notify the users who were member of it.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupDelete" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.groupDelete} id="send-group-delete-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-group-delete-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="group-user-add-toggle-button">{this.translate("When users are added to a group, notify them.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserAdd" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.groupUserAdd} id="send-group-user-add-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-group-user-add-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-group-user-delete-toggle-button">{this.translate("When users are removed from a group, notify them.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserDelete" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.groupUserDelete} id="send-group-user-delete-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-group-user-delete-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-group-user-update-toggle-button">{this.translate("When user roles change in a group, notify the corresponding users.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupUserUpdate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.groupUserUpdate} id="send-group-user-update-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-group-user-update-toggle-button"/>
                </span>
              </div>
              <div className="col6 last">
                <label>{this.translate("Group manager")}</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-group-manager-update-toggle-button">{this.translate("When members of a group change, notify the group manager(s).")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="groupManagerUpdate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.groupManagerUpdate} id="send-group-manager-update-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-group-manager-update-toggle-button"/>
                </span>
                <label>Registration & Recovery</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-user-create-toggle-button">{this.translate("When new users are invited to passbolt, notify them.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userCreate" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.userCreate} id="send-user-create-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-user-create-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="send-user-recover-toggle-button">{this.translate("When users try to recover their account, notify them.")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userRecover" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.userRecover} id="send-user-recover-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="send-user-recover-toggle-button"/>
                </span>
              </div>
            </div>
            <div className="row">
              <h3>{this.translate("Email content visibility")}</h3>
              <p>{this.translate("In this section you can adjust the composition of the emails, e.g. which information will be included in the notification.")}</p>
              <div className="col6">
                <label>{this.translate("Passwords")}</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="show-username-toggle-button">{this.translate("Username")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showUsername" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.showUsername} id="show-username-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="show-username-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="show-uri-toggle-button">{this.translate("URI")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showUri" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.showUri} id="show-uri-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="show-uri-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element ready">
                  <label htmlFor="show-secret-toggle-button">{this.translate("Encrypted secret")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showSecret" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.showSecret} id="show-secret-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="show-secret-toggle-button"/>
                </span>
                <span className="input toggle-switch form-element">
                  <label htmlFor="show-description-toggle-button">{this.translate("Description")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showDescription" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.showDescription} id="show-description-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="show-description-toggle-button"/>
                </span>
              </div>
              <div className="col6 last">
                <label>Comments</label>
                <span className="input toggle-switch form-element">
                  <label htmlFor="show-comment-toggle-button">{this.translate("Comment content")}</label>
                  <input type="checkbox" className="toggle-switch-checkbox checkbox" name="showComment" disabled={this.hasAllInputDisabled()}
                    onChange={this.handleInputChange} checked={this.state.showComment} id="show-comment-toggle-button"/>
                  <label className="toggle-switch-button" htmlFor="show-comment-toggle-button"/>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col4 last">
          <h3>{this.translate("Need some help?")}</h3>
          <p>{this.translate("For more information about email notification, checkout the dedicated page on the help website.")}</p>
          <a className="button" href="https://help.passbolt.com/configure/notification/email" target="_blank" rel="noopener noreferrer">
            <Icon name="life-ring"/>
            <span>{this.translate("Read documentation")}</span>
          </a>
        </div>
      </div>
    );
  }
}

DisplayEmailNotificationsAdministration.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withAdministrationWorkspace(withTranslation('common')(DisplayEmailNotificationsAdministration)));
