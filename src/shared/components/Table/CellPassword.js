/**
 * Passbolt ~ Open source TableHeader manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import HiddenPassword from "../Password/HiddenPassword";
import Icon from "../Icons/Icon";

/**
 * This component represents a table cell password
 */
class CellPassword extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Initialize the bindCallback
   */
  bindCallbacks() {
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
    this.handlePreviewPasswordButtonClick = this.handlePreviewPasswordButtonClick.bind(this);
  }

  /**
   * Handle preview password button click.
   */
  handlePreviewPasswordButtonClick(event) {
    // Avoid the grid to select the resource while previewing its secret.
    event.stopPropagation();
    this.props.onPreviewPasswordClick(this.value);
  }

  /**
   * Handle password button click.
   */
  async handlePasswordClick() {
    this.props.onPasswordClick(this.value);
  }

  /**
   * Get the value
   * @return {Object}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const previewedPassword = this.props.getPreviewPassword(this.value);
    return (
      <>
        <div className={`secret ${previewedPassword ? "" : "secret-copy"}`}
          title={previewedPassword || "secret"}>
          <HiddenPassword
            canClick={this.props.canCopySecret}
            preview={previewedPassword}
            onClick={this.handlePasswordClick} />
        </div>
        {this.props.canPreviewSecret &&
          <button type="button" onClick={this.handlePreviewPasswordButtonClick} className="password-view button-transparent">
            <Icon name={previewedPassword ? 'eye-close' : 'eye-open'}/>
          </button>
        }
      </>
    );
  }
}

CellPassword.defaultProps = {
  canPreviewSecret: false,
  canCopySecret: false
};

CellPassword.propTypes = {
  value: PropTypes.string.isRequired, // The value
  canPreviewSecret: PropTypes.bool, // The canPreviewSecret boolean property
  canCopySecret: PropTypes.bool, // The canCopySecret boolean property
  getPreviewPassword: PropTypes.func.isRequired, // The getPreviewPassword function
  onPasswordClick: PropTypes.func, // The onPasswordClick property
  onPreviewPasswordClick: PropTypes.func, // The onPreviewPasswordClick property
};

export default CellPassword;
