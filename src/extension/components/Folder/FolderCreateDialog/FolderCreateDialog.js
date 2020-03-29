import {hot} from "react-hot-loader";
import React, {Component} from "react";
import PropTypes from "prop-types";

import DialogWrapper from "../../Common/DialogWrapper/DialogWrapper";
import ErrorDialog from "../../Common/ErrorDialog/ErrorDialog";
import FormSubmitButton from "../../Common/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/FormSubmitButton/FormCancelButton";

class FolderCreateDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.createInputRefs();
    this.bindEventHandlers();
  }

  /**
   * Component did mount
   * @returns {void}
   */
  componentDidMount() {
    this.setState({loading: false, name: ''}, () => {
      this.nameRef.current.focus();
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
      inlineValidation: false,

      // Error dialog trigger
      serviceError: false,
      serviceErrorMessage: '',

      // Fields and errors
      name: 'loading...',
      nameError: false
    }
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.nameRef = React.createRef();
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
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, () => {
      if (this.state.inlineValidation) {
        this.validate();
      }
    });
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    // Do not re-submit an already processing form
    if (this.state.processing) {
      return;
    }

    // After first submit, inline validation is on
    this.setState({
      inlineValidation: this.state.inlineValidation || true
    });

    await this.toggleProcessing();
    await this.validate();
    if (this.hasValidationError()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    try {
      const folder = await this.createFolder();
      this.displayNotification("success", "The folder has been added successfully");
      this.selectAndScrollToFolder(folder.id);
      this.props.onClose();
    } catch (error) {
      console.error(error);
      this.setState({serviceError: true, serviceErrorMessage: error.message, processing: false});
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

  /**
   * Create the folder
   * @returns {Promise<Object>} Folder entity or Error
   */
  async createFolder() {
    const folderDto = {
      name: this.state.name,
      folderParentId: this.props.folderParentId
    };
    return await port.request("passbolt.folders.create", folderDto);
  }

  /**
   * Focus the first field of the form which is in error state.
   * @returns {void}
   */
  focusFirstFieldError() {
    this.nameRef.current.focus();
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
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   * @returns {void}
   */
  selectAndScrollToFolder(id) {
    port.emit("passbolt.folders.select-and-scroll-to", id);
  }

  /**
   * Validate the name input.
   * @returns {Promise<void>}
   */
  validateNameInput() {
    let nameError = false;
    const name = this.state.name.trim();
    if (!name.length) {
      nameError = "A name is required.";
    }
    if (name.length > 64) {
      nameError = "A name can not be more than 64 char in length.";
    }
    return new Promise(resolve => {
      this.setState({nameError}, resolve);
    });
  }

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    await this.resetValidation();
    await this.validateNameInput();
    return this.hasValidationError();
  }

  /**
   * Reset validation errors
   * @returns {Promise<void>}
   */
  async resetValidation() {
    return new Promise(resolve => {
      this.setState({nameError: false}, resolve());
    });
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return (this.state.nameError !== false)
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Render
   * @returns {*}
   */
  render() {
    return (
      <div>
        <DialogWrapper className='folder-create-dialog' title="Create a new folder"
                       onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
          <form className="folder-create-form" onSubmit={this.handleFormSubmit} noValidate>
            <div className="form-content">
              <div className="input text required clearfix">
                <label htmlFor="folder-name-input">Name</label>
                <input id="folder-name-input"
                       name="name"
                       ref={this.nameRef}
                       maxLength="64" type="text" placeholder="Untitled folder"
                       disabled={this.hasAllInputDisabled()}
                       autoFocus={true}
                       onChange={this.handleInputChange}
                       value={this.state.name}
                       autoComplete='off'
                />
                {this.state.nameError &&
                <div className="error message">{this.state.nameError}</div>
                }
              </div>
            </div>
            <div className="submit-wrapper clearfix">
              <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value="Save"/>
              <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
            </div>
          </form>
        </DialogWrapper>
        {this.state.serviceError &&
          <ErrorDialog message={this.state.serviceErrorMessage}
                       title={`The folder could not be saved.`}
                       onClose={this.handleCloseError}/>
        }
      </div>
    )
  }
}

FolderCreateDialog.propTypes = {
  folderParentId: PropTypes.string,
  onClose: PropTypes.func
};

export default hot(module)(FolderCreateDialog);
