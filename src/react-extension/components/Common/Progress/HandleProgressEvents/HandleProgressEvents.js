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

import React from "react";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import { withProgress } from "../../../../contexts/ProgressContext";

/**
 * This component listens any event related to progress dialog actions to perform
 */
class HandleProgressEvents extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      dialogIndex: null, // The index of the opened dialog
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleProgressDialogOpenEvent = this.handleProgressDialogOpenEvent.bind(this);
    this.handleProgressDialogUpdateEvent = this.handleProgressDialogUpdateEvent.bind(this);
    this.handleProgressDialogUpdateGoalsEvent = this.handleProgressDialogUpdateGoalsEvent.bind(this);
    this.handleProgressDialogCloseEvent = this.handleProgressDialogCloseEvent.bind(this);
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
    this.props.context.port.on("passbolt.progress.open-progress-dialog", this.handleProgressDialogOpenEvent);
    this.props.context.port.on("passbolt.progress.update", this.handleProgressDialogUpdateEvent);
    this.props.context.port.on("passbolt.progress.update-goals", this.handleProgressDialogUpdateGoalsEvent);
    this.props.context.port.on("passbolt.progress.close-progress-dialog", this.handleProgressDialogCloseEvent);
  }

  /**
   * Handle the dialog opening
   * @param {string} title Dialog title
   * @param {integer} goals Dialog goals
   * @param {string} message Dialog message
   */
  handleProgressDialogOpenEvent(title, goals, message) {
    this.props.progressContext.open(title, goals, message);
  }

  /**
   * Handle the dialog update
   * @param {string} message The message to display
   * @param {boolean} completed The progress completion
   */
  handleProgressDialogUpdateEvent(message, completed) {
    this.props.progressContext.updateMessage(message, completed);
  }

  /**
   *  Handle the dialog goals update
   * @param {integer} goals The progress goals
   */
  handleProgressDialogUpdateGoalsEvent(goals) {
    this.props.progressContext.updateGoals(goals);
  }

  /**
   * Handle the dialog close
   */
  handleProgressDialogCloseEvent() {
    this.props.progressContext.close();
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleProgressEvents.propTypes = {
  context: PropTypes.any, // The application context
  progressContext: PropTypes.any, // the dialog context
};

export default withAppContext(withProgress(HandleProgressEvents));
