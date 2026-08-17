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
import GroupAvatar from "../Common/Avatar/GroupAvatar";
import { withTranslation } from "react-i18next";
import Select from "../Common/Select/Select";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import InfoSVG from "../../../img/svg/info.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import CaretDownSVG from "../../../img/svg/caret_down.svg";

class GroupPermissionItem extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }

  /**
   * Bind component event handlers to this instance.
   */
  bindEventHandlers() {
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRevert = this.handleRevert.bind(this);
    this.handleToggleGroupMemberVisibility = this.handleToggleGroupMemberVisibility.bind(this);
  }

  /**
   * Returns the CSS class name for the list item, reflecting the removed state.
   * @returns {string}
   */
  getClassName() {
    let className = "row has-caret";
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
   * Handle the toggle of group member visibility for this permission entry.
   */
  handleToggleGroupMemberVisibility() {
    this.props.onToggleGroupMemberVisibility(this.props.id);
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
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    //@todo: to remove, it's a quick & dirty fix to make sure the count is displayed. Later on the groups need to be full loaded and not rely on that `user_count`
    const groupMembersCount = this.props.membersCount ? this.props.membersCount : this.props.group.user_count;

    const isInputDisabled = this.props.disabled || this.isRemoved;
    return (
      <li id={`permission-item-${this.props.id}`} className={this.getClassName()}>
        <button
          type="button"
          className="link no-border group-visibility-toggle"
          onClick={this.handleToggleGroupMemberVisibility}
        >
          {this.props.shouldDisplayGroupMembers ? (
            <CaretDownSVG className="baseline svg-icon" />
          ) : (
            <CaretRightSVG className="baseline svg-icon" />
          )}
        </button>
        <GroupAvatar group={this.props.group} />

        <div className="aro">
          <div className="aro-name">
            <span className="ellipsis">{this.props.group.name}</span>
          </div>
          <div className="aro-details">
            <span className="ellipsis">
              {this.props.membersCount != null
                ? this.translate("Group with {{count}} member", { count: groupMembersCount })
                : this.translate("Group")}
            </span>
          </div>
        </div>

        {this.props.variesDetails && this.isVarying && !this.isRemoved && (
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

GroupPermissionItem.defaultProps = {
  shouldDisplayGroupMembers: false,
};

GroupPermissionItem.propTypes = {
  id: PropTypes.string, // uuid
  group: PropTypes.object, // {id: <uuid>, name: <string>}
  membersCount: PropTypes.number, // The group member count (controlled mode only), null otherwise
  variesDetails: PropTypes.object, // {type: [resource1, ...resourceN]}
  changeStatus: PropTypes.string, // A ShareChanges.CHANGE_STATUS_* value, null when unchanged
  disabled: PropTypes.bool,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onRevert: PropTypes.func,
  onToggleGroupMemberVisibility: PropTypes.func,
  shouldDisplayGroupMembers: PropTypes.bool,
  permissionType: PropTypes.number,
  isReadOnly: PropTypes.bool,
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(GroupPermissionItem);
