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
 * @since         3.8.0
 */

import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import Select from "./Select";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The SelectPage component represented as a page
 */
export default class SelectPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Select {...props}></Select>
      </MockTranslationProvider>
    );
  }

  /**
   * search for selector into HTML
   */
  find(key) {
    return this._page.container.querySelector(key);
  }

  get container() {
    return this._page.container.querySelector(SelectorEnum.container);
  }

  get select() {
    return this._page.container.querySelector(SelectorEnum.select);
  }

  get selectedValue() {
    return this._page.container.querySelector(SelectorEnum.selectedValue);
  }

  get selectItems() {
    return this._page.container.querySelector(SelectorEnum.items);
  }

  get searchInput() {
    return this._page.container.querySelector(SelectorEnum.searchInput);
  }

  /**
   * search for selector into HTML
   */
  isOpen() {
    return this.find(SelectorEnum.select).classList.contains("open");
  }

  /**
   * retrieve style of select container
   */
  getContainerStyle() {
    return window.getComputedStyle(this.container);
  }

  /**
   * check direction for select
   */
  hasDirection(direction) {
    return this.select.classList.contains(direction);
  }

  /**
   * check id for select
   */
  hasId(id) {
    return this.find(`#${id}`) === null;
  }


  /**
   * Click on the component
   */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on the component with right click
   */
  async rightClick(component)  {
    const rightClick = {button: 0};
    fireEvent.contextMenu(component, rightClick);
    await waitFor(() => {});
  }

  /** Drag start on the component */
  async dragStart(component)  {
    fireEvent.dragStart(component);
    await waitFor(() => {});
  }

  /** Scroll event on component */
  async scroll(component)  {
    fireEvent.scroll(component);
    await waitFor(() => {});
  }

  /**
   * click on select item to open/close it
   */
  async clickOnSelect() {
    await this.click(this.selectedValue);
  }

  /**
   * Click on the enter keyboard
   */
  async onEnter(component) {
    fireEvent.keyDown(component, {keyCode: 13});
    await waitFor(() => {});
  }

  /**
   * Click on the arrow down
   */
  async onArrowDown(component) {
    fireEvent.keyDown(component, {keyCode: 40});
    await waitFor(() => {});
  }

  /**
   * Click on the arrow up
   */
  async onArrowUp(component) {
    fireEvent.keyDown(component, {keyCode: 38});
    await waitFor(() => {});
  }

  /**
   * Click on the arrow up
   */
  async onEscape(component) {
    fireEvent.keyDown(component, {keyCode: 27});
    await waitFor(() => {});
  }

  /**
   * Click on the arrow right
   */
  async onArrowright(component) {
    fireEvent.keyDown(component, {keyCode: 39});
    await waitFor(() => {});
  }

  /** fill the input element with data */
  async fillInput(search)  {
    fireEvent.change(this.searchInput, {target: {value: search}});
    await waitFor(() => {});
  }
}


/**
 * enumeration for html selector to avoid hardcoding
 */
export const SelectorEnum = {
  items: '.items',
  searchInput: '.search-input',
  container: '.select-container',
  select: '.select',
  selectedValue: '.selected-value',
  option: '.option',
  firstItem: '.option[tabindex = "1"]',
};
