/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */


/**
 * Unit tests on ClipBoard in regard of specifications
 */
import ClipBoard from './clipBoard';

describe('ClipBoard', () => {
  const portMock = {
    request: jest.fn()
  };
  const toCopy = "text";
  describe('copy method', () => {
    it('should call the navigator.clipboard.writeText method if it is available', async() => {
      navigator.clipboard = {
        writeText: jest.fn()
      };
      await ClipBoard.copy(toCopy, portMock);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(toCopy);
      expect(portMock.request).not.toHaveBeenCalled();
    });

    it('should call the copyWithBrowserExtension method if the navigator.clipboard API is not available', async() => {
      navigator.clipboard = null;
      await ClipBoard.copy(toCopy, portMock);
      expect(portMock.request).toHaveBeenCalledWith('passbolt.clipboard.copy', toCopy);
    });

    it('should call the copyWithBrowserExtension method if the writeText method throws an error', async() => {
      navigator.clipboard = {
        writeText: jest.fn(() => {
          throw new Error('Some error');
        })
      };
      await ClipBoard.copy(toCopy, portMock);
      expect(portMock.request).toHaveBeenCalledWith('passbolt.clipboard.copy', toCopy);
    });
  });

  describe('copyWithBrowserExtension: method', () => {
    it('should call the request method of the port object with the correct arguments', () => {
      ClipBoard.copyWithBrowserExtension(toCopy, portMock);
      expect(portMock.request).toHaveBeenCalledWith('passbolt.clipboard.copy', toCopy);
    });
  });
});
