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
 * @since        3.6.0
 */
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// The default path to redirect the users to.
const DEFAULT_PATH_NAME = "/app/passwords";

/**
 * Handle the application first load route.
 * When the iframe is loaded the url is pointing to the html document and the path the user is aiming is provided in
 * the url query parameters (pathname). Parse the url, and redirect the user to the right place.
 */
class HandleApplicationFirstLoadRoute extends Component {
  /**
   * Get the pathname from the url parameter.
   * By instance ?pathname=/app/users
   * @returns {string} If the pathname does not validate return an empty string.
   */
  getPathnameFromUrlParameter() {
    const pathname = new URLSearchParams(this.props.location.search).get("pathname");

    if (!this.validatePathname(pathname)) {
      return "";
    }

    return pathname;
  }

  /**
   * Get the action from the url parameter.
   * @returns {string} If the action does not validate return an empty string.
   */
  getActionFromUrlParameter() {
    const action = new URLSearchParams(this.props.location.search).get("action");

    if (!this.validateAction(action)) {
      return "";
    }

    return action;
  }

  /**
   * Validate an action.
   * @param {string|null} action The action to test
   * @returns {boolean}
   */
  validateAction(action) {
    return action === "edit";
  }

  /**
   * Validate a pathname.
   * A valid pathname contains only alphabetical, numerical, / and - characters
   * @param {string} pathname The pathname to test
   * @returns {boolean}
   */
  validatePathname(pathname) {
    return /^[A-Z/-9\-]*$/i.test(pathname);
  }

  /**
   * The first uri to redirect too.
   * @returns {string}
   */
  get pathnameToRedirectTo() {
    const pathname = this.getPathnameFromUrlParameter();
    if (!pathname) {
      return DEFAULT_PATH_NAME;
    }
    return pathname;
  }

  /**
   * The first search query to redirect to.
   * @returns {string}
   */
  get searchToRedirectTo() {
    const action = this.getActionFromUrlParameter();
    if (!action) {
      return "";
    }

    return `?action=${action}`;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return <Redirect to={{ pathname: this.pathnameToRedirectTo, search: this.searchToRedirectTo }} />;
  }
}

HandleApplicationFirstLoadRoute.propTypes = {
  location: PropTypes.object, // From router HOC
};

export default withRouter(HandleApplicationFirstLoadRoute);
