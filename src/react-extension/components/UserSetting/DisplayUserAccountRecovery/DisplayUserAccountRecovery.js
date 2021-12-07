/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.5.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withAppContext} from "../../../contexts/AppContext";
import {DateTime} from "luxon";

class DisplayUserAccountRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    return {
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
  }

  /**
   * Is the account recovery enabled?
   * @returns {boolean}
   */
  hasNotEnabledStatus() {
    return this.props.accountRecovery.status !== "Enabled";
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns string
   */
  formatFingerprint(fingerprint) {
    return fingerprint.toUpperCase().replace(/.{4}(?=.)/g, "$& ");
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Get the user requesting the current user to subscribe to the account recovery program.
   * @returns {*}
   */
  get requestor() {
    return this.props.requestor;
  }

  /**
   * Get the user name requesting the current user to subscribe to the account recovery program.
   * @returns {string}
   */
  get requestorName() {
    return `${this.requestor.profile.first_name} ${this.requestor.profile.last_name}`;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="account-recovery-profile">
        <h3><Trans>Account Recovery</Trans></h3>
        <p>
          <Trans>It is possible to share securely your recovery kit with the administrator.</Trans>&nbsp;
          <Trans>They will be able to help you in case you loose it.</Trans>&nbsp;
          <Trans>Otherwise, you may loose access to your data.</Trans>
        </p>
        <div className="account-recovery-status">
          <div className="account-recovery-review">
            <p className="status-wrapper">
              <Trans>Status</Trans>:
              <span className={`account-recovery-hints ${this.props.accountRecovery.status}`}/>
              <span className="status">{this.props.accountRecovery.status}</span>
            </p>
            {this.hasNotEnabledStatus() &&
            <button type='button' className="button primary"><Trans>Review</Trans></button>
            }
          </div>
          {this.hasNotEnabledStatus() &&
          <ul>
            <li className="usercard-detailed-col-2">
              <div className="content-wrapper">
                <div className="content">
                  <div>
                    <span className="tooltip tooltip-bottom"
                      data-tooltip={this.formatFingerprint(this.requestor.gpgkey.fingerprint)}>
                      <span className="name-with-tooltip">{`${this.requestorName} (${this.translate("admin")})`}</span>
                    </span>
                    &nbsp;
                    <span className="name"><Trans>requested this operation</Trans></span>
                  </div>
                  <div className="subinfo light">{this.formatDateTimeAgo(this.props.date)}</div>
                </div>
              </div>
              <UserAvatar user={this.requestor} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
            </li>
          </ul>
          }
        </div>
      </div>
    );
  }
}

DisplayUserAccountRecovery.propTypes = {
  context: PropTypes.any, // The application context
  accountRecovery: PropTypes.any, // The close callback
  requestor: PropTypes.any, // The admin user at the origin of the request
  date: PropTypes.string, // The date of the request
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation('common')(DisplayUserAccountRecovery));
