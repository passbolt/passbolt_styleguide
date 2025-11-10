import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";
import {defaultAppContext, defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultWorkflowContext} from "../../../contexts/WorkflowContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultClipboardContext} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";

/**
 * Props with selected user
 */
export function propsWithSelectedUser(props) {
  return {
    context: defaultAppContext(),
    userWorkspaceContext: {
      onDetailsLocked: () => {},
      details: {
        locked: true
      },
      filter: {
        type: "ALL"
      },
      selectedUsers: [
        {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": TEST_ROLE_USER_ID,
          "role": {
            "created": "2012-07-04T13:39:25+00:00",
            "description": "Logged in user",
            "id": TEST_ROLE_USER_ID,
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
          missing_metadata_key_ids: ["f848277c-5398-58f8-a82a-72397af2d450"],
          pending_account_recovery_request: {
            id: "54c6278e-f824-5fda-91ff-3e946b18d997"
          },
        }
      ]
    },
    workflowContext: defaultWorkflowContext(),
    dialogContext: defaultDialogContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    clipboardContext: defaultClipboardContext(),
    ...props
  };
}


/**
 * Props with group selected
 */
export function propsGroupSelected() {
  const context = defaultAppContext();
  return propsWithSelectedUser({
    context,
    userWorkspaceContext: {
      details: {
        locked: true
      },
      filter: {
        type: "FILTER-BY-GROUP",
        payload: {
          group: {
            groups_users: [{}, {}] // At least two users needed in the group
          },
        }
      },
      selectedUsers: [{}] // At least on user selected
    }
  });
}

/**
 * Props with group selected
 */
export function propsSoleMemberSelected() {
  const context = defaultAppContext();
  return propsWithSelectedUser({
    context,
    userWorkspaceContext: {
      details: {
        locked: true
      },
      filter: {
        type: "FILTER-BY-GROUP",
        payload: {
          group: {
            groups_users: [{}] // At least two users needed in the group
          },
        }
      },
      selectedUsers: [{}] // At least on user selected
    }
  });
}

/**
 * Props with group selected
 */
export function propsSoleManagerSelected() {
  const context = defaultAppContext();
  return propsWithSelectedUser({
    context,
    userWorkspaceContext: {
      details: {
        locked: true
      },
      filter: {
        type: "FILTER-BY-GROUP",
        payload: {
          group: {
            groups_users: [{
              user_id: context.loggedInUser.id,
              is_admin: true
            },
            {}
            ]
          },
        }
      },
      selectedUsers: [
        {
          id: context.loggedInUser.id,
        }
      ]
    }
  });
}

/**
 * Props with user Role
 */
export function propsUserRole() {
  return propsWithSelectedUser({
    context: defaultUserAppContext(),
  });
}

/**
 * Props with logged in user as selected user
 */
export function propsWithMyselfAsSelectedUser() {
  const context = defaultAppContext();
  return propsWithSelectedUser({
    context,
    userWorkspaceContext: {
      details: {
        locked: true
      },
      filter: {
        type: "ALL"
      },
      selectedUsers: [
        {
          id: context.loggedInUser.id,
          role: {
            name: "admin"
          },
          active: true,
          is_mfa_enabled: true,
          missing_metadata_key_ids: ["f848277c-5398-58f8-a82a-72397af2d450"],
        }
      ]
    }
  });
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
