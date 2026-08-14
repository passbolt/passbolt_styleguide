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

import SharePermissionDeleteButton from "./SharePermissionDeleteButton";
import SharePermissionRevertButton from "./SharePermissionRevertButton";
import ShareVariesDetails from "./ShareVariesDetails";
import ShareChanges from "./Utility/ShareChanges";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import UserAvatar from "../Common/Avatar/UserAvatar";
import { withTranslation } from "react-i18next";
import Select from "../Common/Select/Select";
import { getUserFormattedName, isUserSuspended } from "../../../shared/utils/userUtils";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import TooltipMessageFingerprintLoading from "../Common/Tooltip/TooltipMessageFingerprintLoading";
import Fingerprint from "../Common/Fingerprint/Fingerprint";
import InfoSVG from "../../../img/svg/info.svg";
import FingerprintSVG from "../../../img/svg/fingerprint.svg";

class UserPermissionItem extends Component {
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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRevert = this.handleRevert.bind(this);
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
   * @returns {Promise<JSX>}
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
   * Returns the CSS class name for the list item, reflecting the suspended and removed states.
   * @returns {string}
   */
  getClassName() {
    let className = "row";
    if (this.isUserSuspended) {
      className += " suspended";
    }
    if (this.isRemoved) {
      className += " permission-removed";
    }
    return className;
  }

  /**
   * Returns true when the permission is pending deletion.
   * @returns {boolean}
   */
  get isRemoved() {
    return this.props.changeStatus === ShareChanges.CHANGE_STATUS_REMOVED;
  }

  /**
   * Returns the translated label of the pending change status.
   * @returns {string}
   */
  get changeStatusLabel() {
    const labels = {
      [ShareChanges.CHANGE_STATUS_ADDED]: this.translate("added"),
      [ShareChanges.CHANGE_STATUS_MODIFIED]: this.translate("modified"),
      [ShareChanges.CHANGE_STATUS_REMOVED]: this.translate("removed"),
    };
    return labels[this.props.changeStatus];
  }

  /**
   * Handle permission type change from the select dropdown.
   * @param {Event} event
   */
  handleUpdate(event) {
    const newType = parseInt(event.target.value);
    this.props.onUpdate(this.props.id, newType);
  }

  /**
   * Handle deletion of this permission entry.
   */
  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  /**
   * Handle revert of this permission entry pending deletion.
   */
  handleRevert() {
    this.props.onRevert(this.props.id);
  }

  /**
   * Returns true when the permission varies across the shared items.
   * @returns {boolean}
   */
  get isVarying() {
    return this.props.permissionType === -1;
  }

  /**
   * Get the permissions
   * The varies option is only selectable while the permission still varies: once resolved to a
   * concrete level, the mixed state cannot be staged again.
   * @returns {[{label: string, value: string}]}
   */
  get permissions() {
    const permissions = [
      { value: "1", label: this.translate("can read") },
      { value: "7", label: this.translate("can update") },
      { value: "15", label: this.translate("is owner") },
    ];
    if (this.isVarying) {
      permissions.push({ value: "-1", label: this.translate("varies") });
    }
    return permissions;
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
    const isInputDisabled = this.props.disabled || this.isRemoved;
    return (
      <li id={`permission-item-${this.props.id}`} className={this.getClassName()}>
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

        {this.props.variesDetails && this.isVarying && (
          <TooltipPortal message={<ShareVariesDetails variesDetails={this.props.variesDetails} />}>
            <InfoSVG className="varies-icon" />
          </TooltipPortal>
        )}

        {this.props.changeStatus && (
          <span className={`chips ${this.props.changeStatus}`}>{this.changeStatusLabel}</span>
        )}

        <div className="rights">
          <Select
            name="permissionSelect"
            className={`permission inline${isInputDisabled ? " disabled" : ""}`}
            items={this.permissions}
            value={this.props.permissionType.toString()}
            disabled={isInputDisabled}
            onChange={this.handleUpdate}
            direction="bottom"
          />
        </div>

        {!this.props.isReadOnly && (
          <div className="actions">
            {this.isRemoved ? (
              <SharePermissionRevertButton onRevert={this.handleRevert} disabled={this.props.disabled} />
            ) : (
              <SharePermissionDeleteButton onClose={this.handleDelete} disabled={isInputDisabled} />
            )}
          </div>
        )}
      </li>
    );
  }
}

UserPermissionItem.propTypes = {
  context: PropTypes.any, // The application context
  id: PropTypes.string, // uuid
  user: PropTypes.object, // {id: <uuid>, username: <string>, profile: <object>, ...etc}
  variesDetails: PropTypes.object, // {type: [resource1, ...resourceN]}
  changeStatus: PropTypes.string, // A ShareChanges.CHANGE_STATUS_* value, null when unchanged
  disabled: PropTypes.bool,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onRevert: PropTypes.func,
  permissionType: PropTypes.number,
  isReadOnly: PropTypes.bool,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(UserPermissionItem));
