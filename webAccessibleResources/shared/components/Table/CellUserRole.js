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
import {withUserWorkspace} from "../../../react-extension/contexts/UserWorkspaceContext";

/**
 * This component represents a table cell user role name
 */
class CellUserRole extends Component {
  /**
   * Get the name
   * @return {Object}
   */
  get roleName() {
    return this.props.userWorkspaceContext.getTranslatedRoleName(this.props.value);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div title={this.roleName}>
        <span>
          {this.roleName}
        </span>
      </div>
    );
  }
}

CellUserRole.propTypes = {
  value: PropTypes.string.isRequired, // The value to display
  userWorkspaceContext: PropTypes.any, // The user workspace context
};

export default withUserWorkspace(CellUserRole);
