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
import LinkSVG from "../../../../img/svg/link.svg";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import DisplayUserDetailsInformation from "../DisplayUserDetailsInformation/DisplayUserDetailsInformation";
import DisplayUserDetailsGroups from "../DisplayUserDetailsGroups/DisplayUserDetailsGroups";
import DisplayUserDetailsPublicKey from "../DisplayUserDetailsPublicKey/DisplayUserDetailsPublicKey";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withTranslation, Trans} from "react-i18next";
import DisplayUserDetailsAccountRecovery from "../DisplayUserDetailsAccountRecovery/DisplayUserDetailsAccountRecovery";
import {isUserSuspended} from "../../../../shared/utils/userUtils";
import {withClipboard} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";
import {actions} from "../../../../shared/services/rbacs/actionEnumeration";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";

class DisplayUserDetails extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  componentDidMount() {
    this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * Returns the base url
   */
  get baseUrl() {
    return this.props.context.userSettings.getTrustedDomain();
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.user.id}`;
    await this.props.clipboardContext.copy(permalink, this.translate("The permalink has been copied to clipboard."));
  }

  /**
   * Handle close sidebar click
   */
  handleCloseClick() {
    this.props.userWorkspaceContext.onDetailsLocked();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Is the logged in user admin
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Can see account recovery details
   * @return {boolean}
   */
  canSeeAccountRecoveryDetails() {
    return this.props.rbacContext.canIUseAction(actions.ACCOUNT_RECOVERY_REQUEST_INDEX)
      && this.props.rbacContext.canIUseAction(actions.ACCOUNT_RECOVERY_RESPONSE_CREATE);
  }

  /**
   * Is the account recovery enabled
   * @returns {boolean}
   */
  isAccountRecoveryEnabled() {
    return this.props.accountRecoveryContext.isPolicyEnabled();
  }
  /**
   * Check if selected or current user is missing metadata keys
   * @returns {boolean}
   */
  hasUserIsMissingKeys() {
    if (this.isLoggedInUserAdmin() && Boolean(this.props.context.siteSettings?.canIUse('metadata'))) {
      return this.user.missing_metadata_key_ids?.length > 0;
    }
    return false;
  }

  /**
   * Get attention required
   * @returns {boolean}
   */
  get hasAttentionRequired() {
    return (this.isAccountRecoveryEnabled() && Boolean(this.user.pending_account_recovery_request)) || this.hasUserIsMissingKeys();
  }

  /**
   * Returns true if the feature flag disableUser is enabled and the given user is suspended.
   * @returns {boolean}
   */
  get isUserSuspended() {
    return this.props.context.siteSettings.canIUse('disableUser') && isUserSuspended(this.user);
  }

  /**
   * Returns true if the given user is not active.
   * @returns {boolean}
   */
  get isUserInactive() {
    return !this.user.active;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="sidebar user">
        <div className={`sidebar-header ${this.isUserInactive ? "inactive" : ""} ${this.isUserSuspended ? "suspended" : ""}`}>
          <div className="teaser-image">
            <UserAvatar
              user={this.user}
              baseUrl={this.baseUrl}
              attentionRequired={this.hasAttentionRequired}/>
          </div>
          <div className="title-area">
            <h3>
              <div className="title-wrapper">
                <span className="name">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</span>
              </div>
              <span className="subtitle">{this.user.username}</span>
            </h3>
            <button type="button" className="title-link link no-border" title={this.translate("Copy the link to this user")} onClick={this.handlePermalinkClick}>
              <LinkSVG/>
              <span className="visuallyhidden"><Trans>Copy the link to this user</Trans></span>
            </button>
          </div>
        </div>
        <div className="sidebar-content">
          <DisplayUserDetailsInformation/>
          {this.user.active && <DisplayUserDetailsGroups/>}
          {this.user.active && <DisplayUserDetailsPublicKey/>}
          {this.isAccountRecoveryEnabled() && this.user.active && this.canSeeAccountRecoveryDetails() && <DisplayUserDetailsAccountRecovery/>}
        </div>
      </div>
    );
  }
}

DisplayUserDetails.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  userWorkspaceContext: PropTypes.any, // The user workspace context
  rbacContext: PropTypes.any, // the rbac context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  clipboardContext: PropTypes.object, // the clipboard service
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAccountRecovery(withRbac(withUserWorkspace(withActionFeedback(withClipboard(withTranslation('common')(DisplayUserDetails)))))));
