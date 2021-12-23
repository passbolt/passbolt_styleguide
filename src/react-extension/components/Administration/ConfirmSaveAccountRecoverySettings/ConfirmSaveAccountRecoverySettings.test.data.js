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
        policy: 'mandatory',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
      },
      newPolicy: {
        policy: 'opt-in',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
      },
      confirmSaveRequested: jest.fn(),
    },
    onClose: jest.fn()
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
      confirmSaveRequested: jest.fn(),
    },
    onClose: jest.fn()
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
        policy: 'mandatory',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        },
      },
      newPolicy: {
        policy: 'disabled',
      },
      confirmSaveRequested: () => {},
    },
    onClose: () => {}
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
        policy: 'mandatory',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
      },
      confirmSaveRequested: () => {},
    },
    onClose: () => {}
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
        policy: 'opt-in',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
      },
      confirmSaveRequested: () => {},
    },
    onClose: () => {}
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
        policy: 'opt-out',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
      },
      confirmSaveRequested: () => {},
    },
    onClose: () => {}
  };
}
