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

/**
 * Context used to provide action feedbacks to display
 */
export const ActionFeedbackContext = React.createContext({
  feedbacks: [], // Current displayed feedbacks
  displaySuccess: () => {}, // Inform a user about an successful action feedback
  displayError: () => {}, // Inform a user about an  action failure's eedback
  remove: () => {} // Remove a particular feedback
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
      displaySuccess: async feedbackToAdd => {
        await this.setState({feedbacks: [{type: 'success', message: feedbackToAdd}, ...this.state.feedbacks]});
      },
      displayError: async feedbackToAdd => {
        await this.setState({feedbacks: [{type: 'error', message: feedbackToAdd}, ...this.state.feedbacks]});
      },
      remove: async feedbackToRemove => {
        await this.setState({feedbacks: this.state.feedbacks.filter(feedback => feedbackToRemove !== feedback)});
      }
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ActionFeedbackContext.Provider value={this.state}>
        {this.props.children}
      </ActionFeedbackContext.Provider>
    );
  }
}
ActionFeedbackContextProvider.displayName = 'ActionFeedbackContextProvider';
ActionFeedbackContextProvider.propTypes = {
  children: PropTypes.any
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
          {
            actionFeedbackContext => <WrappedComponent actionFeedbackContext={actionFeedbackContext} {...this.props} />
          }
        </ActionFeedbackContext.Consumer>
      );
    }
  };
}
