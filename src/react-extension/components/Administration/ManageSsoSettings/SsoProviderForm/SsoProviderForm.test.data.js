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
 * @since         4.5.0
 */
import EntityValidationError from "../../../../../shared/models/entity/abstract/entityValidationError";
import {
  adfsSsoSettingsEntityDtoFromApi,
  azureSsoSettingsEntityDtoFromApi,
  googleSsoSettingsEntityDtoFromApi,
  oAuth2SsoSettingsEntityDtoFromApi,
} from "../../../../../shared/models/ssoSettings/SsoSettingsViewModel.test.data";
import { defaultClipboardContext } from "../../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";
import { defaultAppContext } from "../../../../contexts/ExtAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    clipboardContext: defaultClipboardContext(),
  };
  delete data.context; // Treated in the default
  return Object.assign(defaultProps, data);
}

export function defaultAzureProps(data = {}) {
  const defaultData = defaultProps({
    adminSsoContext: {
      getSsoConfiguration: () => azureSsoSettingsEntityDtoFromApi(),
      getErrors: () => new EntityValidationError(),
      isProcessing: () => false,
      consumeFocusOnError: () => false,
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
  });
  return Object.assign(defaultData, data);
}

export function defaultGoogleProps(data = {}) {
  const defaultData = defaultProps({
    adminSsoContext: {
      getSsoConfiguration: () => googleSsoSettingsEntityDtoFromApi(),
      getErrors: () => new EntityValidationError(),
      isProcessing: () => false,
      consumeFocusOnError: () => false,
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
  });
  return Object.assign(defaultData, data);
}

export function defaultOAuth2Props(data = {}) {
  const defaultData = defaultProps({
    adminSsoContext: {
      getSsoConfiguration: () => oAuth2SsoSettingsEntityDtoFromApi(),
      getErrors: () => new EntityValidationError(),
      isProcessing: () => false,
      consumeFocusOnError: () => false,
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
  });
  return Object.assign(defaultData, data);
}

export function defaultAdfsProps(data = {}) {
  const defaultData = defaultProps({
    adminSsoContext: {
      getSsoConfiguration: () => adfsSsoSettingsEntityDtoFromApi(),
      getErrors: () => new EntityValidationError(),
      isProcessing: () => false,
      shouldFocusOnError: () => false,
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
  });
  return Object.assign(defaultData, data);
}
