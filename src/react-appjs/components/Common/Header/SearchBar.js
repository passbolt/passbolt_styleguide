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

class SearchBar extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      placeholder : this.props.placeholder || "Search",
      disabled : this.props.disabled || false,
    }
  }

  render() {
    return (
      <div className="col2 search-wrapper">
          <form className="search">
            <div className="input search required">
              <label htmlFor="js_app_filter_keywords">Search</label>
              <input className="required" maxLength="50" type="search" disabled={this.state.disabled ? 'disabled' : ''}  placeholder={this.state.placeholder} />
            </div>
            <button value="search" disabled={this.state.disabled ? 'disabled' : ''}>
            <span className="svg-icon icon-only search">
              <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"></path></svg>
            </span>
            <span className="visuallyhidden">Search</span>
            </button>
          </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

SearchBar.defaultProps = {
  placeholder: 'Search',
  disabled: false,
};

export default SearchBar;

