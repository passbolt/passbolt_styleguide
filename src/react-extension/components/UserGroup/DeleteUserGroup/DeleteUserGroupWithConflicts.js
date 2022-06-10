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
 * This component allows user to delete a group with conflict to reassign ownership of folders, resources
 */
class DeleteUserGroupWithConflicts extends Component {
  constructor(props, context) {
    super(props, context);
    this.initializeProperties();
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  /**
   * Initialize properties
   */
  initializeProperties() {
    this.foldersErrors = this.getFoldersErrors();
    this.resourcesErrors = this.getResourcesErrors();
    this.acosPermissionsOptions = this.getAcosPermissionsOptionsMap();
  }

  get defaultState() {
    return {
      processing: false,
      owners: this.populateDefaultOwners(),
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOnChangeOwner = this.handleOnChangeOwner.bind(this);
  }

  /**
   * Get the folders errors if any
   * @returns {array} The list of folders errors
   * - The list is sorted alphabetically by folder name
   */
  getFoldersErrors() {
    const errors = this.props.context.deleteGroupWithConflictsDialogProps.errors;
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
    const errors = this.props.context.deleteGroupWithConflictsDialogProps.errors;
    const resourcesErrors = errors.resources && errors.resources.sole_owner || [];
    const resourcesSorterByName = (resourcesA, resourcesB) => resourcesA.name.localeCompare(resourcesB.name);
    return resourcesErrors.sort(resourcesSorterByName);
  }

  /**
   * Get a map of permissions options that can potentially be elevated as owner for each aco (resources/folders).
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
   * - The permission associated to the group we want to delete is removed from this list.
   * - The permission associated user or group is attached to each permission.
   */
  getAcoPermissionsOptions(acoError) {
    let acoPermissionsOptions = acoError.permissions;
    acoPermissionsOptions = this.filterOutGroupToDeleteFromPermissions(acoPermissionsOptions);
    acoPermissionsOptions = this.decoratePermissionWithAcoEntity(acoPermissionsOptions);
    acoPermissionsOptions = this.sortPermissionsAlphabeticallyByAcoName(acoPermissionsOptions);
    return acoPermissionsOptions;
  }

  /**
   * Filter out the user to delete from the list of permissions.
   * @param {array} permissions
   * @returns {array}
   */
  filterOutGroupToDeleteFromPermissions(permissions) {
    const filterOutGroupToDeleteFromPermissions = permission => permission.aro_foreign_key !== this.groupToDelete.id;
    return permissions.filter(filterOutGroupToDeleteFromPermissions);
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
   * create the user delete transfer permission
   * @returns {{owners: {id: id, of, the, permission, aco_foreign_key: id, folder, or, resource}[]}}
   */
  createUserDeleteTransfer() {
    const owners = this.createPermissionOwnersTransfer();
    return {owners};
  }

  /**
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      const groupDeleteTransfer = this.createUserDeleteTransfer();
      this.props.loadingContext.add();
      await this.props.context.port.request("passbolt.groups.delete", this.groupToDelete.id, groupDeleteTransfer);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The group has been deleted successfully"));
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
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
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
   * Get the group to delete
   * @returns {null}
   */
  get groupToDelete() {
    return this.props.context.deleteGroupWithConflictsDialogProps.group;
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
   * Get aco permission
   * @param id
   * @returns {*}
   */
  getAcoPermissionsList(id) {
    const getLabel = permission => (permission.aro === "User" && this.getUserOptionLabel(permission.user)) || (permission.aro === "Group" && permission.group.name);
    return this.acosPermissionsOptions[id]?.map(permission => ({value: permission.id, label: getLabel(permission)})) || [];
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
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper
        title={this.translate("You cannot delete this group!")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-group-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content intro">
            <p>
              <Trans>
                You are about to delete the group <strong>{{groupName: this.groupToDelete.name}}</strong>.
              </Trans>
            </p>
            <p><Trans>This group is the sole owner of some content. You need to transfer the ownership to others to continue.</Trans></p>
          </div>
          <div className="ownership-transfer">
            {this.hasFolderConflict() &&
            <div>
              <h3><Trans>Folders</Trans></h3>
              <ul className="ownership-transfer-items">
                {this.foldersErrors.map(folderError =>
                  <li key={folderError.id}>
                    <div className={`select-wrapper input required ${this.state.processing ? 'disabled' : ''}`}>
                      <label htmlFor="transfer_folder_owner">{folderError.name} <Trans>(Folder) new owner:</Trans></label>
                      <Select className="form-element" value={this.state.owners[folderError.id]} items={this.getAcoPermissionsList(folderError.id)} onChange={event => this.handleOnChangeOwner(event, folderError.id)}/>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            }
            {this.hasResourcesConflict() &&
            <div>
              <h3><Trans>Passwords</Trans></h3>
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

DeleteUserGroupWithConflicts.propTypes = {
  context: PropTypes.any, // The app context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withLoading(withActionFeedback(withDialog(withTranslation('common')(DeleteUserGroupWithConflicts)))));
