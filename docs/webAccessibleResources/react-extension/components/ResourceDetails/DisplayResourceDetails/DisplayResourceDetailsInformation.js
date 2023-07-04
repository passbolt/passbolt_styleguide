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
 * @since         2.13.0
 */
import React from "react";
import Icon from "../../../../shared/components/Icons/Icon";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {
  resourceLinkAuthorizedProtocols,
  ResourceWorkspaceFilterTypes,
  withResourceWorkspace
} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import sanitizeUrl, {urlProtocols} from "../../../lib/Sanitize/sanitizeUrl";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import HiddenPassword from "../../../../shared/components/Password/HiddenPassword";

class DisplayResourceDetailsInformation extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true,
      previewedPassword: null // The current resource password decrypted
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFolderParentClickEvent = this.handleFolderParentClickEvent.bind(this);
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleUsernameClickEvent = this.handleUsernameClickEvent.bind(this);
    this.handlePasswordClickEvent = this.handlePasswordClickEvent.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
    this.handleGoToResourceUriClick = this.handleGoToResourceUriClick.bind(this);
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  handleResourceChange(previousResource) {
    const hasResourceChanged = this.resource.id !== previousResource.id;
    const hasResourceUpdated = this.resource.modified !== previousResource.modified;
    if ((hasResourceChanged || hasResourceUpdated) && this.state.open) {
      this.setState({previewedPassword: null});
    }
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * the resource safe uri
   * @return {string}
   */
  get safeUri() {
    return sanitizeUrl(
      this.resource.uri, {
        whiteListedProtocols: resourceLinkAuthorizedProtocols,
        defaultProtocol: urlProtocols.HTTPS
      });
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleFolderParentClickEvent() {
    if (this.resource.folder_parent_id) { // Case of specific folder
      const folderParent = this.props.context.folders.find(item => item.id === this.resource.folder_parent_id);
      this.props.history.push(`/app/folders/view/${folderParent.id}`);
    } else { // Case of root folder
      const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
      this.props.history.push(`/app/passwords`, {filter});
    }
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user select the username of the resource
   */
  async handleUsernameClickEvent() {
    await ClipBoard.copy(this.resource.username, this.props.context.port);
    this.displaySuccessNotification(this.translate("The username has been copied to clipboard"));
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Get a user username
   * @param {string} userId The user id
   */
  getUserUsername(userId) {
    if (this.props.context.users) {
      const user = this.props.context.users.find(item => item.id === userId);
      if (user) {
        return user.username;
      }
    }

    return "";
  }

  /**
   * Get the folder name.
   * @param {string} folderId The folder id
   * @returns {string}
   */
  getFolderName(folderParentId) {
    if (folderParentId === null) {
      return this.translate("root");
    }

    if (this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === folderParentId);
      if (folder) {
        return folder.name;
      }
    }

    return "";
  }

  /**
   * Handle copy password click.
   */
  async handlePasswordClickEvent() {
    await this.copyPasswordToClipboard();
  }

  /**
   * Handle preview password button click.
   */
  async handleViewPasswordButtonClick() {
    await this.togglePreviewPassword();
  }

  /**
   * Copy the resource password to clipboard.
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard() {
    const resourceId = this.resource.id;
    const isPasswordPreviewed = this.isPasswordPreviewed();
    let password;

    if (isPasswordPreviewed) {
      password = this.state.previewedPassword;
    } else {
      try {
        const plaintext = await this.decryptResourceSecret(resourceId);
        password = this.extractPlaintextPassword(plaintext);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
        return;
      }
    }
    await ClipBoard.copy(password, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The secret has been copied to clipboard"));
  }

  /**
   * Toggle preview password
   * @returns {Promise<void>}
   */
  async togglePreviewPassword() {
    const isPasswordPreviewed = this.isPasswordPreviewed();
    if (isPasswordPreviewed) {
      this.hidePreviewedPassword();
    } else {
      await this.previewPassword();
    }
  }

  /**
   * Hide the previewed resource password.
   */
  hidePreviewedPassword() {
    this.setState({previewedPassword: null});
  }

  /**
   * Preview password
   * @returns {Promise<void>}
   */
  async previewPassword() {
    const resourceId = this.resource.id;
    let previewedPassword;

    try {
      const plaintext = await this.decryptResourceSecret(resourceId);
      previewedPassword = this.extractPlaintextPassword(plaintext);
      this.setState({previewedPassword});
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.props.context.port.request("passbolt.secret.decrypt", resourceId, {showProgress: true});
  }

  /**
   * Get the password property from a secret plaintext object.
   * @param {string|object} plaintextDto The secret plaintext
   * @returns {string}
   */
  extractPlaintextPassword(plaintextDto) {
    if (!plaintextDto) {
      throw new TypeError('The secret plaintext is empty.');
    }
    if (typeof plaintextDto === 'string') {
      return plaintextDto;
    }
    if (typeof plaintextDto !== 'object') {
      throw new TypeError('The secret plaintext must be a string or an object.');
    }
    if (!Object.prototype.hasOwnProperty.call(plaintextDto, 'password')) {
      throw new TypeError('The secret plaintext must have a password property.');
    }
    return plaintextDto.password;
  }

  /**
   * Check if the password is previewed
   * @returns {boolean}
   */
  isPasswordPreviewed() {
    return this.state.previewedPassword !== null;
  }

  /**
   * Whenever the user wants to follow a resource uri.
   */
  handleGoToResourceUriClick() {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.resource);
  }

  /**
   * display a success notification message
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canUseFolders = this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
    const canPreviewSecret = this.props.context.siteSettings.canIUse("previewPassword")
      && this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_PREVIEW);
    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);
    const creatorUsername = this.getUserUsername(this.resource.created_by);
    const modifierUsername = this.getUserUsername(this.resource.modified_by);
    const createdDateTimeAgo = this.formatDateTimeAgo(this.resource.created);
    const modifiedDateTimeAgo = this.formatDateTimeAgo(this.resource.modified);
    const isPasswordPreviewed = this.isPasswordPreviewed();

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <Trans>Information</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </button>
          </h4>
        </div>
        <ul className="accordion-content">
          <li className="username">
            <span className="label"><Trans>Username</Trans></span>
            <span className="value"><button type="button" className="link no-border" onClick={this.handleUsernameClickEvent}><span>{this.resource.username}</span></button></span>
          </li>
          <li className="password">
            <span className="label"><Trans>Password</Trans></span>
            <div className="value">
              <div className={`secret ${isPasswordPreviewed ? "" : "secret-copy"}`}
                title={isPasswordPreviewed ? this.state.previewedPassword : "secret"}>
                <HiddenPassword
                  canClick={canCopySecret}
                  preview={this.state.previewedPassword}
                  onClick={this.handlePasswordClickEvent} />
              </div>
              {canPreviewSecret &&
                <button type="button" onClick={this.handleViewPasswordButtonClick}
                  className="password-view button-transparent">
                  <Icon name={isPasswordPreviewed ? 'eye-close' : 'eye-open'}/>
                  <span className="visually-hidden"><Trans>View</Trans></span>
                </button>
              }
            </div>
          </li>
          <li className="uri">
            <span className="label"><Trans>URI</Trans></span>
            <span className="value">
              {this.safeUri && <button type="button" className="link no-border" onClick={this.handleGoToResourceUriClick}><span>{this.resource.uri}</span></button>}
              {!this.safeUri && <span>{this.resource.uri}</span>}
            </span>
          </li>
          <li className="modified">
            <span className="label"><Trans>Modified</Trans></span>
            <span className="value" title={this.resource.modified}>{modifiedDateTimeAgo}</span>
          </li>
          <li className="modified-by">
            <span className="label"><Trans>Modified by</Trans></span>
            <span className="value">{modifierUsername}</span>
          </li>
          <li className="modified">
            <span className="label"><Trans>Created</Trans></span>
            <span className="value" title={this.resource.created}>{createdDateTimeAgo}</span>
          </li>
          <li className="modified-by">
            <span className="label"><Trans>Created by</Trans></span>
            <span className="value">{creatorUsername}</span>
          </li>
          {canUseFolders &&
          <li className="location">
            <span className="label"><Trans>Location</Trans></span>
            <span className="value">
              <button type="button" onClick={this.handleFolderParentClickEvent} disabled={!this.props.context.folders} className="link no-border folder-link">
                <Icon name="folder"/>
                <span>{this.getFolderName(this.resource.folder_parent_id)}</span>
              </button>
            </span>
          </li>
          }
        </ul>
      </div>
    );
  }
}

DisplayResourceDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withRouter(withActionFeedback(withResourceWorkspace(withTranslation('common')(DisplayResourceDetailsInformation))))));
