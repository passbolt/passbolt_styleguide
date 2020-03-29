import {hot} from "react-hot-loader";
import React, {Component} from "react";
import PropTypes from "prop-types";

import FormSubmitButton from "../Common/FormSubmitButton/FormSubmitButton";
import DialogWrapper from "../Common/DialogWrapper/DialogWrapper";
import FormCancelButton from "../Common/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../Common/ErrorDialog/ErrorDialog";
import Autocomplete from "../Common/Autocomplete/Autocomplete";
import ShareChanges from "./utility/ShareChanges";
import SharePermissionItem from "./SharePermissionItem";

class ShareDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.shareChanges = null;
    this.permissionListRef = React.createRef();
    this.bindEventHandlers();
  }

  /**
   * Component did mount
   * @returns {void}
   */
  async componentDidMount() {
    let resources = await port.request('passbolt.share.get-resources', this.props.resourcesIds);
    this.shareChanges = new ShareChanges(resources);
    let permissions = this.shareChanges.aggregatePermissionsByAro();
    this.setState({loading: false, name: '', permissions}, () => {
      this.scrollToTopOfPermissionsList();
    });
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,

      // permission list
      permissions: null,

      // autocomplete
      autocompleteOpen: false,

      // Error dialog trigger
      serviceError: false,
      serviceErrorMessage: '',
    }
  }

  handleAutocompleteOpen() {
    this.setState({autocompleteOpen: true});
  }

  handleAutocompleteClose() {
    this.setState({autocompleteOpen: false});
  }

  scrollToTopOfPermissionsList() {
    this.permissionListRef.current.scrollTop = 0;
  }

  scrollToBottomOfPermissionsList() {
    this.permissionListRef.current.scrollTop = this.permissionListRef.current.scrollHeight;
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleServiceError = this.handleServiceError.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.handleAutocompleteClose = this.handleAutocompleteClose.bind(this);
    this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);
    this.fetchAutocompleteItems = this.fetchAutocompleteItems.bind(this);

    this.handlePermissionUpdate = this.handlePermissionUpdate.bind(this);
    this.handlePermissionDelete = this.handlePermissionDelete.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    // ignore closing event of main folder create dialog
    // if service error is displayed on top
    if (!this.state.serviceError) {
      this.props.onClose();
    }
  }

  /**
   * Handle close error dialog
   * @returns {void}
   */
  handleCloseError() {
    // Close dialog
    // TODO do not allow retry if parent id does not exist
    this.setState({serviceError: false, serviceErrorMessage: ''});
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    // Prevent enter on autocomplete to trigger submit
    if (this.state.autocompleteOpen) {
      return;
    }

    // Do not re-submit an already processing form
    if (this.state.processing) {
      return;
    }
    // Do not submit enter on autocomplete selection
    if (this.state.autocompleteItems) {
      return;
    }

    await this.toggleProcessing();

    try {
      await this.shareSave();
      this.displayNotification("success", "The permissions have been changed successfully.");
      this.props.onClose();
    } catch (error) {
      this.setState({serviceError: true, serviceErrorMessage: error.message, processing: false});
    }
  }

  handleServiceError (message) {
    this.setState({serviceError: true, serviceErrorMessage: message, processing: false});
  }

  handleAutocompleteSelect(aro) {
    // check if permission is already listed
    let existing = this.state.permissions.filter(permission => permission.aro.id === aro.id);
    if (existing.length > 0) {
      // TODO scroll to and highlight
      return;
    }

    // TODO restore to original permission if any
    let permission = this.shareChanges.addAroPermissions(aro);
    permission.updated = true;
    let permissions = this.state.permissions;
    permissions.push(permission);
    this.setState({permissions}, () => {
      this.scrollToBottomOfPermissionsList();
    });
  }

  handlePermissionUpdate(aroId, type) {
    this.shareChanges.updateAroPermissions(aroId, type);
    let newPermissions = this.state.permissions.map(permission => {
      if (permission.aro.id === aroId) {
        permission.type = type;
        permission.updated = this.shareChanges.hasChanges(aroId);
      }
      return permission;
    });
    this.setState({permissions: newPermissions});
  }

  handlePermissionDelete(aroId) {
      this.shareChanges.deleteAroPermissions(aroId);
      let newPermissions = this.state.permissions.filter(permission => (permission.aro.id !== aroId));
      this.setState({permissions: newPermissions});
  }

  /**
   * Save the permissions
   * @returns {Promise<Object>} Folder entity or Error
   */
  async shareSave() {
    return await port.request("passbolt.share.save", this.shareChanges.getChanges());
  }

  async fetchAutocompleteItems(keyword) {
    let items = await port.request('passbolt.share.search-aros', keyword);
    return items.filter((item) => {
      let found = this.state.permissions.filter(permission => (permission.aro.id === item.id));
      return found.length === 0;
    });
  }

  /**
   * Notify the user.
   * @param {string} status Can be success, error or info
   * @param {string} message The message to display
   * @returns {void}
   */
  displayNotification(status, message) {
    port.emit("passbolt.notification.display", {status: status, message: message});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  isAboutItems() {
    return this.props.resourcesIds
      && this.props.foldersIds
      && this.props.resourcesIds.length
      && this.props.foldersIds.length;
  }

  isAboutResources() {
    return this.props.resourcesIds && this.props.resourcesIds.length > 1;
  }

  isAboutFolders() {
    return this.props.foldersIds && this.props.foldersIds.length > 1;
  }

  isAboutAFolder() {
    return this.props.foldersIds && this.props.foldersIds.length === 1;
  }

  isAboutAResource() {
    return this.props.resourcesIds && this.props.resourcesIds.length === 1;
  }

  getTitle() {
    if (this.isAboutItems()) {
      return `Share ${this.props.resourcesIds.length + this.props.foldersIds.length} items`;
    }
    if (this.isAboutAResource()) {
      return `Share a resource`;//todo name
    }
    if (this.isAboutResources()) {
      return `Share ${this.props.resourcesIds.length} resources`;
    }
    if (this.isAboutAFolder()) {
      return `Share a folder`;// todo name
    }
    if (this.isAboutFolders()) {
      return `Share ${this.props.foldersIds.length} folders`;
    }
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    })
  }

  hasNoOwner() {
    return (this.shareChanges && (this.shareChanges.getResourcesWithNoOwner()).length > 0);
  }

  hasChanges() {
    return (this.shareChanges && (this.shareChanges.getChanges().length > 0));
  }

  hasSubmitDisabled() {
    return this.hasNoOwner() || this.hasAllInputDisabled() || !this.hasChanges();
  }

  /**
   * Render
   * @returns {*}
   */
  render() {
    return (
      <div>
        <DialogWrapper className='share-dialog'
           title={this.getTitle()} onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
          <form className="share-form" onSubmit={this.handleFormSubmit} noValidate>
            <div className="form-content permission-edit">
              <ul className="permissions scroll" ref={this.permissionListRef}>
                {(this.state.permissions && (this.state.permissions).map((permission, key) => {
                  return <SharePermissionItem
                            id={permission.aro.id}
                            key={key}
                            aro={permission.aro}
                            permissionType={permission.type}
                            variesDetails={permission.variesDetails}
                            updated={permission.updated}
                            disabled={this.hasAllInputDisabled()}
                            onUpdate={this.handlePermissionUpdate}
                            onDelete={this.handlePermissionDelete}
                  />
                }))}
              </ul>
            </div>
            {(this.hasNoOwner()) &&
              <div className="message error">
                Please make sure there is at least one owner.
              </div>
            }
            {(this.hasChanges() && !this.hasNoOwner()) &&
              <div className="message warning">
                Click save to apply your pending changes.
              </div>
            }
            <div className="form-content permission-add">
                <Autocomplete
                  id="share-name-input"
                  name="name"
                  label="Share with people or groups"
                  placeholder="Start typing a user or group name"
                  searchCallback={this.fetchAutocompleteItems}
                  onSelect={this.handleAutocompleteSelect}
                  onServiceError={this.handleServiceError}
                  onOpen={this.handleAutocompleteOpen}
                  onClose={this.handleAutocompleteClose}
                  autofocus={true}
                  disabled={this.hasAllInputDisabled()}
                />
            </div>
            <div className="submit-wrapper clearfix">
              <FormSubmitButton disabled={this.hasSubmitDisabled()} processing={this.state.processing} value="Save"/>
              <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
            </div>
          </form>
        </DialogWrapper>
        {this.state.serviceError &&
        <ErrorDialog
          message={this.state.serviceErrorMessage}
          title={`There was an unexpected error...`}
          onClose={this.handleCloseError}/>
        }
      </div>
    )
  }
}

ShareDialog.propTypes = {
  resourcesIds: PropTypes.array,
  foldersIds: PropTypes.object,
  onClose: PropTypes.func
};

export default hot(module)(ShareDialog);
