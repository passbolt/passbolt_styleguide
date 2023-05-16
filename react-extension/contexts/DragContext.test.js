/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.1.0
 */

import DragContextProvider from "./DragContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("Drag Context", () => {
  let dragContext; // The context to text

  describe('As LU I should be able to drag', () => {
    beforeEach(() => {
      dragContext = new DragContextProvider();
      const setStateMock = state => dragContext.state = Object.assign(dragContext.state, state);
      jest.spyOn(dragContext, 'setState').mockImplementation(setStateMock);
    });

    it('As LU I should start dragging', async() => {
      const event = {
        dataTransfer: {
          setDragImage: jest.fn()
        }
      };
      const component = jest.fn();
      const draggedItems = {
        item: "item"
      };
      await dragContext.state.onDragStart(event, component, draggedItems);
      expect(dragContext.state.dragging).toBeTruthy();
      expect(dragContext.state.draggedItems).toBe(draggedItems);
    });

    it('As LU I should end the dragging', async() => {
      await dragContext.state.onDragEnd();
      expect(dragContext.state.dragging).toBeFalsy();
      expect(dragContext.state.draggedItems).toBe(null);
    });
  });
});
