/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import UserAvatar from "../../../../react/components/Common/Avatar/UserAvatar";
import Icon from "../../../../react/components/Common/Icons/Icon";
import TooltipHtml from "../../../../react/components/Common/Tooltip/TooltipHtml";
import Autocomplete from "../../../../react/components/Common/Inputs/Autocomplete/Autocomplete";

/**
 * This component allows to edit an user group
 */
class EditUserGroup extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createRefs();
    this.bindHandlers();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      groupToEdit: { // The group to edit
        name: "",
        groupsUsers: []
      },
      actions: {
        processing: false, // True if one process some operation
        loading: true // True if the component is in a loading mode
      },
      errors: {},
      validation: {
        hasAlreadyBeenValidated: false // True when the form has already been submitted
      }
    };
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.populate();
  }

  /**
   * Whenever the component is updated
   */
  componentDidUpdate() {
    if (this.groupToEdit && this.isLoading) {
      const actions = Object.assign(this.state.actions, {loading: false});
      this.setState({actions});
    }
  }

  /**
   * Creates references
   */
  createRefs() {
    this.references = {
      name: React.createRef()
    };
  }

  /**
   * Binds the component handlers
   * @return {void}
   */
  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMemberRoleChange = this.handleMemberRoleChange.bind(this);
    this.handleMemberRemoved = this.handleMemberRemoved.bind(this);
    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.handleAutocompleteClose = this.handleAutocompleteClose.bind(this);
    this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);
    this.fetchAutocompleteItems = this.fetchAutocompleteItems.bind(this);
  }

  /**
   * Populate the component with initial data
   * @return {Promise<void>}
   */
  async populate() {
    const name = this.groupToEdit.name;
    const groupsUsers = JSON.parse(JSON.stringify(this.groupToEdit.groups_users)); // Clone the groups users to not alter the original
    await Promise.all(groupsUsers.map(this.decorateGroupUserWithUser.bind(this)));
    this.sortGroupsUsersAlphabeticallyByUserFullName(groupsUsers);
    await this.setState({groupToEdit: {name, groupsUsers}});
  }

  /**
   * Sort a list of groups users by their
   * @param {array} groupsUsers
   * @returns {void}
   */
  sortGroupsUsersAlphabeticallyByUserFullName(groupsUsers) {
    const sortGroupsUsersAlphabeticallyByUserFullName = (groupUserA, groupUserB) => this.getUserFullname(groupUserA.user).localeCompare(this.getUserFullname(groupUserB.user));
    groupsUsers.sort(sortGroupsUsersAlphabeticallyByUserFullName);
  }

  /**
   * Decorate a group user with its associated user
   * @param {Object} groupUser The group user to decorate
   * @returns {Promise<object>}
   */
  async decorateGroupUserWithUser(groupUser) {
    groupUser.user = await this.findUser(groupUser.user_id);
    return groupUser;
  }

  /**
   * Find a user
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async findUser(userId) {
    const user = this.context.users.find(user => user.id === userId);
    user.gpgkey = await this.findUserGpgkey(user.id);
    return user;
  }

  /**
   * Find a user gpg key
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async findUserGpgkey(userId) {
    return await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', userId);
  }

  /**
   * Decorate users with their associated gpg key
   * @param users
   * @returns {Promise<array>}
   */
  async decorateUsersWithGpgkey(users) {
    const mapUserWithGpgkey = async user => Object.assign(user, {gpgkey: await this.findUserGpgkey(user.id)});
    return Promise.all(users.map(mapUserWithGpgkey));
  }

  /**
   * The group to edit at component initialization
   * @type {object}
   */
  get groupToEdit() {
    return this.props.userWorkspaceContext.groupToEdit;
  }

  /**
   * Returns true if the component is processing
   * @type {boolean}
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns true if the component is loading
   * @type {boolean}
   */
  get isLoading() {
    return this.state.actions.loading;
  }

  /**
   * Returns true if the current user can perform actions
   * @type {boolean}
   */
  get areActionsAllowed() {
    return !this.isProcessing;
  }

  /**
   * Returns true if there are some changes on the group members
   * @type {boolean}
   */
  get hasMembersChanges() {
    const groupsUsers = this.state.groupToEdit.groupsUsers;
    const sameMembersCount = this.groupToEdit.groups_users.length === groupsUsers.length;
    return !sameMembersCount || groupsUsers.some(groupUser => this.isMemberChanged(groupUser));
  }

  /**
   * Returns true if the group to edit has members
   * @type {boolean}
   */
  get hasMembers() {
    return this.groupsUsers.length > 0;
  }

  /**
   * Returns true if the group to edit has at least one manager
   * @type {boolean}
   */
  get hasManager() {
    return this.groupsUsers.filter(groupUser => groupUser.is_admin).length > 0;
  }

  /**
   * Returns true if the current user is one of the group managers
   * @type {boolean}
   */
  get isManager() {
    return this.groupToEdit.groups_users.some(group_user => group_user.user_id === this.context.loggedInUser.id && group_user.is_admin);
  }

  /**
   * Returns the current list of members
   * @type {array}
   */
  get groupsUsers() {
    return this.state.groupToEdit.groupsUsers;
  }

  /**
   * Return true if submit button should be disabled
   * True if there is no manager or if all input should be disabled
   * @returns {boolean}
   */
  get hasSubmitDisabled() {
    return !this.hasManager || !this.areActionsAllowed;
  }

  /**
   * Whenever the group name change
   * @return {Promise<void>}
   */
  async handleNameChange(event) {
    await this.updateName(event.target.value);
  }

  /**
   * Whenever a member's permission has changed
   * @param {Event} event A select DOM event
   * @param {object} groupUser A group user
   * @return {Promise<void>}
   */
  async handleMemberRoleChange(event, groupUser) {
    const isManager = event.target.value === 'true';
    await this.updateMemberRole(groupUser, isManager);
  }

  /**
   * Whenever a member's is removed from the group
   * @param {Event} event A click DOM event
   * @param {object} groupUser A group user
   * @return {Promise<void>}
   */
  async handleMemberRemoved(event, groupUser) {
    await this.removeMember(groupUser);
  }

  /**
   * Whenever the user wants to submit the changes
   * @param {Event} event A submit DOM event
   * @return {Promise<void>}
   */
  async handleSubmit(event) {
    event.preventDefault();

    await this.resetErrors();
    const actions = Object.assign(this.state.actions, {processing: true});
    this.setState({actions});

    await this.validate();
    if (this.hasErrors()) {
      return this.handleValidateError();
    }

    await this.updateGroup()
      .then(this.onEditSuccess.bind(this))
      .catch(this.onEditFailure.bind(this))
      .finally(() => {
        const actions = Object.assign(this.state.actions, {processing: false});
        this.setState({actions});
      });
  }

  /**
   * Handle validation error.
   */
  handleValidateError() {
    const actions = Object.assign(this.state.actions, {processing: false});
    this.setState({actions});
    this.focusFieldError();
  }

  /**
   * Focus the field of the form which is in error state.
   * @return {void}
   */
  focusFieldError() {
    if (this.hasErrors("name")) {
      this.references.name.current.focus();
    }
  }

  /**
   * Whenever the user will to close the dialog
   * @return {void}
   */
  handleClose() {
    this.close();
  }

  /**
   * handleAutocompleteOpen
   * @return {void}
   */
  handleAutocompleteOpen() {
    this.setState({autocompleteOpen: true});
  }

  /**
   * handleAutocompleteClose
   * @return {void}
   */
  handleAutocompleteClose() {
    this.setState({autocompleteOpen: false});
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it and scroll
   * @param {object} user The selected user
   * @return {void}
   */
  async handleAutocompleteSelect(user) {
    const groupUser = this.groupToEdit.groups_users.find(groupUser => groupUser.user_id === user.id);
    // Case of previously deleted member and re-added
    if (groupUser) {
      await this.restoreMember(groupUser);
    } else {
      // Case of fresh member
      await this.addMember(user);
    }
  }

  /**
   * Check if a user is already member of the new list.
   * @param {object} user The user
   * @returns {boolean}
   */
  isMember(user) {
    return this.groupsUsers.some(groupUser => groupUser.user_id === user.id);
  }

  /**
   * Returns true if the group user membership has changed.
   * @param {object} groupUser the group user
   * @return {boolean}
   */
  isMemberChanged(groupUser) {
    const originalGroupUser = this.groupToEdit.groups_users.find(originalGroupUser => originalGroupUser.id === groupUser.id);
    return originalGroupUser === undefined || originalGroupUser.is_admin !== groupUser.is_admin;
  }

  /**
   * Returns true of the member has been added
   * @return {boolean}
   */
  isMemberAdded(groupUser) {
    return groupUser.id === undefined;
  }

  /**
   * Changes the group name
   * @param name The new name
   * @return {Promise<*>}
   */
  async updateName(name) {
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {name})});
    if (this.state.validation.hasAlreadyBeenValidated) {
      await this.validateName();
    }
  }

  /**
   * Changes the group groups users
   * @param {array} The new groups users
   * @return {Promise<*>}
   */
  async updateGroupsUsers(groupsUsers) {
    const groupToEdit = Object.assign({}, this.state.groupToEdit, {groups_users: groupsUsers});
    this.setState({groupToEdit});
  }

  /**
   * Update a member's group membership role
   * @param {object} groupUserToUpdate The group user whose permission will be updated
   * @param {boolean} isManager True if the members will be a group manager
   * @retrurn {Promise<*>}
   */
  async updateMemberRole(groupUserToUpdate, isManager) {
    const indexToUpdate = this.groupsUsers.findIndex(groupUser => groupUser.user_id === groupUserToUpdate.user_id);
    groupUserToUpdate.is_admin = isManager;
    this.groupsUsers[indexToUpdate] = groupUserToUpdate;
    return this.updateGroupsUsers(this.groupsUsers);
  }

  /**
   * Add a user to the member list
   * @param {object} user The user to create a new group membership for
   * @retrurn {Promise<*>}
   */
  async addMember(user) {
    const mustBeAdmin = !this.hasManager;
    const groupUser = {user_id: user.id, is_admin: mustBeAdmin};
    await this.decorateGroupUserWithUser(groupUser);
    this.groupsUsers.push(groupUser);
    return this.updateGroupsUsers(this.groupsUsers);
  }

  /**
   * Restore a previously removed group user to the list
   * @param {object} groupUserToRestore The group user to restore
   * @retrurn {Promise<*>}
   */
  async restoreMember(groupUserToRestore) {
    await this.decorateGroupUserWithUser(groupUserToRestore);
    this.groupsUsers.push(groupUserToRestore);
    return this.updateGroupsUsers(this.groupsUsers);
  }

  /**
   * Removes a member from the list
   * @param {object} groupUserToRemove The group user to remove
   */
  async removeMember(groupUserToRemove) {
    const indexToRemove = this.groupsUsers.findIndex(groupUser => groupUser.user_id === groupUserToRemove.user_id);
    const groupsUsers = this.groupsUsers.splice(indexToRemove, 1);
    return this.updateGroupsUsers(groupsUsers);
  }

  /**
   * Validate the form
   * @return {Promise<void>}
   */
  async validate() {
    await this.validateName();
    await this.setState({validation: Object.assign({}, this.state.validation, {hasAlreadyBeenValidated: true})});
  }

  /**
   * Validates the group name
   * @return {Promise<void>}
   */
  async validateName() {
    await this.resetErrors("name");
    const name = this.state.groupToEdit.name;
    if (name.trim() === "") {
      await this.setError("name", "empty");
    }
  }

  /**
   * Set errors
   * @param {string} domain The error namespace
   * @param {string} type The error type
   * @param {string|boolean?} value the error value
   * @returns {Promise<void>}
   */
  async setError(domain, type, value) {
    value = value || true;
    const errors = this.state.errors || {};
    errors[domain] = errors[domain] || {};
    errors[domain][type] = value;
    this.setState({errors});
  }

  /**
   * Reset the errors
   * @param {string?} domain (Optional) The domain to reset.
   * @returns {Promise<void>}
   */
  async resetErrors(domain) {
    let errors = {};
    if (domain) {
      errors = this.state.errors;
      delete errors[domain];
    }
    await this.setState({errors});
  }

  /**
   * Return true if there are some errors
   * @param {string?} domain (Optional) The domain to check for. If none precised, check for all
   * @param {string?} type (Optional) The type of error. If none precised, check for all
   * @boolean {boolean}
   */
  hasErrors(domain, type) {
    const errors = this.state.errors || {};
    if (!errors) {
      return false;
    }
    if (!domain) {
      const errorsReducer = (accumulator, errorPropertyName) => accumulator || this.hasErrors(errorPropertyName);
      return Object.getOwnPropertyNames(errors).reduce(errorsReducer, false);
    }
    if (!type) {
      return typeof errors[domain] === "object";
    }
    return errors[domain] && typeof errors[domain][type] !== "undefined";
  }

  /**
   * has username already exists
   * @param errorData the error data received
   * @returns {*}
   */
  hasGroupNameAlreadyExists(errorData) {
    return errorData && errorData.body && errorData.body.name && errorData.body.name.group_unique;
  }

  /**
   * Edits the current group
   * @return {Promise<*>}
   */
  async updateGroup() {
    const groupDto = {
      id: this.groupToEdit.id,
      name: this.state.groupToEdit.name,
      groups_users: this.groupsUsers.map(groupUser => ({
        id: groupUser.id || undefined,
        user_id: groupUser.user_id,
        is_admin: groupUser.is_admin
      }))
    };

    await this.context.port.request('passbolt.groups.update', groupDto);
  }

  /**
   * Whenever the group has been updated successfully
   * @returns {Promise<void>}
   */
  async onEditSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The group has been updated successfully");
    this.props.onClose();
  }

  /**
   * Whenever the group has been updated successfully
   * @return {void}
   */
  async onEditFailure(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else if (this.hasGroupNameAlreadyExists(error.data)) {
      await this.setError("name", "alreadyExists");
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.onError(error);
      this.setState({processing: false});
    }
  }

  /**
   * Handle error to display the error dialog
   * @param {object} error The error
   * @return {void}
   */
  onError(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Close the dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Format fingerprint
   * @param {string} fingerprint An user finger print
   * @returns {string}
   */
  formatFingerprint(fingerprint) {
    return fingerprint.toUpperCase().replace(/.{4}(?=.)/g, '$& ');
  }

  /**
   * Get a user full name
   * @param {object} user
   * @returns {string}
   */
  getUserFullname(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * Get users matching the given keyword
   * @param {string} keyword
   * @returns {array} The array of users filtered
   */
  async fetchAutocompleteItems(keyword) {
    keyword = keyword.toLowerCase();
    const words = (keyword && keyword.split(/\s+/)) || [''];

    // Test match of some escaped test words against the name / username
    const escapeWord = word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = word => new RegExp(escapeWord(word), 'i');
    const matchWord = (word, value) => wordToRegex(word).test(value);

    const matchUsernameProperty = (word, user) => matchWord(word, user.username);
    const matchNameProperty = (word, user) => matchWord(word, user.profile.first_name) || matchWord(word, user.profile.last_name);
    const matchUser = (word, user) => matchUsernameProperty(word, user) || matchNameProperty(word, user);
    const matchText = user => words.every(word => matchUser(word, user));

    const usersMatched = this.context.users.filter(user => user.active === true && !this.isMember(user))
      .filter(matchText);
    return this.decorateUsersWithGpgkey(usersMatched);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <DialogWrapper
        className='edit-group-dialog'
        title="Edit group"
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}>

        {!this.isLoading &&
        <form
          className="group-form"
          onSubmit={this.handleSubmit}
          noValidate>

          <div className="group_members">

            <div className="form-content">
              <div className={`input text required ${this.hasErrors("name") ? "error" : ""}`}>
                <label htmlFor="js_field_name">Group name</label>
                <input
                  id="group-name-input"
                  ref={this.references.name}
                  value={this.state.groupToEdit.name}
                  maxLength="50"
                  type="text"
                  placeholder="group name"
                  onChange={this.handleNameChange}
                  disabled={!this.areActionsAllowed}/>
                {this.hasErrors("name", "empty") &&
                <div className="name error message">
                  A name is required
                </div>
                }
                {this.hasErrors("name", "alreadyExists") &&
                <div className="name error message">
                  The group name test already exists.
                </div>
                }
              </div>

              <div className="input required">
                <label>Group members</label>
              </div>
            </div>

            <div className="form-content permission-edit">
              <ul className="permissions scroll groups_users">
                {this.groupsUsers.map(groupUser => (
                  <li
                    key={groupUser.user_id}
                    className={`row ${this.isMemberChanged(groupUser) ? 'permission-updated' : ''}`}>

                    <UserAvatar
                      baseUrl={this.context.userSettings.getTrustedDomain()}
                      user={groupUser.user}/>

                    <div className="aro">
                      <div className="aro-name">
                        <span className="ellipsis">{this.getUserFullname(groupUser.user)}</span>
                        <TooltipHtml>
                          <div className="email"><strong>{groupUser.user.username}</strong></div>
                          <div className="fingerprint">{this.formatFingerprint(groupUser.user.gpgkey.fingerprint)}</div>
                        </TooltipHtml>
                      </div>
                      <div className="permission_changes">
                        {this.isMemberAdded(groupUser) && <span>Will be added</span>}
                        {this.isMemberChanged(groupUser) && !this.isMemberAdded(groupUser) &&
                        <span>Will be updated</span>}
                        {!this.isMemberChanged(groupUser) && !this.isMemberAdded(groupUser) && <span>Unchanged</span>}

                      </div>
                    </div>

                    <div className="select rights">
                      <select
                        className="permission"
                        value={groupUser.is_admin}
                        onChange={event => this.handleMemberRoleChange(event, groupUser)}
                        disabled={!this.areActionsAllowed}>
                        <option value={false}>Member</option>
                        <option value={true}>Group manager</option>
                      </select>
                    </div>

                    <div className="actions">
                      <a
                        title="remove"
                        className={`remove-item ${!this.areActionsAllowed ? "disabled" : ""}`}
                        onClick={event => this.handleMemberRemoved(event, groupUser)}>
                        <Icon name="close-circle"/>
                        <span className="visuallyhidden">remove</span>
                      </a>
                    </div>
                  </li>
                ))
                }
              </ul>
              {!this.hasMembers &&
              <div className="message warning">
                <span>The group is empty, please add a group manager.</span>
              </div>
              }
              {this.hasMembers && !this.hasManager &&
              <div className="message error at-least-one-manager">
                <span>Please make sure there is at least one group manager.</span>
              </div>
              }
              {!this.isManager &&
              <div className="message warning feedback cannot-add-user">
                <span>Only the group manager can add new people to a group.</span>
              </div>
              }
              {this.hasMembersChanges && this.hasManager &&
              <div className="message warning feedback">
                <span>You need to click save for the changes to take place.</span>
              </div>
              }
            </div>
          </div>

          {this.isManager &&
          <div className="form-content permission-add">
            <Autocomplete
              id="user-name-input"
              name="name"
              label="Add people"
              placeholder="Start typing a person name"
              searchCallback={this.fetchAutocompleteItems}
              onSelect={this.handleAutocompleteSelect}
              onOpen={this.handleAutocompleteOpen}
              onClose={this.handleAutocompleteClose}
              disabled={!this.areActionsAllowed}
              baseUrl={this.context.userSettings.getTrustedDomain()}/>
          </div>
          }

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value="Save"
              disabled={this.hasSubmitDisabled}
              processing={this.isProcessing}/>
            <FormCancelButton
              onClick={this.handleClose}
              disabled={!this.areActionsAllowed}/>
          </div>

        </form>
        }

      </DialogWrapper>
    );
  }
}

EditUserGroup.contextType = AppContext;

EditUserGroup.propTypes = {
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(withActionFeedback(withDialog(EditUserGroup)));
