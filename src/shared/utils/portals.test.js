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

import React from "react";
import {createSafePortal} from "./portals";
import {createPortal} from "react-dom";

jest.mock("react-dom");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("portals", () => {
  describe('::createSafePortal', () => {
    it("should display the HTMLElement at the target element", () => {
      expect.assertions(2);

      const container = document.createElement("div");
      document.body.appendChild(container);

      const elementToPortal = (<div id="target"></div>);

      createSafePortal(elementToPortal, container, "key");

      expect(createPortal).toHaveBeenCalledTimes(1);
      expect(createPortal).toHaveBeenCalledWith(elementToPortal, container, "key");
    });

    it("should display an empty element if the target element doesn't exist", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);

      const elementToPortal = (<div id="target"></div>);

      createSafePortal(elementToPortal, document.getElementById("wrong-id"));

      expect(createPortal).not.toHaveBeenCalled();
    });
  });
});
