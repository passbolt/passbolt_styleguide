/**
 * Default props
 * @returns {*}
 */
import {DateTime} from "luxon";

export function defaultProps() {
  return {
    context: {
      locale: 'en-UK',
    },
    accountRecoveryPolicy: {
      currentPolicy: {
        policy: 'mandatory'
      },
      newPolicy: {
        policy: 'opt-in'
      },
      currentKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      }
    },
    onCancel: jest.fn(),
    confirmSaveRequested: jest.fn(),
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
    accountRecoveryPolicy: {
      currentPolicy: {
        policy: 'disabled',
      },
      newPolicy: {
        policy: 'mandatory',
        account_recovery_organization_public_key: {
          armored_key: "faked_data"
        }
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
      }
    },
    onCancel: jest.fn(),
    confirmSaveRequested: jest.fn(),
  };
}

/**
 * Format date in time ago
 * @param {string} date The date to format
 * @return {string}
 */
export function formatDateTimeAgo(date) {
  if (date === 'Never') {
    return date;
  }
  const dateTime = DateTime.fromISO(date);
  const duration = dateTime.diffNow().toMillis();
  return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative();
}

export function formatDate(date) {
  return DateTime.fromJSDate(new Date(date)).setLocale("en-UK").toLocaleString(DateTime.DATETIME_FULL);
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
    accountRecoveryPolicy: {
      currentPolicy: {
        policy: 'mandatory'
      },
      newPolicy: {
        policy: 'disabled'
      },
      currentKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      }
    },
    onCancel: jest.fn(),
    confirmSaveRequested: jest.fn(),
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
    accountRecoveryPolicy: {
      currentPolicy: {
        policy: 'disabled'
      },
      newPolicy: {
        policy: 'mandatory'
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      }
    },
    onCancel: jest.fn(),
    confirmSaveRequested: jest.fn(),
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
    accountRecoveryPolicy: {
      currentPolicy: {
        policy: 'disabled'
      },
      newPolicy: {
        policy: 'opt-in'
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      }
    },
    onCancel: jest.fn(),
    confirmSaveRequested: jest.fn(),
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
    accountRecoveryPolicy: {
      currentPolicy: {
        policy: 'disabled'
      },
      newPolicy: {
        policy: 'opt-out'
      },
      newKeyDetail: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
        algorithm: "RSA",
        length: "4096",
        created: "2020-09-01T13:11:08+00:00",
        expires: "Never"
      }
    },
    onCancel: jest.fn(),
    confirmSaveRequested: jest.fn(),
  };
}
