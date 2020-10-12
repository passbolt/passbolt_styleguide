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
import AppContext from "../../../contexts/AppContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import {withLoading} from "../../../contexts/Common/LoadingContext";

/**
 * This component allows user to delete a user with conflict to reassign ownership of folders, resources and groups
 */
class DeleteUserWithConflictsDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getDefaultState();
    this.initEventHandlers();
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
    this.context.setContext({deleteUserWithConflictsDialogProps: null});
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
    const managers = this.state.owners;
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
    const owners = this.createPermissionOwnersTransfer();
    const managers = this.createPermissionManagersTransfer();
    return {owners, managers};
  }

  /**
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      const userDeleteTransfer = this.createUserDeleteTransfer();
      this.props.loadingContext.add();
      await this.context.port.request("passbolt.users.delete", this.user.id, userDeleteTransfer);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess("The user has been deleted successfully");
      this.props.onClose();
      this.context.setContext({deleteUserWithConflictsDialogProps: null});
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
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Get user first name and last name
   * @returns {string}
   */
  getUser() {
    const first_name = this.user.profile.first_name;
    const last_name = this.user.profile.last_name;

    return `${first_name} ${last_name}`;
  }

  /**
   * Get user first name, last name and username
   * @param userPermission
   */
  getUserPermissionName(userPermission) {
    const first_name = userPermission.first_name;
    const last_name = userPermission.last_name;
    const username = userPermission.username;

    return `${first_name} ${last_name} (${username})`;
  }

  /**
   * populate default owner of folders and resources
   * @returns { folderId: permissionId,... , resourceId: permissionId,... }
   */
  populateDefaultOwners() {
    const owners = {};
    // create an object with key:value => [id of object]: permissionId
    const permissionTransferReducer = (assignments, permissionTransfer) => (Object.assign(assignments, {[permissionTransfer.id]: this.getDefaultPermissionId(permissionTransfer.allowedUsersPermission, permissionTransfer.allowedGroupsPermission)}));
    if (this.hasFolderConflict()) {
      const assignmentsDefaultFolder = this.folders.reduce(permissionTransferReducer, {});
      Object.assign(owners, assignmentsDefaultFolder || {});
    }
    if (this.hasResourcesConflict()) {
      const assignmentsDefaultResource = this.resources.reduce(permissionTransferReducer, {});
      Object.assign(owners, assignmentsDefaultResource || {});
    }
    return owners;
  }

  /**
   * populate default managers of groups
   * @returns { groupId: permissionId,... }
   */
  populateDefaultManagers() {
    const managers = {};
    // create an object with key:value => [id of object]: permissionId
    const permissionTransferReducer = (assignments, permissionTransfer) => (Object.assign(assignments, {[permissionTransfer.id]: this.getDefaultPermissionId(permissionTransfer.allowedUsersPermission)}));
    if (this.hasGroupsConflict()) {
      const assignmentsDefaultGroup = this.groups.reduce(permissionTransferReducer, {});
      Object.assign(managers, assignmentsDefaultGroup || {});
    }
    return managers;
  }

  /**
   * Get the default user permission id
   * @param allowedUsersPermission
   */
  getDefaultUserPermissionId(allowedUsersPermission) {
    return allowedUsersPermission.sort((userPermissionA, userPermissionB) => this.sortPermissions(userPermissionA, userPermissionB))[0].permissionId;
  }

  /**
   * Get the default group permission id
   * @param allowedGroupsPermission
   */
  getDefaultGroupPermissionId(allowedGroupsPermission) {
    return allowedGroupsPermission.sort((groupPermissionA, groupPermissionB) => groupPermissionA.name.localeCompare(groupPermissionB.name))[0].permissionId;
  }

  /**
   * Get the default permission id
   * @param allowedUsersPermission
   * @param allowedGroupsPermission
   */
  getDefaultPermissionId(allowedUsersPermission, allowedGroupsPermission) {
    if (allowedUsersPermission !== null) {
      return this.getDefaultUserPermissionId(allowedUsersPermission);
    } else {
      return this.getDefaultGroupPermissionId(allowedGroupsPermission);
    }
  }

  /**
   * Sort user permission by user firstname and by lastname
   * @param userPermissionA
   * @param userPermissionB
   * @returns {number}
   */
  sortPermissions(userPermissionA, userPermissionB) {
    // permission have user sort by firstname and lastname
    if (userPermissionA.first_name === userPermissionB.first_name) {
      return userPermissionA.last_name < userPermissionB.last_name ? -1 : 1;
    }
    return userPermissionA.first_name < userPermissionB.first_name ? -1 : 1;
  }

  /**
   * Get user
   * @returns {null}
   */
  get user() {
    return this.context.deleteUserWithConflictsDialogProps.user;
  }

  /**
   * Get folders
   * @returns {null}
   */
  get folders() {
    return this.context.deleteUserWithConflictsDialogProps.folders;
  }

  /**
   * Get resources
   * @returns {null}
   */
  get resources() {
    return this.context.deleteUserWithConflictsDialogProps.resources;
  }

  /**
   * Get groups
   * @returns {null}
   */
  get groups() {
    return this.context.deleteUserWithConflictsDialogProps.groups;
  }

  /**
   * has folders conflict
   * @returns {boolean}
   */
  hasFolderConflict() {
    return this.folders !== null;
  }

  /**
   * has resources conflict
   * @returns {boolean}
   */
  hasResourcesConflict() {
    return this.resources !== null;
  }

  /**
   * has groups conflict
   * @returns {boolean}
   */
  hasGroupsConflict() {
    return this.groups !== null;
  }

  /**
   * Has allowed user assignment
   * @param assignment
   * @returns {boolean}
   */
  hasAllowedUsersPermission(assignment) {
    return assignment.allowedUsersPermission != null;
  }

  /**
   * Has allowed group assignment
   * @param assignment
   * @returns {boolean}
   */
  hasAllowedGroupsPermission(assignment) {
    return assignment.allowedGroupsPermission != null;
  }

  /**
   * Get folders sorted by name
   * @returns {*}
   */
  get foldersSorted() {
    return this.folders.sort((folderA, folderB) => folderA.name.localeCompare(folderB.name));
  }

  /**
   * Get resources sorted by name
   * @returns {*}
   */
  get resourcesSorted() {
    return this.resources.sort((resourceA, resourceB) => resourceA.name.localeCompare(resourceB.name));
  }

  /**
   * Get groups sorted by name
   * @returns {*}
   */
  get groupsSorted() {
    return this.groups.sort((groupA, groupB) => groupA.name.localeCompare(groupB.name));
  }

  render() {
    return (
      <DialogWrapper
        title="You cannot delete this user!"
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-user-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content intro">
            <p>
              <strong>You are about to delete {this.getUser()}.</strong>
            </p>
            <p>
              This user is the owner of passwords or groups.
              You need to transfer the ownership to other users to continue.
            </p>
          </div>
          <div className="ownership-transfer">
            {this.hasFolderConflict() &&
             <div>
               <h3>Folders</h3>
               <ul className="ownership-transfer-items">
                 {this.foldersSorted.map(folder =>
                   <li key={folder.id}>
                     <div className="input select required">
                       <label htmlFor="transfer_folder_owner">{folder.name} (Folder) new owner:</label>
                       <select className="fluid form-element ready" value={this.state.owners[folder.id]} onChange={event => this.handleOnChangeOwner(event, folder.id)}>
                         {this.hasAllowedUsersPermission(folder) &&
                         folder.allowedUsersPermission.map(userPermission =>
                           <option key={userPermission.permissionId} value={userPermission.permissionId}>{this.getUserPermissionName(userPermission)}</option>
                         )}
                         {this.hasAllowedGroupsPermission(folder) &&
                         folder.allowedGroupsPermission.map(groupPermission =>
                           <option key={groupPermission.permissionId} value={groupPermission.permissionId}>{groupPermission.name}</option>
                         )}
                       </select>
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
                  {this.resourcesSorted.map(resource =>
                    <li key={resource.id}>
                      <div className="input select required">
                        <label htmlFor="transfer_resource_owner">{resource.name} (Password) new owner:</label>
                        <select className="fluid form-element ready" value={this.state.owners[resource.id]} onChange={event => this.handleOnChangeOwner(event, resource.id)}>
                          {this.hasAllowedUsersPermission(resource) &&
                          resource.allowedUsersPermission.map(userPermission =>
                            <option key={userPermission.permissionId} value={userPermission.permissionId}>{this.getUserPermissionName(userPermission)}</option>
                          )}
                          {this.hasAllowedGroupsPermission(resource) &&
                          resource.allowedGroupsPermission.map(groupPermission =>
                            <option key={groupPermission.permissionId} value={groupPermission.permissionId}>{groupPermission.name}</option>
                          )}
                        </select>
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
                  {this.groupsSorted.map(group =>
                    <li key={group.id}>
                      <div className="input select required">
                        <label htmlFor="transfer_group_manager">{group.name} (Group) new manager:</label>
                        <select className="fluid form-element ready" value={this.state.managers[group.id]} onChange={event => this.handleOnChangeManager(event, group.id)}>
                          {group.allowedUsersPermission.map(userPermission =>
                            <option key={userPermission.permissionId} value={userPermission.permissionId}>{this.getUserPermissionName(userPermission)}</option>
                          )}
                        </select>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value="Delete" warning={true}/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeleteUserWithConflictsDialog.contextType = AppContext;

DeleteUserWithConflictsDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any // The loading context
};

export default withLoading(withActionFeedback(withDialog(DeleteUserWithConflictsDialog)));
