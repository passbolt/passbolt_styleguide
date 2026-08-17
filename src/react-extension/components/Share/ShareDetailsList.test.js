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
 * Unit tests on ShareDetailsList in regard of specifications
 */
import React from "react";
import { render } from "@testing-library/react";
import ShareDetailsList from "./ShareDetailsList";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

describe("ShareDetailsList", () => {
  const renderComponent = (items, header) =>
    render(
      <MockTranslationProvider>
        <ShareDetailsList items={items} header={header} />
      </MockTranslationProvider>,
    );

  /**
   * Returns the text of every rendered line, the header and the "and more..." line included.
   * @param {HTMLElement} container The rendered container
   * @returns {Array<string>}
   */
  const lines = (container) =>
    Array.from(container.querySelectorAll(".share-details-list > span")).map((line) => line.textContent);

  it("renders one line per item", () => {
    expect.assertions(1);
    const { container } = renderComponent([{ name: "apache" }, { name: "cakephp" }]);

    expect(lines(container)).toEqual(["• apache", "• cakephp"]);
  });

  it("renders the header above the items when one is given", () => {
    expect.assertions(1);
    const { container } = renderComponent([{ name: "apache" }], "2 permissions vary:");

    expect(lines(container)).toEqual(["2 permissions vary:", "• apache"]);
  });

  it("truncates the items at the display limit and warns that there are more", () => {
    expect.assertions(1);
    const items = ["alpha", "bravo", "charlie", "delta", "echo"].map((name) => ({ name }));
    const { container } = renderComponent(items);

    expect(lines(container)).toEqual(["• alpha", "• bravo", "• charlie", "and more..."]);
  });

  it("does not warn about more items when they all fit", () => {
    expect.assertions(1);
    const items = ["alpha", "bravo", "charlie"].map((name) => ({ name }));
    const { container } = renderComponent(items);

    expect(lines(container)).toEqual(["• alpha", "• bravo", "• charlie"]);
  });

  it("splits a line into a truncatable name and a detail kept intact", () => {
    expect.assertions(2);
    const { container } = renderComponent([{ name: "a-very-long-resource-name", detail: "Can read" }]);
    const line = container.querySelector(".share-details-item");

    expect(line.querySelector(".ellipsis").textContent).toEqual("• a-very-long-resource-name");
    expect(line.querySelector(".share-details-item-detail").textContent).toEqual("(Can read)");
  });

  it("renders no detail when the item carries none", () => {
    expect.assertions(1);
    const { container } = renderComponent([{ name: "apache" }]);

    expect(container.querySelector(".share-details-item .share-details-item-detail")).toBeNull();
  });
});
