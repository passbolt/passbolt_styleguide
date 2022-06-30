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
import {withAppContext} from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withDialog} from "../../../contexts/DialogContext";
import DeleteResource from "../DeleteResource/DeleteResource";
import EditResource from "../EditResource/EditResource";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import {Trans, withTranslation} from "react-i18next";

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
    this.handleViewDetailClickEvent = this.handleViewDetailClickEvent.bind(this);
    this.handleExportClickEvent = this.handleExportClickEvent.bind(this);
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
    this.props.context.setContext({passwordDeleteDialogProps});
    this.props.dialogContext.open(DeleteResource);
    this.handleCloseMoreMenu();
  }

  /**
   * handle edit one resource
   */
  handleEditClickEvent() {
    const passwordEditDialogProps = {
      id: this.selectedResources[0].id
    };
    this.props.context.setContext({passwordEditDialogProps});
    this.props.dialogContext.open(EditResource);
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
    this.handleCloseMoreMenu();
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.selectedResources[0].id}`;
    await this.props.context.port.request("passbolt.clipboard.copy", permalink);
    this.displaySuccessNotification(this.translate("The permalink has been copied to clipboard"));
  }

  /**
   * handle copy username of one resource
   */
  async handleCopyUsernameClickEvent() {
    this.handleCloseMoreMenu();
    await this.props.context.port.request("passbolt.clipboard.copy", this.selectedResources[0].username);
    this.displaySuccessNotification(this.translate("The username has been copied to clipboard"));
  }

  /**
   * Copy password from dto to clipboard
   * Support original password (a simple string) and composed objects)
   *
   * @param {string|object} plaintextDto
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard(plaintextDto) {
    if (!plaintextDto) {
      throw new TypeError(this.translate("The password is empty."));
    }
    if (typeof plaintextDto === 'string') {
      await this.props.context.port.request("passbolt.clipboard.copy", plaintextDto);
    } else {
      if (Object.prototype.hasOwnProperty.call(plaintextDto, 'password')) {
        await this.props.context.port.request("passbolt.clipboard.copy", plaintextDto.password);
      } else {
        throw new TypeError(this.translate("The password field is not defined."));
      }
    }
  }

  /**
   * handle copy to clipboard the secret of the selected resource
   */
  async handleCopySecretClickEvent() {
    this.handleCloseMoreMenu();

    try {
      const plaintextDto = await this.props.context.port.request("passbolt.secret.decrypt", this.selectedResources[0].id, {showProgress: true});
      await this.copyPasswordToClipboard(plaintextDto);
      this.props.resourceWorkspaceContext.onResourceCopied();
      this.props.actionFeedbackContext.displaySuccess(this.translate("The secret has been copied to clipboard"));
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
  }

  /**
   * Whenever the user intends to export the selected resources
   */
  handleExportClickEvent() {
    this.export();
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
    return this.selectedResources.length === 1;
  }

  /**
   * has multiple resources selected
   * @returns {boolean}
   */
  hasMultipleResourcesSelected() {
    return this.selectedResources.length > 1;
  }

  /**
   * Can update the selected resources
   * @return {boolean}
   */
  canUpdate() {
    return this.hasResourceSelected() && this.selectedResources.every(resource => resource.permission.type >= 7);
  }

  /**
   * Can share the selected resources
   * @return {boolean}
   */
  canShare() {
    return this.hasResourceSelected() && this.selectedResources.every(resource => resource.permission.type === 15);
  }

  /**
   * Returns true if the user can export
   */
  canExport() {
    return this.hasResourceSelected() && this.props.context.siteSettings.canIUse("export");
  }

  /**
   * Can copy username
   * @returns {boolean}
   */
  canCopyUsername() {
    return this.hasOneResourceSelected() && this.selectedResources[0].username;
  }

  /**
   * Has at least one action of the more menu allowed.
   * @return {boolean}
   */
  hasMoreActionAllowed() {
    // If only one resource is selected then the all the copy operation are enabled.
    if (this.hasOneResourceSelected()) {
      return true;
    } else if (this.hasMultipleResourcesSelected) {
      // If multiple resources are selected, the only more action available is the delete operation.
      return this.canUpdate();
    }

    return false;
  }

  /**
   * handle view detail click event
   */
  handleViewDetailClickEvent() {
    // lock or unlock the detail resource or folder
    this.props.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasLockDetail() {
    return this.props.resourceWorkspaceContext.lockDisplayDetail;
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
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <ul>
            <li id="password_action">
              <a className={`button ${this.hasOneResourceSelected() ? "" : "disabled"}`}
                onClick={this.handleCopySecretClickEvent}>
                <Icon name="copy-to-clipboard"/>
                <span><Trans>Copy</Trans></span>
              </a>
            </li>
            <li id="edit_action">
              <a className={`button ${this.hasOneResourceSelected() && this.canUpdate() ? "" : "disabled"}`}
                onClick={this.handleEditClickEvent}>
                <Icon name="edit"/>
                <span><Trans>Edit</Trans></span>
              </a>
            </li>
            <li id="share_action">
              <a className={`button ${this.hasResourceSelected() && this.canShare() ? "" : "disabled"}`}
                onClick={this.handleShareClickEvent}>
                <Icon name="share"/>
                <span><Trans>Share</Trans></span>
              </a>
            </li>
            <li id="export_action">
              <a
                className={`button ${this.hasResourceSelected() && this.canExport() ? "" : "disabled"}`}
                onClick={this.handleExportClickEvent}>
                <Icon name="download"/>
                <span><Trans>Export</Trans></span>
              </a>
            </li>
            <li>
              <div className="dropdown" ref={this.moreMenuRef}>
                <a className={`button more ${this.state.moreMenuOpen ? "open" : ""} ${this.hasMoreActionAllowed() ? "" : "disabled"}`}
                  onClick={this.handleMoreClickEvent}>
                  <span><Trans>More</Trans></span>
                  <Icon name="caret-down"/>
                </a>
                <ul className={`dropdown-content menu right ${this.state.moreMenuOpen ? "visible" : ""}`}>
                  <li id="username_action">
                    <div className="row">
                      <div className="main-cell-wrapper">
                        <div className="main-cell">
                          <a
                            className={`${this.canCopyUsername() ? "" : "disabled"}`}
                            onClick={this.handleCopyUsernameClickEvent}>
                            <span><Trans>Copy username to clipboard</Trans></span>
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
                            <span><Trans>Copy password to clipboard</Trans></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li id="delete_action">
                    <div className="row">
                      <div className="main-cell-wrapper">
                        <div className="main-cell">
                          <a className={`${this.canUpdate() ? "" : "disabled"}`}
                            onClick={this.handleDeleteClickEvent}>
                            <span><Trans>Delete</Trans></span>
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
                            <span><Trans>Copy permalink to clipboard</Trans></span>
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
        <div className="actions secondary">
          <ul>
            <li>
              <a className={`button button-toggle info ${this.hasLockDetail() ? "selected" : ""}`}
                onClick={this.handleViewDetailClickEvent}>
                <Icon name="info-circle" big={true}/>
                <span className="visuallyhidden"><Trans>View detail</Trans></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayResourcesWorkspaceMenu.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
  dialogContext: PropTypes.any, // the dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withResourceWorkspace(withActionFeedback(withTranslation('common')(DisplayResourcesWorkspaceMenu)))));
