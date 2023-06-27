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
import ReactList from "react-list";
import PropTypes from "prop-types";

import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import Autocomplete from "../../Common/Inputs/Autocomplete/Autocomplete";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import EditUserGroupItem from "../EditUserGroup/EditUserGroupItem";
import {maxSizeValidation} from '../../../lib/Error/InputValidator';
import Icon from "../../../../shared/components/Icons/Icon";
import {RESOURCE_GROUP_NAME_MAX_LENGTH} from '../../../../shared/constants/inputs.const';

class CreateUserGroup extends Component {
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
      nameWarning: "",

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

    this.renderItem = this.renderItem.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
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
    const nameWarning = maxSizeValidation(this.state.name, RESOURCE_GROUP_NAME_MAX_LENGTH, this.translate);
    this.setState({nameWarning});
  }

  /**
   * Handle select update
   * @param event
   * @param userId
   */
  handleSelectUpdate(event, userId) {
    const target = event.target;
    const is_admin = target.value === true;
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
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Adds the current user in the group as group manager
   */
  async addCurrentUser() {
    const [user] = await this.decorateUsersWithGpgKey([this.props.context.loggedInUser]);
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
      this.groupUsersListRef.current.scrollTo(groups_users.length - 1);
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
    return await this.props.context.port.request("passbolt.groups.create", groupDto);
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

    let currentCount = 0;
    const firstUsersMatched = this.props.context.users.filter(user => {
      const isUserMatching = currentCount < Autocomplete.DISPLAY_LIMIT
        && user.active === true
        && !userAlreadyAdded(user)
        && matchText(user);

      if (isUserMatching) {
        currentCount++;
      }
      return isUserMatching;
    });

    return this.decorateUsersWithGpgKey(firstUsersMatched);
  }

  /**
   * Decorate a list of users with their gpg key.
   * @param {array} users
   * @returns {Promise<array}
   */
  async decorateUsersWithGpgKey(users) {
    const decorateGroupsUsersWithGpgKey = async user => Object.assign(user, {gpgkey: await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', user.id)});
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
   * Format fingerprint
   * @param fingerprint
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
  }

  /**
   * Get permissions
   * @returns {[{label: *, value: boolean}]}
   */
  get permissions() {
    return [
      {value: false, label: this.translate("Member")},
      {value: true, label: this.translate("Group manager")}
    ];
  }

  /**
   * Use to render a single item of the user group list
   * @param {integer} index of the item in the source list
   * @param {integer} key index of the HTML element in the ReactList
   * @returns {JSX.Element}
   */
  renderItem(index, key) {
    const groupUser = this.state.groups_users[index];
    const createUserGroupItemKey = groupUser.user.id;
    return (
      <EditUserGroupItem
        key={createUserGroupItemKey}
        itemKey={createUserGroupItemKey}
        groupUser={groupUser}
        onMemberRoleChange={event => this.handleSelectUpdate(event, groupUser.user.id)}
        onMemberRemoved={event => this.handleDeleteClickEvent(event, groupUser.user.id)}
        isLastItemDisplayed={key >= 2}
        isMemberChanged={true}
        isMemberAdded={true}
        areActionsAllowed={!this.hasAllInputDisabled()}
      />
    );
  }

  /**
   * Use to render the container of the list of the ReactList component
   * @param {Array<JSX.Element>} items the list of the items to be rendered as children element of the conainer
   * @param {*} ref the ref ReactList needs to manage the scroll
   * @returns {JSX.Element}
   */
  renderContainer(items, ref) {
    return (
      <ul className="permissions groups_users" ref={ref}>
        {items}
      </ul>
    );
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
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="group_name"><Trans>Group name</Trans>{this.state.nameWarning &&
                  <Icon name="exclamation"/>
              }</label>
              <input id="group-name-input" name="name" aria-required={true} className="required" maxLength="50" type="text" placeholder={this.translate("group name")}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.hasAllInputDisabled()} ref={this.nameInputRef}/>
              {this.state.nameError &&
              <div className="name error-message">{this.state.nameError}</div>
              }
              {this.state.nameWarning &&
                (<div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
                </div>)
              }
            </div>

            <div className="input required">
              <label htmlFor="group_permission"><Trans>Group members</Trans></label>
            </div>
          </div>
          <div className="group_members">
            <div className="form-content scroll permission-edit">
              {this.hasMembers() &&
                <ReactList
                  ref={this.groupUsersListRef}
                  itemRenderer={this.renderItem}
                  itemsRenderer={this.renderContainer}
                  length={this.state.groups_users.length}
                  minSize={4}
                  type={this.state.groups_users.length < 3 ? "simple" : "uniform"}
                  threshold={30}>
                </ReactList>
              }
            </div>
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
            {this.state.nameWarning && (
              <div className="message warning">
                <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
              </div>
            )}
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
                baseUrl={this.props.context.userSettings.getTrustedDomain()}
              />
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton disabled={this.hasSubmitDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

CreateUserGroup.propTypes = {
  context: PropTypes.any, // The app context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(CreateUserGroup))));
