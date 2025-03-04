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
 * @since         4.12.0
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import {Trans, withTranslation} from "react-i18next";
import memoize from "memoize-one";
import {createPortal} from "react-dom";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import MetadataSettingsServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataSettingsServiceWorkerService";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";
import MetadataKeysServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService";
import MigrateMetadataFormEntity from "../../../../shared/models/entity/metadata/migrateMetadataFormEntity";
import MetadataMigrateContentServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataMigrateContentServiceWorkerService";
import ConfirmMigrateMetadataDialog from "./ConfirmMigrateMetadataDialog";

class DisplayMigrateMetadataAdministration extends Component {
  /** @type {MigrateMetadataFormEntity} */
  formSettings = undefined;
  /** @type {MetadataTypesSettingsEntity} */
  metadataTypesSettings = undefined;
  /** @type {MetadataKeysCollection} */
  metadataKeys = undefined;
  /** @type {PassboltResponsePaginationHeaderEntity} */
  migrationCountDetails = undefined;
  /** @type {PassboltResponsePaginationHeaderEntity} */
  migrationCountDetailsShared = undefined;

  constructor(props) {
    super(props);
    this.formSettings = new MigrateMetadataFormEntity({});

    this.metadataSettingsServiceWorkerService = props.metadataSettingsServiceWorkerService
      ?? new MetadataSettingsServiceWorkerService(props.context.port);

    this.metadataKeysServiceWorkerService = props.metadataKeysServiceWorkerService
      ?? new MetadataKeysServiceWorkerService(props.context.port);

    this.metadataMigrateContentServiceWorkerService = props.metadataMigrateContentServiceWorkerService
      ?? new MetadataMigrateContentServiceWorkerService(props.context.port);

    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      isReady: false,
      isProcessing: false, // Is the form processing (loading, submitting).
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once.
      hasMigrationRunOnce: false, // True if the migration has been started at least once.
      settings: this.formSettings.toDto(),
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMigrateScopeInputChange = this.handleMigrateScopeInputChange.bind(this);
    this.runMigration = this.runMigration.bind(this);
    this.askForMigrationConfirmation = this.askForMigrationConfirmation.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.initData();
  }

  async initData() {
    this.metadataTypesSettings = await this.metadataSettingsServiceWorkerService.findTypesSettings();
    this.metadataKeys = await this.metadataKeysServiceWorkerService.findAll();

    this.migrationCountDetailsShared = await this.metadataMigrateContentServiceWorkerService.findCountMetadataMigrateResources(true);
    this.migrationCountDetails = await this.metadataMigrateContentServiceWorkerService.findCountMetadataMigrateResources();

    this.setState({
      settings: this.formSettings.toDto(),
      isProcessing: false,
      isReady: true,
    });
  }

