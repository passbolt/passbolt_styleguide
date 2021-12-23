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
        policy: 'mandatory',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
      },
      hasChanged: true,
      findAccountRecoveryPolicy: jest.fn(),
      changePolicy: jest.fn(),
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
        policy: 'disabled',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
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
        policy: 'mandatory',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
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
        policy: 'opt-in',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
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
        policy: 'opt-out',
        account_recovery_organization_public_key: {
          fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3",
          algorithm: "RSA",
          length: "4096",
          created: "2020-09-01T13:11:08+00:00",
          expires: "Never"
        }
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
