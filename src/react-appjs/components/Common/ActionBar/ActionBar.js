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

class ActionBar extends Component {
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

  render() {
    return (
      <div className="header third">
        <div className="col1">
        </div>
        <div className="col2_3 actions-wrapper">
          <ul id="js_wsp_primary_menu" className="actions mad_controller_component_tab_controller mad_view_component_tab js_component ready">
            <div className="js_tabs_content tabs-content">
              <div id="js_passbolt_passwordWorkspaceMenu_controller" className="passbolt_controller_component_password_workspace_menu_controller mad_view_view tab-content selected selection">
                <li>
                  <a id="js_wk_menu_edition_button" className="button mad_controller_component_button_controller mad_view_view js_component" href="demo/legacy/LU_users_profile_edit.php">
						        <span className="svg-icon">
							        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>
						        </span>
                    <span>&nbsp;Print</span>
                  </a>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

ActionBar.propTypes = {
};


export default ActionBar;

