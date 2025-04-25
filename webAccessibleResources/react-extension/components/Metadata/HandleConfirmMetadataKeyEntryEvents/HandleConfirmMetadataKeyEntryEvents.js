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
 * @since         5.1.0
 */

import React from 'react';
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import PropTypes from "prop-types";
import ConfirmMetadataKey from "../ConfirmMetadataKey/ConfirmMetadataKey";

/**
 * This component listens any event related to confirm metadata entry dialog actions to perform
 */
class HandleConfirmMetadataKeyEntryEvents extends React.Component {
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
    this.handleConfirmMetadataEntryRequestEvent = this.handleConfirmMetadataEntryRequestEvent.bind(this);
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
    this.props.context.port.on("passbolt.metadata-key.trust-confirm", this.handleConfirmMetadataEntryRequestEvent);
  }

  /**
   * Handle the dialog request event
   * @param {string} requestId
   * @param {object} confirmMetadataKey
   */
  async handleConfirmMetadataEntryRequestEvent(requestId, confirmMetadataKey) {
    this.props.dialogContext.open(ConfirmMetadataKey, {requestId: requestId, confirmMetadataKey: confirmMetadataKey});
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleConfirmMetadataKeyEntryEvents.propTypes = {
  context: PropTypes.object, // The application context
  dialogContext: PropTypes.any, // the dialog context
};

export default withAppContext(withDialog(HandleConfirmMetadataKeyEntryEvents));
