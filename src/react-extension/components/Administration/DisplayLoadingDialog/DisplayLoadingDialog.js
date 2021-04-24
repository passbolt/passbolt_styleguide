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
import AppContext from "../../../contexts/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {Trans, withTranslation} from "react-i18next";

class DisplayLoadingDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
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
      <DialogWrapper className='loading-dialog' title={this.props.title}
        onClose={this.handleClose} disabled={false}>
        <div className="form-content">
          <label><Trans>Take a deep breath and enjoy being in the present moment...</Trans></label>
          <div className="progress-bar-wrapper">
            <span style={{"width": `100%`}} className="progress-bar big infinite">
              <span className="progress"></span>
            </span>
          </div>
        </div>
      </DialogWrapper>
    );
  }
}

DisplayLoadingDialog.contextType = AppContext;

DisplayLoadingDialog.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(DisplayLoadingDialog);
