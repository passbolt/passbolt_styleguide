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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Password from "../../../../shared/components/Password/Password";
import DiceSVG from "../../../../img/svg/dice.svg";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";

class AddResourcePassword extends Component {
  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <>
        <div className="title">
          <h2><Trans>Password</Trans></h2>
        </div>
        <div className="content">
          <div className="password-fields">
            <div className="input text">
              <label htmlFor="resource-uri"><Trans>URI</Trans></label>
              <input id="resource-uri" name="uri" maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")}/>
            </div>
            <div className="input text">
              <label htmlFor="resource-username"><Trans>Username</Trans></label>
              <input id="resource-username" name="username" type="text" className="fluid" maxLength="255" autoComplete="off" placeholder={this.translate("Username")}/>
            </div>
            <div className="input-password-wrapper input">
              <label htmlFor="resource-password">
                <Trans>Password</Trans>
              </label>
              <div className="password-button-inline">
                <Password id="resource-password" name="password" autoComplete="new-password" placeholder={this.translate("Password")} preview={true} value={""}/>
                <button type="button" className="password-generate button-icon">
                  <DiceSVG/>
                </button>
              </div>
              <PasswordComplexity/>
            </div>
          </div>
        </div>

      </>
    );
  }
}

AddResourcePassword.propTypes = {
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(AddResourcePassword);

