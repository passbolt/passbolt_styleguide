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
 * @since         5.18.0
 */

import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { MfaSettingsWorkflowStates } from "../../../contexts/MFAContext";
import { allProviders } from "../../../contexts/MFAContext.test.data";
import { mockMfaContext } from "../DisplayProviderList/DisplayProviderList.test.data";

/**
 * Default props.
 * @param {object} [props] The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    context: defaultAppContext(props.appContext),
    mfaContext: mockMfaContext({
      state: MfaSettingsWorkflowStates.OVERVIEW,
      mfaUserSettings: allProviders,
      mfaOrganisationSettings: allProviders,
      setProvider: jest.fn(),
      handleGetStartedWithDuo: jest.fn(),
      ...props.mfaContext,
    }),
  };
}
