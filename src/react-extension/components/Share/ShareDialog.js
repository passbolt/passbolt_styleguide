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
import ShareDetailsList from "./ShareDetailsList";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../contexts/DialogContext";
import { withActionFeedback } from "../../contexts/ActionFeedbackContext";
import { withResourceWorkspace } from "../../contexts/ResourceWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import PermissionEntity from "../../../shared/models/entity/permission/permissionEntity";
import UserEntity from "../../../shared/models/entity/user/userEntity";
import GroupServiceWorkerService from "../../../shared/services/serviceWorker/group/groupServiceWorkerService";

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
   * Invoked immediately after component is inserted into the tree.
   *
   * The dialog seeds itself from those collections instead of fetching via the port.
   * Used by the HandlePermissionWorkflow flows to review a permission set before applying it.
   *
   * @return {void}
   */
  async componentDidMount() {
    if (this.props.acoType === PermissionEntity.ACO_FOLDER) {
      this.folders = this.buildControlledResources(this.props.initialFolders);
    } else {
      this.resources = this.buildControlledResources(this.props.initialResources);
    }

    this.shareChanges = new ShareChanges(this.resources, this.folders);
    const permissions = this.shareChanges.aggregatePermissionsByAro();

    const permissionsMap = new Map(permissions.map((p) => [p.aro.id, p]));
    this.props.initialChanges?.forEach((change) => {
      const permission = permissionsMap.get(change.aroForeignKey);
      if (permission) {
        this.shareChanges.markPermissionHasChanged(permission);
      }
    });

    this.setState({ loading: false, name: "", permissions: permissions }, () => {
      // scroll at the top of the permission list
      this.permissionListRef.current.scrollTo(0);
    });
  }

  /**
   * True when the dialog is displayed read-only: the operator can review the permission set and
   * confirm it as-is but cannot change it. Used by the edit workflow when the operator has update
   * but not owner permission on the resource. Only meaningful in controlled mode.
   * @returns {boolean}
   */
  isReadOnly() {
    return Boolean(this.props.readOnly);
  }

  /**
   * Build the resource DTOs the dialog renders in controlled mode so ShareChanges + ReactList work
   * without touching the server: one entry per resource provided in `initialResources`, each seeded
   * with its id, metadata, the operator's own permission, and its permission set. Create/edit pass a
   * single synthetic resource whose id is null (the resource does not exist yet); share passes the
   * real resources. The user/group lookup maps are built once and shared across resources.
   * @returns {Array<object>}
   */
  buildControlledResources(resourcesList) {
    const groupsById = {};
    this.props.initialGroups?.items.forEach((group) => {
      groupsById[group.id] = group.toDto();
    });
    const usersById = {};
    this.props.initialUsers?.items.forEach((user) => {
      usersById[user.id] = user.toDto(this.props.initialUsers.entityClass?.ALL_CONTAIN_OPTIONS);
    });

    return resourcesList.map((resource) => this.buildControlledResource(resource, groupsById, usersById));
  }

  /**
   * Build a single controlled-mode resource DTO, embedding the referenced user/group from the
   * provided lookup maps — falling back to the aro embedded in the permission itself, since
   * directly-permissioned users are not part of `initialUsers` — so ShareChanges can render and
   * track edits.
   * @param {{id: (string|null), metadata: object, permission: object, permissions: PermissionsCollection}} resource
   * @param {object} groupsById The referenced groups keyed by id.
   * @param {object} usersById The referenced users keyed by id.
   * @returns {object}
   */
  buildControlledResource(resource, groupsById, usersById) {
    const mappedPermissions = resource.permissions.items.map((permission) => {
      const dto = permission.toDto(PermissionEntity.ALL_CONTAIN_OPTIONS);
      dto.aco = this.props.acoType ?? PermissionEntity.ACO_RESOURCE;
      dto.aco_foreign_key = resource.id;
      if (dto.aro === PermissionEntity.ARO_USER) {
        dto.user = usersById[dto.aro_foreign_key] ?? dto.user;
      } else if (dto.aro === PermissionEntity.ARO_GROUP) {
        dto.group = groupsById[dto.aro_foreign_key] ?? dto.group;
      }
      return dto;
    });

    return {
      id: resource.id,
      metadata: { name: resource.metadata?.name ?? "" },
      permission: { type: resource.permission?.type ?? PermissionEntity.PERMISSION_OWNER },
      permissions: mappedPermissions,
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

      // members fetched on demand for groups added during the dialog session (not in initialGroups),
      // keyed by group id: { [groupId]: Array<userDto> }
      fetchedGroupMembers: {},

      // autocomplete
      autocompleteOpen: false,

      isFetchingGroupMembers: false,
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
    this.handlePermissionRevert = this.handlePermissionRevert.bind(this);
    this.handleToggleGroupMemberVisibility = this.handleToggleGroupMemberVisibility.bind(this);

    this.renderContainer = this.renderContainer.bind(this);
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

    if (this.state.isFetchingGroupMembers) {
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
    this.props.onClose();
    return;
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

    if (!aro.profile && !this.hasFetchedGroupMembers(aro.id)) {
      this.fetchGroupMembers(aro.id);
    }

    const permission = this.shareChanges.addAroPermissions(aro);
    const permissions = this.state.permissions;
    permissions.push(permission);
    this.setState({ permissions: permissions }, () => {
      // scroll at the bottom of the permission list
      this.permissionListRef.current.scrollTo(this.state.permissions.length - 1);
    });
  }

  /**
   * What happens when the user changes a permission for a group or user
   * e.g. update permission list in the state, the change status chip derives at render
   *
   * @param {string} aroId The aro to update the permissions for
   * @param {int} type like create, owner, etc.
   */
  handlePermissionUpdate(aroId, type) {
    this.shareChanges.updateAroPermissions(aroId, type);
    const newPermissions = this.state.permissions.map((permission) => {
      if (permission.aro.id === aroId) {
        permission.type = type;
      }
      return permission;
    });
    this.setState({ permissions: newPermissions });
  }

  /**
   * What happens when the user delete a user or group from permission list
   * e.g. delete permission from the shareChanges. A recipient granted its permissions during the
   * session disappears from the list, an original recipient stays displayed as pending deletion.
   * @param {string} aroId uuid
   */
  handlePermissionDelete(aroId) {
    this.shareChanges.deleteAroPermissions(aroId);
    if (this.shareChanges.getAroChangeStatus(aroId) !== ShareChanges.CHANGE_STATUS_REMOVED) {
      // The deletion staged no change, there is nothing to display as pending deletion.
      const newPermissions = this.state.permissions.filter((permission) => permission.aro.id !== aroId);
      this.setState({ permissions: newPermissions });
      return;
    }
    this.resetPermissionRowToOriginalType(aroId);
  }

  /**
   * What happens when the user reverts a permission pending deletion
   * e.g. clear the recipient's staged changes and restore its row to the original permission.
   * @param {string} aroId uuid
   */
  handlePermissionRevert(aroId) {
    this.shareChanges.revertAroPermissions(aroId);
    this.resetPermissionRowToOriginalType(aroId);
  }

  /**
   * Reset the permission row of an aro to its original permission type.
   * @param {string} aroId uuid
   */
  resetPermissionRowToOriginalType(aroId) {
    const newPermissions = this.state.permissions.map((permission) => {
      if (permission.aro.id === aroId) {
        permission.type = this.shareChanges.getOriginalAroPermissionType(aroId);
      }
      return permission;
    });
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
   * Fetch the member users of a group that was added during the dialog session and cache their DTOs
   * in the state, keyed by group id. The members are resolved from the service-worker local-storage
   * cache (falling back to the API). A failure leaves the group with no displayed members rather than
   * interrupting the dialog with an error popup.
   * @param {string} groupId The group identifier
   */
  fetchGroupMembers(groupId) {
    this.setState({ isFetchingGroupMembers: true }, async () => {
      try {
        const groupServiceWorkerService = new GroupServiceWorkerService(this.props.context.port);
        // The share fetch embeds the members (groups_users with their user), so a single call
        // resolves both the membership and the user display data.
        const groups = await groupServiceWorkerService.findByIdsForShare([groupId]);
        const group = groups.items.find((item) => item.id === groupId);
        const members = (group?.groupsUsers?.items ?? [])
          .filter((groupUser) => groupUser.user)
          .map((groupUser) => groupUser.user.toDto(UserEntity.ALL_CONTAIN_OPTIONS));
        this.setState({
          fetchedGroupMembers: { ...this.state.fetchedGroupMembers, [groupId]: members },
          isFetchingGroupMembers: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({ isFetchingGroupMembers: false });
      }
    });
  }

  /**
   * Returns true if the given group has already its members fetched
   * @param {string} groupId
   * @returns {boolean}
   */
  hasFetchedGroupMembers(groupId) {
    return Boolean(this.state.fetchedGroupMembers[groupId]);
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
    // Groups added during the dialog session have their members fetched on demand and cached.
    if (this.hasFetchedGroupMembers(groupId)) {
      return this.state.fetchedGroupMembers[groupId];
    }
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
      if (this.state.expandedGroupIds.includes(permission.aro.id)) {
        this.getGroupMembers(permission.aro.id).forEach((user) => {
          displayedPermissions.push({ kind: "group-user", user, groupId: permission.aro.id });
        });
      }
    });
    return displayedPermissions;
  }

  /**
   * Save the permissions. In controlled mode the dialog hands the deltas to `onConfirm` instead
   * of calling the server, so the workflow owns the create-then-share sequence.
   * @returns {Promise<void>}
   */
  async shareSave() {
    if (this.props.acoType === PermissionEntity.ACO_FOLDER) {
      await this.props.onConfirm(this.shareChanges.getFoldersChanges(), this.canOperatorRead());
      return;
    }

    const changes = this.shareChanges.getResourcesChanges();
    const effectivePermissions = this.getEffectivePermissions();
    const isPersonal = effectivePermissions.length === 1 && Boolean(effectivePermissions[0].aro.profile);
    await this.props.onConfirm(changes, this.canOperatorRead(), isPersonal);
  }

  /**
   * Get the permission rows that will still stand once the pending changes are applied.
   * The rows pending deletion stay displayed but must not weigh in the operator checks.
   * @returns {Array<object>}
   */
  getEffectivePermissions() {
    return (this.state.permissions ?? []).filter(
      (permission) => this.shareChanges.getAroChangeStatus(permission.aro.id) !== ShareChanges.CHANGE_STATUS_REMOVED,
    );
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
    return this.props.initialResources?.length && this.props.initialFolders?.length;
  }

  /**
   * Is this share screen handling sharing of multiple resources?
   * @returns {boolean}
   */
  isAboutResources() {
    return this.props.initialResources?.length > 1;
  }

  /**
   * Is this share screen handling sharing of multiple folders?
   * @returns {boolean}
   */
  isAboutFolders() {
    return this.props.initialFolders?.length > 1;
  }

  /**
   * Is this share screen handling sharing one folder?
   * @returns {boolean}
   */
  isAboutAFolder() {
    return this.props.initialFolders?.length === 1;
  }

  /**
   * Is this share screen handling sharing one resource?
   * @returns {boolean}
   */
  isAboutAResource() {
    return this.props.initialResources?.length === 1;
  }

  /**
   * Return a relevant title in case of single resource/folder or multiple item share, etc.
   * @returns {string}
   */
  getTitle() {
    if (this.state.loading) {
      return this.translate("Loading...");
    }
    if (this.props.isPermissionConfirmationMode) {
      return this.translate("Confirm permissions");
    }
    if (this.isAboutItems()) {
      return this.translate("Share {{count}} items", {
        count: this.props.initialResources.length + this.props.initialFolders.length,
      });
    }
    if (this.isAboutAResource()) {
      return this.translate("Share resource");
    }
    if (this.isAboutResources()) {
      return this.translate("Share {{count}} resources", {
        count: this.props.initialResources.length,
      });
    }
    if (this.isAboutAFolder()) {
      return this.translate("Share folder");
    }
    if (this.isAboutFolders()) {
      return this.translate("Share {{count}} folders", {
        count: this.props.initialFolders.length,
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
      return this.folders[0].metadata.name;
    }
  }

  /**
   * Return the dialog title tooltip content (multi-share details)
   * or null in case of single resource share
   * @returns {null|JSX.Element}
   */
  getTooltip() {
    if (!this.shareChanges) {
      return null;
    }
    const acos = this.shareChanges.getAcos();
    if (!acos || acos.length <= 1) {
      return null;
    }
    // `metadata.name` covers resources (and controlled-mode ACOs, which expose no top-level name);
    // folders fall back to `aco.name`. Empty names are dropped so the list never shows blank lines.
    // Sorted by name so that the truncation always drops the same items.
    const items = acos
      .map((aco) => aco.metadata?.name ?? aco.name)
      .filter(Boolean)
      .sort((name, otherName) => name.localeCompare(otherName))
      .map((name) => ({ name }));
    return items.length ? (
      <ShareDetailsList header={this.translate("{{count}} items selected:", { count: items.length })} items={items} />
    ) : null;
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
   * True if there is no owner, if the operator ownership requirement is not met or if all input
   * should be disabled. An unchanged permission list does not disable the submit button: the
   * operator must be able to confirm the inherited permissions as-is (empty deltas, the workflow
   * then skips the share call entirely).
   * @returns {boolean}
   */
  hasSubmitDisabled() {
    return this.hasNoOwner() || this.operatorOwnershipIsInvalid() || this.hasAllInputDisabled();
  }

  /**
   * Use to render a single item of the share permission list
   * @param {integer} index of the item in the source list
   * @param {Array<object>} displayedPermissions the flat list of rows being rendered
   * @returns {JSX.Element}
   */
  renderItem(index, displayedPermissions) {
    const item = displayedPermissions[index];

    if (item.kind === "group-user") {
      return (
        <GroupUserPermissionItem
          key={`${item.groupId}-${item.user.id}`}
          user={item.user}
          isRemoved={this.shareChanges.getAroChangeStatus(item.groupId) === ShareChanges.CHANGE_STATUS_REMOVED}
        />
      );
    }

    const permission = item.permission;
    const permissionType = parseInt(permission.type, 10);
    if (isNaN(permissionType)) {
      throw new TypeError(this.translate("Invalid permission type for share permission item."));
    }

    if (item.kind === "group") {
      return (
        <GroupPermissionItem
          id={permission.aro.id}
          key={permission.aro.id}
          group={permission.aro}
          membersCount={this.getGroupMembers(permission.aro.id).length}
          permissionType={permissionType}
          variesDetails={permission.variesDetails}
          changeStatus={this.shareChanges.getAroChangeStatus(permission.aro.id)}
          disabled={this.hasAllInputDisabled() || this.isReadOnly()}
          onUpdate={this.handlePermissionUpdate}
          onDelete={this.handlePermissionDelete}
          onRevert={this.handlePermissionRevert}
          onToggleGroupMemberVisibility={this.handleToggleGroupMemberVisibility}
          shouldDisplayGroupMembers={this.state.expandedGroupIds.includes(permission.aro.id)}
          isReadOnly={this.props.readOnly}
        />
      );
    }

    return (
      <UserPermissionItem
        id={permission.aro.id}
        key={permission.aro.id}
        user={permission.aro}
        permissionType={permissionType}
        variesDetails={permission.variesDetails}
        changeStatus={this.shareChanges.getAroChangeStatus(permission.aro.id)}
        disabled={this.hasAllInputDisabled() || this.isReadOnly()}
        onUpdate={this.handlePermissionUpdate}
        onDelete={this.handlePermissionDelete}
        onRevert={this.handlePermissionRevert}
        isReadOnly={this.props.readOnly}
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
   * Returns true if the operator ownership requirement is not met.
   * If the props asks to ensure that the current operator must have ownership on the resource
   * then a verification is ensured that the operator has ownership through a direct permission
   * or from at least a group permissions.
   * If the requirement is not enforce by the props this method considers the requirement has met
   * and returns false has there is no error.
   * @returns {boolean}
   */
  operatorOwnershipIsInvalid() {
    if (!this.props.ensureOperatorIsOwner) {
      return false;
    }

    const permissions = this.getEffectivePermissions();
    if (!permissions.length) {
      return true;
    }

    const operatorId = this.props.context.loggedInUser?.id;
    const operatorOwnerPermission = permissions.find((p) => {
      // no need to check non owner permission
      if (p.type !== PermissionEntity.PERMISSION_OWNER) {
        return false;
      }

      //we are dealing with a direct user permission here
      if (p.aro.profile) {
        if (operatorId === p.aro.id) {
          // the current oeprator has a direct OWNER permission in the list
          return true;
        }
        // we ignore direct user permission that are not the operator user
        return false;
      }

      const groupMembers = this.getGroupMembers(p.aro.id);
      const operatorGroupMember = groupMembers.find((gm) => gm.id === operatorId);
      return Boolean(operatorGroupMember);
    });
    return !operatorOwnerPermission;
  }

  /**
   * Returns true if the operator has permission to at least read the resource
   * @returns {boolean}
   */
  canOperatorRead() {
    const permissions = this.getEffectivePermissions();
    if (!permissions.length) {
      return false;
    }

    const operatorId = this.props.context.loggedInUser?.id;
    const operatorPermission = permissions.find((p) => {
      //we are dealing with a direct user permission here
      if (p.aro.profile) {
        if (operatorId === p.aro.id) {
          // the current oeprator has a permission in the list
          return true;
        }
        // we ignore direct user permission that are not the operator user
        return false;
      }

      const groupMembers = this.getGroupMembers(p.aro.id);
      const operatorGroupMember = groupMembers.find((gm) => gm.id === operatorId);
      return Boolean(operatorGroupMember);
    });
    return Boolean(operatorPermission);
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
    const displayedPermissions = this.state.loading ? [] : this.getDisplayedPermissions();
    const isReadOnly = this.isReadOnly();
    const operatorOwnershipIsInvalid = !isReadOnly && this.operatorOwnershipIsInvalid();
    const hasNoOwner = !isReadOnly && this.hasNoOwner();
    return (
      <DialogWrapper
        className={`share-dialog${isReadOnly ? " read-only" : ""}`}
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
                  itemRenderer={(index) => this.renderItem(index, displayedPermissions)}
                  itemsRenderer={this.renderContainer}
                  length={displayedPermissions.length}
                  minSize={this.props.listMinSize}
                  type={displayedPermissions.length < 4 ? "simple" : "uniform"}
                  ref={this.permissionListRef}
                  usePosition={true}
                  threshold={30}
                ></ReactList>
              )}
            </div>
            {!this.isReadOnly() && (
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
            )}
            {!isReadOnly && (
              <>
                {operatorOwnershipIsInvalid && (
                  <div className="message error">
                    <Trans>Please make sure you are still owner.</Trans>
                  </div>
                )}
                {!operatorOwnershipIsInvalid && hasNoOwner && (
                  <div className="message error">
                    <Trans>Please make sure there is at least one owner.</Trans>
                  </div>
                )}
                {this.hasChanges() && !hasNoOwner && !operatorOwnershipIsInvalid && (
                  <div className="message warning">
                    <Trans>Click save to apply your pending changes.</Trans>
                  </div>
                )}
              </>
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
  isPermissionConfirmationMode: true,
  initialChanges: [],
  ensureOperatorIsOwner: false,
  initialResources: [],
  initialFolders: [],
};

ShareDialog.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  listMinSize: PropTypes.number, // The minimum size to be renderered in the permission list
  isPermissionConfirmationMode: PropTypes.bool, // Is the dialog used to confirm permissions
  initialResources: PropTypes.array, // the ACO resources to seed the dialog with instead of fetching from the API, each as { id, metadata, permission, permissions: PermissionsCollection }
  initialFolders: PropTypes.array, // the ACO folders to see the dialog with
  initialChanges: PropTypes.array, // Set of permission to mark them as "added" in the initial list
  acoType: PropTypes.string, // the ACO type of the seeded entries (PermissionEntity.ACO_RESOURCE, default, or ACO_FOLDER)
  initialGroups: PropTypes.object, // GroupsCollection providing the groups referenced by the resources' permissions
  initialUsers: PropTypes.object, // UsersCollection providing the users referenced by the resources' permissions
  onConfirm: PropTypes.func, // callback invoked with the operator-confirmed permission changes instead of saving via the port
  readOnly: PropTypes.bool, // display the permission set read-only (review/confirm only, no edits)
  ensureOperatorIsOwner: PropTypes.bool, // Ensure the operator remains owner of the edited resource
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withResourceWorkspace(withActionFeedback(withDialog(withTranslation("common")(ShareDialog)))),
);
