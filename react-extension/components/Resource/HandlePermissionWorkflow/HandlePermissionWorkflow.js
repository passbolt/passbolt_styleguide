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
import ResourceCreationFlow from "./flows/ResourceCreationFlow";
import ResourceEditFlow from "./flows/ResourceEditFlow";
import ResourceShareFlow from "./flows/ResourceShareFlow";
import FolderShareFlow from "./flows/FolderShareFlow";

/**
 * The set of permission-touching operations this workflow can drive.
 * Each value corresponds to a focused flow component under `flows/`.
 *
 * @todo `CREATE_RESOURCE`, `EDIT_RESOURCE`, `SHARE_RESOURCE` and `SHARE_FOLDER` are wired today.
 *       `MOVE_RESOURCES` lands with its respective ticket — passing that key to the dispatcher will
 *       throw until the matching flow component exists.
 * @type {Readonly<{CREATE_RESOURCE: string, EDIT_RESOURCE: string, MOVE_RESOURCES: string, SHARE_RESOURCE: string, SHARE_FOLDER: string}>}
 */
export const PERMISSION_WORKFLOW_OPERATION = Object.freeze({
  CREATE_RESOURCE: "create-resource",
  EDIT_RESOURCE: "edit-resource",
  MOVE_RESOURCES: "move-resources",
  SHARE_RESOURCE: "share-resource",
  SHARE_FOLDER: "share-folder",
});

/**
 * Single entry point for every permission-touching operation. Callers reach this component via
 * `workflowContext.start(HandlePermissionWorkflow, { operation, ...flowProps })`; we pick the
 * matching per-operation flow component and render it. Each flow owns its own state machine,
 * dialog sequence, and API ordering.
 *
 * `CREATE_RESOURCE`, `EDIT_RESOURCE`, `SHARE_RESOURCE` and `SHARE_FOLDER` are wired today.
 * `MOVE_RESOURCES` lands with its respective ticket and slots in as an additional case here without
 * bloating this file.
 */
export class HandlePermissionWorkflow extends React.Component {
  /**
   * Picks the per-operation flow component for the requested operation and renders it.
   * @returns {JSX.Element}
   */
  render() {
    switch (this.props.operation) {
      case PERMISSION_WORKFLOW_OPERATION.CREATE_RESOURCE:
        return <ResourceCreationFlow {...this.props} />;
      case PERMISSION_WORKFLOW_OPERATION.EDIT_RESOURCE:
        return <ResourceEditFlow {...this.props} />;
      case PERMISSION_WORKFLOW_OPERATION.SHARE_RESOURCE:
        return <ResourceShareFlow {...this.props} />;
      case PERMISSION_WORKFLOW_OPERATION.SHARE_FOLDER:
        return <FolderShareFlow {...this.props} />;
      default:
        throw new Error(`HandlePermissionWorkflow: unsupported operation "${this.props.operation}".`);
    }
  }
}

HandlePermissionWorkflow.propTypes = {
  operation: PropTypes.oneOf(Object.values(PERMISSION_WORKFLOW_OPERATION)).isRequired,
};

export default HandlePermissionWorkflow;
