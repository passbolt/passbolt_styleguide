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
import AppContext from "../../../contexts/AppContext";
import Icon from "../../Common/Icons/Icon";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import PasswordCreateDialog from "../PasswordCreateDialog/PasswordCreateDialog";
import FolderCreateDialog from "../../Folder/FolderCreateDialog/FolderCreateDialog";

/**
 * This component allows the current user to create a new resource
 */
class PasswordWorkspaceMainMenu extends React.Component {
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
    this.handleMenuCreateFolderClickEvent = this.handleMenuCreateFolderClickEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent);
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent);
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent);
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent);
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent);
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
    const canUseFolders = this.context.siteSettings.canIUse('folders');
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
   * Open create password dialog
   */
  openPasswordCreateDialog() {
    const resourceCreateDialogProps = {
      folderParentId: this.folderIdSelected
    };
    this.context.setContext({resourceCreateDialogProps});
    this.props.dialogContext.open(PasswordCreateDialog);
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
    const folderCreateDialogProps = {
      folderParentId: this.folderIdSelected
    };
    this.context.setContext({folderCreateDialogProps});
    this.props.dialogContext.open(FolderCreateDialog);
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
    return (
      <div className="dropdown" ref={this.createMenuRef}>
        <a className={`button create primary ready ${this.canCreate() ? "" : "disabled"}`} onClick={this.handleCreateClickEvent}>
          <Icon name="plus-circle"/>
          <span>create</span>
        </a>
        <ul className={`dropdown-content menu ready ${this.state.createMenuOpen ? "visible" : ""}`}>
          <li id="password_action">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleCreateMenuPasswordClickEvent}>
                    <span>New password</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li id="folder_action">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleMenuCreateFolderClickEvent}>
                    <span>New folder</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

PasswordWorkspaceMainMenu.contextType = AppContext;

PasswordWorkspaceMainMenu.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
  resourceWorkspaceContext: PropTypes.any // the resource workspace context
};

export default withDialog(withResourceWorkspace(PasswordWorkspaceMainMenu));