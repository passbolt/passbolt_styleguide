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
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import RevertSVG from "../../../img/svg/revert.svg";

class SharePermissionRevertButton extends Component {
  handleRevertClick() {
    this.props.onRevert();
  }

  getClassName() {
    let className = "revert-item button inline button-transparent";
    if (this.props.disabled) {
      className += " disabled";
    }
    return className;
  }

  render() {
    return (
      <button type="button" className={this.getClassName()} onClick={this.handleRevertClick.bind(this)}>
        <RevertSVG />
        <span className="visually-hidden">
          <Trans>Revert</Trans>
        </span>
      </button>
    );
  }
}
SharePermissionRevertButton.propTypes = {
  onRevert: PropTypes.func,
  disabled: PropTypes.bool,
};

export default withTranslation("common")(SharePermissionRevertButton);
