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
import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import sanitizeUrl, { urlProtocols } from "../../../react-extension/lib/Sanitize/sanitizeUrl";
import DisplayResourceUrisBadge from "../../../react-extension/components/Resource/DisplayResourceUrisBadge/DisplayResourceUrisBadge";

/**
 * This component represents a table cell link
 */
class CellUris extends Component {
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
   * @param {Event} event
   * @param {string} safeLink
   */
  handleClick(event, safeLink) {
    event.stopPropagation();
    this.props.onClick(safeLink);
  }

  /**
   * Get safe uri of a resource
   * @param {string} link The resource to get the safe uri for
   * @return {string}
   */
  safeLink(link) {
    return (
      sanitizeUrl(link, {
        whiteListedProtocols: linkAuthorizedProtocols,
        defaultProtocol: urlProtocols.HTTPS,
      }) || ""
    );
  }

  /**
   * Get the main uri
   * @return {string}
   */
  get mainUri() {
    return this.props.value?.[0];
  }

  /**
   * Get the additional uris
   * @return {Array<string>}
   */
  get additionalUris() {
    return this.props.value?.slice(1);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const safeLink = this.safeLink(this.mainUri);
    return (
      <div>
        {safeLink && (
          <button
            title={this.mainUri}
            className="no-border ellipsis"
            type="button"
            onClick={(event) => this.handleClick(event, safeLink)}
          >
            <span>{this.mainUri}</span>
          </button>
        )}
        {!safeLink && <span title={this.mainUri}>{this.mainUri}</span>}
        {this.additionalUris?.length > 0 && <DisplayResourceUrisBadge additionalUris={this.additionalUris} />}
      </div>
    );
  }
}

CellUris.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string), // The value to display
  onClick: PropTypes.func, // The onClick event function
};

export default memo(CellUris);

const linkAuthorizedProtocols = [
  urlProtocols.FTP,
  urlProtocols.FTPS,
  urlProtocols.HTTPS,
  urlProtocols.HTTP,
  urlProtocols.SSH,
];
