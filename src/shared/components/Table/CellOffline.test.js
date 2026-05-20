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
 * @since         5.13.0
 */

import CellOfflineTestPage from "./CellOffline.test.page";
import {
  defaultProps,
  propsWithOfflineAvailable,
  propsWithOfflineNotAvailable,
  propsWithNoValue,
} from "./CellOffline.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("CellOffline", () => {
  describe("As a user I can see whether a resource is available offline", () => {
    it("should render 'Available offline' when the resource has an offline item", () => {
      expect.assertions(2);
      const props = propsWithOfflineAvailable();
      const page = new CellOfflineTestPage(props);

      expect(page.container).not.toBeNull();
      expect(page.label).toBe("Available offline");
    });

    it("should render 'Not available offline' when the resource has no offline item", () => {
      expect.assertions(2);
      const props = propsWithOfflineNotAvailable();
      const page = new CellOfflineTestPage(props);

      expect(page.container).not.toBeNull();
      expect(page.label).toBe("Not available offline");
    });

    it("should render 'Not available offline' by default when the resource has no offline property", () => {
      expect.assertions(2);
      const props = defaultProps();
      const page = new CellOfflineTestPage(props);

      expect(page.container).not.toBeNull();
      expect(page.label).toBe("Not available offline");
    });

    it("should render 'Not available offline' when value is undefined", () => {
      expect.assertions(2);
      const props = propsWithNoValue();
      const page = new CellOfflineTestPage(props);

      expect(page.container).not.toBeNull();
      expect(page.label).toBe("Not available offline");
    });
  });

  describe("As a user I can see the offline label update when props change", () => {
    it("should update from 'Not available offline' to 'Available offline' when offline item is added", () => {
      expect.assertions(2);
      const props = propsWithOfflineNotAvailable();
      const page = new CellOfflineTestPage(props);

      expect(page.label).toBe("Not available offline");

      page.rerender(propsWithOfflineAvailable());

      expect(page.label).toBe("Available offline");
    });

    it("should update from 'Available offline' to 'Not available offline' when offline item is removed", () => {
      expect.assertions(2);
      const props = propsWithOfflineAvailable();
      const page = new CellOfflineTestPage(props);

      expect(page.label).toBe("Available offline");

      page.rerender(propsWithOfflineNotAvailable());

      expect(page.label).toBe("Not available offline");
    });
  });
});
