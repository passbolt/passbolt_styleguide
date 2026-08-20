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
 * @since         5.15.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";

/**
 * Tooltip body listing the shared items, one per line. The items beyond the display limit collapse
 * into an "and more..." line.
 */
class ShareDetailsList extends Component {
  render() {
    const displayedItems = this.props.items.slice(0, ShareDetailsList.DISPLAY_LIMIT);
    return (
      <span className="share-details-list">
        {this.props.header && <span>{this.props.header}</span>}
        {displayedItems.map((item, index) => (
          <span className="share-details-item" key={`${index}-${item.name}`}>
            <span className="ellipsis">
              • <strong>{item.name}</strong>
            </span>
            {item.detail && <span className="share-details-item-detail">({item.detail})</span>}
          </span>
        ))}
        {this.props.items.length > displayedItems.length && (
          <span>
            <Trans>and more...</Trans>
          </span>
        )}
      </span>
    );
  }
}

ShareDetailsList.DISPLAY_LIMIT = 3;

ShareDetailsList.propTypes = {
  header: PropTypes.node, // An optional line rendered above the items
  items: PropTypes.array.isRequired, // [{name: <string>, detail: <string>}] the detail being optional
};

export default ShareDetailsList;
