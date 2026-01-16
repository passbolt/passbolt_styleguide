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
import { withRouter } from "react-router-dom";
import { UserWorkspaceFilterTypes, withUserWorkspace } from "../../../contexts/UserWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import HomeSVG from "../../../../img/svg/home.svg";

/**
 * This component allows to select shortcut filters applied on users
 */
class FilterUsersByShortcut extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindHandlers();
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleAllItemsClick = this.handleAllItemsClick.bind(this);
    this.handleRecentlyModifiedClick = this.handleRecentlyModifiedClick.bind(this);
    this.handleSuspendedUsersClick = this.handleSuspendedUsersClick.bind(this);
  }

  /**
   * Returns true if the Home shortcut is currently selected
   */
  get isAllItemsSelected() {
    return this.props.userWorkspaceContext.filter.type === UserWorkspaceFilterTypes.ALL;
  }

  /**
   * Returns true if the Recently Modified shortcut is currently selected
   */
  get isRecentlyModifiedSelected() {
    return this.props.userWorkspaceContext.filter.type === UserWorkspaceFilterTypes.RECENTLY_MODIFIED;
  }

  /**
   * Returns true if the Suspended users shortcut is currently selected
   */
  get isSuspendedUsersSelected() {
    return this.props.userWorkspaceContext.filter.type === UserWorkspaceFilterTypes.SUSPENDED_USER;
  }

  /**
   * Whenever the shortcut "Home" has been selected
   */
  handleAllItemsClick() {
    const filter = { type: UserWorkspaceFilterTypes.ALL };
    this.props.history.push({ pathname: "/app/users", state: { filter } });
  }

  /**
   * Whenever the shortcut "Recently modified" has been selected
   */
  handleRecentlyModifiedClick() {
    const filter = { type: UserWorkspaceFilterTypes.RECENTLY_MODIFIED };
    this.props.history.push({ pathname: "/app/users", state: { filter } });
  }

  /**
   * Whenever the shortcut "Suspended users" has been selected
   */
  handleSuspendedUsersClick() {
    const filter = { type: UserWorkspaceFilterTypes.SUSPENDED_USER };
    this.props.history.push({ pathname: "/app/users", state: { filter } });
  }

  /**
   * Returns true if the 'Suspended users' filter should be displayed
   * @returns {boolean}
   */
  get shouldDisplaySuspendedUsersFilter() {
    return this.props.userWorkspaceContext.shouldDisplaySuspendedUsersFilter();
  }

  render() {
    return (
      <div className="navigation-secondary navigation-shortcuts">
        <ul>
          <li>
            <div className={`row ${this.isAllItemsSelected ? "selected" : ""}`} onClick={this.handleAllItemsClick}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" id="all-users">
                    <HomeSVG />
                    <span>
                      <Trans>Home</Trans>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

FilterUsersByShortcut.propTypes = {
  history: PropTypes.object,
  userWorkspaceContext: PropTypes.object,
};

export default withRouter(withUserWorkspace(withTranslation("common")(FilterUsersByShortcut)));
