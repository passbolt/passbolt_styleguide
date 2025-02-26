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
import {Trans, withTranslation} from "react-i18next";
import Password from "../../../../shared/components/Password/Password";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import Tabs from "../../Common/Tab/Tabs";
import Tab from "../../Common/Tab/Tab";
import Select from "../../Common/Select/Select";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import Totp from "../../../../shared/components/Totp/Totp";
import CopySVG from "../../../../img/svg/copy.svg";
import TimerSVG from "../../../../img/svg/timer.svg";
import QrCodeSVG from "../../../../img/svg/qr_code.svg";

class AddResourceTotp extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      displayAdvancedSettings: false,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleDisplayAdvancedSettingsClick = this.handleDisplayAdvancedSettingsClick.bind(this);
  }

  /**
   * Handles the click on the display secrets button.
   */
  handleDisplayAdvancedSettingsClick() {
    this.setState({displayAdvancedSettings: !this.state.displayAdvancedSettings});
  }

  /**
   * Get the supported algorithms
   * @returns {array}
   */
  get supportedAlgorithms() {
    return TotpViewModel.SUPPORTED_ALGORITHMS.map(algorithm => ({value: algorithm, label: algorithm}));
  }

  /**
   * Get the translation function
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
      <>
        <div className="title">
          <h2><Trans>TOTP</Trans></h2>
        </div>
        <div className="content">
          <div className="totp-view">
            <div className={`totp-wrapper ${this.state.totp ? "" : "disabled"}`}>
              {this.state.totp
                ? <div className="secret-totp"><Totp totp={this.state.totp}/></div>
                : <div className="secret-totp secret-copy">
                  <button type="button" className="no-border" disabled={!this.state.totp}>
                    <span>Copy TOTP to clipboard</span>
                  </button>
                  <TimerSVG style={{
                    "--timer-duration": "0s",
                    "--timer-delay": "0s",
                    "--timer-stroke-width": "0.25rem"
                  }}/>
                </div>
              }
              <button type="button" disabled={!this.state.totp}>
                <CopySVG/>
                <span>Copy TOTP</span>
              </button>
            </div>

          </div>
          <Tabs activeTabName="manualConfiguration">
            <Tab
              key="manualConfiguration"
              name={this.props.t("Manual configuration")}
              type="manualConfiguration">
              <div className="totp-fields">
                <div className="input text">
                  <label htmlFor="resource-uri"><Trans>URI</Trans></label>
                  <input id="resource-uri" name="uri" maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")}/>
                </div>
                <div className="input text">
                  <label htmlFor="resource-totp-key"><Trans>Key</Trans> (<Trans>secret</Trans>)</label>
                  <Password id="resource-totp-key" name="secret_key" autoComplete="new-password" placeholder={this.translate("Key")} preview={true}/>
                </div>
              </div>
              <div className="additional-information">
                <button type="button" className="section-header no-border" onClick={this.handleDisplayAdvancedSettingsClick}>
                  <h4><Trans>Advanced password generation</Trans></h4>
                  {this.state.displayAdvancedSettings
                    ? <CaretDownSVG/>
                    : <CaretRightSVG/>
                  }
                </button>
                {this.state.displayAdvancedSettings &&
                  <div className="advanced-settings">
                    <div className="input text">
                      <label htmlFor="resource-totp-period"><Trans>TOTP expiry</Trans></label>
                      <div className="input-wrapper-inline">
                        <input id="resource-totp-period" name="period" type="number" min="1" max="120"/>
                        <span><Trans>seconds until the TOTP expires</Trans></span>
                      </div>
                    </div>
                    <div className="input text">
                      <label htmlFor="resource-totp-digits"><Trans>TOTP length</Trans></label>
                      <div className="input-wrapper-inline">
                        <input id="resource-totp-digits" name="digits" type="number" min="6" max="8"/>
                        <span><Trans>digits</Trans></span>
                      </div>
                    </div>
                    <div className="select-wrapper input">
                      <label htmlFor="resource-totp-algorithm"><Trans>Algorithm</Trans></label>
                      <Select id="resource-totp-algorithm" name="algorithm" items={this.supportedAlgorithms}/>
                    </div>
                  </div>
                }
              </div>
            </Tab>
            <Tab
              key="qrCode"
              name={this.props.t("QR code")}
              type="qrCode">
              <div className="input file upload-qr-code">
                <input
                  type="file"
                  id="dialog-upload-qr-code"
                  accept=".png, .jpg, .jpeg"/>
                <button
                  className="button"
                  type="button">
                  <QrCodeSVG/>
                  <span><Trans>Upload a QR code picture</Trans></span>
                </button>
              </div>
            </Tab>
          </Tabs>
        </div>

      </>
    );
  }
}

AddResourceTotp.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(AddResourceTotp);

