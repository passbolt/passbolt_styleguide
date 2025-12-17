/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

/**
 * Unit tests on ChooseSecurityToken in regard of specifications
 */
import { defaultProps } from "./ChooseSecurityToken.test.data";
import ChooseSecurityTokenPage from "./ChooseSecurityToken.test.page";
import "../../../test/lib/crypto/cryptoGetRandomvalues";

beforeEach(() => {
  jest.resetModules();
});

describe("Choose security token", () => {
  let page, // The page to test against
    props; // The props to pass

  it("As AN I should be able to choose the color of my security token", async () => {
    props = defaultProps();
    page = new ChooseSecurityTokenPage(props);

    expect.assertions(1);
    const colorToPick = "#009688";
    const expectedSelectedColor = "rgb(0, 150, 136)";
    await page.selectColor(colorToPick);
    expect(page.color).toBe(expectedSelectedColor);
  });

  it("As AN I should be able to choose the code of my security token", async () => {
    props = defaultProps();
    page = new ChooseSecurityTokenPage(props);

    expect.assertions(1);
    const expectedSelectedCode = "";
    await page.fillCode(expectedSelectedCode);
    expect(page.code).toBe(expectedSelectedCode);
  });

  it("As AN I should be able to randomize the code of my security token", async () => {
    props = defaultProps();
    page = new ChooseSecurityTokenPage(props);

    expect.assertions(1);
    const colorToPick = "#009688";
    await page.selectColor(colorToPick);
    await page.randomize();
    expect(page.code.length).toBe(3);
  });

  it("As AN I cannot update the form fields while submitting the form", async () => {
    let saveResolve = null;
    const onComplete = jest.fn(() => new Promise((resolve) => (saveResolve = resolve)));
    props = defaultProps({ onComplete });
    page = new ChooseSecurityTokenPage(props);

    expect.hasAssertions();
    const inProgressFn = () => {
      expect(page.canChange).toBeFalsy();
      saveResolve();
    };
    await page.fillCode("ABC");
    await page.save(inProgressFn);
    expect(props.onComplete).toHaveBeenCalled();
    expect(saveResolve).toBeDefined();
  });

  it("As AN I should see a processing feedback while submitting the form", async () => {
    let saveResolve = null;
    const onComplete = jest.fn(() => new Promise((resolve) => (saveResolve = resolve)));
    props = defaultProps({ onComplete });
    page = new ChooseSecurityTokenPage(props);

    expect.hasAssertions();
    const inProgressFn = () => {
      expect(page.isProcessing).toBeTruthy();
      saveResolve();
    };
    await page.fillCode("ABC");
    await page.save(inProgressFn);
    expect(props.onComplete).toHaveBeenCalled();
    expect(saveResolve).toBeDefined();
  });

  it("As AN I should see a link redirecting me to phising attacks definition", async () => {
    page = new ChooseSecurityTokenPage(props);
    expect(page.phishingDefinitionLink.getAttribute("target")).toEqual("_blank");
    expect(page.phishingDefinitionLink.getAttribute("rel")).toEqual("noopener noreferrer");
    expect(page.phishingDefinitionLink.getAttribute("href")).toEqual("https://en.wikipedia.org/wiki/Phishing");
  });

  it("As AN I should see a link redirecting me to security token documentation", async () => {
    page = new ChooseSecurityTokenPage(props);
    expect(page.tokenDocumentationLink.getAttribute("target")).toEqual("_blank");
    expect(page.tokenDocumentationLink.getAttribute("rel")).toEqual("noopener noreferrer");
    expect(page.tokenDocumentationLink.getAttribute("href")).toEqual(
      "https://www.passbolt.com/docs/user/settings/browser/security-token/",
    );
  });

  it("As AN I should see an error if the security token is empty after submitting the form (first validation)", async () => {
    props = defaultProps();
    page = new ChooseSecurityTokenPage(props);

    expect.assertions(1);
    const emptyCode = " ";
    await page.fillCode(emptyCode);
    await page.save();
    expect(page.hasEmptyCodeError).toBeTruthy();
  });

  it("As AN I should see an error if the security token is not 3 length after submitting the form (first validation)", async () => {
    props = defaultProps();
    page = new ChooseSecurityTokenPage(props);

    expect.assertions(1);
    const notGoodLengthCode = "AB";
    await page.fillCode(notGoodLengthCode);
    await page.save();
    expect(page.hasNotGoodLengthCode).toBeTruthy();
  });

  it("As LU I should see an error if the security token do not valid the regex after submitting the form (first validation)", async () => {
    props = defaultProps();
    page = new ChooseSecurityTokenPage(props);

    expect.assertions(1);
    const notGoodRegexCode = "A#B";
    await page.fillCode(notGoodRegexCode);
    await page.save();
    expect(page.hasNotGoodRegexCode).toBeTruthy();
  });
});
