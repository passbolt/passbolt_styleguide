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
import {withAppContext} from "../../../contexts/AppContext";
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
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleGoToResourceUriClick = this.handleGoToResourceUriClick.bind(this);
  }

  /**
   * handle edit resource
   */
  handleEditClickEvent() {
    const passwordEditDialogProps = {
      id: this.resource.id
    };
    this.props.context.setContext({passwordEditDialogProps});
    this.props.dialogContext.open(EditResource);
    this.props.hide();
  }

  /**
   * handle share resource
   */
  handleShareClickEvent() {
    const resourcesIds = [this.resource.id];
    this.props.context.setContext({shareDialogProps: {resourcesIds}});
    this.props.dialogContext.open(ShareDialog);
    this.props.hide();
  }

  /**
   * handle username resource
   */
  async handleUsernameClickEvent() {
    await this.props.context.port.request("passbolt.clipboard.copy", this.resource.username);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The username has been copied to clipboard"));
    this.props.hide();
  }

  /**
   * handle uri resource
   */
  async handleUriClickEvent() {
    await this.props.context.port.request("passbolt.clipboard.copy", this.resource.uri);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The uri has been copied to clipboard"));
    this.props.hide();
  }

  /**
   * handle permalink resource
   */
  async handlePermalinkClickEvent() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.resource.id}`;
    await this.props.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
    this.props.hide();
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
      this.props.resourceWorkspaceContext.onResourceCopied();
    } else {
      if (Object.prototype.hasOwnProperty.call(plaintextDto, 'password')) {
        await this.props.context.port.request("passbolt.clipboard.copy", plaintextDto.password);
        this.props.resourceWorkspaceContext.onResourceCopied();
      } else {
        throw new TypeError(this.translate("The password field is not defined."));
      }
    }
  }

  /**
   * handle password resource
   */
  async handlePasswordClickEvent() {
    this.props.hide();

    try {
      const plaintextDto = await this.props.context.port.request("passbolt.secret.decrypt", this.resource.id, {showProgress: true});
      await this.copyPasswordToClipboard(plaintextDto);
      this.props.actionFeedbackContext.displaySuccess(this.translate("The secret has been copied to clipboard"));
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
  }

  /**
   * handle delete resource
   */
  handleDeleteClickEvent() {
    const resources = [this.resource];
    this.props.context.setContext({passwordDeleteDialogProps: {resources}});
    this.props.dialogContext.open(DeleteResource);
    this.props.hide();
  }

  /**
   * handle open the uri in a new tab
   */
  handleGoToResourceUriClick() {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.resource);
  }

  /**
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
      this.resource.uri, {
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
    return this.resource.username !== "";
  }

  /**
   * Can copy uri
   * @returns {boolean}
   */
  canCopyUri() {
    return this.resource.uri !== "";
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
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li key="option-username-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="username" className={`${this.canCopyUsername() ? "" : "disabled"}`}
                  onClick={this.handleUsernameClickEvent}><span><Trans>Copy username</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-copy-password-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="password" onClick={this.handlePasswordClickEvent}><span><Trans>Copy password</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-copy-uri-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="username" className={`${this.canCopyUri() ? "" : "disabled"}`}
                  onClick={this.handleUriClickEvent}><span><Trans>Copy URI</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-permalink-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="permalink" onClick={this.handlePermalinkClickEvent}><span><Trans>Copy permalink</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-open-uri-resource" className="ready separator-after">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="permalink"
                  className={`${this.safeUri ? "" : "disabled"}`}
                  onClick={this.handleGoToResourceUriClick}><span><Trans>Open URI in a new Tab</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-edit-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="edit" className={`${this.canUpdate() ? "" : "disabled"}`}
                  onClick={this.handleEditClickEvent}><span><Trans>Edit</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-share-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a
                  id="share" className={`${this.canShare() ? "" : "disabled"}`}
                  onClick={this.handleShareClickEvent}><span><Trans>Share</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-delete-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a
                  id="delete" className={`${this.canUpdate() ? "" : "disabled"}`}
                  onClick={this.handleDeleteClickEvent}><span><Trans>Delete</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

DisplayResourcesListContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  resourceWorkspaceContext: PropTypes.any, // Resource workspace context
  dialogContext: PropTypes.any, // the dialog context
  resource: PropTypes.object, // resource selected
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withDialog(withActionFeedback(withTranslation('common')(DisplayResourcesListContextualMenu)))));
