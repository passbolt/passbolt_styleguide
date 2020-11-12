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
import LoginContext from "../../contexts/LoginContext";
import {CirclePicker} from "react-color";
import Icon from "../../../react/components/Common/Icons/Icon";

class ChooseSecurityTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: '#3f51b5'
    };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeComplete(color) {
    if (color.hex !== this.state.background) {
      this.setState({background: color.hex});
    }
  }

  get defaultColors() {
    return [
      '#f44336', '#9c27b0', '#3f51b5', '#03a9f4',
      '#009688', '#8bc34a', '#ffeb3b', '#ff9800',
      '#795548', '#607d8b', '#000000', '#f6f6f6'
    ];
  }

  get textColor() {
    const c = this.state.background.substr(1).match(/(\S{2})/g);
    const r = parseInt(c[0], 16);
    const g = parseInt(c[1], 16);
    const b = parseInt(c[2], 16);
    const l = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return l > 125 ? '#000000' : '#ffffff';
  }

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

  render() {
    return (
      <div className="choose-security-token">
        <h1>Pick a color and enter three characters.</h1>
        <form>
          <div className="input-security-token required">
            <label htmlFor="security-token-text">Security token</label>
            <input type="text" id="security-token-text" className="input text required" name="text" maxLength="3"
              style={this.securityTokenStyle}
            />
            <input type="hidden" id="security-token-background-color" name="security-token-background-color"/>
            <input type="hidden" id="security-token-text-color" name="security-token-text-color"/>
            <CirclePicker
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
              width={240}
              circleSize={24}
              circleSpacing={16}
              colors={this.defaultColors}
            />
            <div className="randomize-button-wrapper">
              <a href="#" className="randomize-button" role="button">
                <Icon name="magic-wand" baseline={true}/> Randomize
              </a>
            </div>
          </div>
          <p>
            This security token will be displayed when your passphrase is requested,
            so you can quickly verify the form is coming from passbolt.
            This will help protect you from <a href="https://en.wikipedia.org/wiki/Phishing" target="_blank" rel="noopener noreferrer">
              phishing attacks
            </a>.
          </p>
          <div className="form-actions">
            <button type="submit" className="button primary big" role="button">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

ChooseSecurityTokenForm.contextType = LoginContext;

export default ChooseSecurityTokenForm;
