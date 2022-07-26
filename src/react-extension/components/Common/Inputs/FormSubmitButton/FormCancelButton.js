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
import {Trans, withTranslation} from "react-i18next";

class FormCancelButton extends Component {
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
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle cancel click
   * @return {void}
   */
  handleClick() {
    if (!this.props.disabled) {
      this.props.onClick();
    }
  }

  /**
   * Get the input button classname
   * @returns {string}
   */
  getClassName() {
    let name = 'cancel';
    if (this.props.disabled) {
      name += ' disabled';
    }
    return name;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <a className={this.getClassName()} role="button" onClick={this.handleClick}><Trans>Cancel</Trans></a>
    );
  }
}

FormCancelButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withTranslation("common")(FormCancelButton);
