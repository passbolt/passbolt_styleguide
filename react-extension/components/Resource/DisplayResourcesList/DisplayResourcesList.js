/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright s    Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */
import PropTypes from "prop-types";
import React from "react";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import debounce from "debounce-promise";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withRouter} from "react-router-dom";
import DisplayResourcesListContextualMenu from "./DisplayResourcesListContextualMenu";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withDrag} from "../../../contexts/DragContext";
import DisplayDragResource from "./DisplayDragResource";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import GridTable from "../../../../shared/components/Table/GridTable";
import CellFavorite from "../../../../shared/components/Table/CellFavorite";
import CellHeaderIcon from "../../../../shared/components/Table/CellHeaderIcon";
import CellLink from "../../../../shared/components/Table/CellLink";
import CellPassword from "../../../../shared/components/Table/CellPassword";
import CellButton from "../../../../shared/components/Table/CellButton";
import CellHeaderCheckbox from "../../../../shared/components/Table/CellHeaderCheckbox";
import CellCheckbox from "../../../../shared/components/Table/CellChecbox";
import ColumnCheckboxModel from "../../../../shared/models/column/ColumnCheckboxModel";
import ColumnFavoriteModel from "../../../../shared/models/column/ColumnFavoriteModel";
import ColumnNameModel from "../../../../shared/models/column/ColumnNameModel";
import ColumnUsernameModel from "../../../../shared/models/column/ColumnUsernameModel";
import ColumnPasswordModel from "../../../../shared/models/column/ColumnPasswordModel";
import ColumnUriModel from "../../../../shared/models/column/ColumnUriModel";
import ColumnModifiedModel from "../../../../shared/models/column/ColumnModifiedModel";
import ColumnModel from "../../../../shared/models/column/ColumnModel";
import {withProgress} from "../../../contexts/ProgressContext";
import CellTotp from "../../../../shared/components/Table/CellTotp";
import ColumnTotpModel from "../../../../shared/models/column/ColumnTotpModel";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";

/**
 * This component allows to display the filtered resources into a grid
 */
