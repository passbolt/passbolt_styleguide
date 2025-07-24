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
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import EditResource from "../EditResource/EditResource";
import ShareDialog from "../../Share/ShareDialog";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import DeleteResource from "../DeleteResource/DeleteResource";
import {
  resourceLinkAuthorizedProtocols,
  withResourceWorkspace
} from "../../../contexts/ResourceWorkspaceContext";
import sanitizeUrl, {urlProtocols} from "../../../lib/Sanitize/sanitizeUrl";
import {Trans, withTranslation} from "react-i18next";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {withProgress} from "../../../contexts/ProgressContext";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {formatDateForApi} from "../../../../shared/utils/dateUtils";
import {DateTime} from "luxon";
import PasswordExpiryDialog from "../PasswordExpiryDialog/PasswordExpiryDialog";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import OwnedByMeIcon from "../../../../img/svg/owned_by_me.svg";
import KeyIcon from "../../../../img/svg/key.svg";
import GlobeIcon from "../../../../img/svg/globe.svg";
import LinkIcon from "../../../../img/svg/link.svg";
import ShareIcon from "../../../../img/svg/share.svg";
import EditIcon from "../../../../img/svg/edit.svg";
import DeleteIcon from "../../../../img/svg/delete.svg";
import ClockIcon from "../../../../img/svg/clock.svg";
import CalendarIcon from "../../../../img/svg/calendar.svg";
import TotpIcon from "../../../../img/svg/totp.svg";
import GoIcon from "../../../../img/svg/go.svg";
import {withClipboard} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";
import ActionAbortedMissingMetadataKeys
  from "../../Metadata/ActionAbortedMissingMetadataKeys/ActionAbortedMissingMetadataKeys";
import {
  withMetadataKeysSettingsLocalStorage
} from "../../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";

class DisplayResourcesListContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleShareClickEvent = this.handleShareClickEvent.bind(this);
    this.handleUsernameClickEvent = this.handleUsernameClickEvent.bind(this);
    this.handleUriClickEvent = this.handleUriClickEvent.bind(this);
    this.handlePermalinkClickEvent = this.handlePermalinkClickEvent.bind(this);
    this.handlePasswordClickEvent = this.handlePasswordClickEvent.bind(this);
    this.handleTotpClickEvent = this.handleTotpClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleGoToResourceUriClick = this.handleGoToResourceUriClick.bind(this);
    this.handleSetExpiryDateClick = this.handleSetExpiryDateClick.bind(this);
    this.handleMarkAsExpiredClick = this.handleMarkAsExpiredClick.bind(this);
  }

  /**
   * handle edit resource
   */
  handleEditClickEvent() {
    const canEditResource = this.canEditResource();
    if (canEditResource) {
      this.props.dialogContext.open(EditResource, {resource: this.resource});
    } else {
      this.displayActionAborted();
    }
    this.props.hide();
  }

  /**
   * Can edit the resource
   * @return {boolean}
   */
  canEditResource() {
    const resourceType = this.props.resourceTypes.getFirstById(this.resource.resource_type_id);

    if (resourceType.isV5()) {
      const isMetadataSharedKeyEnforced = !this.props.metadataKeysSettings.allowUsageOfPersonalKeys;
      const isPersonalResource = this.resource.personal;
      const userHasMissingKeys = this.props.context.loggedInUser.missing_metadata_key_ids?.length > 0;

      if (isPersonalResource && isMetadataSharedKeyEnforced && userHasMissingKeys) {
        return false;
      } else if (!isPersonalResource && userHasMissingKeys) {
        return false;
      }
    }

    return true;
  }

  /**
   * handle share resource
   */
  handleShareClickEvent() {
    const canShareResource = this.canShareResource();
    if (canShareResource) {
      const resourcesIds = [this.resource.id];
      this.props.context.setContext({shareDialogProps: {resourcesIds}});
      this.props.dialogContext.open(ShareDialog);
    } else {
      this.displayActionAborted();
    }
    this.props.hide();
  }

  /**
   * Can share the resource
   * @return {boolean}
   */
  canShareResource() {
    const resourceType = this.props.resourceTypes.getFirstById(this.resource.resource_type_id);

    if (resourceType.isV5()) {
      const userHasMissingKeys = this.props.context.loggedInUser.missing_metadata_key_ids?.length > 0;
      return !userHasMissingKeys;
    }

    return true;
  }

  /**
   * handle username resource
   */
  async handleUsernameClickEvent() {
    await this.props.clipboardContext.copy(this.resource.metadata.username, this.translate("The username has been copied to clipboard."));
    this.props.hide();
  }

  /**
   * handle uri resource
   */
  async handleUriClickEvent() {
    await this.props.clipboardContext.copy(this.resource.metadata.uris[0], this.translate("The uri has been copied to clipboard."));
    this.props.hide();
  }

  /**
   * handle permalink resource
   */
  async handlePermalinkClickEvent() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.resource.id}`;
    await this.props.clipboardContext.copy(permalink, this.translate("The permalink has been copied to clipboard."));
    this.props.hide();
  }

  /**
   * Decrypt the resource secret
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret() {
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", this.resource.id);
  }

  /**
   * Copy password from dto to clipboard
   * Support original password (a simple string) and composed objects)
   *
   * @param {object} plaintextSecretDto The plain text secret DTO.
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard(plaintextSecretDto) {
    const password = plaintextSecretDto.password;
    if (!password) {
      throw new TypeError(this.translate("The password is empty."));
    }
    await this.props.clipboardContext.copyTemporarily(password, this.translate("The secret has been copied to clipboard."));
  }

  /**
   * handle password resource
   */
  async handlePasswordClickEvent() {
    let plaintextSecretDto;
    this.props.hide();

    this.props.progressContext.open(this.props.t('Decrypting secret'));
    try {
      plaintextSecretDto = await this.decryptResourceSecret();
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
    this.props.progressContext.close();

    if (!plaintextSecretDto?.password?.length) {
      await this.props.actionFeedbackContext.displayWarning(this.translate("The password is empty and cannot be copied to clipboard."));
      return;
    }

    await this.copyPasswordToClipboard(plaintextSecretDto);
    this.props.resourceWorkspaceContext.onResourceCopied();
  }

  /**
   * handle copy to clipboard the totp of the selected resource
   */
  async handleTotpClickEvent() {
    let plaintextSecretDto, code;
    this.props.hide();

    this.props.progressContext.open(this.props.t('Decrypting secret'));
    try {
      plaintextSecretDto = await this.decryptResourceSecret();
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
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be copied to clipboard."));
      return;
    }

    try {
      code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to copy the TOTP"));
      return;
    }

    await this.props.clipboardContext.copyTemporarily(code, this.translate("The TOTP has been copied to clipboard."));
    await this.props.resourceWorkspaceContext.onResourceCopied();
  }

  /**
   * handle delete resource
   */
  handleDeleteClickEvent() {
    const resources = [this.resource];
    this.props.dialogContext.open(DeleteResource, {resources});
    this.props.hide();
  }

  /**
   * handle open the uri in a new tab
   */
  handleGoToResourceUriClick() {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.resource.metadata.uris[0]);
  }

  /**
   * Handle mark as expired
   * @return {Promise<void>}
   */
  async handleMarkAsExpiredClick() {
    try {
      await this.props.context.port.request("passbolt.resources.set-expiration-date", [{id: this.resource.id, expired: formatDateForApi(DateTime.utc())}]);
      // a count: 1 is used to minimize the translation file as a singular/plural version already exist.
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The resource has been marked as expired.", {count: 1}));
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to mark the resource as expired.", {count: 1}));
    } finally {
      this.props.hide();
    }
  }

  /**
   * Handle set expiry date click.
   */
  handleSetExpiryDateClick() {
    this.props.dialogContext.open(PasswordExpiryDialog, {
      resources: [this.resource]
    });
    this.props.hide();
  }

  /**
   * Display action aborted
   */
  displayActionAborted() {
    this.props.dialogContext.open(ActionAbortedMissingMetadataKeys);
  }

  /**
   *
   * the resource selected
   * @returns {*}
   */
  get resource() {
    return this.props.resource;
  }

  /**
   * the resource safe uri
   * @return {string|bool} Return safe uri or false if not safe
   */
  get safeUri() {
    return sanitizeUrl(
      this.resource.metadata.uris?.[0], {
        whiteListedProtocols: resourceLinkAuthorizedProtocols,
        defaultProtocol: urlProtocols.HTTPS
      });
  }

  /**
   * Can update the resource
   */
  canUpdate() {
    return this.resource.permission.type >= 7;
  }

  /**
   * Can share the resource
   */
  canShare() {
    return this.resource.permission.type === 15;
  }

  /**
   * Can copy username
   * @returns {boolean}
   */
  canCopyUsername() {
    return this.resource.metadata?.username && this.resource.metadata.username !== "";
  }

  /**
   * Can copy password
   * @returns {boolean}
   */
  canCopyPassword() {
    return this.isPasswordResources;
  }

  /**
   * Is password resource
   * @return {boolean}
   */
  get isPasswordResources() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasPassword();
  }

  /**
   * Can copy totp
   * @returns {boolean}
   */
  canCopyTotp() {
    return this.isTotpResources;
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isTotpResources() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasTotp();
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.isStandaloneTotp();
  }

  /**
   * Can copy uri
   * @returns {boolean}
   */
  canCopyUri() {
    return this.resource.metadata?.uris?.length > 0 && this.resource.metadata.uris?.[0] !== "";
  }

  /**
   * Can use Totp
   * @return {boolean}
   */
  get canUseTotp() {
    return this.props.context.siteSettings.canIUse('totpResourceTypes');
  }

  /**
   * Can use password expiry
   * @return {boolean}
   */
  get canUsePasswordExpiry() {
    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    return this.props.passwordExpiryContext.isFeatureEnabled() && passwordExpirySettings?.policy_override;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);
    const canViewShare = this.props.rbacContext.canIUseUiAction(uiActions.SHARE_VIEW_LIST);

    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}
        className="floating">

        {
          !this.isStandaloneTotpResource &&  <li key="option-username-resource" className="ready">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" id="username" className="link no-border"
                    disabled={!this.canCopyUsername()}
                    onClick={this.handleUsernameClickEvent}><OwnedByMeIcon/><span><Trans>Copy username</Trans></span></button>
                </div>
              </div>
            </div>
          </li>
        }

        {canCopySecret && this.canCopyPassword() &&
          <li key="option-copy-password-resource" className="ready">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border" id="password" onClick={this.handlePasswordClickEvent}><KeyIcon/><span><Trans>Copy password</Trans></span></button>
                </div>
              </div>
            </div>
          </li>
        }
        <li key="option-copy-uri-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button type="button" id="uri" className="link no-border" disabled={!this.canCopyUri()}
                  onClick={this.handleUriClickEvent}><GlobeIcon/><span><Trans>Copy URI</Trans></span></button>
              </div>
            </div>
          </div>
        </li>
        <li key="option-permalink-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button className="link no-border" type="button" id="permalink" onClick={this.handlePermalinkClickEvent}><LinkIcon/><span><Trans>Copy permalink</Trans></span></button>
              </div>
            </div>
          </div>
        </li>
        {canCopySecret && this.canUseTotp && this.canCopyTotp() &&
          <li key="option-copy-totp-resource" className="ready">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border" id="totp"
                    onClick={this.handleTotpClickEvent}><TotpIcon/><span><Trans>Copy TOTP</Trans></span></button>
                </div>
              </div>
            </div>
          </li>
        }
        <li key="option-open-uri-resource" className="ready separator-after">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button
                  type="button"
                  id="open-uri"
                  className="link no-border"
                  disabled={!this.safeUri}
                  onClick={this.handleGoToResourceUriClick}><GoIcon/><span><Trans>Open URI in a new Tab</Trans></span></button>
              </div>
            </div>
          </div>
        </li>
        {this.canUsePasswordExpiry && this.canUpdate() &&
          <>
            <li key="option-set-expiry-date" className="ready">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button
                      type="button"
                      id="set-expiry-date"
                      className="link no-border"
                      onClick={this.handleSetExpiryDateClick}><CalendarIcon/><span><Trans>Set expiry date</Trans></span></button>
                  </div>
                </div>
              </div>
            </li>
            <li key="option-mark-as-expired-resource" className="ready separator-after">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button
                      type="button"
                      id="mark-as-expired"
                      className="link no-border"
                      onClick={this.handleMarkAsExpiredClick}><ClockIcon/><span><Trans>Mark as expired</Trans></span></button>
                  </div>
                </div>
              </div>
            </li>
          </>
        }
        {
          this.canUpdate() && <li key="option-edit-resource" className="ready">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" id="edit" className="link no-border"
                    onClick={this.handleEditClickEvent}><EditIcon/><span><Trans>Edit</Trans></span></button>
                </div>
              </div>
            </div>
          </li>
        }
        {canViewShare && this.canShare() &&
          <li key="option-share-resource" className="ready">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button
                    type="button"
                    id="share" className="link no-border"
                    onClick={this.handleShareClickEvent}><ShareIcon/><span><Trans>Share</Trans></span></button>
                </div>
              </div>
            </div>
          </li>
        }
        {
          this.canShare() && <li key="option-delete-resource" className="ready">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button
                    type="button"
                    id="delete" className="link no-border"
                    onClick={this.handleDeleteClickEvent}><DeleteIcon/><span><Trans>Delete</Trans></span></button>
                </div>
              </div>
            </div>
          </li>
        }

      </ContextualMenuWrapper>
    );
  }
}

DisplayResourcesListContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  resourceWorkspaceContext: PropTypes.any, // Resource workspace context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  dialogContext: PropTypes.any, // the dialog context
  progressContext: PropTypes.any, // The progress context
  resource: PropTypes.object, // resource selected
  actionFeedbackContext: PropTypes.any, // The action feedback context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  clipboardContext: PropTypes.object, // the clipboard service provider
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  t: PropTypes.func, // The translation function
};

export default withAppContext(withMetadataKeysSettingsLocalStorage(withClipboard(withRbac(withResourceWorkspace(withResourceTypesLocalStorage(withPasswordExpiry(withDialog(withProgress(withActionFeedback(withTranslation('common')(DisplayResourcesListContextualMenu)))))))))));
