/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 */

import React from "react";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import Tooltip from "../../Common/Tooltip/Tooltip";
import Select from "../../Common/Select/Select";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";
import DownloadFileSVG from "../../../../img/svg/download_file.svg";
import { GPG_KEY_TYPES } from "../../UserDetails/DisplayUserDetailsPublicKey/DisplayUserDetailsPublicKey";

/**
 * This component displays the user GPG information
 */
class DisplayUserGpgInformation extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDownloadPublicKey = this.handleDownloadPublicKey.bind(this);
    this.handleDownloadPrivateKey = this.handleDownloadPrivateKey.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Whenever the component has been updated
   */
  async componentDidUpdate() {
    await this.populateIfNeeded();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      gpgKeyInfo: null,
    };
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.props.context.loggedInUser;
  }

  /**
   * Populates the component with data
   */
  async populate() {
    if (this.user) {
      const gpgKeyInfo = await this.fetchGpgkeyInfo();
      await this.setState({ gpgKeyInfo });
    }
  }

  /**
   * Populates the component with data in case the logged in user has not been populated
   */
  async populateIfNeeded() {
    const mustPopulate = this.user && !this.state.gpgKeyInfo;
    const canVoid = this.user && this.state.gpgKeyInfo;
    if (mustPopulate) {
      const gpgKeyInfo = await this.fetchGpgkeyInfo();
      await this.setState({ gpgKeyInfo });
    } else if (canVoid) {
      this.populateIfNeeded = () => {};
    }
  }

  /**
   * Fetch the user key id
   */
  async fetchGpgkeyInfo() {
    const gpgkeyInfo = await this.props.context.port.request(
      "passbolt.keyring.get-public-key-info-by-user",
      this.user.id,
    );
    // format the gpgkey info.
    const keyId = gpgkeyInfo.key_id;
    const type = GPG_KEY_TYPES[gpgkeyInfo.algorithm];
    const uIds = gpgkeyInfo.user_ids;
    const created = this.formatDate(gpgkeyInfo.created);
    let expires;
    if (gpgkeyInfo.expires === null) {
      expires = "n/a";
    } else if (gpgkeyInfo.expires === "Infinity") {
      expires = this.translate("Never");
    } else {
      expires = this.formatDate(gpgkeyInfo.expires);
    }

    const curve = gpgkeyInfo.curve;
    const fingerprint = gpgkeyInfo.fingerprint;
    const length = gpgkeyInfo.length;

    return { keyId, type, uIds, created, expires, fingerprint, length, curve };
  }

  /**
   * Format a date.
   * @string {string} date The date to format
   * @return {string}
   */
  formatDate(data) {
    try {
      return DateTime.fromJSDate(new Date(data))
        .setLocale(this.props.context.locale)
        .toLocaleString(DateTime.DATETIME_FULL);
    } catch (error) {
      console.error(`Failed to format date "${data}":`, error);
      return "";
    }
  }

  /**
   * Get the gpg keyinfo
   * @returns {object}
   */
  get gpgKeyInfo() {
    return this.state.gpgKeyInfo || {};
  }

  /**
   * Get fingerprint
   * @returns {JSX.Element}
   */
  get fingerprint() {
    let fingerprint = this.gpgKeyInfo.fingerprint;
    if (fingerprint) {
      fingerprint = fingerprint.toUpperCase().replace(/.{4}(?=.)/g, "$& ");
      fingerprint = (
        <>
          {fingerprint.substr(0, 24)}
          <br />
          {fingerprint.substr(25)}
        </>
      );
    }
    return fingerprint;
  }

  /**
   * Get the first uID of the GPG key
   * @returns {string}
   */
  get uId() {
    const uId = this.gpgKeyInfo.uIds && this.gpgKeyInfo.uIds[0];
    return uId ? `${uId.name} <${uId.email}>` : "";
  }

  /**
   * Whenever the user wants to download his public key
   */
  async handleDownloadPublicKey() {
    await this.props.context.port.request("passbolt.keyring.download-my-public-key");
  }

  /**
   * Whenever the user wants to download his private key
   */
  async handleDownloadPrivateKey() {
    await this.props.context.port.request("passbolt.keyring.download-my-private-key");
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
   */
  render() {
    return (
      <>
        <div className="main-column key-info">
          <div className="main-content">
            <h3>
              <Trans>Information for public and secret key</Trans>
            </h3>
            <table className="table-info" id="privkeyinfo">
              <tbody>
                <tr>
                  <td>
                    <Trans>Key Id</Trans>
                  </td>
                  <td className="keyId">
                    <Tooltip
                      message={this.translate("sorry you can only have one key set at the moment")}
                      direction="top"
                    >
                      <Select
                        className="inline"
                        id="keyId"
                        value={this.gpgKeyInfo.keyId}
                        items={[{ value: this.gpgKeyInfo.keyId, label: this.gpgKeyInfo.keyId }]}
                        disabled={true}
                      />
                    </Tooltip>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Trans>Uid</Trans>
                  </td>
                  <td className="uid">{this.uId}</td>
                </tr>
                <tr>
                  <td>
                    <Trans>Fingerprint</Trans>
                  </td>
                  <td className="fingerprint">
                    {this.gpgKeyInfo.fingerprint && <Fingerprint fingerprint={this.gpgKeyInfo.fingerprint} />}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Trans>Created</Trans>
                  </td>
                  <td className="created">{this.gpgKeyInfo.created}</td>
                </tr>
                <tr>
                  <td>
                    <Trans>Expires</Trans>
                  </td>
                  <td className="expires">{this.gpgKeyInfo.expires}</td>
                </tr>
                <tr>
                  <td>
                    <Trans>Key length</Trans>
                  </td>
                  <td className="length">{this.gpgKeyInfo.length}</td>
                </tr>
                <tr>
                  <td>
                    <Trans>Algorithm</Trans>
                  </td>
                  <td className="algorithm">{this.gpgKeyInfo.type}</td>
                </tr>
                {this.gpgKeyInfo.curve && (
                  <tr>
                    <td>
                      <Trans>Curve</Trans>
                    </td>
                    <td className="curve">{this.gpgKeyInfo.curve}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="actions-wrapper">
          <div className="left-actions-wrapper">
            <button type="button" className="button secondary" onClick={this.handleDownloadPublicKey}>
              <DownloadFileSVG />
              <span>
                <Trans>Public</Trans>
              </span>
            </button>
            <button type="button" className="button secondary" onClick={this.handleDownloadPrivateKey}>
              <DownloadFileSVG />
              <span>
                <Trans>Private</Trans>
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }
}

DisplayUserGpgInformation.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(DisplayUserGpgInformation));
