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
import ShareVariesDetails from "./ShareVariesDetails";
import GroupAvatar from "../Common/Avatar/GroupAvatar";
import { withTranslation } from "react-i18next";
import Select from "../Common/Select/Select";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import AttentionSVG from "../../../img/svg/attention.svg";
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
    this.handleToggleGroupMemberVisibility = this.handleToggleGroupMemberVisibility.bind(this);
  }

  /**
   * Returns the CSS class name for the list item, reflecting the updated state.
   * @returns {string}
   */
  getClassName() {
    let className = "row";
    if (this.props.updated) {
      className += " permission-updated";
    }
    if (this.props.canDisplayGroupMembers) {
      className += " has-caret";
    }
    return className;
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
   * Handle the toggle of group member visibility for this permission entry.
   */
  handleToggleGroupMemberVisibility() {
    this.props.onToggleGroupMemberVisibility(this.props.id);
  }

  /**
   * Get the permissions
   * @returns {[{label: string, value: string}]}
   */
  get permissions() {
    const permissions = [
      { value: "1", label: this.translate("can read") },
      { value: "7", label: this.translate("can update") },
      { value: "15", label: this.translate("is owner") },
    ];
    if (this.props.variesDetails) {
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
    const isInputDisabled = this.props.disabled;
    return (
      <li id={`permission-item-${this.props.id}`} className={this.getClassName()}>
        {this.props.canDisplayGroupMembers && (
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
        )}
        <GroupAvatar group={this.props.group} />

        <div className="aro">
          <div className="aro-name">
            <span className="ellipsis">{this.props.group.name}</span>
          </div>
          <div className="aro-details">
            <span className="ellipsis">
              {this.props.membersCount != null
                ? this.translate("Group with {{count}} member", { count: this.props.membersCount })
                : this.translate("Group")}
            </span>
          </div>
        </div>

        {this.props.variesDetails && (
          <TooltipPortal message={<ShareVariesDetails variesDetails={this.props.variesDetails} />}>
            <AttentionSVG className="attention-required" />
          </TooltipPortal>
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

        <div className="actions">
          <SharePermissionDeleteButton onClose={this.handleDelete} disabled={isInputDisabled} />
        </div>
      </li>
    );
  }
}

GroupPermissionItem.defaultProps = {
  shouldDisplayGroupMembers: false,
  canDisplayGroupMembers: false,
};

GroupPermissionItem.propTypes = {
  id: PropTypes.string, // uuid
  group: PropTypes.object, // {id: <uuid>, name: <string>}
  membersCount: PropTypes.number, // The group member count (controlled mode only), null otherwise
  variesDetails: PropTypes.object, // {type: [resource1, ...resourceN]}
  updated: PropTypes.bool,
  disabled: PropTypes.bool,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleGroupMemberVisibility: PropTypes.func,
  shouldDisplayGroupMembers: PropTypes.bool,
  canDisplayGroupMembers: PropTypes.bool,
  permissionType: PropTypes.number,
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(GroupPermissionItem);
