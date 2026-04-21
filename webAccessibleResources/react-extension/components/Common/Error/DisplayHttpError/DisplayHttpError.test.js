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
 * @since         4.5.3
 */

/**
 * Unit tests on DisplayHttpError in regard of specifications
 */
import DisplayHttpErrorPage from "./DisplayHttpError.test.page";
import each from "jest-each";

describe("Display Http Error", () => {
  each([
    {
      errorCode: 403,
      title: "Whoops... access is denied",
      description: "Access is restricted to authorized users only.",
    },
    {
      errorCode: 404,
      title: "Whoops... looks like you are lost.",
      description: "We could not find the page you are looking for.",
    },
  ]).describe("As LU, I should see a proper HTTP error code page", (scenario) => {
    it(`with ${scenario.errorCode}`, () => {
      expect.assertions(3);
      const page = new DisplayHttpErrorPage(scenario.errorCode);

      expect(page.errorCode).toStrictEqual(scenario.errorCode.toString());
      expect(page.title).toStrictEqual(scenario.title);
      expect(page.description).toStrictEqual(scenario.description);
    });
  });

  it("Should not crash if an unsupported error code is given", () => {
    expect.assertions(3);
    const page = new DisplayHttpErrorPage(200);

    expect(page.errorCode).toStrictEqual("200");
    expect(page.title).toStrictEqual("");
    expect(page.description).toStrictEqual("");
  });
});
