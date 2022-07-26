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
import React, {Component} from "react";
import {withAppContext} from "../../../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Icon from "../../../../../shared/components/Icons/Icon";

class DisplayProgress extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.infiniteTimerUpdateIntervalId = null; // The infinite timer update interval ID
    this.state = this.defaultState;
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      infiniteTimer: 0, // The timer for the infinite calculation, used only if infinite progress mode.
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.startInfiniteTimerUpdateProgress();
  }

  /**
   * Start the infinite timer update.
   * @return {void}
   */
  startInfiniteTimerUpdateProgress() {
    if (!this.isInfiniteProgressMode()) {
      return;
    }

    this.infiniteTimerUpdateIntervalId = setInterval(() => {
      const infiniteTimer = this.state.infiniteTimer + 2;
      this.setState({infiniteTimer});
    }, 500);
  }

  /**
   * Component did update
   * @return {void}
   */
  componentDidUpdate() {
    if (!this.isInfiniteProgressMode() && this.infiniteTimerUpdateIntervalId) {
      this.resetInterval();
    }
  }

  /**
   * Component will unmount
   */
  componentWillUnmount() {
    this.resetInterval();
  }

  /**
   * Check if the component should display an infinite progress bar.
   * @returns {boolean}
   */
  isInfiniteProgressMode() {
    return !this.props.context.progressDialogProps.goals;
  }

  /**
   * Reset interval
   */
  resetInterval() {
    if (this.infiniteTimerUpdateIntervalId) {
      clearInterval(this.infiniteTimerUpdateIntervalId);
      this.infiniteTimerUpdateIntervalId = null;
    }
  }

  /**
   * Calculate the progress
   * @return {number}
   */
  calculateProgress() {
    if (this.props.context.progressDialogProps?.goals > 0) {
      return this.calculateGoalsProgress();
    } else {
      return this.calculateInfiniteProgress();
    }
  }

  /**
   * Calculate the infinite progress
   * @return {number}
   */
  calculateInfiniteProgress() {
    return 100 - (100 / Math.pow(1.1, this.state.infiniteTimer));
  }

  /**
   * Calculate the progress based on the goals
   * @return {number}
   */
  calculateGoalsProgress() {
    const completed = this.props.context.progressDialogProps.completed || 0;
    let progress = Math.round((100 * completed) / this.props.context.progressDialogProps.goals);
    if (progress > 100) {
      progress = 100;
    }
    return progress;
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const progress = this.calculateProgress();
    const progressBarStyle = {width: `${progress}%`};

    return (
      <div className="dialog-wrapper progress-dialog">
        <div className="dialog">
          <div className="dialog-header">
            <span className="dialog-title-wrapper">
              <h2>{this.props.context.progressDialogProps.title || <Trans>Please wait...</Trans>}</h2>
            </span>
          </div>
          <div className="dialog-content">
            <div className="form-content">
              <label><Trans>Take a deep breath and enjoy being in the present moment...</Trans></label>
              <div className="progress-bar-wrapper">
                <span className="progress-bar">
                  <span className={`progress ${progress === 100 ? 'completed' : ''}`} style={progressBarStyle}/>
                </span>
                {!this.isInfiniteProgressMode() &&
                  <div className="progress-details">
                    <span className="progress-step-label">{this.props.context.progressDialogProps.message || <Trans>Please wait...</Trans>}</span>
                    <span className="progress-percent">{progress}%</span>
                  </div>
                }
              </div>
            </div>
            <div className="submit-wrapper clearfix">
              <a className="button disabled processing">Submit<Icon name="spinner"/></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayProgress.propTypes = {
  context: PropTypes.any, // The application context
};

export default withAppContext(withTranslation("common")(DisplayProgress));
