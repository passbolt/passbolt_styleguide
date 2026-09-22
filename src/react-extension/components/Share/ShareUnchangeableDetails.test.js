/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.16.0
 */
import { render } from "@testing-library/react";
import React from "react";
import ShareUnchangeableDetails from "./ShareUnchangeableDetails";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

describe("ShareUnchangeableDetails", () => {
  const renderComponent = (resources) =>
    render(
      <MockTranslationProvider>
        <ShareUnchangeableDetails resources={resources} />
      </MockTranslationProvider>,
    );

  /**
   * Returns the text of every rendered line, the count header included.
   * @param {HTMLElement} container The rendered container
   * @returns {Array<string>}
   */
  const lines = (container) =>
    Array.from(container.querySelectorAll(".share-details-list > span")).map((line) => line.textContent);

  it("lists the items the operator can't re-permission, with the permission level that would have applied", () => {
    expect.assertions(1);
    const { container } = renderComponent([
      { name: "R2", type: 7 },
      { name: "R3", type: 7 },
    ]);

    expect(lines(container)).toEqual(["2 permissions cannot apply:", "• R2(Can edit)", "• R3(Can edit)"]);
  });

  it("truncates the list at three items and appends an 'and more...' line", () => {
    expect.assertions(1);
    const resources = Array.from({ length: 5 }, (_, index) => ({ name: `R${index + 1}`, type: 15 }));
    const { container } = renderComponent(resources);

    expect(lines(container)).toEqual([
      "5 permissions cannot apply:",
      "• R1(Is owner)",
      "• R2(Is owner)",
      "• R3(Is owner)",
      "and more...",
    ]);
  });

  it("does not warn about more items when they all fit", () => {
    expect.assertions(1);
    const { container } = renderComponent([{ name: "R2", type: 1 }]);

    expect(lines(container)).toEqual(["One permission cannot apply:", "• R2(Can read)"]);
  });
});
