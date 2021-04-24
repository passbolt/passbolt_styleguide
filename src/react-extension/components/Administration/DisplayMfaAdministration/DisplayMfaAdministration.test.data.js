
/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    administrationWorkspaceContext: {
      must: {
        save: false
      },
      onResetActionsSettings: jest.fn(),
      can: {
        save: false
      },
      onSaveEnabled: jest.fn(),
      onGetMfaRequested: () => mockMfaSettings,
      onSaveMfaRequested: jest.fn()
    }
  };
}

export const mockMfaSettings = {
  "header": {
    "id": "eae592b6-19d5-4b07-9103-49d04b135093",
    "status": "success",
    "servertime": 1604490709,
    "title": "app_orgsettings_get_success",
    "action": "6d616537-c449-589d-bebe-b2d5883e9d35",
    "message": "The operation was successful.",
    "url": "\/mfa\/settings.json?api-version=v2",
    "code": 200
  },
  "body": {
    "providers": [
      "totp",
      "yubikey"
    ],
    "yubikey": {
      "clientId": "43664",
      "secretKey": "a6zf3pavrJEjvmXm6dfkm8jfkNY="
    }
  }
};
