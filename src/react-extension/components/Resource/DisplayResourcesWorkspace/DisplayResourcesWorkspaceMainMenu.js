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
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../contexts/DialogContext";
import { ResourceWorkspaceFilterTypes, withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import ImportResources from "../ImportResources/ImportResources";
import { withTranslation } from "react-i18next";
import CreateResource from "../CreateResource/CreateResource";
import { withRbac } from "../../../../shared/context/Rbac/RbacContext";
import { withWorkflow } from "../../../contexts/WorkflowContext";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import { TotpWorkflowMode } from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";

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
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      createMenuOpen: false, // create menu open or not
    };
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.createMenuRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleCreateClickEvent = this.handleCreateClickEvent.bind(this);
    this.handleCreateMenuPasswordClickEvent = this.handleCreateMenuPasswordClickEvent.bind(this);
    this.handleMenuCreateTotpClickEvent = this.handleMenuCreateTotpClickEvent.bind(this);
    this.handleMenuCreateFolderClickEvent = this.handleMenuCreateFolderClickEvent.bind(this);
    this.handleImportClickEvent = this.handleImportClickEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent, { capture: true });
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, { capture: true });
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent, { capture: true });
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent, { capture: true });
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent, { capture: true });
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.createMenuRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseCreateMenu();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right click on an element of the menu
    if (this.createMenuRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseCreateMenu();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.handleCloseCreateMenu();
  }

  /**
   * Handle create click event
   */
  handleCreateClickEvent() {
    const canUseFolders = this.props.context.siteSettings.canIUse('folders');
    if (canUseFolders) {
      const createMenuOpen = !this.state.createMenuOpen;
      this.setState({ createMenuOpen });
    } else {
      this.openPasswordCreateDialog();
    }
  }

  /**
   * Handle password click event
   */
  handleCreateMenuPasswordClickEvent() {
    this.openPasswordCreateDialog();
    this.handleCloseCreateMenu();
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
    this.props.dialogContext.open(CreateResource, { folderParentId: this.folderIdSelected, resourceType: resourceType });
  }

  /**
   * Handle folder click event
   */
  handleMenuCreateTotpClickEvent() {
    this.openStandaloneTotpCreateDialog();
    this.handleCloseCreateMenu();
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
    this.props.workflowContext.start(HandleTotpWorkflow, { mode: TotpWorkflowMode.CREATE_STANDALONE_TOTP, folderParentId: this.folderIdSelected, resourceType: resourceType });
  }

  /**
   * Handle folder click event
   */
  handleMenuCreateFolderClickEvent() {
    this.openFolderCreateDialog();
    this.handleCloseCreateMenu();
  }

  /**
   * Open create password dialog
   */
  openFolderCreateDialog() {
    this.props.dialogContext.open(CreateResourceFolder, { folderParentId: this.folderIdSelected });
  }

  /**
   * Close the create menu
   */
  handleCloseCreateMenu() {
    this.setState({ createMenuOpen: false });
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
    return (
      <>
        {/** 表示禁止のため削除 */}
      </>
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
