/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: () => jest.fn(),
      displayError: jest.fn()
    },
  };
  return Object.assign(defaultProps, data);
}

/**
 * updatedProps props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function updatedProps(data = {}) {
  const updatedProps = {
    context: defaultAppContext(data?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn(),
    },
  };
  return Object.assign(updatedProps, data);
}

/**
 * Default props for CE.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultPropsCE(data = {}) {
  const defaultPropsCE = defaultProps();
  defaultPropsCE.context.siteSettings.canIUse = () => false;
  return Object.assign(defaultPropsCE, data);
}

/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockResult = {
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
  sources_file: false,
};

/**
 * Mock settings model for UI
 * @returns {object}
 */
export const mockModel = {
  accountRecoveryRequestAdmin: true,
  accountRecoveryRequestCreatedAllAdmins: true,
  accountRecoveryRequestCreatedAmin: true,
  accountRecoveryRequestGuessing: true,
  accountRecoveryRequestPolicyUpdate: true,
  accountRecoveryRequestUser: true,
  accountRecoveryRequestUserApproved: true,
  accountRecoveryRequestUserRejected: true,
  commentAdd: true,
  folderCreate: true,
  folderDelete: true,
  folderShare: true,
  folderUpdate: true,
  groupDelete: true,
  groupManagerUpdate: true,
  groupUserAdd: true,
  groupUserDelete: true,
  groupUserUpdate: true,
  hasDatabaseSetting: true,
  hasFileConfigSetting: false,
  passwordCreate: true,
  passwordDelete: true,
  passwordShare: true,
  passwordUpdate: true,
  showComment: true,
  showDescription: true,
  showSecret: true,
  showUri: true,
  showUsername: true,
  userCreate: true,
  userRecover: true,
  userRecoverAbortAdmin: true,
  userRecoverComplete: true,
  userRecoverCompleteAdmin: true,
  userSetupCompleteAdmin: true,
};

/**
 * Default email notification settings.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function defaultEmailNotificationSettings(data = {}) {
  return {
    ...mockResult,
    ...data
  };
}

/**
 * Email notification without database and file source defined
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function withoutSourceNotificationSettings(data = {}) {
  const settings = defaultEmailNotificationSettings({
    "sources_database": false,
    "sources_file": false
  });
  return {
    ...settings,
    ...data
  };
}

/**
 * Email notifications settings with file source existing.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function withFileSourceSettings(data = {}) {
  const settings = Object.assign({}, mockResult,  {sources_file: true});
  return {
    ...settings,
    ...data
  };
}

/**
 * Email notifications settings without database source.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function withoutDatabaseSourceSettings(data = {}) {
  const settings = Object.assign({}, mockResult,  {sources_file: true, sources_database: false});
  return {
    ...settings,
    ...data
  };
}



/**
 * Email notifications settings for UI.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function defaultSettingsModel(data = {}) {
  return {
    ...mockModel,
    ...data
  };
}


/**
 * Email notifications settings for UI without db and file source.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function withoutSourceSettingsModel(data = {}) {
  const settings = Object.assign({}, mockModel,  {hasDatabaseSetting: false});
  return {
    ...settings,
    ...data
  };
}

