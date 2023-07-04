/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import CustomPropTypes from "../../../../shared/lib/PropTypes/CustomPropTypes";

/**
 * Display of the Select component
 */
class Select extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallback();
    this.createRefs();
  }

  /**
   * Default state
   * @param props Component props
   */
  getDefaultState(props) {
    return {
      selectedValue: props.value, // The selected value
      search: "", // The search value
      open: false, // The open select dropdown
      style: undefined // The style of the select field
    };
  }

  /**
   * Get the list item filtered
   * @returns {*[]|*}
   */
  get listItemsFiltered() {
    // Don't keep the selected item in the list
    const isNotSelectedItem = item => item.value !== this.state.selectedValue;
    const itemsFiltered = this.props.items.filter(isNotSelectedItem);

    if (this.props.search && this.state.search !== "") {
      return this.getItemsMatch(itemsFiltered, this.state.search);
    }

    return itemsFiltered;
  }

  /**
   * Get the selected item label
   * @returns {*|string}
   */
  get selectedItemLabel() {
    const item = this.props.items && this.props.items.find(item => item.value === this.state.selectedValue);
    return item && item.label || <>&nbsp;</>;
  }

  /**
   * Get derived state from props
   * @param props
   * @param state
   * @returns {{selectedItem}|null}
   */
  static getDerivedStateFromProps(props, state) {
    if (props.value !== undefined && props.value !== state.selectedValue) {
      return {
        selectedValue: props.value,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleDocumentScrollEvent = this.handleDocumentScrollEvent.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSelectKeyDown = this.handleSelectKeyDown.bind(this);
    this.handleItemKeyDown = this.handleItemKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.selectedItemRef = React.createRef();
    this.selectItemsRef = React.createRef();
    this.itemsRef = React.createRef();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
    document.addEventListener('scroll', this.handleDocumentScrollEvent, {capture: true});
  }

  /**
   * componentWillUnmount
   * Invoked immediately before the component is removed from the tree
   * @return {void}
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
    document.removeEventListener('scroll', this.handleDocumentScrollEvent, {capture: true});
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the select
    if (this.selectedItemRef.current.contains(event.target)) {
      return;
    }
    if (this.selectItemsRef.current.contains(event.target)) {
      return;
    }
    this.closeSelect();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right clicks on an element of the select component
    if (this.selectedItemRef.current.contains(event.target)) {
      return;
    }
    if (this.selectItemsRef.current.contains(event.target)) {
      return;
    }
    this.closeSelect();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.closeSelect();
  }

  /**
   * Handle scroll event on document. Hide the component if any.
   */
  handleDocumentScrollEvent(event) {
    if (this.itemsRef.current.contains(event.target)) {
      return;
    }
    this.closeSelect();
  }

  /**
   * Toggle select
   */
  handleSelectClick() {
    if (!this.props.disabled) {
      const open = !this.state.open;
      open ? this.forceVisibilitySelect() : this.resetStyleSelect();
      this.setState({open});
    } else {
      this.closeSelect();
    }
  }

  /**
   * Get the first parent from this element that have a transfrom CSS property set.
   * It's useful for calculation of a correction of an offset for the dropdown
   */
  getFirstParentWithTransform() {
    let currentElement = this.selectedItemRef.current.parentElement;
    while (currentElement !== null && currentElement.style.getPropertyValue("transform") === "") {
      currentElement = currentElement.parentElement;
    }
    return currentElement;
  }

  /**
   * Force the visibility of the select with fixed position
   */
  forceVisibilitySelect() {
    const boundingRect = this.selectedItemRef.current.getBoundingClientRect();
    const {width, height} = boundingRect;
    let {top, left} = boundingRect;

    const relativeParent = this.getFirstParentWithTransform();
    if (relativeParent) {
      const relativeParentPosition = relativeParent.getBoundingClientRect();
      top -= relativeParentPosition.top;
      left -= relativeParentPosition.left;
    }
    const style = {
      position: 'fixed',
      zIndex: 1,
      width,
      height,
      top,
      left
    };
    this.setState({style});
  }

  /**
   * Handle blur
   * @param event
   */
  handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      this.closeSelect();
    }
  }

  /**
   * Close select
   */
  closeSelect() {
    this.resetStyleSelect();
    this.setState({open: false});
  }

  /**
   * Reset the style of the select
   */
  resetStyleSelect() {
    const style = undefined;
    this.setState({style});
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  /**
   * Handle item click.
   * @params {event} The react event
   * @params {item} The item selected
   * @returns {void}
   */
  handleItemClick(item) {
    this.setState({selectedValue: item.value, open: false});
    if (typeof this.props.onChange == 'function') {
      const event = {target: {value: item.value, name: this.props.name}};
      this.props.onChange(event);
    }
    this.closeSelect();
  }

  /**
   * Get items who match the search
   * @param items
   * @param keyword
   * @returns {*}
   */
  getItemsMatch(items, keyword) {
    const words = (keyword && keyword.split(/\s+/)) || [''];

    // Test match of some escaped test words
    const escapeWord = word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = word => new RegExp(escapeWord(word), 'i');
    const matchWord = (word, value) => wordToRegex(word).test(value);

    const matchText = item => words.every(word => matchWord(word, item.label));

    return items.filter(matchText);
  }

  /**
   * Handle click on selected item
   * @param event The React event
   */
  handleSelectKeyDown(event) {
    switch (event.keyCode) {
      // ENTER KEYBOARD
      case 13:
        event.stopPropagation(); // avoid side effect
        this.handleSelectClick();
        return;
      // DOWN ARROW KEYBOARD
      case 40:
        event.preventDefault(); // avoid scrolling with keyboard
        event.stopPropagation(); // avoid side effect
        this.state.open ? this.focusItem(0) : this.handleSelectClick();
        return;
      // UP ARROW KEYBOARD
      case 38:
        event.preventDefault(); // avoid scrolling with keyboard
        event.stopPropagation(); // avoid side effect
        this.state.open ? this.focusItem(this.listItemsFiltered.length - 1) : this.handleSelectClick();
        return;
      // ESCAPE KEYBOARD
      case 27:
        event.stopPropagation(); // avoid side effect
        this.closeSelect();
        return;
      default:
        return;
    }
  }

  /**
   * Focus the item at the index
   * @param index The index
   */
  focusItem(index) {
    this.itemsRef.current.childNodes[index]?.focus();
  }

  /**
   * Handle click on option item
   * @param event The React event
   * @param item The item
   */
  handleItemKeyDown(event, item) {
    switch (event.keyCode) {
      // ENTER KEYBOARD
      case 13:
        // Prevent handle key down on parent element
        event.stopPropagation(); // avoid side effect
        this.handleItemClick(item);
        return;
      // DOWN ARROW KEYBOARD
      case 40:
        event.stopPropagation(); // avoid side effect
        event.preventDefault(); // avoid scrolling with keyboard
        event.target.nextSibling ? event.target.nextSibling.focus() : this.focusItem(0);
        return;
      // UP ARROW KEYBOARD
      case 38:
        event.stopPropagation(); // avoid side effect
        event.preventDefault(); // avoid scrolling with keyboard
        event.target.previousSibling ? event.target.previousSibling.focus() : this.focusItem(this.listItemsFiltered.length - 1);
        return;
      default:
        return;
    }
  }

  /**
   * Has filtered items
   * @returns {boolean}
   */
  hasFilteredItems() {
    return this.listItemsFiltered.length > 0;
  }

  render() {
    return (
      <div className={`select-container ${this.props.className}`} style={{width: this.state.style?.width, height: this.state.style?.height}}>
        <div onKeyDown={this.handleSelectKeyDown} onBlur={this.handleBlur} id={this.props.id} className={`select ${this.props.direction} ${this.state.open ? 'open' : ''}`} style={this.state.style}>
          <div ref={this.selectedItemRef}
            className={`selected-value ${this.props.disabled ? 'disabled' : ''}`}
            tabIndex={this.props.disabled ? -1 : 0}
            onClick={this.handleSelectClick}>
            <span className="value">{this.selectedItemLabel}</span>
            <Icon name="caret-down"/>
          </div>
          <div ref={this.selectItemsRef} className={`select-items ${this.state.open ? 'visible' : ''}`}>
            {this.props.search &&
              <>
                <input className="search-input" name="search"
                  value={this.state.search} onChange={this.handleInputChange} type="text"/>
                <Icon name="search"/>
              </>
            }
            <ul ref={this.itemsRef} className="items">
              {this.hasFilteredItems() &&
                this.listItemsFiltered.map(item =>
                  <li tabIndex={item.disabled ? -1 : 0} key={item.value} className="option" onKeyDown={event => this.handleItemKeyDown(event, item)} onClick={() => this.handleItemClick(item)}>
                    {item.label}
                  </li>
                )
              }
              {!this.hasFilteredItems() && this.props.search &&
                <li className="option no-results">
                  <Trans>No results match</Trans> <span>{this.state.search}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Select.defaultProps = {
  id: "",
  name: "select",
  className: "",
  direction: 'bottom'
};

/**
 * Is value props in items props
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error}
 */
const isValueInItems = (props, propName, componentName) => {
  const value = props[propName];
  // value must be in the items
  const items = props.items;
  if (value !== null && items.length > 0 && items.every(item => item.value !== value)) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected the value ${value} in items.`
    );
  }
};

/**
 * enumeration for select direction
 */
export const DirectionEnum = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
};

Select.propTypes = {
  id: PropTypes.string, // The select field id
  name: PropTypes.string, // The select field name
  className: PropTypes.string, // The class name
  direction: PropTypes.oneOf(Object.values(DirectionEnum)),
  search: PropTypes.bool, // The search field property
  items: PropTypes.array, // The item list of the select field
  value: CustomPropTypes.allPropTypes(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    isValueInItems
  ), // The item selected of the select field
  disabled: PropTypes.bool, // The current select field disabled property
  onChange: PropTypes.func, // The on change event callback
};

export default withTranslation("common")(Select);
