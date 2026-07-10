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
 * @since         5.13.0
 */
import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";

/**
 * This component represents a table cell for displaying if resources are offline available or not
 */
class CellOffline extends Component {
  render() {
    return <span>{this.props.value ? <Trans>Available offline</Trans> : <Trans>Not available offline</Trans>}</span>;
  }
}

CellOffline.propTypes = {
  value: PropTypes.object, // The resource value with an offline property
};

export default memo(CellOffline);
