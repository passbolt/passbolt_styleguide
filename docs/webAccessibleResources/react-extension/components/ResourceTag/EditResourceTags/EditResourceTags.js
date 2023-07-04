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
import Icon from "../../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Autocomplete from "../../Common/Autocomplete/Autocomplete";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withLoading} from "../../../contexts/LoadingContext";
import {Trans, withTranslation} from "react-i18next";

const TAG_MAX_LENGTH = 128;

class EditResourceTags extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.createRefs();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      tags: this.getResourceTags(),
      inputTagValue: "",
      processing: false,
      loading: true,
      tagAlreadyPresent: "",
      allTags: null,
      autocompletePosition: {
        top: 0,
        left: 0,
        width: 0,
      },
      suggestedTags: null,
      errorMessage: ""
    };
  }

  getResourceTags() {
    if (this.props.tags) {
      return [...this.props.tags];
    }
    return [];
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.elementRef = React.createRef();
    this.inputTagRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditorClickEvent = this.handleEditorClickEvent.bind(this);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.focusOnInputTag = this.focusOnInputTag.bind(this);

    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.handleAutocompleteArrowFocus = this.handleAutocompleteArrowFocus.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleEditorClickEvent, {capture: true});
    this.fetchAllTags();
    this.setState({loading: false}, () => {
      this.focusOnInputTag();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleEditorClickEvent, {capture: true});
  }

  focusOnInputTag() {
    this.inputTagRef.current.focus();
  }

  /**
   * Find all tags.
   * @return {Promise<void>}
   */
  async fetchAllTags() {
    const allTags = await this.props.context.port.request("passbolt.tags.find-all");
    if (allTags) {
      this.setState({allTags});
    }
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Handle click events on editor. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleEditorClickEvent(event) {
    // Prevent stop editing when the user click on an element of the editor
    if (this.elementRef.current.contains(event.target)) {
      return;
    } else if (this.inputTagRef.current.contains(event.target)) {
      this.focusOnInputTag();
      return;
    }
    this.props.toggleInputTagEditor();
  }

  /**
   * handle onInput event
   */
  handleOnInput() {
    this.setInputTagValue();
    // get suggested tags for the autocomplete
    this.getSuggestedTags();
    this.getPositionOfInputTag();
  }

  /**
   * Set state inputTagValue
   */
  setInputTagValue() {
    const inputTagValue = this.inputTagRef.current.textContent;
    this.setState({inputTagValue});
  }

  /**
   * reset the tag input value
   */
  resetInputTagValue() {
    this.inputTagRef.current.textContent = "";
    this.setInputTagValue();
  }

  /**
   * get The position of the input tag to
   * set the position of the autocomplete
   */
  getPositionOfInputTag() {
    const top = this.inputTagRef.current.offsetTop + 30;
    const left = this.inputTagRef.current.offsetLeft;
    const width = this.elementRef.current.getBoundingClientRect().width;
    const autocompletePosition = {left, top, width};
    this.setState({autocompletePosition});
  }

  /**
   * Create a new Tag
   * @param slug the name of the tag
   * @returns {{is_shared: boolean, slug: string}}
   */
  createTag(slug) {
    let is_shared = false;
    if (slug.startsWith("#")) {
      is_shared = true;
    }
    return {
      slug,
      is_shared
    };
  }

  /**
   * Check if the user have the rights to edit a tag
   * @param tag
   * @returns {boolean}
   */
  isTagDeletable(tag) {
    return (this.props.isOwner || !tag.is_shared) && !this.hasAllInputDisabled();
  }

  /**
   * check if a tag is already present or not in resource
   * @param slug
   * @returns {boolean}
   */
  isTagAlreadyPresent(slug) {
    const tagAlreadyPresent = this.state.tags.filter(tag => (tag.slug === slug)).shift();
    if (tagAlreadyPresent) {
      return true;
    }
    return false;
  }

  /**
   * set and display an error message if it's not empty
   * @param errorMessage
   */
  setErrorMessage(errorMessage) {
    this.setState({errorMessage});
  }

  /**
   * Blink the tag already present
   * @param slug the name of the tag
   */
  blinkTagAlreadyPresent(slug) {
    this.setState({tagAlreadyPresent: slug});
    setTimeout(() => {
      this.setState({tagAlreadyPresent: ""});
    }, 2000);
  }

  /**
   * if the tag exceed the max length
   * return true
   * else false
   * @param slug
   * @returns {boolean}
   */
  isTagExceedMaxLength(slug) {
    return slug.length > TAG_MAX_LENGTH;
  }

  /**
   * Check if the tag is valid or not
   * @param slug
   * @returns {boolean}
   */
  validateTag(slug) {
    if (!slug && slug.trim().length === 0) {
      return false;
    }
    if (this.isTagExceedMaxLength(slug.trim())) {
      this.setErrorMessage(this.translate("This tag can't be added, the length cannot exceed {{tagMaxLength}}", {tagMaxLength: TAG_MAX_LENGTH}));
      return false;
    }
    if (!this.props.isOwner && slug.startsWith("#")) {
      this.setErrorMessage(this.translate("This shared tag can't be added, you are not the owner"));
      return false;
    }
    if (this.isTagAlreadyPresent(slug.trim())) {
      this.blinkTagAlreadyPresent(slug.trim());
      this.setErrorMessage(this.translate("This tag is already present"));
      this.resetInputTagValue();
      return false;
    }
    return true;
  }

  /**
   * Check if the tag can be insert or not
   */
  checkTagToBeSaved() {
    const inputTag = this.inputTagRef.current.textContent;
    this.setErrorMessage("");
    // no tag to be saved
    if (!inputTag && inputTag.trim().length === 0) {
      return true;
    } else if (this.validateTag(inputTag)) {
      const tag = this.createTag(inputTag.trim());
      this.insertTag(tag);
      this.resetInputTagValue();
      this.hideAutocomplete();
      return true;
    }
    return false;
  }

  /**
   * insert tag in the editor
   * @param tag
   */
  insertTag(tag) {
    const tags = this.state.tags;
    tags.push(tag);
    this.setState({tags});
  }

  /**
   * Handle key pressed event
   * Add tag if key enter or comma
   * @param event
   */
  handleKeyPressed(event) {
    // Code for enter is 13 and for comma is 44
    if (event.which === 13 && !this.inputTagRef.current.textContent) {
      this.handleOnSubmit();
    } else if (event.which === 13 || event.which === 44) {
      event.preventDefault();
      this.checkTagToBeSaved();
    }
  }

  /**
   * Check if the tag can be deleted or not
   */
  checkTagToDelete() {
    const inputTag = this.inputTagRef.current.textContent;
    if (!inputTag) {
      const tag = this.state.tags.slice(-1)[0];
      if (this.isTagDeletable(tag)) {
        const tags = this.state.tags;
        tags.pop();
        this.setState({tags});
        this.setErrorMessage("");
      } else {
        this.setErrorMessage(this.translate("This shared tag can't be deleted, you are not the owner"));
      }
    }
  }

  /**
   * Delete the tag
   * @param event
   * @param indexTag
   */
  deleteTag(event, indexTag) {
    /*
     * When click on the close button with a long tag cut
     * the click is detected out of the element and the editor close.
     * To fix that an immediate stop propagation enable to avoid the editor close.
     * Need absolutely an immediate propagation to stop other listeners.
     */
    event.nativeEvent.stopImmediatePropagation();
    const tags = this.state.tags;
    tags.splice(indexTag, 1);
    this.setState({tags});
  }

  /**
   * must show the autocomplete or not
   * @returns {boolean}
   */
  mustShowAutocomplete() {
    return this.state.suggestedTags && this.state.suggestedTags.length > 0;
  }

  /**
   * hide autocomplete
   */
  hideAutocomplete() {
    this.setState({suggestedTags: null});
  }

  /**
   * Handle on key down event
   * Delete tag if key code is 8 (backspace)
   * Close editor tag if key code is 27 (escape)
   * @param event
   */
  handleOnKeyDown(event) {
    if (event.which === 8) {
      this.checkTagToDelete();
    } else if (event.which === 27) {
      if (this.mustShowAutocomplete()) {
        this.inputTagRef.current.textContent = this.state.inputTagValue;
        this.setCaretCursorToEnd();
        this.hideAutocomplete();
      } else {
        this.props.toggleInputTagEditor();
      }
    }
  }

  /**
   * Save all tags
   */
  async handleOnSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      this.setState({processing: true});
      if (this.checkTagToBeSaved()) {
        await this.updateTags();
      } else {
        this.setState({processing: false});
      }
    }
  }

  /**
   * Update tags of a resource
   * @returns {Promise<void>}
   */
  async updateTags() {
    try {
      this.props.loadingContext.add();
      await this.props.context.port.request("passbolt.tags.update-resource-tags", this.props.resourceId, this.state.tags);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The tags have been updated successfully"));
      this.setState({processing: false});
      this.props.toggleInputTagEditor();
    } catch (error) {
      // Unexpected error occurred.
      this.props.loadingContext.remove();
      console.error(error);
      this.setState({
        errorMessage: error.message,
        processing: false
      });
    }
  }

  /*
   * Functions to handle autocomplete
   */

  /**
   * Get tags matching the input
   * @returns {array} array
   */
  getSuggestedTags() {
    const inputTagValue = this.inputTagRef.current.textContent;
    if (inputTagValue && this.state.allTags) {
      const suggestedTags = this.state.allTags.filter(tag =>
        this.state.tags.filter(tagResources => (tagResources.slug === tag.slug)).length === 0
        && this.isTagDeletable(tag)
        && tag.slug.toLowerCase().indexOf(inputTagValue.toLowerCase()) != -1
      );
      this.setState({suggestedTags});
    } else {
      this.setState({suggestedTags: null});
    }
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it
   * @param {object} tag
   */
  handleAutocompleteSelect(tag) {
    this.insertTag(tag);
    this.resetInputTagValue();
    this.focusOnInputTag();
    this.hideAutocomplete();
  }

  /**
   * Handle the autocomplete slug selected by arrow
   * @param slug
   */
  handleAutocompleteArrowFocus(slug) {
    this.inputTagRef.current.textContent = slug;
    this.setCaretCursorToEnd();
    this.getPositionOfInputTag();
  }

  /**
   * Set the caret cursor position at the end of the tag editor input
   */
  setCaretCursorToEnd() {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(this.inputTagRef.current.childNodes[0], this.inputTagRef.current.textContent.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
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
   * @returns {JSX}
   */
  render() {
    return (
      <div className="form-content" ref={this.elementRef}>
        <div className="input tag-editor">
          <div className="tag-editor-input-wrapper" onClick={this.focusOnInputTag}>
            {this.state.tags &&
              this.state.tags.map((tag, index) =>
                <div key={index} className="tag">
                  <span
                    className={`tag-content ellipsis ${this.state.tagAlreadyPresent === tag.slug ? "blink-fast" : ""}`}>{tag.slug}</span>
                  {this.isTagDeletable(tag) &&
                  <span className={`tag-delete`} onClick={event => this.deleteTag(event, index)}>
                    <Icon name="close"/>
                  </span>
                  }
                </div>
              )

            }
            <div ref={this.inputTagRef} className="tag-editor-input" contentEditable={!this.hasAllInputDisabled()}
              suppressContentEditableWarning="true" onKeyPress={this.handleKeyPressed}
              onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput}>
            </div>
            {this.mustShowAutocomplete() &&
            <Autocomplete
              id="tag-autocomplete"
              value={this.state.inputTagValue}
              autocompleteItems={this.state.suggestedTags}
              left={this.state.autocompletePosition.left}
              top={this.state.autocompletePosition.top}
              width={this.state.autocompletePosition.width}
              onSelect={this.handleAutocompleteSelect}
              onArrowFocus={this.handleAutocompleteArrowFocus}
            />
            }
          </div>
          {this.state.errorMessage &&
          <div className="error-message">{this.state.errorMessage}</div>
          }
        </div>
        <div className="actions">
          <button type="button" disabled={this.hasAllInputDisabled()} className="cancel tag-editor-cancel"
            onClick={this.props.toggleInputTagEditor}><span><Trans>Cancel</Trans></span></button>
          <button type="button" disabled={this.hasAllInputDisabled()} className={`primary tag-editor-submit ${this.hasAllInputDisabled() ? "processing" : ""}`}
            onClick={this.handleOnSubmit}>
            <span><Trans>Save</Trans></span>
          </button>
        </div>
        {!this.state.errorMessage && this.props.isOwner &&
          <div className="message notice">
            <strong><Trans>Pro tip</Trans>:</strong> <Trans>Tags starting with # are shared with all users who have access. Separate tags using commas.</Trans>
          </div>
        }
      </div>
    );
  }
}

EditResourceTags.propTypes = {
  context: PropTypes.any, // The application context
  tags: PropTypes.array, // tags of the resource
  isOwner: PropTypes.bool, // if the user is owner of the resource
  toggleInputTagEditor: PropTypes.func, // toggle to display or not the editor
  resourceId: PropTypes.string, // the id of the resource
  actionFeedbackContext: PropTypes.any, // The action feedback context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withLoading(withActionFeedback(withTranslation('common')(EditResourceTags))));
