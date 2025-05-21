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
import ReactList from "react-list";
import PropTypes from "prop-types";

import FormSubmitButton from "../Common/Inputs/FormSubmitButton/FormSubmitButton";
import DialogWrapper from "../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../Common/Error/NotifyError/NotifyError";
import Autocomplete from "../Common/Inputs/Autocomplete/Autocomplete";
import ShareChanges from "./Utility/ShareChanges";
import SharePermissionItem from "./SharePermissionItem";
import SharePermissionItemSkeleton from "./SharePermissionItemSkeleton";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../contexts/DialogContext";
import {withActionFeedback} from "../../contexts/ActionFeedbackContext";
import {withResourceWorkspace} from "../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

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
    if (this.props.context.shareDialogProps.resourcesIds) {
      await this.findResourcesDetails();
    }
    if (this.props.context.shareDialogProps.foldersIds) {
      this.folders = await this.props.context.port.request('passbolt.share.get-folders', this.props.context.shareDialogProps.foldersIds);
    }

    this.shareChanges = new ShareChanges(this.resources, this.folders);
    const permissions = this.shareChanges.aggregatePermissionsByAro();
    this.setState({loading: false, name: '', permissions: permissions}, () => {
      // scroll at the top of the permission list
      this.permissionListRef.current.scrollTo(0);
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

    this.renderItem = this.renderItem.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
  }

  /**
   * Find the resources details.
   * Close the dialog in case of error.
   * @returns {Promise<void>}
   */
  async findResourcesDetails() {
    try {
      this.resources = await this.props.context.port.request('passbolt.resources.find-all-by-ids-for-display-permissions', this.props.context.shareDialogProps.resourcesIds);
    } catch (error) {
      this.handleError(error);
      this.props.onClose();
    }
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
      this.setState({processing: false});
      this.handleError(error);
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The permissions have been changed successfully."));
    await this.props.resourceWorkspaceContext.onResourceShared();
    this.props.onClose();
  }

  /**
   * Handle an error.
   * If the user declined to proceed, by refusing to enter their passphrase or trust the key, do nothing.
   * For any other error, show the error dialog.
   * @param {object} error The returned error
   */
  handleError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error?.name === "UserAbortsOperationError" || error?.name === "UntrustedMetadataKeyError") {
      console.warn(error);
      return;
    }
    console.error(error);
    this.props.dialogContext.open(NotifyError, {error});
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
      this.permissionListRef.current.scrollTo(this.state.permissions.length - 1);
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
    if (this.props.context.shareDialogProps.resourcesIds && this.props.context.shareDialogProps.foldersIds) {
      throw new Error(this.translate("Multi resource and folder share is not implemented."));
    }
    if (this.props.context.shareDialogProps.resourcesIds) {
      await this.props.context.port.request("passbolt.share.resources.save", this.props.context.shareDialogProps.resourcesIds, this.shareChanges.getResourcesChanges());
      return;
    }
    if (this.props.context.shareDialogProps.foldersIds) {
      await this.props.context.port.request("passbolt.share.folders.save", this.props.context.shareDialogProps.foldersIds[0], this.shareChanges.getFoldersChanges());
    }
  }

  /**
   * Get users or groups matching the given keyword
   * @param {string} keyword
   * @returns {Promise<Array>}
   */
  async fetchAutocompleteItems(keyword) {
    keyword = keyword.toLowerCase();
    const matchingUsersAndGroups = await this.props.context.port.request('passbolt.share.search-aros', keyword);

    const permissions = this.state.permissions;
    const hasPermissionsOnResources = aro_id =>
      permissions.some(permission => permission.id === aro_id);

    let currentcount = 0;
    const usersAndGroupsToDisplay = matchingUsersAndGroups.filter(userOrGroup => {
      const isMatching = currentcount < Autocomplete.DISPLAY_LIMIT
        && !hasPermissionsOnResources(userOrGroup.id);

      if (isMatching) {
        currentcount++;
      }

      return isMatching;
    });

    return usersAndGroupsToDisplay;
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
    return this.props.context.shareDialogProps.resourcesIds
      && this.props.context.shareDialogProps.foldersIds
      && this.props.context.shareDialogProps.resourcesIds.length
      && this.props.context.shareDialogProps.foldersIds.length;
  }

  /**
   * Is this share screen handling sharing of multiple resources?
   * @returns {boolean}
   */
  isAboutResources() {
    return this.props.context.shareDialogProps.resourcesIds && this.props.context.shareDialogProps.resourcesIds.length > 1;
  }

  /**
   * Is this share screen handling sharing of multiple folders?
   * @returns {boolean}
   */
  isAboutFolders() {
    return this.props.context.shareDialogProps.foldersIds && this.props.context.shareDialogProps.foldersIds.length > 1;
  }

  /**
   * Is this share screen handling sharing one folder?
   * @returns {boolean}
   */
  isAboutAFolder() {
    return this.props.context.shareDialogProps.foldersIds && this.props.context.shareDialogProps.foldersIds.length === 1;
  }

  /**
   * Is this share screen handling sharing one resource?
   * @returns {boolean}
   */
  isAboutAResource() {
    return this.props.context.shareDialogProps.resourcesIds && this.props.context.shareDialogProps.resourcesIds.length === 1;
  }

  /**
   * Return a relevant title in case of single resource/folder or multiple item share, etc.
   * @returns {string}
   */
  getTitle() {
    if (this.state.loading) {
      return this.translate("Loading...");
    }
    if (this.isAboutItems()) {
      return this.translate("Share {{count}} items", {count: this.props.context.shareDialogProps.resourcesIds.length + this.props.context.shareDialogProps.foldersIds.length});
    }
    if (this.isAboutAResource()) {
      return this.translate("Share resource");
    }
    if (this.isAboutResources()) {
      return this.translate("Share {{count}} resources", {count: this.props.context.shareDialogProps.resourcesIds.length});
    }
    if (this.isAboutAFolder()) {
      return this.translate("Share folder");
    }
    if (this.isAboutFolders()) {
      return this.translate("Share {{count}} folders", {count: this.props.context.shareDialogProps.foldersIds.length});
    }
  }

  /**
   * Return a relevant subtitle in case of single resource/folder or multiple item share, etc.
   * @returns {string}
   */
  getSubtitle() {
    if (this.state.loading) {
      return;
    }
    if (this.isAboutAResource()) {
      return this.resources[0].metadata.name;
    }
    if (this.isAboutAFolder()) {
      return this.folders[0].name;
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
    return acos.map(aco => aco.permission.aco === "Resource" ? aco.metadata.name : aco.name).join(', ');
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
   * Use to render a single item of the share permission list
   * @param {integer} index of the item in the source list
   * @returns {JSX.Element}
   */
  renderItem(index) {
    const permission = this.state.permissions[index];
    const sharePermissionItemKey = permission.aro.id;
    return (
      <SharePermissionItem
        id={permission.aro.id}
        key={sharePermissionItemKey}
        aro={permission.aro}
        permissionType={permission.type}
        variesDetails={permission.variesDetails}
        updated={permission.updated}
        disabled={this.hasAllInputDisabled()}
        onUpdate={this.handlePermissionUpdate}
        onDelete={this.handlePermissionDelete}
        canShowUserAsSuspended={this.isSuspendedUserFeatureEnabled}
      />
    );
  }

  /**
   * Use to render the container of the list of the ReactList component
   * @param {Array<JSX.Element>} items the list of the items to be rendered as children element of the conainer
   * @param {*} ref the ref ReactList needs to manage the scroll
   * @returns {JSX.Element}
   */
  renderContainer(items, ref) {
    return (
      <ul className="permissions" ref={ref}>
        {items}
      </ul>
    );
  }

  /**
   * Returns true if the feature flag disableUser is enabled.
   * @returns {boolean}
   */
  get isSuspendedUserFeatureEnabled() {
    return this.props.context.siteSettings.canIUse('disableUser');
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render
   * @returns {*}
   */
  render() {
    return (
      <DialogWrapper
        className="share-dialog"
        title={this.getTitle()}
        subtitle={this.getSubtitle()}
        tooltip={this.getTooltip()}
        onClose={this.handleClose}
        disabled={this.hasAllInputDisabled()}>
        <form className="share-form grid-and-footer" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className="scroll permission-edit">
              {(this.state.loading) &&
                <ul className="permissions">
                  <SharePermissionItemSkeleton/>
                  <SharePermissionItemSkeleton/>
                  <SharePermissionItemSkeleton/>
                </ul>
              }
              {!(this.state.loading) &&
                <ReactList
                  itemRenderer={this.renderItem}
                  itemsRenderer={this.renderContainer}
                  length={this.state.permissions.length}
                  minSize={this.props.listMinSize}
                  type={this.state.permissions.length < 4 ? "simple" : "uniform"}
                  ref={this.permissionListRef}
                  usePosition={true}
                  threshold={30}>
                </ReactList>
              }
            </div>
            <div className="permission-add">
              <Autocomplete
                id="share-name-input"
                name="name"
                label={this.translate("Share with people or groups")}
                placeholder={this.translate("Start typing a user or group name")}
                searchCallback={this.fetchAutocompleteItems}
                onSelect={this.handleAutocompleteSelect}
                onOpen={this.handleAutocompleteOpen}
                onClose={this.handleAutocompleteClose}
                disabled={this.hasAllInputDisabled()}
                baseUrl={this.props.context.userSettings.getTrustedDomain()}
                canShowUserAsSuspended={this.isSuspendedUserFeatureEnabled}
              />
            </div>
            {(this.hasNoOwner()) &&
              <div className="message error">
                <Trans>Please make sure there is at least one owner.</Trans>
              </div>
            }
            {(this.hasChanges() && !this.hasNoOwner()) &&
              <div className="message warning">
                <Trans>Click save to apply your pending changes.</Trans>
              </div>
            }
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
            <FormSubmitButton disabled={this.hasSubmitDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ShareDialog.defaultProps = {
  listMinSize: 4
};

ShareDialog.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  listMinSize: PropTypes.number, // The minimum size to be renderered in the permission list
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withActionFeedback(withDialog(withTranslation('common')(ShareDialog)))));
