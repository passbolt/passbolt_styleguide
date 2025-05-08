/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

import SharePermissionDeleteButton from "./SharePermissionDeleteButton";
import ShareVariesDetails from "./ShareVariesDetails";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import UserAvatar from "../Common/Avatar/UserAvatar";
import GroupAvatar from "../Common/Avatar/GroupAvatar";
import {withTranslation} from "react-i18next";
import Select from "../Common/Select/Select";
import {isUserSuspended} from "../../../shared/utils/userUtils";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import TooltipMessageFingerprintLoading from "../Common/Tooltip/TooltipMessageFingerprintLoading";
import Fingerprint from "../Common/Fingerprint/Fingerprint";
import AttentionSVG from "../../../img/svg/attention.svg";
import FingerprintSVG from "../../../img/svg/fingerprint.svg";

class SharePermissionItem extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    if (!Number.isInteger(props.permissionType)) {
      throw new TypeError(this.translate("Invalid permission type for share permission item."));
    }
    this.state.permissionType = props.permissionType;
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
   *  Invoked immediately after updating occurs. This method is not called for the initial render.
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.permissionType !== this.props.permissionType) {
      this.setState({permissionType: this.props.permissionType});
    }
  }

  bindEventHandlers() {
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTooltipFingerprintMouseHover = this.onTooltipFingerprintMouseHover.bind(this);
  }

  /**
   * R
   * @returns {string} Group or User name
   */
  getAroDetails() {
    if (this.props.aro.profile) {
      return this.props.aro.username;
    } else {
      return 'Group';
    }
  }

  isInputDisabled() {
    return this.props.disabled;
  }

  getSelectClassName() {
    if (this.isInputDisabled()) {
      return 'permission inline disabled';
    }
    return 'permission inline';
  }

  getAroName() {
    if (this.props.aro.profile) {
      const profile = this.props.aro.profile;
      return `${profile.first_name} ${profile.last_name}${this.isUserSuspended ? ` ${this.translate('(suspended)')}` : ''}`;
    } else {
      return this.props.aro.name;
    }
  }

  /**
   * Handle whenever the user passes its mouse hover the tooltip.
   * @returns {Promise<JSX>}
   */
  async onTooltipFingerprintMouseHover() {
    if (this.state.tooltipFingerprintMessage) {
      return;
    }

    const gpgkey = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.props.aro.id);
    const tooltipFingerprintMessage = <Fingerprint fingerprint={gpgkey.fingerprint}/>;
    this.setState({tooltipFingerprintMessage});
  }

  /**
   * Return true if aro in props is a user
   * @returns {boolean}
   */
  isUser() {
    return !this.isGroup();
  }

  /**
   * Return true if aro in props is a group
   * @returns {boolean}
   */
  isGroup() {
    return !(this.props.aro && this.props.aro.profile);
  }

  getClassName() {
    let className = 'row';
    if (this.props.updated) {
      className += ' permission-updated';
    }
    if (this.isUserSuspended) {
      className += ' suspended';
    }
    return className;
  }

  handleUpdate(event) {
    const newType = parseInt(event.target.value);
    this.props.onUpdate(this.props.id, newType);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  /**
   * Get the permissions
   * @returns {[{label: string, value: string}]}
   */
  get permissions() {
    const permissions = [
      {value: "1", label: this.translate("can read")},
      {value: "7", label: this.translate("can update")},
      {value: "15", label: this.translate("is owner")},
    ];
    if (this.props.variesDetails) {
      permissions.push({value: "-1", label: this.translate("varies")});
    }
    return permissions;
  }

  /**
   * Returns true if the feature flag disableUser is enabled and the given user is suspended.
   * @param {object} user
   * @returns {boolean}
   */
  get isUserSuspended() {
    return this.props.context.siteSettings.canIUse('disableUser') && isUserSuspended(this.props.aro);
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
      <li id={`permission-item-${this.props.id}`} className={this.getClassName()}>
        {this.isUser() &&
        <UserAvatar user={this.props.aro} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
        }
        {this.isGroup() &&
        <GroupAvatar group={this.props.aro}/>
        }

        <div className="aro">
          <div className="aro-name">
            <span className="ellipsis">{this.getAroName()}</span>
            {this.isUser() &&
              <TooltipPortal
                message={this.state.tooltipFingerprintMessage || <TooltipMessageFingerprintLoading />}
                onMouseHover={this.onTooltipFingerprintMouseHover}>
                <FingerprintSVG/>
              </TooltipPortal>
            }
          </div>
          <div className="aro-details">
            <span className="ellipsis">{this.getAroDetails()}</span>
          </div>
        </div>

        {(this.props.variesDetails) &&
          <TooltipPortal
            message={<ShareVariesDetails variesDetails={this.props.variesDetails} />}>
            <AttentionSVG className="attention-required"/>
          </TooltipPortal>
        }

        <div className="rights">
          <Select name="permissionSelect"
            className={this.getSelectClassName()}
            items={this.permissions}
            value={this.state.permissionType.toString()}
            disabled={this.isInputDisabled()}
            onChange={this.handleUpdate}
            direction="bottom"
          />
        </div>

        <div className="actions">
          <SharePermissionDeleteButton onClose={this.handleDelete} disabled={this.isInputDisabled()}/>
        </div>
      </li>
    );
  }
}

SharePermissionItem.propTypes = {
  context: PropTypes.any, // The application context
  id: PropTypes.string, // uuid
  aro: PropTypes.object, // {id: <uuid>, name: <string>, ...etc}
  variesDetails: PropTypes.object, // {type: [resource1, ...resourceN]}
  updated: PropTypes.bool,
  disabled: PropTypes.bool,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  permissionType: PropTypes.number,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(SharePermissionItem));
