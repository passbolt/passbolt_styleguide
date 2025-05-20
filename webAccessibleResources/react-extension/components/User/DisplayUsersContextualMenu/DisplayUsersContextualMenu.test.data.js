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
 * @since         2.11.0
 */

import MockPort from "../../../test/mock/MockPort";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    siteSettings: {
      canIUse: () => true
    },
    userSettings: {
      getTrustedDomain: () => (new URL(window.location.href)).origin
    },
    loggedInUser: {
      role: {
        name: 'admin'
      }
    },
    setContext: jest.fn()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Context without the edit capability
 */
export function contextWithoutEdit() {
  const context = defaultAppContext();
  context.loggedInUser = {
    role: {
      name: 'member'
    }
  };
  return context;
}

/**
 * Context without the disable MFA capability
 */
export function contextWithoutDisableMFA() {
  const context = defaultAppContext();
  context.siteSettings.canIUse = () => false;
  return context;
}

/**
 * Context without the delete capability
 */
export function contextWithoutDelete() {
  const context = defaultAppContext();
  context.loggedInUser = {
    role: {
      name: 'member'
    }
  };
  return context;
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps(data = {}) {
  return {
    actionFeedbackContext: {
      displaySuccess: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    },
    hide: jest.fn(),
    workflowContext: {
      start: jest.fn()
    },
    user: defaultUserDto({
      pending_account_recovery_request: false,
      ...data?.user,
    }),
    ...data,
  };
}

/**
 * Props with temporary pending account recovery user
 */
export function propsWithUserTemporaryHasPendingAccountRecovery(data = {}) {
  return defaultProps({
    user: {
      pending_account_recovery_request: {
        id: "54c6278e-f824-5fda-91ff-3e946b18d997"
      }
    },
    ...data,
  });
}


/**
 * Props with user having missing metadata keys
 */
export function propsWithUserMissingMetadataKeys(data = {}) {
  return defaultProps({
    user: {
      missing_metadata_keys_ids: ["54c6278e-f824-5fda-91ff-3e946b18d997"]
    },
    ...data,
  });
}
