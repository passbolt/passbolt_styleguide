/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */
import React, {Component, memo} from "react";
import PropTypes from "prop-types";
import sanitizeUrl, {urlProtocols} from "../../../react-extension/lib/Sanitize/sanitizeUrl";

/**
 * This component represents a table cell link
 */
class CellLink extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Initialize the bindCallback
   */
  bindCallbacks() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle click
   * @param event
   */
  handleClick(event) {
    event.stopPropagation();
    this.props.onClick(this.value);
  }

  /**
   * Get safe uri of a resource
   * @param {string} link The resource to get the safe uri for
   * @return {string}
   */
  safeLink(link) {
    return sanitizeUrl(
      link, {
        whiteListedProtocols: linkAuthorizedProtocols,
        defaultProtocol: urlProtocols.HTTPS
      }) || "";
  }

  /**
   * Get the value
   * @return {Object}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const safeLink = this.safeLink(this.value);
    return (
      <div title={this.value}>
        {safeLink &&
          <button className="no-border" type="button" onClick={this.handleClick}><span>{this.value}</span></button>
        }
        {!safeLink &&
          <span>{this.value}</span>
        }
      </div>
    );
  }
}

CellLink.propTypes = {
  value: PropTypes.string, // The value to display
  onClick: PropTypes.func, // The onClick event function
};

export default memo(CellLink);

const linkAuthorizedProtocols = [
  urlProtocols.FTP,
  urlProtocols.FTPS,
  urlProtocols.HTTPS,
  urlProtocols.HTTP,
  urlProtocols.SSH
];
