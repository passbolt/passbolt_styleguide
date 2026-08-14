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
 * @since         5.13.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import UserAvatar from "../Common/Avatar/UserAvatar";
import { withTranslation } from "react-i18next";
import { getUserFormattedName, isUserSuspended } from "../../../shared/utils/userUtils";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import TooltipMessageFingerprintLoading from "../Common/Tooltip/TooltipMessageFingerprintLoading";
import Fingerprint from "../Common/Fingerprint/Fingerprint";
import FingerprintSVG from "../../../img/svg/fingerprint.svg";

class GroupUserPermissionItem extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      tooltipFingerprintMessage: null,
    };
  }

  /**
   * Bind component event handlers to this instance.
   */
  bindEventHandlers() {
    this.onTooltipFingerprintMouseHover = this.onTooltipFingerprintMouseHover.bind(this);
  }

  /**
   * Returns the user's formatted full name, with a "(suspended)" suffix when applicable.
   * @returns {string}
   */
  getUserFullname() {
    const formattedName = getUserFormattedName(this.props.user, this.props.t, { withUsername: false });
    const isSuspended = this.isUserSuspended ? ` ${this.translate("(suspended)")}` : "";
    return `${formattedName}${isSuspended}`;
  }

  /**
   * Handle whenever the user passes its mouse hover the tooltip.
   * @returns {Promise<void>}
   */
  async onTooltipFingerprintMouseHover() {
    if (this.state.tooltipFingerprintMessage) {
      return;
    }

    const gpgkey = await this.props.context.port.request(
      "passbolt.keyring.get-public-key-info-by-user",
      this.props.user.id,
    );
    const tooltipFingerprintMessage = <Fingerprint fingerprint={gpgkey.fingerprint} />;
    this.setState({ tooltipFingerprintMessage });
  }

  /**
   * Returns the CSS class name for the list item, reflecting the suspended state and the removed
   * state of the group the member belongs to.
   * @returns {string}
   */
  getClassName() {
    let className = "row group-user-item";
    if (this.isUserSuspended) {
      className += " suspended";
    }
    if (this.props.isRemoved) {
      className += " permission-removed";
    }
    return className;
  }

  /**
   * Returns true if the feature flag disableUser is enabled and the given user is suspended.
   * @returns {boolean}
   */
  get isUserSuspended() {
    return this.props.context.siteSettings.canIUse("disableUser") && isUserSuspended(this.props.user);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <li id={`group-user-item-${this.props.user.id}`} className={this.getClassName()}>
        <UserAvatar user={this.props.user} baseUrl={this.props.context.userSettings.getTrustedDomain()} />

        <div className="aro">
          <div className="aro-name">
            <span className="ellipsis">{this.getUserFullname()}</span>
            <TooltipPortal
              message={this.state.tooltipFingerprintMessage || <TooltipMessageFingerprintLoading />}
              onMouseHover={this.onTooltipFingerprintMouseHover}
            >
              <FingerprintSVG />
            </TooltipPortal>
          </div>
          <div className="aro-details">
            <span className="ellipsis">{this.props.user.username}</span>
          </div>
        </div>
      </li>
    );
  }
}

GroupUserPermissionItem.propTypes = {
  context: PropTypes.any, // The application context
  user: PropTypes.object, // {id: <uuid>, username: <string>, profile: <object>, ...etc}
  isRemoved: PropTypes.bool, // True when the group the member belongs to is pending deletion
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(GroupUserPermissionItem));
