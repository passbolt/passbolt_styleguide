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
 * @since         2.13.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";

/**
 * This component displays the user details about information
 */
class DisplayUserDetailsInformation extends React.Component {
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
      open: true // Flag for the expand / collapse mode
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
  }

  /**
   * Returns the current user to detail
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * Get user role name
   */
  getRoleName() {
    if (this.props.context.roles) {
      const role = this.props.context.roles.find(role => role.id === this.user.role_id);
      return role ? role.name : "";
    }
    return "";
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
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Check if the logged in user is admin
   * @return {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Returns true if the mfa feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  hasMfaSection() {
    return this.props.context.siteSettings.canIUse("multiFactorAuthentication") && this.isLoggedInUserAdmin() && this.user.active;
  }

  /**
   * Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  hasAccountRecoverySection() {
    return this.props.context.siteSettings.canIUse("accountRecovery")
      && this.isLoggedInUserAdmin()
      && this.props.accountRecoveryContext.isPolicyEnabled()
      && this.user.active;
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
    const role = this.getRoleName();
    const modified = this.formatDateTimeAgo(this.user.modified);
    const status = this.user.active ? this.translate("Activated") : this.translate("Activation pending");

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button type="button" className="link no-border" onClick={this.handleTitleClicked}>
              <Trans>Information</Trans>
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          <ul>
            <li className="role">
              <span className="label"><Trans>Role</Trans></span>
              <span className="value capitalize">{role}</span>
            </li>
            <li className="modified">
              <span className="label"><Trans>Modified</Trans></span>
              <span className="value" title={this.user.modified}>{modified}</span>
            </li>
            <li className="status">
              <span className="label"><Trans>Status</Trans></span>
              <span className="value">{status}</span>
            </li>
            {this.hasAccountRecoverySection() &&
            <li className="account-recovery-status">
              <span className="label"><Trans>Account recovery</Trans></span>
              <span className="value">
                {{
                  "approved": <Trans>Approved</Trans>,
                  "rejected": <Trans>Rejected</Trans>,
                  [undefined]: <Trans>Pending</Trans>,
                }[this.user?.account_recovery_user_setting?.status]}
              </span>
            </li>
            }
            {this.hasMfaSection() &&
            <li className="mfa">
              <span className="label"><Trans>MFA</Trans></span>
              <span className="value">
                {{
                  [true]: <Trans>Enabled</Trans>,
                  [false]: <Trans>Disabled</Trans>,
                  [undefined]: <Trans>Disabled</Trans>,
                }[this.user?.is_mfa_enabled]}
              </span>
            </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.object, // The user workspace context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withUserWorkspace(withAccountRecovery(withTranslation('common')(DisplayUserDetailsInformation))));
