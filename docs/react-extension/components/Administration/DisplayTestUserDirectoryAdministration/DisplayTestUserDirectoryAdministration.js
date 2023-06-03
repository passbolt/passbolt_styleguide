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
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Icon from "../../../../shared/components/Icons/Icon";
import DisplayStructureGroupsUsersTreeItem from "./DisplayStructureGroupsUsersTreeItem";
import {Trans, withTranslation} from "react-i18next";

class DisplayTestUserDirectoryAdministration extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // Dialog states
      loading: true,

      openListGroupsUsers: false,
      openStructureGroupsUsers: false,
      openErrors: false,
    };
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleListGroupsUsersClicked = this.handleListGroupsUsersClicked.bind(this);
    this.handleStructureGroupsUsersClicked = this.handleStructureGroupsUsersClicked.bind(this);
    this.handleErrorsClicked = this.handleErrorsClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.setState({loading: false});
  }

  /**
   * Handle the click on the list groups users
   */
  handleListGroupsUsersClicked() {
    this.setState({openListGroupsUsers: !this.state.openListGroupsUsers});
  }

  /**
   * Handle the click on the structure groups users
   */
  handleStructureGroupsUsersClicked() {
    this.setState({openStructureGroupsUsers: !this.state.openStructureGroupsUsers});
  }

  /**
   * Handle the click on the errors
   */
  handleErrorsClicked() {
    this.setState({openErrors: !this.state.openErrors});
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
    this.props.context.setContext({displayTestUserDirectoryDialogProps: null});
  }

  /**
   * Should input be disabled? True if state is loading
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.loading;
  }

  /**
   * display user firstname and lastname
   * @param user
   */
  displayUserName(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * get users
   * @returns {*}
   */
  get users() {
    return this.props.context.displayTestUserDirectoryDialogProps.userDirectoryTestResult.users;
  }

  /**
   * get groups
   * @returns {*}
   */
  get groups() {
    return this.props.context.displayTestUserDirectoryDialogProps.userDirectoryTestResult.groups;
  }

  /**
   * get tree
   * @returns {*}
   */
  get tree() {
    return this.props.context.displayTestUserDirectoryDialogProps.userDirectoryTestResult.tree;
  }

  /**
   * get errors
   * @returns {*}
   */
  get errors() {
    return this.props.context.displayTestUserDirectoryDialogProps.userDirectoryTestResult.errors;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper className='ldap-test-settings-dialog' title={this.translate("Test settings report")}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <div className="form-content">
          <p>
            <strong>
              <Trans>A connection could be established. Well done!</Trans>
            </strong>
          </p>
          <p></p>
          <div className="ldap-test-settings-report">
            <p>
              {this.users.length > 0 &&
                <>
                  {this.translate("{{count}} user has been found.", {count: this.users.length})}
                </>
              }
              {this.users.length > 0 && this.groups.length > 0 && <br/>}
              {this.groups.length > 0 &&
                <>
                  {this.translate("{{count}} group has been found.", {count: this.groups.length})}
                </>
              }
            </p>
            <div className={`accordion directory-list ${this.state.openListGroupsUsers ? "" : "closed"}`}>
              <div className="accordion-header" onClick={this.handleListGroupsUsersClicked}>
                <button type="button" className="link no-border">
                  <Trans>See list</Trans>
                  {this.state.openListGroupsUsers && <Icon name="caret-down" baseline={true}/>}
                  {!this.state.openListGroupsUsers && <Icon name="caret-right" baseline={true}/>}
                </button>
              </div>
              <div className="accordion-content">
                <table>
                  <tbody>
                    <tr>
                      <td><Trans>Groups</Trans></td>
                      <td><Trans>Users</Trans></td>
                    </tr>
                    <tr>
                      <td>
                        {this.groups.map(group =>
                          ((group.errors && <div key={group.id}><span className="error">{group.directory_name}</span></div>)
                            ||
                          <div key={group.id}>{group.group.name}</div>
                          )
                        )
                        }
                      </td>
                      <td>
                        {this.users.map(user =>
                          user.errors && <div key={user.id}><span className="error">{user.directory_name}</span></div>
                          ||
                          <div key={user.id}>{this.displayUserName(user.user)} <em>({user.user.username})</em></div>
                        )
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`accordion accordion-directory-structure ${this.state.openStructureGroupsUsers ? "" : "closed"}`}>
              <div className="accordion-header" onClick={this.handleStructureGroupsUsersClicked}>
                <button type="button" className="link no-border">
                  <Trans>See structure</Trans>
                  {this.state.openStructureGroupsUsers && <Icon name="caret-down" baseline={true}/>}
                  {!this.state.openStructureGroupsUsers && <Icon name="caret-right" baseline={true}/>}
                </button>
              </div>
              <div className="accordion-content">
                <div className="directory-structure">
                  <ul>
                    <li className="group">
                      Root
                      {Object.values(this.tree).map(node => <DisplayStructureGroupsUsersTreeItem
                        key={`tree-${node.id}`}
                        node={node}
                      />)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {this.errors.length > 0 &&
            <div>
              <p className="directory-errors error">{this.translate("{{count}} entry had errors and will be ignored during synchronization.", {count: this.errors.length})}</p>
              <div className={`accordion accordion-directory-errors ${this.state.openErrors ? "" : "closed"}`}>
                <div className="accordion-header" onClick={this.handleErrorsClicked}>
                  <button type="button" className="link no-border">
                    <Trans>See error details</Trans>
                    {this.state.openErrors && <Icon name="caret-down" baseline={true}/>}
                    {!this.state.openErrors && <Icon name="caret-right" baseline={true}/>}
                  </button>
                </div>
                <div className="accordion-content">
                  <div className="directory-errors">
                    <textarea value={JSON.stringify(this.errors, null, ' ')} readOnly={true}/>
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
        <div className="submit-wrapper clearfix">
          <button type="button" disabled={this.hasAllInputDisabled()} className="primary" onClick={this.handleClose}><Trans>OK</Trans></button>
        </div>
      </DialogWrapper>
    );
  }
}

DisplayTestUserDirectoryAdministration.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayTestUserDirectoryAdministration));
