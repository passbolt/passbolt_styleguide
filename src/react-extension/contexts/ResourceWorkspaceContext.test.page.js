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
 * @since         2.11.0
 */
import { render, waitFor } from "@testing-library/react";
import React from "react";
import ResourceWorkspaceContextProvider, {
  ResourceWorkspaceContext,
  ResourceWorkspaceFilterTypes,
} from "./ResourceWorkspaceContext";
import AppContext from "../../shared/context/AppContext/AppContext";
import { Router, NavLink, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { waitForTrue } from "../../../test/utils/waitFor";
import userEvent from "@testing-library/user-event";

/**
 * The ResourceWorkspaceContextPage component represented as a page
 */
export default class ResourceWorkspaceContextPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(context, props) {
    this.context = context;
    this.props = props;
    this.setup(context, props);
    this.user = userEvent.setup();
  }

  /**
   * Returns the contextual filter
   */
  get filter() {
    return this.resourceWorkspaceContext.filter;
  }

  /**
   * Returns the contextual details
   */
  get details() {
    return this.resourceWorkspaceContext.details;
  }

  /**
   * Returns the lock on details
   */
  get lockDisplayDetail() {
    return this.resourceWorkspaceContext.lockDisplayDetail;
  }

  /**
   * Returns the filtered resources
   */
  get filteredResources() {
    return this.resourceWorkspaceContext.filteredResources;
  }

  /**
   * Returns the contextual selected resources
   */
  get selectedResources() {
    return this.resourceWorkspaceContext.selectedResources;
  }

  /**
   * Get the columns setting
   * @return {[]}
   */
  get columnsResourceSetting() {
    return this.resourceWorkspaceContext.columnsResourceSetting;
  }

  /**
   * Get the sorter
   * @return {{asc: boolean, propertyName: string}}
   */
  get sorter() {
    return this.resourceWorkspaceContext.sorter;
  }

  /**
   * Go to the given link identified by CSS selector and click on it
   * @returns {Promise<void>}
   * @ linkCssSelector The CSS link selector
   */
  async goToLink(linkCssSelector) {
    const oldFilter = this.filter;
    const element = this._page.container.querySelector(linkCssSelector);
    await this.user.click(element);
    /*
     * We ensure that the filter is applied properly before ending the promise.
     * Without that, some unit tests may fail because they don't have the right context to run.
     */
    await waitForTrue(() => oldFilter !== this.filter);
  }

  /**
   * Go to the home search filter route
   */
  async goToAllItems() {
    this.setup(this.context, this.props);
    await this.goToLink(".all");
  }

  /**
   * Go to the Recently Modified search filter route
   */
  async goToRecentlyModified() {
    await this.goToLink(".recently-modified");
  }

  /**
   * Go to the Shared With Me search filter route
   */
  async goToShareWithMe() {
    await this.goToLink(".shared-with-me");
  }

  /**
   * Go to the Items I own Me search filter route
   */
  async goToItemsIOwn() {
    await this.goToLink(".items-i-own");
  }

  /**
   * Go to the Private search filter route
   */
  async goToPrivate() {
    await this.goToLink(".private");
  }

  /**
   * Go to the Favorite search filter route
   */
  async goToFavorite() {
    await this.goToLink(".favorite");
  }

  /**
   * Go to the Text search filter route
   * @param text A specific text search filter
   */
  async goToText(text) {
    this.setup(this.context, this.props, { text });
    await this.goToLink(".text");
  }

  /**
   * Go to the Group search filter route
   * @param group A specific group search filter
   */
  async goToGroup(group) {
    this.setup(this.context, this.props, { group });
    await this.goToLink(".group");
  }

  /**
   * Go to the Tag search filter route
   * @param tag A specific tag search filter
   */
  async goToTag(tag) {
    this.setup(this.context, this.props, { tag });
    await this.goToLink(".tag");
  }

  /**
   * Go to the Folder search filter route
   * @param folder A specific folder search filter
   */
  async goToFolder(folder) {
    this.setup(this.context, this.props, { folder });
    await this.goToLink(".folder");
  }

  /**
   * Go to the Root Folder search filter route
   */
  async goToRootFolder() {
    this.setup(this.context, this.props);
    await this.goToLink(".root-folder");
  }

  /**
   * Go to the Expired search filter route
   */
  async goToExpired() {
    this.setup(this.context, this.props);
    await this.goToLink(".expired");
  }

  /**
   * Select all resources
   */
  async selectAll() {
    await this.resourceWorkspaceContext.onResourceSelected.all();
  }

  /**
   * Select none resources
   */
  async selectNone() {
    await this.resourceWorkspaceContext.onResourceSelected.none();
  }

  /**
   * Select the given resource
   * @param resource A specific resource
   */
  async select(resource) {
    await waitFor(() => {
      this.resourceWorkspaceContext.onResourceSelected.single(resource);
    });
  }

  /**
   * Select the resources
   * @param resources The resources to select
   */
  async selectMultiple(resources = []) {
    for (let index = 0; index < resources.length; index++) {
      await waitFor(() => {
        this.resourceWorkspaceContext.onResourceSelected.multiple(resources[index]);
      });
    }
  }

  /**
   * Select a range of resources
   * @param [startResource, endResource] The range to select
   */
  async selectRange([startResource, endResource]) {
    await this.resourceWorkspaceContext.onResourceSelected.range(startResource);
    await this.resourceWorkspaceContext.onResourceSelected.range(endResource);
  }

  /**
   * Toggle the display lock on details
   */
  async toggleLockDetails() {
    await this.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Go to a resource uri
   * @param uri A specific resource
   */
  async goToResourceUri(uri) {
    await this.resourceWorkspaceContext.onGoToResourceUriRequested(uri);
  }

  /**
   * On change column view
   * @param {string} id The id of the column
   * @param {boolean} checked The checked value
   */
  async onChangeColumnView(id, checked) {
    await this.resourceWorkspaceContext.onChangeColumnView(id, checked);
  }

  /**
   * On change columns setting
   * @param {Array} columnsSetting The columns setting
   */
  async onChangeColumnsSettings(columnsSetting) {
    await this.resourceWorkspaceContext.onChangeColumnsSettings(columnsSetting);
  }

  /**
   * On reset the column settings.
   */
  async resetColumnsSettings() {
    await this.resourceWorkspaceContext.resetGridColumnsSettings();
  }

  /**
   * get the folder hierarchy
   * @param {string} id The id of the folder
   */
  getHierarchyFolderCache(id) {
    return this.resourceWorkspaceContext.getHierarchyFolderCache(id);
  }

  /**
   * Returns the rendering of  the page
   * @param appContext a app context
   * @param args the args
   */
  setup(context, props, args = {}) {
    this._page = render(
      <AppContext.Provider value={context}>
        <Router
          history={createMemoryHistory({
            initialEntries: [
              "/app/folders/view/:filterByFolderId",
              "/app/passwords/view/:selectedResourceId",
              "/app/passwords/filter/:filterType",
              "/app/passwords",
            ],
          })}
        >
          <Switch>
            <Route
              path={[
                "/app/folders/view/:filterByFolderId",
                "/app/passwords/view/:selectedResourceId",
                "/app/passwords/filter/:filterType",
                "/app/passwords",
              ]}
            >
              <ResourceWorkspaceContextProvider {...props}>
                <ResourceWorkspaceContext.Consumer>
                  {(ResourceWorkspaceContext) => {
                    this.resourceWorkspaceContext = ResourceWorkspaceContext;
                    return <></>;
                  }}
                </ResourceWorkspaceContext.Consumer>
              </ResourceWorkspaceContextProvider>
            </Route>
          </Switch>
          <NavLink to="/app/passwords">
            <a className="all"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: "/app/passwords",
              state: { filter: { type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED } },
            }}
          >
            <a className="recently-modified"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: "/app/passwords",
              state: { filter: { type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME } },
            }}
          >
            <a className="shared-with-me"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: "/app/passwords/filter/expired",
              state: { filter: { type: ResourceWorkspaceFilterTypes.EXPIRED } },
            }}
          >
            <a className="expired"></a>
          </NavLink>
          <NavLink
            to={{ pathname: "/app/passwords", state: { filter: { type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN } } }}
          >
            <a className="items-i-own"></a>
          </NavLink>
          <NavLink
            to={{ pathname: "/app/passwords", state: { filter: { type: ResourceWorkspaceFilterTypes.PRIVATE } } }}
          >
            <a className="private"></a>
          </NavLink>
          <NavLink
            to={{ pathname: "/app/passwords", state: { filter: { type: ResourceWorkspaceFilterTypes.FAVORITE } } }}
          >
            <a className="favorite"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: "/app/passwords",
              state: { filter: { type: ResourceWorkspaceFilterTypes.TEXT, payload: args.text } },
            }}
          >
            <a className="text"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: "/app/passwords",
              state: { filter: { type: ResourceWorkspaceFilterTypes.TAG, payload: args.tag } },
            }}
          >
            <a className="tag"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: "/app/passwords",
              state: { filter: { type: ResourceWorkspaceFilterTypes.GROUP, payload: args.group } },
            }}
          >
            <a className="group"></a>
          </NavLink>
          <NavLink
            to={{
              pathname: `/app/folders/view/${args.folder ? args.folder.id : ""}`,
              state: { filter: { type: ResourceWorkspaceFilterTypes.FOLDER, payload: { folder: args.folder } } },
            }}
          >
            <a className="folder"></a>
          </NavLink>
          <NavLink
            to={{ pathname: "/app/passwords", state: { filter: { type: ResourceWorkspaceFilterTypes.ROOT_FOLDER } } }}
          >
            <a className="root-folder"></a>
          </NavLink>
        </Router>
      </AppContext.Provider>,
      { legacyRoot: true },
    );
  }
}
