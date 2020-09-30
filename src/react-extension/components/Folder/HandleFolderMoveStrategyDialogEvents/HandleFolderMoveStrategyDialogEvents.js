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
 * @since         2.12.0
 */

import React from 'react';
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/Common/DialogContext";
import FolderMoveStrategyDialog from "../FolderMoveStrategyDialog/FolderMoveStrategyDialog";
import PropTypes from "prop-types";

/**
 * This component listens any event related to folder move strategy dialog actions to perform
 */
class HandleFolderMoveStrategyDialogEvents extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFolderMoveStrategyRequestEvent = this.handleFolderMoveStrategyRequestEvent.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.listen();
  }

  /**
   * Listen the progress dialog event from the context and acts accordingly
   */
  listen() {
    this.context.port.on('passbolt.folders.move-strategy.request', this.handleFolderMoveStrategyRequestEvent);
  }

  /**
   * Handle the dialog request event
   * @param requestId
   */
  handleFolderMoveStrategyRequestEvent(requestId, folderParentId, folders, resources) {
    const folderMoveStrategyProps = {requestId, folderParentId, folders, resources};
    this.context.setContext({folderMoveStrategyProps});
    this.props.dialogContext.open(FolderMoveStrategyDialog);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleFolderMoveStrategyDialogEvents.contextType = AppContext;

HandleFolderMoveStrategyDialogEvents.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
};

export default withDialog(HandleFolderMoveStrategyDialogEvents);
