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
 * @since         5.16.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import ShareDetailsList from "./ShareDetailsList";
import { getSharePermissionLabels } from "./SharePermissionLabels";

/**
 * On a move, tells the operator which items their choice cannot reach for one recipient.
 * Those are the items the operator does not own, which move with their permissions unchanged.
 * Each one is listed with the level that would have applied, "Resource A (Can edit)" for instance.
 * Same shape as ShareVariesDetails, so both tooltips read alike. This one is warning-tinted.
 */
class ShareUnchangeableDetails extends Component {
  render() {
    const resources = this.props.resources ?? [];
    const permissionLabels = getSharePermissionLabels(this.props.t);
    return (
      <ShareDetailsList
        header={this.props.t("{{count}} permissions cannot apply:", { count: resources.length })}
        items={resources.map(({ name, type }) => ({ name, detail: permissionLabels[type] }))}
      />
    );
  }
}

ShareUnchangeableDetails.propTypes = {
  resources: PropTypes.array, // [{name, type}] the items the choice cannot reach, and the level it would apply
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ShareUnchangeableDetails);
