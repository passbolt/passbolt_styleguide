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
 * @since         3.10.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import AnimatedFeedback from "../../../../../shared/components/Icons/AnimatedFeedback";

class ApiSuccess extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div id="container" className="container api-feedback page">
        <div className="content">
          <div className="header">
            <div className="logo"><span className="visually-hidden">Passbolt</span></div>
          </div>
          <div className="api-feedback-card">
            <AnimatedFeedback name="success"/>
            <p>{this.props.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

ApiSuccess.propTypes = {
  message: PropTypes.string.isRequired, // The message to display on the UI
  t: PropTypes.func // the translation function
};

export default withTranslation("common")(ApiSuccess);
