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
import React, {Component} from "react";
import DisplayUserBadgeMenu from "../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import FilterResourcesByFolders from "../FilterResourcesByFolders/FilterResourcesByFolders";
import DisplayResourceFolderDetails from "../../ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetails";
import DisplayResourceDetails from "../../ResourceDetails/DisplayResourceDetails/DisplayResourceDetails";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByTags from "../FilterResourcesByTags/FilterResourcesByTags";
import PropTypes from "prop-types";
import FilterResourcesByText from "../FilterResourcesByText/FilterResourcesByText";
import FilterResourcesByShortcuts from "../FilterResourcesByShortcuts/FilterResourcesByShortcuts";
import FilterResourcesByBreadcrumb from "../FilterResourcesByBreadcrumb/FilterResourcesByBreadcrumb";
import DisplayResourcesWorkspaceMenu from "./DisplayResourcesWorkspaceMenu";
import Logo from "../../Common/Navigation/Header/Logo";
import DisplayResourcesWorkspaceMainMenu from "./DisplayResourcesWorkspaceMainMenu";
import {Trans, withTranslation} from "react-i18next";
import FilterResourcesByGroups from "../FilterResourcesByGroups/FilterResourcesByGroups";
import DisplayResourcesList from "../DisplayResourcesList/DisplayResourcesList";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import ColumnsSVG from "../../../../img/svg/columns.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import InfoSVG from "../../../../img/svg/info.svg";
import WorkspaceSwitcher from "../../Common/Navigation/WorkspaceSwitcher/WorkspaceSwitcher";
import RoleEntity from "../../../../shared/models/entity/role/roleEntity";
import DisplayResourcesWorkspaceFilters from "./DisplayResourcesWorkspaceFilters";
import Footer from "../../Common/Footer/Footer";
import DisplayEmptyDetails from "../../ResourceFolderDetails/DisplayResourceFolderDetails/DisplayEmptyDetails";
import DisplayResourcesListDetails from "../../ResourceDetails/DisplayResourceDetails/DisplayResourcesListDetails";
import debounce from "debounce-promise";
import RevertSVG from "../../../../img/svg/revert.svg";

const GAP_AND_PADDING_BUTTONS = 22;

class Workspace extends Component {
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
    this.handleOnChangeColumnView = this.handleOnChangeColumnView.bind(this);
    this.handleViewDetailClickEvent = this.handleViewDetailClickEvent.bind(this);
    this.handleWindowResizeEventDebounced = debounce(this.handleWindowResizeEvent.bind(this), 50);
    this.handleOnResetColumnsSettings = this.handleOnResetColumnsSettings.bind(this);
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
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasLockDetail() {
    return this.props.resourceWorkspaceContext.lockDisplayDetail;
  }

  /**
   * Get the columns list of resource
   * @return {[Object]}
   */
  get columnsResourceSetting() {
    return this.props.resourceWorkspaceContext.columnsResourceSetting?.items;
  }

  /**
   * Handle the event on when the column view is changing.
   * @param {React.Event} event
   */
  handleOnChangeColumnView(event) {
    const target = event.target;
    this.props.resourceWorkspaceContext.onChangeColumnView(target.id, target.checked);
  }

  /**
   * Handle the event when users resets the columns settings.
   * @return {Promise}
   */
  async handleOnResetColumnsSettings() {
    await this.props.resourceWorkspaceContext.resetGridColumnsSettings();
  }

