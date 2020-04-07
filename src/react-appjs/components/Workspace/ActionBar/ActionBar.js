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
                  <a id="js_wk_menu_edition_button" className="button mad_controller_component_button_controller mad_view_view js_component" href="demo/legacy/AD_admin_email_notifications.php">
                    <i className="fa fa-fw fa-save"></i>
                    <span>Save settings</span>
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

