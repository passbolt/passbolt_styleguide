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
import ReactList from "react-list";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import Autocomplete from "../../Common/Inputs/Autocomplete/Autocomplete";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import SharePermissionItemSkeleton from "../../Share/SharePermissionItemSkeleton";
import EditUserGroupItem from "./EditUserGroupItem";
import {maxSizeValidation} from '../../../lib/Error/InputValidator';
import Icon from "../../../../shared/components/Icons/Icon";
import {RESOURCE_GROUP_NAME_MAX_LENGTH} from "../../../../shared/constants/inputs.const";


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
      nameWarning: "",
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
    this.listRef = React.createRef();
  }

  /**
   * Binds the component handlers
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

    this.renderItem = this.renderItem.bind(this);
  }

  /**
   * Populate the component with initial data
   */
  populate() {
    const name = this.groupToEdit.name;
    const groupsUsers = JSON.parse(JSON.stringify(this.groupToEdit.groups_users)); // Clone the groups users to not alter the original
    groupsUsers.map(this.decorateGroupUserWithUser.bind(this));
    this.sortGroupsUsersAlphabeticallyByUserFullName(groupsUsers);
    this.setState({groupToEdit: {name, groupsUsers}});
  }

  /**
   * Sort a list of groups users by their
   * @param {array} groupsUsers
   */
  sortGroupsUsersAlphabeticallyByUserFullName(groupsUsers) {
    const sortGroupsUsersAlphabeticallyByUserFullName = (groupUserA, groupUserB) => this.getUserFullname(groupUserA.user).localeCompare(this.getUserFullname(groupUserB.user));
    groupsUsers.sort(sortGroupsUsersAlphabeticallyByUserFullName);
  }

  /**
   * Decorate a group user with its associated user
   * @param {Object} groupUser The group user to decorate
   */
  decorateGroupUserWithUser(groupUser) {
    groupUser.user = this.findUser(groupUser.user_id);
    return groupUser;
  }

  /**
   * Find a user
   * @param {string} userId
   * @returns {object}
   */
  findUser(userId) {
    return this.props.context.users.find(user => user.id === userId);
  }

  /**
   * Find a user gpg key
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async findUserGpgkey(userId) {
    return await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', userId);
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
    return !this.isProcessing && !this.isLoading;
  }

  /**
   * Is the logged in user admin
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
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
    return this.groupToEdit.groups_users.some(group_user => group_user.user_id === this.props.context.loggedInUser.id && group_user.is_admin);
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
   */
  handleNameChange(event) {
    this.updateName(event.target.value);
  }

  /**
   * Whenever a member's permission has changed
   * @param {Event} event A select DOM event
   * @param {object} groupUser A group user
   */
  handleMemberRoleChange(event, groupUser) {
    const isManager = event.target.value === true;
    this.updateMemberRole(groupUser, isManager);
  }

  /**
   * Whenever a member's is removed from the group
   * @param {Event} event A click DOM event
   * @param {object} groupUser A group user
   */
  handleMemberRemoved(event, groupUser) {
    this.removeMember(groupUser);
  }

  /**
   * Whenever the user wants to submit the changes
   * @param {Event} event A submit DOM event
   * @returns {Promise<void>}
   */
  async handleSubmit(event) {
    event.preventDefault();

    this.resetErrors();
    const actions = Object.assign(this.state.actions, {processing: true});
    this.setState({actions});

    this.validate();
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
   */
  focusFieldError() {
    if (this.hasErrors("name")) {
      this.references.name.current.focus();
    }
  }

  /**
   * Whenever the user will to close the dialog
   */
  handleClose() {
    this.close();
  }

  /**
   * handleAutocompleteOpen
   */
  handleAutocompleteOpen() {
    this.setState({autocompleteOpen: true});
  }

  /**
   * handleAutocompleteClose
   */
  handleAutocompleteClose() {
    this.setState({autocompleteOpen: false});
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it and scroll
   * @param {object} user The selected user
   */
  handleAutocompleteSelect(user) {
    const groupUser = this.groupToEdit.groups_users.find(groupUser => groupUser.user_id === user.id);
    // Case of previously deleted member and re-added
    if (groupUser) {
      this.restoreMember(groupUser);
    } else {
      // Case of fresh member
      this.addMember(user);
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
   * @returns {boolean}
   */
  isMemberChanged(groupUser) {
    const originalGroupUser = this.groupToEdit.groups_users.find(originalGroupUser => originalGroupUser.id === groupUser.id);
    return originalGroupUser === undefined || originalGroupUser.is_admin !== groupUser.is_admin;
  }

  /**
   * Returns true of the member has been added
   * @returns {boolean}
   */
  isMemberAdded(groupUser) {
    return groupUser.id === undefined;
  }

  /**
   * Changes the group name
   * @param name The new name
   */
  updateName(name) {
    this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {name})});
    if (this.state.validation.hasAlreadyBeenValidated) {
      this.validateName();
    } else {
      const nameWarning = maxSizeValidation(name, RESOURCE_GROUP_NAME_MAX_LENGTH, this.translate);
      this.setState({nameWarning});
    }
  }

  /**
   * Changes the group groups users
   * @param {array} The new groups users
   * @param {boolean} shouldScrollToEnd if true triggers a scroll to the end of the list
   */
  updateGroupsUsers(groupsUsers, shouldScrollToEnd) {
    const groupToEdit = Object.assign({}, this.state.groupToEdit, {groups_users: groupsUsers});
    this.setState({groupToEdit}, () => {
      if (shouldScrollToEnd) {
        // scroll at the bottom of the group users list
        this.listRef.current.scrollTo(this.groupsUsers.length - 1);
      }
    });
  }

  /**
   * Update a member's group membership role
   * @param {object} groupUserToUpdate The group user whose permission will be updated
   * @param {boolean} isManager True if the members will be a group manager
   */
  updateMemberRole(groupUserToUpdate, isManager) {
    const indexToUpdate = this.groupsUsers.findIndex(groupUser => groupUser.user_id === groupUserToUpdate.user_id);
    groupUserToUpdate.is_admin = isManager;
    this.groupsUsers[indexToUpdate] = groupUserToUpdate;
    this.updateGroupsUsers(this.groupsUsers);
  }

  /**
   * Add a user to the member list
   * @param {object} user The user to create a new group membership for
   */
  addMember(user) {
    const mustBeAdmin = !this.hasManager;
    const groupUser = {user_id: user.id, is_admin: mustBeAdmin};
    this.decorateGroupUserWithUser(groupUser);
    this.groupsUsers.push(groupUser);
    this.updateGroupsUsers(this.groupsUsers, true);
  }

  /**
   * Restore a previously removed group user to the list
   * @param {object} groupUserToRestore The group user to restore
   */
  restoreMember(groupUserToRestore) {
    this.decorateGroupUserWithUser(groupUserToRestore);
    this.groupsUsers.push(groupUserToRestore);
    this.updateGroupsUsers(this.groupsUsers, true);
  }

  /**
   * Removes a member from the list
   * @param {object} groupUserToRemove The group user to remove
   */
  removeMember(groupUserToRemove) {
    const indexToRemove = this.groupsUsers.findIndex(groupUser => groupUser.user_id === groupUserToRemove.user_id);
    const groupsUsers = this.groupsUsers;
    groupsUsers.splice(indexToRemove, 1);
    this.updateGroupsUsers(groupsUsers);
  }

  /**
   * Validate the form
   */
  validate() {
    this.validateName();
    this.setState({validation: Object.assign({}, this.state.validation, {hasAlreadyBeenValidated: true})});
  }

  /**
   * Validates the group name
   */
  validateName() {
    this.resetErrors("name");
    const name = this.state.groupToEdit.name;
    if (name.trim() === "") {
      this.setError("name", "empty");
    }
  }

  /**
   * Set errors
   * @param {string} domain The error namespace
   * @param {string} type The error type
   * @param {string|boolean?} value the error value
   */
  setError(domain, type, value) {
    value = value || true;
    const errors = this.state.errors || {};
    errors[domain] = errors[domain] || {};
    errors[domain][type] = value;
    this.setState({errors});
  }

  /**
   * Reset the errors
   * @param {string?} domain (Optional) The domain to reset.
   */
  resetErrors(domain) {
    let errors = {};
    if (domain) {
      errors = this.state.errors;
      delete errors[domain];
    }
    this.setState({errors});
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
    return errorData?.body?.name?.group_unique;
  }

  /**
   * Edits the current group
   * @returns {Promise<void>}
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

    await this.props.context.port.request('passbolt.groups.update', groupDto);
  }

  /**
   * Whenever the group has been updated successfully
   * @returns {Promise<void>}
   */
  async onEditSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The group has been updated successfully"));
    this.close();
  }

  /**
   * Whenever the group has been updated successfully
   */
  onEditFailure(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else if (this.hasGroupNameAlreadyExists(error.data)) {
      this.setError("name", "alreadyExists");
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
   */
  onError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Close the dialog
   */
  close() {
    // Case of groups/edit url inputting
    const isEditPath = this.props.location.pathname.includes('groups/edit');
    if (isEditPath) {
      this.props.history.push(this.props.location.pathname.replace("edit", "view"));
    }
    this.props.onClose();
  }

  /**
   * Format fingerprint
   * @param {string} fingerprint An user finger print
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
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

    let currentCount = 0;
    const firstUsersMatched = this.props.context.users.filter(user => {
      const isUserMatching = currentCount < Autocomplete.DISPLAY_LIMIT
        && user.active === true
        && !this.isMember(user)
        && matchText(user);

      if (isUserMatching) {
        currentCount++;
      }
      return isUserMatching;
    });
    return this.decorateUsersWithGpgkey(firstUsersMatched);
  }

  /**
   * Use to render a single item of the user group list
   * @param {integer} index of the item in the source list
   * @param {integer} key index of the HTML element in the ReactList
   * @returns {JSX.Element}
   */
  renderItem(index, key) {
    const groupUser = this.groupsUsers[index];
    const isMemberChanged = this.isMemberChanged(groupUser);
    const isMemberAdded = this.isMemberAdded(groupUser);
    const editUserGroupItemKey = groupUser.user_id;
    return (
      <EditUserGroupItem
        key={editUserGroupItemKey}
        itemKey={editUserGroupItemKey}
        isMemberChanged={isMemberChanged}
        isMemberAdded={isMemberAdded}
        groupUser={groupUser}
        onMemberRoleChange={this.handleMemberRoleChange}
        onMemberRemoved={this.handleMemberRemoved}
        areActionsAllowed={this.areActionsAllowed}
        isLastItemDisplayed={key >= 2}
      />
    );
  }

  /**
   * Use to render the container of the list of the ReactList component
   * @param {Array<JSX.Element>} items the list of the items to be rendered as children element of the conainer
   * @param {*} ref the ref ReactList needs to manage the scrll
   * @returns {JSX.Element}
   */
  renderContainer(items, ref) {
    return (
      <ul className="permissions groups_users" ref={ref}>
        {items}
      </ul>
    );
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
   */
  render() {
    return (
      <DialogWrapper
        className='edit-group-dialog'
        title={this.translate('Edit group')}
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}>

        {this.props.context.loggedInUser &&
        <form
          className="group-form"
          onSubmit={this.handleSubmit}
          noValidate>

          <div className="form-content">
            <div className={`input text required ${this.hasErrors("name") ? "error" : ""} ${!this.areActionsAllowed || !this.isLoggedInUserAdmin() ? 'disabled' : ''}`}>
              <label htmlFor="js_field_name"><Trans>Group name</Trans></label>
              <input
                id="group-name-input"
                aria-required={true}
                ref={this.references.name}
                value={this.state.groupToEdit.name}
                maxLength="50"
                type="text"
                placeholder={this.translate("group name")}
                onChange={this.handleNameChange}
                disabled={!this.areActionsAllowed || !this.isLoggedInUserAdmin()}/>
              {this.hasErrors("name", "empty") &&
              <div className="name error-message">
                <Trans>A name is required.</Trans>
              </div>
              }
              {this.hasErrors("name", "alreadyExists") &&
              <div className="name error-message">
                <Trans>The group name already exists.</Trans>
              </div>
              }
              {this.state.nameWarning &&
                (<div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
                </div>)
              }
            </div>

            <div className="input required">
              <label><Trans>Group members</Trans>{this.state.nameWarning &&
                  <Icon name="exclamation"/>
              }</label>
            </div>
          </div>

          <div className="group_members">
            <div className="form-content scroll permission-edit">
              {this.isLoading &&
                <ul className="permissions groups_users">
                  <SharePermissionItemSkeleton/>
                  <SharePermissionItemSkeleton/>
                  <SharePermissionItemSkeleton/>
                </ul>
              }
              {!this.isLoading &&
                <ReactList
                  ref={this.listRef}
                  itemRenderer={this.renderItem}
                  itemsRenderer={this.renderContainer}
                  length={this.groupsUsers.length}
                  minSize={4}
                  type={this.groupsUsers.length < 3 ? "simple" : "uniform"}
                  threshold={30}>
                </ReactList>
              }
            </div>
            {!this.isLoading && !this.hasMembers &&
            <div className="message warning">
              <span><Trans>The group is empty, please add a group manager.</Trans></span>
            </div>
            }
            {this.hasMembers && !this.hasManager &&
            <div className="message error at-least-one-manager">
              <span><Trans>Please make sure there is at least one group manager.</Trans></span>
            </div>
            }
            {!this.isLoading && !this.isManager &&
            <div className="message warning feedback cannot-add-user">
              <span><Trans>Only the group manager can add new people to a group.</Trans></span>
            </div>
            }
            {this.hasMembersChanges && this.hasManager &&
            <div className="message warning feedback">
              <span><Trans>You need to click save for the changes to take place.</Trans></span>
            </div>
            }
          </div>

          {this.isManager &&
          <div className="form-content permission-add">
            <Autocomplete
              id="user-name-input"
              name="name"
              label={this.translate("Add people")}
              placeholder={this.translate("Start typing a person name")}
              searchCallback={this.fetchAutocompleteItems}
              onSelect={this.handleAutocompleteSelect}
              onOpen={this.handleAutocompleteOpen}
              onClose={this.handleAutocompleteClose}
              disabled={!this.areActionsAllowed}
              baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
          </div>
          }

          <div className="submit-wrapper clearfix">
            <FormCancelButton
              onClick={this.handleClose}
              disabled={!this.areActionsAllowed}/>
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.hasSubmitDisabled}
              processing={this.isProcessing}/>
          </div>

        </form>
        }

      </DialogWrapper>
    );
  }
}

EditUserGroup.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  location: PropTypes.object, // Route location
  history: PropTypes.object, // Router history
  userWorkspaceContext: PropTypes.object, // The user workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withUserWorkspace(withActionFeedback(withDialog(withTranslation('common')(EditUserGroup))))));
