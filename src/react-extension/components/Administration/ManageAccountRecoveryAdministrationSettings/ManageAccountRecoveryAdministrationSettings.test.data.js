/**
 * Default props
 * @returns {*}
 */
import MockPort from "../../../test/mock/MockPort";

export function defaultProps() {
  return {
    context: {
      port: new MockPort(),
    },
    administrationWorkspaceContext: {
      must: {
        save: false
      },
      onResetActionsSettings: jest.fn(),
      can: {
        save: false
      },
      onSaveEnabled: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };
}

export const mockAccountRecoveryEmpty = {
  policy: 'disabled'
};

export const mockAccountRecoveryMandatory = {
  policy: 'mandatory',
};

export const mockAccountRecoveryOptOut = {
  policy: 'opt-out',
};

export const mockAccountRecoveryOptIn = {
  policy: 'opt-in',
};

export const mockAccountRecoveryDisableWithOrganisationKey = {
  policy: 'disabled',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};

export const mockAccountRecoveryMandatoryWithOrganisationKey = {
  policy: 'mandatory',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};

export const mockAccountRecoveryOptOutWithOrganisationKey = {
  policy: 'opt-out',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};

export const mockAccountRecoveryOptInWithOrganisationKey = {
  policy: 'opt-in',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};
