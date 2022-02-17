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

/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'disabled'
      },
      hasChanged: false,
      findAccountRecoveryPolicy: jest.fn(),
      changePolicy: jest.fn(),
    }
  };
}

/**
 * Has changed policy props
 * @returns {*}
 */
export function hasChangedPolicyProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'mandatory'
      },
      hasChanged: true,
      findAccountRecoveryPolicy: jest.fn(),
      changePolicy: jest.fn(),
    },
    newKeyDetail: {
      fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
      algorithm: "RSA",
      length: "4096",
      created: "2020-09-01T13:11:08+00:00",
      expires: "Never"
    }
  };
}

/**
 * Disabled policy props
 * @returns {*}
 */
export function disabledPolicyPropsWithOrganisationKey() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'disabled'
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      },
      hasChanged: true,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * Mandatory policy props
 * @returns {*}
 */
export function mandatoryPolicyPropsWithOrganisationKey() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'mandatory'
      },
      newKeyDetail: {
        user_ids: [{
          name: "ada",
          email: "ada@passbolt.com"
        }, {
          name: "betty",
          email: "betty@passbolt.com"
        }],
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      },
      hasChanged: false,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * Opt-In policy props
 * @returns {*}
 */
export function optInPolicyPropsWithOrganisationKey() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'opt-in'
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      },
      hasChanged: false,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * OptOut policy props
 * @returns {*}
 */
export function optOutPolicyPropsWithOrganisationKey() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'opt-out'
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      },
      hasChanged: false,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * Disabled policy props
 * @returns {*}
 */
export function disabledPolicyProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'disabled',
      },
      hasChanged: false,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * Mandatory policy props
 * @returns {*}
 */
export function mandatoryPolicyProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'mandatory',
      },
      hasChanged: true,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * Opt-In policy props
 * @returns {*}
 */
export function optInPolicyProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'opt-in',
      },
      hasChanged: true,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}

/**
 * OptOut policy props
 * @returns {*}
 */
export function optOutPolicyProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    adminAccountRecoveryContext: {
      newPolicy: {
        policy: 'opt-out',
      },
      hasChanged: true,
      findAccountRecoveryPolicy: () => {},
      changePolicy: () => {},
    }
  };
}
