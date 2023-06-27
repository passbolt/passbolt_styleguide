/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 *
 */

import PownedService from "./pownedService";

describe('PownedService', () => {
  let port, pownedService;

  beforeEach(() => {
    port = {
      request: jest.fn()
    };
    pownedService = new PownedService(port);
  });

  describe('evaluateSecret', () => {
    it('should returns inDictionary=false and isPwnedServiceAvailable=true for secrets of length 8 or more', async() => {
      expect.assertions(1);

      port.request.mockResolvedValue(0);
      const result = await pownedService.evaluateSecret('password123');
      expect(result).toEqual({inDictionary: false, isPwnedServiceAvailable: true});
    });

    it('should returns inDictionary=true and isPwnedServiceAvailable=true for secrets of length less than 8', async() => {
      expect.assertions(1);

      const result = await pownedService.evaluateSecret('pass');
      expect(result).toEqual({inDictionary: true, isPwnedServiceAvailable: true});
    });

    it('should returns inDictionary=false and isPwnedServiceAvailable=false when checkIfPasswordPowned throws an error', async() => {
      expect.assertions(1);

      port.request.mockRejectedValue(new Error());
      const result = await pownedService.evaluateSecret('password123');
      expect(result).toEqual({inDictionary: false, isPwnedServiceAvailable: false});
    });
  });

  describe('checkIfPasswordPowned method', () => {
    it('sould calls port.request with the correct arguments and returns the response', async() => {
      expect.assertions(2);

      port.request.mockResolvedValue(1);
      const result = await pownedService.checkIfPasswordPowned('password123');
      expect(port.request).toHaveBeenCalledWith('passbolt.secrets.powned-password', 'password123');
      expect(result).toBe(true);
    });
  });
});
