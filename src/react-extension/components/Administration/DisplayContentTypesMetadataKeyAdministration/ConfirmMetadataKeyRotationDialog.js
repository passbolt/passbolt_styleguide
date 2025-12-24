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
 * @since         5.6.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";
import { formatDateTimeAgo } from "../../../../shared/utils/dateUtils";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";

class ConfirmMetadataKeyRotationDialog extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      processing: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * Handle click on migrate button
   * @param {Event} event A form submit event
   */
  async handleConfirm(event) {
    event.preventDefault();
    this.props.onConfirm();
    this.props.onClose();
  }

  /**
   * Handle click on cancel buttons
   */
  async handleCancel() {
    this.props.onClose();
  }

  /**
   * Returns true if the input must be disabled.
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isDisabled = this.hasAllInputDisabled();
    return (
      <DialogWrapper
        className="confirm-metadata-key-rotation-dialog"
        title={this.props.t("Please confirm")}
        onClose={this.handleCancel}
        disabled={isDisabled}
      >
        <div className="form-content">
          <label>
            <Trans>New shared Metadata key</Trans>
          </label>
          <div className="metadata-key-info">
            <table className="table-info">
              <tbody>
                <tr className="fingerprint">
                  <td className="label">
                    <Trans>Fingerprint</Trans>
                  </td>
                  <td className="value">
                    <Fingerprint fingerprint={this.props.metadataKeyInfo.fingerprint} />
                  </td>
                </tr>
                <tr className="algorithm">
                  <td className="label">
                    <Trans>Algorithm</Trans>
                  </td>
                  <td className="value">{this.props.metadataKeyInfo.algorithm}</td>
                </tr>
                <tr className="created">
                  <td className="label">
                    <Trans>Created</Trans>
                  </td>
                  {this.props.metadataKeyInfo.created && (
                    <td className="value" title={this.props.metadataKeyInfo.created}>
                      {formatDateTimeAgo(this.props.metadataKeyInfo.created, this.props.t, this.props.context.locale)}
                    </td>
                  )}
                  {!this.props.metadataKeyInfo.created && (
                    <td className="empty-value">
                      <Trans>Pending</Trans>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <Trans>This operation may take a few minutes.</Trans>
          </p>
        </div>
        <div className="submit-wrapper clearfix">
          <button type="button" className="link cancel" onClick={this.handleCancel} disabled={isDisabled}>
            <Trans>Cancel</Trans>
          </button>
          <button type="button" className="button primary form" onClick={this.handleConfirm} disabled={isDisabled}>
            <Trans>Rotate key</Trans>
          </button>
        </div>
      </DialogWrapper>
    );
  }
}

ConfirmMetadataKeyRotationDialog.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  metadataKeyInfo: PropTypes.object, // The metadata key info
  onConfirm: PropTypes.func, // The confirmation callback
  onClose: PropTypes.func, // The onClose dialog callback
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(ConfirmMetadataKeyRotationDialog));
