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
import React, {Component} from "react";
import PropTypes from "prop-types";

import AutocompleteItem from "./AutocompleteItem";

class Autocomplete extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
    this.createInputRefs();
    this.state = this.getDefaultState();
  }

  /**
   * getDefaultState
   * @return {object}
   */
  getDefaultState() {
    return {
      // autocomplete
      selected: null,
    }
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  createInputRefs() {
    this.listRef = React.createRef();
  }

  bindEventHandlers() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * Handle key down to navigate and select the item
   * @param event
   */
  handleKeyDown(event) {
    if (!this.props.autocompleteItems) {
      return;
    }
    if (event.keyCode === 40) { // key down
      event.preventDefault();
      this.selectNext();
      return;
    }
    if (event.keyCode === 38) { // key up
      event.preventDefault();
      this.selectPrevious();
      return;
    }
    if (event.keyCode === 13 || event.keyCode === 9) { // enter key or tab
      if (this.state.selected === null || this.state.selected === -1) {
        return;
      }
      event.preventDefault();
      this.handleSelect(event, this.state.selected);
    }
  }

  /**
   * Handle when an item is selected
   * @param event
   * @param selected
   */
  handleSelect(event, selected) {
    let obj = this.props.autocompleteItems[selected];
    this.props.onSelect(event, obj);
  }

  /**
   * Handle when item is selected by arrows
   */
  handleArrowSelected() {
    if(this.state.selected === -1) {
      this.props.onArrowSelected(this.props.value)
    } else {
      const slug = this.props.autocompleteItems[this.state.selected].slug;
      this.props.onArrowSelected(slug);
    }

  }

  /**
   * Navigate to select the previous item
   */
  selectPrevious() {
    if(this.state.selected === null || this.state.selected === -1) {
      this.setState({selected: this.props.autocompleteItems.length - 1});
    } else if (this.state.selected === 0) {
      this.setState({selected: - 1});
    } else {
      this.setState({selected: (this.state.selected - 1)});
    }
    this.scrollToSelectedItem();
    this.handleArrowSelected();
  }

  /**
   * Navigate to select the next item
   */
  selectNext() {
    if (this.state.selected === null) {
      this.setState({selected: 0});
    } else if(this.state.selected === this.props.autocompleteItems.length - 1) {
      this.setState({selected: -1});
    } else {
      this.setState({selected: (this.state.selected + 1)});
    }
    this.scrollToSelectedItem();
    this.handleArrowSelected();
  }

  /**
   * check if an item is selected
   * @param key
   * @returns {boolean}
   */
  isItemSelected(key) {
    if (this.state.selected === null) {
      return false;
    } else {
      return key === this.state.selected;
    }
  }


  scrollToSelectedItem() {
    if (!this.props.autocompleteItems || this.props.autocompleteItems.length === 0 || this.state.selected === -1) {
      this.listRef.current.scrollTop = 0;
    } else {
      const totalHeight = this.listRef.current.scrollHeight;
      const itemHeight = totalHeight / this.props.autocompleteItems.length;
      const visibleHeight = this.listRef.current.clientHeight;
      const howManyFits = Math.round(visibleHeight / itemHeight);
      const fitOffset = visibleHeight - (itemHeight * howManyFits);
      const currentItemPosition = itemHeight * this.state.selected;
      const currentScroll = this.listRef.current.scrollTop;
      if ((currentItemPosition - fitOffset) < currentScroll) {
        this.listRef.current.scrollTop = this.listRef.current.scrollTop - visibleHeight;
        return;
      }
      if (currentItemPosition > (currentScroll + visibleHeight)) {
        this.listRef.current.scrollTop = currentItemPosition;
        return;
      }
    }
  }

  render() {
    return (
        <div className="autocomplete-wrapper">
          <div className="autocomplete-content scroll" ref={this.listRef}>
            <ul>
              {!this.state.processing && this.props.autocompleteItems && (this.props.autocompleteItems).map((tag, key) =>
                <AutocompleteItem key={key} id={key} slug={tag.slug} selected={this.isItemSelected(key)}
                                  onClick={this.handleSelect}/>
              )}
            </ul>
          </div>
        </div>
    )
  }
}

Autocomplete.propTypes = {
  id: PropTypes.string,
  autocompleteItems: PropTypes.array,
  onSelect: PropTypes.func,
  onArrowSelected: PropTypes.func,
  value: PropTypes.string
};

export default Autocomplete;
