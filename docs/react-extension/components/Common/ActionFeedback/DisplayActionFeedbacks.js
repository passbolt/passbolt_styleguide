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
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import PropTypes from "prop-types";
import ShareActionFeedback from "./ShareActionFeedback";

/**
 * This component displays the list of actions feedbacks using the action feedback context.
 * It displays one at a time (the oldest one) and displays the next one when the user / system closes the current one
 */
class DisplayActionFeedbacks extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Default display time in ms
   */
  static get DEFAULT_DISPLAY_TIME_IN_MS() {
    return 5000;
  }

  /**
   * Default minimum display time in ms
   */
  static get DEFAULT_DISPLAY_MIN_TIME_IN_MS() {
    return 1200;
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
   * Returns the length of the feedbacks list.
   * @returns {number}
   */
  get length() {
    return this.props.actionFeedbackContext.feedbacks.length;
  }

  /**
   * Returns true there's at least one feedback to display
   */
  get hasFeedbacks() {
    return this.length > 0;
  }

  /**
   * Closes a feedback message
   */
  async close(feedback) {
    await this.props.actionFeedbackContext.remove(feedback);
  }

  render() {
    const displayTimeInMs = this.length > 1 ? DisplayActionFeedbacks.DEFAULT_DISPLAY_MIN_TIME_IN_MS : DisplayActionFeedbacks.DEFAULT_DISPLAY_TIME_IN_MS;

    return (
      <>
        {this.hasFeedbacks &&
        <div className="notification-container">
          <ShareActionFeedback
            feedback={this.feedbackToDisplay}
            onClose={() => this.close(this.feedbackToDisplay)}
            displayTimeInMs={displayTimeInMs}/>
        </div>
        }
      </>
    );
  }
}

DisplayActionFeedbacks.propTypes = {
  actionFeedbackContext: PropTypes.any // The action feedback context
};

export default withActionFeedback(DisplayActionFeedbacks);

