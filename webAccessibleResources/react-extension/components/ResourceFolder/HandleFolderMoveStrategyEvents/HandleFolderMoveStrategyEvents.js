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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import DefineResourceFolderMoveStrategy from "../DefineResourceFolderMoveStrategy/DefineResourceFolderMoveStrategy";
import PropTypes from "prop-types";

/**
 * This component listens any event related to folder move strategy dialog actions to perform
 */
class HandleFolderMoveStrategyEvents extends React.Component {
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
    this.props.context.port.on('passbolt.folders.move-strategy.request', this.handleFolderMoveStrategyRequestEvent);
  }

  /**
   * Handle the dialog request event
   * @param requestId
   */
  handleFolderMoveStrategyRequestEvent(requestId, folderParentId, folders, resources) {
    const folderMoveStrategyProps = {requestId, folderParentId, folders, resources};
    this.props.context.setContext({folderMoveStrategyProps});
    this.props.dialogContext.open(DefineResourceFolderMoveStrategy);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleFolderMoveStrategyEvents.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.any, // the dialog context
};

export default withAppContext(withDialog(HandleFolderMoveStrategyEvents));
