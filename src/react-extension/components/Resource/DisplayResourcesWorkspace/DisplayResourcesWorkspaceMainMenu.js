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
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import ImportResources from "../ImportResources/ImportResources";
import {Trans, withTranslation} from "react-i18next";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_TOTP_SLUG, RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import MetadataTypesSettingsEntity, {RESOURCE_TYPE_VERSION_5} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import AddSVG from "../../../../img/svg/add.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import DropdownItem from "../../Common/Dropdown/DropdownMenuItem";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import FolderPlusSVG from "../../../../img/svg/folder_plus.svg";
import UploadFileSVG from "../../../../img/svg/upload_file.svg";
import CircleEllipsisSVG from "../../../../img/svg/circle_ellipsis.svg";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DisplayResourceCreationMenu from "../CreateResource/DisplayResourceCreationMenu";
import CreateResource from "../CreateResource/CreateResource";
import TablePropertiesSVG from "../../../../img/svg/table_properties.svg";
import {
  withMetadataKeysSettingsLocalStorage
} from "../../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import ActionAbortedMissingMetadataKeys
  from "../../Metadata/ActionAbortedMissingMetadataKeys/ActionAbortedMissingMetadataKeys";

/**
 * This component allows the current user to create a new resource
 */
class DisplayResourcesWorkspaceMainMenu extends React.Component {
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
    this.handleCreateMenuPasswordClickEvent = this.handleCreateMenuPasswordClickEvent.bind(this);
    this.handleMenuCreateTotpClickEvent = this.handleMenuCreateTotpClickEvent.bind(this);
    this.handleMenuCreateCustomFieldsClickEvent = this.handleMenuCreateCustomFieldsClickEvent.bind(this);
    this.handleMenuCreateFolderClickEvent = this.handleMenuCreateFolderClickEvent.bind(this);
    this.handleImportClickEvent = this.handleImportClickEvent.bind(this);
    this.handleMenuCreateOtherClickEvent = this.handleMenuCreateOtherClickEvent.bind(this);
  }
  /**
   * Handle password click event
   */
  handleCreateMenuPasswordClickEvent() {
    let resourceType;
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      const canCreateResource = this.canCreateResource();
      if (canCreateResource) {
        resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
      } else {
        this.displayActionAborted();
        return;
      }
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    }
    this.openCreateDialog(resourceType);
  }

  /**
   * Handle the import click event
   */
  handleImportClickEvent() {
    this.canImportResources() ? this.props.dialogContext.open(ImportResources) : this.displayActionAborted();
  }

  /**
   * Open create resource dialog
   * @param {ResourceTypeEntity} resourceType The resource type
   */
  openCreateDialog(resourceType) {
    this.props.dialogContext.open(CreateResource, {folderParentId: this.folderIdSelected, resourceType});
  }

  /**
   * Handle totp click event
   */
  handleMenuCreateTotpClickEvent() {
    let resourceType;
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      const canCreateResource = this.canCreateResource();
      if (canCreateResource) {
        resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_TOTP_SLUG);
      } else {
        this.displayActionAborted();
        return;
      }
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_TOTP_SLUG);
    }
    this.openCreateDialog(resourceType);
  }

  /**
   * Handle custom fields click event
   */
  handleMenuCreateCustomFieldsClickEvent() {
    const canCreateResource = this.canCreateResource();
    if (canCreateResource) {
      const resourceType  = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG);
      this.openCreateDialog(resourceType);
    } else {
      this.displayActionAborted();
    }
  }

  /**
   * Handle other click event
   */
  handleMenuCreateOtherClickEvent() {
    this.props.dialogContext.open(DisplayResourceCreationMenu, {folderParentId: this.folderIdSelected});
  }

  /**
   * Handle folder click event
   */
  handleMenuCreateFolderClickEvent() {
    this.openFolderCreateDialog();
  }

  /**
   * Open create password dialog
   */
  openFolderCreateDialog() {
    this.props.dialogContext.open(CreateResourceFolder, {folderParentId: this.folderIdSelected});
  }

  /**
   * Get the currently selected folder. Return null if none selected.
   * @returns {null|object}
   */
  get folderSelected() {
    const filter = this.props.resourceWorkspaceContext.filter;
    const isFilterByFolder = filter && filter.type === ResourceWorkspaceFilterTypes.FOLDER;
    if (isFilterByFolder) {
      return filter.payload.folder;
    }
    return null;
  }

  /**
   * the folder id selected
   * @returns {*}
   */
  get folderIdSelected() {
    return this.folderSelected && this.folderSelected.id;
  }

  /**
   * can create a resource
   * @returns {boolean}
   */
  canCreate() {
    return this.folderSelected === null || this.folderSelected.permission.type >= 7;
  }

  /**
   * Can create resource
   * @return {boolean}
   */
  canCreateResource() {
    const isMetadataSharedKeyEnforced = !this.props.metadataKeysSettings.allowUsageOfPersonalKeys;
    const isPersonalFolder = this.folderSelected === null || this.folderSelected.personal;
    const userHasMissingKeys = this.props.context.loggedInUser.missing_metadata_key_ids?.length > 0;

    if (isPersonalFolder && isMetadataSharedKeyEnforced && userHasMissingKeys) {
      return false;
    } else if (!isPersonalFolder && userHasMissingKeys) {
      return false;
    }

    return true;
  }

  /**
   * Can import resources
   * @return {boolean}
   */
  canImportResources() {
    const isMetadataSharedKeyEnforced = !this.props.metadataKeysSettings.allowUsageOfPersonalKeys;
    const userHasMissingKeys = this.props.context.loggedInUser.missing_metadata_key_ids?.length > 0;
    return !(isMetadataSharedKeyEnforced && userHasMissingKeys);
  }

  /**
   * Has metadata types settings
   * @returns {boolean}
   */
  hasMetadataTypesSettings() {
    return Boolean(this.props.metadataTypeSettings);
  }

  /**
   * Has metadata types settings v4 and v5
   * @returns {boolean}
   */
  hasMetadataTypesV4AndV5() {
    return this.props.metadataTypeSettings.allowCreationOfV5Resources
      && this.props.metadataTypeSettings.allowCreationOfV4Resources;
  }

  /**
   * Can create password
   * @returns {boolean}
   */
  canCreatePassword() {
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    } else {
      return false;
    }
  }

  /**
   * Can create standalone totp
   * @returns {boolean}
   */
  canCreateStandaloneTotp() {
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_V5_TOTP_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_TOTP_SLUG);
    } else {
      return false;
    }
  }

  /**
   * Can create custom fields
   * @returns {boolean}
   */
  get canCreateCustomFields() {
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG);
    } else {
      return false;
    }
  }

  /**
   * Should the "Other" menu items be displayed.
   * @returns {boolean}
   */
  canSeeOther() {
    // the v5 is not available anyway
    if (!this.props.metadataTypeSettings?.allowCreationOfV5Resources) {
      return false;
    }

    const canCreateBothV4AndV5 = this.hasMetadataTypesV4AndV5();

    //both version are active, other needs to be shown anyway
    if (canCreateBothV4AndV5) {
      return true;
    }

    const otherV5ContentTypes = this.props.resourceTypes?.items.filter(rt =>
      rt.version === RESOURCE_TYPE_VERSION_5
      && !rt.hasPassword()
      && !rt.hasTotp()
      && !rt.hasSecretDescription()
    );

    return otherV5ContentTypes?.length > 0;
  }

  /**
   * Display action aborted
   */
  displayActionAborted() {
    this.props.dialogContext.open(ActionAbortedMissingMetadataKeys);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canImport = this.props.context.siteSettings.canIUse("import")
      && this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_IMPORT);
    const canUseFolders = this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
    const canUseTotp = this.props.context.siteSettings.canIUse('totpResourceTypes');
    const canSeeOther = this.canSeeOther();

    return (
      <Dropdown>
        <DropdownButton className="create primary" disabled={!this.canCreate()}>
          <AddSVG/>
          <Trans>Create</Trans>
          <CaretDownSVG/>
        </DropdownButton>
        <DropdownMenu className="menu-create-primary">
          {!this.hasMetadataTypesSettings() &&
            <>
              <DropdownItem separator={!canUseTotp}>
                <Tooltip message={this.props.t("Loading metadata types settings")}>
                  <button id="password_action" type="button" className="no-border" disabled={true}>
                    <KeySVG/>
                    <span><Trans>Password</Trans></span>
                  </button>
                </Tooltip>
              </DropdownItem>
              {canUseTotp &&
                <DropdownItem separator={true}>
                  <Tooltip message={this.props.t("Loading metadata types settings")}>
                    <button id="totp_action" type="button" className="no-border" disabled={true}>
                      <TotpSVG/>
                      <span><Trans>TOTP</Trans></span>
                    </button>
                  </Tooltip>
                </DropdownItem>
              }
            </>
          }
          {this.hasMetadataTypesSettings() &&
            <>
              {this.canCreatePassword() &&
                <DropdownItem separator={!canUseTotp}>
                  <button id="password_action" type="button" className="no-border" onClick={this.handleCreateMenuPasswordClickEvent}>
                    <KeySVG/>
                    <span><Trans>Password</Trans></span>
                  </button>
                </DropdownItem>
              }
              {canUseTotp && this.canCreateStandaloneTotp() &&
                <DropdownItem separator={!this.canCreateCustomFields}>
                  <button id="totp_action" type="button" className="no-border" onClick={this.handleMenuCreateTotpClickEvent}>
                    <TotpSVG/>
                    <span><Trans>TOTP</Trans></span>
                  </button>
                </DropdownItem>
              }
              {this.canCreateCustomFields &&
                <DropdownItem separator={!canSeeOther}>
                  <button id="custom_fields_action" type="button" className="no-border" onClick={this.handleMenuCreateCustomFieldsClickEvent}>
                    <TablePropertiesSVG/>
                    <span><Trans>Custom fields</Trans></span>
                  </button>
                </DropdownItem>
              }
              {canSeeOther &&
                <DropdownItem separator={true}>
                  <button id="other_action" type="button" className="no-border" onClick={this.handleMenuCreateOtherClickEvent}>
                    <CircleEllipsisSVG/>
                    <span><Trans>Other</Trans></span>
                  </button>
                </DropdownItem>
              }
            </>
          }
          {canUseFolders &&
            <DropdownItem separator={canImport}>
              <button id="folder_action" type="button" className="no-border" onClick={this.handleMenuCreateFolderClickEvent}>
                <FolderPlusSVG/>
                <span><Trans>Folder</Trans></span>
              </button>
            </DropdownItem>
          }
          {canImport &&
            <DropdownItem>
              <button id="import_action" type="button" className="no-border" onClick={this.handleImportClickEvent}>
                <UploadFileSVG/>
                <span><Trans>Import resources</Trans></span>
              </button>
            </DropdownItem>
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DisplayResourcesWorkspaceMainMenu.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  dialogContext: PropTypes.any, // the dialog context
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withDialog(withMetadataTypesSettingsLocalStorage(withMetadataKeysSettingsLocalStorage(withResourceTypesLocalStorage(withResourceWorkspace(withTranslation("common")(DisplayResourcesWorkspaceMainMenu))))))));
