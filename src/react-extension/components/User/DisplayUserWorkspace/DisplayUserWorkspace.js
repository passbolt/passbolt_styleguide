
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
 * @since         2.13.0
 */

import React from 'react';
import DisplayUsers from "../DisplayUsers/DisplayUsers";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {Route, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import DisplayUserDetails from "../../UserDetails/DisplayUserDetails/DisplayUserDetails";
import DisplayUserWorkspaceActions from "../DisplayUserWorkspaceActions/DisplayUserWorkspaceActions";
import DisplayUserBadgeMenu from "../DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayGroups from "../FilterUsersByGroups/FilterUsersByGroup";
import FilterUsersByShortcut from "../FilterUsersByShortcut/FilterUsersByShortcut";
import FilterUsersByText from "../FilterUsersByText/FilterUsersByText";
import DisplayUserGroupDetails from "../../UserGroup/DisplayUserGroupDetails/DisplayUserGroupDetails";
import DisplayUserWorkspaceMainActions from "../DisplayUserWorkspaceMainActions/DisplayUserWorkspaceMainActions";
import FilterUsersByBreadcrumb from "../FilterUsersByBreadcrumb/FilterUsersByBreadcrumb";
import HandleReviewAccountRecoveryRequestRoute from "../HandleReviewAccountRecoveryRequestRoute/HandleReviewAccountRecoveryRequestRoute";
import DisplayHttpError from '../../Common/Error/DisplayHttpError/DisplayHttpError';
import ArrowLeftSVG from "../../../../img/svg/arrow_left.svg";
import InfoSVG from "../../../../img/svg/info.svg";
import {Trans} from "react-i18next";
import DisplayUserWorkspaceEmptyDetails from '../DisplayUserWorkspaceEmptyDetails/DisplayUserWorkspaceEmptyDetails';
import Footer from '../../Common/Footer/Footer';
import DisplayUsersWorkspaceFilterBar from '../DisplayUsersWorkspaceFilterBar/DisplayUsersWorkspaceFilterBar';
import debounce from "debounce-promise";

const GAP_AND_PADDING_BUTTONS = 22;

/**
 * This component is a container for all the user workspace features
 */
class DisplayUserWorkspace extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.createRefs();
    window.addEventListener('resize', this.handleWindowResizeEventDebounced);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleDetailsLockedEvent = this.handleDetailsLockedEvent.bind(this);
    this.handleWindowResizeEventDebounced = debounce(this.handleWindowResizeEvent.bind(this), 50);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.actionsBar = React.createRef();
    this.actionsFilter = React.createRef();
    this.actionsButton = React.createRef();
    this.actionsSecondary = React.createRef();
  }

  /**
   * ComponentDidMount
   */
  componentDidMount() {
    this.displayOnlyButtonIconsIfButtonsOverlay();
  }

  /**
   * ComponentDidUpdate
   */
  componentDidUpdate() {
    this.displayOnlyButtonIconsIfButtonsOverlay();
  }

  /**
   * Handle window resize event
   */
  handleWindowResizeEvent() {
    this.displayOnlyButtonIconsIfButtonsOverlay();
  }

  /**
   * calculate the width pf buttons,
   * if overlay the container, add classname to display only icons, else do nothing
   */
  displayOnlyButtonIconsIfButtonsOverlay() {
    // Remove the class name to calculate with default width (text)
    this.actionsBar.current?.classList.remove("icon-only");
    // Get elements width
    const offsetWidthActionBar = this.actionsBar.current?.offsetWidth;
    const offsetActionsButton = this.actionsFilter.current ? this.actionsFilter.current.offsetWidth : this.actionsButton.current?.offsetWidth;
    const offsetActionsSecondary = this.actionsSecondary.current?.offsetWidth;

    // Check if the default width overlay the container to show only icons
    if (offsetActionsButton + offsetActionsSecondary + GAP_AND_PADDING_BUTTONS > offsetWidthActionBar) {
      this.actionsBar.current.classList.add("icon-only");
    }
  }
  /**
   * Returns true if the user details must be displayed
   * @returns {boolean}
   */
  get shouldDisplayUserDetails() {
    const {details} = this.props.userWorkspaceContext;
    return details.user;
  }

  /**
   * Returns true if the group details must be displayed
   * @returns {boolean}
   */
  get shouldDisplayGroupDetails() {
    const {details} = this.props.userWorkspaceContext;
    return details.group;
  }

  /**
   * Returns true if current user is allowed to access the user workspace
   * @returns {boolean}
   */
  get isAccessAllowed() {
    return this.props.userWorkspaceContext.isAccessAllowed();
  }

  /**
   * Handle go back to resource workspace
   */
  handleGoBack() {
    this.props.history.push({pathname: `/app/passwords`});
  }

  /**
   * Returns true if there is currently if nothing is selected in the workspace.
   * @returns {boolean}
   */
  get shouldDisplayEmptyDetails() {
    const {details} = this.props.userWorkspaceContext;
    return !details.user && !details.group;
  }

  /**
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasDetailsLocked() {
    return this.props.userWorkspaceContext.details.locked;
  }

  /**
   * Handle view detail click event
   */
  handleDetailsLockedEvent() {
    // lock or unlock the detail resource or folder
    this.props.userWorkspaceContext.onDetailsLocked();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <>
        {this.props.context.users &&
        <Route path="/app/account-recovery/requests/review/:accountRecoveryRequestId" component={HandleReviewAccountRecoveryRequestRoute}/>
        }
        <div className="panel main">
          {this.isAccessAllowed ? (
            <>
              <div className="panel left">
                <div className="sidebar-content">
                  <div className="top-bar-left-navigation">
                    <div className="navigation">
                      {/* Add onclick action */}
                      <button type="button" className="button-transparent back" onClick={this.handleGoBack}>
                        <ArrowLeftSVG/>
                      </button>
                      <span className="title"><Trans>Users & Groups</Trans></span>
                    </div>
                  </div>
                  <DisplayUserWorkspaceMainActions/>
                  <div className="sidebar-content-left">
                    <FilterUsersByShortcut/>
                    <DisplayGroups/>
                  </div>
                </div>
              </div>
              <div className="panel middle">
                <div className="header">
                  <div className="header-left">
                    <FilterUsersByText/>
                  </div>
                  <div className="header-right">
                    <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
                  </div>
                </div>
                <div className="middle-right">
                  <div className="breadcrumbs-and-grid">
                    <div className="top-bar">
                      <FilterUsersByBreadcrumb/>
                      <div className="action-bar" ref={this.actionsBar}>
                        {this.props.userWorkspaceContext.selectedUsers?.length > 0
                          ? <DisplayUserWorkspaceActions actionsButtonRef={this.actionsButton}/>
                          : <DisplayUsersWorkspaceFilterBar actionsFilterRef={this.actionsFilter}/>
                        }
                        <div className="actions-secondary" ref={this.actionsSecondary}>
                          <button type="button"
                            className={`button-toggle button-action button-action-icon info ${this.hasDetailsLocked() ? "active" : ""}`}
                            onClick={this.handleDetailsLockedEvent}>
                            <InfoSVG/>
                            <span className="visuallyhidden"><Trans>View detail</Trans></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <DisplayUsers/>
                  </div>
                  {this.hasDetailsLocked() &&
                    <div className="panel aside">
                      {this.shouldDisplayEmptyDetails &&
                        <DisplayUserWorkspaceEmptyDetails />
                      }
                      {this.shouldDisplayUserDetails &&
                        <DisplayUserDetails/>
                      }
                      {this.shouldDisplayGroupDetails &&
                        <DisplayUserGroupDetails/>
                      }
                      <Footer/>
                    </div>
                  }
                </div>
              </div>
            </>
          ) : (
            <DisplayHttpError errorCode={403}/>
          )}
        </div>
      </>
    );
  }
}

DisplayUserWorkspace.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.any,
  userWorkspaceContext: PropTypes.any
};

export default withRouter(withAppContext(withUserWorkspace(DisplayUserWorkspace)));
