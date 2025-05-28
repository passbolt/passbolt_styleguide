/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.2.0
 */
import React from "react";
import PropTypes from "prop-types";
import sanitizeUrl, {urlProtocols} from "../../../lib/Sanitize/sanitizeUrl";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";

const linkAuthorizedProtocols = [
  urlProtocols.FTP,
  urlProtocols.FTPS,
  urlProtocols.HTTPS,
  urlProtocols.HTTP,
  urlProtocols.SSH
];

class DisplayResourceUrisBadge extends React.Component {
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
   * Handle click on uri
   * @param {string} safeUri The safe URI to open in the new window.
   */
  handleClick(safeUri) {
    window.open(safeUri, '_blank', 'noopener,noreferrer');
  }

  /**
   * Get the additional uris links
   * @returns {Element}
   */
  get additionalUrisLinks() {
    return (
      <div className="list-uris">
        {this.props.additionalUris?.map((uri, index) => {
          const safeUri = this.safeLink(uri);
          if (safeUri) {
            return <button className="link" key={index} type="button" onClick={() => this.handleClick(safeUri)}><span className="ellipsis">{uri}</span></button>;
          }
          return <span className="link ellipsis" key={index}>{uri}</span>;
        })
        }
      </div>
    );
  }

  /**
   * Get the number of additional uris
   * @returns {string}
   */
  get numberOfUris() {
    const urisLength = this.props.additionalUris?.length;
    if (urisLength > 99) {
      return "99+";
    }
    return `+${urisLength}`;
  }
  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <div className="badge">
        <TooltipPortal direction="bottom" message={this.additionalUrisLinks} className="additional-uris">
          <span className="count">{this.numberOfUris}</span>
        </TooltipPortal>
      </div>
    );
  }
}


DisplayResourceUrisBadge.propTypes = {
  additionalUris: PropTypes.arrayOf(PropTypes.string), // The uris
};

export default DisplayResourceUrisBadge;
