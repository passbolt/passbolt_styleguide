
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
import UserAvatar from "../../../../react/components/Common/Avatar/UserAvatar";
import AppContext from "../../../contexts/AppContext";
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import UploadUserProfileAvatar from "../UploadUserProfileAvatar/UploadUserProfileAvatar";
import {withTranslation} from "react-i18next";
import {DateTime} from "luxon";

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
    this.bindHandlers();
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
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    return DateTime.fromISO(date).toRelative({locale: this.props.i18n.lng});
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
      <div className="grid grid-responsive-12 profile-detailed-information">
        {this.user &&
        <div className="row">
          <div className="profile col6">
            <h3>Profile</h3>
            <table className="table-info profile">
              <tbody>
                <tr className="name">
                  <td className="label">{this.translate("Name")}</td>
                  <td className="value">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</td>
                </tr>
                <tr className="email">
                  <td className="label">{this.translate("Email")}</td>
                  <td className="value">{this.user.username}</td>
                </tr>
                <tr className="role">
                  <td className="label">{this.translate("Role")}</td>
                  <td className="value">{this.user.role.name}</td>
                </tr>
                <tr className="modified">
                  <td className="label">{this.translate("Modified")}</td>
                  <td className="value">{this.formatDateTimeAgo(this.user.modified)}</td>
                </tr>
                <tr className="created">
                  <td className="label">{this.translate("Created")}</td>
                  <td className="value">{this.formatDateTimeAgo(this.user.created)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="avatar col6 last">
            <h3>{this.translate("Avatar")}</h3>
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
                  <span className="help-text">{this.translate("Upload a new avatar picture")}</span>
                </a>
              </div>
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
  dialogContext: PropTypes.object, // The dialog context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any // The i18n context translation
};

export default withDialog(withTranslation('common')(DisplayUserProfile));
