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
import React, {Component} from "react";
import PropTypes from "prop-types";
import TimerSVG from "../../../img/svg/timer.svg";
import {TotpCodeGeneratorService} from "../../services/otp/TotpCodeGeneratorService";
import {withTranslation} from "react-i18next";
import {withActionFeedback} from "../../../react-extension/contexts/ActionFeedbackContext";

const DEFAULT_TOTP_PERIOD = 30;

/**
 * This component represents an OTP viewer
 */
class Totp extends Component {
  /**
   * Update TOTP code on period timeout.
   * @param {number}
   */
  updateCodeOnPeriodTimeout = null;

  /**
   * The initial date when the component is created.
   * @param {number}
   */
  dateOnCreation = null;

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.dateOnCreation = new Date(Date.now());
    this.state = this.defaultState;
  }

  /**
   * Bind component callbacks.
   */
  bindCallbacks() {
    this.updateCodeOnPeriod = this.updateCodeOnPeriod.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Return the delay with the previous period start from the mounted component.
   * @return {number}
   */
  calculateDelayFromMounted() {
    const todaySecond = this.dateOnCreation.getUTCHours() * 3600
      + this.dateOnCreation.getUTCMinutes() * 60
      + this.dateOnCreation.getUTCSeconds();
    return todaySecond % (this.period);
  }

  /**
   * Return the delay with the previous period start.
   * @return {number}
   */
  calculateDelayFromNow() {
    const now = new Date(Date.now());
    const todaySeconds = now.getUTCHours() * 3600
      + now.getUTCMinutes() * 60
      + now.getUTCSeconds();
    return todaySeconds % (this.period);
  }

  /**
   * Get the default state
   * @return {object}
   */
  get defaultState() {
    return {
      code: this.generateCode(),
      delay: this.calculateDelayFromMounted()
    };
  }

  /**
   * Generate the code.
   * @returns {string}
   */
  generateCode() {
    try {
      return TotpCodeGeneratorService.generate(this.props.totp);
    } catch (error) {
      this.props.actionFeedbackContext.displayError(this.props.t("Unable to preview the TOTP"));
      return "";
    }
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.updateCodeOnPeriodTimeout = this.updateCodeOnPeriod(this.period - this.state.delay);
  }

  /**
   * ComponentDidUpdate
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const isTotpHasChanged = prevProps.totp !== this.props.totp;
    if (isTotpHasChanged) {
      clearTimeout(this.updateCodeOnPeriodTimeout);
      this.updateCode();
    }
  }

  /**
   * componentWillUnmount
   * Invoked immediately before the component is removed from the tree
   * @return {void}
   */
  componentWillUnmount() {
    clearTimeout(this.updateCodeOnPeriodTimeout);
  }

  /**
   * Update the code, the delay and the period timeout
   */
  updateCode() {
    const delay = this.calculateDelayFromMounted();
    const delayTotp = this.calculateDelayFromNow();
    const code = this.generateCode();
    this.updateCodeOnPeriodTimeout = this.updateCodeOnPeriod(this.period - delayTotp);
    this.setState({code, delay});
  }

  /**
   * Update TOTP code when period ends.
   * @param {number} when When to update
   */
  updateCodeOnPeriod(when) {
    return setTimeout(() => {
      const code = this.generateCode();
      this.setState({code});
      this.updateCodeOnPeriodTimeout = this.updateCodeOnPeriod(this.period);
    }, when * 1000);
  }

  /**
   * Return the OTP period
   * @return {number}
   */
  get period() {
    return this.props.totp?.period || DEFAULT_TOTP_PERIOD;
  }

  /**
   * Whenever the user click on the OTP.
   * @param {HtmlEvent} ev The associated html event.
   */
  onClick(ev) {
    // Avoid the grid to select the resource while copying a resource secret.
    ev.stopPropagation();

    if (this.props.canClick) {
      this.props?.onClick();
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const halfLength = Math.round(this.state.code.length / 2);
    const firstHalfCode = this.state.code.substring(0, halfLength);
    const secondHalfCode = this.state.code.substring(halfLength);

    return (
      <button type="button" className="no-border" onClick={this.onClick} disabled={!this.props.canClick}>
        <span className="totp-code"><span>{firstHalfCode}</span>&nbsp;<span>{secondHalfCode}</span></span>
        <TimerSVG style={{
          "--timer-duration": `${this.period}s`,
          "--timer-delay": `-${this.state.delay}s`
        }}/>
      </button>
    );
  }
}

Totp.defaultProps = {
  canClick: false,
  onClick: () => {},
};

Totp.propTypes = {
  totp: PropTypes.object.isRequired, // The totp dto
  actionFeedbackContext: PropTypes.any, // The action feedback context
  canClick: PropTypes.bool, // The can click on the totp
  onClick: PropTypes.func, // The on click handler
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withTranslation("common")(Totp));
