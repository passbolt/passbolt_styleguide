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
 * @since         5.8.0
 */

import DisplayUserSecurityTokenHelpPage from "./DisplayUserSecurityTokenHelp.test.page";

describe("Change security token help", () => {
  let page;

  it("As AN I should see a link redirecting me to phising attacks definition", async () => {
    page = new DisplayUserSecurityTokenHelpPage();
    expect(page.phishingDefinitionLink.getAttribute("target")).toEqual("_blank");
    expect(page.phishingDefinitionLink.getAttribute("rel")).toEqual("noopener noreferrer");
    expect(page.phishingDefinitionLink.getAttribute("href")).toEqual("https://en.wikipedia.org/wiki/Phishing");
  });

  it("As AN I should see a link redirecting me to security token documentation", async () => {
    page = new DisplayUserSecurityTokenHelpPage();
    expect(page.tokenDocumentationLink.getAttribute("target")).toEqual("_blank");
    expect(page.tokenDocumentationLink.getAttribute("rel")).toEqual("noopener noreferrer");
    expect(page.tokenDocumentationLink.getAttribute("href")).toEqual(
      "https://www.passbolt.com/docs/user/settings/browser/security-token/",
    );
  });
});
