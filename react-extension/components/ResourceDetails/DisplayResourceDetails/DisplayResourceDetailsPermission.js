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
import UserAvatar from "../../Common/Avatar/UserAvatar";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {isUserSuspended} from "../../../../shared/utils/userUtils";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import DisplayAroName from "../../../../shared/components/Aro/DisplayAroName";

const PERMISSIONS_LABEL = {
  1: 'can read',
  7: 'can update',
  15: 'is owner'
};

/**
 * This component display the permission section (Shared With)
 */
class DisplayResourceDetailsPermission extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      permissions: null,
      open: false,
      loading: true,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
    await this.handleResourcePermissionsRefresh(prevProps.resourceWorkspaceContext.refresh.permissions);
  }

  /**
   * Returns the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  handleResourceChange(previousResource) {
    const hasResourceChanged = this.resource.id !== previousResource.id;
    if (hasResourceChanged && this.state.open) {
      this.fetch();
    }
  }

  /**
   * Handle the refresh of resource permissions
   * @param hasPreviouslyRefreshed True if one previously refreshed the permissions
   */
  async handleResourcePermissionsRefresh(hasPreviouslyRefreshed) {
    const mustRefresh = !hasPreviouslyRefreshed && this.props.resourceWorkspaceContext.refresh.permissions;
    if (mustRefresh) {
      await this.fetch();
      await this.props.resourceWorkspaceContext.onResourcePermissionsRefreshed();
    }
  }

  /**
   * Get the folder permissions.
   */
  async fetch() {
    this.setState({loading: true});
    const permissions = await this.props.context.port.request('passbolt.permissions.find-aco-permissions-for-display', this.resource.id, "Resource");
    this.setState({permissions, loading: false});
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    if (open) {
      this.fetch();
    }
    this.setState({open});
  }

  /**
   * check if no permission is present
   * @returns {boolean}
   */
  isLoading() {
    return this.state.loading;
  }

  /**
   * Returns true if the feature flag disableUser is enabled and the given user is suspended.
   * @param {object} user
   * @returns {boolean}
   */
  isUserSuspended(user) {
    return this.props.context.siteSettings.canIUse('disableUser') && isUserSuspended(user);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="detailed-permission accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span className="accordion-title">
                <Trans>Shared with</Trans>
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
                {this.state.permissions && this.state.permissions.map(permission =>
                  <div key={permission.id}
                    className={`usercard-col-2 ${this.isUserSuspended(permission.user) ? "suspended" : ""}`}>
                    {(permission.user || permission.aro === "User") &&
                      <UserAvatar user={permission.user} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
                    }
                    {(permission.group || permission.aro === "Group") &&
                      <GroupAvatar group={permission.group}/>
                    }
                    <div className="content-wrapper">
                      <div className="content">
                        <div className="name">
                          <DisplayAroName displayAs={permission.aro} group={permission.group} user={permission.user} withUsername={true}/>{this.isUserSuspended(permission.user) &&
                          <span className="suspended"> <Trans>(suspended)</Trans></span>}</div>
                        <div className="subinfo">{this.props.t(PERMISSIONS_LABEL[permission.type])}</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          </div>
        }
      </div>
    );
  }
}

DisplayResourceDetailsPermission.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withTranslation('common')(DisplayResourceDetailsPermission)));
