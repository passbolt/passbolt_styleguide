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
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import DisplaySimulateSynchronizeUserDirectoryAdministrationDialog
  from "../DisplaySimulateSynchronizeUserDirectoryAdministration/DisplaySimulateSynchronizeUserDirectoryAdministrationDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";

/**
 * This component is a container of multiple actions applicable on setting
 */
class DisplayAdministrationWorkspaceActions extends React.Component {
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
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTestClick = this.handleTestClick.bind(this);
    this.handleSimulateSynchronizeClick = this.handleSimulateSynchronizeClick.bind(this);
  }

  /**
   * Handle save settings
   */
  handleSaveClick() {
    this.props.administrationWorkspaceContext.onMustSaveSettings();
  }

  /**
   * Handle test settings
   */
  handleTestClick() {
    this.props.administrationWorkspaceContext.onMustTestSettings();
  }

  /**
   * Handle simulate synchronize settings
   */
  handleSimulateSynchronizeClick() {
    this.props.dialogContext.open(DisplaySimulateSynchronizeUserDirectoryAdministrationDialog);
  }

  /**
   * Handle synchronize settings
   */
  handleSynchronizeClick() {
  }

  /**
   * Is save button enable
   */
  isSaveEnabled() {
    return this.props.administrationWorkspaceContext.isSaveEnabled;
  }

  /**
   * Is save button enable
   */
  isTestEnabled() {
    return this.props.administrationWorkspaceContext.isTestEnabled;
  }

  /**
   * Is save button enable
   */
  isSynchronizeEnabled() {
    return this.props.administrationWorkspaceContext.isTestEnabled;
  }

  /**
   * Is save button enable
   */
  isSynchronizeEnabled() {
    return this.props.administrationWorkspaceContext.isSynchronizeEnabled;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <div>
            <li>
              <a className={`button  ${this.isSaveEnabled() ? "" : "disabled"}`} onClick={this.handleSaveClick}>
                <Icon name="save"/>
                <span>save settings</span>
              </a>
            </li>
            <li>
              <a className={`button  ${this.isTestEnabled() ? "" : "disabled"}`} onClick={this.handleTestClick}>
                <Icon name="plug"/>
                <span>test settings</span>
              </a>
            </li>
            <li>
              <a className={`button  ${this.isSynchronizeEnabled() ? "" : "disabled"}`} onClick={this.handleSimulateSynchronizeClick}>
                <Icon name="magic-wand"/>
                <span>simulate synchronize</span>
              </a>
            </li>
            <li>
              <a className={`button  ${this.isSynchronizeEnabled() ? "" : "disabled"}`} onClick={this.handleSynchronizeClick}>
                <Icon name="refresh"/>
                <span>synchronize</span>
              </a>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationWorkspaceActions.contextType = AppContext;

DisplayAdministrationWorkspaceActions.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  dialogContext: PropTypes.any // The dialog context
};

export default withDialog(withAdministrationWorkspace(DisplayAdministrationWorkspaceActions));
