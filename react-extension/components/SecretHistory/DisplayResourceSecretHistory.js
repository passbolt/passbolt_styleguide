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
 * @since         5.7.0
 */
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import DialogWrapper from "../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import SecretRevisionsResourceServiceWorkerService
  from "../../../shared/services/serviceWorker/secretRevision/secretRevisionsResourceServiceWorkerService";
import {formatDateTimeAgo} from "../../../shared/utils/dateUtils";
import DisplayCreatorSecretRevision from "./DisplayCreatorSecretRevision";
import {withDialog} from "../../contexts/DialogContext";
import NotifyError from "../Common/Error/NotifyError/NotifyError";

class DisplaySecretResourceHistory extends Component {
  constructor(props) {
    super(props);
    this.secretRevisionsResourceServiceWorkerService = new SecretRevisionsResourceServiceWorkerService(props.context.port);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Ge the default state
   * @returns {*}
   */
  get defaultState() {
    return {
      resourceSecretHistorySelectedId: null, // The selected resource secret selected to display
      isProcessing: true, // Is the form processing (loading).
      tooltipFingerprintMessage: null, // tooltip fingerprint message
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleClose = this.handleClose.bind(this);
    this.onSelectSecretRevision = this.onSelectSecretRevision.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    try {
      this.resourceSecretRevisionsCollection = await this.secretRevisionsResourceServiceWorkerService.findAllByResourceIdForDisplay(this.props.resource.id);
    } catch (error) {
      // It can happen when the user has closed the passphrase entry dialog by instance.
      if (error?.name === "UserAbortsOperationError") {
        console.warn(error);
        this.handleClose();
        return;
      }
      this.props.dialogContext.open(NotifyError, {error});
      this.handleClose();
      return;
    }
    this.resourceSecretRevisionsCollection.sortByModified();

    this.setState({
      resourceSecretHistorySelectedId: this.resourceSecretRevisionsCollection?.items[0]?.id,
      isProcessing: false
    });
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Set the state for the resource form selected
   * @param {string} secretRevisionId The secret revision id
   */
  onSelectSecretRevision(secretRevisionId) {
    this.setState({resourceSecretHistorySelectedId: secretRevisionId});
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    this.handleClose();
  }

  /**
   * Get the secret history in JSON format
   * @return {string | React.JSX.Element}
   */
  get secretHistoryAsJson() {
    const object = this.resourceSecretRevisionSelected?.secrets?.items[0]?.data;
    return JSON.stringify(object,  null, 2);
  };

  /**
   * Get the resource secret revision selected
   * @return {SecretRevisionEntity | null}
   */
  get resourceSecretRevisionSelected() {
    if (!this.state.resourceSecretHistorySelectedId) {
      return null;
    }
    return this.resourceSecretRevisionsCollection?.getFirst("id", this.state.resourceSecretHistorySelectedId);
  }

  /**
   * Is resource secret revision selected
   * @param id
   * @return {boolean}
   */
  isResourceSecretRevisionSelected(id) {
    return this.state.resourceSecretHistorySelectedId === id;
  }

  /**
   * Has no resource secret revision access
   * @param secrets
   * @return {boolean}
   */
  hasNoRevisionsAccess(secrets) {
    return secrets && secrets.length === 0;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <DialogWrapper title={this.translate("Secret history")} subtitle={this.props.resource.metadata.name} className="resource-secret-history"
        disabled={this.state.isProcessing} onClose={this.handleClose}>
        <div className="left-sidebar">
          <div className="sidebar-content-sections">
            {this.resourceSecretRevisionsCollection?.items.map(resourceSecretRevision => (
              <div className={`section-content ${this.isResourceSecretRevisionSelected(resourceSecretRevision.id) ? "selected" : ""} ${this.hasNoRevisionsAccess(resourceSecretRevision.secrets) ? "disabled" : ""}`} key={resourceSecretRevision.id}>
                {this.hasNoRevisionsAccess(resourceSecretRevision.secrets) &&
                  <TooltipPortal message={<Trans>You cannot access revisions created before the resource was shared with you.</Trans>}>
                    <DisplayCreatorSecretRevision disabled={true} secretRevision={resourceSecretRevision}/>
                  </TooltipPortal>
                }
                {!this.hasNoRevisionsAccess(resourceSecretRevision.secrets) &&
                  <DisplayCreatorSecretRevision disabled={this.state.isProcessing} secretRevision={resourceSecretRevision} onSelectSecretRevision={this.onSelectSecretRevision}/>
                }
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={this.handleFormSubmit} className="grid-and-footer" noValidate>
          <div className="grid">
            <div className="resource-secret-history-workspace">
              <div className="title">
                <h2>
                  <Trans>Secret revision</Trans>
                  <span className="subtitle">{formatDateTimeAgo(this.resourceSecretRevisionSelected?.modified, this.props.t, this.props.context.locale)}</span>
                </h2>
              </div>
              <div className="content">
                <div className="secret-history-fields">
                  {this.resourceSecretRevisionsCollection?.length > 0 &&
                    <pre>
                      <code className="json-object">
                        {this.secretHistoryAsJson}
                      </code>
                    </pre>
                  }
                  {this.resourceSecretRevisionsCollection?.length === 0 &&
                    <p className="empty-content">
                      <Trans>There is no revision</Trans>
                    </p>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="submit-wrapper">
            <FormSubmitButton value={this.translate("Close")} disabled={this.state.isProcessing} processing={this.state.isProcessing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DisplaySecretResourceHistory.propTypes = {
  onClose: PropTypes.func, // Whenever the component must be closed
  resource: PropTypes.object, // The resource
  dialogContext: PropTypes.object, // The dialog context
  context: PropTypes.object, // The app context
  t: PropTypes.func, // The translation function
};

export default  withAppContext(withDialog(withTranslation('common')(DisplaySecretResourceHistory)));

