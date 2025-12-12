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
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import {isUserSuspended} from "../../../../shared/utils/userUtils";
import AttentionSVG from "../../../../img/svg/attention.svg";
import {withRoles} from "../../../contexts/RoleContext";

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
    const role = this.props.roleContext.getRole(this.user.role_id);
    return role?.name || "";
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
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
   * Returns true if the disablUser feature is enabled.
   * @returns {boolean}
   */
  hasDisableUserSection() {
    return this.props.context.siteSettings.canIUse('disableUser');
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
   * Returns true if the metadate feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  hasMetadataDataSection() {
    return this.props.context.siteSettings.canIUse("metadata")
        && this.isLoggedInUserAdmin()
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
    const modified = formatDateTimeAgo(this.user.modified, this.props.t, this.props.context.locale);
    const status = this.user.active ? this.translate("Activated") : this.translate("Activation pending");

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button type="button" className="link no-border" onClick={this.handleTitleClicked}>
              <span className="accordion-title">
                <Trans>Information</Trans>
              </span>
              {this.state.open && <CaretDownSVG/>}
              {!this.state.open && <CaretRightSVG/>}
            </button>
          </h4>
        </div>
        {this.state.open &&

        <div className="accordion-content">
          <div className="information-label">
            <span className="role label"><Trans>Role</Trans></span>
            <span className="modified label"><Trans>Modified</Trans></span>
            <span className="status label"><Trans>Status</Trans></span>
            {this.hasAccountRecoverySection() &&
                <span className="account-recovery-status label"><Trans>Account recovery</Trans></span>
            }
            {this.hasMfaSection() &&
                <span className="mfa label"><Trans>MFA</Trans></span>
            }
            {this.hasDisableUserSection() &&
                <span className="suspended label"><Trans>Suspended</Trans></span>
            }
            {this.hasMetadataDataSection() &&
              <span className="metadata-keys label"><Trans>Metadata keys</Trans></span>
            }
          </div>
          <div className="information-value">
            <span className="role value capitalize">{role}</span>
            <span className="modified value" title={this.user.modified}>{modified}</span>
            <span className="status value">{status}</span>
            {this.hasAccountRecoverySection() &&
                <span className="account-recovery-status value">{{
                  "approved": <Trans>Approved</Trans>,
                  "rejected": <Trans>Rejected</Trans>,
                  [undefined]: <Trans>Pending</Trans>,
                }[this.user?.account_recovery_user_setting?.status]}
                </span>
            }
            {this.hasMfaSection() &&
                <span className="mfa value">{{
                  [true]: <Trans>Enabled</Trans>,
                  [false]: <Trans>Disabled</Trans>,
                  [undefined]: <Trans>Disabled</Trans>,
                }[this.user?.is_mfa_enabled]}</span>
            }
            {this.hasDisableUserSection() &&
                <span className="suspended value">
                  {{
                    [false]: <Trans>No</Trans>,
                    [true]: <Trans>Yes</Trans>,
                  }[isUserSuspended(this.user)]}
                </span>
            }
            {this.hasMetadataDataSection() &&
                <span className="metadata-keys value">{{
                  [true]: <><Trans>Missing</Trans><AttentionSVG className="attention-required"/></>,
                  [false]: <Trans>All</Trans>,
                }[this.user?.missing_metadata_key_ids?.length > 0]}</span>
            }
          </div>
        </div>
        }
      </div>
    );
  }
}

DisplayUserDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.object, // The user workspace context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  roleContext: PropTypes.object, // The role context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withUserWorkspace(withAccountRecovery(withRoles(withTranslation('common')(DisplayUserDetailsInformation)))));
