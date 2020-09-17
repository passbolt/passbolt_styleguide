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
import AppContext from "../../../contexts/AppContext";

/**
 * This component allows the current user to edit the description of a resource
 */
class DescriptionEditor extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      description: this.props.description,
      loading: true,
      processing: false,
      error: ""
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditorClickEvent = this.handleEditorClickEvent.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.elementRef = React.createRef();
    this.texteareaRef = React.createRef();
  }

  componentDidMount() {
    this.handleOutsideEditorClickEvent();
    this.setState({loading: false});
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleEditorClickEvent);
  }

  /**
   * handle a click outside of the editor
   */
  handleOutsideEditorClickEvent() {
    document.addEventListener('click', this.handleEditorClickEvent);
  }

  /**
   * Handle click events on editor. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleEditorClickEvent(event) {
    // Prevent stop editing when the user click on an element of the editor
    if (this.elementRef.current.contains(event.target)) {
      return;
    }
    this.props.toggleInputDescriptionEditor();
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Handle key down on the component.
   * @params {ReactEvent} The react event
   */
  handleKeyDown(event) {
    // Close the editor when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // Stop the event propagation in order to avoid a parent component to react to this ESC event.
      event.stopPropagation();
      this.props.toggleInputDescriptionEditor();
    }
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.save();
    }
  }

  /**
   * Save the changes.
   */
  async save() {
    this.setState({processing: true});

    try {
      await this.updateDescription();
      this.displayNotification("success", "The description has been updated successfully");
      this.props.toggleInputDescriptionEditor();
    } catch (error) {
      // It can happen when the user has closed the passphrase entry dialog by instance.
      if (error.name === "UserAbortsOperationError") {
        this.setState({processing: false});
      } else {
        // Unexpected error occurred.
        console.error(error);
        this.setState({
          error: error.message,
          processing: false
        });
      }
    }
  }

  /**
   * Update the tag
   * @returns {Promise<Object>} updated tag
   */
  updateDescription() {
    const descriptionDto = {
      id: this.props.resourceId,
      description: this.state.description,
    };
    return this.context.port.request("passbolt.resource.update-description", descriptionDto);
  }

  /**
   * Notify the user.
   * @param {string} status Can be success, error or info
   * @param {string} message The message to display
   */
  displayNotification(status, message) {
    this.context.port.emit("passbolt.notification.display", {status: status, message: message});
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <form onKeyDown={this.handleKeyDown} noValidate>
        <div className="form-content" ref={this.elementRef}>
          <div className="input text required">
              <textarea name="description" className="fluid"
                        maxLength="10000" placeholder="enter a description" value={this.state.description}
                        onChange={this.handleInputChange}
                        disabled={this.hasAllInputDisabled()} autoComplete="off"/>
            <div className=" message ready">
            </div>
          </div>
          {this.state.error &&
          <div className="feedbacks message error">{this.state.error}</div>
          }
          <div className="actions">
            <a className={`button description-editor-submit ${this.state.processing ? "primary processing" : ""}`}
               onClick={this.handleFormSubmit}>
              <span>save</span>
            </a>
            <a className={`cancel button ${this.hasAllInputDisabled() ? "disabled" : ""}`} role="button" onClick={this.props.toggleInputDescriptionEditor}>cancel</a>
          </div>
        </div>
      </form>
  );
  }
  }

  DescriptionEditor.contextType = AppContext;

  DescriptionEditor.propTypes = {
    description: PropTypes.string,
    resourceId: PropTypes.string,
    toggleInputDescriptionEditor: PropTypes.func
  };

  export default DescriptionEditor;
