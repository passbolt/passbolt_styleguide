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
 * @since         5.6.0
 */

import {ResizableSidebarContextProvider} from "./ResizeSidebarContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ResizableSidebarContextProvider", () => {
  let sidebarContext;

  describe("As a user I should be able to resize sidebars", () => {
    beforeEach(() => {
      sidebarContext = new ResizableSidebarContextProvider();
      const setStateMock = stateUpdate => {
        const prevState = sidebarContext.state;
        const updatedState = typeof stateUpdate === "function" ? stateUpdate(prevState) : stateUpdate;
        sidebarContext.state =  Object.assign(prevState, updatedState);
      };
      jest.spyOn(sidebarContext, "setState").mockImplementation(setStateMock);
    });

    it("should initialize with correct default state", () => {
      expect(sidebarContext.state).toEqual({
        left: {width: 0},
        right: {width: 0},
      });
      expect(sidebarContext.containerRef).toBeDefined();
    });

    it("should update left sidebar width", () => {
      sidebarContext.setSidebarWidth("left", 250);
      expect(sidebarContext.state.left.width).toBe(250);
    });

    it("should update right sidebar width", () => {
      sidebarContext.setSidebarWidth("right", 500);
      expect(sidebarContext.state.right.width).toBe(500);
    });

    it("should preserve other sidebar when one side is updated", () => {
      sidebarContext.setSidebarWidth("right", 100);
      sidebarContext.setSidebarWidth("left", 300);
      expect(sidebarContext.state.right.width).toBe(100);
    });

    it("should preserve other sidebar when one side is updated", () => {
      sidebarContext.setSidebarWidth("left", 200);
      sidebarContext.setSidebarWidth("right", 300);
      expect(sidebarContext.state.left.width).toBe(200);
    });
  });
});
