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
 * @since         4.11.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import SpinnerSVG from "../../../../img/svg/spinner.svg";

class DisplayContentTypesMetadataKeyAdministrationActions extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="actions-wrapper">
        <button type="button" className={`button primary form ${this.props.isProcessing ? "processing" : ""}`} disabled={this.props.isDisabled} onClick={this.props.onSaveRequested}>
          <span><Trans>Save</Trans></span>
          {this.props.isProcessing &&
            <SpinnerSVG/>
          }
        </button>
      </div>
    );
  }
}

DisplayContentTypesMetadataKeyAdministrationActions.propTypes = {
  isProcessing: PropTypes.bool, // The component is processing
  isDisabled: PropTypes.bool, // The component is processing
  onSaveRequested: PropTypes.func, // The component save settings callback
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(DisplayContentTypesMetadataKeyAdministrationActions);
