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
import React, { Component } from "react";
import ReactList from "react-list";
import PropTypes from "prop-types";

import FormSubmitButton from "../Common/Inputs/FormSubmitButton/FormSubmitButton";
import DialogWrapper from "../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../Common/Error/NotifyError/NotifyError";
import Autocomplete from "../Common/Inputs/Autocomplete/Autocomplete";
import ShareChanges from "./Utility/ShareChanges";
import UserPermissionItem from "./UserPermissionItem";
import GroupPermissionItem from "./GroupPermissionItem";
import GroupUserPermissionItem from "./GroupUserPermissionItem";
import SharePermissionItemSkeleton from "./SharePermissionItemSkeleton";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../contexts/DialogContext";
import { withActionFeedback } from "../../contexts/ActionFeedbackContext";
import { withResourceWorkspace } from "../../contexts/ResourceWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import PermissionEntity from "../../../shared/models/entity/permission/permissionEntity";

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
    // Flat list of rows to display, derived from the permission list on each render.
    this.displayedPermissions = [];
    this.permissionListRef = React.createRef();
    this.bindEventHandlers();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree.
   *
   * Controlled mode: when `initialPermissions` is provided (alongside `initialGroups`,
   * `initialUsers`, and an `onConfirm` callback) the dialog seeds itself from those
   * collections instead of fetching via the port. Used by the resource-creation workflow
   * to review the parent folder's permissions before the resource exists on the server.
   *
   * @return {void}
   */
  async componentDidMount() {
    if (this.isControlledMode()) {
      this.resources = [this.buildSyntheticResourceFromControlledProps()];
    } else {
      if (this.props.context.shareDialogProps.resourcesIds) {
        await this.findResourcesDetails();
      }
      if (this.props.context.shareDialogProps.foldersIds) {
        this.folders = await this.props.context.port.request(
          "passbolt.share.get-folders",
          this.props.context.shareDialogProps.foldersIds,
        );
      }
    }

    this.shareChanges = new ShareChanges(this.resources, this.folders);
    const permissions = this.shareChanges.aggregatePermissionsByAro();
    this.setState({ loading: false, name: "", permissions: permissions }, () => {
      // scroll at the top of the permission list
      this.permissionListRef.current.scrollTo(0);
    });
  }

  /**
   * True when the dialog is operated by the workflow handler with controlled-mode props.
   * @returns {boolean}
   */
  isControlledMode() {
    return Boolean(this.props.initialPermissions);
  }

  /**
   * Build a synthetic resource DTO from the controlled-mode props so the dialog renders
   * the snapshot's permissions through the existing ShareChanges + ReactList path without
   * touching the server. The synthetic resource has no id (the underlying resource does not
   * exist yet) and a placeholder metadata; ShareChanges only needs the embedded permissions
   * to render and track edits.
   * @returns {object}
   */
  buildSyntheticResourceFromControlledProps() {
    const groupsById = {};
    this.props.initialGroups?.items.forEach((group) => {
      groupsById[group.id] = group.toDto();
    });
    const usersById = {};
    this.props.initialUsers?.items.forEach((user) => {
      usersById[user.id] = user.toDto(this.props.initialUsers.entityClass?.ALL_CONTAIN_OPTIONS);
    });

    // Remap the snapshot's permissions onto the synthetic resource: the original DTOs reference
    // the parent folder's aco/aco_foreign_key but ShareChanges needs them associated with the
    // (id-less) resource we're about to create, otherwise delete/update operations silently
    // no-op (aco_foreign_key mismatch) and any emitted change would be filtered out of
    // `getResourcesChanges()` for having `aco: "Folder"`.
    const permissions = this.props.initialPermissions.items.map((permission) => {
      const dto = permission.toDto();
      dto.aco = PermissionEntity.ACO_RESOURCE;
      dto.aco_foreign_key = null;
      if (dto.aro === PermissionEntity.ARO_USER) {
        dto.user = usersById[dto.aro_foreign_key];
      } else if (dto.aro === PermissionEntity.ARO_GROUP) {
        dto.group = groupsById[dto.aro_foreign_key];
      }
      return dto;
    });

    return {
      id: null,
      metadata: { name: "" },
      // The operator is the owner of the to-be-created resource; the snapshot's permissions are
      // grafted on top via `permissions`.
      permission: { type: PermissionEntity.PERMISSION_OWNER },
      permissions,
    };
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

      // ids of the groups whose members are currently expanded (controlled mode only)
      expandedGroupIds: [],

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
    this.handleToggleGroupMemberVisibility = this.handleToggleGroupMemberVisibility.bind(this);

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
      this.resources = await this.props.context.port.request(
        "passbolt.resources.find-all-by-ids-for-display-permissions",
        this.props.context.shareDialogProps.resourcesIds,
      );
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
    this.setState({ autocompleteOpen: true });
  }

  /**
   * handleAutocompleteClose
   * @return {void}
   */
  handleAutocompleteClose() {
    this.setState({ autocompleteOpen: false });
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

    this.setState({ processing: true });
    try {
      await this.shareSave();
      await this.handleSaveSuccess();
    } catch (error) {
      this.setState({ processing: false });
      this.handleError(error);
    }
  }

  /**
   * Handle save operation success.
   *
   * In controlled mode the workspace refresh (`onResourceShared`) and the success toast are
   * the workflow handler's responsibility — the underlying resource doesn't even exist yet
   * when this dialog closes — so we only close.
   */
  async handleSaveSuccess() {
    if (this.isControlledMode()) {
      this.props.onClose();
      return;
    }
    await this.props.actionFeedbackContext.displaySuccess(
      this.translate("The permissions have been changed successfully."),
    );
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
    this.props.dialogContext.open(NotifyError, { error });
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it and scroll
   * @param {object} aro
   */
  handleAutocompleteSelect(aro) {
    // check if permission is already listed
    const existing = this.state.permissions.filter((permission) => permission.aro.id === aro.id);
    if (existing.length > 0) {
      // TODO scroll to and highlight
      return;
    }

    // TODO restore to original permission if any
    const permission = this.shareChanges.addAroPermissions(aro);
    permission.updated = true;
    const permissions = this.state.permissions;
    permissions.push(permission);
    this.setState({ permissions: permissions }, () => {
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
    const newPermissions = this.state.permissions.map((permission) => {
      if (permission.aro.id === aroId) {
        permission.type = type;
        permission.updated = this.shareChanges.hasChanges(aroId);
      }
      return permission;
    });
    this.setState({ permissions: newPermissions });
  }

  /**
   * What happens when the user delete a user or group from permission list
   * e.g. delete permission from the shareChanges and update the state
   * @param {string} aroId uuid
   */
  handlePermissionDelete(aroId) {
    this.shareChanges.deleteAroPermissions(aroId);
    const newPermissions = this.state.permissions.filter((permission) => permission.aro.id !== aroId);
    this.setState({ permissions: newPermissions });
  }

  /**
   * Toggle the visibility of a group's members in the permission list.
   * Only relevant in controlled mode, where the members can be resolved from the initial collections.
   * @param {string} groupId The group identifier
   */
  handleToggleGroupMemberVisibility(groupId) {
    const expandedGroupIds = new Set(this.state.expandedGroupIds);
    if (expandedGroupIds.has(groupId)) {
      expandedGroupIds.delete(groupId);
    } else {
      expandedGroupIds.add(groupId);
    }
    this.setState({ expandedGroupIds: [...expandedGroupIds] });
  }

  /**
   * Resolve the member users of a group from the controlled-mode initial collections.
   * The group entity carries its memberships (groups_users), each referencing a user by id that is
   * looked up in the initial users collection. Members not present in the initial users collection
   * (i.e. without a direct permission) cannot be resolved and are omitted.
   * @param {string} groupId The group identifier
   * @returns {Array<object>} The member users DTOs
   */
  getGroupMembers(groupId) {
    const group = this.props.initialGroups?.items.find((item) => item.id === groupId);
    const groupsUsers = group?.groupsUsers?.items || [];
    return groupsUsers
      .map((groupUser) => this.props.initialUsers?.items.find((user) => user.id === groupUser.userId))
      .filter(Boolean)
      .map((user) => user.toDto(this.props.initialUsers.entityClass?.ALL_CONTAIN_OPTIONS));
  }

  /**
   * Derive the flat list of rows to display from the permission list.
   * Each permission becomes either a "user" or a "group" row. When a group is expanded (controlled
   * mode), its member users are appended as "group-user" rows right after the group row.
   * @returns {Array<{kind: string, permission?: object, user?: object, groupId?: string}>}
   */
  getDisplayedPermissions() {
    const displayedPermissions = [];
    this.state.permissions.forEach((permission) => {
      const isGroup = !permission.aro.profile;
      if (!isGroup) {
        displayedPermissions.push({ kind: "user", permission });
        return;
      }
      displayedPermissions.push({ kind: "group", permission });
      if (this.isControlledMode() && this.state.expandedGroupIds.includes(permission.aro.id)) {
        this.getGroupMembers(permission.aro.id).forEach((user) => {
          displayedPermissions.push({ kind: "group-user", user, groupId: permission.aro.id });
        });
      }
    });
    return displayedPermissions;
  }

  /**
   * Save the permissions.
   *
   * In controlled mode the dialog never calls the server — it hands the operator-confirmed
   * permission changes (in the same DTO shape that `passbolt.share.resources.save` would
   * accept) to the `onConfirm` callback so the workflow handler can orchestrate the
   * create-then-share sequence safely.
   *
   * @returns {Promise<void>}
   */
  async shareSave() {
    if (this.isControlledMode()) {
      await this.props.onConfirm(this.shareChanges.getResourcesChanges());
      return;
    }
    if (this.props.context.shareDialogProps.resourcesIds && this.props.context.shareDialogProps.foldersIds) {
      throw new Error(this.translate("Multi resource and folder share is not implemented."));
    }
    if (this.props.context.shareDialogProps.resourcesIds) {
      await this.props.context.port.request(
        "passbolt.share.resources.save",
        this.props.context.shareDialogProps.resourcesIds,
        this.shareChanges.getResourcesChanges(),
      );
      return;
    }
    if (this.props.context.shareDialogProps.foldersIds) {
      await this.props.context.port.request(
        "passbolt.share.folders.save",
        this.props.context.shareDialogProps.foldersIds[0],
        this.shareChanges.getFoldersChanges(),
      );
    }
  }

  /**
   * Get users or groups matching the given keyword
   * @param {string} keyword
   * @returns {Promise<Array>}
   */
  async fetchAutocompleteItems(keyword) {
    keyword = keyword.toLowerCase();
    const matchingUsersAndGroups = await this.props.context.port.request("passbolt.share.search-aros", keyword);

    const permissions = this.state.permissions;
    const hasPermissionsOnResources = (aro_id) => permissions.some((permission) => permission.id === aro_id);

    let currentcount = 0;
    const usersAndGroupsToDisplay = matchingUsersAndGroups.filter((userOrGroup) => {
      const isMatching = currentcount < Autocomplete.DISPLAY_LIMIT && !hasPermissionsOnResources(userOrGroup.id);

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
    return (
      this.props.context.shareDialogProps?.resourcesIds &&
      this.props.context.shareDialogProps?.foldersIds &&
      this.props.context.shareDialogProps.resourcesIds.length &&
      this.props.context.shareDialogProps.foldersIds.length
    );
  }

  /**
   * Is this share screen handling sharing of multiple resources?
   * @returns {boolean}
   */
  isAboutResources() {
    return (
      this.props.context.shareDialogProps?.resourcesIds && this.props.context.shareDialogProps.resourcesIds.length > 1
    );
  }

  /**
   * Is this share screen handling sharing of multiple folders?
   * @returns {boolean}
   */
  isAboutFolders() {
    return this.props.context.shareDialogProps?.foldersIds && this.props.context.shareDialogProps.foldersIds.length > 1;
  }

  /**
   * Is this share screen handling sharing one folder?
   * @returns {boolean}
   */
  isAboutAFolder() {
    return (
      this.props.context.shareDialogProps?.foldersIds && this.props.context.shareDialogProps.foldersIds.length === 1
    );
  }

  /**
   * Is this share screen handling sharing one resource?
   * @returns {boolean}
   */
  isAboutAResource() {
    return (
      this.props.context.shareDialogProps?.resourcesIds && this.props.context.shareDialogProps.resourcesIds.length === 1
    );
  }

  /**
   * Return a relevant title in case of single resource/folder or multiple item share, etc.
   * @returns {string}
   */
  getTitle() {
    if (this.state.loading) {
      return this.translate("Loading...");
    }
    if (this.isControlledMode()) {
      return this.translate("Share");
    }
    if (this.isAboutItems()) {
      return this.translate("Share {{count}} items", {
        count:
          this.props.context.shareDialogProps.resourcesIds.length +
          this.props.context.shareDialogProps.foldersIds.length,
      });
    }
    if (this.isAboutAResource()) {
      return this.translate("Share resource");
    }
    if (this.isAboutResources()) {
      return this.translate("Share {{count}} resources", {
        count: this.props.context.shareDialogProps.resourcesIds.length,
      });
    }
    if (this.isAboutAFolder()) {
      return this.translate("Share folder");
    }
    if (this.isAboutFolders()) {
      return this.translate("Share {{count}} folders", {
        count: this.props.context.shareDialogProps.foldersIds.length,
      });
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
      return "";
    }
    const acos = this.shareChanges.getAcos();
    if (!acos || !acos.length || acos.length === 1) {
      return "";
    }
    return acos.map((aco) => (aco.permission.aco === "Resource" ? aco.metadata.name : aco.name)).join(", ");
  }

  /**
   * Return true if the permission list does not have at least one owner
   * @returns {boolean}
   */
  hasNoOwner() {
    return this.shareChanges && this.shareChanges.getResourcesWithNoOwner().length > 0;
  }

  /**
   * Return true if the permission list have changed since the start
   * @returns {null|boolean}
   */
  hasChanges() {
    return this.shareChanges && this.shareChanges.getChanges().length > 0;
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
    const item = this.displayedPermissions[index];

    if (item.kind === "group-user") {
      return <GroupUserPermissionItem key={`${item.groupId}-${item.user.id}`} user={item.user} />;
    }

    const permission = item.permission;
    if (item.kind === "group") {
      return (
        <GroupPermissionItem
          id={permission.aro.id}
          key={permission.aro.id}
          group={permission.aro}
          permissionType={permission.type}
          variesDetails={permission.variesDetails}
          updated={permission.updated}
          disabled={this.hasAllInputDisabled()}
          onUpdate={this.handlePermissionUpdate}
          onDelete={this.handlePermissionDelete}
          onToggleGroupMemberVisibility={this.handleToggleGroupMemberVisibility}
          shouldDisplayGroupMembers={this.state.expandedGroupIds.includes(permission.aro.id)}
          canDisplayGroupMembers={this.isControlledMode()}
        />
      );
    }

    return (
      <UserPermissionItem
        id={permission.aro.id}
        key={permission.aro.id}
        user={permission.aro}
        permissionType={permission.type}
        variesDetails={permission.variesDetails}
        updated={permission.updated}
        disabled={this.hasAllInputDisabled()}
        onUpdate={this.handlePermissionUpdate}
        onDelete={this.handlePermissionDelete}
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
    return this.props.context.siteSettings.canIUse("disableUser");
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
    // Computed once per render so ReactList's length and itemRenderer read the same list.
    this.displayedPermissions = this.state.loading ? [] : this.getDisplayedPermissions();
    return (
      <DialogWrapper
        className="share-dialog"
        title={this.getTitle()}
        subtitle={this.getSubtitle()}
        tooltip={this.getTooltip()}
        onClose={this.handleClose}
        disabled={this.hasAllInputDisabled()}
      >
        <form className="share-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className="scroll permission-edit">
              {this.state.loading && (
                <ul className="permissions">
                  <SharePermissionItemSkeleton />
                  <SharePermissionItemSkeleton />
                  <SharePermissionItemSkeleton />
                </ul>
              )}
              {!this.state.loading && (
                <ReactList
                  itemRenderer={this.renderItem}
                  itemsRenderer={this.renderContainer}
                  length={this.displayedPermissions.length}
                  minSize={this.props.listMinSize}
                  type={this.displayedPermissions.length < 4 ? "simple" : "uniform"}
                  ref={this.permissionListRef}
                  usePosition={true}
                  threshold={30}
                ></ReactList>
              )}
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
            {this.hasNoOwner() && (
              <div className="message error">
                <Trans>Please make sure there is at least one owner.</Trans>
              </div>
            )}
            {this.hasChanges() && !this.hasNoOwner() && (
              <div className="message warning">
                <Trans>Click save to apply your pending changes.</Trans>
              </div>
            )}
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
            <FormSubmitButton
              disabled={this.hasSubmitDisabled()}
              processing={this.state.processing}
              value={this.translate("Save")}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ShareDialog.defaultProps = {
  listMinSize: 4,
};

ShareDialog.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  listMinSize: PropTypes.number, // The minimum size to be renderered in the permission list
  initialPermissions: PropTypes.object, // Controlled mode: PermissionsCollection used to seed the dialog instead of fetching from the API
  initialGroups: PropTypes.object, // Controlled mode: GroupsCollection providing the groups referenced by initialPermissions
  initialUsers: PropTypes.object, // Controlled mode: UsersCollection providing the users referenced by initialPermissions
  onConfirm: PropTypes.func, // Controlled mode: callback invoked with the operator-confirmed permission changes instead of saving via the port
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withResourceWorkspace(withActionFeedback(withDialog(withTranslation("common")(ShareDialog)))),
);
