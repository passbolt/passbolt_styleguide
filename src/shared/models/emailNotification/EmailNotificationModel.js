
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


/**
 * Model related to the Email Notification model settings
 */
class EmailNotificationModel {
  /**
   * Constructor
   *
   * @param {EmailNotificationDTO} emailNotificationDTO
   * @public
   */
  constructor(emailNotificationDTO = {}) {
    this.hasDatabaseSetting =  "sources_database" in emailNotificationDTO ? emailNotificationDTO.sources_database : false;
    this.hasFileConfigSetting =  "sources_file" in emailNotificationDTO ? emailNotificationDTO.sources_file : false;
    // Passwords
    this.passwordCreate = "send_password_create" in emailNotificationDTO ? emailNotificationDTO.send_password_create : true;
    this.passwordShare = "send_password_share" in emailNotificationDTO ? emailNotificationDTO.send_password_share : true;
    this.passwordUpdate = "send_password_update" in emailNotificationDTO ? emailNotificationDTO.send_password_update : true;
    this.passwordDelete = "send_password_delete" in emailNotificationDTO ? emailNotificationDTO.send_password_delete : true;
    // Folders
    this.folderCreate = "send_folder_create" in emailNotificationDTO ? emailNotificationDTO.send_folder_create : true;
    this.folderUpdate = "send_folder_update" in emailNotificationDTO ? emailNotificationDTO.send_folder_update : true;
    this.folderDelete = "send_folder_delete" in emailNotificationDTO ? emailNotificationDTO.send_folder_delete : true;
    this.folderShare = "send_folder_share" in emailNotificationDTO ? emailNotificationDTO.send_folder_share : true;
    // Comment
    this.commentAdd = "send_comment_add" in emailNotificationDTO ? emailNotificationDTO.send_comment_add : true;
    // Group Membership
    this.groupDelete = "send_group_delete" in emailNotificationDTO ? emailNotificationDTO.send_group_delete : true;
    this.groupUserAdd = "send_group_user_add" in emailNotificationDTO ? emailNotificationDTO.send_group_user_add : true;
    this.groupUserDelete = "send_group_user_delete" in emailNotificationDTO ? emailNotificationDTO.send_group_user_delete : true;
    this.groupUserUpdate = "send_group_user_update" in emailNotificationDTO ? emailNotificationDTO.send_group_user_update : true;
    // Group Manager
    this.groupManagerUpdate = "send_group_manager_update" in emailNotificationDTO ? emailNotificationDTO.send_group_manager_update : true;
    // Registration & Recovery
    this.userCreate = "send_user_create" in emailNotificationDTO ? emailNotificationDTO.send_user_create : true;
    this.userRecover = "send_user_recover" in emailNotificationDTO ? emailNotificationDTO.send_user_recover : true;
    this.userRecoverComplete = "send_user_recoverComplete" in emailNotificationDTO ? emailNotificationDTO.send_user_recoverComplete : true;
    this.userRecoverAbortAdmin = "send_admin_user_recover_abort" in emailNotificationDTO ? emailNotificationDTO.send_admin_user_recover_abort : true;
    this.userRecoverCompleteAdmin = "send_admin_user_recover_complete" in emailNotificationDTO ? emailNotificationDTO.send_admin_user_recover_complete : true;
    this.userSetupCompleteAdmin = "send_admin_user_setup_completed" in emailNotificationDTO ? emailNotificationDTO.send_admin_user_setup_completed : true;
    // Passwords
    this. showDescription = "show_description" in emailNotificationDTO ? emailNotificationDTO.show_description : true;
    this. showSecret = "show_secret" in emailNotificationDTO ? emailNotificationDTO.show_secret : true;
    this. showUri = "show_uri" in emailNotificationDTO ? emailNotificationDTO.show_uri : true;
    this. showUsername = "show_username" in emailNotificationDTO ? emailNotificationDTO.show_username : true;
    // Comments
    this. showComment = "show_comment" in emailNotificationDTO ? emailNotificationDTO.show_comment : true;
    // Account recovery
    this.accountRecoveryRequestUser = "send_accountRecovery_request_user" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_request_user : true;
    this.accountRecoveryRequestAdmin = "send_accountRecovery_request_admin" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_request_admin : true;
    this.accountRecoveryRequestGuessing = "send_accountRecovery_request_guessing" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_request_guessing : true;
    this.accountRecoveryRequestUserApproved = "send_accountRecovery_response_user_approved" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_response_user_approved : true;
    this.accountRecoveryRequestUserRejected = "send_accountRecovery_response_user_rejected" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_response_user_rejected : true;
    this.accountRecoveryRequestCreatedAmin = "send_accountRecovery_response_created_admin" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_response_created_admin : true;
    this.accountRecoveryRequestCreatedAllAdmins = "send_accountRecovery_response_created_allAdmins" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_response_created_allAdmins : true;
    this.accountRecoveryRequestPolicyUpdate = "send_accountRecovery_policy_update" in emailNotificationDTO ? emailNotificationDTO.send_accountRecovery_policy_update : true;
  }
}

export default EmailNotificationModel;

