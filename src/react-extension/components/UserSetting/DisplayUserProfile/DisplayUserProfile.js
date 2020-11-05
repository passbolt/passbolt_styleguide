
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

import React from 'react';
import PropTypes from "prop-types";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import AppContext from "../../../contexts/AppContext";
import moment from "moment-timezone";
import Icon from "../../Common/Icons/Icon";
import {withDialog} from "../../../contexts/Common/DialogContext";
import UploadUserProfileAvatar from "../UploadUserProfileAvatar/UploadUserProfileAvatar";

/**
 * This component displays the user profile information
 */
class DisplayUserProfile extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Whenever the component has been updated
   */
  async componentDidUpdate() {
    await this.populateIfNeeded();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      keyId: "" // The user key id
    };
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.context.loggedInUser;
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleUploadPicture = this.handleUploadPicture.bind(this);
  }

  /**
   * Whenever the user wants to upload a new profile's picture
   */
  handleUploadPicture() {
    this.props.dialogContext.open(UploadUserProfileAvatar);
  }

  /**
   * Populates the component with data
   */
  async populate() {
    if (this.user) {
      const keyId = await this.fetchKeyId();
      await this.setState({keyId});
    }
  }

  /**
   * Populates the component with data in case the logged in user has not been populated
   */
  async populateIfNeeded() {
    const mustPopulate = this.user && !this.state.keyId;
    const canVoid = this.user && this.state.keyId;
    if (mustPopulate) {
      const keyId = await this.fetchKeyId();
      await this.setState({keyId});
    } else if (canVoid) {
      this.populateIfNeeded = () => {};
    }
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const serverTimezone = this.context.siteSettings.getServerTimezone();
    return moment.tz(date, serverTimezone).fromNow();
  }

  /**
   * Fetch the user key id
   */
  async fetchKeyId() {
    const {keyId} = await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    return keyId;
  }

  render() {
    return (
      <div className="grid grid-responsive-12">
        {this.user &&
        <div className="row">
          <div className="profile col8">
            <h3>Profile</h3>
            <div className="section profile-detailed-information">
              <div className="avatar">
                <div className="value">
                  <UserAvatar
                    user={this.context.loggedInUser}
                    baseUrl={this.context.userSettings.getTrustedDomain()}
                    className=""/>
                </div>
                <div className="edit">
                  <a
                    className="edit-avatar-action"
                    title="Change Avatar"
                    onClick={this.handleUploadPicture}>
                    <Icon name="camera"/>
                    <span className="help-text">Upload a new picture</span>

                  </a>
                </div>
              </div>
              <table className="table-info profile">
                <tbody>
                  <tr className="name">
                    <td className="label">Name</td>
                    <td className="value">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</td>
                  </tr>
                  <tr className="email">
                    <td className="label">Email</td>
                    <td className="value">{this.user.username}</td>
                  </tr>
                  <tr className="role">
                    <td className="label">Role</td>
                    <td className="value">{this.user.role.name}</td>
                  </tr>
                  <tr className="modified">
                    <td className="label">Modified</td>
                    <td className="value">{this.formatDateTimeAgo(this.user.modified)}</td>
                  </tr>
                  <tr className="created">
                    <td className="label">Created</td>
                    <td className="value">{this.formatDateTimeAgo(this.user.created)}</td>
                  </tr>
                  <tr className="publickey_keyid">
                    <td className="label">Public key</td>
                    <td className="value">
                      {this.state.keyId}
                      <p><em>Note: Sorry, it is not possible to change your key at the
                        moment.</em></p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

DisplayUserProfile.contextType = AppContext;
DisplayUserProfile.propTypes = {
  dialogContext: PropTypes.object // The dialog context
};

export default withDialog(DisplayUserProfile);