class DisplayResourcesList extends React.Component {
  /**
   * The grid columns
   * @type {array}
   */
  defaultColumns = [];

  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.handleFavoriteClickDebounced = debounce(this.handleFavoriteUpdate, 200);
    this.createRefs();
    this.initColumns(props);
  }

  /**
   * Returns the component default state
   */
  getDefaultState() {
    return {
      columns: [], // The current list of columns to display.
      previewedCellule: {
        columnId: null, // The previewed cellule column id
        resourceId: null, // The previewed cellule resource id
      },
      plaintextSecretDto: null // The plain text secret dto.
    };
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleSelectAllChange = this.handleSelectAllChange.bind(this);
    this.handleResourceSelected = this.handleResourceSelected.bind(this);
    this.handleResourceRightClick = this.handleResourceRightClick.bind(this);
    this.handleResourceDragStartEvent = this.handleResourceDragStartEvent.bind(this);
    this.handleDragEndEvent = this.handleDragEndEvent.bind(this);
    this.handleCheckboxWrapperClick = this.handleCheckboxWrapperClick.bind(this);
    this.handleCopyPasswordClick = this.handleCopyPasswordClick.bind(this);
    this.handleCopyUsernameClick = this.handleCopyUsernameClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSortByColumnClick = this.handleSortByColumnClick.bind(this);
    this.handleChangeColumnsSettings = this.handleChangeColumnsSettings.bind(this);
    this.handleGoToResourceUriClick = this.handleGoToResourceUriClick.bind(this);
    this.handlePreviewPasswordButtonClick = this.handlePreviewPasswordButtonClick.bind(this);
    this.handleCopyTotpClick = this.handleCopyTotpClick.bind(this);
    this.handlePreviewTotpButtonClick = this.handlePreviewTotpButtonClick.bind(this);
    this.getPreviewPassword = this.getPreviewPassword.bind(this);
    this.getPreviewTotp = this.getPreviewTotp.bind(this);
    this.isPasswordResources = this.isPasswordResources.bind(this);
    this.isTotpResources = this.isTotpResources.bind(this);
  }

  /**
   * Init the grid columns.
   */
  initColumns() {
    this.defaultColumns.push(new ColumnCheckboxModel({cellRenderer: {component: CellCheckbox, props: {onClick: this.handleCheckboxWrapperClick}}, headerCellRenderer: {component: CellHeaderCheckbox, props: {onChange: this.handleSelectAllChange}}}));
    this.defaultColumns.push(new ColumnFavoriteModel({cellRenderer: {component: CellFavorite, props: {onClick: this.handleFavoriteClick}}, headerCellRenderer: {component: CellHeaderIcon, props: {name: "star"}}}));
    this.defaultColumns.push(new ColumnNameModel({label: this.translate("Name")}));
    this.defaultColumns.push(new ColumnUsernameModel({label: this.translate("Username"), cellRenderer: {component: CellButton, props: {onClick: this.handleCopyUsernameClick}}}));
    this.defaultColumns.push(new ColumnPasswordModel({label: this.translate("Password"), cellRenderer: {component: CellPassword, props: {title: this.translate("secret"), getPreviewPassword: this.getPreviewPassword, canCopy: this.canCopyPassword, canPreview: this.canPreviewPassword, onPasswordClick: this.handleCopyPasswordClick, onPreviewPasswordClick: this.handlePreviewPasswordButtonClick, hasPassword: this.isPasswordResources}}}));
    if (this.props.context.siteSettings.canIUse('totpResourceTypes')) {
      this.defaultColumns.push(new ColumnTotpModel({label: this.translate("TOTP"), cellRenderer: {component: CellTotp, props: {title: this.translate("secret"), getPreviewTotp: this.getPreviewTotp, canCopy: true, canPreview: true, onTotpClick: this.handleCopyTotpClick, onPreviewTotpClick: this.handlePreviewTotpButtonClick, hasTotp: this.isTotpResources}}}));
    }
    this.defaultColumns.push(new ColumnUriModel({label: this.translate("URI"), cellRenderer: {component: CellLink, props: {onClick: this.handleGoToResourceUriClick}}}));
    this.defaultColumns.push(new ColumnModifiedModel({label: this.translate("Modified"), getValue: value => this.formatDateTimeAgo(value.modified)}));
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // If columns resource settings already loaded merge columns
    if (this.columnsResourceSetting !== null) {
      this.mergeAndSortColumns();
    }
  }

  /**
   * Merge and sort columns
   */
  mergeAndSortColumns() {
    // Get the column with id as a key from the column to merge
    const columnsResourceSetting = this.columnsResourceSetting.toHashTable();
    // Merge the column values
    const columns = this.defaultColumns.map(column => Object.assign(new ColumnModel(column), columnsResourceSetting[column.id]));
    // Sort the position of the column, the column with no position will be at the beginning
    columns.sort((columnA, columnB) => (columnA.position || 0) < (columnB.position || 0) ? -1 : 1);
    this.setState({columns});
  }

  /**
   * Whenever the component has been updated
   *
   * @param prevProps The previous props
   */
  componentDidUpdate(prevProps) {
    this.handleResourceScroll();
    // Has a column view change with the previous props
    const hasColumnsResourceViewChange = this.columnsResourceSetting?.hasDifferentShowValue(prevProps.resourceWorkspaceContext.columnsResourceSetting);
    if (hasColumnsResourceViewChange) {
      this.mergeAndSortColumns();
    }
  }

  /**
   * Returns true if the component should be re-rendered
   */
  shouldComponentUpdate(nextProps, nextState) {
    const {filteredResources, selectedResources, sorter, scrollTo, columnsResourceSetting} = this.props.resourceWorkspaceContext;
    const hasFilteredResourcesChanged = nextProps.resourceWorkspaceContext.filteredResources !== filteredResources;
    const hasBothSingleSelection = selectedResources.length === 1 && nextProps.resourceWorkspaceContext.selectedResources.length === 1;
    const hasSingleSelectedResourceChanged = hasBothSingleSelection && selectedResources[0].id !== nextProps.resourceWorkspaceContext.selectedResources[0].id;
    const hasSelectedResourcesLengthChanged = nextProps.resourceWorkspaceContext.selectedResources.length !== selectedResources.length;
    const hasSorterChanged = sorter !== nextProps.resourceWorkspaceContext.sorter;
    const hasResourceToScrollChange = Boolean(scrollTo.resource && scrollTo.resource.id);
    const hasResourcePreviewSecretChange = nextState.previewedCellule !== this.state.previewedCellule;
    const hasResourceColumnsChange = nextState.columns !== this.state.columns;
    const hasColumnsResourceViewChange = nextProps.resourceWorkspaceContext.columnsResourceSetting?.hasDifferentShowValue(columnsResourceSetting);
    const mustHidePreviewPassword = hasFilteredResourcesChanged || hasSingleSelectedResourceChanged || hasSelectedResourcesLengthChanged || hasSorterChanged;
    if (mustHidePreviewPassword) {
      this.hidePreviewedCellule();
    }
    return hasFilteredResourcesChanged ||
      hasSelectedResourcesLengthChanged ||
      hasSingleSelectedResourceChanged ||
      hasSorterChanged ||
      hasResourceToScrollChange ||
      hasResourceColumnsChange ||
      hasColumnsResourceViewChange ||
      hasResourcePreviewSecretChange;
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.tableviewRef = React.createRef();
    this.listRef = React.createRef();
  }

  /**
   * Handle the All resources selection
   * @param event The DOM event
   */
  handleSelectAllChange(event) {
    const checked = event.target.checked;
    const operationName = checked ? "all" : "none";
    this.props.resourceWorkspaceContext.onResourceSelected[operationName]();
  }

  /**
   * Handle the resource selection
   * @param event The DOM event
   * @param resource The selected resource
   */
  async handleResourceSelected(event, resource) {
    await this.selectResource(resource, event);
  }

  /**
   * Handle when the user selects an element in the grid.
   * @param {array} resources The selected resources
   */
  handleSelectResources(resources) {
    const selectedFolders = [];
    const selectedResources = resources;
    this.setState({selectedFolders, selectedResources}, () => {
      if (resources.length === 1) {
        this.props.history.push(`/app/passwords/view/${resources[0].id}`);
      }
    });
  }

  /**
   * Handle the right click on a resource
   * @param event
   * @param resource
   */
  handleResourceRightClick(event, resource) {
    this.handleSelectResources([resource]);
    const left = event.pageX;
    const top = event.pageY;
    const contextualMenuProps = {left, top, resource};
    this.props.contextualMenuContext.show(DisplayResourcesListContextualMenu, contextualMenuProps);
  }

  async handleCheckboxWrapperClick(event, resource) {
    const isRangeSelection = event && event.shiftKey;

    if (isRangeSelection) {
      await this.props.resourceWorkspaceContext.onResourceSelected.range(resource);
    } else {
      await this.props.resourceWorkspaceContext.onResourceSelected.multiple(resource);
    }
  }

  /**
   * Handles the initial resource scroll ( with a specific manual resource url /password/view/:id )
   */
  handleResourceScroll() {
    const resourceToScroll = this.props.resourceWorkspaceContext.scrollTo.resource;
    if (resourceToScroll) {
      this.scrollTo(resourceToScroll.id);
      this.props.resourceWorkspaceContext.onResourceScrolled();
    }
  }

  /**
   * Returns the current list of filtered resources to display
   */
  get resources() {
    return this.props.resourceWorkspaceContext.filteredResources;
  }

  /**
   * Returns the current list of selected resources
   */
  get selectedResources() {
    return this.props.resourceWorkspaceContext.selectedResources;
  }

  /**
   * Get selected resource ids
   * @return {*}
   */
  get selectedResourcesIds() {
    const getIds = resource => resource.id;
    return this.selectedResources.map(getIds);
  }

  /**
   * get columns resource setting
   * @return {ColumnsResourceSettingCollection}
   */
  get columnsResourceSetting() {
    return this.props.resourceWorkspaceContext.columnsResourceSetting;
  }

  /**
   * Get the columns to display
   * @return {[]}
   */
  get columnsFiltered() {
    const filteredByColumnToDisplay = column => column.id === 'checkbox' || column.show;
    return this.state.columns.filter(filteredByColumnToDisplay);
  }

  /**
   * Get the previewed password
   * @param {object} resource The resource
   * @return {string|undefined}
   */
  getPreviewPassword(resource) {
    return this.isCellulePreviewed('password', resource.id) ? this.state.plaintextSecretDto?.password : undefined;
  }

  /**
   * Get preview totp
   * @param {object} resource The resource
   * @return {object|undefined}
   */
  getPreviewTotp(resource) {
    return this.isCellulePreviewed('totp', resource.id) ? this.state.plaintextSecretDto?.totp : undefined;
  }

  /**
   * Handle copy username click
   * @param username
   * @return {Promise<void>}
   */
  async handleCopyUsernameClick(username) {
    await ClipBoard.copy(username, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The username has been copied to clipboard"));
  }

  /**
   * Handle copy password button click.
   * @param {object} resource The resource
   */
  async handleCopyPasswordClick(resource) {
    await this.copyPasswordToClipboard(resource.id);
  }

  /**
   * Handle preview password button click.
   * @param {object} resource The resource to preview the password for
   */
  async handlePreviewPasswordButtonClick(resource) {
    await this.togglePreviewPassword(resource.id);
  }

  /**
   * Handle copy totp button click.
   * @param {object} resource The resource
   */
  async handleCopyTotpClick(resource) {
    await this.copyTotpToClipboard(resource.id);
  }

  /**
   * Handle preview totp button click.
   * @param {object} resource The resource to preview the totp for
   */
  async handlePreviewTotpButtonClick(resource) {
    await this.togglePreviewTotp(resource.id);
  }

  /**
   * Handle copy totp
   * @param resource The resource
   * @return {Promise<void>}
   */
  async copyTotpToClipboard(resourceId) {
    let plaintextSecretDto;
    const isTotpPreviewed = this.isCellulePreviewed('totp', resourceId);
    if (isTotpPreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      this.props.progressContext.open(this.props.t('Decrypting secret'));

      try {
        plaintextSecretDto = await this.decryptResourceSecret(resourceId);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }

      this.props.progressContext.close();
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      await this.props.actionFeedbackContext.displayError(this.translate("The totp is empty and cannot be copied to clipboard."));
      return;
    }

    const code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    await ClipBoard.copy(code, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The totp has been copied to clipboard"));
  }

  /**
   * Copy a resource secret to clipboard.
   * @param {string} resourceId The target resource id
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard(resourceId) {
    let plaintextSecretDto;

    if (this.isCellulePreviewed('password', resourceId)) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      this.props.progressContext.open(this.props.t('Decrypting secret'));

      try {
        plaintextSecretDto = await this.decryptResourceSecret(resourceId);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }

      this.props.progressContext.close();
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto?.password?.length) {
      await this.props.actionFeedbackContext.displayError(this.translate("The password is empty and cannot be copied to clipboard."));
      return;
    }

    await ClipBoard.copy(plaintextSecretDto.password, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been copied to clipboard"));
  }

  /**
   * Toggle preview password for a given resource
   * @param {string} resourceId The resource id to preview the password for
   * @returns {Promise<void>}
   */
  async togglePreviewPassword(resourceId) {
    const isPasswordPreviewedPreviewed = this.isCellulePreviewed('password', resourceId);
    this.hidePreviewedCellule();
    if (!isPasswordPreviewedPreviewed) {
      await this.previewPassword(resourceId);
    }
  }

  /**
   * Hide the previewed cellule.
   */
  hidePreviewedCellule() {
    const previewedCellule = null;
    const plaintextSecretDto = null;
    this.setState({previewedCellule, plaintextSecretDto});
  }

  /**
   * Preview password for a given resource
   * @param {string} resourceId The resource id to preview the password for
   * @returns {Promise<void>}
   */
  async previewPassword(resourceId) {
    let plaintextSecretDto;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    try {
      plaintextSecretDto = await this.decryptResourceSecret(resourceId);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto?.password?.length) {
      await this.props.actionFeedbackContext.displayError(this.translate("The password is empty and cannot be previewed."));
      return;
    }

    const columnId = "password";
    const previewedCellule = {resourceId, columnId};
    this.setState({previewedCellule, plaintextSecretDto});
  }

  /**
   * Toggle preview totp for a given resource
   * @param {string} resourceId The resource id to preview the password for
   * @returns {Promise<void>}
   */
  async togglePreviewTotp(resourceId) {
    const isTotpPreviewedPreviewed = this.isCellulePreviewed('totp', resourceId);
    this.hidePreviewedCellule();
    if (!isTotpPreviewedPreviewed) {
      await this.previewTotp(resourceId);
    }
  }

  /**
   * Preview totp
   * @param {string} resourceId The resource id to preview
   */
  async previewTotp(resourceId) {
    let plaintextSecretDto;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    try {
      plaintextSecretDto = await this.decryptResourceSecret(resourceId);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      await this.props.actionFeedbackContext.displayError(this.translate("The totp is empty and cannot be previewed."));
      return;
    }

    const columnId = "totp";
    const previewedCellule = {resourceId, columnId};
    this.setState({previewedCellule, plaintextSecretDto});
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.props.context.port.request("passbolt.secret.decrypt", resourceId);
  }

  async handleFavoriteClick(resource) {
    await this.handleFavoriteClickDebounced(resource);
  }

  handleFavoriteUpdate(resource) {
    if (resource.favorite === null) {
      this.favoriteResource(resource);
    } else {
      this.unfavoriteResource(resource);
    }
  }

  /**
   * Handle the resource sorter change
   * @param sortProperty The resource property to sort on
   */
  async handleSortByColumnClick(sortProperty) {
    this.props.resourceWorkspaceContext.onSorterChanged(sortProperty);
  }

  /**
   * Handle change columns settings
   * @param columns
   */
  handleChangeColumnsSettings(columns) {
    // remove first column (checkbox is fixed)
    columns.shift();
    this.props.resourceWorkspaceContext.onChangeColumnsSettings(columns);
  }

  /**
   * Handle the drag start on the selected resource
   * @param event The DOM event
   * @param resource The selected resource
   * @param isSelected is resource selected
   * @returns {Promise<void>}
   */
  async handleResourceDragStartEvent(event, resource, isSelected) {
    if (!isSelected) {
      await this.props.resourceWorkspaceContext.onResourceSelected.single(resource);
    }
    const draggedItems = {resources:  this.props.resourceWorkspaceContext.selectedResources, folders: []};
    this.props.dragContext.onDragStart(event, DisplayDragResource, draggedItems);
  }

  /**
   * Handle when the user stop dragging content.
   */
  handleDragEndEvent() {
    this.props.dragContext.onDragEnd();
  }

  /**
   * Select the resource given the selection event.
   * If no event is provided, the selection is considered as multiple
   * @param resource
   * @param event
   */
  async selectResource(resource, event) {
    const isMultipleSelection = event && event.metaKey;
    const isRangeSelection = event && event.shiftKey;
    const hasNoEvent = !event;

    if (hasNoEvent || isMultipleSelection) {
      await this.props.resourceWorkspaceContext.onResourceSelected.multiple(resource);
    } else if (isRangeSelection) {
      await this.props.resourceWorkspaceContext.onResourceSelected.range(resource);
    } else {
      await this.props.resourceWorkspaceContext.onResourceSelected.single(resource);
    }
  }

  async favoriteResource(resource) {
    try {
      await this.props.context.port.request('passbolt.favorite.add', resource.id);
      this.displaySuccessNotification(this.translate("The password has been added as a favorite"));
    } catch (error) {
      this.displayErrorNotification(error.message);
    }
  }

  async unfavoriteResource(resource) {
    try {
      await this.props.context.port.request('passbolt.favorite.delete', resource.id);
      this.displaySuccessNotification(this.translate("The password has been removed from favorites"));
    } catch (error) {
      this.displayErrorNotification(error.message);
    }
  }

  /**
   * Display success notification (toaster)
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Display error notification (toaster)
   * @param message
   */
  displayErrorNotification(message) {
    this.props.actionFeedbackContext.displayError(message);
  }

  scrollTo(resourceId) {
    if (this.listRef.current !== null) {
      const resourceIndex = this.resources.findIndex(resource => resource.id === resourceId);
      const [visibleStartIndex, visibleEndIndex] = this.listRef.current.getVisibleRange();
      const isInvisible = resourceIndex < visibleStartIndex || resourceIndex > visibleEndIndex;

      if (isInvisible) {
        // Important to have the -1 to show the selected column behind the header with sticky position
        this.listRef.current.scrollTo(resourceIndex - 1);
      }
    }
  }

  /**
   * Whenever the user wants to follow a resource uri.
   * @param {object} resource The resource
   */
  handleGoToResourceUriClick(resource) {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(resource);
  }

  /**
   * Check if the password of the given resource is previewed.
   * @param {string} columnId The column id.
   * @param {string} resourceId The resource id.
   * @returns {boolean}
   */
  isCellulePreviewed(columnId, resourceId) {
    return this.state.previewedCellule?.columnId === columnId
      && this.state.previewedCellule?.resourceId === resourceId;
  }

  /**
   * Is password resource
   * @param resource
   * @return {boolean}
   */
  isPasswordResources(resource) {
    // TODO: How to handle if resource type is not enabled or not loaded yet ?
    return this.props.context.resourceTypesSettings?.assertResourceTypeIdHasPassword(resource.resource_type_id);
  }

  /**
   * Is TOTP resource
   * @param resource
   * @return {boolean}
   */
  isTotpResources(resource) {
    return this.props.context.resourceTypesSettings?.assertResourceTypeIdHasTotp(resource.resource_type_id);
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Can preview secret
   * @return {boolean}
   */
  get canPreviewPassword() {
    return this.props.context.siteSettings.canIUse('previewPassword')
    && this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_PREVIEW);
  }

  /**
   * Can copy secret
   * @return {boolean}
   */
  get canCopyPassword() {
    return this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);
  }

  /**
   * Is ready
   * @return {boolean}
   */
  get isReady() {
    return this.resources !== null;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    const isEmpty = this.isReady && this.resources.length === 0;
    const isGridReady = this.isReady && this.columnsFiltered.length !== 0;
    const filterType = this.props.resourceWorkspaceContext.filter.type;

    return (
      <>
        {isEmpty &&
          <div className="tableview empty">
            {filterType === ResourceWorkspaceFilterTypes.TEXT &&
              <div className="empty-content">
                <h2><Trans>None of your passwords matched this search.</Trans></h2>
                <p><Trans>Try another search or use the left panel to navigate into your passwords.</Trans></p>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.FAVORITE &&
              <div className="empty-content">
                <h2><Trans>None of your passwords are yet marked as favorite.</Trans></h2>
                <p><Trans>Add stars to passwords you want to easily find later.</Trans></p>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.GROUP &&
              <div className="empty-content">
                <h2><Trans>No passwords are shared with this group yet.</Trans></h2>
                <p><Trans>Share a password with this group or wait for a team member to share one with this group.</Trans></p>
              </div>
            }
            {(filterType === ResourceWorkspaceFilterTypes.FOLDER || filterType === ResourceWorkspaceFilterTypes.ROOT_FOLDER) &&
              <div className="empty-content">
                <h2><Trans>No passwords in this folder yet.</Trans></h2>
                <p><Trans>It does feel a bit empty here.</Trans></p>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.SHARED_WITH_ME &&
              <div className="empty-content">
                <h2><Trans>No passwords are shared with you yet.</Trans></h2>
                <p>
                  <Trans>It does feel a bit empty here.</Trans>&nbsp;
                  <Trans>Wait for a team member to share a password with you.</Trans>
                </p>
              </div>
            }
            {(filterType === ResourceWorkspaceFilterTypes.ITEMS_I_OWN || filterType === ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED ||
                filterType === ResourceWorkspaceFilterTypes.ALL) &&
              <React.Fragment>
                <div className="empty-content">
                  <h1><Trans>Welcome to passbolt!</Trans></h1>
                  <p>
                    <Trans>It does feel a bit empty here.</Trans>&nbsp;
                    <Trans>Create your first password or wait for a team member to share one with you.</Trans>
                  </p>
                </div>
              </React.Fragment>
            }
          </div>
        }
        {isGridReady &&
          <GridTable
            columns={this.columnsFiltered}
            rows={this.resources}
            sorter={this.props.resourceWorkspaceContext.sorter}
            onSortChange={this.handleSortByColumnClick}
            onChange={this.handleChangeColumnsSettings}
            onRowClick={this.handleResourceSelected}
            onRowContextMenu={this.handleResourceRightClick}
            onRowDragStart={this.handleResourceDragStartEvent}
            onRowDragEnd={this.handleDragEndEvent}
            selectedRowsIds={this.selectedResourcesIds}
            rowsRef={this.listRef}>
          </GridTable>
        }
      </>
    );
  }
}

DisplayResourcesList.propTypes = {
  context: PropTypes.any, // The app context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.any,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  progressContext: PropTypes.any, // The progress context
  history: PropTypes.any,
  dragContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};
export default withAppContext(withRouter(withRbac(withActionFeedback(withContextualMenu(withResourceWorkspace(withDrag(withProgress(withTranslation('common')(DisplayResourcesList)))))))));
