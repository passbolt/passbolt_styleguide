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

class PasswordSearchBar extends Component {
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
    return {};
  }

  get value() {
    const hasTextFilter = this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.TEXT;
    return hasTextFilter ? this.props.resourceWorkspaceContext.filter.payload : '';
  }

  /**
   * Handle search input change
   * @params {ReacEvent} The react event.
   */
  handleSearchEvent(event) {
    const target = event.target;
    const text = target.value;
    const filter = {type: ResourceWorkspaceFilterTypes.TEXT, payload: text};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
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
        value={this.value} />
    );
  }
}

PasswordSearchBar.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  resourceWorkspaceContext: PropTypes.object,
  history: PropTypes.object
};

PasswordSearchBar.defaultProps = {
  disabled: false,
  placeholder: 'Search',
};

export default withRouter(withResourceWorkspace(PasswordSearchBar));
