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
 * @since         5.3.2
 */

import mockComponentSetState from "../../test/mock/components/React/mockSetState";
import { ManagedClipboardServiceProvider } from "./ManagedClipboardServiceProvider";
import { defaultProps } from "./ManagedClipboardServiceProvider.test.data";

describe("ManagedClipboardServiceProvider", () => {
  describe("::copy", () => {
    it("should call for the service worker service to copy the given content", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new ManagedClipboardServiceProvider(props);
      mockComponentSetState(contextProvider);

      jest.spyOn(props.context.port, "request").mockImplementation(() => {});

      contextProvider.copy("data", "The content has been copied to clipboard");

      expect(props.context.port.request).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy", "data");
    });

    it("should assert its parameters", async () => {
      expect.assertions(2);

      const contextProvider = new ManagedClipboardServiceProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(() => contextProvider.copy(42, "test")).rejects.toThrowError();
      expect(() => contextProvider.copy("test", 42)).rejects.toThrowError();
    });
  });

  describe("::copyTemporarily", () => {
    it("should call for the service worker service to temporarily copy the given content", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new ManagedClipboardServiceProvider(props);
      mockComponentSetState(contextProvider);

      jest.spyOn(props.context.port, "request").mockImplementation(() => {});

      contextProvider.copyTemporarily("data", "The content has been copied to clipboard");

      expect(props.context.port.request).toHaveBeenCalledTimes(1);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "data");
    });

    it("should assert its parameters", async () => {
      expect.assertions(2);

      const props = defaultProps();
      props.context.port.addRequestListener(
        "passbolt.account-recovery.continue",
        jest.fn(() => Promise.reject()),
      );
      const contextProvider = new ManagedClipboardServiceProvider(props);
      mockComponentSetState(contextProvider);

      expect(() => contextProvider.copyTemporarily(42, "test")).rejects.toThrowError();
      expect(() => contextProvider.copyTemporarily("test", 42)).rejects.toThrowError();
    });
  });
});
