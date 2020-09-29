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
import Icon from "../../../react/components/Common/Icons/Icon";

/**
 * This component displays the list of actions feedbacks using the action feedback context
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
   * Closes a feedback message
   */
  close(feedback) {
    this.props.actionFeedbackContext.remove(feedback);
  }

  render() {
    return (
      <>
        <div className="notification-container">
          {
            this.props.actionFeedbackContext.feedbacks.map(feedback =>
              <ShareActionFeedback
                key={feedback.message}
                feedback={feedback}
                onClose={ () => this.close(feedback) }/>
            )
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
    const timeoutId = setTimeout(() => {
      this.setState({shouldRender: false});
      setTimeout(this.props.onClose);
    }, ShareActionFeedback.DEFAULT_DISPLAY_TIME_IN_MS);
    this.setState({timeoutId});
  }

  /**
   * Bind the component method callback
   */
  bindCallbacks() {
    this.persist = this.persist.bind(this);
  }

  /**
   * Persist the display of the feedback
   */
  persist() {
    const hasNotPersistedYet = this.state.timeoutId && !this.isPersisted;
    if (hasNotPersistedYet) {
      clearTimeout(this.state.timeoutId);
      this.setState({isPersisted: true});
    }
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
          onMouseOver={this.persist}>
          <div className={ `message animated ${this.state.shouldRender ? 'fadeInUp' : 'fadeOutUp'} ${this.props.feedback.type}`}>
            <span className="content">
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

            {
              this.state.isPersisted &&
                                <a
                                  className="action copy">
                                  <Icon name="copy-to-clipboard"/>
                                  <span className="visually-hidden">Close</span>
                                </a>
            }

            {
              this.state.isPersisted &&
                                    <a
                                      onClick={this.props.onClose}
                                      className="action close">
                                      <Icon name="close"/>
                                      <span className="visually-hidden">Close</span>
                                    </a>
            }
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
