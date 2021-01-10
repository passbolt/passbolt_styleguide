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
import Icon from "../../Icons/Icon";

class SearchBar extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.createReferences();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleOnSubmitEvent = this.handleOnSubmitEvent.bind(this);
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {};
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.searchInputRef = React.createRef();
  }

  /**
   * Handle search input change
   * @params {ReactEvent} The react event.
   */
  handleChangeEvent(event) {
    const target = event.target;
    const text = target.value;
    if (this.props.onSearch) {
      this.props.onSearch(text);
    }
  }

  /**
   * Handle on submit
   * @params {ReactEvent} The react event.
   */
  handleOnSubmitEvent(event) {
    event.preventDefault();
    if (this.props.onSearch) {
      const text = this.searchInputRef.current.value;
      this.props.onSearch(text);
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="col2 search-wrapper">
        <form className="search" onSubmit={this.handleOnSubmitEvent}>
          <div className="input search required">
            <label>Search</label>
            <input ref={this.searchInputRef} className="required" type="search"
              disabled={this.props.disabled ? 'disabled' : ''}
              onChange={this.handleChangeEvent}
              placeholder={this.props.placeholder}
              value={this.props.value}/>
          </div>
          <button value="search" type="submit" disabled={this.props.disabled ? 'disabled' : ''}>
            <Icon name="search"/>
            <span className="visuallyhidden">Search</span>
          </button>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  disabled: PropTypes.bool,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

SearchBar.defaultProps = {
  disabled: false,
  placeholder: 'Search',
};

export default SearchBar;
