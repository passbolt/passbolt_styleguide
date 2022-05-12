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
import {withAppContext} from "../../../contexts/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component displays the success of a resource file import
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
      showErrorsDetails: false // Display flag of the error details area
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorDetailsToggle = this.handleErrorDetailsToggle.bind(this);
    this.handleReferenceFolderClick = this.handleReferenceFolderClick.bind(this);
    this.handleReferenceTagClick = this.handleReferenceTagClick.bind(this);
  }

  /**
   * Whenever the user intends to close the dialog
   */
  handleClose() {
    this.close();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.close();
  }

  /**
   * Handle the toggle display of error details
   */
  handleErrorDetailsToggle() {
    this.toggleErrorDetails();
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
   * Toggle the display of the error details
   */
  toggleErrorDetails() {
    this.setState({showErrorDetails: !this.state.showErrorDetails});
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
   * @returns {int}
   */
  get resultCreatedFoldersCount() {
    return this.resultCreated.foldersCount || 0;
  }

  /**
   * Created resources count
   * @returns {int}
   */
  get resultCreatedResourcesCount() {
    return this.resultCreated.resourcesCount || 0;
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
   * @returns {object}
   */
  get resultReferenceTag() {
    return this.resultReferences.tag || null;
  }

  /**
   * The folder used as root folder.
   * @returns {object}
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
   * Import resources errors
   * @returns {array}
   */
  get resultErrorsResources() {
    return this.resultErrors.resources || [];
  }

  /**
   * Import folders errors
   * @returns {array}
   */
  get resultErrorsFolders() {
    return this.resultErrors.folders || [];
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
   * Errors occurred while importing the file
   * @returns {boolean}
   */
  get resultHasErrors() {
    return this.hasErrorsResources || this.resultHasErrorsFolders;
  }

  /**
   * Format the errors that occurred while importing
   * @returns {string}
   */
  get formatErrors() {
    let result = "";
    if (this.hasErrorsResources) {
      result += `----------------------------\n${this.translate("Resources errors")}\n----------------------------\n${JSON.stringify(this.resultErrorsResources, null, 4)}\n\n`;
    }
    if (this.resultHasErrorsFolders) {
      result += `----------------------------\n${this.translate("Folder errors")}\n----------------------------\n${JSON.stringify(this.resultErrorsFolders, null, 4)}`;
    }

    return result;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   */
  render() {
    const createAndErrorResourcesCount = this.resultCreatedResourcesCount + this.resultErrorsResources.length;
    const createAndErrorFoldersCount = this.resultCreatedFoldersCount + this.resultErrorsFolders.length;
    return (
      <DialogWrapper
        title={this.resultHasErrors ? this.translate("Something went wrong!") : this.translate("Import success!")}
        onClose={this.handleClose}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            {!this.hasErrorsResources &&
            <p>
              <strong>{this.translate("{{count}} password has been imported successfully.", {count: this.resultCreatedResourcesCount})}</strong>
            </p>
            }
            {this.hasErrorsResources &&
            <>
              <p className="error inline-error"><Trans>There was an issue while importing passwords:</Trans></p>
              <p>
                <Trans count={createAndErrorResourcesCount}>
                  <strong>{{numberResourceSuccess: this.resultCreatedResourcesCount}} out of {{count: this.resultCreatedResourcesCount + this.resultErrorsResources.length}}</strong> password has been imported.
                </Trans>
              </p>
            </>
            }
            {this.canIUseFolders && !this.resultHasErrorsFolders &&
            <p>
              <strong>{this.translate("{{count}} folder has been imported successfully.", {count: this.resultCreatedFoldersCount})}</strong>
            </p>
            }
            {this.canIUseFolders && this.resultHasErrorsFolders &&
            <>
              <p className="error inline-error"><Trans>There was an issue while importing folders:</Trans></p>
              <p>
                <Trans count={createAndErrorFoldersCount}>
                  <strong>{{numberFolderSuccess: this.resultCreatedFoldersCount}} out of {{count: this.resultCreatedFoldersCount + this.resultErrorsFolders.length}}</strong> folder has been imported.
                </Trans>
              </p>
            </>
            }
            {this.canIUseFolders && this.resultReferenceFolder &&
            <p>
              <Trans>
                You can find these newly imported passwords in the folder <a onClick={this.handleReferenceFolderClick}>{{folderName: this.resultReferenceFolder.name}}</a>.
              </Trans>
            </p>
            }
            {this.canIUseTags && !this.resultReferenceFolder && this.resultReferenceTag &&
            <p>
              <Trans>
                You can find these newly imported passwords under the tag <a onClick={this.handleReferenceTagClick}>{{tagName: this.resultReferenceTag.slug}}</a>.
              </Trans>
            </p>
            }
            {this.resultHasErrors &&
            <div className="accordion error-details">
              <div className="accordion-header">
                <a onClick={this.handleErrorDetailsToggle}>
                  <Trans>Error details</Trans>
                  <Icon name={this.state.showErrorDetails ? "caret-up" : "caret-down"}/>
                </a>
              </div>
              {this.state.showErrorDetails &&
              <div className="accordion-content">
                <div className="input text">
                  <label
                    htmlFor="js_field_debug"
                    className="visuallyhidden">
                    <Trans>Error details</Trans>
                  </label>
                  <textarea
                    id="js_field_debug"
                    defaultValue={`${this.formatErrors}`}
                    readOnly/>
                </div>
              </div>
              }
            </div>
            }
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value={this.translate("Ok")}/>
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