  /**
   * handle view detail click event
   */
  handleViewDetailClickEvent() {
    // lock or unlock the detail resource or folder
    this.props.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Returns true if the current user is an admin.
   * @returns {boolean}
   */
  get isUserAdmin() {
    const loggedInUser = this.props.context.loggedInUser;
    return loggedInUser.role.name === RoleEntity.ROLE_ADMIN;
  }

  /**
   * Returns true if the current user is an admin.
   * @returns {boolean}
   */
  get isUserWorkspaceVisible() {
    return this.props.rbacContext.canIUseUiAction(uiActions.USERS_VIEW_WORKSPACE);
  }

  /**
   * Returns true if there is currently if nothing is selected in the workspace.
   * @returns {boolean}
   */
  get shouldDisplayEmptyDetails() {
    return !this.props.resourceWorkspaceContext.details.folder
      && !this.props.resourceWorkspaceContext.details.resource
      && this.props.resourceWorkspaceContext.selectedResources.length === 0;
  }

  /**
   * Returns true if multiple resources are currently selected.
   * @returns {boolean}
   */
  get shouldDisplayListDetails() {
    return this.props.resourceWorkspaceContext.selectedResources.length > 1;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const canUseFolders = this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
    const canUseTags = this.props.context.siteSettings.canIUse("tags")
      && this.props.rbacContext.canIUseUiAction(uiActions.TAGS_USE);

    return (
      <div className="panel main">
        <div className="panel left resource-filter">
          <div className="sidebar-content">
            <Logo/>
            <div className="main-action-wrapper">
              <DisplayResourcesWorkspaceMainMenu/>
            </div>
            <div className="sidebar-content-left">
              <FilterResourcesByShortcuts/>
              {canUseFolders &&
                <FilterResourcesByFolders/>
              }
              <FilterResourcesByGroups/>
              {canUseTags &&
                <FilterResourcesByTags/>
              }
            </div>
          </div>
        </div>
        <div className="panel middle">
          <div className="header">
            <div className="header-left">
              <FilterResourcesByText
                placeholder={this.props.t("Search resource")}/>
            </div>
            <div className="header-right">
              <WorkspaceSwitcher isUserAdmin={this.isUserAdmin} isUserWorkspaceVisible={this.isUserWorkspaceVisible}/>
              <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
            </div>
          </div>
          <div className="middle-right">
            <div className="breadcrumbs-and-grid">
              <div className="top-bar">
                <FilterResourcesByBreadcrumb/>
                <div className="action-bar" ref={this.actionsBar}>
                  {this.props.resourceWorkspaceContext.selectedResources?.length > 0
                    ? <DisplayResourcesWorkspaceMenu actionsButtonRef={this.actionsButton}/>
                    : <DisplayResourcesWorkspaceFilters actionsFilterRef={this.actionsFilter}/>
                  }
                  <div className="actions-secondary" ref={this.actionsSecondary}>
                    <Dropdown>
                      <DropdownButton>
                        <ColumnsSVG/>
                        <span><Trans>Columns</Trans></span>
                        <CaretDownSVG/>
                      </DropdownButton>
                      <DropdownMenu direction="left">
                        {this.columnsResourceSetting?.map((column, index) =>
                          <DropdownMenuItem keepOpenOnClick={true} key={column.id} separator={index === this.columnsResourceSetting.length - 1}>
                            <div className="input checkbox">
                              <input type="checkbox" checked={column.show} id={column.id} name={column.id} onChange={this.handleOnChangeColumnView}/>
                              <label htmlFor={column.id}><Trans>{column.label}</Trans></label>
                            </div>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <div className="action-button">
                            <button id="reset-columns-settings" type="button" onClick={this.handleOnResetColumnsSettings}>
                              <RevertSVG/>
                              <span><Trans>Reset columns</Trans></span>
                            </button>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </Dropdown>
                    <button type="button" className={`button-toggle button-action button-action-icon info ${this.hasLockDetail() ? "active" : ""}`}
                      onClick={this.handleViewDetailClickEvent}>
                      <InfoSVG />
                      <span className="visuallyhidden"><Trans>View detail</Trans></span>
                    </button>
                  </div>
                </div>
              </div>
              <DisplayResourcesList/>
            </div>
            {this.hasLockDetail() &&
              <div className="panel aside">
                {this.shouldDisplayListDetails &&
                  <DisplayResourcesListDetails />
                }
                {this.shouldDisplayEmptyDetails &&
                  <DisplayEmptyDetails />
                }
                {this.props.resourceWorkspaceContext.details.folder &&
                  <DisplayResourceFolderDetails/>
                }
                {this.props.resourceWorkspaceContext.details.resource &&
                  <DisplayResourceDetails/>
                }
                <Footer/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Workspace.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The rbac context
  resourceWorkspaceContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withResourceWorkspace(withTranslation('common')(Workspace))));
