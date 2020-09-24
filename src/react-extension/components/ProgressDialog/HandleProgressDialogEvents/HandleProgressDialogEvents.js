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
import ProgressDialog from "../ProgressDialog/ProgressDialog";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/Common/DialogContext";

/**
 * This component listens any event related to progress dialog actions to perform
 */
class HandleProgressDialogEvents extends React.Component {

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
        this.context.port.on('passbolt.progress.open-progress-dialog', this.handleProgressDialogOpenEvent);
        this.context.port.on("passbolt.progress.update", this.handleProgressDialogUpdateEvent);
        this.context.port.on("passbolt.progress.update-goals", this.handleProgressDialogUpdateGoalsEvent);
        this.context.port.on('passbolt.progress.close-progress-dialog', this.handleProgressDialogCloseEvent);
    }


    /**
     * Handle the dialog opening
     * @param title Dialog title
     * @param goals Dialog goals
     * @param message Dialog message
     */
    handleProgressDialogOpenEvent(title, goals, message) {
        const progressDialogProps = {title, goals, message};
        this.context.setContext({progressDialogProps});
        const dialogIndex = this.dialogContext.open(ProgressDialog);
        this.setState({dialogIndex});
    }


    /**
     * Handle the dialog update
     * @param message The message to display
     * @param completed The progress completion
     */
    handleProgressDialogUpdateEvent(message, completed) {
        const progressDialogProps = Object.assign(
            {},
            this.context.progressDialogProps,
            {
                message: message || this.context.progressDialogProps.message,
                completed
            });
        this.context.setContext({progressDialogProps});
    }


    /**
     *  Handle the dialog goals update
     * @param goals The progress goals
     */
    handleProgressDialogUpdateGoalsEvent(goals) {
        const progressDialogProps = Object.assign(
            {},
            this.context.progressDialogProps,
            {goals});
        this.context.setContext({progressDialogProps});
    }


    /**
     * Handle the dialog close
     */
    handleProgressDialogCloseEvent() {
        this.dialogContext.close(this.state.dialogIndex);
        this.context.setContext({progressDialogProps: {}});
    }

    /**
     * Renders the component
     * @returns {JSX.Element}
     */
    render() {
        return <></>
    }

}

HandleProgressDialogEvents.contextType = AppContext;

export default withDialog(HandleProgressDialogEvents);
