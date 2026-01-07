/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import DisplayProgress from "../components/Common/Progress/DisplayProgress/DisplayProgress";
import { withDialog } from "./DialogContext";

/**
 * The progress context
 */
export const ProgressContext = React.createContext({
  progressDialogProps: null, // The progress meta
  dialogIndex: null, // The dialog index
  open: () => {}, // Open the dialog
  updateMessage: () => {}, // Update the dialog message
  updateGoals: () => {}, // Update the dialog goals
  close: () => {}, // Close the dialog
});

/**
 * The related context provider
 */
export class ProgressContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      progressDialogProps: null,
      dialogIndex: null,
      open: this.open,
      updateMessage: this.updateMessage,
      updateGoals: this.updateGoals,
      close: this.close,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.open = this.open.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * Open the progress dialog
   * @param {string} title The title
   * @param {integer} goals The goals
   * @param {string} message The message
   */
  open(title, goals, message) {
    const progressDialogProps = { title, goals, message };
    this.setState({ progressDialogProps });
    const dialogIndex = this.props.dialogContext.open(DisplayProgress);
    this.setState({ dialogIndex });
  }

  /**
   * Update the progress dialog message.
   * @param {string} message The message
   * @param {boolean} completed The progress is completed.
   */
  updateMessage(message, completed = false) {
    const progressDialogProps = {
      ...this.state.progressDialogProps,
      message: message || this.state.progressDialogProps.message,
      completed,
    };
    this.setState({ progressDialogProps });
  }

  /**
   * Upate the progress dialog goals.
   * @param {integer} goals the goals
   */
  async updateGoals(goals) {
    const progressDialogProps = {
      ...this.state.progressDialogProps,
      goals: goals,
    };
    this.setState({ progressDialogProps });
  }

  /**
   * Close the progress dialog.
   */
  async close() {
    this.props.dialogContext.close(this.state.dialogIndex);
    const progressDialogProps = {};
    const dialogIndex = null;
    this.setState({ progressDialogProps, dialogIndex });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <ProgressContext.Provider value={this.state}>{this.props.children}</ProgressContext.Provider>;
  }
}
ProgressContextProvider.displayName = "ProgressContextProvider";
ProgressContextProvider.propTypes = {
  children: PropTypes.any,
  dialogContext: PropTypes.object, // The dialog context.
};

export default withDialog(ProgressContextProvider);

/**
 * Progress Context Consumer HOC
 * @param WrappedComponent
 */
export function withProgress(WrappedComponent) {
  return class WithProgress extends React.Component {
    render() {
      return (
        <ProgressContext.Consumer>
          {(progressContext) => <WrappedComponent progressContext={progressContext} {...this.props} />}
        </ProgressContext.Consumer>
      );
    }
  };
}
