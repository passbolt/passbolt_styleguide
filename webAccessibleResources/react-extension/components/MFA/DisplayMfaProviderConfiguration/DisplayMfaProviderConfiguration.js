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
 * @since         4.4.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withMfa} from "../../../contexts/MFAContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import MfaProviders from "../DisplayProviderList/MfaProviders.data";
import {DateTime} from "luxon";
import AnimatedFeedbackSuccessSVG from "../../../../img/svg/success.svg";

/**
 * This component will display the configuration for the mfa provider
 */
class DisplayMfaProviderConfiguration extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState;
  }

  /**
   * Format date
   * @param {string} date The date to format
   * @return {string}
   */
  formatDate(date) {
    return DateTime.fromJSDate(new Date(date)).setLocale(this.props.context.locale).toLocaleString(DateTime.DATETIME_FULL);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    const verification = await this.props.context.port.request("passbolt.mfa-setup.verify-provider", {provider: this.props.mfaContext.provider});
    const formatedDate = this.formatDate(verification?.verified);
    this.setState({verifiedDate: formatedDate});
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      verifiedDate: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  /**
   * Return the provider
   */
  getProvider() {
    return MfaProviders.find(mfaProvider => mfaProvider.id === this.props.mfaContext.provider);
  }

  /**
   * handle the cancelation when setup the provider
   */
  handleCancelClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * handle the remove mfa provider click
   */
  async handleDeleteClick() {
    await this.props.mfaContext.removeProvider();
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Check to disable button and input when context is processing an action
   */
  get isProcessing() {
    return this.props.mfaContext.isProcessing();
  }

  /**
   * Return the title for the provider
   */
  get title() {
    return this.props.t(this.getProvider().configuration.title);
  }

  /**
   * Return the description for the provider
   */
  get description() {
    return this.props.t(this.getProvider().configuration.description);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="main-column mfa-configuration">
          <div className="main-content">
            <h3>{this.title}</h3>
            <div className="feedback-card">
              <div className="illustration icon-feedback">
                <div className="success">
                  <AnimatedFeedbackSuccessSVG/>
                </div>

              </div>
              <div className="additional-information">
                <p>
                  {this.description}
                </p>
                {this.state.verifiedDate && <p className="created date">
                  {this.state.verifiedDate}
                </p>}
              </div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button className="button cancel secondary" onClick={this.handleCancelClick} disabled={this.isProcessing}><Trans>Manage providers</Trans></button>
          <button className="button primary warning form" type="button" onClick={this.handleDeleteClick} disabled={this.isProcessing}>
            <span><Trans>Turn off</Trans></span>
          </button>
        </div>
      </>

    );
  }
}

DisplayMfaProviderConfiguration.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
};

export default withAppContext(withMfa(withTranslation("common")(DisplayMfaProviderConfiguration)));
