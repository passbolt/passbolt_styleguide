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

export const mockAccountRecoveryDisableWithOrganizationKey = {
  policy: 'disabled',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never",
    user_ids: [{
      name: 'A-Test',
      email: 'a-test@passbolt.com'
    }, {
      name: 'B-Test',
      email: 'b-test@passbolt.com'
    }]
  }
};

export const mockAccountRecoveryMandatoryWithOrganizationKey = {
  policy: 'mandatory',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};

export const mockAccountRecoveryOptOutWithOrganizationKey = {
  policy: 'opt-out',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};

export const mockAccountRecoveryOptInWithOrganizationKey = {
  policy: 'opt-in',
  account_recovery_organization_key: {
    fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    algorithm: "RSA",
    keyLength: 4096,
    created: "2021-08-05T02:50:34.12",
    expires: "Never"
  }
};