  /**
   * Validate form.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {ResourceTypesCollection} resourceTypes The resource types.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  validateForm = memoize(formSettingsDto => this.formSettings?.validate());

  /**
   * Verify the data health. This intends for administrators, helping them adjust settings to prevent unusual or
   * problematic situations. By instance enabling a metadata types without active related content types.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {ResourceTypesCollection} resourceTypes The resource types.
   * @return {EntityValidationError}
   */
  verifyDataHealth = memoize((_, resourceTypes, metadataTypesSettings, metadataKeys) => this.formSettings?.verifyHealth(resourceTypes, metadataTypesSettings, metadataKeys));

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    if (this.hasAllInputDisabled()) {
      return;
    }
    const {type, checked, value, name} = event.target;
    const parsedValue =  type === "checkbox" ? checked : value;
    this.setFormPropertyValue(name, parsedValue);
  }

  /**
   * Handle migrate scope form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleMigrateScopeInputChange(event) {
    const {value, name} = event.target;
    this.setFormPropertyValue(name, value === "all-content");
  }

  /**
   * Set a form property value. Trigger the validation if the form has already been submitted once.
   * @param name
   * @param parsedValue
   */
  setFormPropertyValue(name, parsedValue) {
    this.formSettings.set(name, parsedValue, {validate: false});
    this.setState({settings: this.formSettings.toDto()});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.isProcessing;
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  handleFormSubmit(event) {
    // Avoid the form to be submitted natively by the browser and avoid a redirect to a broken page.
    event.preventDefault();
    this.askForMigrationConfirmation();
  }

  /**
   * Returns true if any content migration is not fully done yet.
   * @returns {boolean}
   */
  get hasPendingMigration() {
    return this.hasPendingResourcesMigration
      || this.hasPendingFoldersMigration
      || this.hasPendingCommentsMigration
      || this.hasPendingTagsMigration;
  }

  /**
   * Returns the total of resources to be migrated (shared + personal)
   * @returns {integer}
   */
  get totalResources() {
    return this.totalSharedResources + this.totalPersonalResources;
  }

  /**
   * Returns the total of shared resources to be migrated
   * @returns {integer}
   */
  get totalSharedResources() {
    return this.migrationCountDetailsShared?.count;
  }

  /**
   * Returns the total of personal resources to be migrated
   * @returns {integer}
   */
  get totalPersonalResources() {
    return this.migrationCountDetailsPersonal?.count;
  }

  /**
   * Returns the migration details computed based on the admin choice
   * @returns {object}
   */
  get migrationCountDetailsPersonal() {
    return {
      ...this.migrationCountDetails,
      count: this.migrationCountDetails?.count - this.migrationCountDetailsShared?.count,
    };
  }

  /**
   * Returns true if the resources migration is not fully done yet.
   * @returns {boolean}
   */
  get hasPendingResourcesMigration() {
    return this.totalResources > 0;
  }

  /**
   * Returns true if the folders migration is not fully done yet.
   * @returns {boolean}
   */
  get hasPendingFoldersMigration() {
    return this.totalFolders > 0;
  }

  /**
   * Returns true if the comments migration is not fully done yet.
   * @returns {boolean}
   */
  get hasPendingTagsMigration() {
    return this.totalTags > 0;
  }

  /**
   * Returns true if the tags migration is not fully done yet.
   * @returns {boolean}
   */
  get hasPendingCommentsMigration() {
    return this.totalComments > 0;
  }

  /**
   * Returns migration status text to display to the user.
   * @returns {string}
   */
  get migrationStatus() {
    if (!this.hasPendingMigration) {
      return this.props.t("Done");
    }

    return this.state.hasMigrationRunOnce
      ? this.props.t("Pending")
      : this.props.t("Required");
  }

  /**
   * Returns true if there are still elements to migrate.
   * @todo: when other content to migrate, the total count should be adapted.
   * @returns {boolean}
   */
  hasElementsToMigrate() {
    return this.totalResources > 0;
  }

  /**
   * Returns true if the form has global error from the health check.
   * @param {Error} healthIssue
   * @returns {boolean}
   */
  hasGlobalError(healthIssue) {
    return healthIssue?.hasError("global_form") || false;
  }

  /**
   * Asks the current user for confirmation before running the metadata migration process.
   */
  askForMigrationConfirmation() {
    this.props.dialogContext.open(ConfirmMigrateMetadataDialog, {
      confirm: this.runMigration,
      cancel: () => {},
    });
  }

  /**
   * Triggers the migration of the content
   * @returns {Promise<void>}
   */
  async runMigration() {
    if (this.state.isProcessing) {
      return;
    }

    const validationError = this.validateForm(this.state.settings);
    const healthWarnings = this.verifyDataHealth(this.state.settings, this.props.resourceTypes, this.metadataTypesSettings, this.metadataKeys);
    if (validationError?.hasErrors() || this.hasGlobalError(healthWarnings)) {
      this.setState({hasAlreadyBeenValidated: true});
      return;
    }

    this.setState({isProcessing: true});

    try {
      const migrationDetails = this.formSettings.sharedContentOnly ? this.migrationCountDetailsShared : this.migrationCountDetails;
      await this.metadataMigrateContentServiceWorkerService.migrate(this.formSettings.toDto(), migrationDetails);
      await this.initData();

      if (this.hasElementsToMigrate()) {
        this.props.actionFeedbackContext.displayWarning(this.props.t("Encrypted metadata were partially migrated."));
      } else {
        this.props.actionFeedbackContext.displaySuccess(this.props.t("The encrypted metadata were migrated."));
      }
    } catch (error) {
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.setState({
      hasAlreadyBeenValidated: true,
      hasMigrationRunOnce: true,
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const warnings = this.verifyDataHealth(this.state.settings, this.props.resourceTypes, this.metadataTypesSettings, this.metadataKeys);
    const hasGlobalError = this.hasGlobalError(warnings);
    return (
      <div className="row">
        {(this.props.createPortal || createPortal)(
          <div className="col2_3 actions-wrapper">
            <div className="actions">
              <ul>
                <li>
                  <button type="button" disabled={this.state.isProcessing || hasGlobalError} onClick={this.handleFormSubmit}>
                    <span><Trans>Migrate</Trans></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>,
          document.getElementById("administration-actions-content-action")
        )}
        <div id="migrate-metadata-settings" className="col8 main-column">
          <form onSubmit={this.handleFormSubmit} data-testid="submit-form">
            <h3><label><Trans>Migrate metadata</Trans></label></h3>
            {hasGlobalError && this.hasPendingMigration &&
              <div className="error message form-banner">
                <Trans>No active metadata keys available.</Trans>
              </div>
            }
            {!hasGlobalError && this.hasPendingMigration &&
              <div className="warning message form-banner">
                <Trans>If you have integrations, you will have to make sure they are updated before triggering the migration.</Trans>
              </div>
            }
            <p className="description">
              <Trans>Initiate a migration to convert cleartext metadata to encrypted metadata.</Trans>
            </p>
            <h4><Trans>Summary</Trans></h4>
            <div className="feedback-card">
              {this.state.isReady && this.hasPendingMigration &&
              <AnimatedFeedback name="warning" />
              }
              {this.state.isReady && !this.hasPendingMigration &&
              <AnimatedFeedback name="success" />
              }
              <div className="migration-status-information">
                <ul>
                  <li className="migration-status">
                    <span className="label"><Trans>Migration status</Trans></span>
                    <span className="value">{this.migrationStatus}</span>
                  </li>
                  <li className="migration-resources-count">
                    <span className="label"><Trans>Resources</Trans></span>
                    <span className="value">
                      {this.hasPendingResourcesMigration
                        ? <>{this.props.t("{{count}} to be migrated", {count: this.totalResources})} ({this.props.t("{{count}} shared resources", {count: this.totalSharedResources})}, {this.props.t("{{count}} personal resources", {count: this.totalPersonalResources})})</>
                        : <Trans>All migrated</Trans>
                      }
                    </span>
                  </li>
                  {/*
                    <li className="migration-folders-count">
                      <span className="label"><Trans>Folders</Trans></span>
                      <span className="value">
                        {this.hasPendingFoldersMigration
                          ? <>{this.props.t("{{count}} to be migrated", {count: this.totalFolders})}</>
                          : <Trans>All migrated</Trans>
                        }
                      </span>
                    </li>
                    <li className="migration-tags-count">
                      <span className="label"><Trans>Tags</Trans></span>
                      <span className="value">
                        {this.hasPendingCommentsMigration
                          ? <>{this.props.t("{{count}} to be migrated", {count: this.totalTags})}</>
                          : <Trans>All migrated</Trans>
                        }
                      </span>
                    </li>
                    <li className="migration-comments-count">
                      <span className="label"><Trans>Comments</Trans></span>
                      <span className="value">
                        {this.hasPendingTagsMigration
                          ? <>{this.props.t("{{count}} to be migrated", {count: this.totalComments})}</>
                          : <Trans>All migrated</Trans>
                        }
                      </span>
                    </li>
                  */}
                </ul>
              </div>
            </div>

            <h4><Trans>Items to migrate</Trans></h4>
            <div className="togglelist">
              <span className={`input toggle-switch form-element ${!hasGlobalError && warnings?.hasError("migrate_resources_to_v5") && "warning"}`}>
                <input id="migrateResourcesInput" type="checkbox" name="migrate_resources_to_v5" className="toggle-switch-checkbox checkbox"
                  onChange={this.handleInputChange}
                  checked={this.state.settings.migrate_resources_to_v5}
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="migrateResourcesInput">
                  <span className="name"><Trans>Resources:</Trans></span>
                  <span className="info"><Trans>Name, Username, URI, Cleartext description.</Trans></span>
                  {!hasGlobalError && warnings?.hasError("migrate_resources_to_v5") &&
                    <div className="warning">
                      {warnings?.hasError("migrate_resources_to_v5", "allow_creation_of_v5_resources") &&
                        <div className="warning-message"><Trans>Resource types v5 creation is not allowed.</Trans></div>
                      }
                      {warnings?.hasError("migrate_resources_to_v5", "resource_types_v5_deleted") &&
                        <div className="warning-message"><Trans>Resources will not be migrated as no content types with encrypted metadata is allowed.</Trans></div>
                      }
                      {warnings?.hasError("migrate_resources_to_v5", "resource_types_v5_partially_deleted") &&
                        <div className="warning-message"><Trans>Not all resources will be migrated, some corresponding content types are not active.</Trans></div>
                      }
                    </div>
                  }
                </label>
              </span>
              {/*
                <span className={`input toggle-switch form-element ${!hasGlobalError && warnings?.hasError("migrate_folders_to_v5") && "warning"}`}>
                  <input id="migrateFoldersInput" type="checkbox" name="migrate_folders_to_v5"
                    className={`toggle-switch-checkbox checkbox ${!hasGlobalError && warnings?.hasError("migrate_folders_to_v5") && "warning"}`}
                    onChange={this.handleInputChange}
                    checked={this.state.settings.migrate_folders_to_v5}
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="migrateFoldersInput">
                    <span className="name"><Trans>Folders:</Trans></span>
                    <span className="info"><Trans>Name.</Trans></span>
                    {!hasGlobalError && warnings?.hasError("migrate_folders_to_v5") &&
                      <div className="warning">
                        {warnings?.hasError("migrate_folders_to_v5", "allow_v4_v5_upgrade") &&
                          <div className="warning-message"><Trans>Folder upgrade from v4 to v5 is not allowed</Trans></div>
                        }
                        {warnings?.hasError("migrate_folders_to_v5", "allow_creation_of_v5_folders") &&
                          <div className="warning-message"><Trans>Folder v5 creation is not allowed.</Trans></div>
                        }
                      </div>
                    }
                  </label>
                </span>
                <span className={`input toggle-switch form-element ${!hasGlobalError && warnings?.hasError("migrate_tags_to_v5") && "warning"}`}>
                  <input id="migrateTagsInput" type="checkbox" name="migrate_tags_to_v5"
                    className={`toggle-switch-checkbox checkbox ${!hasGlobalError && warnings?.hasError("migrate_tags_to_v5") && "warning"}`}
                    onChange={this.handleInputChange}
                    checked={this.state.settings.migrate_tags_to_v5}
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="migrateTagsInput">
                    <span className="name"><Trans>Tags:</Trans></span>
                    <span className="info"><Trans>Slug.</Trans></span>
                    {!hasGlobalError && warnings?.hasError("migrate_tags_to_v5") &&
                      <div className="warning">
                        {warnings?.hasError("migrate_tags_to_v5", "allow_v4_v5_upgrade") &&
                          <div className="warning-message"><Trans>Tag upgrade from v4 to v5 is not allowed</Trans></div>
                        }
                        {warnings?.hasError("migrate_tags_to_v5", "allow_creation_of_v5_tags") &&
                          <div className="warning-message"><Trans>Tag v5 creation is not allowed.</Trans></div>
                        }
                      </div>
                    }
                  </label>
                </span>
                <span className={`input toggle-switch form-element ${!hasGlobalError && warnings?.hasError("migrate_comments_to_v5") && "warning"}`}>
                  <input id="migrateCommentsInput" type="checkbox" name="migrate_comments_to_v5"
                    className={`toggle-switch-checkbox checkbox ${!hasGlobalError && warnings?.hasError("migrate_comments_to_v5") && "warning"}`}
                    onChange={this.handleInputChange}
                    checked={this.state.settings.migrate_comments_to_v5}
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="migrateCommentsInput">
                    <span className="name"><Trans>Comments</Trans></span>
                    {!hasGlobalError && warnings?.hasError("migrate_comments_to_v5") &&
                      <div className="warning">
                        {warnings?.hasError("migrate_comments_to_v5", "allow_v4_v5_upgrade") &&
                          <div className="warning-message"><Trans>Comment upgrade from v4 to v5 is not allowed</Trans></div>
                        }
                        {warnings?.hasError("migrate_comments_to_v5", "allow_creation_of_v5_comments") &&
                          <div className="warning-message"><Trans>Comment v5 creation is not allowed.</Trans></div>
                        }
                      </div>
                    }
                  </label>
                </span>
              */}
            </div>

            <h4><Trans>Migrate scope</Trans></h4>
            <div className="radiolist-alt">
              <div className={`input radio ${this.state.settings.migrate_personal_content && 'checked'}`}>
                <input type="radio"
                  value="all-content"
                  onChange={this.handleMigrateScopeInputChange}
                  name="migrate_personal_content"
                  checked={this.state.settings.migrate_personal_content}
                  id="migrateScopeAllContentInput"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="migrateScopeAllContentInput">
                  <span className="name"><Trans>All content</Trans></span>
                  <span className="info"><Trans>All resources including the private ones.</Trans></span>
                </label>
              </div>
              <div className={`input radio ${!this.state.settings.migrate_personal_content && 'checked'}`}>
                <input type="radio"
                  value="shared-only"
                  onChange={this.handleMigrateScopeInputChange}
                  name="migrate_personal_content"
                  checked={!this.state.settings.migrate_personal_content}
                  id="migrateScopeSharedContentInput"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="migrateScopeSharedContentInput">
                  <span className="name"><Trans>Shared content only</Trans></span>
                  <span className="info"><Trans>Only shared resources are migrated.</Trans></span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

DisplayMigrateMetadataAdministration.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  createPortal: PropTypes.func, // The mocked create portal react dom primitive if test needed.
  metadataSettingsServiceWorkerService: PropTypes.object, // The bext service that handle metadata settings.
  metadataKeysServiceWorkerService: PropTypes.object,
  metadataMigrateContentServiceWorkerService: PropTypes.object,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  t: PropTypes.func, // translation function
};

export default withAppContext(withActionFeedback(withDialog(withResourceTypesLocalStorage(withDialog(withTranslation('common')(DisplayMigrateMetadataAdministration))))));
