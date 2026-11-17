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
 * @since         5.19.0
 */

import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";

class UnsavedPasswordsPage extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      isLoading: true, // True while the password drafts are retrieved
      passwordDrafts: [],
    };
  }

  /**
   * ComponentDidMount hook.
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.loadPasswordDrafts();
  }

  /**
   * Initializes event handlers
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleSelectPasswordDraftClick = this.handleSelectPasswordDraftClick.bind(this);
  }

  /**
   * Loads the generated passwords waiting to be saved, into the state.
   * @returns {Promise<void>}
   */
  async loadPasswordDrafts() {
    let passwordDrafts = [];
    try {
      passwordDrafts = (await this.props.context.port.request("passbolt.quickaccess.get-password-drafts")) || [];
    } catch (error) {
      console.error(error);
    }
    this.setState({ passwordDrafts, isLoading: false });
  }

  /**
   * Handles the click event on the "Go back" button.
   * @param {Event} ev
   */
  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.history.goBack();
  }

  /**
   * Handles the click event on a password draft from the list.
   * @param {Event} ev
   * @param {string} passwordDraftId
   */
  handleSelectPasswordDraftClick(ev, passwordDraftId) {
    ev.preventDefault();
    this.props.history.push("/webAccessibleResources/quickaccess/resources/autosave", { passwordDraftId });
  }

  /**
   * Component renderer.
   * @returns {JSX}
   */
  render() {
    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.props.t("Go back")}>
            <CaretLeftSVG />
            <span className="primary-action-title">
              <Trans>Unsaved passwords</Trans>
            </span>
          </a>
        </div>
        <div className="list-container">
          <ul className="list-items">
            {this.state.isLoading && (
              <li className="empty-entry">
                <SpinnerSVG />
                <p className="processing-text">
                  <Trans>Retrieving your passwords</Trans>
                </p>
              </li>
            )}
            {!this.state.isLoading && this.state.passwordDrafts.length === 0 && (
              <li className="empty-entry">
                <p>
                  <Trans>No unsaved passwords.</Trans>
                </p>
              </li>
            )}
            {this.state.passwordDrafts.map((passwordDraft) => (
              <li className="browse-resource-entry" key={passwordDraft.id}>
                <a href="#" onClick={(ev) => this.handleSelectPasswordDraftClick(ev, passwordDraft.id)}>
                  <div className="inline-resource-entry">
                    <div className="inline-resource-name">
                      <span className="title">{passwordDraft.name}</span>
                      <span className="username">{passwordDraft.username ? ` (${passwordDraft.username})` : ""}</span>
                    </div>
                    <div className="uris">
                      <span className="url">{passwordDraft.uri}</span>
                    </div>
                  </div>
                  <CaretRightSVG />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

UnsavedPasswordsPage.propTypes = {
  context: PropTypes.any, // The application context
  // Match, location and history props are injected by the withRouter decoration call.
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation("common")(UnsavedPasswordsPage)));
