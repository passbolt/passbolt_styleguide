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
import {withDialog} from "../../../../contexts/DialogContext";
import NotifyError from "../NotifyError/NotifyError";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../contexts/AppContext";

/**
 * This component listens any event related to error dialog actions to perform
 */
class HandleErrorEvents extends React.Component {
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
    this.props.context.port.on('passbolt.errors.open-error-dialog', this.handleErrorDialogOpenEvent);
  }

  /**
   * Handle the dialog oepn event
   * @param title The error title
   * @param message The error message
   */
  handleErrorDialogOpenEvent(title, message) {
    const errorDialogProps = {title: title, error: new Error(message)};
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleErrorEvents.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.any
};

export default withAppContext(withDialog(HandleErrorEvents));
