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
import {withRouter} from "react-router-dom";
import SearchBar from "../../Common/Navigation/Search/SearchBar";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withTranslation} from "react-i18next";

/**
 * This component allows to filter the list of users by text
 */
class FilterUsersByText extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSearchEvent = this.handleSearchEvent.bind(this);
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      text: '', // Current search text
      debounceTimeoutIt: null // Set the debounce timeout identifier
    };
  }

  /**
   * Whenever the component was updated
   */
  componentDidUpdate(previousProps) {
    this.handleFilterChanged(previousProps.userWorkspaceContext.filter);
  }

  /**
   * Whenever the component will unmount
   */
  componentWillUnmount() {
    clearTimeout(this.state.debounceTimeoutIt);
  }

  /**
   * Whenever the user filter changed
   */
  handleFilterChanged(previousFilter) {
    const wasTextFilter = previousFilter.type === UserWorkspaceFilterTypes.TEXT;
    const isTextFilter = this.props.userWorkspaceContext.filter.type === UserWorkspaceFilterTypes.TEXT;
    const isNotTextFilterAnymore = wasTextFilter && !isTextFilter;
    if (isNotTextFilterAnymore) {
      this.setState({text: ''});
    }
  }

  /**
   * Handle search input change
   * @params {string} text The entered text
   */
  handleSearchEvent(text) {
    this.search(text);
  }

  /**
   * Search for the text
   * @param text
   */
  search(text) {
    clearTimeout(this.state.debounceTimeoutId);
    const debounceTimeoutId = setTimeout(() => {
      const filter = {type: UserWorkspaceFilterTypes.TEXT, payload: text};
      this.props.history.push({pathname: '/app/users', state: {filter}});
    }, 300);
    this.setState({debounceTimeoutId, text});
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <SearchBar
        disabled={this.props.disabled}
        onSearch={this.handleSearchEvent}
        placeholder={this.props.t("Search users")}
        value={this.state.text} />
    );
  }
}

FilterUsersByText.propTypes = {
  disabled: PropTypes.bool, // The disable flag
  userWorkspaceContext: PropTypes.object, // The user workspace context
  history: PropTypes.object, // The router history
  t: PropTypes.func, // The translation function
};


export default withRouter(withUserWorkspace(withTranslation('common')(FilterUsersByText)));

