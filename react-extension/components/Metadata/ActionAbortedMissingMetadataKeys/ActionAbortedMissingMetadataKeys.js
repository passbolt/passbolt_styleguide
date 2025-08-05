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
 * @since         5.4.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";

class ActionAbortedMissingMetadataKeys extends Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Close the dialog.
   */
  close() {
    this.props.onClose();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.close();
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    this.props.onClose();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper className="action-aborted-missing-metadata-keys-dialog"  title={this.translate("Action aborted")} onClose={this.handleCloseClick}>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-content">
            <p>
              <Trans>You cannot perform this action because you lack access to the shared metadata key.</Trans>
              <br/>
              <br/>
              <Trans>Please ask your administrator to share it with you.</Trans>
            </p>
          </div>
          <div className="submit-wrapper">
            <FormSubmitButton
              value={this.translate("Ok")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ActionAbortedMissingMetadataKeys.propTypes = {
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(ActionAbortedMissingMetadataKeys);
