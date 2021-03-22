/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2019 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2019 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import Autocomplete from "../../../../react/components/Common/Inputs/Autocomplete/Autocomplete";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import UserAvatar from "../../../../react/components/Common/Avatar/UserAvatar";
import Icon from "../../../../react/components/Common/Icons/Icon";
import TooltipHtml from "../../../../react/components/Common/Tooltip/TooltipHtml";
import {Trans, withTranslation} from "react-i18next";

class CreateGroupDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.createRef();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,

      // Input fields
      name: '',
      nameError: "",

      // group users list
      groups_users: [],

      // autocomplete
      autocompleteOpen: false,
    };
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    this.handleAutocompleteClose = this.handleAutocompleteClose.bind(this);
    this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);
    this.fetchAutocompleteItems = this.fetchAutocompleteItems.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handleSelectUpdate = this.handleSelectUpdate.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
  }

  /**
   * Create ref
   */
  createRef() {
    this.groupUsersListRef = React.createRef();
    this.nameInputRef = React.createRef();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.addCurrentUser();
    this.setState({loading: false}, () => {
      this.nameInputRef.current.focus();
    });
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * handleAutocompleteOpen
   * @return {void}
   */
  handleAutocompleteOpen() {
    this.setState({autocompleteOpen: true});
  }

  /**
   * handleAutocompleteClose
   * @return {void}
   */
  handleAutocompleteClose() {
    this.setState({autocompleteOpen: false});
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    const state = this.validateNameInput();
    this.setState(state);
  }

  /**
   * Handle select update
   * @param event
   * @param userId
   */
  handleSelectUpdate(event, userId) {
    const target = event.target;
    const is_admin = target.value === "true";
    const groups_users = Object.assign(this.state.groups_users);
    const index = groups_users.findIndex(groups_user => groups_user.user.id === userId);
    groups_users[index] = Object.assign(groups_users[index], {is_admin});
    this.setState({groups_users});
  }

  /**
   * Handle delete click event
   * @param event
   * @param userId
   */
  handleDeleteClickEvent(event, userId) {
    const groups_users = Object.assign(this.state.groups_users);
    const index = groups_users.findIndex(groups_user => groups_user.user.id === userId);
    groups_users.splice(index, 1);
    this.setState({groups_users});
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!await this.validate()) {
      this.handleValidateError();
      return;
    }

    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      try {
        await this.createGroup();
        await this.handleSaveSuccess();
      } catch (error) {
        this.handleSaveError(error);
      }
    }
  }

  /**
   * Handle validation error.
   */
  handleValidateError() {
    this.setState({processing: false});
    this.focusFieldError();
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The group has been created successfully."));
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else if (this.hasGroupNameAlreadyExists(error.data)) {
      this.setState({processing: false, nameError: error.data.body.name.group_unique});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * has username already exists
   * @param errorData the error data received
   * @returns {*}
   */
  hasGroupNameAlreadyExists(errorData) {
    return errorData && errorData.body && errorData.body.name && errorData.body.name.group_unique;
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      title: this.translate("There was an unexpected error..."),
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Adds the current user in the group as group manager
   */
  async addCurrentUser() {
    const [user] = await this.decorateUsersWithGpgKey([this.context.loggedInUser]);
    this.state.groups_users.push({user, is_admin: true});
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
  }

  /**
   * Focus the field of the form which is in error state.
   */
  focusFieldError() {
    if (this.state.nameError) {
      this.nameInputRef.current.focus();
    }
  }

  /**
   * Validate the name input.
   * @return {Promise}
   */
  validateNameInput() {
    const name = this.state.name.trim();
    let nameError = "";
    if (!name.length) {
      nameError = this.translate("A name is required.");
    }

    return new Promise(resolve => {
      this.setState({nameError: nameError}, resolve);
    });
  }

  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      error: "",
      nameError: "",
    });

    // Validate the form inputs.
    await this.validateNameInput();

    return this.state.nameError === "";
  }

  /**
   * handleAutocompleteSelect
   * What happens when an item in the autocomplete list is selected
   * e.g. if it's not already in the list, add it and scroll
   * @param {object} aro
   */
  handleAutocompleteSelect(aro) {
    const groups_users = this.state.groups_users;
    const is_admin = this.state.groups_users.length === 0;
    groups_users.push({user: aro, is_admin});
    this.setState({groups_users}, () => {
      // scroll at the bottom of the group users list
      this.groupUsersListRef.current.scrollTop = this.groupUsersListRef.current.scrollHeight;
    });
  }

  /**
   * Save the group
   * @returns {Promise<void>}
   */
  async createGroup() {
    const groups_users = this.state.groups_users.map(groups_user => ({
      user_id: groups_user.user.id,
      is_admin: groups_user.is_admin
    }));
    const groupDto = {name: this.state.name, groups_users};
    return await this.context.port.request("passbolt.groups.create", groupDto);
  }

  /**
   * Get users matching the given keyword
   * @param {string} keyword
   * @returns users,
   */
  async fetchAutocompleteItems(keyword) {
    keyword = keyword.toLowerCase();
    const words = (keyword && keyword.split(/\s+/)) || [''];
    const userAlreadyAdded = user => this.state.groups_users.some(groups_user => groups_user.user.id === user.id);

    // Test match of some escaped test words against the name / username
    const escapeWord = word =>  word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = word =>  new RegExp(escapeWord(word), 'i');
    const matchWord = (word, value) => wordToRegex(word).test(value);

    const matchUsernameProperty = (word, user) => matchWord(word, user.username);
    const matchNameProperty = (word, user) =>  matchWord(word, user.profile.first_name) || matchWord(word, user.profile.last_name);
    const matchUser = (word, user) => matchUsernameProperty(word, user) || matchNameProperty(word, user);
    const matchText = user => words.every(word => matchUser(word, user));

    const usersMatched = this.context.users.filter(user => user.active === true && !userAlreadyAdded(user))
      .filter(matchText);

    return this.decorateUsersWithGpgKey(usersMatched);
  }

  /**
   * Decorate a list of users with their gpg key.
   * @param {array} users
   * @returns {array}
   */
  async decorateUsersWithGpgKey(users) {
    const decorateGroupsUsersWithGpgKey = async user => Object.assign(user, {gpgkey: await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', user.id)});
    const usersWithGPGKey = await Promise.all(users.map(decorateGroupsUsersWithGpgKey));
    return usersWithGPGKey;
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Has no manager
   * @returns {boolean}
   */
  hasManager() {
    return this.hasMembers() && this.state.groups_users.some(groups_user => groups_user.is_admin === true);
  }

  /**
   * Has members
   * @returns {boolean}
   */
  hasMembers() {
    return this.state.groups_users.length > 0;
  }

  /**
   * Return true if submit button should be disabled
   * True if there is no owner, if all input should be disabled
   * @returns {boolean}
   */
  hasSubmitDisabled() {
    return !this.hasManager() || this.hasAllInputDisabled();
  }

  /**
   * Get user full name
   * @param user
   * @returns {string}
   */
  getUserFullname(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns {string}
   */
  getFingerprint(fingerprint) {
    return fingerprint.toUpperCase().replace(/.{4}(?=.)/g, '$& ');
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
   * @returns {*}
   */
  render() {
    return (
      <DialogWrapper
        title={this.translate("Create group")}
        className="edit-group-dialog"
        onClose={this.handleClose}
        disabled={this.hasAllInputDisabled()}>
        <form className="group-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
              <label htmlFor="group_name"><Trans>Group name</Trans></label>
              <input id="group-name-input" name="name" className="required" maxLength="50" type="text" placeholder={this.translate("group name")}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef}/>
              {this.state.nameError &&
              <div className="name error message">{this.state.nameError}</div>
              }
            </div>

            <div className="input required">
              <label htmlFor="group_permission"><Trans>Group members</Trans></label>
            </div>
          </div>
          <div className="group_members">
            <div className="form-content permission-edit">
              {this.hasMembers() &&
              <ul className="permissions scroll groups_users" ref={this.groupUsersListRef}>
                {this.state.groups_users.map(groups_user =>
                  <li key={groups_user.user.id} className="row">
                    <UserAvatar user={groups_user.user} baseUrl={this.context.userSettings.getTrustedDomain()}/>
                    <div className="aro">
                      <div className="aro-name">
                        <span className="ellipsis">{this.getUserFullname(groups_user.user)}</span>
                        <TooltipHtml>
                          <div className="email"><strong>{groups_user.user.username}</strong></div>
                          <div className="fingerprint">{this.getFingerprint(groups_user.user.gpgkey.fingerprint)}</div>
                        </TooltipHtml>
                      </div>
                      <div className="permission_changes">
                        <span><Trans>Will be added</Trans></span>
                      </div>
                    </div>
                    <div className="select rights">
                      <select value={groups_user.is_admin} disabled={this.hasAllInputDisabled()}
                        onChange={event => this.handleSelectUpdate(event, groups_user.user.id)}>
                        <option value="false"><Trans>Member</Trans></option>
                        <option value="true"><Trans>Group manager</Trans></option>
                      </select>
                    </div>
                    <div className="actions">
                      <a className={`remove-item ${this.hasAllInputDisabled() ? "disabled" : ""}`}
                        onClick={event => this.handleDeleteClickEvent(event, groups_user.user.id)} role="button">
                        <Icon name='close-circle'/>
                        <span className="visually-hidden">Remove</span>
                      </a>
                    </div>
                  </li>
                )
                }
              </ul>
              }
              {!this.hasMembers() &&
              <div className="message warning">
                <span><Trans>The group is empty, please add a group manager.</Trans></span>
              </div>
              }
              {this.hasMembers() && !this.hasManager() &&
              <div className="message error">
                <span><Trans>Please make sure there is at least one group manager.</Trans></span>
              </div>
              }
              {this.hasManager() &&
              <div className="message warning">
                <span><Trans>You need to click save for the changes to take place.</Trans></span>
              </div>
              }
            </div>
            <div className="form-content permission-add">
              <Autocomplete
                id="user-name-input"
                name="name"
                label={this.translate("Add people")}
                placeholder={this.translate("Start typing a person name")}
                searchCallback={this.fetchAutocompleteItems}
                onSelect={this.handleAutocompleteSelect}
                onOpen={this.handleAutocompleteOpen}
                onClose={this.handleAutocompleteClose}
                disabled={this.hasAllInputDisabled()}
                baseUrl={this.context.userSettings.getTrustedDomain()}
              />
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasSubmitDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

CreateGroupDialog.contextType = AppContext;

CreateGroupDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withDialog(withTranslation('common')(CreateGroupDialog)));
