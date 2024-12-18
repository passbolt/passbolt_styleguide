/**
 * Passbolt ~ Open source password manager for teams
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
import Totp from "../Totp/Totp";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";

/**
 * This component represents a table cell totp
 */
class CellTotp extends Component {
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
    this.handleTotpClick = this.handleTotpClick.bind(this);
    this.handlePreviewTotpButtonClick = this.handlePreviewTotpButtonClick.bind(this);
  }

  /**
   * Handle preview totp button click.
   */
  handlePreviewTotpButtonClick(event) {
    // Avoid the grid to select the resource while previewing its secret.
    event.stopPropagation();
    this.props.onPreviewTotpClick(this.value);
  }

  /**
   * Handle totp button click.
   */
  async handleTotpClick(event) {
    // Avoid the grid to select the resource while copying a resource secret.
    event?.stopPropagation();
    this.props.onTotpClick(this.value);
  }

  /**
   * Get the value
   * @return {Object}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Get the preview totp
   * @return {*}
   */
  get previewedTotp() {
    return this.props.getPreviewTotp(this.value);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const hasTotp = this.props.hasTotp(this.value);

    return (
      <>
        {hasTotp &&
          <>
            <div className={`secret secret-totp ${this.previewedTotp ? "" : "secret-copy"}`}>
              {this.previewedTotp &&
                <Totp
                  totp={this.previewedTotp}
                  canClick={this.props.canCopy}
                  onClick={this.handleTotpClick}/>
              }
              {!this.previewedTotp &&
                <button type="button" className="no-border" onClick={this.handleTotpClick} disabled={!this.props.canCopy}>
                  <span>Copy TOTP to clipboard</span>
                </button>
              }
            </div>
            {this.props.canPreview &&
              <button type="button" onClick={this.handlePreviewTotpButtonClick} className="totp-view inline button-transparent">
                {this.previewedTotp ? <EyeCloseSVG/> : <EyeOpenSVG/>}
              </button>
            }
          </>
        }
      </>
    );
  }
}

CellTotp.defaultProps = {
  canPreviewSecret: false,
  canCopySecret: false
};

CellTotp.propTypes = {
  value: PropTypes.object.isRequired, // The value
  title: PropTypes.string, // The title
  canPreview: PropTypes.bool, // The canPreviewSecret boolean property
  canCopy: PropTypes.bool, // The canCopySecret boolean property
  getPreviewTotp: PropTypes.func.isRequired, // The getPreviewTotp function
  onTotpClick: PropTypes.func, // The onTotpClick property
  onPreviewTotpClick: PropTypes.func, // The onPreviewTotpClick property
  hasTotp: PropTypes.func, // The hasTotp function
};

export default CellTotp;
