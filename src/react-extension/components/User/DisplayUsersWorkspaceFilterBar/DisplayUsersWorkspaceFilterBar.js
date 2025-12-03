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
import AttentionSVG from "../../../../img/svg/attention.svg";
import BuoySVG from "../../../../img/svg/buoy.svg";
import MetadataKeySVG from "../../../../img/svg/metadata_key.svg";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {isAccountRecoveryRequested, isMissingMetadataKey} from "../../../../shared/utils/userUtils";


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
    this.handleAccountRecoveryRequestClick = this.handleAccountRecoveryRequestClick.bind(this);
    this.handleMissingMetadataKeyClick = this.handleMissingMetadataKeyClick.bind(this);
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
      case UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST:
        return <>
          <BuoySVG/>
          <span><Trans>Account Recovery Requests</Trans></span>
        </>;
      case UserWorkspaceFilterTypes.MISSING_METADATA_KEY:
        return <>
          <MetadataKeySVG/>
          <span><Trans>Missing Metadata Key</Trans></span>
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
   * Whenever the filter Account Recovery Request is selected (Attention required filter)
   * @returns {void}
   */
  handleAccountRecoveryRequestClick() {
    const filter = {type: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST};
    this.props.history.push({pathname: '/app/users', state: {filter}});
  }

  /**
   * Whenever the filter Missing Metadata Key is selected (Attention required filter)
   * @returns {void}
   */
  handleMissingMetadataKeyClick() {
    const filter = {type: UserWorkspaceFilterTypes.MISSING_METADATA_KEY};
    this.props.history.push({pathname: '/app/users', state: {filter}});
  }

  /**
   * Check if any filter - suspended user or Attention required filter is applied
   * @returns {boolean}
   */
  get isFilterApplied() {
    const filterType = this.props.userWorkspaceContext.filter.type;
    return (
      filterType === UserWorkspaceFilterTypes.SUSPENDED_USER ||
      filterType === UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST ||
      filterType === UserWorkspaceFilterTypes.MISSING_METADATA_KEY
    );
  }

  /**
   * Check if Missing Metadata Key option should be displayed
   * in the Attention Required Filter
   * @returns {boolean}
   */
  get displayMissingMetadataKeysFilter() {
    const users = this.props.context.users;
    return users?.some(user => isMissingMetadataKey(user));
  }

  /**
   * Check if Account Recovery Request option should be displayed
   * in the Attention Required Filter
   * @returns {boolean}
   */
  get displayAccountRecoveryFilter() {
    const users = this.props.context.users;
    return users?.some(user => isAccountRecoveryRequested(user));
  }

  /**
   * Check if User is an Admin
   * @returns {boolean}
   */
  get isAdmin() {
    return this.props.context.loggedInUser.role.name === "admin";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    /** If any filter is applied */
    const isFilterApplied = this.isFilterApplied;

    /** If any user is in either of the attention required states */
    const hasAttentionRequiredState = this.displayAccountRecoveryFilter || this.displayMissingMetadataKeysFilter;

    /** Display All status dropdown if neither suspended users filter nor attention required filters are applied */
    const shouldDisplayAllStatusDropdown = !isFilterApplied;

    /** Display the Attention Required dropdown if - atleast one user in list has atleast one attention state && if none of the filters are applied && logged in user is an admin */
    const shouldDisplayAttentionRequiredDropDown =  hasAttentionRequiredState && !isFilterApplied && this.isAdmin;

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
        {shouldDisplayAttentionRequiredDropDown &&
          <Dropdown>
            <DropdownButton>
              <AttentionSVG className="attention-required"/>
              <span><Trans>Attention Required</Trans></span>
              <CaretDownSVG/>
            </DropdownButton>
            <DropdownMenu>
              <DropdownMenuItem>
                {this.displayAccountRecoveryFilter && (
                  <button
                    type="button"
                    className="no-border"
                    onClick={this.handleAccountRecoveryRequestClick}
                  >
                    <BuoySVG />
                    <span><Trans>Account Recovery Requests</Trans></span>
                  </button>
                )}
                {this.displayMissingMetadataKeysFilter && (
                  <button
                    type="button"
                    className="no-border"
                    onClick={this.handleMissingMetadataKeyClick}
                  >
                    <MetadataKeySVG />
                    <span><Trans>Missing Metadata Key</Trans></span>
                  </button>
                )}
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
        }
        {isFilterApplied &&
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
  context: PropTypes.any, // The Application context
  actionsFilterRef: PropTypes.object, // The forwarded ref of the filters buttons container
  passwordExpiryContext: PropTypes.object, // the password expiry context
  history: PropTypes.object, // The history property
  userWorkspaceContext: PropTypes.any, // the resource workspace context
  t: PropTypes.func, // The translation function
};

export default withRouter(withAppContext(withUserWorkspace(withTranslation('common')(DisplayUsersWorkspaceFilterBar))));
