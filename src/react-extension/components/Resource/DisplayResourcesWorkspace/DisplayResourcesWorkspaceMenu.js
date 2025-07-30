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
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withDialog} from "../../../contexts/DialogContext";
import DeleteResource from "../DeleteResource/DeleteResource";
import EditResource from "../EditResource/EditResource";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import {Trans, withTranslation} from "react-i18next";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withProgress} from "../../../contexts/ProgressContext";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import PasswordExpiryDialog from "../PasswordExpiryDialog/PasswordExpiryDialog";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {formatDateForApi} from "../../../../shared/utils/dateUtils";
import {DateTime} from "luxon";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import MoreHorizontalSVG from "../../../../img/svg/more_horizontal.svg";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import DownloadFileSVG from "../../../../img/svg/download_file.svg";
import CalendarCogSVG from "../../../../img/svg/calendar_cog.svg";
import AlarmClockSVG from "../../../../img/svg/alarm_clock.svg";
import CopySVG from "../../../../img/svg/copy.svg";
import OwnedByMeSVG from "../../../../img/svg/owned_by_me.svg";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import GlobeSVG from "../../../../img/svg/globe.svg";
import LinkSVG from "../../../../img/svg/link.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";
import EditSVG from "../../../../img/svg/edit.svg";
import ShareSVG from "../../../../img/svg/share.svg";
import CloseSVG from "../../../../img/svg/close.svg";
import {withClipboard} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";
import {
  withMetadataKeysSettingsLocalStorage
} from "../../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import ActionAbortedMissingMetadataKeys
  from "../../Metadata/ActionAbortedMissingMetadataKeys/ActionAbortedMissingMetadataKeys";

/**
 * This component allows the current user to add a new comment on a resource
 */
