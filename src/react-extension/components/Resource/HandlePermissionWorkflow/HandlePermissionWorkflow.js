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
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import PermissionSnapshotService from "../../../../shared/services/permission/permissionSnapshotService";

/**
 * Status values driving the permission workflow state machine.
 * @type {Readonly<{INITIALIZING: string, READY: string, ERROR: string}>}
 */
export const HANDLE_PERMISSION_WORKFLOW_STATUS = Object.freeze({
  INITIALIZING: "initializing",
  READY: "ready",
  ERROR: "error",
});

/**
 * Orchestrates the resource creation / edition dialogs and the permission-confirmation dialog. This
 * iteration only implements the initial state: capturing an immutable permission snapshot for the
 * resource-creation flow. Subsequent tickets will extend the state machine to dispatch the actual
 * dialogs.
 */
export class HandlePermissionWorkflow extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.permissionSnapshotService = new PermissionSnapshotService(props.context.port);
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      status: HANDLE_PERMISSION_WORKFLOW_STATUS.INITIALIZING,
      snapshot: null,
    };
  }

  /**
   * Component did mount
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await this.buildInitialSnapshot();
  }

  /**
   * Build the initial permission snapshot shown to the operator before a resource is created.
   * Stores it in state and transitions to READY on success; transitions to ERROR and opens a
   * NotifyError dialog on failure (except for UserAbortsOperationError which is silenced).
   * A second snapshot taken at submission time (drift detection) will land in a follow-up ticket.
   * @returns {Promise<void>}
   */
  async buildInitialSnapshot() {
    try {
      const snapshot = await this.permissionSnapshotService.buildSnapshotForResourceCreation(this.props.folderParentId);
      this.setState({ status: HANDLE_PERMISSION_WORKFLOW_STATUS.READY, snapshot });
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Handle an unexpected error encountered while running the workflow.
   * @param {Error} error The error to handle.
   * @returns {void}
   */
  handleError(error) {
    if (error?.name === "UserAbortsOperationError") {
      return;
    }
    this.setState({ status: HANDLE_PERMISSION_WORKFLOW_STATUS.ERROR });
    this.props.dialogContext.open(NotifyError, { error });
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandlePermissionWorkflow.propTypes = {
  context: PropTypes.object, // the app context
  dialogContext: PropTypes.any, // the dialog context
  folderParentId: PropTypes.string.isRequired, // the id of the parent folder whose permissions form the snapshot
};

export default withAppContext(withDialog(HandlePermissionWorkflow));
