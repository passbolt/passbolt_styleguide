/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../contexts/DialogContext";
import UploadUserProfileAvatar from "../UploadUserProfileAvatar/UploadUserProfileAvatar";
import { Trans, withTranslation } from "react-i18next";
import { withRbac } from "../../../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../../../shared/services/rbacs/uiActionEnumeration";
import UploadFileSVG from "../../../../img/svg/upload_file.svg";
/**
 * This component displays the user profile help
 */
class DisplayUserProfileHelp extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindHandlers();
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.props.context.loggedInUser;
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleUploadPicture = this.handleUploadPicture.bind(this);
  }

  /**
   * Whenever the user wants to upload a new profile's picture
   */
  handleUploadPicture() {
    this.props.dialogContext.open(UploadUserProfileAvatar);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Can the user access upload a new avatar capability.
   * @returns {bool}
   */
  get canIUseUploadAvatarCapability() {
    return this.props.rbacContext.canIUseAction(uiActions.AVATAR_UPLOAD);
  }

  render() {
    return (
      this.user && (
        <div className="sidebar-help-section profile">
          <h3>
            <Trans>Avatar</Trans>
          </h3>
          <div className="avatar">
            <div className="value">
              <UserAvatar
                user={this.props.context.loggedInUser}
                baseUrl={this.props.context.userSettings.getTrustedDomain()}
                className=""
              />
            </div>
          </div>
          {this.canIUseUploadAvatarCapability && (
            <div className="upload-avatar">
              <button
                className="button edit-avatar-action"
                title={this.translate("Upload a new avatar picture")}
                type="button"
                onClick={this.handleUploadPicture}
              >
                <UploadFileSVG />
                <span className="help-text">
                  <Trans>Upload a new avatar picture</Trans>
                </span>
              </button>
            </div>
          )}
        </div>
      )
    );
  }
}

DisplayUserProfileHelp.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.object, // The rbac context
  dialogContext: PropTypes.object, // The dialog context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any, // The i18n context translation
};

export default withAppContext(withDialog(withRbac(withTranslation("common")(DisplayUserProfileHelp))));
