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

import React from 'react';
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component displays the user GPG information help
 */
class DisplayUserGpgInformationHelp extends React.Component {
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
    const armoredKey = gpgkeyInfo.armored_key;

    return {armoredKey};
  }

  /**
   * Get the gpg keyinfo
   * @returns {object}
   */
  get gpgKeyInfo() {
    return this.state.gpgKeyInfo || {};
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
      <div className="sidebar-help-section">
        <h3><Trans>Public key block</Trans></h3>
        <div className="input textarea gpgkey" rel="publicKey">
          <textarea
            defaultValue={this.gpgKeyInfo.armoredKey}
            className="fluid code"
            readOnly={true}/>
        </div>
      </div>
    );
  }
}

DisplayUserGpgInformationHelp.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayUserGpgInformationHelp));

