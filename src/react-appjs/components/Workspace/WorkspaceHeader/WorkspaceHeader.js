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
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import ActionBar from "../ActionBar/ActionBar";

class WorkspaceHeader extends Component {
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
      searchBarOptions: this.props.searchBarOptions || SearchBar.defaultProps
    }
  }

  onMenuItemClick(menuItem) {
    this.props.onMenuItemClick(menuItem);
  }

  render() {
    return (
      <div>
         <div className="header second">
            <Logo/>
            <SearchBar disabled={this.state.searchBarOptions.disabled} placeholder=" "/>
            <ProfileMenu onClick={this.onMenuItemClick.bind(this)} />
         </div>
        <ActionBar/>
      </div>
    );
  }
}

WorkspaceHeader.propTypes = {
  onMenuItemClick: PropTypes.func,
  searchBarOptions: PropTypes.object,
};


export default WorkspaceHeader;

