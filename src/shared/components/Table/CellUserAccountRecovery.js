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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

/**
 * This component represents a table cell user account recovery status
 */
class CellUserAccountRecovery extends Component {
  /**
   * Get the value
   * @return {string}
   */
  get value() {
    switch (this.props.value) {
      case "approved":
        return this.props.t("Approved");
      case "rejected":
        return this.props.t("Rejected");
      default:
        return this.props.t("Pending");
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div title={this.value}>
        <span>{this.value}</span>
      </div>
    );
  }
}

CellUserAccountRecovery.propTypes = {
  value: PropTypes.object, // The value to display
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(CellUserAccountRecovery);
