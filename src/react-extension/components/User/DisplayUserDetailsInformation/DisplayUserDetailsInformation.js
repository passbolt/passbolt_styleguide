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
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import moment from "moment";
import AppContext from "../../../contexts/AppContext";

/**
 * This component displays the user details about information
 */
class DisplayUserDetailsInformation extends React.Component {
  /**
   * Default constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      open: true // Flag for the expand / collapse mode
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * Returns the current user to detail
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * Get user role name
   */
  getRoleName() {
    if (this.context.roles) {
      const role = this.context.roles.find(role => role.id === this.user.role_id);
      return role ? role.name : "";
    }
    return "";
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string} The formatted date
   */
  formatDateTimeAgo(date) {
    const serverTimezone = this.context.siteSettings.getServerTimezone();
    return moment.tz(date, serverTimezone).fromNow();
  }

  /**
   * Render the component
   */
  render() {
    const role = this.getRoleName();
    const modified = this.formatDateTimeAgo(this.user.modified);
    const status = this.user.active ? "Activated" : "Activation pending";

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClicked}  role="button">
              Information
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        <ul className="accordion-content">
          <li className="role">
            <span className="label">Role</span>
            <span className="value capitalize">{role}</span>
          </li>
          <li className="modified">
            <span className="label">Modified</span>
            <span className="value">{modified}</span>
          </li>
          <li className="status">
            <span className="label">Status</span>
            <span className="value">{status}</span>
          </li>
        </ul>
      </div>
    );
  }
}

DisplayUserDetailsInformation.contextType = AppContext;
DisplayUserDetailsInformation.propTypes = {
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(DisplayUserDetailsInformation);
