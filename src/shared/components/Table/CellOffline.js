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
import GreenDot from "../../../img/svg/offline_dot_green.svg";
import RedDot from "../../../img/svg/offline_dot_red.svg";
import GrayDot from "../../../img/svg/offline_dot_gray.svg";

/**
 * This component represents a table cell for displaying if resources are offline available or not
 */
class CellOffline extends Component {
  render() {
    const isSupported = this.props.isSupported(this.props.value);

    return (
      <div className="cell-offline">
        {isSupported ? (
          this.props.value.offline ? (
            <>
              <GreenDot className="available-offline" />
              <Trans>Yes</Trans>
            </>
          ) : (
            <>
              <RedDot className="unavailable-offline" />
              <Trans>No</Trans>
            </>
          )
        ) : (
          <>
            <GrayDot className="not-supported-offline" />
            <Trans>Not supported</Trans>
          </>
        )}
      </div>
    );
  }
}

CellOffline.propTypes = {
  value: PropTypes.object.isRequired, // The resource value with an offline property
  isSupported: PropTypes.func, // is supported resource function property
};

export default memo(CellOffline);
