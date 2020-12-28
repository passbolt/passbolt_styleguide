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

import React from 'react';
import moment from "moment";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";

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
      gpgKeyInfo: null
    };
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.context.loggedInUser;
  }

  /**
   * Populates the component with data
   */
  async populate() {
    if (this.user) {
      const gpgKeyInfo = await this.fetchGpgkeyInfo();
      await this.setState({gpgKeyInfo});
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
      await this.setState({gpgKeyInfo});
    } else if (canVoid) {
      this.populateIfNeeded = () => {
      };
    }
  }

  /**
   * Fetch the user key id
   */
  async fetchGpgkeyInfo() {
    const gpgkeyInfo = await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);

    // format the gpgkey info.
    const keyId = gpgkeyInfo.keyId;
    const type = this.gpgkeyType[gpgkeyInfo.algorithm];
    const created = this.formatDate(gpgkeyInfo.created);
    const expires = gpgkeyInfo.expires === "Never" ? "Never" : this.formatDate(gpgkeyInfo.expires);
    const armoredKey = gpgkeyInfo.key;
    const fingerprint = gpgkeyInfo.fingerprint;
    const length = gpgkeyInfo.length;

    return {keyId, type, created, expires, armoredKey, fingerprint, length};
  }

  /**
   * Get the list of gpgkey types associated to their algorithms.
   * @return {object}
   */
  get gpgkeyType() {
    return {
      // RSA (Encrypt or Sign) [HAC]
      rsa_encrypt_sign: "RSA",
      // RSA (Encrypt only) [HAC]
      rsa_encrypt: "RSA",
      // RSA (Sign only) [HAC]
      rsa_sign: "RSA",
      // Elgamal (Encrypt only) [ELGAMAL] [HAC]
      elgamal: "Elgamal",
      // DSA (Sign only) [FIPS186] [HAC]
      dsa: "DSA",
      // ECDH (Encrypt only) [RFC6637]
      ecdh: "ECDH",
      // ECDSA (Sign only) [RFC6637]
      ecdsa: "ECDSA",
      // EdDSA (Sign only) [{@link https://tools.ietf.org/html/draft-koch-eddsa-for-openpgp-04|Draft RFC}]
      eddsa: "EdDSA",
      // Reserved for AEDH
      aedh: "AEDH",
      // Reserved for AEDSA
      aedsa: "AEDSA"
    };
  }

  /**
   * Format a date.
   * @string {string} date The date to format
   * @return {string}
   */
  formatDate(data) {
    try {
      return moment(new Date(data)).format("LLL");
    } catch (error) {
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
   * Get the user fullname
   * @returns {string}
   */
  get userFullname() {
    return this.user ? `${this.user.profile.first_name} ${this.user.profile.last_name}` : "";
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="grid grid-responsive-12">
        <div className="row">
          <div className="col6 key-info">
            <h3>Information for public and secret key</h3>
            <table className="table-info" id="privkeyinfo">
              <tbody>
                <tr>
                  <td>Key Id</td>
                  <td className="keyId">
                    <div
                      className="input select tooltip-top"
                      data-tooltip="sorry you can only have one key set at the moment">
                      <select
                        id="keyId"
                        disabled={true}>
                        <option value={this.gpgKeyInfo.keyId}>
                          {this.gpgKeyInfo.keyId}
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Uid</td>
                  <td className="uid">{this.userFullname}</td>
                </tr>
                <tr>
                  <td>Fingerprint</td>
                  <td className="fingerprint">{this.gpgKeyInfo.fingerprint}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td className="created">{this.gpgKeyInfo.created}</td>
                </tr>
                <tr>
                  <td>Expires</td>
                  <td className="expires">{this.gpgKeyInfo.expires}</td>
                </tr>
                <tr>
                  <td>Key Length</td>
                  <td className="length">{this.gpgKeyInfo.length}</td>
                </tr>
                <tr>
                  <td>Algorithm</td>
                  <td className="algorithm">{this.gpgKeyInfo.type}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col6 last key-export">
            <h3>Public key block</h3>
            <div className="input textarea gpgkey" rel="publicKey">
              <textarea
                defaultValue={this.gpgKeyInfo.armoredKey}
                className="fluid code"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserGpgInformation.contextType = AppContext;

export default withDialog(DisplayUserGpgInformation);

