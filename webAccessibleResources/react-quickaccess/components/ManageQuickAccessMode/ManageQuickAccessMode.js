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
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";

class ManageQuickAccessMode extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleCloseOutsideWindowEvent();
    this.handleResizeWindow();
  }

  /**
   * Get the query parameters from the url
   * @returns {URLSearchParams}
   */
  get queryParameters() {
    return new URLSearchParams(this.props.location.search);
  }

  /**
   * Handle close outside window event
   */
  handleCloseOutsideWindowEvent() {
    const mustCloseWindow = this.props.context.getDetached()
      && this.props.context.getBootstrapFeature() !== null;
    if (mustCloseWindow) {
      const closeWindow = () => {
        if (this.props.context.shouldCloseAtWindowBlur) {
          window.close();
        }
      };
      window.addEventListener("blur", closeWindow);
    }
  }

  /**
   * Handle resize window.
   * When the quick access is in detached mode, request the BP to resize it when its height change to mimic the
   * native behaviour of the quickaccess opened from the toolbar.
   */
  handleResizeWindow() {
    const detachedMode = this.props.context.getDetached();
    if (detachedMode) {
      const handleWindowResized = entries => this.props.context.port.emit("passbolt.quickaccess.update-window-height", entries[0].target.clientHeight);
      const resizeObserver = new ResizeObserver(handleWindowResized);
      resizeObserver.observe(document.body);
    }
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

ManageQuickAccessMode.propTypes = {
  history: PropTypes.any, // The router history
  location: PropTypes.any, // The router location
  context: PropTypes.any, // The application context
};

export default withAppContext(withRouter(ManageQuickAccessMode));
