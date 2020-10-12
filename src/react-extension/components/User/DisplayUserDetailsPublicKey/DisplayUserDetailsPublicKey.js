
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
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import moment from "moment";
import AppContext from "../../../contexts/AppContext";

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
      gpgKey: {}, // The gpg key to display
      actions: {
        loading: false // The is loading flag
      }
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * Whenever the component is mounter
   */
  async componentDidMount() {
    await this.setState({actions: {loading: true}});
    const gpgKey = await this.context.port.request('passbolt.gpgkeys.get-by-user-id', this.user.id);
    await this.setState({gpgKey, actions: {loading: false}});
  }

  /**
   * Returns the current user to detail
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string} The formatted date
   */
  formatDateTimeAgo(date) {
    const serverTimezone = this.context.siteSettings.getServerTimezone();
    return moment.tz(date, serverTimezone).fromNow();
  }

  /**
   * Render the component
   */
  render() {
    const keyId = this.state.gpgKey.key_id;
    const keyType = this.state.gpgKey.type;
    const created = this.state.gpgKey.created;
    const expires = this.state.gpgKey.expires;
    const gpgKey = this.state.gpgKey.armored_key;
    const isLoading = this.state.actions.loading;
    return (
      <div className={`key-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClicked}  role="button">
              Public key
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        {isLoading &&
        <ul className="accordion-content">
          <li className="processing-wrapper">
            <span className="processing-text">Retrieving public key</span>
          </li>
        </ul>
        }
        {!isLoading &&
        <ul className="accordion-content">
          <li className="keyId">
            <span className="label">Key id</span>
            <span className="value">{keyId}</span>
          </li>
          <li className="type">
            <span className="label">Type</span>
            <span className="value">{keyType}</span>
          </li>
          <li className="created">
            <span className="label">Created</span>
            <span className="value">{created}</span>
          </li>
          <li className="expires">
            <span className="label">Expires</span>
            <span className="value">{expires}</span>
          </li>
          <li className="key">
            <span className="label">Public key</span>
            <span className="value">
              <a className="button copy-public-key">
                <span>copy</span>
              </a>
            </span>
          </li>
          <li className="gpgkey">
            <textarea
              className="code"
              value={gpgKey}
              disabled>
            </textarea>
          </li>
        </ul>
        }
      </div>
    );
  }
}

DisplayUserDetailsPublicKey.contextType = AppContext;
DisplayUserDetailsPublicKey.propTypes = {
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(DisplayUserDetailsPublicKey);
