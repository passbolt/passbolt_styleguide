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
 * @since         3.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

/**
 * Child component that displays a single action feedback
 */
class ShareActionFeedback extends React.Component {
  /**
   * Default time to wait before closing a feedback in ms
   */
  static get DEFAULT_WAIT_TO_CLOSE_TIME_IN_MS() {
    return 500;
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
    this.displayWithTimer(this.props.displayTimeInMs);
  }

  /**
   * Whenever the component has been updated
   * @param previousProps
   */
  componentDidUpdate(previousProps) {
    const hasFeedbackChanged = previousProps && previousProps.feedback.id !== this.props.feedback.id;
    const hasDisplayTimeChanged = previousProps && this.props.displayTimeInMs && previousProps.displayTimeInMs !== this.props.displayTimeInMs;
    if (hasFeedbackChanged) {
      this.setState({shouldRender: true});
      this.displayWithTimer(this.props.displayTimeInMs);
    } else if (hasDisplayTimeChanged) {
      this.updateTimer(this.props.displayTimeInMs);
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
   * Display the feedback for a while and then disappear
   * @param {number} displayTimeInMs The time to display the feedback
   */
  displayWithTimer(displayTimeInMs) {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    const timeoutId = setTimeout(this.close, displayTimeInMs);
    const time = Date.now();
    this.setState({timeoutId, time});
  }

  /**
   * Update the timer of the currently displayed feedback.
   * @param {number} displayTimeInMs The new time
   */
  updateTimer(displayTimeInMs) {
    const newTime = displayTimeInMs - (Date.now() - this.state.time);
    if (newTime > 0) {
      this.displayWithTimer(newTime);
    } else {
      clearTimeout(this.state.timeoutId);
      this.close();
    }
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
    setTimeout(this.props.onClose, ShareActionFeedback.DEFAULT_WAIT_TO_CLOSE_TIME_IN_MS);
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
          <div className={`message animated ${this.state.shouldRender ? 'fadeInUp' : 'fadeOutUp'} ${this.props.feedback.type}`}>
            <span className="content">
              <strong>
                {this.props.feedback.type === "success" && <><Trans>Success</Trans>: </>}
                {this.props.feedback.type === "error" && <><Trans>Error</Trans>: </>}
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
  displayTimeInMs: PropTypes.number, // The time the feedback should be displayed
};

export default withTranslation("common")(ShareActionFeedback);
