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
 * @since         3.3.0
 */

import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Context with an unanthenticated user
 * @returns {{port: MockPort}}
 */
export const getContextWithUnauthenticatedUser = (data) => {
  const context = {
    port: new MockPort(),
    fieldType: "username",
    applicationId: 1,
    ...data,
  };

  context.port.addRequestListener("passbolt.in-form-cta.check-status", () => ({
    isAuthenticated: false,
    isMfaRequired: false,
  }));

  return context;
};

/**
 * Context with an authenticated user
 * @returns {{port: MockPort}}
 */
export const getContextWithAuthenticatedUser = () => {
  const context = getContextWithUnauthenticatedUser({
    fieldType: "username",
  });

  context.port.addRequestListener("passbolt.in-form-cta.check-status", () => ({
    isAuthenticated: true,
    isMfaRequired: false,
  }));

  return context;
};

/**
 * Context with an authenticated user and resources
 * @param {number} suggestedResourcesCount The number of suggested resources
 * @returns {{port: MockPort}}
 */
export const getContextWithAuthenticatedUserAndResources = (suggestedResourcesCount = 4) => {
  const context = getContextWithAuthenticatedUser();

  context.port.addRequestListener("passbolt.in-form-cta.suggested-resources", () => suggestedResourcesCount);

  return context;
};

/**
 * Context with an unauthenticated user and overlaid actions
 * @param {boolean} isApplicationOverlaid Whether the application is overlaid
 * @returns {{port: MockPort}}
 */
export const getContextWithUnauthenticatedUserAndAppOverlaid = (isApplicationOverlaid = false) => {
  const context = getContextWithUnauthenticatedUser();

  context.port.addRequestListener("passbolt.in-form-cta.is-application-overlaid", () => isApplicationOverlaid);
  context.port.addRequestListener("passbolt.in-form-cta.execute", () => {});

  return context;
};

/**
 * Context with an authenticated user and overlaid actions
 * @param {boolean} isApplicationOverlaid Whether the application is overlaid
 * @returns {{port: MockPort}}
 */
export const getContextWithAuthenticatedUserAndAppOverlaid = (isApplicationOverlaid = false) => {
  const context = getContextWithAuthenticatedUser();

  context.port.addRequestListener("passbolt.in-form-cta.is-application-overlaid", () => isApplicationOverlaid);
  context.port.addRequestListener("passbolt.in-form-cta.execute", () => {});

  return context;
};
