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
import Icon from "../../../../shared/components/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withAppContext} from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {DateTime} from "luxon";
import {Trans, withTranslation} from "react-i18next";

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
    this.handlePublicKeyCopy = this.handlePublicKeyCopy.bind(this);
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
    const type = this.gpgkeyType[gpgkeyInfo.algorithm];
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

    const formatedGpgkeyInfo = {fingerprint, type, created, expires, armoredKey};
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
      return "";
    }
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
   * Handle the copy of the public key
   */
  async handlePublicKeyCopy() {
    const armoredKey = this.state.gpgkeyInfo.armoredKey;
    await this.props.context.port.request("passbolt.clipboard.copy", armoredKey);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The public key has been copied to clipboard"));
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
            <a onClick={this.handleTitleClicked} role="button">
              <Trans>Public key</Trans>
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          {isLoading &&
          <ul>
            <li className="processing-wrapper">
              <Icon name="spinner"/>
              <span className="processing-text"><Trans>Retrieving public key</Trans></span>
            </li>
          </ul>
          }
          {!isLoading &&
          <ul>
            <li className="fingerprint">
              <span className="label"><Trans>Fingerprint</Trans></span>
              <span className="value">{this.formatFingerprint(this.state.gpgkeyInfo.fingerprint)}</span>
            </li>
            <li className="type">
              <span className="label"><Trans>Type</Trans></span>
              <span className="value">{this.state.gpgkeyInfo.type}</span>
            </li>
            <li className="created">
              <span className="label"><Trans>Created</Trans></span>
              <span className="value">{this.state.gpgkeyInfo.created}</span>
            </li>
            <li className="expires">
              <span className="label"><Trans>Expires</Trans></span>
              <span className="value">{this.state.gpgkeyInfo.expires}</span>
            </li>
            <li className="key">
              <span className="label"><Trans>Public key</Trans></span>
              <span className="value">
                <a
                  className="button button-icon copy-public-key"
                  onClick={this.handlePublicKeyCopy}>
                  <Icon name="copy-to-clipboard"/>
                </a>
              </span>
            </li>
            <li className="gpgkey">
              <textarea
                className="code"
                value={this.state.gpgkeyInfo.armoredKey}
                disabled>
              </textarea>
            </li>
          </ul>
          }
        </div>
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
