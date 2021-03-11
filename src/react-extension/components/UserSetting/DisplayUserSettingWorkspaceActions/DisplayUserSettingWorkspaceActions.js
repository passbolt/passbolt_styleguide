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
 * @since         2.13.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import EditUserProfile from "../EditUserProfile/EditUserProfile";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component is a container of multiple actions applicable on user settings
 */
class DisplayUserSettingsWorkspaceActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDownloadPublicKey = this.handleDownloadPublicKey.bind(this);
    this.handleDownloadPrivateKey = this.handleDownloadPrivateKey.bind(this);
  }

  /**
   * Whenever the user wants to edit his profile
   */
  handleEdit() {
    this.props.dialogContext.open(EditUserProfile);
  }

  /**
   * Whenever the user wants to download his public key
   */
  async handleDownloadPublicKey() {
    await this.context.port.request("passbolt.keyring.download-my-public-key");
  }

  /**
   * Whenever the user wants to download his private key
   */
  async handleDownloadPrivateKey() {
    await this.context.port.request("passbolt.keyring.download-my-private-key");
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
    const {path} = this.props.match;
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <ul className="ready">
            <Route path={`${path}/profile`}>
              <li>
                <a
                  className="button ready"
                  onClick={this.handleEdit}>
                  <Icon name="edit"/>
                  <span><Trans>Edit</Trans></span>
                </a>
              </li>
            </Route>
            <Route path={`${path}/keys`}>
              <li>
                <a
                  className="button ready"
                  onClick={this.handleDownloadPublicKey}>
                  <Icon name="download"/>
                  <span><Trans>Public</Trans></span>
                </a>
              </li>
              <li>
                <a
                  className="button ready"
                  onClick={this.handleDownloadPrivateKey}>
                  <Icon name="download"/>
                  <span><Trans>Private</Trans></span>
                </a>
              </li>
            </Route>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserSettingsWorkspaceActions.contextType = AppContext;

DisplayUserSettingsWorkspaceActions.propTypes = {
  match: PropTypes.object, // The router match
  dialogContext: PropTypes.any, // the dialog context
  t: PropTypes.func, // The translation function
};

export default withRouter(withDialog(withTranslation('common')(DisplayUserSettingsWorkspaceActions)));
