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
 * @since         5.4.0
 */

import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultAdministrationEncryptedMetadataGettingStartedContext} from "../../../contexts/Administration/AdministrationEncryptedMetadataGettingStartedContext/AdministrationEncryptedMetadataGettingStartedContext.test.data";
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {defaultAdministrationWorkspaceContext} from "../../../contexts/AdministrationWorkspaceContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    administrationEncryptedMetadataGettingStartedContext: defaultAdministrationEncryptedMetadataGettingStartedContext(),
    metadataGettingStartedSettings: {enabled: true},
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration:  AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED
    }),
    actionFeedbackContext: defaultActionFeedbackContext(),
    history: {
      push: jest.fn(),
    },
    createPortal: jest.fn,
    t: text => text,
  };
  defaultData.context.siteSettings.canIUse = () => true;
  return Object.assign(defaultData, data);
}

/**
 * Default disabled props.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultDisabledProps(data = {}) {
  return defaultProps({
    ...data,
    administrationEncryptedMetadataGettingStartedContext: defaultAdministrationEncryptedMetadataGettingStartedContext(),
    metadataGettingStartedSettings: {enabled: false},
  });
}
