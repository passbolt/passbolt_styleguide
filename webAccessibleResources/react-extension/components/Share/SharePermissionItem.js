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
import Icon from "../../../shared/components/Icons/Icon";
import Tooltip from "../Common/Tooltip/Tooltip";
import Select from "../Common/Select/Select";

class SharePermissionItem extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    if (!Number.isInteger(props.permissionType)) {
      throw new TypeError(this.translate("Invalid permission type for share permission item."));
    }
    this.state.permissionType = props.permissionType;
    this.bindEventHandlers();
  }

  /**
   * Component did mount
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    if (this.isUser()) {
      const gpgKey = await this.findUserGpgKey(this.props.aro.profile.user_id);
      this.setState({gpgKey});
    }
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
  }

  /**
   * Find a user gpg key
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async findUserGpgKey(userId) {
    return await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', userId);
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
      return `${profile.first_name} ${profile.last_name}`;
    } else {
      return this.props.aro.name;
    }
  }

  /**
   * Get the tooltip message
   * @returns {JSX.Element}
   */
  get tooltipMessage() {
    return <>
      <div className="email"><strong>{this.props.aro.username}</strong></div>
      <div className="fingerprint">{this.formatFingerprint(this.state.gpgKey.fingerprint)}</div>
    </>;
  }

  /**
   * Format fingerprint
   * @param {string} fingerprint An user finger print
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
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

  /**
   * Has a gpg key fingerprint
   * @returns {*}
   */
  hasGpgKey() {
    return this.state.gpgKey && this.state.gpgKey.fingerprint;
  }

  getClassName() {
    let className = 'row';
    if (this.props.updated) {
      className += ' permission-updated';
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
            {this.hasGpgKey() &&
              <Tooltip message={this.tooltipMessage}>
                <Icon name="info-circle"/>
              </Tooltip>
            }
          </div>
          <div className="aro-details">
            <span className="ellipsis">{this.getAroDetails()}</span>
          </div>
        </div>

        {(this.props.variesDetails) &&
          <Tooltip message={<ShareVariesDetails variesDetails={this.props.variesDetails} />} direction="left">
            <Icon name="info-circle"/>
          </Tooltip>
        }

        <div className="rights">
          <Select name="permissionSelect"
            className={this.getSelectClassName()}
            items={this.permissions}
            value={this.state.permissionType.toString()}
            disabled={this.isInputDisabled()}
            onChange={this.handleUpdate}
            direction={this.props.isLastItemDisplayed ? "top" : "bottom"}
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
  isLastItemDisplayed: PropTypes.bool,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(SharePermissionItem));
