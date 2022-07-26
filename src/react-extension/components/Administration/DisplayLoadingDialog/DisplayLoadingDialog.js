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
import React, {Component} from "react";
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";

class DisplayLoadingDialog extends Component {
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
   * Component will unmount
   */
  componentWillUnmount() {
    this.resetInterval();
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
   * Start the infinite timer update.
   * @return {void}
   */
  startInfiniteTimerUpdateProgress() {
    this.infiniteTimerUpdateIntervalId = setInterval(() => {
      const infiniteTimer = this.state.infiniteTimer + 2;
      this.setState({infiniteTimer});
    }, 500);
  }

  /**
   * Calculate the infinite progress
   * @return {number}
   */
  calculateInfiniteProgress() {
    return 100 - (100 / Math.pow(1.1, this.state.infiniteTimer));
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const progress = this.calculateInfiniteProgress();
    const progressBarStyle = {width: `${progress}%`};

    return (
      <DialogWrapper className='loading-dialog' title={this.props.title}
        onClose={this.handleClose} disabled={true}>
        <div className="form-content">
          <label><Trans>Take a deep breath and enjoy being in the present moment...</Trans></label>
          <div className="progress-bar-wrapper">
            <span className="progress-bar">
              <span className={`progress ${progress === 100 ? 'completed' : ''}`} style={progressBarStyle}/>
            </span>
          </div>
        </div>
        <div className="submit-wrapper clearfix">
          <a className="button disabled processing">Submit<Icon name="spinner"/></a>
        </div>
      </DialogWrapper>
    );
  }
}

DisplayLoadingDialog.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
};

export default withTranslation("common")(DisplayLoadingDialog);
