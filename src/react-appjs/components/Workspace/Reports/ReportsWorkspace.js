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
import React, {Component} from "react";
import PropTypes from "prop-types";
import WorkspaceHeader from "../WorkspaceHeader/WorkspaceHeader";
import Panel from "../Panel/Panel";

class ReportsWorkspace extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
    }
  }

  onMenuItemClick(menuItem) {
    this.props.onMenuItemClick(menuItem);
  }

  render() {
    return (
      <div>
        <WorkspaceHeader onMenuItemClick={this.onMenuItemClick.bind(this)} searchBarOptions={{disabled:true}}/>
        <Panel />
      </div>
    );
  }
}

ReportsWorkspace.propTypes = {
  onMenuItemClick: PropTypes.func,
};

export default ReportsWorkspace;

