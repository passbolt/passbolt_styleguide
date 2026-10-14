/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayHealthcheckAdministration from "./DisplayHealthcheckAdministration";
import DisplayAdministrationHealthcheckActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationHealthcheckActions/DisplayAdministrationHealthcheckActions";

/**
 * The DisplayHealthcheckAdministration component represented as a page.
 */
export default class DisplayHealthcheckAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(this.constructor.markup(props));
    // The sidebar portals into #administration-help-panel, which is only in the document once the first render commits.
    this._page.rerender(this.constructor.markup(props));
  }

  /**
   * The tree rendered by this page object.
   * @param {object} props Props to attach
   * @returns {JSX.Element}
   */
  static markup(props) {
    return (
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DisplayAdministrationHealthcheckActions {...props} />
          <DisplayHealthcheckAdministration {...props} />
          <div id="administration-help-panel"></div>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Rerender the page with the given props.
   * @param {object} props Props to attach
   * @returns {Promise<void>}
   */
  async rerender(props) {
    this._page.rerender(this.constructor.markup(props));
    await waitFor(() => {});
  }

  /**
   * Returns true if the page exists.
   * @returns {boolean}
   */
  exists() {
    return this.healthcheckSettings !== null;
  }

  /**
   * The panel root.
   * @returns {HTMLElement}
   */
  get healthcheckSettings() {
    return this._page.container.querySelector(".healthcheck-settings");
  }

  /**
   * The refresh button of the workspace toolbar.
   * @returns {HTMLElement}
   */
  get toolbarActionsRefreshButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[0];
  }

  /**
   * True when the refresh button can be used.
   * @returns {boolean}
   */
  isRefreshButtonEnabled() {
    return !this.toolbarActionsRefreshButton.hasAttribute("disabled");
  }

  /**
   * The empty state, if any.
   * @returns {HTMLElement|null}
   */
  get emptyState() {
    return this._page.container.querySelector(".healthcheck-empty");
  }

  /**
   * All the rendered domains, in render order.
   * @returns {Array<HTMLElement>}
   */
  get domains() {
    return Array.from(this._page.container.querySelectorAll(".healthcheck-domain"));
  }

  /**
   * The number of rendered domains.
   * @returns {number}
   */
  get domainCount() {
    return this.domains.length;
  }

  /**
   * The titles of the rendered domains, in render order.
   * @returns {Array<string>}
   */
  get domainTitles() {
    return this.domains.map((domain) => domain.querySelector(".healthcheck-domain-toggle span").textContent);
  }

  /**
   * The disclosure button of the given domain.
   * @param {number} domainIndex
   * @returns {HTMLElement}
   */
  domainToggle(domainIndex) {
    return this.domains[domainIndex].querySelector(".healthcheck-domain-toggle");
  }

  /**
   * True when the given domain reports itself expanded.
   * @param {number} domainIndex
   * @returns {boolean}
   */
  isDomainExpanded(domainIndex) {
    return this.domainToggle(domainIndex).getAttribute("aria-expanded") === "true";
  }

  /**
   * The section holding the checks of the given domain, if it is rendered.
   * @param {number} domainIndex
   * @returns {HTMLElement|null}
   */
  domainSection(domainIndex) {
    return this.domains[domainIndex].querySelector(".healthcheck-domain-section");
  }

  /**
   * The check rows of the given domain, in render order.
   * @param {number} domainIndex
   * @returns {Array<HTMLElement>}
   */
  checks(domainIndex) {
    return Array.from(this.domains[domainIndex].querySelectorAll(".healthcheck-check"));
  }

  /**
   * The badge modifier class carried by the given check, e.g. "healthcheck-badge--warning".
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {string|undefined}
   */
  checkBadgeModifier(domainIndex, checkIndex) {
    const badge = this.checks(domainIndex)[checkIndex].querySelector(".healthcheck-badge");
    return Array.from(badge.classList).find((className) => className.startsWith("healthcheck-badge--"));
  }

  /**
   * The message of the given check.
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {string}
   */
  checkMessage(domainIndex, checkIndex) {
    return this.checks(domainIndex)[checkIndex].querySelector(".healthcheck-check-message").textContent;
  }

  /**
   * The help disclosure button of the given check, if it has one.
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {HTMLElement|null}
   */
  helpToggle(domainIndex, checkIndex) {
    return this.checks(domainIndex)[checkIndex].querySelector(".healthcheck-help-toggle");
  }

  /**
   * True when the given check reports its help opened.
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {boolean}
   */
  isHelpOpened(domainIndex, checkIndex) {
    return this.helpToggle(domainIndex, checkIndex)?.getAttribute("aria-expanded") === "true";
  }

  /**
   * The help list of the given check, if it is rendered.
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {HTMLElement|null}
   */
  helpList(domainIndex, checkIndex) {
    return this.checks(domainIndex)[checkIndex].querySelector(".healthcheck-help");
  }

  /**
   * The help entries of the given check, in render order.
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {Array<HTMLElement>}
   */
  helpEntries(domainIndex, checkIndex) {
    return Array.from(this.checks(domainIndex)[checkIndex].querySelectorAll(".healthcheck-help li"));
  }

  /**
   * The links of the help of the given check, in render order.
   * @param {number} domainIndex
   * @param {number} checkIndex
   * @returns {Array<HTMLElement>}
   */
  helpLinks(domainIndex, checkIndex) {
    return Array.from(this.checks(domainIndex)[checkIndex].querySelectorAll(".healthcheck-help a"));
  }

  /**
   * All the badge modifiers rendered on the page, in render order.
   * Scoped to the panel root: the sidebar legend carries badges of its own.
   * @returns {Array<string>}
   */
  get allBadgeModifiers() {
    return Array.from(this._page.container.querySelectorAll(".healthcheck-settings .healthcheck-badge")).map((badge) =>
      Array.from(badge.classList).find((className) => className.startsWith("healthcheck-badge--")),
    );
  }

  /**
   * The badge modifiers of the sidebar legend, in render order.
   * @returns {Array<string>}
   */
  get legendBadgeModifiers() {
    return Array.from(
      this._page.container.querySelectorAll("#administration-help-panel .healthcheck-color-legends .healthcheck-badge"),
    ).map((badge) => Array.from(badge.classList).find((className) => className.startsWith("healthcheck-badge--")));
  }

  /**
   * The message shown when the endpoint is disabled, if it is rendered.
   * @returns {HTMLElement|null}
   */
  get endpointDisabledMessage() {
    return this._page.container.querySelector(".healthcheck-endpoint-disabled");
  }

  /**
   * Click on an element and wait for the re-render.
   * @param {HTMLElement} element
   * @returns {Promise<void>}
   */
  async click(element) {
    fireEvent.click(element, { button: 0 });
    await waitFor(() => {});
  }
}
