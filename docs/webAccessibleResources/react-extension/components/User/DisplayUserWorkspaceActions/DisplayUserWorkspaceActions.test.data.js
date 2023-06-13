import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    siteSettings: {
      canIUse: () => true
    },
    userSettings: {
      getTrustedDomain: () => 'https://passbolt.local'
    },
    loggedInUser: {
      id: "220ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      role: {
        name: "admin"
      }
    }
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Props with selected user
 */
export function propsWithSelectedUser() {
  return {
    userWorkspaceContext: {
      onDetailsLocked: () => {},
      details: {
        locked: true
      },
      selectedUsers: [
        {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "role": {
            "created": "2012-07-04T13:39:25+00:00",
            "description": "Logged in user",
            "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
            "modified": "2012-07-04T13:39:25+00:00",
            "name": "user"
          },
          "username": "carol@passbolt.com",
          "active": false,
          "deleted": false,
          "created": "2020-05-11T09:32:49+00:00",
          "modified": "2020-05-12T09:32:49+00:00",
          "profile": {
            "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            "first_name": "Carol",
            "last_name": "Shaw",
            "created": "2020-05-13T09:32:49+00:00",
            "modified": "2020-05-13T09:32:49+00:00",
            "avatar": {
              "id": "0f769127-3053-45e4-bd8e-75e766bb4d52",
              "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
              "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
              "model": "Avatar",
              "filename": "carol.png",
              "filesize": 733439,
              "mime_type": "image\/png",
              "extension": "png",
              "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
              "path": "Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.png",
              "adapter": "Local",
              "created": "2020-05-13T09:32:51+00:00",
              "modified": "2020-05-13T09:32:51+00:00",
              "url": {
                "medium": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.a99472d5.png",
                "small": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.65a0ba70.png"
              }
            }
          },
          "__placeholder_last_logged_in__": "",
          "last_logged_in": "",
          is_mfa_enabled: true,
          pending_account_recovery_request: {
            id: "54c6278e-f824-5fda-91ff-3e946b18d997"
          },
        }
      ]
    }
  };
}


/**
 * Props with selected user
 */
export function propsWithoutSelectedUser() {
  return {
    userWorkspaceContext: {
      details: {
        locked: true
      },
      selectedUsers: []
    }
  };
}

/**
 * Props with logged in user as selected user
 */
export function propsWithMyselfAsSelectedUser() {
  return {
    userWorkspaceContext: {
      details: {
        locked: true
      },
      selectedUsers: [
        {
          id: "220ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          role: {
            name: "admin"
          }
        }
      ]
    }
  };
}

/**
 * Props with active selected user
 */
export function propsWithSelectedActiveUser() {
  const props = propsWithSelectedUser();
  props.userWorkspaceContext.selectedUsers[0].active = true;
  return props;
}

/**
 * Props with disabled MFA selected user
 */
export function propsWithSelectedMFADisabledUser() {
  const props = propsWithSelectedUser();
  props.userWorkspaceContext.selectedUsers[0].is_mfa_enabled = false;
  return props;
}

/**
 * Props with temporary pending account recovery selected user
 */
export function propsWithSelectedUserTemporaryHasPendingAccountRecovery() {
  const props = propsWithSelectedUser();
  props.userWorkspaceContext.selectedUsers[0].pending_account_recovery_request = true;
  return props;
}
