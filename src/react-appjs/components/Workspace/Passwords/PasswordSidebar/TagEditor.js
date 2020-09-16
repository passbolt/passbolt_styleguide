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
import Icon from "../../../Common/Icons/Icon";
import Autocomplete from "./Autocomplete/Autocomplete";

class TagEditor extends React.Component {

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
      tags: this.cloneTagArray(),
      inputTagValue: "",
      isSubmitted: false,
      tagAlreadyPresent: "",
      allTags: null,
      errorMessage: ""
    };
  }

  cloneTagArray() {
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

    this.fetchAllTags = this.fetchAllTags.bind(this);
    this.saveTags = this.saveTags.bind(this);
    this.handleInputTagValue = this.handleInputTagValue.bind(this);
    this.addTagOnEnterOrComma = this.addTagOnEnterOrComma.bind(this);
    this.deleteTagOnBackspace = this.deleteTagOnBackspace.bind(this);
    this.deleteTag = this.deleteTag.bind(this);

    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.fetchAutocompleteItems = this.fetchAutocompleteItems.bind(this);
    this.handleAutocompleteArrowSelected = this.handleAutocompleteArrowSelected.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleEditorClickEvent);
    this.inputTagRef.current.focus();
    this.fetchAllTags();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleEditorClickEvent);
  }

  fetchAllTags() {
    const allTags = [{
      "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
      "slug": "#test",
      "is_shared": true
    },
      {
        "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
        "slug": "tardis",
        "is_shared": false
      },
      {
        "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
        "slug": "#gallifrey",
        "is_shared": true
      }];
    this.setState({allTags});
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
    this.props.displayInputTagEditor();
  }

  handleInputTagValue() {
    const inputTagValue = this.inputTagRef.current.textContent;
    this.setState({inputTagValue});
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
    }
  }

  /**
   * Check if the user have the rights to edit a tag
   * @param tag
   * @returns {boolean}
   */
  isTagEditable(tag) {
    return this.props.isOwner || !tag.is_shared
  }

  /**
   * Check if the user have the rights to add a tag
   * @param tag
   * @returns {boolean}
   */
  isTagAddable(tag) {
    if (!this.props.isOwner && tag.is_shared) {
      this.setErrorMessage("This shared tag can't be added, you are not the owner");
      return false;
    }
    if (tag.slug.length > 128) {
      this.setErrorMessage("This tag can't be added, the length cannot exceeds 128");
      return false;
    }
    this.setErrorMessage("");
    return true;
  }

  /**
   * check if a tag is already present or not in resource
   * @param slug
   * @returns {boolean}
   */
  isTagAlreadyPresent(slug) {
    const tagAlreadyPresent = this.state.tags.filter(tag => (tag.slug === slug)).shift();
    if (tagAlreadyPresent) {
      this.blinkTagAlreadyPresent(tagAlreadyPresent.slug);
      this.setErrorMessage("This tag is already present");
      return true;
    }
    this.setErrorMessage("");
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
   * Check if the tag can be insert or not
   */
  checkTagToInsert() {
    const inputTag = this.inputTagRef.current.textContent;
    if (inputTag && inputTag.trim().length !== 0) {
      const tag = this.createTag(inputTag.trim());
      if (this.isTagAddable(tag) && !this.isTagAlreadyPresent(inputTag.trim())) {
        this.insertTag(tag);
      }
      this.inputTagRef.current.textContent = "";
      this.handleInputTagValue();
    }
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
   * Add tag if key enter or comma
   * @param event
   */
  addTagOnEnterOrComma(event) {
    // Code for enter is 13 and for comma is 44
    if (event.which === 13 || event.which === 44) {
      event.preventDefault();
      this.checkTagToInsert();
    }
  }

  /**
   * Check if the tag can be deleted or not
   */
  checkTagToDelete() {
    const inputTag = this.inputTagRef.current.textContent;
    if (!inputTag) {
      const tag = this.state.tags.slice(-1)[0];
      if (this.isTagEditable(tag)) {
        const tags = this.state.tags;
        tags.pop();
        this.setState({tags});
        this.setErrorMessage("");
      } else {
        this.setErrorMessage("This shared tag can't be deleted, you are not the owner");
      }
    }
  }

  /**
   * Delete the tag
   * @param event
   * @param indexTag
   */
  deleteTag(event, indexTag) {
    // When click on the close button with a long tag cut
    // the click is detected out of the element and the editor close.
    // To fix that an immediate stop propagation enable to avoid the editor close.
    // Need absolutely an immediate propagation to stop other listeners.
    event.nativeEvent.stopImmediatePropagation();
    const tags = this.state.tags;
    tags.splice(indexTag, 1);
    this.setState({tags});
  }

  /**
   * Delete tag if key backspace
   * @param event
   */
  deleteTagOnBackspace(event) {
    if (event.which === 8) {
      this.checkTagToDelete();
    }
  }

  /**
   * Save all tags
   */
  saveTags() {
    this.setState({isSubmitted: true})
    this.checkTagToInsert();
    //port.emit('resource.tags.update', this.props.resourceId, this.state.tags)
    this.props.displayInputTagEditor();
    this.setState({isSubmitted: false})
  }

  /**
   * Function to handle autocomplete
   */

  /**
   * Get tags matching the input
   */
  fetchAutocompleteItems() {
    if (this.state.inputTagValue && this.state.allTags) {
      //await Port.get().request('passbolt.share.search-aros', keyword, this.props.resourcesIds);
      const tagsfilter = this.state.allTags.filter(tag =>
        this.state.tags.filter(tagResources => (tagResources.slug === tag.slug)).length === 0
        && this.isTagEditable(tag)
        && tag.slug.toLowerCase().indexOf(this.state.inputTagValue.toLowerCase()) != -1
      );
      return tagsfilter;
    }
    return [];
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it
   * @param event
   * @param {object} tag
   */
  handleAutocompleteSelect(event, tag) {
    // When click on the autocomplete word
    // the click is detected out of the element and the editor close.
    // To fix that an immediate stop propagation enable to avoid the editor close.
    // Need absolutely an immediate propagation to stop other listeners.
    if (event.nativeEvent) {
      // nativeEvent for MouseEvent (not nativeEvent for KeyboardEvent)
      event.nativeEvent.stopImmediatePropagation();
    }
    this.insertTag(tag);
    this.inputTagRef.current.textContent = "";
    this.handleInputTagValue();
  }

  handleAutocompleteArrowSelected(slug) {
    this.inputTagRef.current.textContent = slug;
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const suggestedTags = this.fetchAutocompleteItems();

    return (
      <div className="form-content" ref={this.elementRef}>
        <div className="input tag-editor">
          <div className="tag-editor-input-wrapper">
            {this.state.tags &&
            <div className="tags">
              {this.state.tags.map((tag, index) =>
                <div key={index} className="tag">
                  <span
                    className={`tag-content ellipsis ${this.state.tagAlreadyPresent === tag.slug ? "blink-fast" : ""}`}>{tag.slug}</span>
                  {this.isTagEditable(tag) &&
                  <span className="tag-delete" onClick={(event) => this.deleteTag(event, index)}><Icon
                    name="close"></Icon></span>
                  }
                </div>
              )
              }
            </div>
            }
            <div ref={this.inputTagRef} className="tag-editor-input" contentEditable={!this.state.isSubmitted}
                 suppressContentEditableWarning="true" onKeyPress={this.addTagOnEnterOrComma}
                 onKeyDown={this.deleteTagOnBackspace} onInput={this.handleInputTagValue} autoComplete="off">
            </div>
            { suggestedTags.length > 0 &&
            <Autocomplete
              id="tag-autocomplete"
              value={this.state.inputTagValue}
              autocompleteItems={suggestedTags}
              onSelect={this.handleAutocompleteSelect}
              onArrowSelected={this.handleAutocompleteArrowSelected}
            />
            }
          </div>
          {!this.state.errorMessage &&
          <div className="message notice">
            <Icon name="info-circle"/>
            <strong>Pro tip:</strong> Tags starting with # are shared with all users who have access. Separate tags
            using commas.
          </div>
          }
          {this.state.errorMessage &&
          <div className="message error">{this.state.errorMessage}</div>
          }
        </div>
        <div className="actions">
          <a className={`button tag-editor-submit ${this.state.isSubmitted ? "primary processing" : ""}`}
             onClick={this.saveTags}>
            <span>save</span>
          </a>
          <a className="button cancel tag-editor-cancel" role="button" onClick={this.props.displayInputTagEditor}><span>cancel</span></a>
        </div>
      </div>
    );
  }
}

TagEditor.propTypes = {
  tags: PropTypes.array,
  isOwner: PropTypes.bool,
  displayInputTagEditor: PropTypes.func,
  resourceId: PropTypes.string
};

export default TagEditor;