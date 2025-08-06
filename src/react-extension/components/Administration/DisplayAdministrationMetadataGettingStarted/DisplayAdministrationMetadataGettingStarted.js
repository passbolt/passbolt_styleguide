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

import PropTypes from "prop-types";
import React, {Component} from 'react';
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {createSafePortal} from "../../../../shared/utils/portals";
import InfoSVG from "../../../../img/svg/info.svg";
import {withAdministrationEncryptedMetadataGettingStarted} from "../../../contexts/Administration/AdministrationEncryptedMetadataGettingStartedContext/AdministrationEncryptedMetadataGettingStartedContext";
import GettingStartedWithEncryptedMetadataServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/gettingStartedWithEncryptedMetadataServiceWorkerService";
import {withRouter} from "react-router-dom/cjs/react-router-dom.min";
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

class DisplayAdministrationMetadataGettingStarted extends Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param {object} _
   * @param {object} prevState
   */
  componentDidUpdate(_, prevState) {
    if (prevState.canBeConfigured !== null) {
      return;
    }

    const canBeConfigured = this.props.metadataGettingStartedSettings?.enabled === true;
    this.setState({canBeConfigured});
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      canBeConfigured: this.props.metadataGettingStartedSettings?.enabled ?? null,
      isProcessing: false,
      enableEncryptedMetadata: true
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    if (this.hasAllInputDisabled()) {
      return;
    }
    const {value, name} = event.target;
    this.setState({
      [name]: value === "true"
    });
  }

  /**
   * Check if all inputs are disabled
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.canBeConfigured !== true || this.props.context.siteSettings.isFeatureBeta("metadata") || this.state.isProcessing;
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.save();
  }

  /**
   * Save the settings
   * @returns {Promise<void>}
   */
  async save() {
    if (this.state.isProcessing) {
      return;
    }
    const service = new GettingStartedWithEncryptedMetadataServiceWorkerService(this.props.context.port);
    this.setState({isProcessing: true});

    try {
      if (this.state.enableEncryptedMetadata) {
        await service.enableEncryptedMetadata();
      } else {
        await service.keepLegacyClearTextMetadata();
      }
      await this.props.administrationEncryptedMetadataGettingStartedContext.update();
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The metadata encryption strategy has been saved successfully."));
      this.props.history.push("/app/administration");
    } catch (error) {
      console.error(error);
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.setState({
      isProcessing: false,
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isFeatureBeta = this.props.context.siteSettings.isFeatureBeta("metadata");
    return (
      <div className="row">
        <div id="metadata-getting-started" className="main-column">
          <div className="main-content">
            <form onSubmit={this.handleFormSubmit} data-testid="submit-form">
              <h3 className="title"><label><Trans>Getting started</Trans></label></h3>
              <p className="description">
                <Trans>Some of the latest features such as the new resource types require the encrypted metadata feature to be enabled.</Trans><br/>
                <Trans>Here you can choose to enable it or do it later when ready. We recommend making a backup before, just in case.</Trans>
              </p>

              <h4><Trans>Enable Encrypted Metadata</Trans></h4>
              <div className="radiolist-alt">
                <div className={`input radio ${this.state.enableEncryptedMetadata ? 'checked' : ''}`}>
                  <input type="radio"
                    value="true"
                    onChange={this.handleInputChange}
                    name="enableEncryptedMetadata"
                    checked={this.state.enableEncryptedMetadata}
                    id="enable-encrypted-metadata"
                    disabled={this.hasAllInputDisabled()} />
                  <label htmlFor="enable-encrypted-metadata">
                    <span className="name bold"><Trans>Enable encrypted metadata and new resource types (recommended)</Trans></span>
                    <span className="info">
                      <Trans>Selecting this option will improve the security; enable encrypted metadata and new resource types.</Trans>
                    </span>
                  </label>
                </div>

                <div className={`input radio ${!this.state.enableEncryptedMetadata ? 'checked' : ''}`}>
                  <input type="radio"
                    value="false"
                    onChange={this.handleInputChange}
                    name="enableEncryptedMetadata"
                    checked={!this.state.enableEncryptedMetadata}
                    id="keep-legacy-cleartext-metadata"
                    disabled={this.hasAllInputDisabled()} />
                  <label htmlFor="keep-legacy-cleartext-metadata">
                    <span className="name bold"><Trans>Keep legacy cleartext metadata</Trans></span>
                    <span className="info">
                      <Trans>Selecting this option will not change your current configuration. You will be able to enable encrypted metadata and new resource types later.</Trans>
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          {isFeatureBeta &&
            <div className="warning message">
              <div className="form-banner">
                <b><Trans>Warning:</Trans></b> <Trans>Your current API version includes beta support for encrypted metadata and new resource types.</Trans> <Trans>To ensure stability and avoid potential issues, upgrade to the latest version before enabling these features.</Trans>
              </div>
            </div>
          }
        </div>
        <div className="actions-wrapper">
          <button id="save-settings" className="button primary form" type="button" disabled={this.hasAllInputDisabled()} onClick={this.handleFormSubmit}>
            <span><Trans>Save</Trans></span>
          </button>
        </div>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>For more information about the content type support and migration, checkout the dedicated page on the official website.</Trans></p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/docs/admin/metadata-encryption/" >
              <InfoSVG />
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplayAdministrationMetadataGettingStarted.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  dialogContext: PropTypes.object, // the dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  history: PropTypes.object, // History property from the rooter
  metadataGettingStartedSettings: PropTypes.object, // The metadata getting started settings
  administrationEncryptedMetadataGettingStartedContext: PropTypes.object, // The administration encrypted metadata getting started context
  createPortal: PropTypes.func, // The mocked create portal react dom primitive if test needed.
  t: PropTypes.func, // translation function
};

export default withAppContext(withRouter(withActionFeedback(withDialog(withAdministrationEncryptedMetadataGettingStarted(withTranslation('common')(DisplayAdministrationMetadataGettingStarted))))));
