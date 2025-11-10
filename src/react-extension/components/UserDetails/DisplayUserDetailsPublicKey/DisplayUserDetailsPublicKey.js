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
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {DateTime} from "luxon";
import {Trans, withTranslation} from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

export const GPG_KEY_TYPES = {
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
  // EdDSA Legacy (OpenPGP v5 generated key read by OpenPGP v6)
  eddsa: "EdDSA",
  // Reserved for AEDH
  aedh: "AEDH",
  // Reserved for AEDSA
  aedsa: "AEDSA"
};

/**
 * This component displays the user details about public key
 */
class DisplayUserDetailsPublicKey extends React.Component {
  /**
   * Default constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      open: false, // Flag for the expand / collapse mode
      gpgkeyInfo: {}, // The gpg key info
      loading: false // Is the component loading
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleUserChange(prevProps.userWorkspaceContext.details.user);
  }

  /**
   * Check if the user has changed and fetch
   * @param previousUser
   */
  async handleUserChange(previousUser) {
    // do nothing if the section is closed.
    if (!this.state.open) {
      return;
    }
    // do nothing if the user doesn't change.
    if (this.user.id === previousUser.id) {
      return;
    }

    // Reset the component, and fetch activities for the new resource.
    await this.fetchGpgkeyInfo();
  }

  /**
   * Fetch the user gpgkey info.
   * @returns {Promise<void>}
   */
  async fetchGpgkeyInfo() {
    const gpgkeyInfo = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    // format the gpgkey info.
    const fingerprint = gpgkeyInfo.fingerprint;
    const type = GPG_KEY_TYPES[gpgkeyInfo.algorithm];
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
    const length = gpgkeyInfo.length;

    const formatedGpgkeyInfo = {fingerprint, type, created, expires, curve, length};
    this.setState({gpgkeyInfo: formatedGpgkeyInfo});
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
      console.error(`Failed to format date "${data}":`, error);
      return "";
    }
  }

  /**
   * Returns the current user to detail
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    fingerprint = fingerprint || "";
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
  }

  /**
   * Handle the click on the title
   */
  async handleTitleClicked() {
    if (this.state.open) {
      await this.setState({gpgkeyInfo: {}, open: false});
    } else {
      await this.setState({open: true, loading: true});
      await this.fetchGpgkeyInfo();
      await this.setState({loading: false});
    }
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
    const isLoading = this.state.loading;


    return (
      <div className={`key-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClicked} className="link no-border">
              <span className="accordion-title">
                <Trans>Public key</Trans>
              </span>
              {this.state.open && <CaretDownSVG/>}
              {!this.state.open && <CaretRightSVG/>}
            </button>
          </h4>
        </div>
        {this.state.open &&
        <div className="accordion-content">
          {isLoading &&
          <ul>
            <li className="processing-wrapper">
              <SpinnerSVG/>
              <span className="processing-text"><Trans>Retrieving public key</Trans></span>
            </li>
          </ul>
          }
          {!isLoading &&
                    <>
                      <div className="information-label">
                        <span className="fingerprint label"><Trans>Fingerprint</Trans></span>
                        <span className="type label"><Trans>Type</Trans></span>
                        {this.state.gpgkeyInfo.curve &&
                          <span className="curve label"><Trans>Curve</Trans></span>
                        }
                        <span className="length label"><Trans>Length</Trans></span>
                        <span className="created label"><Trans>Created</Trans></span>
                        <span className="expires label"><Trans>Expires</Trans></span>
                      </div>
                      <div className="information-value">
                        <span className="fingerprint value">{this.formatFingerprint(this.state.gpgkeyInfo.fingerprint)}</span>
                        <span className="type value">{this.state.gpgkeyInfo.type}</span>
                        {this.state.gpgkeyInfo.curve &&
                          <span className="curve value">{this.state.gpgkeyInfo.curve}</span>
                        }
                        <span className="length value">{this.state.gpgkeyInfo.length}</span>
                        <span className="created value">{this.state.gpgkeyInfo.created}</span>
                        <span className="expires value">{this.state.gpgkeyInfo.expires}</span>
                      </div>
                    </>
          }
        </div>
        }
      </div>
    );
  }
}

DisplayUserDetailsPublicKey.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.object, // The user workspace context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any // The i18n context translation
};

export default withAppContext(withActionFeedback(withUserWorkspace(withTranslation('common')(DisplayUserDetailsPublicKey))));
