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
 * @since         5.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import CloseSVG from "../../../img/svg/close.svg";
import { withRouter } from "react-router-dom";

class ActionAbortedMissingMetadataKeysPage extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Close the dialog.
   */
  close() {
    delete this.props.context.searchHistory[this.props.location.pathname];
    this.props.history.goBack();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.close();
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    this.close();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Handle key down event
   * @param {ReactEvent} event The triggered event
   */
  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // If not stop it will bubble to the QuickAccess component and it will close the quickaccess dialog.
      event.stopPropagation();
      this.close();
    }
  }

  render() {
    return (
      <div className="action-aborted-missing-metadata-keys" onKeyDown={this.handleKeyDown}>
        <div className="back-link">
          <a className="primary-action">
            <span className="primary-action-title">
              <Trans>Action aborted</Trans>
            </span>
          </a>
          <a
            onClick={this.handleCloseClick}
            className="secondary-action button-transparent button"
            title={this.translate("Cancel the operation")}
          >
            <CloseSVG className="close" />
            <span className="visually-hidden">
              <Trans>Cancel</Trans>
            </span>
          </a>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-container">
            <p>
              <Trans>You cannot perform this action because you lack access to the shared metadata key.</Trans>
              <br />
              <br />
              <Trans>Please ask your administrator to share it with you.</Trans>
            </p>
          </div>
          <div className="submit-wrapper">
            <button type="submit" className="button primary full-width">
              <span>
                <Trans>Ok</Trans>
              </span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ActionAbortedMissingMetadataKeysPage.propTypes = {
  context: PropTypes.object, // The application context
  // Match, location and history props are injected by the withRouter decoration call.
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation("common")(ActionAbortedMissingMetadataKeysPage)));
