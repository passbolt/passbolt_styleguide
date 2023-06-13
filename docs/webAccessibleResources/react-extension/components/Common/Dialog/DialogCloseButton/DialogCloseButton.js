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
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Icon from "../../../../../shared/components/Icons/Icon";

class DialogCloseButton extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Handle close click.
   * @return {void}
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <button type="button" disabled={this.props.disabled} className="dialog-close button button-transparent" onClick={this.handleCloseClick}>
        <Icon name='close'/>
        <span className="visually-hidden"><Trans>Close</Trans></span>
      </button>
    );
  }
}

DialogCloseButton.propTypes = {
  onClose: PropTypes.func,
  disabled: PropTypes.bool
};

export default withTranslation("common")(DialogCloseButton);
