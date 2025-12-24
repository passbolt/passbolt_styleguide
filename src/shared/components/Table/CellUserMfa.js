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
 * This component represents a table cell user MFA
 */
class CellUserMfa extends Component {
  /**
   * Get the value
   * @return {string}
   */
  get value() {
    return this.props.value ? this.props.t("Enabled") : this.props.t("Disabled");
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

CellUserMfa.propTypes = {
  value: PropTypes.bool, // The value to display
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(CellUserMfa);
