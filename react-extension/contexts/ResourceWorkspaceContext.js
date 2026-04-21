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
 * @since         2.13.0
 */

import * as React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { withRouter } from "react-router-dom";
import { withActionFeedback } from "./ActionFeedbackContext";
import { withLoading } from "./LoadingContext";
import sanitizeUrl, { urlProtocols } from "../lib/Sanitize/sanitizeUrl";
import SorterEntity from "../../shared/models/entity/sorter/sorterEntity";
import GridUserSettingEntity from "../../shared/models/entity/gridUserSetting/gridUserSettingEntity";
import GridResourceUserSettingServiceWorkerService from "../../shared/services/serviceWorker/gridResourceUserSetting/GridResourceUserSettingServiceWorkerService";
import ColumnsResourceSettingCollection from "../../shared/models/entity/resource/columnsResourceSettingCollection";
import { withPasswordExpiry } from "./PasswordExpirySettingsContext";
import { withRbac } from "../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../shared/services/rbacs/uiActionEnumeration";
import { ColumnModelTypes } from "../../shared/models/column/ColumnModel";
import getPropValue from "../lib/Object/getPropValue";
import { withTranslation } from "react-i18next";
import RowsSettingEntity from "../../shared/models/entity/rowsSetting/rowsSettingEntity";
import ResourcesServiceWorkerService from "../../shared/services/serviceWorker/resources/resourcesServiceWorkerService";
import TabsServiceWorkerService from "../../shared/services/serviceWorker/tabs/tabsServiceWorkerService";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const ResourceWorkspaceContext = React.createContext({
  filter: {
    type: null, // Filter type
    payload: null, // Filter payload
  },
  sorter: {
    propertyName: "modified", // The name of the property to sort on
    asc: false, // True if the sort must be descendant
  },
  filteredResources: [], // The current list of filtered resources
  selectedResources: [], // The current list of selected resources
  columnsResourceSetting: [], // The settings of columns for resources
  rowsSetting: null, // The setting for the display of the rows
  details: {
    resource: null, // The resource to focus details on
    folder: null, // The folder to focus details on
  },
  scrollTo: {
    resource: null, // The resource to scroll to
    folder: null, // The folder to scroll to
  },
  refresh: {
    permissions: false, // Flag to force the refresh of the permissions
  },
  resourceFileToImport: null, // The resource file to import
  resourceFileImportResult: null, // The resource file import result
  lockDisplayDetail: true, // lock the detail to display the folder or password sidebar
  resourcesToExport: {
    resourcesIds: null, // The resources ids to export
    foldersIds: null, // The folders ids to export
  },
  onLockDetail: () => {}, // Lock or unlock detail (hide or display the folder or password sidebar)
  onResourceScrolled: () => {}, // Whenever one scrolled to a resource
  onResourceEdited: () => {}, // Whenever a resource descript has been edited
  onResourceDescriptionEdited: () => {}, // Whenever a resource description has been edited
  onResourceDescriptionDecrypted: () => {}, // Whenever a resource description area has been descripted
  onResourceShared: () => {}, // Whenever a resource is shared
  onResourcePermissionsRefreshed: () => {}, // Whenever the resource permissions have been refreshed
  onResourceCopied: () => {}, // Whenever a resource (password)  has been copied
  onResourcePreviewed: () => {}, // Whenever a resource has been previewed
  onResourceActivitiesRefreshed: () => {}, // Whenever the resource activities have been refreshed
  onSorterChanged: () => {}, // Whenever the sorter changed
  onResourceSelected: {
    all: () => {}, // Whenever all the resources have been selected
    none: () => {}, // Whenever none resources have been selected
    multiple: () => {}, // Whenever a resource has been selected in a multiple mode
    range: () => {}, // Whenever a resource has been selected in a multiple mode
    single: () => {}, // Whenever a single resource has been selected
  },
  onResourceFileToImport: () => {}, // Whenever a resource file will be imported
  onResourceFileImportResult: () => {}, // Whenever the import result has been provided
  onResourcesToExport: () => {}, // Whenever resources and/or folder will be exported
  onGoToResourceUriRequested: () => {}, // Whenever the users wants to follow a resource uri
  onChangeColumnView: () => {}, // Whenever the users wants to show or hide a column
  onChangeColumnsSettings: () => {}, // Whenever the user change the columns configuration
  resetGridColumnsSettings: () => {}, // Whenever the user resets the columns configuration
  onChangeRowSettingsHeight: () => {}, // Whenever the user change the row settings
  getHierarchyFolderCache: () => {}, // Whenever the need to get folder hierarchy
});

/**
 * The related context provider
 */
