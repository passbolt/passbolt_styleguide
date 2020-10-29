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
 * @since         2.13.0
 */

import React from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import Icon from "../../Common/Icons/Icon";
import {withDialog} from "../../../contexts/Common/DialogContext";
import EditUserProfile from "../EditUserProfile/EditUserProfile";

/**
 * This component is a container of multiple actions applicable on user settings
 */
class DisplayUserSettingsWorkspaceActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }


  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEdit = this.handleEdit.bind(this);
  }


  /**
   * Whenever the user wants to edit his profile
   */
  handleEdit() {
    this.props.dialogContext.open(EditUserProfile);
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <ul className="ready">
            <li>
              <a
                className="button ready"
                onClick={this.handleEdit}>
                <Icon name="edit"/>
                <span>Edit</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserSettingsWorkspaceActions.contextType = AppContext;

DisplayUserSettingsWorkspaceActions.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
};

export default withDialog(DisplayUserSettingsWorkspaceActions);
