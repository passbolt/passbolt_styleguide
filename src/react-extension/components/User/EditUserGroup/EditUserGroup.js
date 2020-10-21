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
import Icon from "../../Common/Icons/Icon";
import TooltipHtml from "../../Common/Tooltip/TooltipHtml";
import Autocomplete from "../../Common/Autocomplete/Autocomplete";

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
        name: '',
        members: []
      },
      actions: {
        processing: false, // True if one process some operation
        loading: true // True if the component is in a loading mode
      },
      errors: {
        emptyName: false // True if the group's name is empty
      },
      validation: {
        hasAlreadyBeenValidated: false // True when the form has already been submitted
      }
    };
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Creates references
   */
  createRefs() {
    this.references = {
      name:  React.createRef(),
      members: React.createRef()
    };
  }

  /**
   * Binds the component handers
   */
  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handlePermissionSelected = this.handlePermissionSelected.bind(this);
    this.handleMemberRemoved = this.handleMemberRemoved.bind(this);
    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.handleAutocompleteClose = this.handleAutocompleteClose.bind(this);
    this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);
    this.fetchAutocompleteItems = this.fetchAutocompleteItems.bind(this);
  }

  /**
   * The group to edit at component initialization
   */
  get groupToEdit() {
    return this.props.userWorkspaceContext.groupToEdit;
  }

  /**
   * Returns true if the component is processing
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns true if the current user can perform actions
   */
  get areActionsAllowed() {
    return this.isProcessing;
  }

  /**
   * Return true if there are some errors
   */
  get hasErrors() {
    return this.state.errors.emptyName;
  }

  /**
   * Returns true if there is currently only one group manager
   */
  get hasSingleGroupManager() {
    return this.members.filter(member => member.is_admin).length === 1;
  }

  /**
   * Returns true if there are some changes on the group members
   */
  get hasMembersChange() {
    return this.state.groupToEdit.members.some(member => this.hasMemberChanged(member));
  }

  /**
   * Returns true if the group to edit has members
   */
  get hasMember() {
    return this.members.length > 0;
  }

  /**
   * Returns true if the group to edit has at least one manager
   */
  get hasManager() {
    return this.members.filter(member => member.is_admin).length > 0;
  }

  /**
   * Returns true if the current user is one of the group managers
   */
  get isManager() {
    return this.groupToEdit.groups_users.some(member => member.user_id === this.context.loggedInUser.id && member.is_admin);
  }

  /**
   * Returns the current list of members
   */
  get members() {
    return this.state.groupToEdit.members.filter(member => !member.isDeleted);
  }

  /**
   * Whenever the group name change
   */
  async handleNameChanged(event) {
    await this.updateName(event.target.value);
  }

  /**
   * Whenever a member's permission has changed
   * @param event A select DOM event
   * @param member A group member
   */
  async handlePermissionSelected(event, member) {
    const isManager = event.target.value === 'true';
    await this.updateMemberPermission(isManager, member);
  }

  /**
   * Whenever a member's is removed from the group
   * @param event A click DOM event
   * @param member A group member
   */
  async handleMemberRemoved(event, member) {
    await this.removeMember(member);
  }

  /**
   * Whenever the user wants to submit the changes
   * @param event The dom event
   */
  async handleSubmit(event) {
    event.preventDefault();

    await this.validate();
    if (!this.hasErrors) {
      await this.edit()
        .then(this.onEditSuccess.bind(this))
        .catch(this.onEditFailure.bind(this));
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
   * @param {object} aro
   */
  async handleAutocompleteSelect(aro) {
    const alreadyMember = this.state.groupToEdit.members.find(member => member.id === aro.id);
    if (alreadyMember) { // Case of previously deleted member and re-added
      await this.restoreMember(alreadyMember);
    } else { // Case of fresh member
      await this.addMember(aro);
    }
  }


  /**
   * Populate the component with initial data
   */
  async populate() {
    const findUser = groupUser => this.context.users.find(user => user.id === groupUser.user_id);
    const defineIsAdmin = groupUser => ({original_is_admin: groupUser.is_admin, is_admin: groupUser.is_admin});
    const userMapper = groupUser => Object.assign({}, findUser(groupUser), defineIsAdmin(groupUser));
    const members = await this.decorateUsersWithGpgKey(this.groupToEdit.groups_users.map(userMapper));
    await this.setState({
      groupToEdit: {
        name: this.groupToEdit.name,
        members
      }
    });
  }

  /**
   * Decorates the list of users with thier Gpg key
   * @param users An user list
   */
  decorateUsersWithGpgKey(users) {
    const requestGpgKey = user => this.context.port.request('passbolt.keyring.get-public-key-info-by-user', user.id);
    const findFingerprint = user => requestGpgKey(user).then(gpgkey => this.getFingerprint(gpgkey.fingerprint));
    const decorateGroupsUsersWithGpgKey = async user => Object.assign(user, {gpgkey: {fingerprint: await findFingerprint(user)}});
    return Promise.all(users.map(decorateGroupsUsersWithGpgKey));
  }

  /**
   * Returns true if the permission / membership has changed
   * @param member
   */
  hasMemberChanged(member) {
    return member.original_is_admin !== member.is_admin || member.isDeleted;
  }

  /**
   * Returns true of the member has been added
   */
  hasMemberAdded(member) {
    return member.isAdded;
  }

  /**
   * Returns true if the member can have a different permission / membership role
   * @param member
   */
  canChangeMember(member) {
    return this.hasSingleGroupManager && member.is_admin;
  }

  /**
   * Get fingerprint
   * @param fingerprint An user finger print
   * @returns {string}
   */
  getFingerprint(fingerprint) {
    return fingerprint.toUpperCase().replace(/.{4}(?=.)/g, '$& ');
  }

  /**
   * Changes the group name
   * @param name The new name
   */
  async updateName(name) {
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {name})});
  }

  /**
   * Update a member's permission
   * @param isManager True if the members will be a group manager
   * @param member The member whose permission will be updated
   */
  async updateMemberPermission(isManager, member) {
    const memberToUpdate = Object.assign({}, member, {is_admin: isManager});
    const updateMemberMapper = groupMember => groupMember.id === memberToUpdate.id ? memberToUpdate : groupMember;
    const members = this.state.groupToEdit.members.map(updateMemberMapper);
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {members})});
  }

  /**
   * Add a user to the member list
   * @param user An user
   */
  async addMember(user) {
    const members = this.state.groupToEdit.members;
    const mustBeAdmin = this.state.groupToEdit.members.length === 0;
    members.push(Object.assign(user, {is_admin: mustBeAdmin, isAdded: true}));
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {members})});
    this.references.members.current.scrollTop = this.references.members.current.scrollHeight;
  }

  /**
   * Restore a previously removed member to the list
   * @param member A member
   */
  async restoreMember(member) {
    const members = this.state.groupToEdit.members;
    const memberToUpdate = Object.assign({}, member, {isDeleted: false, is_admin: member.original_is_admin});
    const updateMemberMapper = groupMember => groupMember.id === memberToUpdate.id ? memberToUpdate : groupMember;
    const updatedMembers = members.map(updateMemberMapper);
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {members: updatedMembers})});
  }

  /**
   * Removes a member from the list
   * @param member
   */
  async removeMember(member) {
    const memberToUpdate = Object.assign({}, member, {isDeleted: true});
    const updateMemberMapper = groupMember => groupMember.id === memberToUpdate.id ? memberToUpdate : groupMember;
    const members = this.state.groupToEdit.members.map(updateMemberMapper);
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {members})});
  }

  /**
   * Validate the form
   */
  async validate() {
    await this.validateName();
    await this.setState({validation: Object.assign({}, this.state.validation, {hasAlreadyBeenValidated: true})});
  }

  /**
   * Validates the group name
   */
  async validateName() {
    const name = this.state.groupToEdit.name;
    if (name.trim() === '') {
      await this.setState({errors: Object.assign({}, this.state.errors, {emptyName: true})});
    }
  }

  /**
   * Edits the current group
   */
  async edit() {
    const groupUserMapper = member => ({user_id: member.id, is_admin: member.is_admin, delete: member.isDeleted});
    const payload = {
      name:  this.state.groupToEdit.name,
      group_users: this.state.groupToEdit.members.map(groupUserMapper)
    };
    await this.context.port.request('passbolt.groups.edit', payload);
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
   */
  async onEditFailure(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.onError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
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
   * Get users matching the given keyword
   * @param {string} keyword
   * @returns users,
   */
  async fetchAutocompleteItems(keyword) {
    const words = (keyword && keyword.split(/\s+/)) || [''];
    const userAlreadyAdded = user => this.state.groupToEdit.members.some(member => member.id === user.id && !member.isDeleted);
    const matchUserProperty = (word, user) => (user.username.toLowerCase().startsWith(word) || user.profile.first_name.toLowerCase().startsWith(word) || user.profile.last_name.toLowerCase().startsWith(word));
    const matchUser = (word, user) => matchUserProperty(word, user);

    const usersMatched = this.context.users.filter(user => user.active === true && !userAlreadyAdded(user)
      && words.some(word => matchUser(word, user)));

    return this.decorateUsersWithGpgKey(usersMatched);
  }

  /**
   * Render the component
   */
  render() {
    const mustRaiseEmptyNameError = this.state.errors.emptyName && this.state.validation.hasAlreadyBeenValidated;
    return (
      <DialogWrapper
        className='edit-group-dialog'
        title="Edit group"
        onClose={this.handleClose}
        disabled={this.areActionsAllowed}>

        <form
          className="group-form"
          onSubmit={this.handleSubmit}
          noValidate>

          <div className="group_members">

            <div className="form-content">
              <div className={`input text required ${mustRaiseEmptyNameError ? "error" : ""}`}>
                <label htmlFor="js_field_name">Group name</label>
                <input
                  id="js_field_name"
                  ref={this.references.name}
                  value={this.state.groupToEdit.name}
                  maxLength="50"
                  type="text"
                  placeholder="group name"
                  onChange={this.handleNameChanged}
                  disabled={this.areActionsAllowed}/>
                {mustRaiseEmptyNameError &&
                <div className="error message">
                  A name is required
                </div>
                }
              </div>

              <div className="input required">
                <label>Group members</label>
              </div>
            </div>

            <div className="form-content permission-edit">

              <ul
                className="permissions scroll group_user"
                ref={this.references.members}>
                {
                  this.members.map(member => (
                    <li
                      key={member.id}
                      className={`row ${this.hasMemberChanged(member) ? 'permission-updated' : ''}`}>

                      <UserAvatar
                        baseUrl={this.context.userSettings.getTrustedDomain()}
                        user={member}/>

                      <div className="aro">
                        <div className="aro-name">
                          <span className="ellipsis">{`${member.profile.first_name} ${member.profile.last_name}`}</span>
                          <TooltipHtml>
                            <div className="email"><strong>{member.username}</strong></div>
                            <div className="fingerprint">{this.getFingerprint(member.gpgkey.fingerprint)}</div>
                          </TooltipHtml>
                        </div>
                        <div className="permission_changes">
                          {this.hasMemberAdded(member) && <span>Will be added</span>}
                          {this.hasMemberChanged(member) &&  !this.hasMemberAdded(member) && <span>Will be updated</span>}
                          {!this.hasMemberChanged(member) && !this.hasMemberAdded(member) && <span>Unchanged</span>}

                        </div>
                      </div>

                      <div className="select rights">
                        <select
                          className="permission"
                          value={member.is_admin}
                          onChange={event => this.handlePermissionSelected(event, member)}>
                          <option value={false}>Member</option>
                          <option value={true}>Group manager</option>
                        </select>
                      </div>

                      <div className="actions">
                        <a
                          title="remove"
                          onClick={event => this.handleMemberRemoved(event, member)}>
                          <Icon name="close-circle"/>
                          <span className="visuallyhidden">remove</span>
                        </a>
                      </div>
                    </li>
                  ))
                }
              </ul>
              {!this.hasMember &&
              <div className="message warning">
                <span>The group is empty, please add a group manager.</span>
              </div>
              }
              {this.hasMember && !this.hasManager &&
              <div className="message error">
                <span>Please make sure there is at least one group manager.</span>
              </div>
              }
              {!  this.isManager &&
                <div className="message warning feedback">
                  <span>Only the group manager can add new people to a group.</span>
                </div>
              }
              {this.hasMembersChange &&
                <div className="message warning feedback">
                  <span>You need to click save for the changes to take place.</span>
                </div>
              }

            </div>
          </div>

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
              disabled={this.areActionsAllowed}
              baseUrl={this.context.userSettings.getTrustedDomain()}/>
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value="save"
              disabled={this.areActionsAllowed}
              processing={this.isProcessing}/>
            <FormCancelButton
              onClick={this.handleClose}
              disabled={this.areActionsAllowed}/>
          </div>

        </form>

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
