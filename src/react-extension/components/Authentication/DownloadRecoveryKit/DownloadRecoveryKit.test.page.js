import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import AuthenticationContextProvider from "../../../contexts/AuthenticationContext";
import DownloadRecoveryKit from "./DownloadRecoveryKit";
import SetupTranslations from "../../../SetupTranslations";

/**
 * The DownloadRecoveryKitPage component represented as a page
 */
export default class DownloadRecoveryKitPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(context, props) {
    this._page = render(
      <SetupTranslations>
        <AuthenticationContextProvider value={context}>
          <DownloadRecoveryKit {...props} />
        </AuthenticationContextProvider>
      </SetupTranslations>
    );
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the download link element
   */
  get downloadLink() {
    return this._page.container.querySelector('#download-kit');
  }

  /**
   * Downloads the recovery kit
   */
  async download() {
    const leftClick = {button: 0};
    fireEvent.click(this.downloadLink, leftClick);
    await waitFor(() => {});
  }

  /**
   * Continue the process
   */
  async next() {
    const leftClick = {button: 0};
    fireEvent.click(this.nextButton, leftClick);
    await waitFor(() => {});
  }
}
