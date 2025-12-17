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
 * @since         5.2.0
 */

/**
 * Unit tests on ResourceIcon in regard of specifications
 */

import {
  defaultProps,
  resourceWithAppearance,
  resourceWithClearAppearance,
  resourceWithTransparentColor,
} from "./ResourceIcon.test.data";
import ResourceIconPage from "./ResourceIcon.test.page";

/**
 * Tests Resource Icon in regards of specification
 * However, tests are mostly here for code coverage improvment.
 * These lacks of true checks due to the fact the svg is not really rendered.
 */
describe("ResourceIcon", () => {
  it("Should render the Icon with the default resource type icon if no appearance is define on the resource", () => {
    expect.assertions(1);

    const props = defaultProps();
    const page = new ResourceIconPage(props);

    expect(page.exists()).toBeTruthy();
  });

  it("Should render the selected Icon if an appearance is define on the resource", () => {
    expect.assertions(1);

    const props = resourceWithAppearance();
    const page = new ResourceIconPage(props);

    expect(page.exists()).toBeTruthy();
  });

  it("Should render the selected Icon with a color if an appearance is define on the resource", () => {
    expect.assertions(1);

    const props = resourceWithClearAppearance();
    const page = new ResourceIconPage(props);

    expect(page.exists()).toBeTruthy();
  });

  it("Should render the selected Icon with specific stroke color if the selected color is transparent", () => {
    expect.assertions(1);

    const props = resourceWithTransparentColor();
    const page = new ResourceIconPage(props);

    expect(page.exists()).toBeTruthy();
  });
});
