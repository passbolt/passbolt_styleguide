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
 * @since         4.5.3
 */
import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

/**
 * This component allows to display an HTTP error page
 */
class DisplayHttpError extends React.Component {
  /**
   * Returns the title text associated to the HTTP error code passed as props.
   * @returns {string}
   */
  get errorTitle() {
    const titles = {
      403: this.props.t("Whoops... access is denied"),
      404: this.props.t("Whoops... looks like you are lost."),
    };
    return titles[this.props.errorCode] || "";
  }

  /**
   * Returns the description text associated to the HTTP error code passed as props.
   * @returns {string}
   */
  get errorDescription() {
    const descriptions = {
      403: this.props.t("Access is restricted to authorized users only."),
      404: this.props.t("We could not find the page you are looking for."),
    };
    return descriptions[this.props.errorCode] || "";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="http-error main-column">
          <div className="main-content">
            <h3>{this.props.errorCode}</h3>
            <h4>{this.errorTitle}</h4>
            <div>
              <p>{this.errorDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayHttpError.propTypes = {
  errorCode: PropTypes.number.isRequired, // The HTTP error code
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(DisplayHttpError);
