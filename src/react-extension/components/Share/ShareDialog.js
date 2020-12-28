/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2019 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2019 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

import FormSubmitButton from "../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import DialogWrapper from "../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../Dialog/ErrorDialog/ErrorDialog";
import Autocomplete from "../../../react/components/Common/Inputs/Autocomplete/Autocomplete";
import ShareChanges from "./Utility/ShareChanges";
import SharePermissionItem from "./SharePermissionItem";
import SharePermissionItemSkeleton from "./SharePermissionItemSkeleton";
import AppContext from "../../contexts/AppContext";
import {withDialog} from "../../../react/contexts/Common/DialogContext";
import {withActionFeedback} from "../../contexts/ActionFeedbackContext";

class ShareDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.resources = [];
    this.folders = [];
    this.state = this.getDefaultState();
    this.shareChanges = null;
    this.permissionListRef = React.createRef();
    this.bindEventHandlers();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    if (this.context.shareDialogProps.resourcesIds) {
      this.resources = await this.context.port.request('passbolt.share.get-resources', this.context.shareDialogProps.resourcesIds);
    }
    if (this.context.shareDialogProps.foldersIds) {
      this.folders = await this.context.port.request('passbolt.share.get-folders', this.context.shareDialogProps.foldersIds);
    }

    this.shareChanges = new ShareChanges(this.resources, this.folders);
    const permissions = this.shareChanges.aggregatePermissionsByAro();
    this.setState({loading: false, name: '', permissions: permissions}, () => {
      // scroll at the top of the permission list
      this.permissionListRef.current.scrollTop = 0;
    });
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,

      // permission list
      permissions: null,

      // autocomplete
      autocompleteOpen: false,
    };
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.handleAutocompleteClose = this.handleAutocompleteClose.bind(this);
    this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);
    this.fetchAutocompleteItems = this.fetchAutocompleteItems.bind(this);

    this.handlePermissionUpdate = this.handlePermissionUpdate.bind(this);
    this.handlePermissionDelete = this.handlePermissionDelete.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
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
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    // Prevent enter on autocomplete to trigger submit
    if (this.state.autocompleteOpen) {
      return;
    }
    // Do not re-submit an already processing form
    if (this.state.processing) {
      return;
    }
    // Do not submit enter on autocomplete selection
    if (this.state.autocompleteItems) {
      return;
    }

    await this.toggleProcessing();
    try {
      await this.shareSave();
      await this.handleSaveSuccess();
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The permissions have been changed successfully.");
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
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

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it and scroll
   * @param {object} aro
   */
  handleAutocompleteSelect(aro) {
    // check if permission is already listed
    const existing = this.state.permissions.filter(permission => permission.aro.id === aro.id);
    if (existing.length > 0) {
      // TODO scroll to and highlight
      return;
    }

    // TODO restore to original permission if any
    const permission = this.shareChanges.addAroPermissions(aro);
    permission.updated = true;
    const permissions = this.state.permissions;
    permissions.push(permission);
    this.setState({permissions: permissions}, () => {
      // scroll at the bottom of the permission list
      this.permissionListRef.current.scrollTop = this.permissionListRef.current.scrollHeight;
    });
  }

  /**
   * What happens when the user changes a permission for a group or user
   * e.g. highlight if it's different than original, update permission list in the state
   *
   * @param {string} aroId The aro to update the permissions for
   * @param {int} type like create, owner, etc.
   */
  handlePermissionUpdate(aroId, type) {
    this.shareChanges.updateAroPermissions(aroId, type);
    const newPermissions = this.state.permissions.map(permission => {
      if (permission.aro.id === aroId) {
        permission.type = type;
        permission.updated = this.shareChanges.hasChanges(aroId);
      }
      return permission;
    });
    this.setState({permissions: newPermissions});
  }

  /**
   * What happens when the user delete a user or group from permission list
   * e.g. delete permission from the shareChanges and update the state
   * @param {string} aroId uuid
   */
  handlePermissionDelete(aroId) {
    this.shareChanges.deleteAroPermissions(aroId);
    const newPermissions = this.state.permissions.filter(permission => (permission.aro.id !== aroId));
    this.setState({permissions: newPermissions});
  }

  /**
   * Save the permissions
   * @returns {Promise<void>}
   */
  async shareSave() {
    if (this.context.shareDialogProps.resourcesIds && this.context.shareDialogProps.foldersIds) {
      throw new Error('Multi resource and folder share is not implemented.');
    }
    if (this.context.shareDialogProps.resourcesIds) {
      await this.context.port.request("passbolt.share.resources.save", this.resources, this.shareChanges.getResourcesChanges());
      return;
    }
    if (this.context.shareDialogProps.foldersIds) {
      await this.context.port.request("passbolt.share.folders.save", this.folders, this.shareChanges.getFoldersChanges());
    }
  }

  /**
   * Get users or groups matching the given keyword
   * @param {string} keyword
   * @returns {Promise<Object>} aros,
   */
  async fetchAutocompleteItems(keyword) {
    const ids = this.context.shareDialogProps.resourcesIds || this.context.shareDialogProps.foldersIds;
    const items = await this.context.port.request('passbolt.share.search-aros', keyword, ids);
    return items.filter(item => {
      const found = this.state.permissions.filter(permission => (permission.aro.id === item.id));
      return found.length === 0;
    });
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Is this share screen handling sharing of multiple Acos?
   * @returns {boolean}
   */
  isAboutItems() {
    return this.context.shareDialogProps.resourcesIds
      && this.context.shareDialogProps.foldersIds
      && this.context.shareDialogProps.resourcesIds.length
      && this.context.shareDialogProps.foldersIds.length;
  }

  /**
   * Is this share screen handling sharing of multiple resources?
   * @returns {boolean}
   */
  isAboutResources() {
    return this.context.shareDialogProps.resourcesIds && this.context.shareDialogProps.resourcesIds.length > 1;
  }

  /**
   * Is this share screen handling sharing of multiple folders?
   * @returns {boolean}
   */
  isAboutFolders() {
    return this.context.shareDialogProps.foldersIds && this.context.shareDialogProps.foldersIds.length > 1;
  }

  /**
   * Is this share screen handling sharing one folder?
   * @returns {boolean}
   */
  isAboutAFolder() {
    return this.context.shareDialogProps.foldersIds && this.context.shareDialogProps.foldersIds.length === 1;
  }

  /**
   * Is this share screen handling sharing one resource?
   * @returns {boolean}
   */
  isAboutAResource() {
    return this.context.shareDialogProps.resourcesIds && this.context.shareDialogProps.resourcesIds.length === 1;
  }

  /**
   * Return a relevant title in case of single resource/folder or multiple item share, etc.
   * @returns {boolean}
   */
  getTitle() {
    if (this.state.loading) {
      return `Loading...`;
    }
    if (this.isAboutItems()) {
      return `Share ${this.context.shareDialogProps.resourcesIds.length + this.context.shareDialogProps.foldersIds.length} items`;
    }
    if (this.isAboutAResource()) {
      return `Share resource ${this.resources[0].name}`;
    }
    if (this.isAboutResources()) {
      return `Share ${this.context.shareDialogProps.resourcesIds.length} resources`;
    }
    if (this.isAboutAFolder()) {
      return `Share folder ${this.folders[0].name}`;
    }
    if (this.isAboutFolders()) {
      return `Share ${this.context.shareDialogProps.foldersIds.length} folders`;
    }
  }

  /**
   * Return the dialog title tooltip content (multi-share details)
   * or false in case of single resource share
   * @returns {false|string} tool
   */
  getTooltip() {
    if (!this.shareChanges) {
      return '';
    }
    const acos = this.shareChanges.getAcos();
    if (!acos || !acos.length || acos.length === 1) {
      return '';
    }
    return acos.map(acos => acos.name).join(', ');
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /**
   * Return true if the permission list does not have at least one owner
   * @returns {boolean}
   */
  hasNoOwner() {
    return (this.shareChanges && (this.shareChanges.getResourcesWithNoOwner()).length > 0);
  }

  /**
   * Return true if the permission list have changed since the start
   * @returns {null|boolean}
   */
  hasChanges() {
    return (this.shareChanges && (this.shareChanges.getChanges().length > 0));
  }

  /**
   * Return true if submit button should be disabled
   * True if there is no owner, if all input should be disabled, if there is no change since the start
   * @returns {boolean}
   */
  hasSubmitDisabled() {
    return this.hasNoOwner() || this.hasAllInputDisabled() || !this.hasChanges();
  }

  /**
   * Render
   * @returns {*}
   */
  render() {
    return (
      <DialogWrapper
        title={this.getTitle()}
        tooltip={this.getTooltip()}
        onClose={this.handleClose}
        disabled={this.hasAllInputDisabled()}>
        <form className="share-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content permission-edit">
            {(this.state.loading) &&
              <ul className="permissions scroll">
                <SharePermissionItemSkeleton/>
                <SharePermissionItemSkeleton/>
                <SharePermissionItemSkeleton/>
              </ul>
            }
            {!(this.state.loading) &&
              <ul className="permissions scroll" ref={this.permissionListRef}>
                {(this.state.permissions && (this.state.permissions).map((permission, key) => <SharePermissionItem
                  id={permission.aro.id}
                  key={key}
                  aro={permission.aro}
                  permissionType={permission.type}
                  variesDetails={permission.variesDetails}
                  updated={permission.updated}
                  disabled={this.hasAllInputDisabled()}
                  onUpdate={this.handlePermissionUpdate}
                  onDelete={this.handlePermissionDelete}
                />))}
              </ul>
            }
          </div>
          {(this.hasNoOwner()) &&
            <div className="message error">
              Please make sure there is at least one owner.
            </div>
          }
          {(this.hasChanges() && !this.hasNoOwner()) &&
            <div className="message warning">
              Click save to apply your pending changes.
            </div>
          }
          <div className="form-content permission-add">
            <Autocomplete
              id="share-name-input"
              name="name"
              label="Share with people or groups"
              placeholder="Start typing a user or group name"
              searchCallback={this.fetchAutocompleteItems}
              onSelect={this.handleAutocompleteSelect}
              onOpen={this.handleAutocompleteOpen}
              onClose={this.handleAutocompleteClose}
              disabled={this.hasAllInputDisabled()}
              baseUrl={this.context.userSettings.getTrustedDomain()}
            />
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasSubmitDisabled()} processing={this.state.processing} value="Save"/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ShareDialog.contextType = AppContext;

ShareDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any // The dialog context
};

export default withActionFeedback(withDialog(ShareDialog));
