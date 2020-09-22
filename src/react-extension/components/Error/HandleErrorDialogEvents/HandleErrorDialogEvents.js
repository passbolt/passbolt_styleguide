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
import {withDialog} from "../../../contexts/DialogContext";
import ErrorDialog from "../../Common/Dialog/ErrorDialog/ErrorDialog";
import PropTypes from "prop-types";

/**
 * This component listens any event related to error dialog actions to perform
 */
class HandleErrorDialogEvents extends React.Component {

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
        this.context.port.on('passbolt.errors.open-error-dialog', this.handleErrorDialogOpenEvent);
    }

    /**
     * Handle the dialog oepn event
     * @param title The error title
     * @param message The error message
     */
    handleErrorDialogOpenEvent(title, message) {
        const errorDialogProps = {title: title, message: message};
        this.context.setContext({errorDialogProps});
        this.dialogContext.open(ContextualizedErrorDialog);
    }

    /**
     * Renders the component
     * @returns {JSX.Element}
     */
    render() {
        return <></>
    }


}

HandleErrorDialogEvents.contextType = AppContext;

export default withDialog(HandleErrorDialogEvents);


/**
 * A contextualized version of the Error Dialog
 */
class ContextualizedErrorDialog extends React.Component {

    /**
     * Default constructor
     * @param props Component props
     */
    constructor(props) {
        super(props);
        this.bindEventHandlers();
    }

    /**
     * Bind the component methods as event handlers
     */
    bindEventHandlers() {
        this.handleClose = this.handleClose.bind(this);
    }

    /**
     * Close the dialog
     */
    handleClose() {
        this.context.setContext({errorDialogProps: {}})
        this.props.onClose();
    }
    render() {
        return (
            <>
                <ErrorDialog
                    onClose={this.handleClose}
                    {...this.context.errorDialogProps} />
            </>
        )
    }
}

ContextualizedErrorDialog.contextType = AppContext;

ContextualizedErrorDialog.propTypes = {
    onClose: PropTypes.func
}
