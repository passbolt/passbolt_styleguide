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
import CreateResource from "../CreateResource/CreateResource";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
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
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import AddSVG from "../../../../img/svg/add.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import DropdownItem from "../../Common/Dropdown/DropdownMenuItem";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import FolderPlusSVG from "../../../../img/svg/folder_plus.svg";
import UploadFileSVG from "../../../../img/svg/upload_file.svg";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";

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
    this.handleMenuCreateFolderClickEvent = this.handleMenuCreateFolderClickEvent.bind(this);
    this.handleImportClickEvent = this.handleImportClickEvent.bind(this);
  }
  /**
   * Handle password click event
   */
  handleCreateMenuPasswordClickEvent() {
    this.openPasswordCreateDialog();
  }

  /**
   * Handle the import click event
   */
  handleImportClickEvent() {
    this.props.dialogContext.open(ImportResources);
  }

  /**
   * Open create password dialog
   */
  openPasswordCreateDialog() {
    let resourceType;
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    }
    this.props.dialogContext.open(CreateResource, {folderParentId: this.folderIdSelected, resourceType: resourceType});
  }

  /**
   * Handle folder click event
   */
  handleMenuCreateTotpClickEvent() {
    this.openStandaloneTotpCreateDialog();
  }

  /**
   * Open create password dialog
   */
  openStandaloneTotpCreateDialog() {
    let resourceType;
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_TOTP_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_TOTP_SLUG);
    }
    this.props.workflowContext.start(HandleTotpWorkflow, {mode: TotpWorkflowMode.CREATE_STANDALONE_TOTP, folderParentId: this.folderIdSelected, resourceType: resourceType});
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
   * Has metadata types settings
   * @returns {boolean}
   */
  hasMetadataTypesSettings() {
    return Boolean(this.props.metadataTypeSettings);
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canImport = this.props.context.siteSettings.canIUse("import")
      && this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_IMPORT);
    const canUseFolders = this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
    const canUseTotp = this.props.context.siteSettings.canIUse('totpResourceTypes');

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
                <DropdownItem separator={true}>
                  <button id="totp_action" type="button" className="no-border" onClick={this.handleMenuCreateTotpClickEvent}>
                    <TotpSVG/>
                    <span><Trans>TOTP</Trans></span>
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
  workflowContext: PropTypes.any, // The workflow context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withDialog(withWorkflow(withMetadataTypesSettingsLocalStorage(withResourceTypesLocalStorage(withResourceWorkspace(withTranslation("common")(DisplayResourcesWorkspaceMainMenu))))))));
