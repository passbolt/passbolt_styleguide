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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {withRouter} from "react-router-dom";
import {withActionFeedback} from "./ActionFeedbackContext";
import {withLoading} from "./LoadingContext";
import sanitizeUrl, {urlProtocols} from "../lib/Sanitize/sanitizeUrl";
import {DateTime} from "luxon";
import SorterEntity from "../../shared/models/entity/sorter/sorterEntity";
import GridUserSettingEntity from "../../shared/models/entity/gridUserSetting/gridUserSettingEntity";
import GridResourceUserSettingServiceWorkerService
  from "../../shared/services/serviceWorker/gridResourceUserSetting/GridResourceUserSettingServiceWorkerService";
import ColumnsResourceSettingCollection from "../../shared/models/entity/resource/columnsResourceSettingCollection";
import {withPasswordExpiry} from "./PasswordExpirySettingsContext";
import {withRbac} from "../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../shared/services/rbacs/uiActionEnumeration";
import {ColumnModelTypes} from "../../shared/models/column/ColumnModel";
import getPropValue from "../lib/Object/getPropValue";
import {withTranslation} from "react-i18next";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const ResourceWorkspaceContext = React.createContext({
  filter: {
    type: null, // Filter type
    payload: null // Filter payload
  },
  sorter: {
    propertyName: 'modified', // The name of the property to sort on
    asc: false // True if the sort must be descendant
  },
  filteredResources: [], // The current list of filtered resources
  selectedResources: [], // The current list of selected resources
  columnsResourceSetting: [], // The settings of columns for resources
  details: {
    resource: null, // The resource to focus details on
    folder: null, // The folder to focus details on
  },
  scrollTo: {
    resource: null, // The resource to scroll to
    folder: null // The folder to scroll to
  },
  refresh: {
    permissions: false // Flag to force the refresh of the permissions
  },
  resourceFileToImport: null, // The resource file to import
  resourceFileImportResult: null, // The resource file import result
  lockDisplayDetail: true, // lock the detail to display the folder or password sidebar
  resourcesToExport: {
    resourcesIds: null, // The resources ids to export
    foldersIds: null // The folders ids to export
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
    range:  () => {}, // Whenever a resource has been selected in a multiple mode
    single: () => {}// Whenever a single resource has been selected
  },
  onResourceFileToImport: () => {}, // Whenever a resource file will be imported
  onResourceFileImportResult: () => {}, // Whenever the import result has been provided
  onResourcesToExport: () => {}, // Whenever resources and/or folder will be exported
  onGoToResourceUriRequested: () => {}, // Whenever the users wants to follow a resource uri
  onChangeColumnView: () => {}, // Whenever the users wants to show or hide a column
  onChangeColumnsSettings: () => {}, // Whenever the user change the columns configuration
  resetGridColumnsSettings: () => {}, // Whenever the user resets the columns configuration
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
    this.state = this.defaultState;
    this.initializeProperties();
    this.gridResourceUserSetting = new GridResourceUserSettingServiceWorkerService(props.context.port);
  }

  /**
   * Get default sorter
   * @return {object}
   */
  get defaultSorter() {
    return new SorterEntity({
      propertyName: 'modified', // The name of the property to sort on
      asc: false // True if the sort must be descendant
    });
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      filter: {type: ResourceWorkspaceFilterTypes.NONE}, // The current resource search filter
      sorter: this.defaultSorter, // The default sorter
      filteredResources: null, // The current list of filtered resources
      selectedResources: [], // The current list of selected resources
      columnsResourceSetting: null, // The settings of columns for resources
      details: {
        resource: null, // The resource to focus details on
        folder: null, // The folder to focus details on
      },
      scrollTo: {
        resource: null, // The resource to scroll to
        folder: null // The folder to scroll to
      },
      refresh: {
        activities: false, // Flag to force the refresh of the activities
        permissions: false // Flag to force the refresh of the permissions
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
      onResourceDescriptionDecrypted: this.handleResourceDescriptionDecryted.bind(this), // Whenever a resource description has been decrypted
      onResourceShared: this.handleResourceShared.bind(this), // Whenever a resource is shared
      onResourcePermissionsRefreshed:  this.handleResourcePermissionsRefreshed.bind(this), // Whenever the resource permissions have been refreshed
      onResourceCopied: this.handleResourceCopied.bind(this), // Whenever a resource (password) has been copied
      onResourcePreviewed: this.handleResourcePreviewed.bind(this), // Whenever a resource (password) has been copied
      onResourceActivitiesRefreshed: this.handleResourceActivitiesRefreshed.bind(this), // Whenever the resource activities have been refreshed
      onSorterChanged: this.handleSorterChange.bind(this), // Whenever the sorter changed
      onResourceSelected: {
        all: this.handleAllResourcesSelected.bind(this), // Whenever all the resources have been selected
        none: this.handleNoneResourcesSelected.bind(this), // Whenever none resources have been selected
        multiple: this.handleMultipleResourcesSelected.bind(this), // Whenever a resource has been selected in a multiple mode
        range:  this.handleResourceRangeSelected.bind(this), // Whenever a resource has been selected in a multiple mode
        single: this.handleResourceSelected.bind(this)// Whenever a single resource has been selected
      },
      onResourceFileToImport: this.handleResourceFileToImport.bind(this), // Whenever a resource file will be imported
      onResourceFileImportResult: this.handleResourceFileImportResult.bind(this), // Whenever the import result has been provided
      onResourcesToExport: this.handleResourcesToExportChange.bind(this), // Whenever resources and/or folder have to be exported
      onGoToResourceUriRequested: this.onGoToResourceUriRequested.bind(this), // Whenever the users wants to follow a resource uri
      onChangeColumnView: this.handleChangeColumnView.bind(this), // Whenever the users wants to show or hide a column
      onChangeColumnsSettings: this.handleChangeColumnsSettings.bind(this), // Whenever the user change the columns configuration
      resetGridColumnsSettings: this.resetGridColumnsSettings.bind(this), // Whenever the user resets the columns configuration
    };
  }

  /**
   * Initialize class properties out of the state ( for performance purpose )
   */
  initializeProperties() {
    this.resources = null; // A cache of the last known list of resources from the App context
    this.folders = null; // A cache of the last known list of folders from the App context
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
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   * @param prevState
   */
  async componentDidUpdate(prevProps, prevState) {
    await this.handleResourcesLoaded();
    await this.handleFoldersChange();
    await this.handleResourcesChange();
    await this.handleRouteChange(prevProps.location);
    await this.handleFilterChange(prevState.filter);
    await this.redirectAfterSelection();
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
   * @return {Promise<void>}
   */
  async handleFilterChange(previousFilter) {
    const hasFilterChanged = !this.isFilterEqual(previousFilter, this.state.filter);
    if (hasFilterChanged) {
      // Avoid a side-effect whenever one inputs a specific resource url (it unselect the resource otherwise )
      const isNonePreviousFilter = previousFilter.type === ResourceWorkspaceFilterTypes.NONE;
      if (isNonePreviousFilter) {
        return;
      }
      await this.unselectAll();

      if (this.state.filter.type !== ResourceWorkspaceFilterTypes.GROUP) {
        this.populate();
      }
    }
  }

  /**
   * Whenever the folders change
   */
  async handleFoldersChange() {
    const hasFoldersChanged = this.props.context.folders !== this.folders;
    if (hasFoldersChanged) {
      this.folders = this.props.context.folders;
      await this.refreshSearchFilter();
      await this.updateDetails();
    }
  }

  /**
   * Handle the resources changes
   */
  async handleResourcesChange() {
    const hasResourcesChanged = this.props.context.resources && this.props.context.resources !== this.resources;
    if (hasResourcesChanged) {
      this.resources = this.props.context.resources;
      await this.search(this.state.filter);
      await this.updateDetails();
      await this.unselectUnknownResources();
    }
  }

  /**
   * Handle the route location change
   * @param previousLocation Previous router location
   */
  async handleRouteChange(previousLocation) {
    const hasLocationChanged = this.props.location.key !== previousLocation.key;
    const isBrowserClosing = !this.props.location.key; // The key property is undefined when the browser history is initialized or destroyed
    const isAppFirstLoad = this.state.filter.type === ResourceWorkspaceFilterTypes.NONE;
    if ((hasLocationChanged || isAppFirstLoad) && !isBrowserClosing) {
      await this.handleFolderRouteChange();
      await this.handleResourceRouteChange();
    }
  }

  /**
   * Handle the folder view route change
   * E.g. /folder/view.:filterByFolderId
   */
  async handleFolderRouteChange() {
    if (this.props.context.folders === null) {
      return;
    }

    const folderId = this.props.match.params.filterByFolderId;
    if (!folderId) {
      return;
    }

    const folder = this.props.context.folders.find(folder => folder.id === folderId);
    // Unknown folder
    if (!folder) {
      this.handleUnknownFolder();
      return;
    }

    // Known folder
    await this.search({type: ResourceWorkspaceFilterTypes.FOLDER, payload: {folder}});

    // Multiple resource selected, do not show details folder
    const hasMultipleResourceSelected = this.state.selectedResources.length > 1;
    if (hasMultipleResourceSelected) {
      return;
    }

    await this.scrollToFolder(folder);
    await this.detailFolder(folder);
  }

  /**
   * Handle the resource view route change
   */
  async handleResourceRouteChange() {
    const isResourceLocation = this.props.location.pathname.includes('passwords');
    if (!isResourceLocation) {
      return;
    }

    const isExpiredResourceLocation = this.props.match.params?.filterType === "expired";
    if (isExpiredResourceLocation) {
      this.handleExpiredResourceRouteChange();
      return;
    }

    const resourceId = this.props.match.params.selectedResourceId;
    if (resourceId) { // Case of password view
      this.handleSingleResourceRouteChange(resourceId);
      return;
    }

    // Case of all and applied filters
    this.handleAllResourceRouteChange();
  }

  /**
   * Handle the resource view route change with a resource id
   * E.g. /passwords/view/:resourceId
   */
  async handleSingleResourceRouteChange(resourceId) {
    const hasResources = this.resources !== null;
    if (hasResources) {
      const resource = this.resources.find(resource => resource.id === resourceId);
      const hasNoneFilter = this.state.filter.type === ResourceWorkspaceFilterTypes.NONE;
      if (hasNoneFilter) { // Case of password view by url bar inputting
        await this.search({type: ResourceWorkspaceFilterTypes.ALL});
      }

      // If the resource does not exist , it should display an error
      if (resource) {
        await this.selectFromRoute(resource);
        await this.scrollToResource(resource);
        await this.detailResource(resource);
      } else {
        this.handleUnknownResource();
      }
    }
  }

  /**
   * Handle the resource view route change without a resource id in the path
   * E.g. /password
   */
  async handleAllResourceRouteChange() {
    const hasResources = this.resources !== null;
    if (!hasResources) {
      return;
    }

    const filter = this.props.location.state?.filter || {type: ResourceWorkspaceFilterTypes.ALL};
    const isSameFilter = this.state.filter === filter;
    await this.detailNothing();
    if (!isSameFilter) {
      await this.search(filter);
    }
  }

  /**
   * Handle the resource view route change for expired resources in the path
   * E.g. /password/expired
   */
  async handleExpiredResourceRouteChange() {
    const hasResources = this.resources !== null;
    if (!hasResources) {
      return;
    }
    const filter = {type: ResourceWorkspaceFilterTypes.EXPIRED};
    const isSameFilter = this.state.filter === filter;
    await this.detailNothing();
    if (!isSameFilter) {
      await this.search(filter);
    }
  }

  /**
   * Handle the lock detail to display it or not
   * @returns {Promise<void>}
   */
  async handleLockDetail() {
    const lockDisplayDetail = !this.state.lockDisplayDetail;
    this.setState({lockDisplayDetail});
  }

  /**
   * Handle an unknown resource ( passe by route parameter resource identifier )
   */
  handleUnknownResource() {
    this.props.actionFeedbackContext.displayError("The resource does not exist");
    this.props.history.push({pathname: `/app/passwords`});
  }

  /**
   * Handle an unknown folder (passed by route parameter folder identifier)
   */
  handleUnknownFolder() {
    this.props.actionFeedbackContext.displayError("The folder does not exist");
    this.props.history.push({pathname: `/app/passwords`});
  }

  /**
   * Handle the scrolling of a resource
   */
  async handleResourceScrolled() {
    await this.scrollNothing();
  }

  /**
   * Handle the scrolling of a folder
   */
  async handleFolderScrolled() {
    await this.scrollNothing();
  }

  /**
   * Handle the edited resource
   */
  async handleResourceEdited() {
    await this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the edited resource description
   */
  async handleResourceDescriptionEdited() {
    await this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the decrypted resource description
   */
  async handleResourceDescriptionDecryted() {
    await this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the shared resource
   */
  async handleResourceShared() {
    await this.refreshSelectedResourceActivities();
    await this.refreshSelectedResourcePermissions();
  }

  /**
   * Handle the refresh of the resource permission
   */
  async handleResourcePermissionsRefreshed() {
    await this.setResourcesPermissionsAsRefreshed();
  }

  /**
   * Handle the copied resource
   */
  async handleResourceCopied() {
    await this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the previewed resource
   */
  async handleResourcePreviewed() {
    await this.refreshSelectedResourceActivities();
  }

  /**
   * Handle the refresh of the resource activitie
   * @returns {Promise<void>}
   */
  async handleResourceActivitiesRefreshed() {
    await this.setResourceActivitiesAsRefreshed();
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param propertyName The name of the property to sort on
   */
  async handleSorterChange(propertyName) {
    await this.updateSorter(propertyName);
    await this.sort();
  }

  /**
   * Handle the all resource selection
   */
  async handleAllResourcesSelected() {
    await this.selectAll();
    await this.detailNothing();
  }

  /**
   * Handle the none resource selection
   */
  async handleNoneResourcesSelected() {
    await this.unselectAll();
    const {filter} = this.state;
    const isFolderFilter = filter.type === ResourceWorkspaceFilterTypes.FOLDER;
    if (isFolderFilter) { // Case of folder filter after unselect, should display folder details
      await this.handleFolderRouteChange();
      return;
    }
    await this.detailNothing();
  }

  /**
   * Handle the resource selection in a multiple mode
   * @param resource The selected resource
   */
  async handleMultipleResourcesSelected(resource) {
    await this.selectMultiple(resource);
    await this.detailsResourceIfSingleSelection();
  }

  /**
   * Handle the resource selection in a range mode
   * @param resource The selected resource
   */
  async handleResourceRangeSelected(resource) {
    await this.selectRange(resource);
  }

  /**
   * Handle the single resource selection
   * @param resource The selected resource
   */
  async handleResourceSelected(resource) {
    await this.select(resource);
  }

  /**
   * Handle the wait for the initial resources to be loaded
   */
  handleResourcesWaitedFor() {
    this.props.loadingContext.add();
  }

  /**
   * Handle the intial loading of the resources
   */
  handleResourcesLoaded() {
    const hasResourcesBeenInitialized = this.resources === null && this.props.context.resources;
    if (hasResourcesBeenInitialized) {
      this.props.loadingContext.remove();
      this.handleResourcesLoaded = () => {};
    }
  }

  /**
   * Handle the will to import a resource file
   */
  async handleResourceFileToImport(resourceFile) {
    await this.import(resourceFile);
  }

  /**
   * Handle the resource file import result
   * @param result The import result
   */
  async handleResourceFileImportResult(result) {
    await this.updateImportResult(result);
  }

  /**
   * Whenever the resources / folders to export change
   * @param resourcesIds The resources ids to export
   * @param foldersIds The folders ids to export
   */
  async handleResourcesToExportChange({resourcesIds, foldersIds}) {
    await this.updateResourcesToExport({resourcesIds, foldersIds});
  }

  /**
   * Whenever the users wants to follow a resource uri
   * @param {string} uri The uri to follow
   */
  onGoToResourceUriRequested(uri) {
    const safeUri = sanitizeUrl(uri, {
      whiteListedProtocols: resourceLinkAuthorizedProtocols,
      defaultProtocol: urlProtocols.HTTPS
    });

    if (safeUri) {
      window.open(safeUri, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Check if the user can use folders.
   * @returns {boolean}
   */
  get canUseFolders() {
    return this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
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
      const message = this.props.t("Unable to load/refresh the resources.")
        + (error?.message ? ` ${error?.message}` : "");
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
  async search(filter) {
    // To prevent the filtered resources to be loaded before the columns
    if (this.state.columnsResourceSetting === null) {
      this.setState({filter});
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
      [ResourceWorkspaceFilterTypes.SHARED_WITH_ME]: this.seachBySharedWithMe.bind(this),
      [ResourceWorkspaceFilterTypes.EXPIRED]: this.seachByExpired.bind(this),
      [ResourceWorkspaceFilterTypes.ALL]: this.searchAll.bind(this),
      [ResourceWorkspaceFilterTypes.NONE]: () => { /* No search */ }
    };

    await searchOperations[filter.type](filter);

    await this.sort();
  }

  /**
   * All filter ( no filter at all )
   * @param filter The All filter
   */
  searchAll(filter) {
    this.setState({filter, filteredResources: this.resources}, this.sort);
  }

  /**
   * Filter the resources which belongs to the filter root folder
   */
  searchByRootFolder(filter) {
    const folderResources = this.resources.filter(resource => ! resource.folder_parent_id);
    this.setState({filter, filteredResources: folderResources}, this.sort);
  }


  /**
   * Filter the resources which belongs to the filter folder
   */
  searchByFolder(filter) {
    const folderId = filter.payload.folder.id;
    const folderResources = this.resources.filter(resource => resource.folder_parent_id === folderId);
    this.setState({filter, filteredResources: folderResources}, this.sort);
  }

  /**
   * Filter the resources which belongs to the filter tag
   */
  searchByTag(filter) {
    const tagId = filter.payload.tag.id;
    const tagResources = this.resources.filter(resource => resource.tags && resource.tags.length > 0 && resource.tags.filter(tag => tag.id === tagId).length > 0);
    this.setState({filter, filteredResources: tagResources}, this.sort);
  }

  /**
   * Filter the resources which textual properties matched some user text words
   * @param filter A textual filter
   */
  searchByText(filter) {
    const text = filter.payload;
    const words =  (text && text.split(/\s+/)) || [''];
    const canUseTags = this.props.context.siteSettings.canIUse("tags");
    const foldersMatchCache = {};

    // Test match of some escaped test words against the name / username / uri / description /tags resource properties
    const escapeWord = word =>  word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = word =>  new RegExp(escapeWord(word), 'i');
    const matchWord = (word, value) => wordToRegex(word).test(value);

    const getFolderById = id => this.props.context.foldersMapById[id];
    const matchFolderNameProperty = (word, folder) => matchWord(word, folder?.name);
    const matchFolder = (word, folder) => matchFolderNameProperty(word, folder) || (folder?.folder_parent_id && matchFolderCache(word, folder.folder_parent_id));
    const matchFolderCache = (word, id) => {
      const key = word + id;
      if (typeof foldersMatchCache[key] === "undefined") {
        foldersMatchCache[key] = matchFolder(word, getFolderById(id));
      }
      return foldersMatchCache[key];
    };
    const matchTagProperty = (word, resource) => resource.tags?.some(tag => matchWord(word, tag.slug));
    const matchUrisProperty = (word, resource) => resource.metadata?.uris?.some(uri => matchWord(word, uri));
    const matchStringProperty = (word, resource) => ['name', 'username', 'description'].some(key => matchWord(word, resource.metadata?.[key]));
    const matchResource = (word, resource) => matchStringProperty(word, resource) || matchUrisProperty(word, resource) || (canUseTags && matchTagProperty(word, resource)) || (resource?.folder_parent_id && matchFolderCache(word, resource.folder_parent_id));
    const matchText = resource => words.every(word => matchResource(word, resource));

    const filteredResources = this.resources.filter(matchText);
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Filter the resources which belongs to the filter group
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
    this.setState({filter, selectedResources: []}, async() => {
      const resourceIds = await this.props.context.port.request('passbolt.resources.find-all-ids-by-is-shared-with-group', filter.payload.group.id) || [];
      // keep only the resource with the group
      const groupResources = this.resources.filter(resource => resourceIds.includes(resource.id));
      this.setState({filteredResources: groupResources}, this.sort);
      this.props.loadingContext.remove();
    });
  }

  /**
   * Search for resources the current user owned
   * @param filter The filter
   */
  searchByItemsIOwn(filter) {
    const filteredResources = this.resources.filter(resource => resource.permission.type === 15);
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Search for user private resources
   * @param filter The filter
   */
  searchByPrivate(filter) {
    const filteredResources = this.resources.filter(resource => Boolean(resource.personal));
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Filter the resources which are the current user favorites one
   */
  searchByFavorite(filter) {
    const filteredResources = this.resources.filter(resource => resource.favorite !== null);
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Filter the resources which are shared wit the current user
   */
  seachBySharedWithMe(filter) {
    const filteredResources = this.resources.filter(resource => resource.permission.type < 15);
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Keep the most recently modified resources ( current state: just sort everything with the most recent modified resource )
   * @param filter A recently modified filter
   */
  searchByRecentlyModified(filter) {
    const recentlyModifiedSorter = (resource1, resource2) => DateTime.fromISO(resource2.modified) < DateTime.fromISO(resource1.modified) ? -1 : 1;
    const filteredResources = this.resources.sort(recentlyModifiedSorter);
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Keep the expired resources
   * @param filter A "expired" filter
   */
  seachByExpired(filter) {
    const filteredResources = this.resources.filter(resource => resource.expired && new Date(resource.expired) <= new Date());
    this.setState({filter, filteredResources}, this.sort);
  }

  /**
   * Refresh the filter in case of its payload is outdated due to the updated list of resources
   */
  async refreshSearchFilter() {
    const hasFolderFilter = this.state.filter.type === ResourceWorkspaceFilterTypes.FOLDER;
    if (hasFolderFilter) {
      const isFolderStillExist = this.folders.some(folder => folder.id === this.state.filter.payload.folder.id);
      if (isFolderStillExist) { // Case of folder exists but may have somme applied changes on it
        const updatedFolder = this.folders.find(folder => folder.id === this.state.filter.payload.folder.id);
        const filter = Object.assign(this.state.filter, {payload: {folder: updatedFolder}});
        await this.setState({filter});
      } else { // Case of filter folder deleted
        const filter = {type: ResourceWorkspaceFilterTypes.ALL};
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
      }
    }
  }

  /** RESOURCE SELECTION */

  /**
   * Select the given resource as the single selected resources if not already selected as single. Otherwise unselect it
   * @param resource The resource to select
   */
  async select(resource) {
    const mustUnselect = this.state.selectedResources.length === 1 && this.state.selectedResources[0].id === resource.id;
    await this.setState({selectedResources: mustUnselect ? [] : [resource]});
  }

  /**
   * Selects the given resource when one comes from the navigation route
   * @param resource
   * @returns {Promise<void>}
   */
  async selectFromRoute(resource) {
    const isAlreadySelected = this.state.selectedResources.length === 1 && this.state.selectedResources[0].id === resource.id;
    if (!isAlreadySelected) {
      const selectedResources = [resource];
      await this.setState({selectedResources});
    }
  }

  /**
   * Select the given resource in a multiple selection mode
   * @param resource
   * @returns {Promise<void>}
   */
  async selectMultiple(resource) {
    const hasNotSameId = selectedResource => selectedResource.id !== resource.id;
    const selectionWithoutResource = this.state.selectedResources.filter(hasNotSameId);
    const mustUnselect = this.state.selectedResources.length !== selectionWithoutResource.length;
    const selectedResources = mustUnselect ? selectionWithoutResource : [...this.state.selectedResources, resource];
    await this.setState({selectedResources});
  }

  /**
   * Select the given resource in a range selection mode
   * @param resource
   * @returns {Promise<void>}
   */
  async selectRange(resource) {
    const hasNoSelection = this.state.selectedResources.length === 0;

    if (hasNoSelection) {
      await this.select(resource);
    } else {
      const hasSameId = resource => selectedResource => selectedResource.id === resource.id;
      const findIndex = resource => this.state.filteredResources.findIndex(hasSameId(resource));
      const startRangeIndex = findIndex(this.state.selectedResources[0]);
      const endRangeIndex = findIndex(resource);

      let selectedResources;
      if (startRangeIndex > endRangeIndex) { // Down range selection
        selectedResources = this.state.filteredResources.slice(endRangeIndex, startRangeIndex + 1).reverse();
      } else { // Up range selection
        selectedResources = this.state.filteredResources.slice(startRangeIndex, endRangeIndex + 1);
      }
      await this.setState({selectedResources});
    }
  }

  /**
   * Select all the resources
   */
  async selectAll() {
    await this.setState({selectedResources: [...this.state.filteredResources]});
  }

  /**
   * Unselect all the resources
   */
  async unselectAll() {
    const hasSelectedResources = this.state.selectedResources.length !== 0;
    if (hasSelectedResources) {
      await this.setState({selectedResources: []});
    }
  }

  /**
   * Remove from the selected resources those which are not known resources in regard of the current resources list
   */
  async unselectUnknownResources() {
    const matchId = selectedResource => resource => resource.id === selectedResource.id;
    const matchSelectedResource = selectedResource => this.state.selectedResources.some(matchId(selectedResource));
    const resources = this.resources.filter(matchSelectedResource);
    const matchFilteredResources = resource => this.state.filteredResources.includes(resource);
    const selectedResources = resources.filter(matchFilteredResources);
    await this.setState({selectedResources});
  }

  /**
   * Navigate to the appropriate url after some resources selection operation
   */
  redirectAfterSelection() {
    const contentLoaded = this.resources !== null && (!this.canUseFolders || this.folders !== null);
    if (!contentLoaded) {
      return;
    }

    // Case of single selected resource
    const hasSingleSelectionNow = this.state.selectedResources.length === 1;
    if (hasSingleSelectionNow) {
      const mustRedirect = this.props.location.pathname !== `/app/passwords/view/${this.state.selectedResources[0].id}`;
      if (mustRedirect) {
        this.props.history.push(`/app/passwords/view/${this.state.selectedResources[0].id}`);
      }
      return;
    }

    // Case of multiple selected resources
    const {filter} = this.state;
    const isFolderFilter = filter.type === ResourceWorkspaceFilterTypes.FOLDER;
    if (isFolderFilter) { // Case of folder
      const mustRedirect = this.props.location.pathname !== `/app/folders/view/${this.state.filter.payload.folder.id}`;
      if (mustRedirect) {
        this.props.history.push({pathname: `/app/folders/view/${this.state.filter.payload.folder.id}`});
      }
      return;
    }

    // Case of resources filtered by expired
    const isExpiredFilter = filter.type === ResourceWorkspaceFilterTypes.EXPIRED;
    if (isExpiredFilter) {
      const mustRedirect = this.props.location.pathname !== `/app/passwords/filter/expired`;
      if (mustRedirect) {
        this.props.history.push({pathname: `/app/passwords/filter/expired`});
      }
      return;
    }

    // Case of resources
    const mustRedirect = this.props.location.pathname !== '/app/passwords';
    if (mustRedirect) {
      this.props.history.push({pathname: `/app/passwords`, state: {filter}});
    }
  }

  /** Resource Sorter **/

  /**
   * Update the resources sorter given a property name
   * @param propertyName
   */
  async updateSorter(propertyName) {
    const hasSortPropertyChanged = this.state.sorter.propertyName !== propertyName;
    const asc = hasSortPropertyChanged || !this.state.sorter.asc;
    const sorter = new SorterEntity({propertyName, asc});
    this.setState({sorter}, () => this.updateGridSetting());
  }

  /**
   * Reset the user sorter
   */
  async resetSorter() {
    const sorter = new SorterEntity({propertyName: 'modified', asc: false});
    this.setState({sorter}, () => this.updateGridSetting());
  }

  /**
   * Sort the resources given the current sorter
   */
  async sort() {
    const reverseSorter = sorter => (s1, s2) => -sorter(s1, s2);
    const baseSorter =  sorter => this.state.sorter.asc ? sorter : reverseSorter(sorter);
    const keySorter = (key, sorter) => baseSorter((s1, s2) => sorter(getPropValue(s1, key), getPropValue(s2, key)));
    const stringSorter = (s1, s2) => (s1 || "").localeCompare(s2 || "");
    const booleanSorter = (s1, s2) => s1 === s2 ? 0 : s1 ? -1 : 1;
    const sorter = this.state.sorter.propertyName === "favorite" ? booleanSorter : stringSorter;
    const propertySorter = keySorter(this.state.sorter.propertyName, sorter);
    if (this.state.filteredResources !== null) {
      await this.setState({filteredResources: [...this.state.filteredResources.sort(propertySorter)]});
    }
  }

  /** RESOURCE DETAILS  **/

  /**
   * Set the details focus on the given folder
   * @param folder The folder to focus on
   */
  async detailFolder(folder) {
    await this.setState({details: {folder: folder, resource: null}});
  }

  /**
   * Set the details focus on the given resource
   * @param resource The resource to focus on
   */
  async detailResource(resource) {
    await this.setState({details: {folder: null, resource: resource}});
  }

  /**
   * Remove the details on something
   */
  async detailNothing() {
    const hasDetails = this.state.details.resource || this.state.details.folder;
    if (hasDetails) {
      await this.setState({details: {folder: null, resource: null}});
    }
  }

  /**
   * Set the details focus on the selected resource if it's the only one selected
   * @returns {Promise<void>}
   */
  async detailsResourceIfSingleSelection() {
    const hasSingleSelection = this.state.selectedResources.length === 1;
    if (hasSingleSelection) {
      await this.detailResource(this.state.selectedResources[0]);
    } else {
      await this.detailNothing();
    }
  }

  /**
   * Update the current details with the current list of resources or folders
   */
  async updateDetails() {
    const hasDetails = this.state.details.resource || this.state.details.folder;
    if (hasDetails) {
      const hasResourceDetails = this.state.details.resource;
      if (hasResourceDetails) { // Case of resource details
        const updatedResourceDetails = this.resources.find(resource => resource.id === this.state.details.resource.id);
        await this.setState({details: {resource: updatedResourceDetails}});
      } else { // Case of folder details
        const updatedFolderDetails = this.folders.find(folder => folder.id === this.state.details.folder.id);
        await this.setState({details: {folder: updatedFolderDetails}});
      }
    }
  }

  /** Resource scrolling **/

  /**
   * Set the resource to scroll to
   * @param resource A resource
   */
  async scrollToResource(resource) {
    await this.setState({scrollTo: {resource}});
  }

  /**
   * Set the folder to scroll to
   * @param folder A folder
   */
  async scrollToFolder(folder) {
    await this.setState({scrollTo: {folder}});
  }

  /**
   * Unset the resource to scroll to
   */
  async scrollNothing() {
    await this.setState({scrollTo: {}});
  }

  /** RESOURCE ACTIVITIES */

  /**
   * Refresh the activities of the current selected resource
   */
  async refreshSelectedResourceActivities() {
    const refresh = Object.assign({}, this.state.refresh, {activities: true});
    await this.setState({refresh});
  }

  /**
   * Set the resources activitie as refreshed
   */
  async setResourceActivitiesAsRefreshed() {
    const refresh = Object.assign({}, this.state.refresh, {activities: false});
    await this.setState({refresh});
  }

  /** RESOURCE PERMISSION */

  /**
   * Refresh the permissions of the current selected  resources
   */
  async refreshSelectedResourcePermissions() {
    const refresh = Object.assign({}, this.state.refresh, {permissions: true});
    await this.setState({refresh});
  }

  /**
   * Set the resources permissions as refreshed
   */
  async setResourcesPermissionsAsRefreshed() {
    const refresh = Object.assign({}, this.state.refresh, {permissions: false});
    await this.setState({refresh});
  }

  /** RESOURCE IMPORT */

  /**
   * Import the given resource file
   * @param resourceFile A resource file to import
   */
  async import(resourceFile) {
    await this.setState({resourceFileToImport: resourceFile});
  }

  /**
   * Update the resource file import result
   * @param result The import result
   */
  async updateImportResult(result) {
    await this.setState({resourceFileImportResult: result});
  }

  /** Resource export */

  /**
   * Update the resources / folders to export
   * @param resourcesIds The resources ids to export
   * @param foldersIds The folders ids to export
   */
  async updateResourcesToExport({resourcesIds, foldersIds}) {
    await this.setState({resourcesToExport: {resourcesIds, foldersIds}});
  }

  /**
   * Handle the columns resources configuration
   *
   * @return {Promise<void>}
   */
  async loadGridResourceSetting() {
    const gridUserSettingEntity = await this.gridResourceUserSetting.getSetting();
    // Merge the columns setting collection by ID
    const columnsResourceSetting = ColumnsResourceSettingCollection.createFromDefault(gridUserSettingEntity?.columnsSetting, {keepUnknownValue: false});
    if (!this.props.context.siteSettings.canIUse('totpResourceTypes')) {
      columnsResourceSetting.removeById(ColumnModelTypes.TOTP);
    }
    if (!this.props.passwordExpiryContext.isFeatureEnabled()) {
      columnsResourceSetting.removeById(ColumnModelTypes.EXPIRED);
    }
    if (!this.canUseFolders) {
      columnsResourceSetting.removeById(ColumnModelTypes.LOCATION);
    }
    const sorter = gridUserSettingEntity?.sorter || this.defaultSorter;
    // process the search after the grid setting is loaded
    this.setState({columnsResourceSetting, sorter}, async() => {
      await this.search(this.state.filter);
      /*
       * we run scrollTo again here as all data is loaded and the previous sort is loaded as well.
       * This make sure that the computed scroll position takes into account the sort and scolls the grid where it should
       */
      const selectedResources = this.state.selectedResources;
      if (selectedResources.length === 1) {
        await this.scrollToResource(selectedResources[0]);
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
  }

  /**
   * Handle change column view
   * @param id The column id
   * @param show The boolean to show or hide column
   */
  async handleChangeColumnView(id, show) {
    const columnsResourceSetting = new ColumnsResourceSettingCollection(this.state.columnsResourceSetting.toDto());
    columnsResourceSetting.updateColumnShowValueFromDefault(id, show);
    this.setState({columnsResourceSetting}, () => this.updateGridSetting());
  }

  /**
   * Handle change columns setting
   * @param columns
   */
  async handleChangeColumnsSettings(columns) {
    // Merge the columns setting
    const columnsResourceSetting = this.state.columnsResourceSetting.deepMerge(new ColumnsResourceSettingCollection(columns), {keepUnknownValue: false});
    this.setState({columnsResourceSetting}, () => this.updateGridSetting());
  }

  /**
   * Update the columns setting
   * @return {Promise<void>}
   */
  async updateGridSetting() {
    const gridUserSettingEntity = new GridUserSettingEntity({columns_setting: this.state.columnsResourceSetting.toDto(), sorter: this.state.sorter.toDto()});
    await this.gridResourceUserSetting.setSetting(gridUserSettingEntity);
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ResourceWorkspaceContext.Provider value={this.state}>
        {this.props.children}
      </ResourceWorkspaceContext.Provider>
    );
  }
}
ResourceWorkspaceContextProvider.displayName = 'ResourceWorkspaceContextProvider';
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

export default withAppContext(withRbac(withPasswordExpiry(withLoading(withActionFeedback(withRouter(withTranslation('common')(ResourceWorkspaceContextProvider)))))));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withResourceWorkspace(WrappedComponent) {
  return class WithResourceWorkspace extends React.Component {
    render() {
      return (
        <ResourceWorkspaceContext.Consumer>
          {
            ResourceWorkspaceContext => <WrappedComponent resourceWorkspaceContext={ResourceWorkspaceContext} {...this.props} />
          }
        </ResourceWorkspaceContext.Consumer>
      );
    }
  };
}

/**
 * The list of resource workspace search filter types
 */
export const ResourceWorkspaceFilterTypes = {
  NONE: 'NONE', // Initial filter at page load
  ALL: 'ALL', // All resources
  FOLDER: 'FILTER-BY-FOLDER', // Resources in a given folder
  ROOT_FOLDER: 'FILTER-BY-ROOT-FOLDER', // Resources at the root folder
  TAG: 'FILTER-BY-TAG', // Resources marked with a given tag
  GROUP: 'FILTER-BY-GROUP', // Resources shared with a given group
  TEXT: 'FILTER-BY-TEXT-SEARCH', // Resources matching some text words
  ITEMS_I_OWN: 'FILTER-BY-ITEMS-I-OWN', // Resources the users is owner of
  PRIVATE: 'PRIVATE', // User's private resources
  FAVORITE: 'FILTER-BY-FAVORITE', // Favorite resources
  SHARED_WITH_ME: 'FILTER-BY-SHARED-WITH-ME', // Resources shared with the current user (who is not the owner)
  EXPIRED: 'FILTER-BY-EXPIRED', // Resources recently modified
};

/**
 * The list of resource link authorized protocols
 */
export const resourceLinkAuthorizedProtocols = [
  urlProtocols.FTP,
  urlProtocols.FTPS,
  urlProtocols.HTTPS,
  urlProtocols.HTTP,
  urlProtocols.SSH
];
