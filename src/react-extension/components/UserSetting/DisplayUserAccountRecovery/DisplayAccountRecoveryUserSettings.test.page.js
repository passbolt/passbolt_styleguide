import {render, fireEvent} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAccountRecoveryUserSettings from "./DisplayAccountRecoveryUserSettings";
import AccountRecoveryUserContextProvider from "../../../contexts/AccountRecoveryUserContext";
/**
 * The DisplayAccountRecoveryUserSettingsPage component represented as a page
 */
export default class DisplayAccountRecoveryUserSettingsPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(props, mockedAccountRecoveryUserService) {
    this._page = render(
      <AccountRecoveryUserContextProvider accountRecoveryUserService={mockedAccountRecoveryUserService} context={props.context}>
        <MockTranslationProvider>
          <DisplayAccountRecoveryUserSettings {...props}/>
        </MockTranslationProvider>
      </AccountRecoveryUserContextProvider>
    );
  }

  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  exists() {
    return this.title !== null;
  }

  get title() {
    return this.selector('.account-recovery-profile h3');
  }

  get status() {
    return this.selector('.account-recovery-profile .account-recovery-status .status-wrapper .status');
  }

  get requestorName() {
    return this.selector('.account-recovery-profile .account-recovery-status ul li .name-with-tooltip');
  }

  get requestDate() {
    return this.selector('.account-recovery-profile .account-recovery-status ul li .subinfo');
  }

  get fingerprint() {
    return this.selector('.account-recovery-profile .account-recovery-status ul li .tooltip').dataset.tooltip;
  }

  get description() {
    return this.selector('.account-recovery-profile p');
  }

  get reviewButton() {
    return this.selector('.account-recovery-profile .account-recovery-status button');
  }

  isPopupPresent() {
    return this.modalTitle !== null;
  }

  async clickOnReview() {
    fireEvent.click(this.reviewButton, {button: 0});
  }
}
