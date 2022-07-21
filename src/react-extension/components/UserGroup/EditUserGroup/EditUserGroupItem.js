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
 * @since         3.7.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import Tooltip from "../../Common/Tooltip/Tooltip";
import Select from "../../Common/Select/Select";

/**
 * This component allows to edit an user group
 */
class EditUserGroupItem extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      user: null,
      fingerprint: null,
    };
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Populate the component with initial data
   * @returns {Promise<void>}
   */
  async populate() {
    const user = this.props.groupUser.user;
    const fingerprint = await this.getFingerprintForUser(user.id);
    this.setState({user, fingerprint});
  }

  /**
   * Find a user gpg key
   * @param {string} userId
   * @returns {Promise<string>}
   */
  async getFingerprintForUser(userId) {
    const keyInfo = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', userId);
    return keyInfo.fingerprint;
  }

  /**
   * Returns true if the comopinent is ready to be displayed with all information
   * @returns {boolean}
   */
  get isReady() {
    return this.state.user !== null && this.state.fingerprint !== null;
  }

  /**
   * Format fingerprint
   * @param {string} fingerprint An user finger print
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
  }

  /**
   * Get a user full name
   * @returns {string}
   */
  getUserFullname() {
    const user = this.state.user;
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * Get the tooltip message
   * @returns {JSX.Element}
   */
  getTooltipMessage() {
    return <>
      <div className="email"><strong>{this.state.user.username}</strong></div>
      <div className="fingerprint">{this.formatFingerprint(this.state.fingerprint)}</div>
    </>;
  }

  /**
   * Get options for permission selection
   * @returns {[{label: *, value: boolean}]}
   */
  get isManagerSelectOptions() {
    return [
      {value: false, label: (<Trans>Member</Trans>)},
      {value: true, label: (<Trans>Group manager</Trans>)}
    ];
  }

  /**
   * Render the component
   */
  render() {
    const isReady = this.isReady;
    return (
      <li
        className={`row ${this.props.isMemberChanged ? 'permission-updated' : ''} ${!isReady ? "skeleton" : ""}`}
      >
        {isReady &&
          <>
            <UserAvatar
              baseUrl={this.props.context.userSettings.getTrustedDomain()}
              user={this.state.user}/>
            <div className="aro">
              <div className="aro-name">
                <span className="ellipsis">{this.getUserFullname()}</span>
                <Tooltip message={this.getTooltipMessage()}>
                  <Icon name="info-circle"/>
                </Tooltip>
              </div>
              <div className="permission_changes">
                {this.props.isMemberAdded && <span><Trans>Will be added</Trans></span>}
                {this.props.isMemberChanged && !this.props.isMemberAdded &&
                  <span><Trans>Will be updated</Trans></span>}
                {!this.props.isMemberChanged && !this.props.isMemberAdded && <span><Trans>Unchanged</Trans></span>}

              </div>
            </div>

            <div className="rights">
              <Select
                className="permission inline"
                value={this.props.groupUser.is_admin}
                items={this.isManagerSelectOptions}
                onChange={event => this.props.onMemberRoleChange(event, this.props.groupUser)}
                disabled={!this.props.areActionsAllowed}
                direction={this.props.isLastItemDisplayed ? "top" : "bottom"}/>
            </div>

            <div className="actions">
              <a
                title={this.props.t("Remove")}
                className={`remove-item button button-transparent ${!this.props.areActionsAllowed ? "disabled" : ""}`}
                onClick={event => this.props.onMemberRemoved(event, this.props.groupUser)}>
                <Icon name="close"/>
                <span className="visuallyhidden"><Trans>Remove</Trans></span>
              </a>
            </div>
          </>
        }
        {!isReady &&
          <>
            <div className="avatar"></div>
            <div className="aro">
              <div className="aro-name"></div>
              <div className="aro-details"></div>
            </div>
            <div className="select rights"></div>
            <div className="actions"></div>
            <div className="shimmer"></div>
          </>
        }
      </li>
    );
  }
}

EditUserGroupItem.defaultProps = {
  isMemberChanged: false,
  isMemberAdded: false,
  areActionsAllowed: false,
  isLastItemDisplayed: false,
};

EditUserGroupItem.propTypes = {
  context: PropTypes.any, // The application context
  groupUser: PropTypes.object.isRequired,
  onMemberRoleChange: PropTypes.func.isRequired,
  onMemberRemoved: PropTypes.func.isRequired,
  isMemberChanged: PropTypes.bool,
  isMemberAdded: PropTypes.bool,
  areActionsAllowed: PropTypes.bool,
  isLastItemDisplayed: PropTypes.bool,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(EditUserGroupItem));
