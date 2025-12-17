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
 * @since         4.4.0
 */

import { defaultUserRbacContext } from "../../../../shared/context/Rbac/RbacContext.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { allProviders, mfaDefined, noMfaDefined } from "../../../contexts/MFAContext.test.data";

export function defaultProps(props = {}) {
  return {
    context: defaultAppContext(props.appContext),
    mfaContext: mockMfaContext(props.mfaContext),
    rbacContext: defaultUserRbacContext(),
  };
}

export function mockMfaContext(props = {}) {
  return {
    findPolicy: jest.fn(),
    getPolicy: jest.fn(),
    findMfaSettings: jest.fn(),
    hasMfaSettings: jest.fn(),
    isProcessing: jest.fn(),
    hasMfaOrganisationSettings: jest.fn(),
    validateYubikeyCode: jest.fn(),
    goToProviderList: jest.fn(),
    navigate: jest.fn(),
    ...props,
  };
}

export const httpsTrustedDomain = {
  userSettings: {
    getTrustedDomain: () => "https://localhost:6006",
  },
};

export function propsWithMfaProviders(props = {}) {
  const propsWithProviders = defaultProps({
    appContext: httpsTrustedDomain,
    mfaContext: {
      hasMfaOrganisationSettings: () => true,
      getMfaOrganisationSettings: () => allProviders,
      getMfaUserSettings: () => mfaDefined,
      setProvider: jest.fn(),
      navigate: jest.fn(),
    },
  });
  return Object.assign(propsWithProviders, props);
}

export function propsWithoutMfaProviders(props = {}) {
  const propsWithoutProviders = defaultProps({
    appContext: httpsTrustedDomain,
    mfaContext: {
      getMfaOrganisationSettings: () => noMfaDefined,
      getMfaUserSettings: () => noMfaDefined,
      hasMfaOrganisationSettings: () => false,
    },
  });
  return Object.assign(propsWithoutProviders, props);
}
