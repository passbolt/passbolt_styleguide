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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import GetStartedDesktop from "../GetStarted/GetStartedDesktop";
import {
  ImportAccountKitWorkflowStates,
  withImportAccountKitContext,
} from "../../../contexts/Desktop/ImportAccountKitContext";
import ImportAccountKit from "../ImportAccountKit/ImportAccountKit";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import ImportAccoutKitDetails from "../ImportAccoutKitDetails/ImportAccoutKitDetails";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";

/**
 * The component orchestrates the ao authentication box main content.
 */
class OrchestrateAccountKitImportation extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.importAccountKitContext.state) {
      case ImportAccountKitWorkflowStates.GET_STARTED:
        return <GetStartedDesktop />;
      case ImportAccountKitWorkflowStates.IMPORT_ACCOUNT_KIT:
        return <ImportAccountKit />;
      case ImportAccountKitWorkflowStates.VERIFY_PASSPHRASE:
        return <ImportAccoutKitDetails />;
      case ImportAccountKitWorkflowStates.IMPORTING_ACCOUNT:
        return <LoadingSpinner title={this.props.t("Importing account kit")} />;
      case ImportAccountKitWorkflowStates.SIGNING_IN:
        return <LoadingSpinner title={this.props.t("Sign in")} />;
      case ImportAccountKitWorkflowStates.UNEXPECTED_ERROR_STATE:
        return <DisplayUnexpectedError error={this.props.importAccountKitContext.unexpectedError} />;
    }
  }
}
OrchestrateAccountKitImportation.propTypes = {
  t: PropTypes.func, // The translation function
  context: PropTypes.any.isRequired, // The application context
  importAccountKitContext: PropTypes.any.isRequired, // The import account kit context
};
export default withAppContext(withImportAccountKitContext(withTranslation("common")(OrchestrateAccountKitImportation)));
