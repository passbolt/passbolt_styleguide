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
import InputPassphrase from "../InputPassphrase/InputPassphrase";
import {withDialog} from "../../../contexts/DialogContext";
import PropTypes from "prop-types";

/**
 * This component listens any event related to passphrase entry dialog actions to perform
 */
class HandlePassphraseEntryEvents extends React.Component {
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
    this.handlePassphraseEntryRequestEvent = this.handlePassphraseEntryRequestEvent.bind(this);
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
    this.props.context.port.on("passbolt.passphrase.request", this.handlePassphraseEntryRequestEvent);
  }

  /**
   * Handle the dialog request event
   * @param requestId
   */
  async handlePassphraseEntryRequestEvent(requestId) {
    await this.props.context.setContext({passphraseRequestId: requestId});
    this.props.dialogContext.open(InputPassphrase);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandlePassphraseEntryEvents.propTypes = {
  context: PropTypes.object, // The application context
  dialogContext: PropTypes.any, // the dialog context
};

export default withAppContext(withDialog(HandlePassphraseEntryEvents));
