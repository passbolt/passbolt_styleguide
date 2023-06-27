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
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

class FilterResourcesByText extends Component {
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
    this.handleFilterChanged(previousProps.resourceWorkspaceContext.filter);
  }

  /**
   * Whenever the component will unmount
   */
  componentWillUnmount() {
    clearTimeout(this.state.debounceTimeoutIt);
  }

  /**
   * Whenever the resource filter changed
   */
  handleFilterChanged(previousFilter) {
    const wasTextFilter = previousFilter.type === ResourceWorkspaceFilterTypes.TEXT;
    const isTextFilter = this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.TEXT;
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
      const filter = this.generateFilter(text);
      this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }, 300);
    this.setState({debounceTimeoutId, text});
  }

  /**
   * Generate the filter to apply on resources
   * @param text
   * @returns {{payload, type: string}|{type: string}}
   */
  generateFilter(text) {
    if (text.length > 0) {
      return {type: ResourceWorkspaceFilterTypes.TEXT, payload: text};
    }
    return {type: ResourceWorkspaceFilterTypes.ALL};
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
        placeholder={this.props.placeholder}
        value={this.state.text} />
    );
  }
}

FilterResourcesByText.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  resourceWorkspaceContext: PropTypes.object,
  history: PropTypes.object
};

FilterResourcesByText.defaultProps = {
  disabled: false,
  placeholder: 'Search',
};

export default withRouter(withResourceWorkspace(FilterResourcesByText));

