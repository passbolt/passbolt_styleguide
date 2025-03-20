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
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";

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
      description: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleRetryDecryptClickEvent = this.handleRetryDecryptClickEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.resource?.id !== prevProps.resourceWorkspaceContext.details.resource?.id
      || this.resource?.modified !== prevProps.resourceWorkspaceContext.details.resource?.modified) {
      this.setState({description: null, isSecretDecrypted: false});
    }
  }

  /**
   * Decrypt the resource secret and load its description in the component.
   * @return {Promise<void>}
   */
  async decryptAndLoadEncryptedDescription() {
    this.setState({isSecretDecrypting: true});

    try {
      const plaintextSecretDto = await this.props.context.port.request("passbolt.secret.find-by-resource-id", this.resource.id);
      this.setState({
        description: plaintextSecretDto.description,
        isSecretDecrypting: false,
        isSecretDecrypted: true,
        error: false
      });
      this.props.resourceWorkspaceContext.onResourceDescriptionDecrypted();
    } catch (error) {
      console.error(error);
      this.setState({
        description: null,
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
    this.setState({open: !this.state.open, description: null, isSecretDecrypted: false});
  }

  /**
   * Retry to decrypted description
   */
  handleRetryDecryptClickEvent() {
    this.decryptAndLoadEncryptedDescription();
  }

  /*
   * =============================================================
   *  Display helpers
   * =============================================================
   */
  /**
   * @returns {boolean}
   */
  hasNoDescription() {
    return this.state.description === null
      || this.state.description?.length === 0;
  }

  /**
   * @returns {boolean}
   */
  mustShowEmptyDescription() {
    return !this.state.error && this.hasNoDescription() && this.state.isSecretDecrypted;
  }

  /**
   * @returns {boolean}
   */
  mustShowDescription() {
    return !this.state.error && !this.hasNoDescription() && this.state.isSecretDecrypted;
  }

  /**
   * @returns {boolean}
   */
  mustShowEncryptedDescription() {
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
              {this.state.open
                ? <CaretDownSVG/>
                : <CaretRightSVG/>
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
          <div className={`accordion-content ${this.state.error ? "error-message" : ""}`}>
            {this.state.error &&
              <>
                <p className="description-content">
                  <Trans><strong>Error: </strong>Decryption failed</Trans>
                </p>
                <button type="button" disabled={this.state.isSecretDecrypting} onClick={this.handleRetryDecryptClickEvent}>
                  {this.state.isSecretDecrypting ? <SpinnerSVG/> : <RevertSVG/>}<Trans>Retry</Trans>
                </button>
              </>
            }
            {this.mustShowEmptyDescription() &&
              <p className="description-content">
                <span className="empty-content"><Trans>There is no description.</Trans></span>
              </p>
            }
            {this.mustShowDescription() &&
              <p className="description-content">
                {this.state.description}
              </p>
            }
            {this.mustShowEncryptedDescription() &&
              <>
                <p className="encrypted-description">
                  Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you.
                </p>
                <button type="button" disabled={this.state.isSecretDecrypting} onClick={this.handleRetryDecryptClickEvent}>
                  <EyeOpenSVG/><Trans>Show</Trans>{this.state.isSecretDecrypting && <SpinnerSVG/>}
                </button>
              </>
            }
          </div>
        }
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

export default withAppContext(withResourceWorkspace(withResourceTypesLocalStorage(withActionFeedback(withTranslation('common')(DisplayResourceDetailsNote)))));
