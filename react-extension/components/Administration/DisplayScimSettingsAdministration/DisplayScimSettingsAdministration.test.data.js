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
 * @since         5.5.0
 */
import { defaultAdministratorAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";
import { AdministrationWorkspaceMenuTypes } from "../../../contexts/AdministrationWorkspaceContext";
import { defaultAdministrationWorkspaceContext } from "../../../contexts/AdministrationWorkspaceContext.test.data";
import { mockUsers } from "../DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import { v4 as uuidv4 } from "uuid";
import { defaultClipboardContext } from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";
import {
  defaultScimSettingsDto,
  scimSettingsWithoutSecretTokenDto,
} from "../../../../shared/services/serviceWorker/scim/scimSettingsServiceWorkerService.test.data";
import { defaultRoleContext } from "../../../contexts/RoleContext.test.data";
import { DateTime } from "luxon";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const roleContext = defaultRoleContext(data.roleContext);
  const roles = data.roles || roleContext.getAllRoles();
  return {
    context: defaultAdministratorAppContext({
      users: mockUsers,
    }),
    clipboardContext: defaultClipboardContext(),
    dialogContext: defaultDialogContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.SCIM,
    }),
    scimSettingsServiceWorkerService: {
      findSettings: () => defaultScimSettingsDto(),
      createSettings: jest.fn(),
      updateSettings: jest.fn(),
      disableSettings: jest.fn(),
    },
    createPortal: jest.fn,
    t: (text) => text,
    ...data,
    roleContext: roleContext,
    roles: roles,
  };
}

/**
 * Default SCIM settings disabled.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultScimSettingsDisabledProps(props = {}) {
  return defaultProps({
    scimSettingsServiceWorkerService: {
      findSettings: () => null,
      createSettings: jest.fn(),
    },
    ...props,
  });
}

/**
 * Default configured SCIM settings disabled.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultScimSettingsConfiguredProps(props = {}) {
  return defaultProps({
    scimSettingsServiceWorkerService: {
      findSettings: () =>
        scimSettingsWithoutSecretTokenDto({
          id: uuidv4(),
          scim_user_id: props.scim_user_id || mockUsers.find((user) => user.username === "admin@passbolt.com").id,
        }),
    },
    ...props,
  });
}

/**
 * Props with an expired secret token (expiry date in the past).
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultScimSettingsExpiredTokenProps(props = {}) {
  return defaultProps({
    scimSettingsServiceWorkerService: {
      findSettings: () =>
        defaultScimSettingsDto({
          expired: DateTime.now().minus({ days: 1 }).toISODate(),
        }),
      updateSettings: jest.fn(),
    },
    ...props,
  });
}

/**
 * Props with a secret token expiring within the warning window (expiry date 14 days in the future).
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultScimSettingsExpiringTokenProps(props = {}) {
  return defaultProps({
    scimSettingsServiceWorkerService: {
      findSettings: () =>
        defaultScimSettingsDto({
          expired: DateTime.now().plus({ days: 14 }).toISODate(),
        }),
      updateSettings: jest.fn(),
    },
    ...props,
  });
}

/**
 * Props with a healthy secret token (expiry beyond the warning window).
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultScimSettingsHealthyTokenProps(props = {}) {
  return defaultProps({
    scimSettingsServiceWorkerService: {
      findSettings: () =>
        defaultScimSettingsDto({
          expired: DateTime.now().plus({ years: 1 }).toISODate(),
        }),
      updateSettings: jest.fn(),
    },
    ...props,
  });
}
