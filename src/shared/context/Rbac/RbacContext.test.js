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

import { enableFetchMocks } from "jest-fetch-mock";
import { defaultProps } from "./RbacContext.test.data";
import { RbacContextProvider } from "./RbacContext";
import { uiActions } from "../../services/rbacs/uiActionEnumeration";
import { actions } from "../../services/rbacs/actionEnumeration";

describe("RbacContext", () => {
  let rbacContext; // The rbacContextProvider to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    rbacContext = new RbacContextProvider(props);
    mockState(rbacContext);
    enableFetchMocks();
  });

  describe("RbacContext::canIUseAction", () => {
    it("should return allow or deny for action or ui action for a signed-in user", async () => {
      expect.assertions(16);

      expect(rbacContext.canIUseAction(uiActions.RESOURCES_EXPORT)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.RESOURCES_IMPORT)).toBeFalsy();
      expect(rbacContext.canIUseAction(uiActions.TAGS_USE)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.FOLDERS_USE)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.RESOURCES_SEE_ACTIVITIES)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.RESOURCES_SEE_COMMENTS)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.SECRETS_PREVIEW)).toBeFalsy();
      expect(rbacContext.canIUseAction(uiActions.SECRETS_COPY)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.SHARE_VIEW_LIST)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.USERS_VIEW_WORKSPACE)).toBeFalsy();
      expect(rbacContext.canIUseAction(uiActions.MOBILE_TRANSFER)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.DESKTOP_TRANSFER)).toBeTruthy();
      expect(rbacContext.canIUseAction(uiActions.SHARE_FOLDER)).toBeTruthy();
      expect(rbacContext.canIUseAction(actions.GROUPS_ADD)).toBeFalsy();
      expect(rbacContext.canIUseAction(actions.ACCOUNT_RECOVERY_REQUEST_VIEW)).toBeFalsy();
      expect(rbacContext.canIUseAction(actions.ACCOUNT_RECOVERY_RESPONSE_CREATE)).toBeFalsy();
    });
  });
});

function mockState(contextProvider) {
  const setStateMock = (state) => {
    let newState;
    if (typeof state === "function") {
      newState = state(contextProvider.state);
    } else {
      newState = state;
    }
    contextProvider.state = Object.assign(contextProvider.state, newState);
  };
  jest.spyOn(contextProvider, "setState").mockImplementation(setStateMock);
}
