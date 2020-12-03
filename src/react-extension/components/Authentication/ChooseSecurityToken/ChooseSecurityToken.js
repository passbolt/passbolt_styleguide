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
 * @since         3.0.0
 */
import React, {Component} from "react";
import {CirclePicker} from "react-color";
import Icon from "../../../../react/components/Common/Icons/Icon";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";
import PropTypes from "prop-types";

class ChooseSecurityToken extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.createReferences();
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      background: '#3f51b5', // The token color
      code: '', // The token code
      actions: {
        processing: false // True if one's processing passphrase
      },
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        emptyCode: false, // True if the token code is empty
        lengthCode: false // True if the token code length is > 3
      }
    };
  }

  /**
   * Returns the default set of colors
   */
  get defaultColors() {
    return [
      '#f44336', '#9c27b0', '#3f51b5', '#03a9f4',
      '#009688', '#8bc34a', '#ffeb3b', '#ff9800',
      '#795548', '#607d8b', '#000000', '#f6f6f6'
    ];
  }

  /**
   * Returns the default set of colors text
   */
  get textColor() {
    const c = this.state.background.substr(1).match(/(\S{2})/g);
    const r = parseInt(c[0], 16);
    const g = parseInt(c[1], 16);
    const b = parseInt(c[2], 16);
    const l = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return l > 125 ? '#000000' : '#ffffff';
  }

  /**
   * Returns the security token CSS style
   * @returns {undefined|{backgroundColor: *, color: (string)}}
   */
  get securityTokenStyle() {
    if (this.state.background) {
      return {
        backgroundColor: this.state.background,
        color: this.textColor
      };
    } else {
      return undefined;
    }
  }

  /**
   * Returns true if the user can perform actions on the component
   */
  get areActionsAllowed() {
    return !this.state.actions.processing;
  }

  /**
   * Returns true if the passphrase is valid
   */
  get isValid() {
    return Object.values(this.state.errors).every(value => !value);
  }


  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
    this.handleRandomizeCode = this.handleRandomizeCode.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
  }

  /**
   * Creates the references
   */
  createReferences() {
    this.tokenCodeInputRef = React.createRef();
  }

  /**
   * Whenever the users submits his security token choice
   * @param event Dom event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.validate();

    if (this.isValid) {
      await this.toggleProcessing();
      await this.save();
    }
  }

  /**
   * Whenever a new color has been selected
   */
  async handleSelectColor(color) {
    if (this.areActionsAllowed) {
      await this.selectColor(color);
      if (this.state.hasBeenValidated) {
        await this.validate();
      }
    }
  }

  /**
   * Whenever the user wants to randomize the token code
   */
  handleRandomizeCode() {
    this.randomizeCode();
  }

  /**
   * Whenever the user changes the token code
   * @param event An input event
   */
  async handleChangeCode(event) {
    const code = event.target.value;
    await this.selectCode(code);
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Saves the security token
   */
  async save() {
    await this.context.onSaveSecurityTokenRequested()
      .catch(this.onSaveFailure.bind(this));
  }

  /**
   * Whenever the gpg key generation failed
   * @param error The error
   */
  onSaveFailure(error) {
    const ErrorDialogProps = {message: error.message};
    this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
  }


  /**
   * Select a token color
   * @param color A color
   */
  async selectColor(color) {
    if (color.hex !== this.state.background) {
      await this.setState({background: color.hex});
    }
  }

  /**
   * Select a token code
   * @param code A code
   */
  async selectCode(code) {
    await this.setState({code});
  }

  /**
   * Randomize a token code
   */
  randomizeCode() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 3; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({code});
  }

  /**
   * Validate the security token data
   */
  async validate() {
    const {code} = this.state;

    const emptyCode =  code.trim() === '';
    if (emptyCode) {
      await this.setState({hasBeenValidated: true, errors: {emptyCode}});
      return;
    }

    const lengthCode =  code.trim().length !== 3;
    if (lengthCode) {
      await this.setState({hasBeenValidated: true, errors: {lengthCode}});
      return;
    }
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({actions: {processing: true}});
  }

  /**
   * Render the component
   */
  render() {
    const processingClassName = this.state.actions.processing ? 'processing' : '';
    const disabledClassName = this.state.hasBeenValidated && !this.isValid ? 'disabled' : '';
    return (
      <div className="choose-security-token">
        <h1>Pick a color and enter three characters.</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-security-token required">
            <label htmlFor="security-token-text">Security token</label>
            <input
              id="security-token-text"
              ref={this.tokenCodeInputRef}
              type="text"
              className="input text required"
              name="text"
              maxLength="3"
              style={this.securityTokenStyle}
              value={this.state.code}
              onChange={this.handleChangeCode}
              disabled={!this.areActionsAllowed}/>
            <input type="hidden" id="security-token-background-color" name="security-token-background-color"/>
            <input type="hidden" id="security-token-text-color" name="security-token-text-color"/>
            <CirclePicker
              color={ this.state.background }
              onChangeComplete={ this.handleSelectColor }
              width={240}
              circleSize={24}
              circleSpacing={16}
              colors={this.defaultColors}
            />
            <div className="randomize-button-wrapper">
              <a
                className="randomize-button"
                role="button"
                onClick={this.handleRandomizeCode}>
                <Icon name="magic-wand"/> Randomize
              </a>
            </div>
          </div>
          <p>
            This security token will be displayed when your passphrase is requested,
            so you can quickly verify the form is coming from passbolt.
            This will help protect you from <a href="https://en.wikipedia.org/wiki/Phishing" target="_parent" rel="noopener noreferrer">
              phishing attacks
            </a>.
          </p>
          {this.state.hasBeenValidated &&
            <>
              {this.state.errors.emptyCode &&
              <div className="empty-code error message">The security token code should not be empty</div>
              }
              {this.state.errors.lengthCode &&
              <div className="not-good-length-code error message">The security token code should be 3 characters long</div>
              }
            </>
          }
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big ${disabledClassName} ${processingClassName}`}
              role="button">
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ChooseSecurityToken.contextType = AuthenticationContext;
ChooseSecurityToken.propTypes = {
  dialogContext: PropTypes.any // The dialog context
};

export default withDialog(ChooseSecurityToken);
