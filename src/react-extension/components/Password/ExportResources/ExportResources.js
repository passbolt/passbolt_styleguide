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
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withDialog} from "../../../contexts/Common/DialogContext";
import AppContext from "../../../contexts/AppContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ExportResourcesCredentials from "./ExportResourcesCredentials";

/**
 * This component allows to export resources to a specified format
 */
class ExportResources extends React.Component {
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
      selectedExportFormat: this.exportFormats[0].value, // The selected export format
      actions: {
        processing: false // Actions flag about processing
      }
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleExport = this.handleExport.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleExportFormatSelected = this.handleExportFormatSelected.bind(this);
  }

  /**
   * Return trus if the export is processing
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns true if actions can be performed
   */
  get areActionsAllowed() {
    return !this.isProcessing;
  }

  /**
   * Returns true if some folders must be exported
   */
  get hasFoldersToExport() {
    return this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
  }

  /**
   * Returns the resources identifiers to export
   */
  get resourcesIdsToExport() {
    return this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds;
  }

  /**
   * Returns the folders identifiers to export
   */
  get foldersIdsToExport() {
    const foldersIds = this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    const childrenFoldersIds = foldersIds.map(folderId => this.findSubfoldersIds(folderId)).flat();
    return [...foldersIds, ...childrenFoldersIds];
  }

  /**
   * Returns the list of available export formats
   */
  get exportFormats() {
    return [
      {label: 'kdbx (keepass / keepassx)', value: 'kdbx'},
      {label: 'csv (keepass / keepassx)', value: 'csv-kdbx'},
      {label: 'csv (lastpass)', value: 'csv-lastpass'},
      {label: 'csv (1password)', value: 'csv-1pass'},
    ];
  }

  /**
   * Whenever the user selects an export format
   * @param event Select DOM event
   */
  handleExportFormatSelected(event) {
    this.selectFormat(event.target.value);
  }

  /**
   * Whenever the export is submitted
   * @param event A dom event
   */
  async handleExport(event) {
    event.preventDefault();
    const isCsv = this.state.selectedExportFormat.startsWith('csv');
    if (isCsv) { // CSV case
      await this.setState({actions: {processing: true}});
      this.export()
        .then(this.onExportSuccess.bind(this))
        .catch(this.onExportFailure.bind(this));
    } else { // KDBX case
      await this.props.dialogContext.open(ExportResourcesCredentials);
      this.close();
    }
  }

  /**
   * Whenever the export is cancelled
   */
  handleCancel() {
    this.close();
  }

  /**
   * Select the export format
   * @param selectedExportFormat The selected export format
   */
  selectFormat(selectedExportFormat) {
    this.setState({selectedExportFormat});
  }


  /**
   * Export the selected resources or folders
   */
  async export() {
    const options = {format: this.state.selectedExportFormat};
    const foldersIds = this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    const resourcesIds = this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds;
    await this.context.port.request('passbolt.export-passwords.export-to-file', {foldersIds, resourcesIds, options});
  }

  /**
   * Whenever the export has been performed succesfully
   */
  async onExportSuccess() {
    await this.setState({actions: {processing: false}});
    await this.props.actionFeedbackContext.displaySuccess('The passwords have been exported successfully');
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds: null, foldersIds: null});
    this.close();
  }

  /**
   * Whenever the export has been performed with failure
   */
  async onExportFailure(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    await this.setState({actions: {processing: false}});
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds: null, foldersIds: null});
    await this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Close the dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Returns the subfolder ids of the given folder
   * @param folderId A folder identifier
   */
  findSubfoldersIds(folderId) {
    const folders = this.context.folders;
    const childrenFolders = folders
      .filter(folder => folder.folder_parent_id === folderId)
      .map(folder => folder.id);
    const hasChildren = childrenFolders.length !== 0;
    if (!hasChildren) {
      return [];
    } else {
      const grandChildrenFolders = childrenFolders.map(childFolder => this.findSubfoldersIds(childFolder.id));
      return [...childrenFolders, ...grandChildrenFolders.flat()];
    }
  }

  /**
   * Returns the resources ids of the folders to export
   * @param foldersIds The folders to look into
   */
  findResourcesIdsOfFoldersToExport(foldersIds) {
    const belongsToFolder = resource => foldersIds.some(folderId =>  folderId === resource.folder_parent_id);
    return this.context.resources.filter(belongsToFolder);
  }

  /**
   * Render the component
   */
  render() {
    const foldersIdsToExport = this.hasFoldersToExport && this.foldersIdsToExport;
    const resourcesIdsToExport = this.hasFoldersToExport ? this.findResourcesIdsOfFoldersToExport(foldersIdsToExport) : this.resourcesIdsToExport;
    return (
      <DialogWrapper
        title="Export passwords !"
        onClose={this.handleClose}
        disabled={this.areActionsAllowed}>
        <form
          onSubmit={this.handleExport}
          noValidate>

          <div className="form-content">

            <div className={`input text required`}>
              <label htmlFor="export-format">Choose the export format ( csv and kdbx are supported)</label>
              <select
                id="export-format"
                value={this.state.selectedExportFormat}
                onChange={this.handleExportFormatSelected}>
                {
                  this.exportFormats.map(format =>
                    <option
                      key={format.value}
                      value={format.value}>
                      {format.label}
                    </option>
                  )
                }
              </select>
            </div>

            <br/>
            <p>
              {this.hasFoldersToExport && <em>{resourcesIdsToExport.length} passwords and {foldersIdsToExport.length} folders are going to be exported.</em>}
              {!this.hasFoldersToExport &&
                <>
                  {resourcesIdsToExport.length === 1 && <em>One password is going to be exported</em>}
                  {resourcesIdsToExport.length > 1 && <em>{resourcesIdsToExport.length} passwords are going to be exported.</em>}
                </>
              }
            </p>
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value="Export"/>
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              onClick={this.handleCancel}/>
          </div>

        </form>
      </DialogWrapper>
    );
  }
}

ExportResources.contextType = AppContext;

ExportResources.propTypes = {
  onClose: PropTypes.func, // Whenever the dialog is closes
  resourceWorkspaceContext: PropTypes.object, // The resource workspace context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object // The action feedback context
};

export default withActionFeedback(withDialog(withResourceWorkspace(ExportResources)));
