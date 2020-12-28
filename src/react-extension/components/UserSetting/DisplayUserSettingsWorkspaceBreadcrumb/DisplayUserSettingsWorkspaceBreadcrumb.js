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
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Breadcrumbs from "../../../../react/components/Common/Navigation/Breadcrumbs/Breadcrumbs";
import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";
import AppContext from "../../../contexts/AppContext";

/**
 * The component displays a navigation breadcrumb given the applied users filter
 */
class DisplayUserSettingsWorkspaceBreadcrumb extends Component {
  /**
   * Returns the all users breadcrumb items
   */
  get allUsers() {
    return [
      {
        name: "All users",
        link: {
          pathname: "/app/users",
          state: {
            filter: {
              type: UserWorkspaceFilterTypes.ALL
            }
          }
        }
      }
    ];
  }

  /**
   * Returns the current item name given the current location
   */
  get itemName() {
    const matchPathSuffix = pathSuffix => this.props.location.pathname.endsWith(pathSuffix);
    const names = {
      profile: "Profile",
      theme: "Theme",
      mfa: "Multi Factor Authentication",
      keys: "Keys inspector"
    };
    const matchedKey = Object.keys(names).find(matchPathSuffix);
    return names[matchedKey];
  }


  /**
   * Returns the breadcrumb items for the given filter
   */
  get breadcrumb() {
    const user = this.context.loggedInUser;
    return [
      ...this.allUsers,
      {
        name: user && `${user.profile.first_name} ${user.profile.last_name}`,
        link: {
          pathname: "/app/settings/profile"
        }
      },
      {
        name: this.itemName,
        link: this.props.location
      }
    ];
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <Breadcrumbs items={this.breadcrumb}/>
    );
  }
}

DisplayUserSettingsWorkspaceBreadcrumb.contextType = AppContext;

DisplayUserSettingsWorkspaceBreadcrumb.propTypes = {
  location: PropTypes.object
};

export default withRouter(DisplayUserSettingsWorkspaceBreadcrumb);
