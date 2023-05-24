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
 * @since         3.8.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import Autocomplete from "./Autocomplete";

/**
 * The Autocomplete component represented as a page
 */
export default class AutocompletePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <Autocomplete {...props}/>
    );
  }

  /**
   * Returns the autocomplete
   * @returns {HTMLElement}
   */
  get autocomplete() {
    return this._page.container.querySelector(".autocomplete");
  }

  /**
   * Returns the autocomplete input element
   */
  get input() {
    return this._page.container.querySelector('.autocomplete input');
  }

  /**
   * Returns the autocomplete content
   * @returns {HTMLElement}
   */
  get autocompleteContent() {
    return this._page.container.querySelector(".autocomplete-content");
  }

  /**
   * Returns the autocomplete content
   * @returns {string}
   */
  get autocompleteLabel() {
    return this._page.container.querySelector(".autocomplete label").textContent;
  }

  /**
   * Returns the autocomplete item at the index
   * @param {int} index
   * @returns {HTMLElement}
   */
  getAutocompleteItem(index) {
    return this._page.container.querySelectorAll(".autocomplete-content li button")[index - 1];
  }

  /**
   * Returns the autocomplete item name at the index
   * @param {int} index
   * @returns {string}
   */
  getAutocompleteItemName(index) {
    return this._page.container.querySelectorAll(".autocomplete-content li .name")[index - 1].textContent;
  }

  /**
   * Returns the autocomplete item name at the index
   * @param {int} index
   * @returns {string}
   */
  getAutocompleteItemDetails(index) {
    return this._page.container.querySelectorAll(".autocomplete-content li .details")[index - 1].textContent;
  }

  /**
   * Returns the autocomplete item empty
   * @returns {string}
   */
  get autocompleteEmpty() {
    return this._page.container.querySelector(".autocomplete-content li p").textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.autocomplete !== null;
  }

  /** Click on the item at index */
  async clickOnItem(index) {
    const leftClick = {button: 0};
    fireEvent.click(this.getAutocompleteItem(index), leftClick);
    await waitFor(() => {});
  }

  /** fill the input element with data */
  async fillInput(data, inProgressFn = () => {}) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.input, dataInputEvent);
    jest.advanceTimersByTime(150);
    await waitFor(inProgressFn);
  }
}
