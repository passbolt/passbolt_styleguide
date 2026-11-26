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
 * @since         6.0.0
 */

/**
 * Unit tests on SessionExpired in regard of specifications
 */
import { defaultProps, propsWithOfflineModeCapability } from "./HandleBootstrapRoute.test.data";
import HandleBootstrapRoutePage from "./HandleBootstrapRoute.test.page";
import UserActiveSessionEntity, {
  USER_ACTIVE_SESSION_OFFLINE,
} from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import { BOOTSTRAP_FEATURE } from "../../ExtQuickAccess";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("HandleBootstrapRoute", () => {
  describe("As LU I should handle bootstrap route for quickaccess", () => {
    it("As LU I should be redirected to auto save page", () => {
      expect.assertions(1);
      const props = defaultProps();
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/resources/autosave");
    });

    it("As LU I should be redirected to login page", () => {
      expect.assertions(1);
      const props = defaultProps({
        activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_authenticated: false })),
      });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/login");
    });

    it("As LU with an authenticated online session that lost the network I should be redirected to the server not reachable page", () => {
      expect.assertions(1);
      const props = defaultProps({
        activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_server_reachable: false })),
      });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/server-not-reachable");
    });

    it("As Anonymous user with no session and an unreachable server I should be redirected to the server not reachable page", () => {
      expect.assertions(1);
      const props = defaultProps({
        activeSession: new UserActiveSessionEntity(
          defaultUserActiveSessionDto({ is_authenticated: false, is_server_reachable: false }),
        ),
      });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/server-not-reachable");
    });

    it("As a signed-out user who cannot use the offline mode with an unreachable server I should be redirected to the server not reachable page", () => {
      expect.assertions(1);
      const props = propsWithOfflineModeCapability(
        defaultUserActiveSessionDto({ is_authenticated: false, is_server_reachable: false }),
        false,
      );
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/server-not-reachable");
    });

    it("As a signed-out user who can use the offline mode with a reachable server I should be redirected to the online login page", () => {
      expect.assertions(1);
      const props = propsWithOfflineModeCapability(
        defaultUserActiveSessionDto({ is_authenticated: false, is_server_reachable: true }),
        true,
      );
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/login");
    });

    it("As LU with an authenticated online session that lost the network and who can use the offline mode I should be redirected to the server not reachable page", () => {
      expect.assertions(1);
      const props = propsWithOfflineModeCapability(defaultUserActiveSessionDto({ is_server_reachable: false }), true);
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/server-not-reachable");
    });

    it("As LU with an authenticated offline session and an unreachable server I should stay signed in even if the offline mode capability is not resolved yet", () => {
      expect.assertions(1);
      const props = propsWithOfflineModeCapability(
        defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_OFFLINE, is_server_reachable: false }),
        null,
      );
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/home");
    });

    it("As LU with an authenticated offline session and a reachable server I should stay signed in", () => {
      expect.assertions(1);
      const props = defaultProps({
        activeSession: new UserActiveSessionEntity(
          defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_OFFLINE, is_server_reachable: true }),
        ),
        bootstrapFeature: null,
      });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/home");
    });

    it("As LU with an authenticated offline session and an unreachable server I should stay signed in", () => {
      expect.assertions(1);
      const props = defaultProps({
        activeSession: new UserActiveSessionEntity(
          defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_OFFLINE, is_server_reachable: false }),
        ),
        bootstrapFeature: null,
      });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/home");
    });

    it("As LU I should be redirected to new credential page", () => {
      expect.assertions(1);
      const props = defaultProps({ bootstrapFeature: BOOTSTRAP_FEATURE.CREATE_NEW_CREDENTIALS });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/resources/create");
    });

    it("As LU I should be redirected to new credential save page", () => {
      expect.assertions(1);
      const props = defaultProps({ bootstrapFeature: BOOTSTRAP_FEATURE.SAVE_CREDENTIALS });
      new HandleBootstrapRoutePage(props);

      expect(props.history.push).toHaveBeenCalledWith("/webAccessibleResources/quickaccess/resources/create");
    });
  });
});
