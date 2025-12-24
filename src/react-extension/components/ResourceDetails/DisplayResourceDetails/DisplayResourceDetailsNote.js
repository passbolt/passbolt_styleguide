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
 * @since         5.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import RevertSVG from "../../../../img/svg/revert.svg";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { Trans, withTranslation } from "react-i18next";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withResourceTypesLocalStorage } from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";

/**
 * This component display the note section of a resource
 */
class DisplayResourceDetailsNote extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {object}
   */
  get defaultState() {
    return {
      open: true,
      error: false,
      isSecretDecrypting: false,
      isSecretDecrypted: false,
      note: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleRetryDecryptClickEvent = this.handleRetryDecryptClickEvent.bind(this);
    this.handleHideNoteClickEvent = this.handleHideNoteClickEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.resource?.id !== prevProps.resourceWorkspaceContext.details.resource?.id ||
      this.resource?.modified !== prevProps.resourceWorkspaceContext.details.resource?.modified
    ) {
      this.setState({ note: null, isSecretDecrypted: false });
    }
  }

  /**
   * Decrypt the resource secret and load its note in the component.
   * @return {Promise<void>}
   */
  async decryptAndLoadEncryptedNote() {
    this.setState({ isSecretDecrypting: true });

    try {
      const plaintextSecretDto = await this.props.context.port.request(
        "passbolt.secret.find-by-resource-id",
        this.resource.id,
      );
      this.setState({
        note: plaintextSecretDto.description,
        isSecretDecrypting: false,
        isSecretDecrypted: true,
        error: false,
      });
      this.props.resourceWorkspaceContext.onResourceDescriptionDecrypted();
    } catch (error) {
      console.error(error);
      this.setState({
        note: null,
        isSecretDecrypting: false,
        isSecretDecrypted: false,
        error: true,
      });
      await this.props.actionFeedbackContext.displayError(error.message);
    }
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    this.setState({ open: !this.state.open, note: null, isSecretDecrypted: false });
  }

  /**
   * Retry to decrypted note
   */
  handleRetryDecryptClickEvent() {
    this.decryptAndLoadEncryptedNote();
  }

  /**
   * Hide the current decrypted note
   */
  handleHideNoteClickEvent() {
    this.setState({
      error: false,
      isSecretDecrypting: false,
      isSecretDecrypted: false,
      note: null,
    });
  }

  /*
   * =============================================================
   *  Display helpers
   * =============================================================
   */
  /**
   * @returns {boolean}
   */
  hasNoNote() {
    return typeof this.state.note === "undefined" || this.state.note === null || this.state.note?.length === 0;
  }

  /**
   * @returns {boolean}
   */
  mustShowEmptyNote() {
    return !this.state.error && this.hasNoNote() && this.state.isSecretDecrypted;
  }

  /**
   * @returns {boolean}
   */
  mustShowNote() {
    return !this.state.error && !this.hasNoNote() && this.state.isSecretDecrypted;
  }

  /**
   * @returns {boolean}
   */
  mustShowEncryptedNote() {
    return !this.state.isSecretDecrypted && !this.state.error;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="detailed-information accordion sidebar-section secure-note">
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClickEvent} className="link no-border section-opener">
              <span className="accordion-title">
                <Trans>Note</Trans>
              </span>
              {this.state.open ? <CaretDownSVG /> : <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {this.state.open && (
          <div className={`accordion-content ${this.state.error ? "error-message" : ""}`}>
            {this.state.error && (
              <>
                <p className="description-content">
                  <Trans>
                    <strong>Error: </strong>Decryption failed
                  </Trans>
                </p>
                <button
                  type="button"
                  disabled={this.state.isSecretDecrypting}
                  onClick={this.handleRetryDecryptClickEvent}
                >
                  {this.state.isSecretDecrypting ? <SpinnerSVG /> : <RevertSVG />}
                  <Trans>Retry</Trans>
                </button>
              </>
            )}
            {this.mustShowEmptyNote() && (
              <p className="description-content">
                <span className="empty-content">
                  <Trans>There is no note.</Trans>
                </span>
              </p>
            )}
            {this.mustShowNote() && (
              <>
                <p className="description-content">{this.state.note}</p>
                <button type="button" onClick={this.handleHideNoteClickEvent}>
                  <EyeCloseSVG />
                  <Trans>Hide</Trans>
                </button>
              </>
            )}
            {this.mustShowEncryptedNote() && (
              <>
                <p className="encrypted-description">
                  Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna
                  make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you.
                </p>
                <button
                  type="button"
                  className={`button ${this.state.isSecretDecrypting ? "processing" : ""}`}
                  disabled={this.state.isSecretDecrypting}
                  onClick={this.handleRetryDecryptClickEvent}
                >
                  <EyeOpenSVG />
                  <Trans>Show</Trans>
                  {this.state.isSecretDecrypting && <SpinnerSVG />}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsNote.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any, // The resource
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withResourceWorkspace(
    withResourceTypesLocalStorage(withActionFeedback(withTranslation("common")(DisplayResourceDetailsNote))),
  ),
);
