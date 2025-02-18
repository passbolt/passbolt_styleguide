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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {Trans, withTranslation} from "react-i18next";
import Tab from "../../Common/Tab/Tab";
import Tabs from "../../Common/Tab/Tabs";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";

class ResourceCreationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  get defaultState() {
    return {
      processing: false,
    };
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <DialogWrapper title={this.translate("Create a resource")} className="create-resource-menu"
        disabled={this.state.processing} onClose={this.handleClose}>
        <div className="dialog-body">
          <Tabs activeTabName='resourceV5'>
            <Tab key='resourceV5' name={this.props.t('Resources with encrypted metadata')} type='resourceV5'>
              <div className="grid">
                <button id="password_action" type="button" className="button-transparent card">
                  <KeySVG/>
                  <div className="card-information">
                    <span className="title"><Trans>Password</Trans></span>
                    <span className="info"><Trans>Resource description</Trans></span>
                  </div>
                </button>
                <button id="totp_action" type="button" className="button-transparent card">
                  <TotpSVG/>
                  <div className="card-information">
                    <span className="title"><Trans>TOTP</Trans></span>
                    <span className="info"><Trans>Resource description</Trans></span>
                  </div>
                </button>
              </div>
            </Tab>
            <Tab key='resourceV4' name={this.props.t('Legacy resources')} type='resourceV4'>
              <div className="grid">
                <button id="password_action" type="button" className="button-transparent card">
                  <KeySVG/>
                  <div className="card-information">
                    <span className="title"><Trans>Password</Trans></span>
                    <span className="info"><Trans>Resource description</Trans></span>
                  </div>
                </button>
                <button id="totp_action" type="button" className="button-transparent card">
                  <TotpSVG/>
                  <div className="card-information">
                    <span className="title"><Trans>TOTP</Trans></span>
                    <span className="info"><Trans>Resource description</Trans></span>
                  </div>
                </button>
              </div>
            </Tab>
          </Tabs>

        </div>
      </DialogWrapper>
    );
  }
}

ResourceCreationMenu.propTypes = {
  folderParentId: PropTypes.string, // The folder parent id
  onClose: PropTypes.func, // Whenever the component must be closed
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(ResourceCreationMenu);

