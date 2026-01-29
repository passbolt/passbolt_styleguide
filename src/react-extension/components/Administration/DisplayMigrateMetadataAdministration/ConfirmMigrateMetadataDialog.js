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
 * @since         4.12.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";

class ConfirmMigrateMetadataDialog extends React.Component {
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
    this.props.confirm();
    this.props.onClose();
  }

  /**
   * Handle click on cancel buttons
   */
  async handleCancel() {
    this.props.cancel();
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
        className="confirm-migrate-metadata-dialog"
        title={this.props.t("Please confirm")}
        onClose={this.handleCancel}
        disabled={isDisabled}
      >
        <div className="form-content">
          <p>
            <strong>
              <Trans>Are you sure you want to migrate the selected items to use encrypted metadata?</Trans>
            </strong>
          </p>
          <p>
            <Trans>
              If you have integrations, you will have to make sure they are updated before triggering the migration.
            </Trans>
          </p>
          <p>
            <Trans>The operation may take a few minutes.</Trans>
          </p>
        </div>
        <div className="submit-wrapper clearfix">
          <button type="button" className="link cancel" onClick={this.handleCancel} disabled={isDisabled}>
            <Trans>Cancel</Trans>
          </button>
          <button type="button" className="button primary form" onClick={this.handleConfirm} disabled={isDisabled}>
            <Trans>Migrate</Trans>
          </button>
        </div>
      </DialogWrapper>
    );
  }
}

ConfirmMigrateMetadataDialog.propTypes = {
  cancel: PropTypes.func, // The cancelation callback
  confirm: PropTypes.func, // The confirmation callback
  onClose: PropTypes.func, // The onClose dialog callback
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ConfirmMigrateMetadataDialog);
