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
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
class DisplayUsersContextualMenu extends React.Component {
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
    this.handlePermalinkCopy = this.handlePermalinkCopy.bind(this);
    this.handleUsernameCopy = this.handleUsernameCopy.bind(this);
    this.handlePublicKeyCopy = this.handlePublicKeyCopy.bind(this);
  }

  /**
   * Handle the copy of user permalink
   */
  async handlePermalinkCopy() {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.user.id}`;
    await this.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess("The permalink has been copied to clipboard");
    this.props.hide();
  }

  /**
   * Handle the copy of the username
   */
  async handleUsernameCopy() {
    const username = `${this.user.username}`;
    await this.context.port.request("passbolt.clipboard.copy", username);
    this.props.actionFeedbackContext.displaySuccess("The email has been copied to clipboard");
    this.props.hide();
  }

  /**
   * Handle the copy of public key
   */
  async handlePublicKeyCopy() {
    this.props.hide();
    const gpgkeyInfo = await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    await this.context.port.request("passbolt.clipboard.copy", gpgkeyInfo.key);
    this.props.actionFeedbackContext.displaySuccess("The public key has been copied to clipboard");
  }

  /**
   * the resource selected
   * @returns {*}
   */
  get user() {
    return this.props.user;
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
        <li
          key="copy-user-permalink"
          className="opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handlePermalinkCopy}>
                  <span>Copy permalink</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li
          key="copy-public-key"
          className="opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handlePublicKeyCopy}>
                  <span>Copy public key</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li
          key="copy-username"
          className="separator-after opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handleUsernameCopy}>
                  <span>Copy email address</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

DisplayUsersContextualMenu.contextType = AppContext;

DisplayUsersContextualMenu.propTypes = {
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  dialogContext: PropTypes.any, // the dialog context
  user: PropTypes.object, // user selected
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withDialog(withActionFeedback(DisplayUsersContextualMenu));

