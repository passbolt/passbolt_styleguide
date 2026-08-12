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
 * @since         5.15.0
 */

/**
 * Unit tests on ShareVariesDetails in regard of specifications
 */
import React from "react";
import { render } from "@testing-library/react";
import ShareVariesDetails from "./ShareVariesDetails";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

describe("ShareVariesDetails", () => {
  const renderComponent = (variesDetails) =>
    render(
      <MockTranslationProvider>
        <ShareVariesDetails variesDetails={variesDetails} />
      </MockTranslationProvider>,
    );

  /**
   * Returns the text of every rendered line, the count header included.
   * @param {HTMLElement} container The rendered container
   * @returns {Array<string>}
   */
  const lines = (container) =>
    Array.from(container.querySelectorAll(".share-varies-details > span")).map((line) => line.textContent);

  it("renders the count and one line per item with its permission level", () => {
    expect.assertions(1);
    const { container } = renderComponent({ 0: [], 1: ["cakephp"], 7: ["apache"], 15: [] });

    expect(lines(container)).toEqual(["2 permissions vary:", "• apache(Can edit)", "• cakephp(Can read)"]);
  });

  it("renders the items the recipient has no permission on under no access", () => {
    expect.assertions(1);
    const { container } = renderComponent({ 0: ["nginx"], 1: ["apache"], 7: [], 15: ["redis"] });

    expect(lines(container)).toEqual([
      "3 permissions vary:",
      "• apache(Can read)",
      "• nginx(No access)",
      "• redis(Is owner)",
    ]);
  });

  it("sorts the lines by item name, whatever the permission level they are grouped under", () => {
    expect.assertions(1);
    const { container } = renderComponent({ 0: [], 1: ["zulu"], 7: ["alpha"], 15: [] });

    expect(lines(container)).toEqual(["2 permissions vary:", "• alpha(Can edit)", "• zulu(Can read)"]);
  });

  it("truncates the lines at three items and warns that there are more", () => {
    expect.assertions(1);
    const { container } = renderComponent({ 0: ["echo"], 1: ["alpha", "delta"], 7: ["bravo"], 15: ["charlie"] });

    expect(lines(container)).toEqual([
      "5 permissions vary:",
      "• alpha(Can read)",
      "• bravo(Can edit)",
      "• charlie(Is owner)",
      "and more...",
    ]);
  });

  it("does not warn about more items when they all fit", () => {
    expect.assertions(1);
    const { container } = renderComponent({ 0: [], 1: ["alpha", "bravo"], 7: ["charlie"], 15: [] });

    expect(lines(container)).toEqual([
      "3 permissions vary:",
      "• alpha(Can read)",
      "• bravo(Can read)",
      "• charlie(Can edit)",
    ]);
  });

  it("splits a line into a truncatable name and a permission label kept intact", () => {
    expect.assertions(2);
    const { container } = renderComponent({ 0: [], 1: ["a-very-long-resource-name"], 7: [], 15: [] });
    const line = container.querySelector(".share-varies-details .varies-detail");

    expect(line.querySelector(".ellipsis").textContent).toEqual("• a-very-long-resource-name");
    expect(line.querySelector(".varies-detail-permission").textContent).toEqual("(Can read)");
  });
});
