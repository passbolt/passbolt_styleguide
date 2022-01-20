/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'mandatory'
      },
      isGpgKeyImported: true,
      onGoToGenerateGpgKeyRequested: jest.fn()
    }
  };
}

/**
 * Mandatory policy props
 * @returns {*}
 */
export function mandatoryPolicyProps() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'mandatory'
      },
      isGpgKeyImported: false,
      onGoToGenerateGpgKeyRequested: () => {}
    }
  };
}

/**
 * Opt-In policy props
 * @returns {*}
 */
export function optInPolicyProps() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'opt-in'
      },
      isGpgKeyImported: false,
      onGoToGenerateGpgKeyRequested: () => {}
    }
  };
}

/**
 * OptOut policy props
 * @returns {*}
 */
export function optOutPolicyProps() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'opt-out'
      },
      isGpgKeyImported: false,
      onGoToGenerateGpgKeyRequested: () => {}
    }
  };
}

/**
 * Mandatory policy props with imported key
 * @returns {*}
 */
export function mandatoryPolicyPropsWithImportedKey() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'mandatory'
      },
      isGpgKeyImported: true,
      onGoToGenerateGpgKeyRequested: () => {}
    }
  };
}

/**
 * Opt-In policy props with imported key
 * @returns {*}
 */
export function optInPolicyPropsWithImportedKey() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'opt-in'
      },
      isGpgKeyImported: true,
      onGoToGenerateGpgKeyRequested: () => {}
    }
  };
}

/**
 * OptOut policy props with imported key
 * @returns {*}
 */
export function optOutPolicyPropsWithImportedKey() {
  return {
    authenticationContext: {
      accountRecoveryPolicy: {
        policy: 'opt-out'
      },
      isGpgKeyImported: true,
      onGoToGenerateGpgKeyRequested: () => {}
    }
  };
}
