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
 * @since         2.14.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withLoading} from "../../../contexts/LoadingContext";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";

/**
 * This component allows user to delete a user with conflict to reassign ownership of folders, resources and groups
 */
class DeleteUserWithConflicts extends Component {
  constructor(props, context) {
    super(props, context);
    this.initializeProperties();
    this.state = this.getDefaultState();
    this.initEventHandlers();
  }

  initializeProperties() {
    this.groupsErrors = this.getGroupsErrors();
    this.groupsGroupsUsersOptions = this.getGroupsGroupsUsersOptionsMap();
    this.foldersErrors = this.getFoldersErrors();
    this.resourcesErrors = this.getResourcesErrors();
    this.acosPermissionsOptions = this.getAcosPermissionsOptionsMap();
  }

  getDefaultState() {
    return {
      processing: false,
      owners: this.populateDefaultOwners(),
      managers: this.populateDefaultManagers(),
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOnChangeOwner = this.handleOnChangeOwner.bind(this);
    this.handleOnChangeManager = this.handleOnChangeManager.bind(this);
  }

  /**
   * Get the groups errors if any
   * @returns {array} The list of groups errors
   * - The list is sorted alphabetically by group name
   */
  getGroupsErrors() {
    const errors = this.props.context.deleteUserWithConflictsDialogProps.errors;
    const groupsErrors = errors.groups && errors.groups.sole_manager || [];
    const groupsSorterByName = (groupA, groupB) => groupA.name.localeCompare(groupB.name);
    return groupsErrors.sort(groupsSorterByName);
  }

  /**
   * Get the folders errors if any
   * @returns {array} The list of folders errors
   * - The list is sorted alphabetically by folder name
   */
  getFoldersErrors() {
    const errors = this.props.context.deleteUserWithConflictsDialogProps.errors;
    const foldersErrors = errors.folders && errors.folders.sole_owner || [];
    const foldersSorterByName = (folderA, folderB) => folderA.name.localeCompare(folderB.name);
    return foldersErrors.sort(foldersSorterByName);
  }

  /**
   * Get the resources errors if any
   * @returns {array} The list of resources errors
   * - The list is sorted alphabetically by resource name
   */
  getResourcesErrors() {
    const errors = this.props.context.deleteUserWithConflictsDialogProps.errors;
    const resourcesErrors = errors.resources && errors.resources.sole_owner || [];
    const resourcesSorterByName = (resourcesA, resourcesB) => resourcesA.name.localeCompare(resourcesB.name);
    return resourcesErrors.sort(resourcesSorterByName);
  }

  /**
   * Get a map of groups users options that can potentially be elevated as group manager for each group.
   * @returns {object}
   */
  getGroupsGroupsUsersOptionsMap() {
    const reducer = (groupsGroupsUsersOptions, groupError) => Object.assign(groupsGroupsUsersOptions, {[groupError.id]: this.getGroupGroupsUsersOptions(groupError)});
    return this.groupsErrors.reduce(reducer, {});
  }

  /**
   * Get the groups users options that can potentially be elevated as group manager for the given group error.
   * @param {object} groupError
   * @returns {array} An array of groups users
   * - The groups users options are sorted alphabetically by associated user full name.
   * - The group user associated to the user we want to delete is removed from this list.
   * - The associated user is attached to each group user.
   */
  getGroupGroupsUsersOptions(groupError) {
    let groupGroupsUsersOptions = groupError.groups_users;
    groupGroupsUsersOptions = this.filterOutUserToDeleteFromGroupsUsers(groupGroupsUsersOptions);
    groupGroupsUsersOptions = this.decorateGroupsUsersWithUserEntity(groupGroupsUsersOptions);
    groupGroupsUsersOptions = this.sortGroupsUsersAlphabeticallyByUserFullName(groupGroupsUsersOptions);
    return groupGroupsUsersOptions;
  }

  /**
   * Filter out the user to delete from the list of groups users.
   * @param {array} groupsUsers
   * @returns {array}
   */
  filterOutUserToDeleteFromGroupsUsers(groupsUsers) {
    const filterOutDeletedUserFromGroupsUsers = groupUser => groupUser.user_id !== this.userToDelete.id;
    return groupsUsers.filter(filterOutDeletedUserFromGroupsUsers);
  }

  /**
   * Decorate a list of groups users with their associated user.
   * @param {array} groupsUsers
   * @returns {array}
   */
  decorateGroupsUsersWithUserEntity(groupsUsers) {
    const decorateGroupsUsersWithUserEntity = groupUser => groupUser.user = this.getUser(groupUser.user_id);
    groupsUsers.forEach(decorateGroupsUsersWithUserEntity);
    return groupsUsers;
  }

  /**
   * Sort a list of groups users by their
   * @param {array} groupsUsers
   * @returns {array}
   */
  sortGroupsUsersAlphabeticallyByUserFullName(groupsUsers) {
    const sortGroupsUsersAlphabeticallyByUserFullName = (groupUserA, groupUserB) => this.getUserFullName(groupUserA.user).localeCompare(this.getUserFullName(groupUserB.user));
    return groupsUsers.sort(sortGroupsUsersAlphabeticallyByUserFullName);
  }

  /**
   * Get a map of permissions options that can potentially be elevated as owner for each aco (resources/groups).
   * @returns {object}
   */
  getAcosPermissionsOptionsMap() {
    const acoPermissionsOptionsMap = {};
    this.resourcesErrors.forEach(resourceError => {
      acoPermissionsOptionsMap[resourceError.id] = this.getAcoPermissionsOptions(resourceError);
    });
    this.foldersErrors.forEach(folderError => {
      acoPermissionsOptionsMap[folderError.id] = this.getAcoPermissionsOptions(folderError);
    });
    return acoPermissionsOptionsMap;
  }

  /**
   * Get the permissions options that can potentially be elevated as owner for the given aco error (resource/group).
   * @param {object} acoError
   * @returns {array} An array of permissions
   * - The permissions options are sorted alphabetically by associated user full name or group.
   * - The permission associated to the user we want to delete is removed from this list.
   * - The permission associated user or group is attached to each permission.
   */
  getAcoPermissionsOptions(acoError) {
    let acoPermissionsOptions = acoError.permissions;
    acoPermissionsOptions = this.filterOutUserToDeleteFromPermissions(acoPermissionsOptions);
    acoPermissionsOptions = this.decoratePermissionWithAcoEntity(acoPermissionsOptions);
    acoPermissionsOptions = this.sortPermissionsAlphabeticallyByAcoName(acoPermissionsOptions);
    return acoPermissionsOptions;
  }

  /**
   * Filter out the user to delete from the list of permissions.
   * @param {array} permissions
   * @returns {array}
   */
  filterOutUserToDeleteFromPermissions(permissions) {
    const filterOutUserToDeleteFromPermissions = permission => permission.aro_foreign_key !== this.userToDelete.id;
    return permissions.filter(filterOutUserToDeleteFromPermissions);
  }

  /**
   * Decorate a list of permissions with their associated user or group.
   * @param {array} permissions
   * @returns {array}
   */
  decoratePermissionWithAcoEntity(permissions) {
    permissions.forEach(permission => {
      if (permission.aro === "Group") {
        permission.group = this.getGroup(permission.aro_foreign_key);
      } else {
        permission.user = this.getUser(permission.aro_foreign_key);
      }
    });
    return permissions;
  }

  /**
   * Sort a list of permissions by their aco name (fullname for user, name for group)
   * @param {array} permissions
   * @returns {array}
   */
  sortPermissionsAlphabeticallyByAcoName(permissions) {
    return permissions.sort((permissionA, permissionB) => {
      const permissionAAcoName = permissionA.aro === "Group" ? permissionA.group.name : this.getUserFullName(permissionA.user);
      const permissionBAcoName = permissionB.aro === "Group" ? permissionB.group.name : this.getUserFullName(permissionB.user);
      return permissionAAcoName.localeCompare(permissionBAcoName);
    });
  }

  /**
   * Get a user by id
   * @param {string} id
   * @returns {object}
   */
  getUser(id) {
    return this.props.context.users.find(user => user.id === id);
  }

  /**
   * Get a group by id
   * @param {string} id
   * @returns {object}
   */
  getGroup(id) {
    return this.props.context.groups.find(group => group.id === id);
  }

  /**
   * Get a user full name
   * @param {object} user
   * @returns {string}
   */
  getUserFullName(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.delete();
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
    this.props.context.setContext({deleteUserWithConflictsDialogProps: null});
  }

  /**
   * Handle onChange owner select event
   * @param event
   * @param id the id of the folder or resource
   */
  handleOnChangeOwner(event, id) {
    const target = event.target;
    const permissionId = target.value;
    const owners = this.state.owners;
    // assign the new folderId or resourceId with the permissionId
    Object.assign(owners, {[id]: permissionId});
    this.setState({owners});
  }

  /**
   * Handle onChange manager select event
   * @param event
   * @param groupId the id of the group
   */
  handleOnChangeManager(event, groupId) {
    const target = event.target;
    const permissionId = target.value;
    const managers = this.state.managers;
    // assign the new folderId or resourceId with the permissionId
    Object.assign(managers, {[groupId]: permissionId});
    this.setState({managers});
  }

  /**
   * create the permission owners for folder and resource transfer to send it as format expected
   * @returns {[{id: id of the permission, aco_foreign_key: id of the folder or resource}]}
   */
  createPermissionOwnersTransfer() {
    if (this.state.owners != null) {
      const owners = [];
      for (const [key, value] of Object.entries(this.state.owners)) {
        owners.push({id: value, aco_foreign_key: key});
      }
      return owners;
    }
    return null;
  }

  /**
   * create the permission managers for groups transfer to send it as format expected
   * @returns {[{id: id of the permission group user, group_id: id of the group}]}
   */
  createPermissionManagersTransfer() {
    if (this.state.managers !== null) {
      const managers = [];
      for (const [key, value] of Object.entries(this.state.managers)) {
        managers.push({id: value, group_id: key});
      }
      return managers;
    }
    return null;
  }

  /**
   * create the user delete transfer permission
   * @returns {owners, managers}
   */
  createUserDeleteTransfer() {
    const result = {};
    if (this.hasResourcesConflict() || this.hasFolderConflict()) {
      result.owners = this.createPermissionOwnersTransfer();
    }
    if (this.hasGroupsConflict()) {
      result.managers = this.createPermissionManagersTransfer();
    }
    return result;
  }

  /**
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      const userDeleteTransfer = this.createUserDeleteTransfer();
      this.props.loadingContext.add();
      await this.props.context.port.request("passbolt.users.delete", this.userToDelete.id, userDeleteTransfer);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been deleted successfully"));
      this.props.onClose();
      this.props.context.setContext({deleteUserWithConflictsDialogProps: null});
    } catch (error) {
      this.props.loadingContext.remove();
      // It can happen when the user has closed the passphrase entry dialog by instance.
      if (error.name === "UserAbortsOperationError") {
        this.setState({processing: false});
      } else {
        // Unexpected error occurred.
        console.error(error);
        this.handleError(error);
        this.setState({processing: false});
      }
    }
  }

  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * populate default owner of folders and resources
   * @returns { folderId: permissionId,... , resourceId: permissionId,... }
   */
  populateDefaultOwners() {
    const owners = {};
    if (this.hasResourcesConflict()) {
      this.resourcesErrors.forEach(resourceError => {
        const resourceDefaultOwner = this.acosPermissionsOptions[resourceError.id][0];
        if (resourceDefaultOwner) {
          owners[resourceError.id] = resourceDefaultOwner.id;
        }
      });
    }
    if (this.hasFolderConflict()) {
      this.foldersErrors.forEach(folderError => {
        const folderDefaultOwner = this.acosPermissionsOptions[folderError.id][0];
        if (folderDefaultOwner) {
          owners[folderError.id] = folderDefaultOwner.id;
        }
      });
    }
    return owners;
  }

  /**
   * populate default managers of groups
   * @returns { groupId: permissionId,... }
   */
  populateDefaultManagers() {
    return this.groupsErrors.reduce((groupsDefaultManagers, groupError) => {
      const groupDefaultManager = this.groupsGroupsUsersOptions[groupError.id][0];
      return Object.assign(groupsDefaultManagers, {[groupError.id]: groupDefaultManager.id});
    }, {});
  }

  /**
   * Get the user to delete
   * @returns {object}
   */
  get userToDelete() {
    return this.props.context.deleteUserWithConflictsDialogProps.user;
  }

  /**
   * has folders conflict
   * @returns {boolean}
   */
  hasFolderConflict() {
    return this.foldersErrors && this.foldersErrors.length > 0;
  }

  /**
   * has resources conflict
   * @returns {boolean}
   */
  hasResourcesConflict() {
    return this.resourcesErrors && this.resourcesErrors.length > 0;
  }

  /**
   * has groups conflict
   * @returns {boolean}
   */
  hasGroupsConflict() {
    return this.groupsErrors && this.groupsErrors.length > 0;
  }

  /**
   * Get aco permission
   * @param id
   * @returns {*}
   */
  getAcoPermissionsList(id) {
    const getLabel = permission => (permission.aro === "User" && this.getUserOptionLabel(permission.user)) || (permission.aro === "Group" && permission.group.name);
    return this.acosPermissionsOptions[id]?.map(permission => ({value: permission.id, label: getLabel(permission)})) || [];
  }

  /**
   * Get the users
   * @param id
   * @returns {*}
   */
  getGroupUsersList(id) {
    return this.groupsGroupsUsersOptions[id]?.map(groupUser => ({value: groupUser.id, label: this.getUserOptionLabel(groupUser.user)})) || [];
  }

  /**
   * Get the user label displayed as option
   * @param {object} user
   */
  getUserOptionLabel(user) {
    const first_name = user.profile.first_name;
    const last_name = user.profile.last_name;
    const username = user.username;

    return `${first_name} ${last_name} (${username})`;
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper
        title={this.translate("You cannot delete this user!")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-user-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content intro">
            <p>
              <Trans>
                You are about to delete the user <strong>{{user: this.getUserFullName(this.userToDelete)}}</strong>.
              </Trans>
            </p>
            <p><Trans>This user is the sole owner of some content. You need to transfer the ownership to others to continue.</Trans></p>
          </div>
          <div className="ownership-transfer">
            {this.hasFolderConflict() &&
            <div>
              <h3><Trans>Folders</Trans></h3>
              <ul className="ownership-transfer-items">
                {this.foldersErrors.map(folderError =>
                  <li key={folderError.id}>
                    <div className={`select-wrapper input required ${this.state.processing ? 'disabled' : ''}`}>
                      <label htmlFor="transfer_folder_owner">{folderError.name} (<Trans>Folder</Trans>) <Trans>new owner</Trans>:</label>
                      <Select className="form-element" value={this.state.owners[folderError.id]} items={this.getAcoPermissionsList(folderError.id)} onChange={event => this.handleOnChangeOwner(event, folderError.id)}/>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            }
            {this.hasResourcesConflict() &&
            <div>
              <h3>Passwords</h3>
              <ul className="ownership-transfer-items">
                {this.resourcesErrors.map(resourceError =>
                  <li key={resourceError.id}>
                    <div className={`select-wrapper input required ${this.state.processing ? 'disabled' : ''}`}>
                      <label htmlFor="transfer_resource_owner">{resourceError.name} (<Trans>Password</Trans>) <Trans>new owner</Trans>:</label>
                      <Select className="form-element" value={this.state.owners[resourceError.id]} items={this.getAcoPermissionsList(resourceError.id)} onChange={event => this.handleOnChangeOwner(event, resourceError.id)}/>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            }
            {this.hasGroupsConflict() &&
            <div>
              <h3>Groups</h3>
              <ul className="ownership-transfer-items">
                {this.groupsErrors.map(groupError =>
                  <li key={groupError.id}>
                    <div className={`select-wrapper input required ${this.state.processing ? 'disabled' : ''}`}>
                      <label htmlFor="transfer_group_manager">{groupError.name} (<Trans>Group</Trans>) <Trans>new manager</Trans>:</label>
                      <Select className="form-element" value={this.state.managers[groupError.id]} items={this.getGroupUsersList(groupError.id)} onChange={event => this.handleOnChangeManager(event, groupError.id)}/>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Delete")} warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeleteUserWithConflicts.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withLoading(withActionFeedback(withDialog(withTranslation('common')(DeleteUserWithConflicts)))));
