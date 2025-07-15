/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
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
import {withDrag} from "../../../contexts/DragContext";
import DisplayDragResource from "./DisplayDragResource";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import GridTable from "../../../../shared/components/Table/GridTable";
import CellFavorite from "../../../../shared/components/Table/CellFavorite";
import CellUris from "../../../../shared/components/Table/CellUris";
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
import ColumnModel, {ColumnModelTypes} from "../../../../shared/models/column/ColumnModel";
import {withProgress} from "../../../contexts/ProgressContext";
import CellTotp from "../../../../shared/components/Table/CellTotp";
import ColumnTotpModel from "../../../../shared/models/column/ColumnTotpModel";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import ColumnExpiredModel from "../../../../shared/models/column/ColumnExpiredModel";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import CellDate from "../../../../shared/components/Table/CellDate";
import CellExpiryDate from "../../../../shared/components/Table/CellExpiryDate";
import CellHeaderDefault from "../../../../shared/components/Table/CellHeaderDefault";
import ColumnLocationModel from "../../../../shared/models/column/ColumnLocationModel";
import CellLocation from "../../../../shared/components/Table/CellLocation";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import FavoriteSVG from "../../../../img/svg/favorite.svg";
import CellName from "../../../../shared/components/Table/CellName";
import CircleOffSVG from "../../../../img/svg/circle_off.svg";
import memoize from "memoize-one";
import {withClipboard} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";

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
    this.hasIconVisible = this.hasIconVisible.bind(this);
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
    this.handleLocationClick = this.handleLocationClick.bind(this);
  }

  /**
   * Init the grid columns.
   */
  initColumns() {
    this.defaultColumns.push(new ColumnCheckboxModel({cellRenderer: {component: CellCheckbox, props: {onClick: this.handleCheckboxWrapperClick}}, headerCellRenderer: {component: CellHeaderCheckbox, props: {onChange: this.handleSelectAllChange}}}));
    this.defaultColumns.push(new ColumnFavoriteModel({cellRenderer: {component: CellFavorite, props: {onClick: this.handleFavoriteClick}}, headerCellRenderer: {component: FavoriteSVG}}));
    this.defaultColumns.push(new ColumnNameModel({cellRenderer: {component: CellName, props: {hasAttentionRequiredFeature: this.hasAttentionRequiredFeature, hasIconVisibleCallback: this.hasIconVisible}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Name")}}}));
    if (this.props.passwordExpiryContext.isFeatureEnabled()) {
      this.defaultColumns.push(new ColumnExpiredModel({cellRenderer: {component: CellExpiryDate, props: {locale: this.props.context.locale, t: this.props.t}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Expiry")}}}));
    }
    this.defaultColumns.push(new ColumnUsernameModel({cellRenderer: {component: CellButton, props: {onClick: this.handleCopyUsernameClick}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Username")}}}));
    this.defaultColumns.push(new ColumnPasswordModel({cellRenderer: {component: CellPassword, props: {title: this.translate("Click to copy"), getPreviewPassword: this.getPreviewPassword, canCopy: this.canCopySecret, canPreview: this.canPreviewSecret, onPasswordClick: this.handleCopyPasswordClick, onPreviewPasswordClick: this.handlePreviewPasswordButtonClick, hasPassword: this.isPasswordResources}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Password")}}}));
    if (this.props.context.siteSettings.canIUse('totpResourceTypes')) {
      this.defaultColumns.push(new ColumnTotpModel({cellRenderer: {component: CellTotp, props: {title: this.translate("Click to copy"), getPreviewTotp: this.getPreviewTotp, canCopy: this.canCopySecret, canPreview: this.canPreviewSecret, onTotpClick: this.handleCopyTotpClick, onPreviewTotpClick: this.handlePreviewTotpButtonClick, hasTotp: this.isTotpResources}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("TOTP")}}}));
    }
    this.defaultColumns.push(new ColumnUriModel({cellRenderer: {component: CellUris, props: {onClick: this.handleGoToResourceUriClick}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("URI")}}}));
    this.defaultColumns.push(new ColumnModifiedModel({cellRenderer: {component: CellDate, props: {locale: this.props.context.locale, t: this.props.t}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Modified")}}}));
    if (this.canUseFolders) {
      this.defaultColumns.push(new ColumnLocationModel({getValue: resource => this.props.context.getHierarchyFolderCache(resource.folder_parent_id), cellRenderer: {component: CellLocation, props: {onClick: this.handleLocationClick, t: this.props.t}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Location")}}}));
    }
  }

  /**
   * Component did mount
   */
  async componentDidMount() {
    await this.props.passwordExpiryContext.findSettings();
    this.initColumns();
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
   * Returns true if the icon should be visible
   */
  hasIconVisible() {
    return this.memoizedHasIconVisible(this.columnsResourceSetting);
  }

  /**
   * Memoized hasIconVisible function.
   * @param {array} columnsResourceSetting
   * @returns {boolean}
   */
  memoizedHasIconVisible = memoize(columns => columns.getFirst("id", ColumnModelTypes.ICON).show);

  /**
   * Whenever the component has been updated
   *
   * @param prevProps The previous props
   */
  componentDidUpdate(prevProps) {
    this.handleResourceScroll();
    // Column resource settings have changed
    const hasColumnsResourceViewChange = this.columnsResourceSetting?.hasDifferentShowValue(prevProps.resourceWorkspaceContext.columnsResourceSetting);
    const hasColumnsSettingsChanged = prevProps.resourceWorkspaceContext.columnsResourceSetting !== this.props.resourceWorkspaceContext.columnsResourceSetting;

    if (hasColumnsSettingsChanged || hasColumnsResourceViewChange) {
      this.mergeAndSortColumns();
    }
  }

  /**
   * Returns true if the component should be re-rendered
   */
  shouldComponentUpdate(nextProps, nextState) {
    const {filteredResources, selectedResources, sorter, scrollTo, columnsResourceSetting} = nextProps.resourceWorkspaceContext;
    const hasFilteredResourcesChanged = this.props.resourceWorkspaceContext.filteredResources !== filteredResources;
    const hasBothSingleSelection = selectedResources.length === 1 && this.props.resourceWorkspaceContext.selectedResources.length === 1;
    const hasSingleSelectedResourceChanged = hasBothSingleSelection && selectedResources[0].id !== this.props.resourceWorkspaceContext.selectedResources[0].id;
    const hasSelectedResourcesLengthChanged = this.props.resourceWorkspaceContext.selectedResources.length !== selectedResources.length;
    const hasSorterChanged = sorter !== this.props.resourceWorkspaceContext.sorter;
    const hasResourceToScrollChange = Boolean(scrollTo.resource && scrollTo.resource.id);
    const hasResourcePreviewSecretChange = nextState.previewedCellule !== this.state.previewedCellule;
    const hasResourceColumnsChange = nextState.columns !== this.state.columns;
    const hasColumnOrderChanged = nextProps.resourceWorkspaceContext.columnsResourceSetting !== this.props.resourceWorkspaceContext.columnsResourceSetting;
    const hasColumnsResourceViewChange = columnsResourceSetting?.hasDifferentShowValue(this.props.resourceWorkspaceContext.columnsResourceSetting);
    const hasRowsSettingChanged = nextProps.resourceWorkspaceContext.rowsSetting?.height !== this.props.resourceWorkspaceContext.rowsSetting?.height;
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
      hasResourcePreviewSecretChange ||
      hasColumnOrderChanged ||
      hasRowsSettingChanged;
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.tableviewRef = React.createRef();
    this.listRef = React.createRef();
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
    const hasNotEmptyRange = this.listRef.current?.getVisibleRange().some(value => value);
    if (resourceToScroll && hasNotEmptyRange) {
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
    await this.props.clipboardContext.copy(username, this.translate("The username has been copied to clipboard."));
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
    let plaintextSecretDto, code;
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
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be copied to clipboard."));
      return;
    }

    try {
      code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to copy the TOTP"));
      return;
    }

    await this.props.clipboardContext.copyTemporarily(code, this.translate("The TOTP has been copied to clipboard."));
    await this.props.resourceWorkspaceContext.onResourceCopied();
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
      await this.props.actionFeedbackContext.displayWarning(this.translate("The password is empty and cannot be copied to clipboard."));
      return;
    }

    await this.props.clipboardContext.copyTemporarily(plaintextSecretDto.password, this.translate("The password has been copied to clipboard."));
    await this.props.resourceWorkspaceContext.onResourceCopied();
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
      await this.props.resourceWorkspaceContext.onResourcePreviewed();
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
      plaintextSecretDto.password = "";
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
      await this.props.resourceWorkspaceContext.onResourcePreviewed();
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
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be previewed."));
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
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", resourceId);
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
    const isMultipleSelection = event && this.isMacOS ? event.metaKey : event.ctrlKey;
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

  /**
   * Is mac os system
   * @returns {boolean}
   */
  get isMacOS() {
    // userAgentData only available on chromium
    const platform = navigator.userAgentData ? navigator.userAgentData.platform : navigator.userAgent;
    return /mac/i.test(platform);
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
   * Handle the user click on location folder from the grid.
   */
  handleLocationClick(folderId) {
    if (folderId) {
      const filterIsDifferent = this.props.resourceWorkspaceContext.filter.payload?.folder?.id !== folderId;
      if (filterIsDifferent) {
        this.props.history.push(`/app/folders/view/${folderId}`);
      }
    } else { // Case of root folder
      const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
      this.props.history.push(`/app/passwords`, {filter});
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

  /**
   * Triggers a scroll of the grid to a resource given its id, if the resource is not visible yet.
   * @param {string} resourceId
   */
  scrollTo(resourceId) {
    const resourceIndex = this.resources.findIndex(resource => resource.id === resourceId);
    const [visibleStartIndex, visibleEndIndex] = this.listRef.current.getVisibleRange();
    const isInvisible = resourceIndex < visibleStartIndex || resourceIndex > visibleEndIndex;
    if (isInvisible) {
      // Important to have the -1 to show the selected column behind the header with sticky position
      this.listRef.current.scrollTo(resourceIndex - 1);
    }
  }

  /**
   * Whenever the user wants to follow a resource uri.
   * @param {string} uri The uri
   */
  handleGoToResourceUriClick(uri) {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(uri);
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
    return this.props.resourceTypes?.getFirstById(resource.resource_type_id)?.hasPassword();
  }

  /**
   * Is TOTP resource
   * @param resource
   * @return {boolean}
   */
  isTotpResources(resource) {
    return this.props.resourceTypes?.getFirstById(resource.resource_type_id)?.hasTotp();
  }

  /**
   * Returns true if the "attention required" column feature is available.
   * @returns {boolean}
   */
  get hasAttentionRequiredFeature() {
    return this.props.passwordExpiryContext.isFeatureEnabled();
  }

  /**
   * Can preview secret
   * @return {boolean}
   */
  get canPreviewSecret() {
    return this.props.context.siteSettings.canIUse('previewPassword')
    && this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_PREVIEW);
  }

  /**
   * Can copy secret
   * @return {boolean}
   */
  get canCopySecret() {
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
   * Is grid ready and not empty
   * @return {boolean}
   */
  get isGridReady() {
    return this.isReady && this.resources.length !== 0 && this.columnsFiltered.length !== 0;
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
    const filterType = this.props.resourceWorkspaceContext.filter.type;

    return (
      <>
        {isEmpty &&
          <div className="tableview empty">
            {filterType === ResourceWorkspaceFilterTypes.TEXT &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>None of your passwords matched this search.</Trans></h1>
                  <p><Trans>Try another search or use the left panel to navigate into your passwords.</Trans></p>
                </div>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.FAVORITE &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>None of your passwords are yet marked as favorite.</Trans></h1>
                  <p><Trans>Add stars to passwords you want to easily find later.</Trans></p>
                </div>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.GROUP &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>No passwords are shared with this group yet.</Trans></h1>
                  <p><Trans>Share a password with this group or wait for a team member to share one with this
                    group.</Trans></p>
                </div>
              </div>
            }
            {(filterType === ResourceWorkspaceFilterTypes.FOLDER || filterType === ResourceWorkspaceFilterTypes.ROOT_FOLDER) &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>No passwords in this folder yet.</Trans></h1>
                  <p><Trans>It does feel a bit empty here.</Trans></p>
                </div>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.SHARED_WITH_ME &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>No passwords are shared with you yet.</Trans></h1>
                  <p>
                    <Trans>It does feel a bit empty here.</Trans>&nbsp;
                    <Trans>Wait for a team member to share a password with you.</Trans>
                  </p>
                </div>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.EXPIRED &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>No passwords have expired yet.</Trans></h1>
                  <p>
                    <Trans>It does feel a bit empty here.</Trans>&nbsp;
                    <Trans>Wait for a password to expire.</Trans>
                  </p>
                </div>
              </div>
            }
            {(filterType === ResourceWorkspaceFilterTypes.ITEMS_I_OWN ||
                filterType === ResourceWorkspaceFilterTypes.ALL) &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>Welcome to passbolt!</Trans></h1>
                  <p>
                    <Trans>It does feel a bit empty here.</Trans>&nbsp;
                    <Trans>Create your first password or wait for a team member to share one with you.</Trans>
                  </p>
                </div>
              </div>
            }
            {filterType === ResourceWorkspaceFilterTypes.PRIVATE &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>Welcome to passbolt!</Trans></h1>
                  <p>
                    <Trans>It does feel a bit empty here.</Trans>&nbsp;
                    <Trans>Create your first password.</Trans>
                  </p>
                </div>
              </div>
            }
          </div>
        }
        {this.isGridReady &&
          <GridTable
            columns={this.columnsFiltered}
            rows={this.resources}
            rowsSetting={this.props.resourceWorkspaceContext.rowsSetting}
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
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  actionFeedbackContext: PropTypes.any, // The action feedback context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  passwordExpiryContext: PropTypes.object, // the password expiry context
  progressContext: PropTypes.any, // The progress context
  history: PropTypes.any,
  dragContext: PropTypes.any,
  clipboardContext: PropTypes.object, // the clipboard service provider
  t: PropTypes.func, // The translation function
};
export default withAppContext(withClipboard(withRouter(withRbac(withActionFeedback(withContextualMenu(withResourceWorkspace(withResourceTypesLocalStorage(withPasswordExpiry(withDrag(withProgress(withTranslation('common')(DisplayResourcesList))))))))))));
