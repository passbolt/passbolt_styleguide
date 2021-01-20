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
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";

/**
 * This component listens any event related to error dialog actions to perform
 */
class HandleErrorDialogEvents extends React.Component {
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
    this.context.port.on('passbolt.errors.open-error-dialog', this.handleErrorDialogOpenEvent);
  }

  /**
   * Handle the dialog oepn event
   * @param title The error title
   * @param message The error message
   */
  handleErrorDialogOpenEvent(title, message) {
    const errorDialogProps = {title: title, message: message};
    this.props.dialogContext.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleErrorDialogEvents.contextType = AppContext;

HandleErrorDialogEvents.propTypes = {
  dialogContext: PropTypes.any
};

export default withDialog(HandleErrorDialogEvents);
