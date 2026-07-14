/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import PermissionSnapshotService from "../../../../../shared/services/permission/permissionSnapshotService";
import PermissionChangesService from "../../../../../shared/services/permission/permissionChangesService";
import PermissionServiceWorkerService from "../../../../../shared/services/serviceWorker/permission/permissionServiceWorkerService";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import GroupEntity from "../../../../../shared/models/entity/group/groupEntity";
import GroupsCollection from "../../../../../shared/models/entity/group/groupsCollection";
import UsersCollection from "../../../../../shared/models/entity/user/usersCollection";

/**
 * Status keys shared across every flow that extends AbstractPermissionFlow.
 * @type {Readonly<{INITIALIZING: string, ERROR: string}>}
 */
export const PERMISSION_FLOW_STATUS = Object.freeze({
  INITIALIZING: "initializing",
  ERROR: "error",
});

/**
 * Shared base for the per-operation flow components nested under HandlePermissionWorkflow.
 *
 * Hosts the concerns every permission-touching flow needs:
 * - the PermissionSnapshotService instance,
 * - the shared sharedness predicate,
 * - the standard error path (silence UserAbortsOperationError, otherwise NotifyError + terminate),
 * - the termination signal forwarded to the workflow registry,
 * - the standard success path (toast + navigation + terminate).
 *
 * Sub-classes own their own state machine, props, dialog handlers, and API ordering.
 */
export class AbstractPermissionFlow extends React.Component {
  /**
   * Default constructor.
   * Instantiates the snapshot service against the app context port and binds shared callbacks.
   */
  constructor(props) {
    super(props);
    this.permissionSnapshotService = new PermissionSnapshotService(props.context.port);
    this.permissionChangesService = new PermissionChangesService(props.context.port);
    this.permissionServiceWorkerService = new PermissionServiceWorkerService(props.context.port);
    this.handleError = this.handleError.bind(this);
    this.terminate = this.terminate.bind(this);
    this.finalizeSuccess = this.finalizeSuccess.bind(this);
  }

  /**
   * Apply the spec definition of a "shared" parent / ACO to a permission snapshot:
   * - more than one permission, OR
   * - any group permission, OR
   * - a sole permission that is not the operator's direct ownership.
   *
   * Returns false when no snapshot is available (e.g. root creation: nothing was fetched).
   * @param {PermissionSnapshotEntity|null} snapshot
   * @returns {boolean}
   */
  isShared(snapshot) {
    if (!snapshot) {
      return false;
    }
    const permissions = snapshot.permissions;
    if (permissions.length > 1) {
      return true;
    }
    if (permissions.items.some((permission) => permission.aro === PermissionEntity.ARO_GROUP)) {
      return true;
    }
    const sole = permissions.items[0];
    if (!sole) {
      return false;
    }
    const operatorId = this.props.context.loggedInUser?.id;
    return !(sole.aroForeignKey === operatorId && sole.isOwner());
  }

  /**
   * Pair each ACO with the permission set captured in its snapshot, producing the controlled-mode
   * resource shape ShareDialog seeds from without a server round-trip. The ACO list and the
   * snapshot list are index-aligned.
   * @param {Array<object>} acos The ACOs being shared/reviewed (each carries id, metadata and the operator's own permission).
   * @param {Array<PermissionSnapshotEntity>} snapshots The snapshot per ACO, in the same order.
   * @returns {Array<object>}
   */
  buildControlledResources(acos, snapshots) {
    return acos.map((aco, index) => ({
      id: aco.id,
      metadata: aco.metadata,
      permission: aco.permission,
      permissions: snapshots[index].permissions,
    }));
  }

  /**
   * Merge the groups and users referenced across the given permission snapshots into de-duplicated
   * collections, so a controlled-mode ShareDialog can render their rows and drill down to members.
   * @param {Array<PermissionSnapshotEntity>} snapshots
   * @returns {{groups: GroupsCollection, users: UsersCollection}}
   */
  mergeArosFromSnapshots(snapshots) {
    const groupsById = new Map();
    const usersById = new Map();
    snapshots.forEach((snapshot) => {
      snapshot.groups.items.forEach((group) => groupsById.set(group.id, group.toDto(GroupEntity.ALL_CONTAIN_OPTIONS)));
      snapshot.users.items.forEach((user) =>
        usersById.set(user.id, user.toDto(snapshot.users.entityClass?.ALL_CONTAIN_OPTIONS)),
      );
    });
    return {
      groups: new GroupsCollection([...groupsById.values()]),
      users: new UsersCollection([...usersById.values()]),
    };
  }

  /**
   * Handle an unexpected error mid-flow.
   * UserAbortsOperationError is silenced (typical when the operator aborts the passphrase prompt
   * or a similar nested cancellation); anything else opens a NotifyError dialog and terminates
   * the flow.
   * @param {Error} error
   */
  handleError(error) {
    if (error?.name === "UserAbortsOperationError") {
      return;
    }
    this.setState({ status: PERMISSION_FLOW_STATUS.ERROR });
    this.props.dialogContext.open(NotifyError, { error });
    this.terminate();
  }

  /**
   * Terminate the flow by signalling the workflow registry to deregister it.
   */
  terminate() {
    this.props.onStop?.();
  }

  /**
   * Notify success, navigate to the given URL, and terminate the flow.
   * @param {string} message The localized success message to toast.
   * @param {string} navigationUrl The router path to push to.
   * @returns {Promise<void>}
   */
  async finalizeSuccess(message, navigationUrl) {
    await this.props.actionFeedbackContext.displaySuccess(message);
    this.props.history.push(navigationUrl);
    this.terminate();
  }

  /**
   * Renders the component. Flow components have no UI of their own — they dispatch dialogs via
   * the dialog context. Sub-classes can override this if they need to render something inline.
   * @returns {null}
   */
  render() {
    return null;
  }
}

AbstractPermissionFlow.propTypes = {
  context: PropTypes.object, // the app context
  dialogContext: PropTypes.any, // the dialog context
  actionFeedbackContext: PropTypes.object, // the action feedback context
  history: PropTypes.object, // the router history (from withRouter on the subclass)
  onStop: PropTypes.func, // callback injected by the workflow registry to deregister the flow
  t: PropTypes.func, // the translation function
};
