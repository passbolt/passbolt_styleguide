import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/roleEntity.test.data";
import {defaultAppContext, defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultWorkflowContext} from "../../../contexts/WorkflowContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultClipboardContext} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";
import {defaultGroupDto} from "../../../../shared/models/entity/group/groupEntity.test.data";
import {minimumGroupUserDto} from "../../../../shared/models/entity/groupUser/groupUserEntity.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";

/**
 * Default selected user for workspace actions tests
 * @param {Object} data The data to override
 * @returns {object}
 */
const defaultSelectedUserDto = (data = {}) => defaultUserDto({
  id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
  username: "carol@passbolt.com",
  active: false,
  is_mfa_enabled: true,
  missing_metadata_key_ids: ["f848277c-5398-58f8-a82a-72397af2d450"],
  ...data
}, {
  withRole: true,
  withPendingAccountRecoveryUserRequest: true
});

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
      selectedUsers: [defaultSelectedUserDto()]
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
          group: defaultGroupDto({}, {withGroupsUsers: 2})
        }
      },
      selectedUsers: [defaultUserDto()]
    }
  });
}

/**
 * Props with sole member selected in group
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
          group: defaultGroupDto({}, {withGroupsUsers: 1})
        }
      },
      selectedUsers: [defaultUserDto()]
    }
  });
}

/**
 * Props with sole manager selected in group
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
          group: defaultGroupDto({
            groups_users: [
              minimumGroupUserDto({user_id: context.loggedInUser.id, is_admin: true}),
              minimumGroupUserDto()
            ]
          })
        }
      },
      selectedUsers: [
        defaultUserDto({id: context.loggedInUser.id})
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
        defaultUserDto({
          id: context.loggedInUser.id,
          active: true,
          is_mfa_enabled: true,
          missing_metadata_key_ids: ["f848277c-5398-58f8-a82a-72397af2d450"],
        }, {withRole: true})
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

/**
 * Props with user role and group selected (user is not a manager)
 */
export function propsUserRoleGroupSelectedNotManager() {
  const context = defaultUserAppContext();
  return propsWithSelectedUser({
    context,
    userWorkspaceContext: {
      details: {
        locked: true
      },
      filter: {
        type: "FILTER-BY-GROUP",
        payload: {
          group: defaultGroupDto({
            groups_users: [
              minimumGroupUserDto({user_id: "other-user-id", is_admin: true}),
              minimumGroupUserDto()
            ]
          })
        }
      },
      selectedUsers: [defaultUserDto()]
    }
  });
}
