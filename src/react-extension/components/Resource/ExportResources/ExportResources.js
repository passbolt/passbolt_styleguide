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
import {withDialog} from "../../../contexts/DialogContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ExportResourcesCredentials from "./ExportResourcesCredentials";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";

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
    this.handleClose = this.handleClose.bind(this);
    this.handleExportFormatSelected = this.handleExportFormatSelected.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.findContentToExport();
  }

  /**
   * Find the content to export and update the context.
   */
  findContentToExport() {
    const foldersIds = this.findFoldersIdsToExport();
    const resourcesIds = this.findResourcesIdsToExport(foldersIds);
    this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds, foldersIds});
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
    const foldersIds = this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    return foldersIds && foldersIds.length > 0;
  }

  /**
   * Returns true if some resources must be exported
   */
  get hasResourcesToExport() {
    const resourcesIds = this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds;
    return resourcesIds && resourcesIds.length > 0;
  }

  /**
   * Returns the folders identifiers to export
   */
  findFoldersIdsToExport() {
    if (!this.hasFoldersToExport) {
      return [];
    }
    const foldersIds = this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    const childrenFoldersIds = foldersIds.map(folderId => this.getChildrenFoldersIds(folderId)).flat();
    return [...foldersIds, ...childrenFoldersIds];
  }

  /**
   * Returns the children folders ids of the given folder
   * @param folderId A folder identifier
   */
  getChildrenFoldersIds(folderId) {
    const folders = this.props.context.folders;
    const childrenFoldersIds = folders
      .filter(folder => folder.folder_parent_id === folderId)
      .map(folder => folder.id);

    const hasChildren = childrenFoldersIds.length !== 0;
    if (!hasChildren) {
      return [];
    } else {
      const grandChildrenFolders = childrenFoldersIds.map(childFolderId => this.getChildrenFoldersIds(childFolderId));
      return [...childrenFoldersIds, ...grandChildrenFolders.flat()];
    }
  }

  /**
   * Returns the resources identifiers to export
   * @param {array} foldersIds The list of folders to crawl for resources
   */
  findResourcesIdsToExport(foldersIds) {
    const resourcesIdsOfFoldersIds = this.getResourcesIdsOfFoldersToExport(foldersIds);
    const resourcesIdsToExport = this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds || [];
    return Array.from(new Set([...resourcesIdsToExport, ...resourcesIdsOfFoldersIds]));
  }

  /**
   * Returns the resources ids of the folders to export
   * @param foldersIds The folders to look into
   */
  getResourcesIdsOfFoldersToExport(foldersIds) {
    const belongsToFolder = resource => foldersIds.some(folderId => folderId === resource.folder_parent_id);
    return this.props.context.resources.filter(belongsToFolder).map(resource => resource.id);
  }

  /**
   * Returns the list of available export formats
   */
  get exportFormats() {
    return [
      {label: "kdbx (keepass / keepassx)", value: "kdbx"},
      {label: "csv (keepass / keepassx)", value: "csv-kdbx"},
      {label: "csv (lastpass)", value: "csv-lastpass"},
      {label: "csv (1password)", value: "csv-1password"},
      {label: "csv (chromium based browsers)", value: "csv-chromium"},
      {label: "csv (bitwarden)", value: "csv-bitwarden"},
      {label: "csv (mozilla)", value: "csv-mozilla"},
      {label: "csv (safari)", value: "csv-safari"},
      {label: "csv (dashlane)", value: "csv-dashlane"},
      {label: "csv (nordpass)", value: "csv-nordpass"},
      {label: "csv (logmeonce)", value: "csv-logmeonce"}
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
    const isCsv = this.state.selectedExportFormat.startsWith("csv");
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
  async handleCancel() {
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds: null, foldersIds: null});
    this.close();
  }

  /**
   * Whenever the dialog is closed
   */
  async handleClose() {
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds: null, foldersIds: null});
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
    const foldersIds = this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    const resourcesIds = this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds;
    const exportDto = {
      format: this.state.selectedExportFormat,
      folders_ids: foldersIds,
      resources_ids: resourcesIds
    };
    await this.props.context.port.request("passbolt.export-resources.export-to-file", exportDto);
  }

  /**
   * Whenever the export has been performed successfully
   */
  async onExportSuccess() {
    await this.setState({actions: {processing: false}});
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The passwords have been exported successfully"));
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds: null, foldersIds: null});
    this.close();
  }

  /**
   * Whenever the export has been performed with failure
   */
  onExportFailure(error) {
    const isUserAbortsOperation = error.name === "UserAbortsOperationError";
    if (isUserAbortsOperation) {
      this.setState({actions: {processing: false}});
      return;
    }

    const errorDialogProps = {
      error: error
    };
    this.setState({actions: {processing: false}});
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Close the dialog
   */
  close() {
    this.props.onClose();
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
    const foldersIdsToExport = this.hasFoldersToExport && this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    const resourcesIdsToExport = this.hasResourcesToExport && this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds;

    return (
      <DialogWrapper
        title={this.translate("Export passwords")}
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}>
        <form
          onSubmit={this.handleExport}
          noValidate>

          <div className="form-content">

            <div className={`select-wrapper input required ${!this.areActionsAllowed ? 'disabled' : ''}`}>
              <label htmlFor="export-format"><Trans>Choose the export format (csv and kdbx are supported)</Trans></label>
              <Select
                id="export-format"
                value={this.state.selectedExportFormat}
                items={this.exportFormats}
                onChange={this.handleExportFormatSelected}
                disabled={!this.areActionsAllowed}/>
            </div>
            {this.hasFoldersToExport &&
              <p>
                <em>{this.translate("{{count}} folder is going to be exported.", {count: foldersIdsToExport.length})}</em>
              </p>
            }
            {this.hasResourcesToExport &&
              <p>
                <em>{this.translate("{{count}} password is going to be exported.", {count: resourcesIdsToExport.length})}</em>
              </p>
            }
          </div>

          <div className="submit-wrapper clearfix">
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              onClick={this.handleCancel}/>
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value={this.translate("Export")}/>
          </div>

        </form>
      </DialogWrapper>
    );
  }
}

ExportResources.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // Whenever the dialog is closes
  resourceWorkspaceContext: PropTypes.object, // The resource workspace context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withResourceWorkspace(withTranslation('common')(ExportResources)))));
