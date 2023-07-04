/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";

/**
 * The component displays expired account recovery
 */
class DisplayExpiredAccountRecovery extends Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper className="expired-account-recover-dialog" title={this.props.t("Account recovery error")}
        onClose={this.handleClose}>
        <div className="form-content">
          <p>
            <Trans>Sorry, this account recovery request has expired and cannot be updated, or was already handled by another administrator.</Trans>
            &nbsp;<Trans>Please double check with the user in case they still need some help to log in.</Trans>
          </p>
        </div>
        <div className="submit-wrapper clearfix">
          <button type="button" className="primary" onClick={this.handleClose}>
            <Trans>Ok</Trans>
          </button>
        </div>
      </DialogWrapper>
    );
  }
}

DisplayExpiredAccountRecovery.propTypes = {
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};
export default withTranslation("common")(DisplayExpiredAccountRecovery);
