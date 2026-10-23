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
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import ShareDialog from "./ShareDialog";
import AppContext from "../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import userEvent from "@testing-library/user-event";

/**
 * The ShareDialog component represented as a page
 */
export default class ShareDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <ShareDialog {...props} listMinSize={20} />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title").textContent;
  }

  /**
   * Returns the text of every item listed in the title info tooltip, or null when no tooltip is
   * rendered
   * @returns {null|Array<string>}
   */
  get titleTooltipItems() {
    const tooltip = this._page.container.querySelector(".dialog-title-wrapper .tooltip-text");
    if (!tooltip) {
      return null;
    }
    return Array.from(tooltip.querySelectorAll(".share-details-item")).map((item) => item.textContent);
  }

  /**
   * Returns the text of the title info tooltip header, or null when no tooltip is rendered
   * @returns {null|string}
   */
  get titleTooltipHeader() {
    // `:first-child` matters, the "and more..." line is a class less span as well.
    const header = this._page.container.querySelector(
      ".dialog-title-wrapper .tooltip-text .share-details-list > span:not(.share-details-item):first-child",
    );
    return header?.textContent ?? null;
  }

  /**
   * Returns the dialog subtitle
   */
  get subtitle() {
    return this._page.container.querySelector(".dialog-header-subtitle").textContent;
  }

  /**
   * Returns the dialog element
   */
  get form() {
    return this._page.container.querySelector(".share-form");
  }

  /**
   * Returns the dialog wrapper element, carrying the mode classes the styles hook onto
   */
  get dialogWrapper() {
    return this._page.container.querySelector(".share-dialog");
  }
  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Returns the autocomplete share name input element
   */
  get shareNameInput() {
    return this._page.container.querySelector("#share-name-input");
  }

  /**
   * Returns the warning message element
   */
  get warningMessage() {
    return this._page.container.querySelector(".message.warning").textContent;
  }

  /**
   * Returns the error message element
   */
  get errorMessage() {
    return this._page.container.querySelector(".error.message").textContent;
  }

  /**
   * Returns true when an error message is displayed
   */
  get hasErrorMessage() {
    return Boolean(this._page.container.querySelector(".error.message"));
  }

  /**
   * Returns the move "left unchanged" warning text, or null when it is not rendered
   */
  get unchangedWarning() {
    return this._page.container.querySelector(".message.warning .unchanged-warning")?.textContent ?? null;
  }

  /**
   * Returns the "group compositions updated" warning text, or null when it is not rendered
   */
  get changedGroupsWarning() {
    return this._page.container.querySelector(".message.warning .changed-groups-warning")?.textContent ?? null;
  }

  /**
   * Returns true if the 'index' permission row is highlighted as a group whose composition changed
   */
  isCompositionChanged(index) {
    return this._page.container
      .querySelectorAll(".permissions .row")
      [index - 1].classList.contains("composition-changed");
  }

  /**
   * Returns the attention triangle icon rendered in the "left unchanged" warning banner, or null
   */
  get unchangedWarningIcon() {
    return this._page.container.querySelector(".message.warning .attention-triangle");
  }

  /**
   * Get user or group autocomplete for the index one
   * @returns {Element}
   */
  userOrGroupAutocomplete(index) {
    return this._page.container.querySelectorAll(".autocomplete-item .row .main-cell-wrapper .main-cell button")[
      index - 1
    ];
  }

  /**
   * Returns the number of displayed users and groups
   */
  get count() {
    return this._page.container.querySelectorAll(".permissions .row .aro-name").length;
  }

  /**
   * Returns the user first name and last name for the 'index' one
   * @param index the display of the user
   */
  aroName(index) {
    return this._page.container.querySelectorAll(".permissions .row .aro-name")[index - 1].querySelector(".ellipsis")
      .textContent;
  }

  /**
   * Returns the user email for the 'index' one
   * @param index the display of the user email
   */
  aroDetails(index) {
    return this._page.container.querySelectorAll(".permissions .row .aro-details")[index - 1].querySelector(".ellipsis")
      .textContent;
  }

  /**
   * Returns how many permission rows have "varies" selected
   */
  get variesCount() {
    return Array.from(this._page.container.querySelectorAll(".permissions .row .selected-value .value")).filter(
      (value) => value.textContent.trim() === "varies",
    ).length;
  }

  /**
   * Returns how many attention icons, the red triangles, are rendered across the permission rows
   */
  get attentionIconCount() {
    return this._page.container.querySelectorAll(".permissions .row .attention-triangle").length;
  }

  /**
   * Returns how many plain varies icons are rendered across the permission rows
   */
  get variesIconCount() {
    return this._page.container.querySelectorAll(".permissions .row .varies-icon").length;
  }

  /**
   * Returns the permission row whose aro details (username/group label) match, or undefined.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {Element|undefined}
   */
  rowForAro(aroDetails) {
    return Array.from(this._page.container.querySelectorAll(".permissions .row")).find(
      (element) => element.querySelector(".aro-details .ellipsis")?.textContent === aroDetails,
    );
  }

  /**
   * Returns the permission select value for the row whose aro details (username/group label) match.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {string|null}
   */
  permissionValueForAro(aroDetails) {
    return this.rowForAro(aroDetails)?.querySelector(".selected-value .value")?.textContent ?? null;
  }

  /**
   * Returns the attention icon for the row whose aro details match, or null.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {Element|null}
   */
  attentionIconForAro(aroDetails) {
    return this.rowForAro(aroDetails)?.querySelector(".attention-triangle") ?? null;
  }

  /**
   * Returns the plain varies icon for the row whose aro details match, or null.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {Element|null}
   */
  variesIconForAro(aroDetails) {
    return this.rowForAro(aroDetails)?.querySelector(".varies-icon") ?? null;
  }

  /**
   * Returns the row's class list for the row whose aro details match, or null.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {DOMTokenList|null}
   */
  classListForAro(aroDetails) {
    return this.rowForAro(aroDetails)?.classList ?? null;
  }

  /**
   * Returns the change status chip for the row whose aro details match, or null.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {Element|null}
   */
  changeChipForAro(aroDetails) {
    return this.rowForAro(aroDetails)?.querySelector(".chips") ?? null;
  }

  /**
   * Returns the 1-based display index of the row whose aro details match, or null.
   * Needed by removeAro and revertAro, which take an index, because rows are sorted by name.
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @returns {number|null}
   */
  rowIndexForAro(aroDetails) {
    const rows = Array.from(this._page.container.querySelectorAll(".permissions .row"));
    const index = rows.findIndex(
      (element) => element.querySelector(".aro-details .ellipsis")?.textContent === aroDetails,
    );
    return index === -1 ? null : index + 1;
  }

  /**
   * Opens the permission select for the row whose aro details match and selects the option labelled
   * `labelText` (e.g. "can read", "is owner").
   * @param {string} aroDetails The aro-details text to match (e.g. a username)
   * @param {string} labelText The option label to select
   */
  async changePermissionForAro(aroDetails, labelText) {
    const row = this.rowForAro(aroDetails);
    await this.click(row.querySelector(".select .selected-value"));
    const option = Array.from(row.querySelectorAll(".select .option")).find(
      (element) => element.textContent.trim() === labelText,
    );
    await this.click(option);
  }

  /**
   * Returns the select rights for the 'index' one
   * @param index the display of the permission
   */
  selectRights(index) {
    return this._page.container
      .querySelectorAll(".permissions .row")
      [index - 1].querySelector(".select .selected-value");
  }

  /**
   * Returns the select item rights for the 'index' one
   * @param index the display of the permission
   */
  selectFirstItem(index) {
    return this._page.container.querySelectorAll(".permissions .row")[index - 1].querySelector(".select .option");
  }

  /**
   * Returns the select rights option element matching the given label for the 'index' row.
   * The select excludes its current value from the options, target options by label.
   * @param index the display of the permission row
   * @param label the option label, e.g. "can read", "is owner"
   */
  selectRightsItemByLabel(index, label) {
    const options = this._page.container
      .querySelectorAll(".permissions .row")
      [index - 1].querySelectorAll(".select .option");
    return Array.from(options).find((option) => option.textContent === label);
  }

  /**
   * Returns the change status chip for the 'index' row
   * @param index the display of the permission row
   */
  changeChip(index) {
    return this._page.container.querySelectorAll(".permissions .row")[index - 1].querySelector(".chips");
  }

  /**
   * Returns the varies info icon for the 'index' row (present while the permission varies)
   * @param index the display of the permission row
   */
  variesIcon(index) {
    return this._page.container.querySelectorAll(".permissions .row")[index - 1].querySelector(".varies-icon");
  }

  /**
   * Returns the close button to remove user for the 'index' one
   * @param index the display close button to remove user
   */
  removeAro(index) {
    return this._page.container.querySelectorAll(".permissions .row")[index - 1].querySelector(".remove-item");
  }

  /**
   * Returns the revert button for the 'index' row
   * @param index the display of the permission row
   */
  revertAro(index) {
    return this._page.container.querySelectorAll(".permissions .row")[index - 1].querySelector(".revert-item");
  }

  /**
   * Returns the aro id of the 'index' row, extracted from the row element id
   * @param index the display of the permission row
   */
  rowId(index) {
    return this._page.container.querySelectorAll(".permissions .row")[index - 1].id.replace("permission-item-", "");
  }

  /**
   * Returns the group member visibility toggle button for the 'index' row
   * @param index the display of the permission row
   */
  groupVisibilityToggle(index) {
    return this._page.container
      .querySelectorAll(".permissions .row")
      [index - 1].querySelector(".group-visibility-toggle");
  }

  /**
   * Returns the number of group member visibility toggles rendered
   */
  get groupToggleCount() {
    return this._page.container.querySelectorAll(".permissions .group-visibility-toggle").length;
  }

  /**
   * Returns the number of displayed group member rows
   */
  get groupMemberCount() {
    return this._page.container.querySelectorAll(".permissions .row.group-user-item").length;
  }

  /**
   * Returns the group member row for the 'index' one
   * @param index the display of the group member row
   */
  groupMember(index) {
    return this._page.container.querySelectorAll(".permissions .row.group-user-item")[index - 1];
  }

  /** Toggle the group member visibility for the 'index' row */
  async toggleGroupMemberVisibility(index) {
    await this.click(this.groupVisibilityToggle(index));
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.form !== null;
  }

  /** Click on the element */
  async click(element) {
    await this.user.click(element);
  }

  /** Click without wait for on the element */
  escapeKey() {
    // Escape key down event
    const escapeKeyDown = { keyCode: 27 };
    fireEvent.keyDown(this.form, escapeKeyDown);
  }

  /** fill the input element with data */
  async fillInput(element, data) {
    const dataInputEvent = { target: { value: data } };
    fireEvent.change(element, dataInputEvent);
    await waitFor(() => {});
  }

  /** fill the search autocomplete input element with data */
  async searchName(data) {
    await this.fillInput(this.shareNameInput, data);
  }

  /** Select a user or a group in autocmplete for the index one */
  async selectUserOrGroup(index) {
    await this.click(this.userOrGroupAutocomplete(index));
  }

  /** Select is owner rights */
  async selectFirstItemRights(index) {
    await this.click(this.selectRights(index));
    await this.click(this.selectFirstItem(index));
  }

  /** Select the rights option with the given label for the index row */
  async selectRightsOption(index, label) {
    await this.click(this.selectRights(index));
    await this.click(this.selectRightsItemByLabel(index, label));
  }

  /** Save permissions */
  async savePermissions() {
    await this.click(this.saveButton);
  }

  /** Save permissions without wait */
  async savePermissionsWithoutWait() {
    await this.click(this.saveButton);
  }

  /**remove permission*/
  async selectRemovePermission(index) {
    await this.click(this.removeAro(index));
  }

  /**revert a permission pending deletion*/
  async selectRevertPermission(index) {
    await this.click(this.revertAro(index));
  }
}
