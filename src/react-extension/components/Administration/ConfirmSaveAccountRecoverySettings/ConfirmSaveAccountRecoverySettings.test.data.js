/**
 * Default props
 * @returns {*}
 */
import MockPort from "../../../test/mock/MockPort";
import {DateTime} from "luxon";

export function defaultProps(accountRecovery = mockAccountRecoveryDisabled) {
  const props = {
    context: {
      port: new MockPort(),
      setContext: () => {}
    },
    dialogContext: {
      open: jest.fn()
    },
    onClose: jest.fn(),
  };
  return Object.assign(props, accountRecovery);
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

export const mockAccountRecoveryDisabled = {
  accountRecovery: {
    policy: {
      value: 'disabled',
      info: "Backup of the private key and passphrase will not be stored. This is the safest option.\nWarning: If users lose their private key and passphrase they will not be able to recover their account",
      hasChanged: true
    },
    organisationRecoveryKey: {
      hasChanged: false
    }
  }
};

export const mockAccountRecoveryMandatory = {
  accountRecovery: {
    policy: {
      value: 'mandatory',
      info: "Every user is required to provide a copy of their private key and passphrase during setup.\nWarning: You should inform your users not to store personal passwords.",
      hasChanged: true
    },
    organisationRecoveryKey: {
      hasChanged: false
    }
  }
};

export const mockAccountRecoveryOptOut = {
  accountRecovery: {
    policy: {
      value: 'opt-out',
      info: "Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.",
      hasChanged: true
    },
    organisationRecoveryKey: {
      hasChanged: false
    }
  }
};

export const mockAccountRecoveryOptIn = {
  accountRecovery: {
    policy: {
      value: 'opt-in',
      info: "Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.",
      hasChanged: true
    },
    organisationRecoveryKey: {
      hasChanged: false
    }
  }
};

export const mockAccountRecoveryDisableWithOrganisationKey = {
  accountRecovery: {
    policy: {
      value: 'disabled',
      info: "Backup of the private key and passphrase will not be stored. This is the safest option.\nWarning: If users lose their private key and passphrase they will not be able to recover their account",
      hasChanged: true
    },
    organisationRecoveryKey: {
      value: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
        algorithm: "RSA",
        keyLength: 4096,
        created: "2021-08-05T02:50:34.12",
        expires: "Never"
      },
      hasChanged: true
    }
  }
};

export const mockAccountRecoveryMandatoryWithOrganisationKey = {
  accountRecovery: {
    policy: {
      value: 'mandatory',
      info: "Every user is required to provide a copy of their private key and passphrase during setup.\nWarning: You should inform your users not to store personal passwords.",
      hasChanged: true
    },
    organisationRecoveryKey: {
      value: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
        algorithm: "RSA",
        keyLength: 4096,
        created: "2021-08-05T02:50:34.12",
        expires: "Never"
      },
      hasChanged: true
    }
  }
};

export const mockAccountRecoveryOptOutWithOrganisationKey = {
  accountRecovery: {
    policy: {
      value: 'opt-out',
      info: "Every user will be prompted to provide a copy of their private key and passphrase by default during the setup, but they can opt out.",
      hasChanged: true
    },
    organisationRecoveryKey: {
      value: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
        algorithm: "RSA",
        keyLength: 4096,
        created: "2021-08-05T02:50:34.12",
        expires: "Never"
      },
      hasChanged: true
    }
  }
};

export const mockAccountRecoveryOptInWithOrganisationKey = {
  accountRecovery: {
    policy: {
      value: 'opt-in',
      info: "Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.",
      hasChanged: true
    },
    organisationRecoveryKey: {
      value: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
        algorithm: "RSA",
        keyLength: 4096,
        created: "2021-08-05T02:50:34.12",
        expires: "Never"
      },
      hasChanged: true
    }
  }
};
