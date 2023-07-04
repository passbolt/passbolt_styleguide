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

class InsertAppIframe extends Component {
  constructor(props) {
    super(props);
    this.createRefs();
  }

  componentDidMount() {
    this.loadAppIframe();
  }

  createRefs() {
    this.iframeRef = React.createRef();
  }

  /**
   * Load the react app iframe
   * @returns {void}
   */
  async loadAppIframe() {
    const portId = await this.props.port.request("passbolt.port.generate-id", "App");
    const url = new URL(`${this.props.browserExtensionUrl}webAccessibleResources/passbolt-iframe-app.html`);
    url.searchParams.append("passbolt", portId);

    // If the user aims to a location, extract it and add it as parameter of the iframe url.
    const pathname = this.getPagePathname();
    if (pathname && pathname !== "/") {
      url.searchParams.append("pathname", pathname);
    }

    this.iframeRef.current.contentWindow.location = url.toString();
  }

  /**
   * Get the pathname from url.
   * By instance ?pathname=/app/users
   *
   * @returns {string|null} Return null if the pathname doesn't validate
   */
  getPagePathname() {
    if (!this.validatePagePathname()) {
      return null;
    }

    return this.props.location.pathname;
  }

  /**
   * Validate a pathname.
   * A valid pathname contains only alphabetical, numerical, / and - characters
   * @returns {boolean}
   */
  validatePagePathname() {
    return /^[A-Za-z0-9\-\/]*$/.test(this.props.location.pathname);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <iframe id="passbolt-iframe-app" ref={this.iframeRef} className="full-screen" allow={`clipboard-write ${this.props.browserExtensionUrl}webAccessibleResources/passbolt-iframe-app.html`}/>
    );
  }
}

InsertAppIframe.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  location: PropTypes.object, // Router location prop
  port: PropTypes.object, // The communication port
};

export default withRouter(InsertAppIframe);
