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
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import Icon from "../../Common/Icons/Icon";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import PasswordDeleteDialog from "../PasswordDeleteDialog/PasswordDeleteDialog";
import PasswordEditDialog from "../PasswordEditDialog/PasswordEditDialog";
import ShareDialog from "../../Share/ShareDialog";

/**
 * This component allows the current user to add a new comment on a resource
 */
class PasswordWorkspaceMenu extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createRefs();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      moreMenuOpen: false, // more menu open or not
    };
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.moreMenuRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleCopyPermalinkClickEvent = this.handleCopyPermalinkClickEvent.bind(this);
    this.handleCopyUsernameClickEvent = this.handleCopyUsernameClickEvent.bind(this);
    this.handleShareClickEvent = this.handleShareClickEvent.bind(this);
    this.handleCopySecretClickEvent = this.handleCopySecretClickEvent.bind(this);
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
    if (this.moreMenuRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseMoreMenu();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right click on an element of the menu
    if (this.moreMenuRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseMoreMenu();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.handleCloseMoreMenu();
  }

  /**
   * open or close the more menu
   */
  handleMoreClickEvent() {
    const moreMenuOpen = !this.state.moreMenuOpen;
    this.setState({moreMenuOpen});
  }

  /**
   * handle delete one or more resources
   */
  handleDeleteClickEvent() {
    const passwordDeleteDialogProps = {
      resources: this.selectedResources
    };
    this.context.setContext({passwordDeleteDialogProps});
    this.props.dialogContext.open(PasswordDeleteDialog);
    this.handleCloseMoreMenu();
  }

  /**
   * handle edit one resource
   */
  handleEditClickEvent() {
    const passwordEditDialogProps = {
      id: this.detailResource.id
    };
    this.context.setContext({passwordEditDialogProps});
    this.props.dialogContext.open(PasswordEditDialog);
  }

  /**
   * handle share resources
   */
  handleShareClickEvent() {
    const resourceIds = this.selectedResources.map(resource => resource.id);
    this.context.setContext({shareDialogProps: {resourceIds}});
    this.props.dialogContext.open(ShareDialog);
  }

  /**
   * handle copy permalink of one resource
   */
  handleCopyPermalinkClickEvent() {
    const name = "permalink";
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const data = `${baseUrl}/app/passwords/view/${this.detailResource.id}`;
    this.context.port.emit('passbolt.clipboard', {name, data});
    this.handleCloseMoreMenu();
    this.displaySuccessNotification("The permalink has been copied to clipboard");
  }

  /**
   * handle copy username of one resource
   */
  handleCopyUsernameClickEvent() {
    const name = "username";
    const data = this.detailResource.username;
    this.context.port.emit('passbolt.clipboard', {name, data});
    this.handleCloseMoreMenu();
    this.displaySuccessNotification("The username has been copied to clipboard");
  }

  /**
   * handle copy secrete of one resource
   */
  async handleCopySecretClickEvent() {
    const name = "secret";
    const data = await this.context.port.request("passbolt.secret.decrypt", this.detailResource.id);
    this.context.port.emit('passbolt.clipboard', {name, data});
    this.handleCloseMoreMenu();
    this.displaySuccessNotification("The secret has been copied to clipboard");
  }

  /**
   * display a success notification message
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Close the more menu
   */
  handleCloseMoreMenu() {
    this.setState({moreMenuOpen: false});
  }

  /**
   * selected resources
   * @returns {[]|null}
   */
  get selectedResources() {
    return this.props.resourceWorkspaceContext.selectedResources;
  }

  /**
   * the detail resource if only one is selected
   * @returns {*}
   */
  get detailResource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * has at least one resource selected
   * @returns {boolean}
   */
  hasResourceSelected() {
    return this.selectedResources.length > 0;
  }

  /**
   * has at least one resource selected
   * @returns {boolean}
   */
  hasOneResourceSelected() {
    return this.detailResource !== null;
  }

  /**
   * is owner of all selected resources
   */
  isOwnerOfSelectedResources() {
    return this.hasResourceSelected() && this.selectedResources.every(resource => resource.permission.type >= 7);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="actions">
        <ul className="ready">
          <li id="password_action">
            <a className={`button ready ${this.hasOneResourceSelected() ? "" : "disabled"}`}
              onClick={this.handleCopySecretClickEvent}>
              <Icon name="copy-to-clipboard"/>
              <span>copy</span>
            </a>
          </li>
          <li id="edit_action">
            <a
              className={`button ready ${this.hasOneResourceSelected() && this.isOwnerOfSelectedResources() ? "" : "disabled"}`}
              onClick={this.handleEditClickEvent}>
              <Icon name="edit"></Icon>
              <span>edit</span>
            </a>
          </li>
          <li id="share_action">
            <a className={`button ready ${this.hasResourceSelected() && this.isOwnerOfSelectedResources() ? "" : "disabled"}`}
              onClick={this.handleShareClickEvent}>
              <Icon name="share"/>
              <span>share</span>
            </a>
          </li>
          <li>
            <div className="dropdown" ref={this.moreMenuRef}>
              <a className={`button ready ${this.hasResourceSelected() ? "" : "disabled"}`} onClick={this.handleMoreClickEvent}>
                <span>more</span>
                <Icon name="caret-down"/>
              </a>
              <ul className={`dropdown-content menu ready ${this.state.moreMenuOpen ? "visible" : ""}`}>
                <li id="username_action" className="">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a className={`${this.hasOneResourceSelected() ? "" : "disabled"}`}
                          onClick={this.handleCopyUsernameClickEvent}>
                          <span>copy username to clipboard</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li id="secret_action">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a className={`${this.hasOneResourceSelected() ? "" : "disabled"}`}
                          onClick={this.handleCopySecretClickEvent}>
                          <span>copy password to clipboard</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li id="delete_action">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a className={`${this.isOwnerOfSelectedResources() ? "" : "disabled"}`}
                          onClick={this.handleDeleteClickEvent}>
                          <span>delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li id="permalink_action">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a className={`${this.hasOneResourceSelected() ? "" : "disabled"}`}
                          onClick={this.handleCopyPermalinkClickEvent}>
                          <span>copy permalink to clipboard</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

PasswordWorkspaceMenu.contextType = AppContext;

PasswordWorkspaceMenu.propTypes = {
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
  dialogContext: PropTypes.any // the dialog context
};

export default withDialog(withResourceWorkspace(withActionFeedback(PasswordWorkspaceMenu)));
