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
import Icon from "../../../../shared/components/Icons/Icon";

class DisplayContentTypesEncryptedMetadataAdministrationActions extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <ul>
            <li>
              <button type="button" disabled={this.props.isProcessing} onClick={this.props.onSaveRequested}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayContentTypesEncryptedMetadataAdministrationActions.propTypes = {
  isProcessing: PropTypes.bool, // The component is processing
  onSaveRequested: PropTypes.func, // The component save settings callback
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(DisplayContentTypesEncryptedMetadataAdministrationActions);
