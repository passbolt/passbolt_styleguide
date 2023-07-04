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
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import ResourceWorkspaceContextProvider, {
  ResourceWorkspaceContext,
  ResourceWorkspaceFilterTypes
} from "./ResourceWorkspaceContext";
import AppContext from "../../shared/context/AppContext/AppContext";
import {Router, NavLink, Route, Switch} from "react-router-dom";
import {createMemoryHistory} from "history";


/**
 * The ResourceWorkspaceContextPage component represented as a page
 */
export default class ResourceWorkspaceContextPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext) {
    this.context = appContext;
    this.setup(appContext);
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
   * Go to the given link identified by CSS selector and click on it
   * @returns {Promise<void>}
   * @ linkCssSelector The CSS link selector
   */
  async goToLink(linkCssSelector) {
    const oldFilter = this.filter;
    const element = this._page.container.querySelector(linkCssSelector);
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    /*
     * We ensure that the filter is applied properly before ending the promise.
     * Without that, some unit tests may fail because they don't have the right context to run.
     */
    await waitFor(() => {
      if (oldFilter === this.filter) {
        throw new Error("Context didn't change yet.");
      }
    });
  }

  /**
   * Go to the All Items search filter route
   */
  async goToAllItems() {
    this.setup(this.context);
    await this.goToLink('.all');
  }

  /**
   * Go to the Recently Modified search filter route
   */
  async goToRecentlyModified() {
    await this.goToLink('.recently-modified');
  }

  /**
   * Go to the Shared With Me search filter route
   */
  async goToShareWithMe() {
    await this.goToLink('.shared-with-me');
  }

  /**
   * Go to the Items I own Me search filter route
   */
  async goToItemsIOwn() {
    await this.goToLink('.items-i-own');
  }

  /**
   * Go to the Favorite search filter route
   */
  async goToFavorite() {
    await this.goToLink('.favorite');
  }

  /**
   * Go to the Text search filter route
   * @param text A specific text search filter
   */
  async goToText(text) {
    this.setup(this.context, {text});
    await this.goToLink('.text');
  }

  /**
   * Go to the Group search filter route
   * @param group A specific group search filter
   */
  async goToGroup(group) {
    this.setup(this.context, {group});
    await this.goToLink('.group');
  }

  /**
   * Go to the Tag search filter route
   * @param tag A specific tag search filter
   */
  async goToTag(tag) {
    this.setup(this.context, {tag});
    await this.goToLink('.tag');
  }

  /**
   * Go to the Folder search filter route
   * @param tag A specific folder search filter
   */
  async goToFolder(folder) {
    this.setup(this.context, {folder});
    await this.goToLink('.folder');
  }

  /**
   * Go to the Root Folder search filter route
   */
  async goToRootFolder() {
    this.setup(this.context);
    await this.goToLink('.root-folder');
  }

  /**
   * Select all resources
   */
  async selectAll() {
    await this.resourceWorkspaceContext.onResourceSelected.all();
    await waitFor(() => {});
  }

  /**
   * Select none resources
   */
  async selectNone() {
    await this.resourceWorkspaceContext.onResourceSelected.none();
    await waitFor(() => {});
  }

  /**
   * Select the given resource
   * @param resource A specific resource
   */
  async select(resource) {
    await this.resourceWorkspaceContext.onResourceSelected.single(resource);
    await waitFor(() => {});
  }

  /**
   * Select the resources
   * @param resources The resources to select
   */
  async selectMultiple(resources = []) {
    for (let index = 0; index < resources.length; index++) {
      await this.resourceWorkspaceContext.onResourceSelected.multiple(resources[index]);
      await waitFor(() => {});
    }
  }

  /**
   * Select a range of resources
   * @param [startResource, endResource] The range to select
   */
  async selectRange([startResource, endResource]) {
    await this.resourceWorkspaceContext.onResourceSelected.range(startResource);
    await waitFor(() => {});
    await this.resourceWorkspaceContext.onResourceSelected.range(endResource);
    await waitFor(() => {});
  }

  /**
   * Toggle the display lock on details
   */
  async toggleLockDetails() {
    await this.resourceWorkspaceContext.onLockDetail();
    await waitFor(() => {});
  }

  /**
   * Go to a resource uri
   * @param resource A specific resource
   */
  async goToResourceUri(resource) {
    await this.resourceWorkspaceContext.onGoToResourceUriRequested(resource);
  }

  /**
   * Returns the rendering of  the page
   * @param appContext a app context
   * @param text a specific text search filter
   * @param tag a specific tag search filter
   */
  setup(appContext, args = {}) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <Router history={createMemoryHistory({initialEntries: [
          "/app/folders/view/:filterByFolderId",
          "/app/passwords/view/:selectedResourceId",
          "/app/passwords",
        ]})}>
          <Switch>
            <Route path={[
              "/app/folders/view/:filterByFolderId",
              "/app/passwords/view/:selectedResourceId",
              "/app/passwords",
            ]}>
              <ResourceWorkspaceContextProvider>
                <ResourceWorkspaceContext.Consumer>
                  {
                    ResourceWorkspaceContext => {
                      this.resourceWorkspaceContext = ResourceWorkspaceContext;
                      return (<></>);
                    }
                  }
                </ResourceWorkspaceContext.Consumer>
              </ResourceWorkspaceContextProvider>
            </Route>
          </Switch>
          <NavLink
            to="/app/passwords">
            <a className="all"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED}}}}>
            <a className="recently-modified"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME}}}}>
            <a className="shared-with-me"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN}}}}>
            <a className="items-i-own"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.FAVORITE}}}}>
            <a className="favorite"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.TEXT, payload: args.text}}}}>
            <a className="text"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.TAG, payload: args.tag}}}}>
            <a className="tag"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.GROUP, payload: args.group}}}}>
            <a className="group"></a>
          </NavLink>
          <NavLink
            to={{pathname: `/app/folders/view/${(args.folder ? args.folder.id : "")}`, state: {filter: {type: ResourceWorkspaceFilterTypes.FOLDER, payload: {folder: args.folder}}}}}>
            <a className="folder"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/passwords", state: {filter: {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER}}}}>
            <a className="root-folder"></a>
          </NavLink>
        </Router>
      </AppContext.Provider>
    );
  }
}
