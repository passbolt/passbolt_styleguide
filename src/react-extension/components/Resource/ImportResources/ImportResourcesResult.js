/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.14.0
 */

import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {Trans, withTranslation} from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import HealthcheckSuccessSVG from "../../../../img/svg/healthcheck_success.svg";
import HealthcheckErrorSVG from "../../../../img/svg/healthcheck_error.svg";
import HealthcheckWarningSVG from "../../../../img/svg/healthcheck_warning.svg";

/**
 * This component displays the result of a resource file import
 */
class ImportResourcesResult extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      showWarningResourcesDetails: false, // Display flag of the warning resources details area
      showErrorResourcesDetails: false, // Display flag of the error resources details area
      showErrorFoldersDetails: false // Display flag of the error folders details area
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorResourcesDetailsToggle = this.handleErrorResourcesDetailsToggle.bind(this);
    this.handleWarningResourcesDetailsToggle = this.handleWarningResourcesDetailsToggle.bind(this);
    this.handleErrorFoldersDetailsToggle = this.handleErrorFoldersDetailsToggle.bind(this);
    this.handleReferenceFolderClick = this.handleReferenceFolderClick.bind(this);
    this.handleReferenceTagClick = this.handleReferenceTagClick.bind(this);
  }

  /**
   * Whenever the user intends to close the dialog
   */
  handleClose() {
    this.close();
  }

  /**
   * Handle the form submission
   * @param {Event} e The form submit event
   */
  handleSubmit(e) {
    e.preventDefault();
    this.close();
  }

  /**
   * Handle the toggle display of error resources details
   */
  handleErrorResourcesDetailsToggle() {
    this.toggleErrorResourcesDetails();
  }

  /**
   * Handle the toggle display of warning resources details
   */
  handleWarningResourcesDetailsToggle() {
    this.toggleWarningResourcesDetails();
  }

  /**
   * Handle the toggle display of error folders details
   */
  handleErrorFoldersDetailsToggle() {
    this.toggleErrorFoldersDetails();
  }

  /**
   * Handle the click on the reference folder
   */
  handleReferenceFolderClick() {
    const folder = this.resultReferenceFolder;
    this.props.history.push(`/app/folders/view/${folder.id}`);
    this.close();
  }

  /**
   * Handle the click on the reference tag
   */
  handleReferenceTagClick() {
    const tag = this.resultReferenceTag;
    const filter = {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag}};
    this.props.history.push({pathname: "/app/passwords", state: {filter}});
    this.close();
  }

  /**
   * Closes the dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Toggle the display of the warning resources details
   */
  toggleWarningResourcesDetails() {
    this.setState({showWarningResourcesDetails: !this.state.showWarningResourcesDetails});
  }

  /**
   * Toggle the display of the error resources details
   */
  toggleErrorResourcesDetails() {
    this.setState({showErrorResourcesDetails: !this.state.showErrorResourcesDetails});
  }

  /**
   * Toggle the display of the error folders details
   */
  toggleErrorFoldersDetails() {
    this.setState({showErrorFoldersDetails: !this.state.showErrorFoldersDetails});
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Is the user allowed to use the tags capability
   * @returns {boolean}
   */
  get canIUseTags() {
    return this.props.context.siteSettings.canIUse("tags");
  }

  /**
   * Is the user allowed to use the folders capability
   * @returns {boolean}
   */
  get canIUseFolders() {
    return this.props.context.siteSettings.canIUse("folders");
  }

  /**
   * Returns the import result
   * @returns {object}
   */
  get result() {
    return this.props.resourceWorkspaceContext.resourceFileImportResult || {};
  }

  /**
   * Created content
   * @returns {object}
   */
  get resultCreated() {
    return this.result.created || {};
  }

  /**
   * Created folders count
   * @returns {number}
   */
  get resultCreatedFoldersCount() {
    return this.resultCreated.foldersCount || 0;
  }

  /**
   * Fully imported resources count (excluding warnings)
   * @returns {number}
   */
  get resultCreatedResourcesCount() {
    const totalCreated = this.resultCreated.resourcesCount || 0;
    const warnings = this.resultWarningsResources.length;
    return Math.max(0, totalCreated - warnings);
  }

  /**
   * The import references
   * @returns {object}
   */
  get resultReferences() {
    return this.result.references || {};
  }

  /**
   * The unique tag used to mark the resources
   * @returns {object|null}
   */
  get resultReferenceTag() {
    return this.resultReferences.tag || null;
  }

  /**
   * The folder used as root folder
   * @returns {object|null}
   */
  get resultReferenceFolder() {
    return this.resultReferences.folder || null;
  }

  /**
   * Import errors
   * @returns {object}
   */
  get resultErrors() {
    return this.result.errors || {};
  }

  /**
   * Import warnings
   * @returns {object}
   */
  get resultWarnings() {
    return this.result.warnings || {};
  }

  /**
   * Import resources errors
   * @returns {Array}
   */
  get resultErrorsResources() {
    return this.resultErrors.resources || [];
  }

  /**
   * Import folders errors
   * @returns {Array}
   */
  get resultErrorsFolders() {
    return this.resultErrors.folders || [];
  }

  /**
   * Import resources warnings
   * @returns {Array}
   */
  get resultWarningsResources() {
    return this.resultWarnings.resources || [];
  }

  /**
   * Errors occurred while importing the resources
   * @returns {boolean}
   */
  get hasErrorsResources() {
    return this.resultErrorsResources.length > 0;
  }

  /**
   * Errors occurred while importing the folders
   * @returns {boolean}
   */
  get resultHasErrorsFolders() {
    return this.resultErrorsFolders.length > 0;
  }

  /**
   * Warnings occurred while importing the resources
   * @returns {boolean}
   */
  get hasWarningsResources() {
    return this.resultWarningsResources.length > 0;
  }

  /**
   * Get the stack trace for resource warnings
   * @returns {string}
   */
  get stackTraceResourceWarnings() {
    return `----------------------------\n${this.props.t("Resources warnings")}\n----------------------------\n${JSON.stringify(this.resultWarningsResources, null, 4)}`;
  }

  /**
   * Get the stack trace for resource errors
   * @returns {string}
   */
  get stackTraceResourceErrors() {
    return `----------------------------\n${this.props.t("Resources errors")}\n----------------------------\n${JSON.stringify(this.resultErrorsResources, null, 4)}`;
  }

  /**
   * Get the stack trace for folders errors
   * @returns {string}
   */
  get stackTraceFoldersErrors() {
    return `----------------------------\n${this.props.t("Folder errors")}\n----------------------------\n${JSON.stringify(this.resultErrorsFolders, null, 4)}`;
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <DialogWrapper
        className="import-resources-result"
        title={this.props.t("Import summary")}
        onClose={this.handleClose}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-content import-dialog-summary">
            <h2>Resources</h2>

            <div className="resources-section">
              {
                this.resultCreatedResourcesCount > 0 &&
              <div className="summary-section">
                <div className="summary-header">
                  <div className="state-icon success-state">
                    <HealthcheckSuccessSVG /></div>
                  <span>
                    <Trans
                      count={this.resultCreatedResourcesCount}
                    >
                      <strong>{{count: this.resultCreatedResourcesCount}}</strong> resource was imported successfully.
                    </Trans>
                  </span>
                </div>
              </div>
              }
              {
                this.hasWarningsResources &&
              <div className="summary-section accordion accordion-section">
                <div className="summary-header accordion-header" onClick={this.handleWarningResourcesDetailsToggle}>
                  <div className="state-icon warning-state">
                    <HealthcheckWarningSVG />
                  </div>
                  <button type="button" className="summary-content link no-border">
                    <span>
                      <Trans
                        count={this.resultWarningsResources.length}
                      >
                        <strong>{{count: this.resultWarningsResources.length}}</strong> resource was partially imported.
                      </Trans>
                    </span>
                    {this.state.showWarningResourcesDetails
                      ? <CaretDownSVG className="baseline svg-icon" />
                      : <CaretRightSVG className="baseline svg-icon" />
                    }
                  </button>
                </div>

                {this.state.showWarningResourcesDetails &&
                  <div className="accordion-content">
                    <div className="input text">
                      <label
                        htmlFor="js_field_debug"
                        className="visuallyhidden">
                        <Trans>Error details</Trans>
                      </label>
                      <textarea
                        id="js_field_debug"
                        defaultValue={`${this.stackTraceResourceWarnings}`}
                        readOnly />
                    </div>
                  </div>
                }
              </div>
              }
              {
                this.hasErrorsResources &&
              <div className="summary-section accordion accordion-section">
                <div className="summary-header accordion-header" onClick={this.handleErrorResourcesDetailsToggle}>
                  <div className="state-icon fail-state">
                    <HealthcheckErrorSVG />
                  </div>
                  <button type="button" className="summary-content link no-border">
                    <span>
                      <Trans
                        count={this.resultErrorsResources.length}
                      >
                        <strong>{{count: this.resultErrorsResources.length}}</strong> resource was not imported.
                      </Trans>
                    </span>
                    {this.state.showErrorResourcesDetails
                      ? <CaretDownSVG className="baseline svg-icon" />
                      : <CaretRightSVG className="baseline svg-icon" />
                    }
                  </button>
                </div>

                {this.state.showErrorResourcesDetails &&
                  <div className="accordion-content">
                    <div className="input text">
                      <label
                        htmlFor="js_field_debug"
                        className="visuallyhidden">
                        <Trans>Error details</Trans>
                      </label>
                      <textarea
                        id="js_field_debug"
                        defaultValue={`${this.stackTraceResourceErrors}`}
                        readOnly />
                    </div>
                  </div>
                }
              </div>
              }
            </div>
            {this.canIUseFolders && this.resultCreatedFoldersCount > 0 && <>
              <h2>Folders</h2>
              <div className="folder-section">
                <div className="summary-section">
                  <div className="summary-header">
                    <div className="state-icon success-state">
                      <HealthcheckSuccessSVG /></div>
                    <span>
                      <Trans
                        count={this.resultCreatedFoldersCount}
                      >
                        <strong>{{count: this.resultCreatedFoldersCount}}</strong> folder was fully imported.
                      </Trans>
                    </span>
                  </div>
                </div>
                {this.resultHasErrorsFolders &&
                  <div className="summary-section accordion accordion-section">
                    <div className="summary-header accordion-header" onClick={this.handleErrorFoldersDetailsToggle}>
                      <div className="state-icon fail-state">
                        <HealthcheckErrorSVG />
                      </div>
                      <button type="button" className="summary-content link no-border">
                        <span>
                          <Trans
                            count={this.resultErrorsFolders.length}
                          >
                            <strong>{{count: this.resultErrorsFolders.length}}</strong> folder was not imported.
                          </Trans>
                        </span>
                        {this.state.showErrorFoldersDetails
                          ? <CaretDownSVG className="baseline svg-icon" />
                          : <CaretRightSVG className="baseline svg-icon" />
                        }
                      </button>
                    </div>
                    {this.state.showErrorFoldersDetails &&
                      <div className="accordion-content">
                        <div className="input text">
                          <label
                            htmlFor="js_field_folders_debug"
                            className="visuallyhidden">
                            <Trans>Error details</Trans>
                          </label>
                          <textarea
                            id="js_field_folders_debug"
                            defaultValue={`${this.stackTraceFoldersErrors}`}
                            readOnly />
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            </>
            }
            {(this.resultReferenceFolder || this.resultReferenceTag) &&
              <div className="notice message">
                {this.canIUseFolders && this.resultReferenceFolder &&
                  <p>
                    <Trans>
                      You can find these newly imported passwords in the folder <button type="button" className="link inline no-border" onClick={this.handleReferenceFolderClick}>{{folderName: this.resultReferenceFolder.name}}</button>.
                    </Trans>
                  </p>
                }
                {this.canIUseTags && !this.resultReferenceFolder && this.resultReferenceTag &&
                  <p>
                    <Trans>
                      You can find these newly imported passwords under the tag <button type="button" className="link inline no-border" onClick={this.handleReferenceTagClick}>{{tagName: this.resultReferenceTag.slug}}</button>.
                    </Trans>
                  </p>
                }
              </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value={this.props.t("Ok")} />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ImportResourcesResult.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // Whenever the dialogs closes
  actionFeedbackContext: PropTypes.any, // The action feedback context
  history: PropTypes.object, // History property from the rooter
  resourceWorkspaceContext: PropTypes.any, // The resource context
  t: PropTypes.func, // The translation function
};

export default withRouter(withAppContext(withResourceWorkspace(withActionFeedback(withTranslation('common')(ImportResourcesResult)))));
