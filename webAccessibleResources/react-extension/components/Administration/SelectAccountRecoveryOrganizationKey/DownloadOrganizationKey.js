/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";

/**
 * This component allows to display the create recover account for the administration
 */
class DownloadOrganizationKey extends React.Component {
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
   * @returns {*}
   */
  get defaultState() {
    return {
      processing: false, // component is processing or not
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={this.props.t("Confirm Organization Recovery Key download")}
        onClose={this.handleCloseClick}
        disabled={false}
        className="organization-recover-key-download-dialog">
        <div className="dialog-body">
          <p><Trans>A download of the organization private key has automatically started.</Trans><br /><Trans>Make sure your print it or store it in a safe place. You may need it later!</Trans></p>
        </div>
        <div className="dialog-footer clearfix">
          <button
            className="button button-left cancel medium"
            type="button"
            onClick={this.props.handleDownloadAgain}>
            <Trans>Download again</Trans>
          </button>
          <button
            className="button primary"
            type='button'
            onClick={this.handleCloseClick}
            disabled={this.isProcessing}>
            <span><Trans>Ok</Trans></span>
          </button>
        </div>
      </DialogWrapper>
    );
  }
}

DownloadOrganizationKey.propTypes = {
  onClose: PropTypes.func,
  handleDownloadAgain: PropTypes.func,
  privateKey: PropTypes.string,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(DownloadOrganizationKey);
