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
 * @since         3.0.0
 */
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";

class CheckMailBox extends Component {
  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="email-sent-instructions">
        <div className="email-sent-bg">
        </div>
        <h1>{this.translate("Check your mailbox!")}</h1>
        <p>{this.translate("We send you a link to verify your email.")}<br/>
          {this.translate("Check your spam folder if you do not see hear from us after a while.")}</p>
      </div>
    );
  }
}

CheckMailBox.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(CheckMailBox);
