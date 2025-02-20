
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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withDialog} from "../../../contexts/DialogContext";
import UploadUserProfileAvatar from "../UploadUserProfileAvatar/UploadUserProfileAvatar";
import {Trans, withTranslation} from "react-i18next";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import {formatDateTimeAgo} from '../../../../shared/utils/dateUtils';
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
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
    return this.props.context.loggedInUser;
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
   * Get the locale label.
   */
  get userLocaleLabel() {
    const supportedLocales = this.props.context.siteSettings.supportedLocales || [];
    const locale = supportedLocales.find(supportedLocale => supportedLocale.locale === this.props.context.locale);
    return locale ? locale.label : "N/A";
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Can I use the locale plugin.
   * @type {boolean}
   */
  get canIUseLocale() {
    return this.props.context.siteSettings.canIUse('locale');
  }

  /**
   * Can the user access upload a new avatar capability.
   * @returns {bool}
   */
  get canIUseUploadAvatarCapability() {
    return this.props.rbacContext.canIUseUiAction(uiActions.AVATAR_UPLOAD);
  }


  render() {
    return (
      <div className="grid grid-responsive-12 profile-detailed-information">
        {this.user &&
        <div className="row">
          <div className="profile col6 main-column">
            <h3><Trans>Profile</Trans></h3>
            <table className="table-info profile">
              <tbody>
                <tr className="name">
                  <td className="label"><Trans>Name</Trans></td>
                  <td className="value">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</td>
                </tr>
                <tr className="email">
                  <td className="label"><Trans>Email</Trans></td>
                  <td className="value">{this.user.username}</td>
                </tr>
                <tr className="role">
                  <td className="label"><Trans>Role</Trans></td>
                  <td className="value">{this.user.role.name}</td>
                </tr>
                <tr className="modified">
                  <td className="label"><Trans>Modified</Trans></td>
                  <td className="value">{formatDateTimeAgo(this.user.modified, this.props.t, this.props.context.locale)}</td>
                </tr>
                <tr className="created">
                  <td className="label"><Trans>Created</Trans></td>
                  <td className="value">{formatDateTimeAgo(this.user.created, this.props.t, this.props.context.locale)}</td>
                </tr>
              </tbody>
            </table>
            {this.canIUseLocale &&
            <>
              <h4><Trans>Internationalisation</Trans></h4>
              <table className="table-info profile">
                <tbody>
                  <tr className="locale">
                    <td className="label"><Trans>Language</Trans></td>
                    <td className="value">{this.userLocaleLabel}</td>
                  </tr>
                </tbody>
              </table>
            </>
            }
          </div>
          <div className="col5 secondary-column last">
            <div className="sidebar">
              <h3><Trans>Avatar</Trans></h3>
              <div className="avatar">
                <div className="value">
                  <UserAvatar
                    user={this.props.context.loggedInUser}
                    baseUrl={this.props.context.userSettings.getTrustedDomain()}
                    className=""/>
                </div>
              </div>
              {
                this.canIUseUploadAvatarCapability && <div>
                  <button
                    className="button edit-avatar-action"
                    title={this.translate("Upload a new avatar picture")}
                    type="button"
                    onClick={this.handleUploadPicture}>
                    <Icon name="upload"/>
                    <span className="help-text"><Trans>Upload a new avatar picture</Trans></span>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

DisplayUserProfile.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.object, // The rbac context
  dialogContext: PropTypes.object, // The dialog context
  userSettingsContext: PropTypes.object, // The user settings context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any // The i18n context translation
};

export default withAppContext(withDialog(withUserSettings(withRbac(withTranslation('common')(DisplayUserProfile)))));
