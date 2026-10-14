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
 * Tooltip body listing the items a recipient's permission cannot be applied to, with the level that
 * would have applied: "Resource A (Can edit)". Same shape as ShareVariesDetails, warning-tinted.
 */
class ShareUnappliedDetails extends Component {
  render() {
    const permissionLabels = getSharePermissionLabels(this.props.t);
    return (
      <ShareDetailsList
        header={this.props.t("{{count}} permissions cannot apply:", { count: this.props.resources.length })}
        items={this.props.resources.map(({ name, type }) => ({ name, detail: permissionLabels[type] }))}
      />
    );
  }
}

ShareUnappliedDetails.propTypes = {
  resources: PropTypes.array.isRequired, // [{name, type}] the items the choice cannot reach, and the level it would apply
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ShareUnappliedDetails);
