
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
 * @since         2.13.0
 */

import React from 'react';
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/Common/DialogContext";

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
      key_id: "" // The user key id
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
      const gpg = await this.fetchGpg();
      await this.setState({gpg});
    }
  }

  /**
   * Populates the component with data in case the logged in user has not been populated
   */
  async populateIfNeeded() {
    const mustPopulate = this.user && !this.state.gpg;
    const canVoid = this.user && this.state.gpg;
    if (mustPopulate) {
      const gpg = await this.fetchGpg();
      await this.setState({gpg});
    } else if (canVoid) {
      this.populateIfNeeded = () => {};
    }
  }

  /**
   * Fetch the user key id
   */
  async fetchGpg() {
    return await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <>
        {this.user && this.state.gpg &&
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
                            <option value={this.state.gpg.key_id}>
                              {this.state.gpg.key_id}
                            </option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Uid</td>
                      <td className="uid">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</td>
                    </tr>
                    <tr>
                      <td>Fingerprint</td>
                      <td className="fingerprint">{this.state.gpg.fingerprint}</td>
                    </tr>
                    <tr>
                      <td>Created</td>
                      <td className="created">{this.state.gpg.created}</td>
                    </tr>
                    <tr>
                      <td>Expires</td>
                      <td className="expires">{this.state.gpg.expires}</td>
                    </tr>
                    <tr>
                      <td>Key Length</td>
                      <td className="length">{this.state.gpg.bits}</td>
                    </tr>
                    <tr>
                      <td>Algorithm</td>
                      <td className="algorithm">{this.state.gpg.type}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col6 last key-export">
                <h3>Public key block</h3>
                <div className="input textarea gpgkey" rel="publicKey">
                  <textarea
                    defaultValue={this.state.gpg.armored_key}
                    className="fluid code"/>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}


DisplayUserGpgInformation.contextType = AppContext;

export default withDialog(DisplayUserGpgInformation);

