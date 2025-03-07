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
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayUserGroupDetailsMembersGroupMember from "./DisplayUserGroupDetailsMembersGroupMember";
import EditUserGroup from "../EditUserGroup/EditUserGroup";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

/**
 * This component displays the group details about members
 */
class DisplayUserGroupDetailsMembers extends React.Component {
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
      open: false // Flag for the expand / collapse mode
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
    this.handleEditGroup = this.handleEditGroup.bind(this);
  }

  /**
   * Returns the current user to detail
   */
  get group() {
    return this.props.userWorkspaceContext.details.group;
  }

  /**
   * Returns the base url
   */
  get baseUrl() {
    return this.props.context.userSettings.getTrustedDomain();
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
  }

  /**
   * Whenever the user wants to edit the current group
   */
  async handleEditGroup() {
    await this.props.userWorkspaceContext.onGroupToEdit(this.group);
    this.props.dialogContext.open(EditUserGroup);
  }

  /**
   * Check if the component is loading
   * @returns {boolean}
   */
  isLoading() {
    return !this.props.context.users;
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className={`detailed-members accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button type="button" className="link no-border section-opener" onClick={this.handleTitleClicked}>
              <span className="accordion-title">
                <Trans>Group members</Trans>
              </span>
              {this.state.open &&
                <CaretDownSVG/>
              }
              {!this.state.open &&
                <CaretRightSVG/>
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
          <div className="accordion-content">
            {this.isLoading() &&
              <div className="processing-wrapper">
                <SpinnerSVG/>
                <span className="processing-text"><Trans>Retrieving permissions</Trans></span>
              </div>
            }
            {!this.isLoading() &&
            <>
              {
                this.group.groups_users.map(groupUser => (
                  <DisplayUserGroupDetailsMembersGroupMember key={groupUser.id} groupUser={groupUser}/>
                ))
              }
            </>
            }
          </div>
        }
      </div>
    );
  }
}

DisplayUserGroupDetailsMembers.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.object, // The user workspace context
  dialogContext: PropTypes.object, // The dialog context
};

export default withAppContext(withDialog(withUserWorkspace(withTranslation("common")(DisplayUserGroupDetailsMembers))));