class DisplayResourcesWorkspaceMenu extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleCopyPermalinkClickEvent = this.handleCopyPermalinkClickEvent.bind(this);
    this.handleCopyUsernameClickEvent = this.handleCopyUsernameClickEvent.bind(this);
    this.handleCopyUriClickEvent = this.handleCopyUriClickEvent.bind(this);
    this.handleShareClickEvent = this.handleShareClickEvent.bind(this);
    this.handleCopySecretClickEvent = this.handleCopySecretClickEvent.bind(this);
    this.handleCopyTotpClickEvent = this.handleCopyTotpClickEvent.bind(this);
    this.handleExportClickEvent = this.handleExportClickEvent.bind(this);
    this.handleMarkAsExpiredClick = this.handleMarkAsExpiredClick.bind(this);
    this.handleSetExpiryDateClickEvent = this.handleSetExpiryDateClickEvent.bind(this);
    this.handleClearSelectionClick = this.handleClearSelectionClick.bind(this);
  }

  /**
   * handle delete one or more resources
   */
  handleDeleteClickEvent() {
    this.props.dialogContext.open(DeleteResource, {resources: this.selectedResources});
  }

  /**
   * Handle mark as expired
   * @returns {Promise<void>}
   */
  async handleMarkAsExpiredClick() {
    const resourcesExpiryDateToUpdate = this.selectedResources.map(resource => ({id: resource.id, expired: formatDateForApi(DateTime.utc())}));
    try {
      await this.props.context.port.request("passbolt.resources.set-expiration-date", resourcesExpiryDateToUpdate);
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The resource has been marked as expired.", {count: resourcesExpiryDateToUpdate.length}));
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to mark the resource as expired.", {count: resourcesExpiryDateToUpdate.length}));
    }
  }

  /**
   * handle edit one resource
   */
  handleEditClickEvent() {
    const canEditResource = this.canEditResource();
    if (canEditResource) {
      this.props.dialogContext.open(EditResource, {resource: this.selectedResources[0]});
    } else {
      this.displayActionAborted();
    }
  }

  /**
   * Can edit the resource
   * @return {boolean}
   */
  canEditResource() {
    const resourceType = this.props.resourceTypes.getFirstById(this.selectedResources[0].resource_type_id);

    if (resourceType.isV5()) {
      const isMetadataSharedKeyEnforced = !this.props.metadataKeysSettings?.allowUsageOfPersonalKeys;
      const isPersonalResource = this.selectedResources[0].personal;
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
   * handle share resources
   */
  async handleShareClickEvent() {
    const resourcesIds = this.selectedResources.map(resource => resource.id);
    await this.props.context.setContext({shareDialogProps: {resourcesIds}});
    this.props.dialogContext.open(ShareDialog);
  }

  /**
   * handle copy permalink of one resource
   */
  async handleCopyPermalinkClickEvent() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.selectedResources[0].id}`;
    await this.props.clipboardContext.copy(permalink, this.translate("The permalink has been copied to clipboard."));
  }

  /**
   * handle copy username of one resource
   */
  async handleCopyUsernameClickEvent() {
    await this.props.clipboardContext.copy(this.selectedResources[0].metadata.username, this.translate("The username has been copied to clipboard."));
  }

  /**
   * handle copy uri of one resource
   */
  async handleCopyUriClickEvent() {
    await this.props.clipboardContext.copy(this.selectedResources[0].metadata.uris[0], this.translate("The uri has been copied to clipboard."));
  }

  /**
   * Handle the event on the 'close' icon to clear the current selection.
   * @returns {Promise<void>}
   */
  async handleClearSelectionClick() {
    await this.props.resourceWorkspaceContext.onResourceSelected.none();
  }

  /**
   * Decrypt the resource secret
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret() {
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", this.selectedResources[0].id);
  }

  /**
   * Copy password from dto to clipboard
   * Support original password (a simple string) and composed objects)
   *
   * @param {object} plaintextSecretDto The plaintext secret DTO.
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
   * handle copy to clipboard the secret of the selected resource
   */
  async handleCopySecretClickEvent() {
    let plaintextSecretDto;

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
  async handleCopyTotpClickEvent() {
    let plaintextSecretDto, code;

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
   * Whenever the user intends to set the expiration date on the selected resources
   */
  handleSetExpiryDateClickEvent() {
    this.props.dialogContext.open(PasswordExpiryDialog, {
      resources: this.selectedResources
    });
  }

  /**
   * Whenever the user intends to export the selected resources
   */
  handleExportClickEvent() {
    this.export();
  }

  /**
   * Display action aborted
   */
  displayActionAborted() {
    this.props.dialogContext.open(ActionAbortedMissingMetadataKeys);
  }

  /**
   * selected resources
   * @returns {[]|null}
   */
  get selectedResources() {
    return this.props.resourceWorkspaceContext.selectedResources;
  }

  /**
   * has at least one resource selected
   * @returns {boolean}
   */
  hasOneResourceSelected() {
    return this.selectedResources.length === 1;
  }

  /**
   * Can update the selected resources
   * @return {boolean}
   */
  canUpdate() {
    return this.selectedResources.every(resource => resource.permission.type >= 7);
  }

  /**
   * Can share the selected resources
   * @return {boolean}
   */
  canShare() {
    return this.selectedResources.every(resource => resource.permission.type === 15);
  }

  /**
   * Check if the user can export.
   * @return {boolean}
   */
  canExport() {
    return this.props.context.siteSettings.canIUse("export")
      && this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_EXPORT);
  }

  /**
   * Can copy username
   * @returns {boolean}
   */
  canCopyUsername() {
    return this.selectedResources[0].metadata?.username;
  }

  /**
   * Can copy uri
   * @returns {boolean}
   */
  canCopyUri() {
    return Boolean(this.selectedResources[0].metadata?.uris?.[0]);
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
    return this.props.resourceTypes?.getFirstById(this.selectedResources[0].resource_type_id)?.hasPassword();
  }

  /**
   * Can copy totp
   * @returns {boolean}
   */
  canCopyTotp() {
    return this.props.resourceTypes?.getFirstById(this.selectedResources[0].resource_type_id)?.hasTotp();
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return this.props.resourceTypes?.getFirstById(this.selectedResources[0].resource_type_id).isStandaloneTotp();
  }

  /**
   * Returns true if the resource type has a username associated.
   * @returns {boolean}
   */
  get hasResourceUsername() {
    return !this.isStandaloneTotpResource;
  }

  /**
   * Has at least one action of the more menu allowed.
   * @return {boolean}
   */
  hasMoreActionAllowed() {
    return this.canExport() || (this.canOverridePasswordExpiry && this.canUpdate());
  }

  /**
   * Exports the selected resources
   */
  async export() {
    const resourcesIds = this.selectedResources.map(resource => resource.id);
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds});
    await this.props.dialogContext.open(ExportResources);
  }

  /**
   * Can use Totp
   * @return {*}
   */
  get canUseTotp() {
    return this.props.context.siteSettings.canIUse('totpResourceTypes');
  }

  /**
   * Can use password expiry
   * @return {boolean}
   */
  get canOverridePasswordExpiry() {
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    const hasOneResourceSelected = this.hasOneResourceSelected();

    const canShare = this.canShare();
    const canUpdate = this.canUpdate();

    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);
    const canViewShare = this.props.rbacContext.canIUseUiAction(uiActions.SHARE_VIEW_LIST) && canShare;
    const canViewCopy = hasOneResourceSelected;
    const canViewEdit = hasOneResourceSelected && canUpdate;
    const canViewDelete = canUpdate;

    const count = this.props.resourceWorkspaceContext.selectedResources?.length;

    return (
      <div className="actions" ref={this.props.actionsButtonRef}>
        <div className="actions-wrapper">
          <ul>
            {canViewShare &&
              <li id="share_action">
                <button type="button" className="button-action-contextual" onClick={this.handleShareClickEvent}>
                  <ShareSVG/>
                  <span><Trans>Share</Trans></span>
                </button>
              </li>
            }
            {canViewCopy &&
              <li id="copy_action">
                <Dropdown>
                  <DropdownButton className="button-action-contextual">
                    <CopySVG/>
                    <span><Trans>Copy</Trans></span>
                    <CaretDownSVG/>
                  </DropdownButton>
                  <DropdownMenu className="menu-action-contextual">
                    {this.hasResourceUsername &&
                      <DropdownMenuItem>
                        <button id="username_action" type="button" className="no-border"
                          disabled={!this.canCopyUsername()}
                          onClick={this.handleCopyUsernameClickEvent}>
                          <OwnedByMeSVG/>
                          <span><Trans>Copy username</Trans></span>
                        </button>
                      </DropdownMenuItem>
                    }
                    {canCopySecret && this.canCopyPassword() &&
                      <DropdownMenuItem>
                        <button id="secret_action" type="button" className="no-border"
                          onClick={this.handleCopySecretClickEvent}>
                          <KeySVG/>
                          <span><Trans>Copy password</Trans></span>
                        </button>
                      </DropdownMenuItem>
                    }
                    {this.canUseTotp && this.canCopyTotp() &&
                      <DropdownMenuItem>
                        <button id="totp_action" type="button" className="no-border"
                          onClick={this.handleCopyTotpClickEvent}>
                          <TotpSVG/>
                          <span><Trans>Copy TOTP</Trans></span>
                        </button>
                      </DropdownMenuItem>
                    }
                    <DropdownMenuItem>
                      <button id="uri_action" type="button" className="no-border" disabled={!this.canCopyUri()}
                        onClick={this.handleCopyUriClickEvent}>
                        <GlobeSVG/>
                        <span><Trans>Copy URI</Trans></span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button id="permalink_action" type="button" className="no-border"
                        onClick={this.handleCopyPermalinkClickEvent}>
                        <LinkSVG/>
                        <span><Trans>Copy permalink</Trans></span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            }
            {canViewEdit &&
              <li id="edit_action">
                <button type="button" className="button-action-contextual" onClick={this.handleEditClickEvent}>
                  <EditSVG/>
                  <span><Trans>Edit</Trans></span>
                </button>
              </li>
            }
            {canViewDelete &&
              <li id="delete_action">
                <button type="button" className="button-action-contextual" onClick={this.handleDeleteClickEvent}>
                  <DeleteSVG/>
                  <span><Trans>Delete</Trans></span>
                </button>
              </li>
            }
            {this.hasMoreActionAllowed() &&
              <li>
                <Dropdown>
                  <DropdownButton className="more button-action-contextual button-action-icon">
                    <MoreHorizontalSVG/>
                  </DropdownButton>
                  <DropdownMenu className="menu-action-contextual">
                    {this.canExport() &&
                      <DropdownMenuItem>
                        <button id="export_action" type="button" className="no-border"
                          onClick={this.handleExportClickEvent}>
                          <DownloadFileSVG/>
                          <span><Trans>Export</Trans></span>
                        </button>
                      </DropdownMenuItem>
                    }
                    {this.canOverridePasswordExpiry && canUpdate &&
                      <>
                        <DropdownMenuItem>
                          <button id="set_expiry_date_action" type="button" className="no-border"
                            onClick={this.handleSetExpiryDateClickEvent}>
                            <CalendarCogSVG/>
                            <span><Trans>Set expiry date</Trans></span>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button id="mark_as_expired_action" type="button" className="no-border"
                            onClick={this.handleMarkAsExpiredClick}>
                            <AlarmClockSVG/>
                            <span><Trans>Mark as expired</Trans></span>
                          </button>
                        </DropdownMenuItem>
                      </>
                    }
                  </DropdownMenu>
                </Dropdown>
              </li>
            }
          </ul>
          <span className="counter"><Trans count={count}>{{count}} selected</Trans></span>
          <button type="button" className="button-transparent inline" onClick={this.handleClearSelectionClick}>
            <CloseSVG/>
            <span className="visuallyhidden"><Trans>Clear selection</Trans></span>
          </button>
        </div>
      </div>
    );
  }
}

DisplayResourcesWorkspaceMenu.propTypes = {
  actionsButtonRef: PropTypes.object, // The forwarded ref of the buttons container
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  passwordExpiryContext: PropTypes.object, // the password expiry context
  dialogContext: PropTypes.any, // the dialog context
  progressContext: PropTypes.any, // The progress context
  clipboardContext: PropTypes.object, // the clipboard service provider
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  t: PropTypes.func, // The translation function
};

export default withAppContext(withMetadataKeysSettingsLocalStorage(withClipboard(withRbac(withDialog(withProgress(withPasswordExpiry(withResourceWorkspace(withResourceTypesLocalStorage(withActionFeedback(withTranslation('common')(DisplayResourcesWorkspaceMenu)))))))))));
