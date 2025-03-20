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
 * @since         4.3.0
 */

import React from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {ImportAccountKitWorkflowStates, withImportAccountKitContext} from "../../../contexts/Desktop/ImportAccountKitContext";

class GetStartedDesktop extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleStart = this.handleStart.bind(this);
  }

  /**
   * Handle start button click.
   * @returns {void}
   */
  handleStart() {
    this.props.importAccountKitContext.navigate(ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT);
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="get-started-desktop">
        <h1><Trans>Get started !</Trans></h1>
        <p className="get-started-description">
          <Trans>You need to upload an account kit to start using the desktop app. </Trans> <br/>
          <Trans>Please follow these instructions:</Trans>
        </p>
        <p><span className="step">1</span>Authenticate on your browser extension</p>
        <p><span className="step">2</span>Go to your profile</p>
        <p><span className="step">3</span>Go to the Desktop app setup section</p>
        <p><span className="step">4</span>Download the account kit</p>
        <div className="form-actions">
          <button
            type="button"
            onClick={this.handleStart}
            className="button primary form">
            <Trans>Start</Trans>
          </button>
        </div>
      </div>
    );
  }
}

GetStartedDesktop.propTypes = {
  t: PropTypes.func, // The translation function
  importAccountKitContext: PropTypes.any.isRequired, // The import account kit context
};

export default withImportAccountKitContext(withTranslation('common')(GetStartedDesktop));
