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
import {Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class HandleRouteFallback extends Component {
  /**
   * Get the pathname from the url parameter.
   * By instance ?pathname=/app/users
   *
   * @returns {string}
   */
  getPathnameFromUrlParameter() {
    const pathname = new URLSearchParams(this.props.location.search).get("pathname");

    if (!this.validatePathname(pathname)) {
      return "";
    }

    return pathname;
  }

  /**
   * Validate a pathname.
   * A valid pathname contains only alphabetical, numerical, / and - characters
   * @param {string} pathname
   * @returns {boolean}
   */
  validatePathname(pathname) {
    return /^[A-Za-z0-9\-\/]*$/.test(pathname);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const pathname = this.getPathnameFromUrlParameter();

    return (
      <>
        {pathname &&
        <Redirect to={pathname}/>
        }
        {!pathname &&
        <Redirect to="/app/passwords"/>
        }
      </>
    );
  }
}

HandleRouteFallback.propTypes = {
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(HandleRouteFallback);
