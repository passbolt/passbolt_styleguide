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
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAppContext} from "../../../contexts/AppContext";

/**
 * This component displays the user details about information
 */
class DisplayUserAccountRecovery extends React.Component {
  /**
   * Default constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      open: false // Flag for the expand / collapse mode
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string} The formatted date
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration < 1000 && duration > 0 < 1000 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
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
   */
  render() {
    return (
      <div className={`detailed-account-recovery accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClicked} role="button">
              <Trans>Account recovery</Trans>
              {this.props.pendingAccountRecoveryRequest &&
                <Icon name="exclamation" baseline={true}/>
              }
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          <ul>
            {this.props.pendingAccountRecoveryRequest &&
            <li className="pending-request-status">
              <span className="label"><Trans>Current status</Trans></span>
              <a className="button" role="button">Review</a>
            </li>
            }
            <li className="previous-request">
              <span className="label"><Trans>Previous recovery</Trans></span>
              <span className="value">{this.props.previousAccountRecoveryRequest ? `${this.props.previousAccountRecoveryRequest.status} ${this.formatDateTimeAgo(this.props.previousAccountRecoveryRequest.date)}` : "Never"}</span>
            </li>
            <li className="requests-count">
              <span className="label"><Trans>Number of recovery</Trans></span>
              <span className="value">{this.props.accountRecoveryRequestsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserAccountRecovery.propTypes = {
  context: PropTypes.any,
  pendingAccountRecoveryRequest: PropTypes.bool, //
  previousAccountRecoveryRequest: PropTypes.string,
  accountRecoveryRequestsCount: PropTypes.string,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayUserAccountRecovery));
