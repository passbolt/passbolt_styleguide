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
import Icon from "../../../../shared/components/Icons/Icon";
import {withDialog} from "../../../contexts/DialogContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import ImportResources from "../ImportResources/ImportResources";
import {Trans, withTranslation} from "react-i18next";
import CreateResource from "../CreateResource/CreateResource";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import CreateStandaloneTotp from "../CreateStandaloneTotp/CreateStandaloneTotp";

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
    document.addEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
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
      this.setState({createMenuOpen});
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
    this.props.dialogContext.open(CreateResource, {folderParentId: this.folderIdSelected});
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
    this.props.dialogContext.open(CreateStandaloneTotp, {folderParentId: this.folderIdSelected});
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
    this.props.dialogContext.open(CreateResourceFolder, {folderParentId: this.folderIdSelected});
  }

  /**
   * Close the create menu
   */
  handleCloseCreateMenu() {
    this.setState({createMenuOpen: false});
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
      <>
        <div className="dropdown" ref={this.createMenuRef}>
          <button type="button" className={`create primary ${this.state.createMenuOpen ? "open" : ""}`} disabled={!this.canCreate()} onClick={this.handleCreateClickEvent}>
            <Icon name="add"/>
            <span><Trans>Create</Trans></span>
          </button>
          <ul className={`dropdown-content menu right ${this.state.createMenuOpen ? "visible" : ""}`}>
            <li id="password_action">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button type="button" className="link no-border" onClick={this.handleCreateMenuPasswordClickEvent}>
                      <span><Trans>New password</Trans></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            {canUseTotp &&
              <li id="totp_action">
                <div className="row">
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <button type="button" className="link no-border" onClick={this.handleMenuCreateTotpClickEvent}>
                        <span><Trans>New Totp</Trans></span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            }
            {canUseFolders &&
              <li id="folder_action">
                <div className="row">
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <button type="button" className="link no-border" onClick={this.handleMenuCreateFolderClickEvent}>
                        <span><Trans>New folder</Trans></span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            }
          </ul>
        </div>
        {canImport &&
          <button
            type="button"
            className="import button-action-icon" onClick={this.handleImportClickEvent}>
            <Icon name="upload" />
            <span className="visuallyhidden"><Trans>upload</Trans></span>
          </button>
        }
      </>
    );
  }
}

DisplayResourcesWorkspaceMainMenu.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  dialogContext: PropTypes.any, // the dialog context
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
};

export default withAppContext(withRbac(withDialog(withResourceWorkspace(withTranslation("common")(DisplayResourcesWorkspaceMainMenu)))));
