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
import PassphraseEntryDialog from "../PassphraseEntryDialog/PassphraseEntryDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";

/**
 * This component listens any event related to passphrase entry dialog actions to perform
 */
class HandlePassphraseEntryDialogEvents extends React.Component {

    /**
     * Default constructor
     */
    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    /**
     * Returns the default component state
     */
    get defaultState() {
        return {
            dialogIndex: null // The index of the opened dialog
        }
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
        this.context.port.on('passbolt.passphrase.request', this.handlePassphraseEntryRequestEvent);
    }

    /**
     * Handle the dialog request event
     * @param requestId
     */
    handlePassphraseEntryRequestEvent(requestId) {
        this.context.setContext({passphraseRequestId: requestId});
        this.dialogContext.open(PassphraseEntryDialog);
    }

    /**
     * Renders the component
     * @returns {JSX.Element}
     */
    render() {
        return <></>
    }


}

HandlePassphraseEntryDialogEvents.contextType = AppContext;

export default withDialog(HandlePassphraseEntryDialogEvents);

