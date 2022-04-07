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
 * @since         2.12.0
 */

import React from "react";
import {render} from "@testing-library/react";
import DisplayProgress from "./DisplayProgress";
import AppContext from "../../../../contexts/AppContext";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

describe("DisplayProgress", () => {
  it("displays a spinning 100% progress bar by default.", () => {
    const appContext = {progressDialogProps: {title: "Progress dialog title"}};

    const {container} = render(
      <AppContext.Provider value={appContext}>
        <MockTranslationProvider>
          <DisplayProgress t={text => text}/>
        </MockTranslationProvider>
      </AppContext.Provider>
    );

    jest.advanceTimersByTime(500);

    // Dialog title exists and correct
    const dialogTitle = container.querySelector(".dialog-header h2");
    expect(dialogTitle).not.toBeNull();
    expect(dialogTitle.textContent).toBe("Progress dialog title");

    // Dialog label content
    const dialogContentLabel = container.querySelector(".form-content label");
    expect(dialogContentLabel.textContent).toBe("Take a deep breath and enjoy being in the present moment...");

    // Progress bar.
    const progressBarElement = container.querySelector(".progress");
    const progressBarStyle = window.getComputedStyle(progressBarElement);
    expect(progressBarStyle.width).toBe("17.355371900826455%");

    // Progress details elements to not be displayed.
    const progressDetailsElement = container.querySelector(".progress-details");
    expect(progressDetailsElement).toBeNull();

    // Primary button exists
    const primaryButton = container.querySelector(".button.processing");
    expect(primaryButton).not.toBeNull();
  });

  it("displays a progressive progress bar.", async() => {
    const appContext = {progressDialogProps: {title: "Progress dialog title", goals: 2, message: "Step 0", completed: 0}};

    const {container} = render(
      <AppContext.Provider value={appContext}>
        <MockTranslationProvider>
          <DisplayProgress/>
        </MockTranslationProvider>
      </AppContext.Provider>
    );

    // Progress bar.
    const progressBarElement = container.querySelector(".progress");
    const progressBarStyle = window.getComputedStyle(progressBarElement);
    expect(progressBarStyle.width).toBe("0%");

    // Details message.
    const progressStepLabel = container.querySelector(".progress-step-label");
    // &nbsp; translate to unix code \u00a0
    expect(progressStepLabel.textContent).toBe("Step 0");

    // Details percent.
    const progressPercent = container.querySelector(".progress-percent");
    expect(progressPercent.textContent).toBe("0%");

    // Progress details elements to not be displayed.
    const progressDetailsElement = container.querySelector(".progress-details");
    expect(progressDetailsElement).not.toBeNull();
  });
});
