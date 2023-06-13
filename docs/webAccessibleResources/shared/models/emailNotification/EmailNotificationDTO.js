
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
 * Model related to the Email Notification dto settings
 */
class EmailNotificationDTO {
  /**
   * Constructor
   *
   * @param {EmailNotificationModel} emailNotificationModel
   * @public
   */
  constructor(emailNotificationModel = {}) {
    this.sources_database = "hasDatabaseSetting" in emailNotificationModel ? emailNotificationModel.hasDatabaseSetting : false;
    this.sources_file = "hasFileConfigSetting" in emailNotificationModel ? emailNotificationModel.hasFileConfigSetting : false;
    this.send_password_create = "passwordCreate" in emailNotificationModel ? emailNotificationModel.passwordCreate : true;
    this.send_password_share = "passwordShare" in emailNotificationModel ? emailNotificationModel.passwordShare : true;
    this.send_password_update = "passwordUpdate" in emailNotificationModel ? emailNotificationModel.passwordUpdate : true;
    this.send_password_delete = "passwordDelete" in emailNotificationModel ? emailNotificationModel.passwordDelete : true;
    this.send_folder_create = "folderCreate" in emailNotificationModel ? emailNotificationModel.folderCreate : true;
    this.send_folder_update = "folderUpdate" in emailNotificationModel ? emailNotificationModel.folderUpdate : true;
    this.send_folder_delete = "folderDelete" in emailNotificationModel ? emailNotificationModel.folderDelete : true;
    this.send_folder_share = "folderShare" in emailNotificationModel ? emailNotificationModel.folderShare : true;
    this.send_comment_add = "commentAdd" in emailNotificationModel ? emailNotificationModel.commentAdd : true;
    this.send_group_delete = "groupDelete" in emailNotificationModel ? emailNotificationModel.groupDelete : true;
    this.send_group_user_add = "groupUserAdd" in emailNotificationModel ? emailNotificationModel.groupUserAdd : true;
    this.send_group_user_delete = "groupUserDelete" in emailNotificationModel ? emailNotificationModel.groupUserDelete : true;
    this.send_group_user_update = "groupUserUpdate" in emailNotificationModel ? emailNotificationModel.groupUserUpdate : true;
    this.send_group_manager_update = "groupManagerUpdate" in emailNotificationModel ? emailNotificationModel.groupManagerUpdate : true;
    this.send_user_create = "userCreate" in emailNotificationModel ? emailNotificationModel.userCreate : true;
    this.send_user_recover = "userRecover" in emailNotificationModel ? emailNotificationModel.userRecover : true;
    this.send_user_recoverComplete = "userRecoverComplete" in emailNotificationModel ? emailNotificationModel.userRecoverComplete : true;
    this.send_admin_user_setup_completed = "userSetupCompleteAdmin" in emailNotificationModel ? emailNotificationModel.userSetupCompleteAdmin : true;
    this.send_admin_user_recover_abort = "userRecoverAbortAdmin" in emailNotificationModel ? emailNotificationModel.userRecoverAbortAdmin : true;
    this.send_admin_user_recover_complete = "userRecoverCompleteAdmin" in emailNotificationModel ? emailNotificationModel.userRecoverCompleteAdmin : true;
    this.send_accountRecovery_request_user = "accountRecoveryRequestUser" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestUser : true;
    this.send_accountRecovery_request_admin = "accountRecoveryRequestAdmin" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestAdmin : true;
    this.send_accountRecovery_request_guessing = "accountRecoveryRequestGuessing" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestGuessing : true;
    this.send_accountRecovery_response_user_approved = "accountRecoveryRequestUserApproved" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestUserApproved : true;
    this.send_accountRecovery_response_user_rejected = "accountRecoveryRequestUserRejected" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestUserRejected : true;
    this.send_accountRecovery_response_created_admin = "accountRecoveryRequestCreatedAmin" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestCreatedAmin : true;
    this.send_accountRecovery_response_created_allAdmins = "accountRecoveryRequestCreatedAllAdmins" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestCreatedAllAdmins : true;
    this.send_accountRecovery_policy_update = "accountRecoveryRequestPolicyUpdate" in emailNotificationModel ? emailNotificationModel.accountRecoveryRequestPolicyUpdate : true;
    this.show_description = "showDescription" in emailNotificationModel ? emailNotificationModel.showDescription : true;
    this.show_secret = "showSecret" in emailNotificationModel ? emailNotificationModel.showSecret : true;
    this.show_uri = "showUri" in emailNotificationModel ? emailNotificationModel.showUri : true;
    this.show_username = "showUsername" in emailNotificationModel ? emailNotificationModel.showUsername : true;
    this.show_comment = "showComment" in emailNotificationModel ? emailNotificationModel.showComment : true;
  }
}

export default EmailNotificationDTO;