export class ResourceWorkspaceContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.rowsSetting = RowsSettingEntity.createFromDefault();
    this.state = this.defaultState;
    this.gridResourceUserSetting = new GridResourceUserSettingServiceWorkerService(props.context.port);
    this.resourcesServiceWorkerService = new ResourcesServiceWorkerService(props.context.port);
    this.tabsServiceWorkerService = new TabsServiceWorkerService(props.context.port);
  }

  /**
   * Get default sorter
   * @return {object}
   */
  get defaultSorter() {
    return new SorterEntity({
      propertyName: "modified", // The name of the property to sort on
      asc: false, // True if the sort must be descendant
    });
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      filter: { type: ResourceWorkspaceFilterTypes.NONE }, // The current resource search filter
      sorter: this.defaultSorter, // The default sorter
      filteredResources: null, // The current list of filtered resources
      selectedResources: [], // The current list of selected resources
      columnsResourceSetting: null, // The settings of columns for resources
      rowsSetting: this.rowsSetting.toDto(), // The setting for the display of the rows
      details: {
        resource: null, // The resource to focus details on
        folder: null, // The folder to focus details on
      },
      scrollTo: {
        resource: null, // The resource to scroll to
        folder: null, // The folder to scroll to
      },
      refresh: {
        activities: false, // Flag to force the refresh of the activities
        permissions: false, // Flag to force the refresh of the permissions
      },
      resourceFileToImport: null, // The resource file to import
      resourceFileImportResult: null, // The resource file import result
      lockDisplayDetail: true, // lock the detail to display the folder or password sidebar
      resourcesToExport: null, // The resources / folders to export
      onLockDetail: this.handleLockDetail.bind(this), // Lock or unlock detail (hide or display the folder or password sidebar)
      onFolderScrolled: this.handleFolderScrolled.bind(this), // Whenever one scrolled to a resource
      onResourceScrolled: this.handleResourceScrolled.bind(this), // Whenever one scrolled to a resource
      onResourceEdited: this.handleResourceEdited.bind(this), // Whenever a resource descript has been edited
      onResourceDescriptionEdited: this.handleResourceDescriptionEdited.bind(this), // Whenever a resource description has been edited
      onResourceDescriptionDecrypted: this.handleResourceDescriptionDecrypted.bind(this), // Whenever a resource description has been decrypted
      onResourceShared: this.handleResourceShared.bind(this), // Whenever a resource is shared
      onResourcePermissionsRefreshed: this.handleResourcePermissionsRefreshed.bind(this), // Whenever the resource permissions have been refreshed
      onResourceCopied: this.handleResourceCopied.bind(this), // Whenever a resource (password) has been copied
      onResourcePreviewed: this.handleResourcePreviewed.bind(this), // Whenever a resource (password) has been copied
      onResourceActivitiesRefreshed: this.handleResourceActivitiesRefreshed.bind(this), // Whenever the resource activities have been refreshed
      onSorterChanged: this.handleUpdatedSorterChange.bind(this), // Whenever the sorter changed
      onResourceSelected: {
        all: this.handleAllResourcesSelected.bind(this), // Whenever all the resources have been selected
        none: this.handleNoneResourcesSelected.bind(this), // Whenever none resources have been selected
        multiple: this.handleMultipleResourcesSelected.bind(this), // Whenever a resource has been selected in a multiple mode
        range: this.handleResourceRangeSelected.bind(this), // Whenever a resource has been selected in a multiple mode
        single: this.handleResourceSelected.bind(this), // Whenever a single resource has been selected
      },
      onResourceFileToImport: this.handleResourceFileToImport.bind(this), // Whenever a resource file will be imported
      onResourceFileImportResult: this.handleResourceFileImportResult.bind(this), // Whenever the import result has been provided
      onResourcesToExport: this.handleResourcesToExportChange.bind(this), // Whenever resources and/or folder have to be exported
      onGoToResourceUriRequested: this.onGoToResourceUriRequested.bind(this), // Whenever the users wants to follow a resource uri
      onChangeColumnView: this.handleChangeColumnView.bind(this), // Whenever the users wants to show or hide a column
      onChangeColumnsSettings: this.handleChangeColumnsSettings.bind(this), // Whenever the user change the columns configuration
      resetGridColumnsSettings: this.resetGridColumnsSettings.bind(this), // Whenever the user resets the columns configuration
      onChangeRowSettingsHeight: this.onChangeRowSettingsHeight.bind(this), // Whenever the user change the rows setting
    };
  }

  /**
   * Get the folders
   * @return {*}
   */
  get resources() {
    return this.props.context.resources;
  }

  /**
   * Get the folders
   * @return {*}
   */
  get folders() {
    return this.props.context.folders;
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.props.passwordExpiryContext.findSettings();
    this.loadGridResourceSetting();
    this.populate();
    this.handleResourcesWaitedFor();
  }

  /**
   * Check if the component is ready for update processing
   * @returns {boolean}
   */
  isContentLoaded() {
    return this.resources !== null && (!this.canUseFolders || this.folders !== null);
  }

  /**
   * Check if the route location has changed
   * @param {object} prevProps
   * @returns {boolean}
   */
  hasLocationChanged(prevProps) {
    const hasPathChanged = this.props.location.pathname !== prevProps.location.pathname;
    const hasStateChanged = this.props.location.state !== prevProps.location?.state;
    return hasPathChanged || hasStateChanged;
  }

  /**
   * Check if this is the first app load
   * @returns {boolean}
   */
  get isAppFirstLoad() {
    return this.state.filter.type === ResourceWorkspaceFilterTypes.NONE;
  }

  /**
   * Get the change from previous props and state
   * @param prevProps The previous props
   * @param prevState The previous state
   * @returns {object} Change flags
   */
  getChangesFromPreviousPropsAndState(prevProps, prevState) {
    return {
      route: this.hasLocationChanged(prevProps) || this.isAppFirstLoad,
      folders: prevProps.context.folders !== this.folders,
      resources: prevProps.context.resources !== this.resources,
      selection: prevState.selectedResources !== this.state.selectedResources,
      filter: !this.isFilterEqual(prevState.filter, this.state.filter),
      details: prevState.details !== this.state.details,
      sorter: prevState.sorter !== this.state.sorter,
    };
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps The previous props
   * @param prevState The previous state
   */
  async componentDidUpdate(prevProps, prevState) {
    if (!this.isContentLoaded()) {
      return;
    }
    this.handleResourcesLoaded();

    // Get the data from the state that could be updated
    const nextState = {
      filter: this.state.filter,
      details: this.state.details,
      selectedResources: this.state.selectedResources,
    };
    const changes = this.getChangesFromPreviousPropsAndState(prevProps, prevState);
    // Update next state according to the changes detected
    this.processDataChanges(nextState, changes);
    const hasFilterChanged = !this.isFilterEqual(nextState.filter, this.state.filter);
    if (hasFilterChanged) {
      this.handleFilterChange(nextState);
    }
    // Update details according to the selection and redirect if needed
    this.processSelectionChanges(nextState, changes, hasFilterChanged);
    // Apply set state if change detected based on next state
    this.applyStateUpdatesAndSearch(nextState, changes, hasFilterChanged);
  }

  /**
   * Process data changes and update next state accordingly
   * @param {object} nextState - Mutable state object to update
   * @param {object} changes - Change flags from detectChanges
   */
  processDataChanges(nextState, changes) {
    // Route changed or App first load when resource and folder are loaded or has previous selection changed
    if (changes.route) {
      this.handleRouteChange(nextState);
    }
    // Folder changed
    if (changes.folders) {
      this.handleFoldersChange(nextState);
    }
    // Resource changed
    if (changes.resources) {
      this.handleResourceChange(nextState);
    }
    // Has previous sorter changed
    if (changes.sorter) {
      this.handleSorterChange();
    }
  }

  /**
   * Process selection and navigation changes
   * @param {object} nextState - Mutable state object to update
   * @param {object} changes - Change flags
   * @param {boolean} hasFilterChanged - Whether filter changed
   */
  processSelectionChanges(nextState, changes, hasFilterChanged) {
    // Has previous select resources changed and previous filter and details unchanged
    const shouldUpdateDetailsFromSelection = changes.selection && !changes.filter && !changes.details;
    // Example of a use case:
    // Given resources filter by folder with the route
    // And I select all resources (Selection has changed, route and details are unchanged and details should change to display a list of resources)
    // Then I should see a list of resources in details
    // And I unselect all (Selection has changed, route and details are unchanged and details should change to display the folder)
    // Then I should see the folder details
    if (shouldUpdateDetailsFromSelection) {
      // Update details from filter
      nextState.details = this.getDetailsFromFilter(nextState.filter, nextState.selectedResources);
    }

    // Has previous select resources changed (Should redirect when one or several resources has been selected)
    // or filter changed (Should redirect and unselect all resources and display folder details if previously selected)
    // or route changed (When one resource is selected and same filter is applied and the route should remain on the selected resource)
    const shouldRedirectAfterSelection = changes.selection || hasFilterChanged || changes.route;
    if (shouldRedirectAfterSelection) {
      // Redirect according to the selected resources or filter if needed
      this.redirectAfterSelection(nextState.selectedResources, nextState.filter);
    }
  }

  /**
   * Apply state updates and trigger search if needed
   * @param {object} nextState - State to apply
   * @param {object} changes - Change flags
   * @param {boolean} hasFilterChanged - Whether filter changed
   */
  applyStateUpdatesAndSearch(nextState, changes, hasFilterChanged) {
    this.handleSelectedResourcesChange(nextState.selectedResources);
    this.handleDetailsChange(nextState.details);
    const needsSearch = hasFilterChanged || changes.folders || changes.resources;
    if (needsSearch) {
      // The search will set the filter state
      this.search(nextState.filter);
    }
  }

  /**
   * Handle route change.
   * Mutates nextState to set filter, details, and selectedResources based on the current route.
   * @param {object} nextState - The next state object to mutate
   * @param {object} [nextState.filter] - The filter configuration
   * @param {object} [nextState.details] - The details panel state (resource or folder)
   * @param {Array} [nextState.selectedResources] - The list of selected resources
   */
  handleRouteChange(nextState) {
    // Get filter from route
    nextState.filter = this.getFilterFromRoute(nextState.filter);
    // Get details from filter
    nextState.details = this.getDetailsFromFilter(nextState.filter, nextState.selectedResources);
    // Select resource if route match and details resource exist
    if (this.props.match.params.selectedResourceId) {
      // Edge case when resource does not exist anymore and should be selected by the route
      if (nextState.details.resource === null) {
        nextState.selectedResources = [];
        // Display notification message to inform the resource does not exist
        this.handleUnknownResource();
      } else {
        // Select the resource
        nextState.selectedResources = [nextState.details.resource];
      }
    }
  }

  /**
   * Get the filter according to the route.
   * Determines the appropriate filter based on URL parameters (folder ID, filter type, selected resource).
   * @param {object} filter - The current filter state
   * @param {string} filter.type - The current filter type
   * @param {object} [filter.payload] - Optional filter payload
   * @returns {object} The resolved filter object
   * @returns {string} return.type - The filter type (e.g., FOLDER, ALL, EXPIRED)
   * @returns {object} [return.payload] - Optional payload containing filter-specific data
   * @returns {object} [return.payload.folder] - The folder when filter type is FOLDER
   */
  getFilterFromRoute(filter) {
    if (this.folders !== null && this.props.match.params.filterByFolderId) {
      const folder = this.folders.find((folder) => folder.id === this.props.match.params.filterByFolderId);
      if (folder) {
        if (this.canUseFolders) {
          this.populateFolders();
        }

        this.resourcesServiceWorkerService.updateResourceLocalStorageForParentFolderId(folder.id);
        return { type: ResourceWorkspaceFilterTypes.FOLDER, payload: { folder: folder } };
      } else {
        this.handleUnknownFolder();
        // Return ALL if folder is unknown
        return { type: ResourceWorkspaceFilterTypes.ALL };
      }
    } else if (this.resources !== null && this.props.location.pathname.includes("passwords")) {
      const isExpiredResourceLocation = this.props.match.params?.filterType === ResourceWorkspaceFilterTypes.EXPIRED;
      if (isExpiredResourceLocation) {
        return { type: ResourceWorkspaceFilterTypes.EXPIRED };
      } else if (this.props.match.params.selectedResourceId) {
        // Return ALL if the actual filter is none or the actual filter (fix edge case on first load)
        return filter.type === ResourceWorkspaceFilterTypes.NONE ? { type: ResourceWorkspaceFilterTypes.ALL } : filter;
      }
    }
    // Return ALL if the actual filter is none or the location filter or ALL (fix edge case on filter group tag or home)
    return filter.type === ResourceWorkspaceFilterTypes.NONE
      ? { type: ResourceWorkspaceFilterTypes.ALL }
      : this.props.location.state?.filter || { type: ResourceWorkspaceFilterTypes.ALL };
  }

  /**
   * Get the details panel state based on the current filter and selection.
   * Determines which resource or folder should be displayed in the details panel.
   * Only one of folder or resource can be set at a time.
   * @param {object} filter - The current filter
   * @param {string} filter.type - The filter type
   * @param {object} [filter.payload] - Optional filter payload
   * @param {object} [filter.payload.folder] - The folder when filter type is FOLDER
   * @param {Array} selectedResources - The currently selected resources
   * @returns {object} The details panel state
   * @returns {object|null} return.folder - The folder to display, or null
   * @returns {object|null} return.resource - The resource to display, or null
   */
  getDetailsFromFilter(filter, selectedResources) {
    if (this.props.match.params.selectedResourceId) {
      // Find the resource with the route
      const resource = this.resources.find((resource) => resource.id === this.props.match.params.selectedResourceId);
      if (resource) {
        return { folder: null, resource: resource };
      }
    } else if (selectedResources.length > 1) {
      // Multiple resources selected (do not display folder or resource details)
      return { folder: null, resource: null };
    } else if (filter.type === ResourceWorkspaceFilterTypes.FOLDER) {
      // If filter is folder and there is no or one resource selected display folder details
      return { folder: filter.payload.folder, resource: null };
    }
    return { folder: null, resource: null };
  }

  /**
   * Handle folders change
   * @param {object} nextState The next state
   */
  handleFoldersChange(nextState) {
    const hasFolderFilter = nextState.filter.type === ResourceWorkspaceFilterTypes.FOLDER;
    if (hasFolderFilter) {
      // Update the filter
      nextState.filter = this.updateFilterFromFoldersChange(nextState.filter);
      // Update the folder details
      nextState.details = this.getDetailsFromFilter(nextState.filter, nextState.selectedResources);
    }
  }

  /**
   * Handle resources change
   * @param {object} nextState The next state
   */
  handleResourceChange(nextState) {
    if (nextState.details.resource !== null) {
      nextState.details = this.updateResourceDetails(nextState.details.resource);
    }
    nextState.selectedResources = this.updateSelectedResourcesFromResourcesChange(nextState.selectedResources);
  }

  /**
   * Handle details change
   * @param {object} details
   */
  handleDetailsChange(details) {
    const hasDetailsChanges =
      details.folder !== this.state.details.folder || details.resource !== this.state.details.resource;
    if (hasDetailsChanges) {
      this.setState({ details });
      if (details.resource) {
        this.scrollToResource(details.resource);
      } else if (details.folder) {
        this.scrollToFolder(details.folder);
      }
    }
  }

  /**
   * Handle previous sorter change
   */
  handleSorterChange() {
    if (this.state.filteredResources !== null) {
      const filteredResources = [...this.state.filteredResources];
      this.sort(filteredResources);
      this.setState({ filteredResources });
    }
  }

  /**
   * Handle selected resources change
   * @param {Array} selectedResources
   */
  handleSelectedResourcesChange(selectedResources) {
    const hasSelectedResourcesChanged = selectedResources !== this.state.selectedResources;
    if (hasSelectedResourcesChanged) {
      this.setState({ selectedResources });
    }
  }

  /**
   * Is filter equal
   * @param {Object} filter1 The first filter to compare.
   * @param {Object} filter2 The second filter to compare.
   * @returns {boolean}
   */
  isFilterEqual(filter1, filter2) {
    if (filter1.type !== filter2.type) {
      return false;
    }

    const type = filter1.type;
    switch (type) {
      case ResourceWorkspaceFilterTypes.GROUP:
        return filter1?.payload?.group?.id === filter2?.payload?.group?.id;
      case ResourceWorkspaceFilterTypes.FOLDER:
        return filter1?.payload?.folder?.id === filter2?.payload?.folder?.id;
      case ResourceWorkspaceFilterTypes.TAG:
        return filter1?.payload?.tag?.id === filter2?.payload?.tag?.id;
      case ResourceWorkspaceFilterTypes.TEXT:
        return filter1?.payload === filter2?.payload;
      default:
        return true;
    }
  }

  /**
   * Handles the resource search filter change
   * @param {object} nextState The next state
   * @return {void}
   */
  handleFilterChange(nextState) {
    // Avoid a side-effect whenever one inputs a specific resource url (it unselect the resource otherwise )
    if (!this.isAppFirstLoad) {
      // Unselect if filter changed and is not the app first load
      nextState.selectedResources = [];
    }
    if (
      nextState.filter.type !== ResourceWorkspaceFilterTypes.GROUP &&
      nextState.filter.type !== ResourceWorkspaceFilterTypes.FOLDER
    ) {
      this.populate();
    }
  }

  /**
   * Whenever the folders change update the filter
   * @param {object} filter - The current filter state
   * @param {string} filter.type - The current filter type
   * @param {object} [filter.payload] - Optional filter payload
   * @returns {object} The resolved filter object
   * @returns {string} return.type - The filter type (e.g., FOLDER, ALL)
   * @returns {object} [return.payload] - Optional payload containing filter-specific data
   * @returns {object} [return.payload.folder] - The folder when filter type is FOLDER
   */
  updateFilterFromFoldersChange(filter) {
    const folder = this.folders.find((folder) => folder.id === filter.payload.folder.id);
    if (folder) {
      return { type: ResourceWorkspaceFilterTypes.FOLDER, payload: { folder: folder } };
    } else {
      // If folder does not exist go back to ALL filter
      return { type: ResourceWorkspaceFilterTypes.ALL };
    }
  }

  /**
   * Update resource details
   * @param {object} outdatedResource The outdated resource
   * @return {{folder: null, resource: *}|{folder: null, resource: null}}
   */
  updateResourceDetails(outdatedResource) {
    // Case of resource details
    const resource = this.resources.find((resource) => resource.id === outdatedResource.id);
    if (resource) {
      return { folder: null, resource: resource };
    }
    // If resource does not exist go back to ALL filter
    return { folder: null, resource: null };
  }

  /**
   * Remove from the selected resources those which are not known resources in regard of the current resources list
   * @param {Array<*>} selectedResources
   * @return {Array<*>}
   */
  updateSelectedResourcesFromResourcesChange(selectedResources) {
    const matchId = (selectedResource) => (resource) => resource.id === selectedResource.id;
    const matchSelectedResource = (selectedResource) => selectedResources.some(matchId(selectedResource));
    return this.resources.filter(matchSelectedResource);
  }

  /**
   * Handle the lock detail to display it or not
   * @returns {Promise<void>}
   */
  async handleLockDetail() {
    const lockDisplayDetail = !this.state.lockDisplayDetail;
    return this.setState({ lockDisplayDetail });
  }

  /**
   * Handle an unknown resource (display an error notification)
   */
  handleUnknownResource() {
    this.props.actionFeedbackContext.displayError("The resource does not exist");
  }

  /**
   * Handle an unknown folder (display an error notification)
   */
  handleUnknownFolder() {
    this.props.actionFeedbackContext.displayError("The folder does not exist");
  }

  /**
   * Handle the scrolling of a resource
   */
  handleResourceScrolled() {
    this.scrollNothing();
  }

  /**
   * Handle the scrolling of a folder
   */
  handleFolderScrolled() {
    this.scrollNothing();
  }

  /**
   * Handle the edited resource
   */
  async handleResourceEdited() {
    this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the edited resource description
   */
  async handleResourceDescriptionEdited() {
    this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the decrypted resource description
   */
  async handleResourceDescriptionDecrypted() {
    this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the shared resource
   */
  async handleResourceShared() {
    this.refreshSelectedResourceActivities();
    this.refreshSelectedResourcePermissions();
  }

  /**
   * Handle the refresh of the resource permission
   */
  handleResourcePermissionsRefreshed() {
    this.setResourcesPermissionsAsRefreshed();
  }

  /**
   * Handle the copied resource
   */
  handleResourceCopied() {
    this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the previewed resource
   */
  handleResourcePreviewed() {
    this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the refresh of the resource activitie
   * @returns {Promise<void>}
   */
  handleResourceActivitiesRefreshed() {
    this.setResourceActivitiesAsRefreshed();
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param propertyName The name of the property to sort on
   */
  handleUpdatedSorterChange(propertyName) {
    this.updateSorter(propertyName);
  }

  /**
   * Handle the all resource selection
   */
  handleAllResourcesSelected() {
    this.selectAll();
  }

  /**
   * Handle the none resource selection
   */
  handleNoneResourcesSelected() {
    this.unselectAll();
  }

  /**
   * Handle the resource selection in a multiple mode
   * @param resource The selected resource
   */
  handleMultipleResourcesSelected(resource) {
    this.selectMultiple(resource);
  }

  /**
   * Handle the resource selection in a range mode
   * @param resource The selected resource
   */
  handleResourceRangeSelected(resource) {
    this.selectRange(resource);
  }

  /**
   * Handle the single resource selection
   * @param resource The selected resource
   */
  handleResourceSelected(resource) {
    this.select(resource);
  }

  /**
   * Handle the wait for the initial resources to be loaded
   */
  handleResourcesWaitedFor() {
    this.props.loadingContext.add();
  }

  /**
   * Handle the initial loading of the resources
   */
  handleResourcesLoaded() {
    const hasResourcesBeenInitialized = this.resources !== null;
    if (hasResourcesBeenInitialized) {
      this.props.loadingContext.remove();
      this.handleResourcesLoaded = () => {};
    }
  }

  /**
   * Handle the will to import a resource file
   */
  handleResourceFileToImport(resourceFile) {
    this.import(resourceFile);
  }

  /**
   * Handle the resource file import result
   * @param result The import result
   */
  handleResourceFileImportResult(result) {
    this.updateImportResult(result);
  }

  /**
   * Whenever the resources / folders to export change
   * @param resourcesIds The resources ids to export
   * @param foldersIds The folders ids to export
   */
  handleResourcesToExportChange({ resourcesIds, foldersIds }) {
    this.updateResourcesToExport({ resourcesIds, foldersIds });
  }

  /**
   * Whenever the users wants to follow a resource uri
   * @param {string} uri The uri to follow
   */
  onGoToResourceUriRequested(uri) {
    const safeUri = sanitizeUrl(uri, {
      whiteListedProtocols: resourceLinkAuthorizedProtocols,
      defaultProtocol: urlProtocols.HTTPS,
    });

    if (safeUri) {
      this.tabsServiceWorkerService.openResourceUriInNewTab(safeUri);
    }
  }

  /**
   * Check if the user can use folders.
   * @returns {boolean}
   */
  get canUseFolders() {
    return (
      this.props.context.siteSettings.canIUse("folders") && this.props.rbacContext.canIUseAction(uiActions.FOLDERS_USE)
    );
  }

  /**
   * Populate the context with initial data such as resources and folders
   */
  populate() {
    if (this.canUseFolders) {
      this.populateFolders();
    }
    this.populateResources();
  }

  /**
   * Populate the resources local storage
   * @returns {Promise<void>}
   */
  async populateResources() {
    try {
      await this.props.context.port.request("passbolt.resources.update-local-storage");
    } catch (error) {
      console.error(error);
      const message =
        this.props.t("Unable to load/refresh the resources.") + (error?.message ? ` ${error?.message}` : "");
      await this.props.actionFeedbackContext.displayError(message);
    }
  }

  /**
   * Populate the folders local storage
   * @returns {Promise<void>}
   */
  async populateFolders() {
    try {
      await this.props.context.port.request("passbolt.folders.update-local-storage");
    } catch (error) {
      console.error(error);
      const message = this.props.t("Unable to load/refresh the folders.");
      Number(error?.message ? ` ${error?.message}` : "");
      await this.props.actionFeedbackContext.displayError(message);
    }
  }

  /** RESOURCE SEARCH  **/

  /**
   * Search for the resources which matches the given filter and sort them
   * @param filter
   */
  search(filter) {
    // To prevent the filtered resources to be loaded before the columns
    if (this.state.columnsResourceSetting === null) {
      this.setState({ filter });
      return;
    }

    const searchOperations = {
      [ResourceWorkspaceFilterTypes.ROOT_FOLDER]: this.searchByRootFolder.bind(this),
      [ResourceWorkspaceFilterTypes.FOLDER]: this.searchByFolder.bind(this),
      [ResourceWorkspaceFilterTypes.TAG]: this.searchByTag.bind(this),
      [ResourceWorkspaceFilterTypes.GROUP]: this.searchByGroup.bind(this),
      [ResourceWorkspaceFilterTypes.TEXT]: this.searchByText.bind(this),
      [ResourceWorkspaceFilterTypes.ITEMS_I_OWN]: this.searchByItemsIOwn.bind(this),
      [ResourceWorkspaceFilterTypes.PRIVATE]: this.searchByPrivate.bind(this),
      [ResourceWorkspaceFilterTypes.FAVORITE]: this.searchByFavorite.bind(this),
      [ResourceWorkspaceFilterTypes.SHARED_WITH_ME]: this.searchBySharedWithMe.bind(this),
      [ResourceWorkspaceFilterTypes.EXPIRED]: this.searchByExpired.bind(this),
      [ResourceWorkspaceFilterTypes.ALL]: this.searchAll.bind(this),
      [ResourceWorkspaceFilterTypes.NONE]: () => {
        /* No search */
      },
    };

    searchOperations[filter.type](filter);
  }

  /**
   * All filter ( no filter at all )
   * @param {object} filter The All filter
   */
  searchAll(filter) {
    this.sort(this.resources);
    this.setState({ filter, filteredResources: this.resources });
  }

  /**
   * Filter the resources which belongs to the filter root folder
   * @param {object} filter The filter
   */
  searchByRootFolder(filter) {
    const folderResources = this.resources.filter((resource) => !resource.folder_parent_id);
    this.sort(folderResources);
    this.setState({ filter, filteredResources: folderResources });
  }

  /**
   * Filter the resources which belongs to the filter folder
   * @param {object} filter The filter
   */
  searchByFolder(filter) {
    const folderId = filter.payload.folder.id;
    const folderResources = this.resources.filter((resource) => resource.folder_parent_id === folderId);
    this.sort(folderResources);
    this.setState({ filter, filteredResources: folderResources });
  }

  /**
   * Filter the resources which belongs to the filter tag
   * @param {object} filter The filter
   * @return {Array} The resources filter by tag
   */
  searchByTag(filter) {
    const tagId = filter.payload.tag.id;
    const tagResources = this.resources.filter(
      (resource) =>
        resource.tags && resource.tags.length > 0 && resource.tags.filter((tag) => tag.id === tagId).length > 0,
    );
    this.sort(tagResources);
    this.setState({ filter, filteredResources: tagResources });
  }

  /**
   * Filter the resources which textual properties matched some user text words
   * @param {object} filter A textual filter
   */
  searchByText(filter) {
    const text = filter.payload;
    const words = (text && text.split(/\s+/)) || [""];
    const canUseTags = this.props.context.siteSettings.canIUse("tags");
    const foldersMatchCache = {};

    // Test match of some escaped test words against the name / username / uri / description /tags resource properties
    const escapeWord = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = (word) => new RegExp(escapeWord(word), "i");
    const matchWord = (word, value) => wordToRegex(word).test(value);

    const getFolderById = (id) => this.props.context.foldersMapById[id];
    const matchFolderNameProperty = (word, folder) => matchWord(word, folder?.name);
    const matchFolder = (word, folder) =>
      matchFolderNameProperty(word, folder) ||
      (folder?.folder_parent_id && matchFolderCache(word, folder.folder_parent_id));
    const matchFolderCache = (word, id) => {
      const key = word + id;
      if (typeof foldersMatchCache[key] === "undefined") {
        foldersMatchCache[key] = matchFolder(word, getFolderById(id));
      }
      return foldersMatchCache[key];
    };
    const matchTagProperty = (word, resource) => resource.tags?.some((tag) => matchWord(word, tag.slug));
    const matchUrisProperty = (word, resource) => resource.metadata?.uris?.some((uri) => matchWord(word, uri));
    const matchCustomFieldsProperty = (word, resource) =>
      resource.metadata?.custom_fields?.some((customField) => matchWord(word, customField.metadata_key));
    const matchStringProperty = (word, resource) =>
      ["name", "username", "description"].some((key) => matchWord(word, resource.metadata?.[key]));
    const matchResource = (word, resource) =>
      matchStringProperty(word, resource) ||
      matchUrisProperty(word, resource) ||
      (canUseTags && matchTagProperty(word, resource)) ||
      matchCustomFieldsProperty(word, resource) ||
      (resource?.folder_parent_id && matchFolderCache(word, resource.folder_parent_id));
    const matchText = (resource) => words.every((word) => matchResource(word, resource));

    const filteredResources = this.resources.filter(matchText);
    this.sort(filteredResources);
    this.setState({ filter, filteredResources });
  }

  /**
   * Filter the resources which belongs to the filter group
   * @param {object} filter The filter
   */
  searchByGroup(filter) {
    if (this.isFilterEqual(this.state.filter, filter) && Boolean(this.state.filteredResources)) {
      return;
    }

    this.props.loadingContext.add();

    /*
     * Resources filtering is applied after having set the configuration of the filter in the state.
     * It allows Firefox not to loop infinitely because of the local storage update induced by the call of the background page.
     *
     * What seem to happen on Firefox is that the state is not updated on the right time but the local storage onChanged callback is executed.
     * This creates a confusion in the filtering system where we expect resources to be filtered by group but the filter is still on "ALL".
     * The execution order of the callback from the local storage and the state change (that calls componentDidUpdate)
     * produces an infinite loop in Firefox.
     */
    this.setState({ filter, selectedResources: [] }, async () => {
      const resourceIds =
        (await this.props.context.port.request(
          "passbolt.resources.find-all-ids-by-is-shared-with-group",
          filter.payload.group.id,
        )) || [];
      // keep only the resource with the group
      const groupResources = this.resources.filter((resource) => resourceIds.includes(resource.id));
      this.sort(groupResources);
      this.setState({ filteredResources: groupResources });
      this.props.loadingContext.remove();
    });
  }

  /**
   * Search for resources the current user owned
   * @param {object} filter The filter
   */
  searchByItemsIOwn(filter) {
    const filteredResources = this.resources.filter((resource) => resource.permission.type === 15);
    this.sort(filteredResources);
    this.setState({ filter, filteredResources });
  }

  /**
   * Search for user private resources
   * @param {object} filter The filter
   */
  searchByPrivate(filter) {
    const filteredResources = this.resources.filter((resource) => Boolean(resource.personal));
    this.sort(filteredResources);
    this.setState({ filter, filteredResources });
  }

  /**
   * Filter the resources which are the current user favorites one
   * @param {object} filter The filter
   */
  searchByFavorite(filter) {
    const filteredResources = this.resources.filter((resource) => resource.favorite !== null);
    this.sort(filteredResources);
    this.setState({ filter, filteredResources });
  }

  /**
   * Filter the resources which are shared wit the current user
   * @param {object} filter The filter
   */
  searchBySharedWithMe(filter) {
    const filteredResources = this.resources.filter((resource) => resource.permission.type < 15);
    this.sort(filteredResources);
    this.setState({ filter, filteredResources });
  }

  /**
   * Keep the expired resources
   * @param filter A "expired" filter
   */
  searchByExpired(filter) {
    const filteredResources = this.resources.filter(
      (resource) => resource.expired && new Date(resource.expired) <= new Date(),
    );
    this.sort(filteredResources);
    this.setState({ filter, filteredResources });
  }

  /** RESOURCE SELECTION */

  /**
   * Select the given resource as the single selected resources if not already selected as single. Otherwise unselect it
   * @param resource The resource to select
   */
  select(resource) {
    const mustUnselect =
      this.state.selectedResources.length === 1 && this.state.selectedResources[0].id === resource.id;
    this.setState({ selectedResources: mustUnselect ? [] : [resource] });
  }

  /**
   * Select the given resource in a multiple selection mode
   * @param resource
   */
  selectMultiple(resource) {
    const hasNotSameId = (selectedResource) => selectedResource.id !== resource.id;
    const selectionWithoutResource = this.state.selectedResources.filter(hasNotSameId);
    const mustUnselect = this.state.selectedResources.length !== selectionWithoutResource.length;
    const selectedResources = mustUnselect ? selectionWithoutResource : [...this.state.selectedResources, resource];
    this.setState({ selectedResources });
  }

  /**
   * Select the given resource in a range selection mode
   * @param resource
   * @returns {void}
   */
  selectRange(resource) {
    const hasNoSelection = this.state.selectedResources.length === 0;

    if (hasNoSelection) {
      this.setState({ selectedResources: [resource] });
    } else {
      const hasSameId = (resource) => (selectedResource) => selectedResource.id === resource.id;
      const findIndex = (resource) => this.state.filteredResources.findIndex(hasSameId(resource));
      const startRangeIndex = findIndex(this.state.selectedResources[0]);
      const endRangeIndex = findIndex(resource);

      let selectedResources;
      if (startRangeIndex > endRangeIndex) {
        // Down range selection
        selectedResources = this.state.filteredResources.slice(endRangeIndex, startRangeIndex + 1).reverse();
      } else {
        // Up range selection
        selectedResources = this.state.filteredResources.slice(startRangeIndex, endRangeIndex + 1);
      }
      return this.setState({ selectedResources });
    }
  }

  /**
   * Select all the resources
   */
  selectAll() {
    this.setState({ selectedResources: [...this.state.filteredResources] });
  }

  /**
   * Unselect all the resources
   */
  unselectAll() {
    this.setState({ selectedResources: [] });
  }

  /**
   * Navigate to the appropriate url after some resources selection operation
   */
  redirectAfterSelection(selectedResources, filter) {
    // Case of single selected resource
    const hasSingleSelectionNow = selectedResources.length === 1;
    if (hasSingleSelectionNow) {
      const mustRedirect = this.props.location.pathname !== `/app/passwords/view/${selectedResources[0].id}`;
      if (mustRedirect) {
        this.props.history.push(`/app/passwords/view/${selectedResources[0].id}`);
      }
      return;
    }

    // Case of multiple selected resources
    const isFolderFilter = filter.type === ResourceWorkspaceFilterTypes.FOLDER;
    if (isFolderFilter) {
      // Case of folder
      const mustRedirect = this.props.location.pathname !== `/app/folders/view/${filter.payload.folder.id}`;
      if (mustRedirect) {
        this.props.history.push({ pathname: `/app/folders/view/${filter.payload.folder.id}` });
      }
      return;
    }

    // Case of resources filtered by expired
    const isExpiredFilter = filter.type === ResourceWorkspaceFilterTypes.EXPIRED;
    if (isExpiredFilter) {
      const mustRedirect = this.props.location.pathname !== `/app/passwords/filter/expired`;
      if (mustRedirect) {
        this.props.history.push({ pathname: `/app/passwords/filter/expired` });
      }
      return;
    }

    // Case of resources
    const mustRedirect = this.props.location.pathname !== "/app/passwords";
    if (mustRedirect) {
      this.props.history.push({ pathname: `/app/passwords`, state: { filter } });
    }
  }

  /** Resource Sorter **/

  /**
   * Update the resources sorter given a property name
   * @param propertyName
   */
  updateSorter(propertyName) {
    const hasSortPropertyChanged = this.state.sorter.propertyName !== propertyName;
    const asc = hasSortPropertyChanged || !this.state.sorter.asc;
    const sorter = new SorterEntity({ propertyName, asc });
    this.setState({ sorter }, () => this.updateGridSetting());
  }

  /**
   * Sort the resources given the current sorter
   * @param {Array} resources The resources
   */
  sort(resources) {
    const reverseSorter = (sorter) => (s1, s2) => -sorter(s1, s2);
    const baseSorter = (sorter) => (this.state.sorter.asc ? sorter : reverseSorter(sorter));
    const keySorter = (key, sorter) => baseSorter((s1, s2) => sorter(getPropValue(s1, key), getPropValue(s2, key)));
    const stringSorter = (s1, s2) => (s1 || "").localeCompare(s2 || "");
    const arrayStringSorter = (s1, s2) => (s1?.[0] || "").localeCompare(s2?.[0] || "");
    const booleanSorter = (s1, s2) => (s1 === s2 ? 0 : s1 ? -1 : 1);
    const mapSorter = { favorite: booleanSorter, "metadata.uris": arrayStringSorter };
    const sorter = mapSorter[this.state.sorter.propertyName] ?? stringSorter;
    const propertySorter = keySorter(this.state.sorter.propertyName, sorter);
    if (resources !== null) {
      resources.sort(propertySorter);
    }
  }

  /** Resource scrolling **/

  /**
   * Set the resource to scroll to
   * @param resource A resource
   */
  scrollToResource(resource) {
    this.setState({ scrollTo: { resource } });
  }

  /**
   * Set the folder to scroll to
   * @param folder A folder
   */
  scrollToFolder(folder) {
    this.setState({ scrollTo: { folder } });
  }

  /**
   * Unset the resource to scroll to
   */
  scrollNothing() {
    this.setState({ scrollTo: {} });
  }

  /** RESOURCE ACTIVITIES */

  /**
   * Refresh the activities of the current selected resource
   */
  refreshSelectedResourceActivities() {
    this.setState((currentState) => ({
      refresh: { ...currentState.refresh, activities: true },
    }));
  }

  /**
   * Set the resources activitie as refreshed
   */
  setResourceActivitiesAsRefreshed() {
    this.setState((currentState) => ({
      refresh: { ...currentState.refresh, activities: false },
    }));
  }

  /** RESOURCE PERMISSION */

  /**
   * Refresh the permissions of the current selected  resources
   */
  refreshSelectedResourcePermissions() {
    this.setState((currentState) => ({
      refresh: { ...currentState.refresh, permissions: true },
    }));
  }

  /**
   * Set the resources permissions as refreshed
   */
  setResourcesPermissionsAsRefreshed() {
    this.setState((currentState) => ({
      refresh: { ...currentState.refresh, permissions: false },
    }));
  }

  /** RESOURCE IMPORT */

  /**
   * Import the given resource file
   * @param resourceFile A resource file to import
   */
  import(resourceFile) {
    this.setState({ resourceFileToImport: resourceFile });
  }

  /**
   * Update the resource file import result
   * @param result The import result
   */
  updateImportResult(result) {
    this.setState({ resourceFileImportResult: result });
  }

  /** Resource export */

  /**
   * Update the resources / folders to export
   * @param resourcesIds The resources ids to export
   * @param foldersIds The folders ids to export
   */
  updateResourcesToExport({ resourcesIds, foldersIds }) {
    this.setState({ resourcesToExport: { resourcesIds, foldersIds } });
  }

  /**
   * Handle the columns resources configuration
   *
   * @return {Promise<void>}
   */
  async loadGridResourceSetting() {
    const gridUserSettingEntity = await this.gridResourceUserSetting.getSetting();
    // Merge the columns setting collection by ID
    const columnsResourceSetting = ColumnsResourceSettingCollection.createFromDefault(
      gridUserSettingEntity?.columnsSetting,
      { keepUnknownValue: false },
    );
    if (!this.props.context.siteSettings.canIUse("totpResourceTypes")) {
      columnsResourceSetting.removeById(ColumnModelTypes.TOTP);
    }
    if (!this.props.passwordExpiryContext.isFeatureEnabled()) {
      columnsResourceSetting.removeById(ColumnModelTypes.EXPIRED);
    }
    if (!this.canUseFolders) {
      columnsResourceSetting.removeById(ColumnModelTypes.LOCATION);
    }
    const sorter = gridUserSettingEntity?.sorter || this.defaultSorter;
    const rowsSetting = gridUserSettingEntity?.rowsSetting;
    // process the search after the grid setting is loaded
    this.setState({ columnsResourceSetting, sorter, rowsSetting }, async () => {
      this.search(this.state.filter);
      /*
       * we run scrollTo again here as all data is loaded and the previous sort is loaded as well.
       * This make sure that the computed scroll position takes into account the sort and scolls the grid where it should
       */
      const selectedResources = this.state.selectedResources;
      if (selectedResources.length === 1) {
        this.scrollToResource(selectedResources[0]);
      }
    });
  }

  /**
   * Reset the columns settings
   *
   * @return {Promise<void>}
   */
  async resetGridColumnsSettings() {
    await this.gridResourceUserSetting.resetSettings();
    await this.loadGridResourceSetting();
    this.onChangeRowSettingsHeight(this.rowsSetting.height);
  }

  /**
   * Handle change column view
   * @param id The column id
   * @param show The boolean to show or hide column
   */
  handleChangeColumnView(id, show) {
    const columnsResourceSetting = new ColumnsResourceSettingCollection(this.state.columnsResourceSetting.toDto());
    columnsResourceSetting.updateColumnShowValueFromDefault(id, show);
    this.setState({ columnsResourceSetting }, () => this.updateGridSetting());
  }

  /**
   * Handle change columns setting
   * @param columns
   */
  handleChangeColumnsSettings(columns) {
    const columnsResourceSetting = this.state.columnsResourceSetting.deepMerge(
      new ColumnsResourceSettingCollection(columns),
      { keepUnknownValue: false },
    );
    this.setState({ columnsResourceSetting }, () => this.updateGridSetting());
  }

  /**
   * Handle change columns setting
   * @param {string} rowsSettingHeight
   */
  onChangeRowSettingsHeight(rowsSettingHeight) {
    const rowsSetting = new RowsSettingEntity(this.state.rowsSetting);
    rowsSetting.set("height", rowsSettingHeight);
    this.rowsSetting = rowsSetting;
    this.setState({ rowsSetting: rowsSetting.toDto() }, () => this.updateGridSetting());
  }

  /**
   * Update the columns setting
   * @return {Promise<void>}
   */
  async updateGridSetting() {
    const gridUserSettingEntity = new GridUserSettingEntity({
      columns_setting: this.state.columnsResourceSetting.toDto(),
      sorter: this.state.sorter.toDto(),
      rows_setting: this.rowsSetting.toDto(),
    });
    await this.gridResourceUserSetting.setSetting(gridUserSettingEntity);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ResourceWorkspaceContext.Provider value={this.state}>{this.props.children}</ResourceWorkspaceContext.Provider>
    );
  }
}
ResourceWorkspaceContextProvider.displayName = "ResourceWorkspaceContextProvider";
ResourceWorkspaceContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  actionFeedbackContext: PropTypes.object,
  passwordExpiryContext: PropTypes.object, // the password expiry contexts
  rbacContext: PropTypes.any, // The role based access control context
  loadingContext: PropTypes.object, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withRbac(
    withPasswordExpiry(
      withLoading(withActionFeedback(withRouter(withTranslation("common")(ResourceWorkspaceContextProvider)))),
    ),
  ),
);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withResourceWorkspace(WrappedComponent) {
  return class WithResourceWorkspace extends React.Component {
    render() {
      return (
        <ResourceWorkspaceContext.Consumer>
          {(ResourceWorkspaceContext) => (
            <WrappedComponent resourceWorkspaceContext={ResourceWorkspaceContext} {...this.props} />
          )}
        </ResourceWorkspaceContext.Consumer>
      );
    }
  };
}

/**
 * The list of resource workspace search filter types
 */
export const ResourceWorkspaceFilterTypes = {
  NONE: "NONE", // Initial filter at page load
  ALL: "ALL", // All resources
  FOLDER: "FILTER-BY-FOLDER", // Resources in a given folder
  ROOT_FOLDER: "FILTER-BY-ROOT-FOLDER", // Resources at the root folder
  TAG: "FILTER-BY-TAG", // Resources marked with a given tag
  GROUP: "FILTER-BY-GROUP", // Resources shared with a given group
  TEXT: "FILTER-BY-TEXT-SEARCH", // Resources matching some text words
  ITEMS_I_OWN: "FILTER-BY-ITEMS-I-OWN", // Resources the users is owner of
  PRIVATE: "PRIVATE", // User's private resources
  FAVORITE: "FILTER-BY-FAVORITE", // Favorite resources
  SHARED_WITH_ME: "FILTER-BY-SHARED-WITH-ME", // Resources shared with the current user (who is not the owner)
  EXPIRED: "FILTER-BY-EXPIRED", // Resources recently modified
};

/**
 * The list of resource link authorized protocols
 */
export const resourceLinkAuthorizedProtocols = [urlProtocols.HTTPS, urlProtocols.HTTP];
