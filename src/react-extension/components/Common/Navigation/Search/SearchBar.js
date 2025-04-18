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
import Icon from "../../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";

class SearchBar extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
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

  get placeholderLabel() {
    return this.props.placeholder || this.props.t("Search");
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="col2 search-wrapper">
        <form className="search" onSubmit={this.handleOnSubmitEvent}>
          <div className={`input search required ${this.props.disabled ? 'disabled' : ''}`}>
            <label className="visuallyhidden"><Trans>Search</Trans></label>
            <input ref={this.searchInputRef} className="required" type="search"
              disabled={this.props.disabled}
              onChange={this.handleChangeEvent}
              placeholder={this.placeholderLabel}
              value={this.props.value}/>
            <div className="search-button-wrapper">
              <button className="button button-transparent" value={this.placeholderLabel} onBlur={this.handleSubmitButtonBlur} onFocus={this.handleSubmitButtonFocus} type="submit" disabled={this.props.disabled ? 'disabled' : ''}>
                <Icon name="search"/>
                <span className="visuallyhidden"><Trans>{this.placeholderLabel}</Trans></span>
              </button>
            </div>
          </div>
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
  t: PropTypes.func, // The translation function
};

SearchBar.defaultProps = {
  disabled: false,
};

export default withTranslation("common")(SearchBar);
