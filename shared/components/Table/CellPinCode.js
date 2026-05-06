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
 * @since         5.12.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import HiddenPassword from "../Password/HiddenPassword";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import { Trans } from "react-i18next";

/**
 * This component represents a table cell pin code
 */
class CellPinCode extends Component {
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
    this.handlePinCodeClick = this.handlePinCodeClick.bind(this);
    this.handlePreviewPinCodeButtonClick = this.handlePreviewPinCodeButtonClick.bind(this);
  }

  /**
   * Handle preview pin code button click.
   */
  handlePreviewPinCodeButtonClick(event) {
    // Avoid the grid to select the resource while previewing its secret.
    event.stopPropagation();
    this.props.onPreviewPinCodeClick(this.value);
  }

  /**
   * Handle pin code button click.
   */
  async handlePinCodeClick() {
    this.props.onPinCodeClick(this.value);
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
    const previewedPinCode = this.props.getPreviewPinCode(this.value);
    const showPinCode = typeof previewedPinCode === "string";
    const hasPinCode = this.props.hasPinCode(this.value);
    return (
      <>
        {hasPinCode && (
          <>
            <div
              className={`secret secret-pin-code ${showPinCode ? "" : "secret-copy"}`}
              title={previewedPinCode || this.props.title}
            >
              <HiddenPassword
                canClick={this.props.canCopy}
                preview={previewedPinCode}
                onClick={this.handlePinCodeClick}
                emptySecretSentence={<Trans>There is no pin code</Trans>}
              />
            </div>
            {this.props.canPreview && (
              <button
                type="button"
                onClick={this.handlePreviewPinCodeButtonClick}
                className="pin-code-view inline button-transparent"
              >
                {previewedPinCode ? <EyeCloseSVG /> : <EyeOpenSVG />}
              </button>
            )}
          </>
        )}
      </>
    );
  }
}

CellPinCode.defaultProps = {
  canPreviewSecret: false,
  canCopySecret: false,
};

CellPinCode.propTypes = {
  value: PropTypes.object.isRequired, // The value
  title: PropTypes.string, // The title
  canPreview: PropTypes.bool, // The canPreviewSecret boolean property
  canCopy: PropTypes.bool, // The canCopySecret boolean property
  getPreviewPinCode: PropTypes.func.isRequired, // The getPreviewPinCode function
  onPinCodeClick: PropTypes.func, // The onPinCodeClick property
  onPreviewPinCodeClick: PropTypes.func, // The onPreviewPinCodeClick property
  hasPinCode: PropTypes.func, // The hasPinCode property
};

export default CellPinCode;
