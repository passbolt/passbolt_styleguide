/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAdminAccountRecoveryContext} from "../../../contexts/AdminAccountRecoveryContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(props?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    adminAccountRecoveryContext: defaultAdminAccountRecoveryContext(props?.adminAccountRecoveryContext)
  };
  delete props.context; // Treated in the default
  delete props.adminAccountRecoveryContext; // Treated in the default
  return Object.assign(defaultProps, props);
}

/**
 * Has changed props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function hasChangedPolicyProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      hasPolicyChanges: jest.fn(() => true),
      policyChanges: {
        policy: "mandatory",
        publicKey: "new-public-key"
      },
      getKeyInfo: () => defaultKeyInfo
    }
  };
  return defaultProps(Object.assign(_props, props));
}

const defaultKeyInfo = {
  user_ids: [{name: "Test Test", email: "test@passbolt.com"}],
  armored_key: "new-public-key",
  fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
  algorithm: "RSA",
  length: "4096",
  created: "2022-05-01T13:11:08+00:00",
  expires: "2024-05-01T13:11:08+00:00",
};

/**
 * Disabled policy props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function disabledPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "disabled",
        publicKey: "new-public-key"
      },
      getKeyInfo: () => defaultKeyInfo
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Mandatory policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function mandatoryPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "mandatory",
        publicKey: "new-public-key"
      },
      getKeyInfo: () => defaultKeyInfo
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Opt-In policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function optInPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "opt-in",
        publicKey: "new-public-key"
      },
      getKeyInfo: () => defaultKeyInfo
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * OptOut policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function optOutPolicyPropsWithOrganisationKey(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "opt-out",
        publicKey: "new-public-key"
      },
      getKeyInfo: () => defaultKeyInfo
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Disabled policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function disabledPolicyProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "disabled",
      }
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Mandatory policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function mandatoryPolicyProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "mandatory",
      }
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Opt-in policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function optInPolicyProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "opt-in",
      }
    }
  };
  return defaultProps(Object.assign(_props, props));
}

/**
 * Opt-out policy props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function optOutPolicyProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: {
      policyChanges: {
        policy: "opt-out",
      }
    }
  };
  return defaultProps(Object.assign(_props, props));
}

