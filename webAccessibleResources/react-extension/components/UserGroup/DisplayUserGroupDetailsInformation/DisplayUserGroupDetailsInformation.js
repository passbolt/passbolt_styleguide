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
import Icon from "../../../../shared/components/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";

/**
 * This component displays the group details about information
 */
class DisplayUserGroupDetailsInformation extends React.Component {
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
  get group() {
    return this.props.userWorkspaceContext.details.group;
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   */
  render() {
    const created = formatDateTimeAgo(this.group.created, this.props.t, this.props.context.locale);
    const modified = formatDateTimeAgo(this.group.modified, this.props.t, this.props.context.locale);
    const modifiedByUser = this.props.context.users.find(user => user.id === this.group.modified_by);
    const modifiedByUserName = modifiedByUser ? `${modifiedByUser.profile.first_name} ${modifiedByUser.profile.last_name}` : this.translate("Unknown user");
    const membersCount = this.group.groups_users.length;
    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button type="button" className="link no-border" onClick={this.handleTitleClicked}>
              <Trans>Information</Trans>
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          <ul>
            <li className="created">
              <span className="label"><Trans>Created</Trans></span>
              <span className="value" title={this.group.created}>{created}</span>
            </li>
            <li className="modified">
              <span className="label"><Trans>Modified</Trans></span>
              <span className="value" title={this.group.modified}>{modified}</span>
            </li>
            <li className="modified-by">
              <span className="label"><Trans>Modified by</Trans></span>
              <span className="value">{modifiedByUserName}</span>
            </li>
            <li className="members">
              <span className="label"><Trans>Members</Trans></span>
              <span className="value">{membersCount}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserGroupDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.object, // The user workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withUserWorkspace(withTranslation('common')(DisplayUserGroupDetailsInformation)));
