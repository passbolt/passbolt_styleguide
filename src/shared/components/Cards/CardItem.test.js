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
 * @since         5.0.0
 */

/**
 * Unit tests on CardItem in regard of specifications
 */
jest.mock("../../../img/svg/Frame.svg", () => () => <svg data-testid="frame-svg" />);
import React from "react";
import CardItemPage from "./CardItem.test.page";
import {waitFor} from "@testing-library/dom";

describe("Card Item", () => {
  it("should display the card with and icon, a title, a description and be able to be clicked", () => {
    expect.assertions(5);

    const props = {
      icon: <svg id="icon"></svg>,
      title: "test",
      description: "This is the description",
      onClick: jest.fn(),
    };

    const page = new CardItemPage(props);
    expect(page.icon).not.toBeNull();
    expect(page.title.textContent).toStrictEqual(props.title);
    expect(page.description.textContent).toStrictEqual(props.description);

    expect(props.onClick).toHaveBeenCalledTimes(0);
    page.click();
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it("should display the card without the description", () => {
    expect.assertions(1);

    const props = {
      icon: <svg id="icon"></svg>,
      title: "test",
      onClick: jest.fn(),
    };

    const page = new CardItemPage(props);

    expect(page.description).toBeNull();
  });

  it("should display the card Pro teasing icon if proTeasing is true", async() => {
    expect.assertions(1);

    const props = {
      icon: <svg id="icon"></svg>,
      title: "test",
      description: "This is the description",
      onClick: jest.fn(),
      proTeasing: true,
    };

    const page = new CardItemPage(props);
    await waitFor(() => {});

    expect(page.proTeasingIcon).not.toBeNull();
  });

  it("should not display the card Pro teasing icon if proTeasing is false", async() => {
    expect.assertions(1);

    const props = {
      icon: <svg id="icon"></svg>,
      title: "test",
      description: "This is the description",
      onClick: jest.fn(),
      proTeasing: false,
    };

    const page = new CardItemPage(props);
    await waitFor(() => {});

    expect(page.proTeasingIcon).toBeNull();
  });
});
