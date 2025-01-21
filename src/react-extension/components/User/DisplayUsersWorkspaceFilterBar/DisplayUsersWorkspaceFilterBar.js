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

import React from "react";
import PropTypes from "prop-types";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import UserCogSVG from "../../../../img/svg/user_cog.svg";
import UserXSVG from "../../../../img/svg/user_x.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CloseSVG from "../../../../img/svg/close.svg";
import {withRouter} from "react-router-dom";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";

/**
 * This component allows to filter resources
 */
class DisplayUsersWorkspaceFilterBar extends React.Component {
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
    this.handleSuspendedStatusClick = this.handleSuspendedStatusClick.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
  }

  /**
   * Is all items filter
   * @returns {boolean}
   */
  get isAllItemsFilterToDisplay() {
    const filterType = this.props.userWorkspaceContext.filter.type;
    return filterType !== UserWorkspaceFilterTypes.SUSPENDED_USER;
  }

  /**
   * Get selected filter to display
   * @returns {Element}
   */
  get displaySelectedFilter() {
    switch (this.props.userWorkspaceContext.filter.type) {
      case UserWorkspaceFilterTypes.SUSPENDED_USER:
        return <>
          <UserXSVG/>
          <span><Trans>Suspended</Trans></span>
        </>;
      default:
        return <>
        </>;
    }
  }

  /**
   * Whenever the filter "Items I own" has been selected
   */
  handleSuspendedStatusClick() {
    const filter = {type: UserWorkspaceFilterTypes.SUSPENDED_USER};
    this.props.history.push({pathname: '/app/users', state: {filter}});
  }

  /**
   * Whenever a filter has been removed go back to all items filter
   */
  handleRemoveFilterClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.ALL};
    this.props.history.push({pathname: '/app/users', state: {filter}});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const shouldDisplayAllStatusDropdown = this.isAllItemsFilterToDisplay;
    return (
      <div className="actions-filter" ref={this.props.actionsFilterRef}>
        {shouldDisplayAllStatusDropdown &&
          <Dropdown>
            <DropdownButton>
              <UserCogSVG/>
              <span><Trans>All statuses</Trans></span>
              <CaretDownSVG/>
            </DropdownButton>
            <DropdownMenu>
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.handleSuspendedStatusClick}>
                  <UserXSVG/>
                  <span><Trans>Suspended</Trans></span>
                </button>
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
        }
        {!shouldDisplayAllStatusDropdown &&
          <div className="button button-action-filtered">
            {this.displaySelectedFilter}
            <span className="divider">
              <button type="button" className="button-transparent" onClick={this.handleRemoveFilterClick}>
                <CloseSVG className="close"/>
              </button>
            </span>
          </div>
        }
      </div>
    );
  }
}

DisplayUsersWorkspaceFilterBar.propTypes = {
  actionsFilterRef: PropTypes.object, // The forwarded ref of the filters buttons container
  passwordExpiryContext: PropTypes.object, // the password expiry context
  history: PropTypes.object, // The history property
  userWorkspaceContext: PropTypes.any, // the resource workspace context
  t: PropTypes.func, // The translation function
};

export default withRouter(withUserWorkspace(withTranslation('common')(DisplayUsersWorkspaceFilterBar)));
