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
 * @since         2.13.0
 */

import React from "react";
import {withActionFeedback} from "../../contexts/ActionFeedbackContext";
import PropTypes from "prop-types";

/**
 * This component displays the list of actions feedbacks using the action feedback context.
 * It displays one at a time (the oldest one) and displays the next one when the user / system closes the current one
 */
class ShareActionFeedbacks extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind component method callbacks
   */
  bindCallbacks() {
    this.close = this.close.bind(this);
  }

  /**
   * Returns the feedback to displau
   */
  get feedbackToDisplay() {
    return this.props.actionFeedbackContext.feedbacks[0];
  }

  /**
   * Returns true there's at least one feedback to display
   */
  get hasFeedbacks() {
    return this.props.actionFeedbackContext.feedbacks.length > 0;
  }

  /**
   * Closes a feedback message
   */
  async close(feedback) {
    await this.props.actionFeedbackContext.remove(feedback);
  }

  render() {
    return (
      <>
        <div className="notification-container">
          {this.hasFeedbacks &&
            <ShareActionFeedback
              feedback={this.feedbackToDisplay}
              onClose={ () => this.close(this.feedbackToDisplay) }/>
          }
        </div>
      </>
    );
  }
}

ShareActionFeedbacks.propTypes = {
  actionFeedbackContext: PropTypes.any // The action feedback context
};

export default withActionFeedback(ShareActionFeedbacks);

/**
 * Child component that displays a single action feedback
 */
class ShareActionFeedback extends React.Component {
  /**
   * Default dispay time in ms
   */
  static get DEFAULT_DISPLAY_TIME_IN_MS() {
    return 5000;
  }

  /**
   * Default constructor
   * @param props Component props
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
      shouldRender: true, // Flag telling whether the component must be rendered
      isPersisted: false, // Flag telling whether the feedback must be continually displayed ( except manual close )
      timeoutId: null // The identifier of timeout use for the fading animation
    };
  }

  /**
   * Whenever the component has been mounted
   */
  componentDidMount() {
    this.displayWithTimer();
  }

  /**
   * Whenever the component has been updated
   * @param previousProps
   */
  componentDidUpdate(previousProps) {
    const hasFeedbackChanged = previousProps && previousProps.feedback.id !== this.props.feedback.id;
    if (hasFeedbackChanged) {
      this.setState({shouldRender: true});
      this.displayWithTimer();
    }
  }

  /**
   * Whenever the component will unmount
   */
  componentWillUnmount() {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
  }


  /**
   * Bind the component method callback
   */
  bindCallbacks() {
    this.persist = this.persist.bind(this);
    this.displayWithTimer = this.displayWithTimer.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * Display the feedback for a while ( 5 seconds ) and then disappear
   */
  displayWithTimer() {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    const timeoutId = setTimeout(this.close, ShareActionFeedback.DEFAULT_DISPLAY_TIME_IN_MS);
    this.setState({timeoutId});
  }

  /**
   * Persist the display of the feedback
   */
  persist() {
    const hasNotPersistedYet = this.state.timeoutId && !this.state.isPersisted;
    if (hasNotPersistedYet) {
      clearTimeout(this.state.timeoutId);
      this.setState({isPersisted: true});
    }
  }

  /**
   * Close the feedback
   */
  close() {
    this.setState({shouldRender: false});
    // To keep the hide animation
    setTimeout(this.props.onClose, 1000);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        <div
          className="notification"
          onMouseOver={this.persist}
          onMouseLeave={this.displayWithTimer}
          onClick={this.close}>
          <div className={ `message animated ${this.state.shouldRender ? 'fadeInUp' : 'fadeOutUp'} warning`}>
            <span  className="content">
              <strong>
                {
                  {
                    success: "Success: ",
                    error: "Error: "
                  }[this.props.feedback.type]
                }
              </strong>
              {this.props.feedback.message}
            </span>
          </div>

        </div>
      </>
    );
  }
}

ShareActionFeedback.propTypes = {
  feedback: PropTypes.object, // The feedback to display
  onClose: PropTypes.func, // Callback when the feedback must be closed
};
