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
 * @since         2.13.0
 */

import * as React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

/**
 * Context used to provide action feedbacks to display
 */
export const ActionFeedbackContext = React.createContext({
  feedbacks: [], // Current displayed feedbacks
  displaySuccess: () => {}, // Inform a user about an successful action feedback
  displayWarning: () => {}, // Inform a user with a warning action feedback
  displayError: () => {}, // Inform a user about an action failure's feedback
  remove: () => {}, // Remove a particular feedback
});

/**
 * The related context provider
 */
export default class ActionFeedbackContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
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
      feedbacks: [],
      displaySuccess: this.displaySuccess.bind(this),
      displayWarning: this.displayWarning.bind(this),
      displayError: this.displayError.bind(this),
      remove: this.remove.bind(this),
    };
  }

  /**
   * Display the feedback in a success mode
   * @param feedbackToAdd A feedback
   */
  displaySuccess(feedbackToAdd) {
    this.setState({
      feedbacks: [
        ...this.state.feedbacks,
        {
          id: uuidv4(),
          type: "success",
          message: feedbackToAdd,
        },
      ],
    });
  }

  /**
   * Display the feedback in a warning mode
   * @param feedbackToAdd A feedback
   */
  displayWarning(feedbackToAdd) {
    this.setState({
      feedbacks: [
        ...this.state.feedbacks,
        {
          id: uuidv4(),
          type: "warning",
          message: feedbackToAdd,
        },
      ],
    });
  }

  /**
   * Display the feedback in a error mode
   * @param feedbackToAdd A feedback
   */
  displayError(feedbackToAdd) {
    this.setState({
      feedbacks: [
        ...this.state.feedbacks,
        {
          id: uuidv4(),
          type: "error",
          message: feedbackToAdd,
        },
      ],
    });
  }

  /**
   * Remove the feedback
   * @param feedbackToRemove A feedback
   */
  remove(feedbackToRemove) {
    const hasSameId = (feedback) => feedbackToRemove.id !== feedback.id;
    this.setState({ feedbacks: this.state.feedbacks.filter(hasSameId) });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <ActionFeedbackContext.Provider value={this.state}>{this.props.children}</ActionFeedbackContext.Provider>;
  }
}
ActionFeedbackContextProvider.displayName = "ActionFeedbackContextProvider";
ActionFeedbackContextProvider.propTypes = {
  children: PropTypes.any,
};

/**
 * Action Feedback Context Consumer HOC
 * @param WrappedComponent
 */
export function withActionFeedback(WrappedComponent) {
  return class WithActionFeedback extends React.Component {
    render() {
      return (
        <ActionFeedbackContext.Consumer>
          {(actionFeedbackContext) => (
            <WrappedComponent actionFeedbackContext={actionFeedbackContext} {...this.props} />
          )}
        </ActionFeedbackContext.Consumer>
      );
    }
  };
}
