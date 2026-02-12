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
 * @since         5.3.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import { Trans, withTranslation } from "react-i18next";

/**
 * This component represent a secure textarea field with some additional properties
 */
class SecureTextarea extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      viewTextarea: false, // view textarea
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleViewTextareaButtonClick = this.handleViewTextareaButtonClick.bind(this);
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }
  /**
   * Handle view password button click.
   */
  handleViewTextareaButtonClick() {
    if (this.props.disabled) {
      return;
    }
    this.setState({ viewTextarea: !this.state.viewTextarea });
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className={`textarea-wrapper ${this.props.disabled ? "disabled" : ""}`}>
        <textarea
          id={this.props.id}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={`${!this.state.viewTextarea ? "secure" : ""}`}
          value={this.props.value}
          onChange={this.handleInputChange}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          autoComplete={this.props.autoComplete}
          maxLength={this.props.maxLength}
        ></textarea>
        <div className="textarea-view-wrapper">
          <button
            type="button"
            onClick={this.handleViewTextareaButtonClick}
            className={`textarea-view infield button-transparent ${this.props.disabled ? "disabled" : ""}`}
          >
            {!this.state.viewTextarea && <EyeOpenSVG className="svg-icon eye-open" />}
            {this.state.viewTextarea && <EyeCloseSVG className="svg-icon eye-close" />}
            <span className="visually-hidden">
              <Trans>View</Trans>
            </span>
          </button>
        </div>
      </div>
    );
  }
}

SecureTextarea.defaultProps = {
  id: "",
  name: "",
  autoComplete: "off",
};

SecureTextarea.propTypes = {
  id: PropTypes.string, // The id of the textarea
  name: PropTypes.string, // The name of the textarea
  value: PropTypes.string, // The value of the textarea
  placeholder: PropTypes.string, // Placeholder of the textarea
  autoComplete: PropTypes.string, // The auto complete of the textarea
  disabled: PropTypes.bool, // Disabled textarea
  readOnly: PropTypes.bool, // Read only textarea
  maxLength: PropTypes.number, // Max length textarea
  onChange: PropTypes.func, // Function onChange of the textarea
};

export default withTranslation("common")(SecureTextarea);
