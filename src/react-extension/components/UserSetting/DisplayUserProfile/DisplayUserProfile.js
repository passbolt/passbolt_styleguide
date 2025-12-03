
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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import {formatDateTimeAgo} from '../../../../shared/utils/dateUtils';
import EditUserProfile from "../EditUserProfile/EditUserProfile";

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
    this.handleEdit = this.handleEdit.bind(this);
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
   * Whenever the user wants to edit his profile
   */
  handleEdit() {
    this.props.dialogContext.open(EditUserProfile);
  }


  render() {
    return (
      this.user &&
        <>
          <div className="profile main-column">
            <div className="main-content">
              <h3><Trans>Profile</Trans></h3>
              <table className="table-info detailed-information">
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
                    <td className="value" title={this.user.modified}>{formatDateTimeAgo(this.user.modified, this.props.t, this.props.context.locale)}</td>
                  </tr>
                  <tr className="created">
                    <td className="label"><Trans>Created</Trans></td>
                    <td className="value" title={this.user.created}>{formatDateTimeAgo(this.user.created, this.props.t, this.props.context.locale)}</td>
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
          </div>
          <div className="actions-wrapper">
            <button className="button primary form" type="button" onClick={this.handleEdit}>
              <span><Trans>Edit</Trans></span>
            </button>
          </div>
        </>
    );
  }
}

DisplayUserProfile.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.object, // The dialog context
  userSettingsContext: PropTypes.object, // The user settings context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any // The i18n context translation
};

export default withAppContext(withDialog(withUserSettings(withTranslation('common')(DisplayUserProfile))));
