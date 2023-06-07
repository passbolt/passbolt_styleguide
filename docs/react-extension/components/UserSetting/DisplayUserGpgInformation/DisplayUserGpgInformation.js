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
import {withAppContext} from "../../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {DateTime} from "luxon";
import Tooltip from "../../Common/Tooltip/Tooltip";
import Select from "../../Common/Select/Select";

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
    return this.props.context.loggedInUser;
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
    const gpgkeyInfo = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    // format the gpgkey info.
    const keyId = gpgkeyInfo.key_id;
    const type = this.gpgkeyType[gpgkeyInfo.algorithm];
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
    const armoredKey = gpgkeyInfo.armored_key;
    const fingerprint = gpgkeyInfo.fingerprint;
    const length = gpgkeyInfo.length;

    return {keyId, type, uIds, created, expires, armoredKey, fingerprint, length};
  }

  /**
   * Get the list of gpgkey types associated to their algorithms.
   * @return {object}
   */
  get gpgkeyType() {
    return {
      // RSA (any type) [HAC]
      rsa: "RSA",
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
      return DateTime.fromJSDate(new Date(data)).setLocale(this.props.context.locale).toLocaleString(DateTime.DATETIME_FULL);
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
   * Get fingerprint
   * @returns {JSX.Element}
   */
  get fingerprint() {
    let fingerprint = this.gpgKeyInfo.fingerprint;
    if (fingerprint) {
      fingerprint = fingerprint.toUpperCase().replace(/.{4}(?=.)/g, '$& ');
      fingerprint = <>{fingerprint.substr(0, 24)}<br/>{fingerprint.substr(25)}</>;
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
      <div className="grid grid-responsive-12 profile-key-inspector-information">
        <div className="row">
          <div className="col6 main-column key-info">
            <h3><Trans>Information for public and secret key</Trans></h3>
            <table className="table-info" id="privkeyinfo">
              <tbody>
                <tr>
                  <td><Trans>Key Id</Trans></td>
                  <td className="keyId">
                    <Tooltip
                      message={this.translate("sorry you can only have one key set at the moment")}
                      direction="top">
                      <Select
                        className="inline"
                        id="keyId"
                        value={this.gpgKeyInfo.keyId}
                        items={[{value: this.gpgKeyInfo.keyId, label: this.gpgKeyInfo.keyId}]}
                        disabled={true}/>
                    </Tooltip>
                  </td>
                </tr>
                <tr>
                  <td><Trans>Uid</Trans></td>
                  <td className="uid">{this.uId}</td>
                </tr>
                <tr>
                  <td><Trans>Fingerprint</Trans></td>
                  <td className="fingerprint">{this.fingerprint}</td>
                </tr>
                <tr>
                  <td><Trans>Created</Trans></td>
                  <td className="created">{this.gpgKeyInfo.created}</td>
                </tr>
                <tr>
                  <td><Trans>Expires</Trans></td>
                  <td className="expires">{this.gpgKeyInfo.expires}</td>
                </tr>
                <tr>
                  <td><Trans>Key length</Trans></td>
                  <td className="length">{this.gpgKeyInfo.length}</td>
                </tr>
                <tr>
                  <td><Trans>Algorithm</Trans></td>
                  <td className="algorithm">{this.gpgKeyInfo.type}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col6 secondary-column last key-export">
            <div className="sidebar">
              <h3><Trans>Public key block</Trans></h3>
              <div className="input textarea gpgkey" rel="publicKey">
                <textarea
                  defaultValue={this.gpgKeyInfo.armoredKey}
                  className="fluid code"
                  readOnly={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserGpgInformation.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any // The i18n context translation
};

export default withAppContext(withTranslation('common')(DisplayUserGpgInformation));

