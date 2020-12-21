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
 * @since        3.0.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import AppContext from "../../contexts/AppContext";

/**
 * This component tracks any navigation changes and handle it
 */
class HandleExtBoostrapAppHistoryRouteChanged extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleHistoryNavigationChanged();
  }

  /**
   * Whenever the history navigation changed. Basically here we want to intercept the back and next actions, and make
   * the ExtApp (iframe) navigate to its the previous or next entry of its history.
   * By blocking the navigation with react-router, it is enough to let the iframe catch it and navigate in its history
   * without reloading the page.
   */
  handleHistoryNavigationChanged() {
    this.props.history.block(() => {});
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <></>
    );
  }
}

HandleExtBoostrapAppHistoryRouteChanged.contextType = AppContext;
HandleExtBoostrapAppHistoryRouteChanged.propTypes = {
  history: PropTypes.object
};
export default withRouter(HandleExtBoostrapAppHistoryRouteChanged);

