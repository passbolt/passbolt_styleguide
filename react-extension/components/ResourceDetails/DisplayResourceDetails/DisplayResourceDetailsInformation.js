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
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import HiddenPassword from "../../../../shared/components/Password/HiddenPassword";
import {withProgress} from "../../../contexts/ProgressContext";
import Totp from "../../../../shared/components/Totp/Totp";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {formatDateTimeAgo, formatExpirationDateTimeAgo} from "../../../../shared/utils/dateUtils";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

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
      previewedSecret: null, // The type of previewed secret
      plaintextSecretDto: null, // The current resource password decrypted
      creator: null, // the data of the resource creator
      modifier: null, // the data of the resource creator
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
    this.handleTotpClick = this.handleTotpClick.bind(this);
    this.handlePreviewTotpButtonClick = this.handlePreviewTotpButtonClick.bind(this);
    this.handleGoToResourceUriClick = this.handleGoToResourceUriClick.bind(this);
    this.isFolderParentShared = this.isFolderParentShared.bind(this);
  }

  componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
    if (this.state.open) {
      this.loadUserInformation();
    }
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
  }

  /**
   * Loads the information about the creator and the modifier of the current selected resource.
   * @returns {Promise<void>}
   */
  async loadUserInformation() {
    const resourceInformation = await this.props.context.port.request("passbolt.resources.find-details", this.resource.id);
    const hasInformationChanged = this.resource.created_by !== resourceInformation.created_by
      || this.resource.modified_by !== resourceInformation.modified_by;

    if (hasInformationChanged) {
      //current selected resource might have changed and the information received doesn't match anymore. In such case we don't update the state.
      return;
    }
    this.setState({
      creator: resourceInformation?.creator,
      modifier: resourceInformation?.modifier,
    });
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  handleResourceChange(previousResource) {
    const hasResourceChanged = this.resource.id !== previousResource.id;
    const hasResourceUpdated = this.resource.modified !== previousResource.modified;
    if ((hasResourceChanged || hasResourceUpdated) && this.state.open) {
      this.setState({plaintextSecretDto: null, previewedSecret: null});
    }

    if (!hasResourceChanged) {
      return;
    }

    const hasModifierOrCreatorChanged = this.resource.created_by !== previousResource.created_by
      || this.resource.modified_by !== previousResource.modified_by;

    if (!hasModifierOrCreatorChanged) {
      return;
    }

    this.setState({creator: null, modifier: null});
    if (this.state.open) {
      this.loadUserInformation();
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
      this.resource.metadata.uris?.[0], {
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

    if (!open) {
      this.setState({creator: null, modifier: null, plaintextSecretDto: null, previewedSecret: null});
    } else {
      this.loadUserInformation();
    }
  }

  /**
   * Handle when the user select the username of the resource
   */
  async handleUsernameClickEvent() {
    await ClipBoard.copy(this.resource.metadata.username, this.props.context.port);
    this.displaySuccessNotification(this.translate("The username has been copied to clipboard"));
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
   * Check if folder parent is shared
   * @returns {boolean}
   */
  isFolderParentShared() {
    const isShared = false;

    if (this.resource.folder_parent_id !== null && this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === this.resource.folder_parent_id);
      if (folder) {
        return !folder.personal;
      }
    }

    return isShared;
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
    let plaintextSecretDto;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    if (isPasswordPreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      try {
        plaintextSecretDto = await this.decryptResourceSecret(resourceId);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto?.password?.length) {
      await this.props.actionFeedbackContext.displayError(this.translate("The password is empty and cannot be copied to clipboard."));
      return;
    }

    await ClipBoard.copy(plaintextSecretDto.password, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The secret has been copied to clipboard"));
  }

  /**
   * Toggle preview password
   * @returns {Promise<void>}
   */
  async togglePreviewPassword() {
    const isPasswordPreviewed = this.isPasswordPreviewed();
    this.hidePreviewedSecret();
    if (!isPasswordPreviewed) {
      await this.previewPassword();
      await this.props.resourceWorkspaceContext.onResourcePreviewed();
    }
  }

  /**
   * Hide the previewed resource secret.
   */
  hidePreviewedSecret() {
    this.setState({plaintextSecretDto: null, previewedSecret: null});
  }

  /**
   * Preview password
   * @returns {Promise<void>}
   */
  async previewPassword() {
    const resourceId = this.resource.id;
    const previewedSecret = "password";
    let plaintextSecretDto;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    try {
      plaintextSecretDto = await this.decryptResourceSecret(resourceId);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto?.password?.length) {
      await this.props.actionFeedbackContext.displayError(this.translate("The password is empty and cannot be previewed."));
      return;
    }

    this.setState({plaintextSecretDto, previewedSecret});
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The plaintext secret DTO
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", resourceId);
  }

  /**
   * Handle copy totp
   * @return {Promise<void>}
   */
  async handleTotpClick() {
    let plaintextSecretDto, code;
    const isTotpPreviewed = this.isTotpPreviewed();

    if (isTotpPreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      this.props.progressContext.open(this.props.t('Decrypting secret'));

      try {
        plaintextSecretDto = await this.decryptResourceSecret(this.resource.id);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }

      this.props.progressContext.close();
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be copied to clipboard."));
      return;
    }

    try {
      code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to copy the TOTP"));
      return;
    }

    await ClipBoard.copy(code, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The TOTP has been copied to clipboard"));
  }

  /**
   * Handle preview totp button click.
   */
  handlePreviewTotpButtonClick() {
    const isTotpPreviewed = this.isTotpPreviewed();
    this.hidePreviewedSecret();
    if (!isTotpPreviewed) {
      this.previewTotp();
      this.props.resourceWorkspaceContext.onResourcePreviewed();
    }
  }

  /**
   * Preview totp
   * @returns {Promise<void>}
   */
  async previewTotp() {
    const resourceId = this.resource.id;
    const previewedSecret = "totp";
    let plaintextSecretDto;

    this.props.progressContext.open(this.props.t("Decrypting secret"));

    try {
      plaintextSecretDto = await this.decryptResourceSecret(resourceId);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be previewed."));
      return;
    }

    this.setState({plaintextSecretDto, previewedSecret});
  }

  /**
   * Check if the password is previewed
   * @returns {boolean}
   */
  isPasswordPreviewed() {
    return this.state.previewedSecret === 'password';
  }

  /**
   * Check if the totp is previewed
   * @returns {boolean}
   */
  isTotpPreviewed() {
    return this.state.previewedSecret === 'totp';
  }

  /**
   * Whenever the user wants to follow a resource uri.
   */
  handleGoToResourceUriClick() {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.resource.metadata.uris[0]);
  }

  /**
   * display a success notification message
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Is password resource
   * @return {boolean}
   */
  isPasswordResources() {
    // TODO: How to handle if resource type is not enabled or not loaded yet ?
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasPassword();
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  isTotpResources() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasTotp();
  }

  /**
   * Returns true if the resource requires some attention.
   * @returns {boolean}
   */
  get isAttentionRequired() {
    return this.isAttentionRequiredOnExpiryDate;
  }

  /**
   * Returns the expiration status of the current resource.
   * @returns {string}
   */
  get resourceExpirationStatus() {
    if (!this.resource?.expired) {
      return this.translate("Not set");
    }
    return formatExpirationDateTimeAgo(this.resource?.expired, this.props.t, this.props.context.locale);
  }

  /**
   * Returns true if the current resource is expired or about to expire.
   * @returns {boolean}
   */
  get isAttentionRequiredOnExpiryDate() {
    if (!this.resource?.expired) {
      return false;
    }

    const expiryDate = new Date(this.resource.expired);
    return expiryDate <= new Date();
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
    const canUsePasswordExpiry = this.props.passwordExpiryContext.isFeatureEnabled();
    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);

    const creatorUsername = this.state.creator?.username || "";
    const modifierUsername = this.state.modifier?.username || "";
    const createdDateTimeAgo = formatDateTimeAgo(this.resource.created, this.props.t, this.props.context.locale);
    const modifiedDateTimeAgo = formatDateTimeAgo(this.resource.modified, this.props.t, this.props.context.locale);
    const isPasswordPreviewed = this.isPasswordPreviewed();
    const isTotpPreviewed = this.isTotpPreviewed();

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span>
                <Trans>Information</Trans>
                {canUsePasswordExpiry && this.isAttentionRequired && <Icon name="exclamation" baseline={true}/>}
              </span>
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
          {this.isPasswordResources() &&
            <>
              <li className="username">
                <span className="label"><Trans>Username</Trans></span>
                <span className="value"><button type="button" className="link no-border" onClick={this.handleUsernameClickEvent}><span>{this.resource.metadata.username}</span></button></span>
              </li>
              <li className="password">
                <span className="label"><Trans>Password</Trans></span>
                <div className="value">
                  <div className={`secret secret-password ${isPasswordPreviewed ? "" : "secret-copy"}`}
                    title={isPasswordPreviewed ? this.state.plaintextSecretDto?.password : "secret"}>
                    <HiddenPassword
                      canClick={canCopySecret}
                      preview={this.state.plaintextSecretDto?.password}
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
            </>
          }
          {this.isTotpResources() &&
            <li className="totp">
              <span className="label"><Trans>TOTP</Trans></span>
              <div className="value">
                <div className={`secret secret-totp ${isTotpPreviewed ? "" : "secret-copy"}`}>
                  {isTotpPreviewed &&
                    <Totp
                      totp={this.state.plaintextSecretDto?.totp}
                      canClick={canCopySecret}
                      onClick={this.handleTotpClick}/>
                  }
                  {!isTotpPreviewed &&
                    <button type="button" className="link no-border" onClick={this.handleTotpClick} disabled={!canCopySecret}>
                      <span>Copy TOTP to clipboard</span>
                    </button>
                  }
                </div>
                {canPreviewSecret &&
                  <button type="button" onClick={this.handlePreviewTotpButtonClick} className="totp-view button-transparent">
                    <Icon name={isTotpPreviewed ? 'eye-close' : 'eye-open'}/>
                  </button>
                }
              </div>
            </li>
          }
          <li className="uri">
            <span className="label"><Trans>URI</Trans></span>
            <span className="value">
              {this.safeUri && <button type="button" className="link no-border" onClick={this.handleGoToResourceUriClick}><span>{this.resource.metadata.uris?.[0]}</span></button>}
              {!this.safeUri && <span>{this.resource.metadata.uris?.[0]}</span>}
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
                { this.isFolderParentShared() ? <Icon name="folder-shared"/> : <Icon name="folder"/>}
                <span>{this.getFolderName(this.resource.folder_parent_id)}</span>
              </button>
            </span>
          </li>
          }
          {canUsePasswordExpiry &&
            <li className="expiry">
              <span className="label"><Trans>Expiry</Trans> {this.isAttentionRequiredOnExpiryDate && <Icon name="exclamation" baseline={true}/>}
              </span>
              <span className="value" title={this.resource.expired}>{this.resourceExpirationStatus}</span>
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
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  actionFeedbackContext: PropTypes.any, // The action feedback context
  progressContext: PropTypes.any, // The progress context
  passwordExpiryContext: PropTypes.object, // the passowrd expiry context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withRouter(withActionFeedback(withResourceWorkspace(withResourceTypesLocalStorage(withPasswordExpiry(withProgress(withTranslation('common')(DisplayResourceDetailsInformation)))))))));
