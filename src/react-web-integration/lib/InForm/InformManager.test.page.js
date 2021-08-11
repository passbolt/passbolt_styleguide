/**
 * The InformManager component represented as a page
 */
import InFormManager from "./InFormManager";
import {fireEvent, waitFor} from "@testing-library/react";

export default class InformManagerPage {
  /**
   * Default constructor
   */
  constructor() {
    InFormManager.initialize();
  }

  destroy() {
    InFormManager.destroy();
  }

  /**
   * Returns the username element
   */
  get username() {
    return document.querySelector('#username');
  }

  /**
   * Returns the password element
   */
  get password() {
    return document.querySelector('#password');
  }

  /**
   * Returns the search element
   */
  get search() {
    return document.querySelector('#search');
  }

  /**
   * Returns the iframe call to action
   */
  get iframesCallToAction() {
    return document.querySelector('iframe');
  }

  /**
   * Returns the iframe length
   */
  get iframesLength() {
    return document.querySelectorAll('iframe').length;
  }

  /** Blur on the username element */
  async blurOnUsername()  {
    fireEvent.blur(this.username);
    await waitFor(() => {});
  }

  /** Blur on the password element */
  async blurOnPassword()  {
    fireEvent.blur(this.password);
    await waitFor(() => {});
  }

  /** Focus on the username element */
  async focusOnUsername()  {
    fireEvent.focus(this.username);
    await waitFor(() => {});
  }

  /** Focus on the password element */
  async focusOnPassword()  {
    fireEvent.focus(this.password);
    await waitFor(() => {});
  }

  /** Focus on the search element */
  async focusOnSearch()  {
    fireEvent.focus(this.search);
    await waitFor(() => {});
  }

  /** Mouse over on the username element */
  async mouseOverOnUsername()  {
    fireEvent.mouseOver(this.username);
    await waitFor(() => {});
  }

  /** Mouse over on the password element */
  async mouseOverOnPassword()  {
    fireEvent.mouseOver(this.password);
    await waitFor(() => {});
  }

  async clickOnInformCallToAction() {
    const leftClick = {button: 0};
    fireEvent.click(this.iframesCallToAction, leftClick);
    await waitFor(() => {});
  }
}