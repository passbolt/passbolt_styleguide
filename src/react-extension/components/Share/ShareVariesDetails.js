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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";

/**
 * Tooltip body listing the permission the recipient has on each of the shared items.
 */
class ShareVariesDetails extends Component {
  /**
   * Get the permission labels per permission type, 0 standing for no permission at all.
   * @returns {object}
   */
  get permissionLabels() {
    return {
      0: this.props.t("No access"),
      1: this.props.t("Can read"),
      7: this.props.t("Can edit"),
      15: this.props.t("Is owner"),
    };
  }

  /**
   * Flatten the item names grouped per permission type into one entry per item, sorted by name so
   * that the truncation always drops the same items.
   * @returns {Array<{name: string, type: int}>}
   */
  get details() {
    return Object.entries(this.props.variesDetails)
      .flatMap(([type, names]) => names.map((name) => ({ name, type: parseInt(type, 10) })))
      .sort((detail, otherDetail) => detail.name.localeCompare(otherDetail.name));
  }

  render() {
    const details = this.details;
    const displayedDetails = details.slice(0, ShareVariesDetails.DISPLAY_LIMIT);
    return (
      <span className="share-varies-details">
        <span>{this.props.t("{{count}} permissions vary:", { count: details.length })}</span>
        {displayedDetails.map((detail, index) => (
          <span className="varies-detail" key={`${index}-${detail.name}`}>
            <span className="ellipsis">
              • <strong>{detail.name}</strong>
            </span>
            <span className="varies-detail-permission">({this.permissionLabels[detail.type]})</span>
          </span>
        ))}
        {details.length > displayedDetails.length && (
          <span>
            <Trans>and more...</Trans>
          </span>
        )}
      </span>
    );
  }
}

ShareVariesDetails.DISPLAY_LIMIT = 3;

ShareVariesDetails.propTypes = {
  variesDetails: PropTypes.object, // {type: [item1, ...itemN]} The item names grouped per permission type
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ShareVariesDetails);
