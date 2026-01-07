/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import mockComponentSetState from "../test/mock/components/React/mockSetState";
import { ProgressContextProvider } from "./ProgressContext";
import { defaultProps } from "./ProgressContext.test.data";
import DisplayProgress from "../components/Common/Progress/DisplayProgress/DisplayProgress";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ProgressContext", () => {
  it("Should initialiaze with default state values.", async () => {
    const contextProvider = new ProgressContextProvider(defaultProps());
    mockComponentSetState(contextProvider);

    expect.assertions(2);

    expect(contextProvider.state.progressDialogProps).toBeNull();
    expect(contextProvider.state.dialogIndex).toBeNull();
  });

  it("Should open dialog with given progress details.", async () => {
    const props = defaultProps();
    const contextProvider = new ProgressContextProvider(props);
    mockComponentSetState(contextProvider);
    jest.spyOn(props.dialogContext, "open").mockImplementationOnce(() => 42);

    expect.assertions(3);

    contextProvider.open("Progress dialog test title", 2, "Progress dialog test message");
    expect(props.dialogContext.open).toHaveBeenCalledWith(DisplayProgress);
    expect(contextProvider.state.progressDialogProps).toEqual({
      goals: 2,
      message: "Progress dialog test message",
      title: "Progress dialog test title",
    });
    expect(contextProvider.state.dialogIndex).toEqual(42);
  });

  it("Should update existing dialog message.", async () => {
    const props = defaultProps();
    const contextProvider = new ProgressContextProvider(props);
    mockComponentSetState(contextProvider);

    expect.assertions(1);

    contextProvider.open("Progress dialog test title", 2, "Progress dialog test message");
    contextProvider.updateMessage("Progress dialog test message updated", true);

    expect(contextProvider.state.progressDialogProps).toEqual({
      goals: 2,
      message: "Progress dialog test message updated",
      title: "Progress dialog test title",
      completed: true,
    });
  });

  it("Should update existing dialog goals.", async () => {
    const props = defaultProps();
    const contextProvider = new ProgressContextProvider(props);
    mockComponentSetState(contextProvider);

    expect.assertions(1);

    contextProvider.open("Progress dialog test title", 2, "Progress dialog test message");
    contextProvider.updateGoals(42);

    expect(contextProvider.state.progressDialogProps).toEqual({
      goals: 42,
      message: "Progress dialog test message",
      title: "Progress dialog test title",
    });
  });

  it("Should close dialog.", async () => {
    const props = defaultProps();
    const contextProvider = new ProgressContextProvider(props);
    mockComponentSetState(contextProvider);
    jest.spyOn(props.dialogContext, "open").mockImplementationOnce(() => 42);

    expect.assertions(1);

    contextProvider.open("Progress dialog test title", 2, "Progress dialog test message");
    contextProvider.close();

    expect(props.dialogContext.close).toHaveBeenCalledWith(42);
  });
});
