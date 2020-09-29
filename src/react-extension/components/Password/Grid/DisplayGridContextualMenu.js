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
import {withDialog} from "../../../contexts/Common/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import PasswordEditDialog from "../PasswordEditDialog/PasswordEditDialog";
import ShareDialog from "../../Share/ShareDialog";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

class DisplayGridContextualMenu extends React.Component {
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
    this.handlePermalinkClickEvent = this.handlePermalinkClickEvent.bind(this);
    this.handlePasswordClickEvent = this.handlePasswordClickEvent.bind(this);
  }

  /**
   * handle edit resource
   */
  handleEditClickEvent() {
    const passwordEditDialogProps = {
      id: this.resource.id
    };
    this.context.setContext({passwordEditDialogProps});
    this.props.dialogContext.open(PasswordEditDialog);
    this.props.hide();
  }

  /**
   * handle share resource
   */
  handleShareClickEvent() {
    const resourceIds = [this.resource.id];
    this.context.setContext({shareDialogProps: {resourceIds}});
    this.props.dialogContext.open(ShareDialog);
    this.props.hide();
  }

  /**
   * handle username resource
   */
  handleUsernameClickEvent() {
    const name = "username";
    const data = this.resource.username;
    this.context.port.emit('passbolt.clipboard', {name, data});
    this.props.hide();
    this.displaySuccessNotification("The username has been copied to clipboard");
  }

  /**
   * handle permalink resource
   */
  handlePermalinkClickEvent() {
    const name = "permalink";
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const data = `${baseUrl}/app/passwords/view/${this.resource.id}`;
    this.context.port.emit('passbolt.clipboard', {name, data});
    this.props.hide();
    this.displaySuccessNotification("The permalink has been copied to clipboard");
  }

  /**
   * handle username resource
   */
  async handlePasswordClickEvent() {
    const name = "secret";
    const data = await this.context.port.request("passbolt.secret.decrypt", this.resource.id);
    this.context.port.emit('passbolt.clipboard', {name, data});
    this.props.hide();
    this.displaySuccessNotification("The secret has been copied to clipboard");
  }

  /**
   * the resource selected
   * @returns {*}
   */
  get resource() {
    return this.props.resource;
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
   * Display success notification (toaster)
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li key="option-username-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="username" onClick={this.handleUsernameClickEvent}><span>Copy username</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-password-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="password" onClick={this.handlePasswordClickEvent}><span>Copy password</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-permalink-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="permalink" onClick={this.handlePermalinkClickEvent}><span>Copy permalink</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-edit-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="edit" className={`${this.canUpdate() ? "" : "disabled"}`}
                  onClick={this.handleEditClickEvent}><span>Edit</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-share-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="share" className={`${this.canShare() ? "" : "disabled"}`}
                  onClick={this.handleShareClickEvent}><span>Share</span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

DisplayGridContextualMenu.contextType = AppContext;

DisplayGridContextualMenu.propTypes = {
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  dialogContext: PropTypes.any, // the dialog context
  resource: PropTypes.object, // resource selected
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withDialog(withActionFeedback(DisplayGridContextualMenu));
