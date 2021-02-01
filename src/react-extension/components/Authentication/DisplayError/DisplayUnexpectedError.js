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
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";

class DisplayUnexpectedError extends Component {
  /**
   * Whenever the user click on the action
   */
  onClick() {
    document.location.reload();
  }

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
      <div className="setup-error">
        <h1>{this.translate("Something went wrong.")}</h1>
        <p>{this.translate("The operation failed with the following error:")}</p>
        <p>{this.props.error && this.props.error.message}</p>
        <div className="form-actions">
          <button onClick={this.onClick.bind(this)} className="button primary big full-width" role="button">{this.translate("Try again")}</button>
        </div>
      </div>
    );
  }
}

DisplayUnexpectedError.propTypes = {
  error: PropTypes.any, // The error to display
  errorActionLabel: PropTypes.string, // The action label
  errorActionCallback: PropTypes.func, // The action callback
  t: PropTypes.func, // The translation function
};
export default withTranslation('common')(DisplayUnexpectedError);
