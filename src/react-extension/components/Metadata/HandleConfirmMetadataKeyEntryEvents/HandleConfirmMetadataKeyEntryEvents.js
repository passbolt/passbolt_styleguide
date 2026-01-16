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

import React from "react";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../contexts/DialogContext";
import PropTypes from "prop-types";
import ConfirmMetadataKey from "../ConfirmMetadataKey/ConfirmMetadataKey";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import MetadataKeyEntity from "../../../../shared/models/entity/metadata/metadataKeyEntity";
import MetadataTrustedKeyEntity from "../../../../shared/models/entity/metadata/metadataTrustedKeyEntity";

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
   * @param {object} data The confirmation data
   * @param {object} data.metadata_key The metadata key to request the trust for
   * @param {object} data.metadata_trusted_key The trusted metadata key stored information
   */
  async handleConfirmMetadataEntryRequestEvent(requestId, data) {
    try {
      // Set validation to false as data is required for the entity used by the service worker but should not be sent to the content code.
      const metadataKey = new MetadataKeyEntity(data.metadata_key, { validate: false });
      const metadataTrustedKey = new MetadataTrustedKeyEntity(data.metadata_trusted_key);
      this.props.dialogContext.open(ConfirmMetadataKey, { requestId, metadataKey, metadataTrustedKey });
    } catch (error) {
      console.log(error);
      this.props.dialogContext.open(NotifyError, { error });
    }
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
