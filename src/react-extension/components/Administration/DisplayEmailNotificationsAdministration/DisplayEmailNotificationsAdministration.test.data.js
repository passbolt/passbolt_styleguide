import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    siteSettings: new SiteSettings(siteSettingsFixture)
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
      can: {
        save: false
      },
      must: {
        save: false
      },
      onResetActionsSettings: jest.fn(),
      onSaveEnabled: jest.fn(),
      onGetEmailNotificationsRequested: () => mockEmailNotificationsSettings
    }
  };
}

export const mockResult = {
  send_password_create: true,
  send_password_share: true,
  send_password_update: true,
  send_password_delete: true,
  send_folder_create: true,
  send_folder_update: true,
  send_folder_delete: true,
  send_folder_share: true,
  send_comment_add: false,
  send_group_delete: true,
  send_group_user_add: true,
  send_group_user_delete: true,
  send_group_user_update: true,
  send_group_manager_update: true,
  send_user_create: true,
  send_user_recover: true,
  send_user_recoverComplete: true,
  send_admin_user_recover_abort: true,
  send_admin_user_recover_complete: true,
  send_admin_user_setup_completed: true,
  show_description: true,
  show_secret: true,
  show_uri: true,
  show_username: true,
  show_comment: true,
  send_accountRecovery_request_user: true,
  send_accountRecovery_request_admin: true,
  send_accountRecovery_request_guessing: true,
  send_accountRecovery_response_user_approved: true,
  send_accountRecovery_response_user_rejected: true,
  send_accountRecovery_response_created_admin: true,
  send_accountRecovery_response_created_allAdmins: true,
  send_accountRecovery_policy_update: true,
  sources_database: true,
  sources_file: false,
};

export const mockEmailNotificationsSettings = {
  header: {
    id: "83785f3c-3958-4ba5-87cb-809e444dfd96",
    status: "success",
    servertime: 1605188966,
    title: "app_notificationorgsettings_get_success",
    action: "9caaba03-49d2-5273-8097-e278234e71e0",
    message: "The operation was successful.",
    url: "\/settings\/emails\/notifications.json?api-version=v2",
    code: 200
  },
  body: {
    purify_subject: false,
    send_password_create: true,
    send_password_share: true,
    send_password_update: true,
    send_password_delete: true,
    send_folder_create: true,
    send_folder_update: true,
    send_folder_delete: true,
    send_folder_share: true,
    send_comment_add: true,
    send_group_delete: true,
    send_group_user_add: true,
    send_group_user_delete: true,
    send_group_user_update: true,
    send_group_manager_update: true,
    send_user_create: true,
    send_user_recover: true,
    send_user_recoverComplete: true,
    send_admin_user_recover_abort: true,
    send_admin_user_recover_complete: true,
    send_admin_user_setup_completed: true,
    show_description: true,
    show_secret: true,
    show_uri: true,
    show_username: true,
    show_comment: true,
    send_accountRecovery_request_user: true,
    send_accountRecovery_request_admin: true,
    send_accountRecovery_request_guessing: true,
    send_accountRecovery_response_user_approved: true,
    send_accountRecovery_response_user_rejected: true,
    send_accountRecovery_response_created_admin: true,
    send_accountRecovery_response_created_allAdmins: true,
    send_accountRecovery_policy_update: true,
    sources_database: true,
    sources_file: false
  }
};
