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
import Icon from "../../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";

class FormSubmitButton extends Component {
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
    this.getClassName = this.getClassName.bind(this);
  }

  /**
   * Get the input button classname
   * @returns {string}
   */
  getClassName() {
    let name = 'button primary';
    if (this.props.warning) {
      name += ' warning';
    }
    if (this.props.disabled) {
      name += ' disabled';
    }
    if (this.props.processing) {
      name += ' processing';
    }
    if (this.props.big) {
      name += ' big';
    }
    if (this.props.medium) {
      name += ' medium';
    }
    if (this.props.fullWidth) {
      name += ' full-width';
    }
    return name;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <button type="submit"
        className={this.getClassName()}
        disabled={this.props.disabled}>
        {this.props.value || <Trans>Save</Trans>}
        {this.props.processing &&
          <Icon name="spinner"/>
        }
      </button>
    );
  }
}

FormSubmitButton.defaultProps = {
  warning: false
};

FormSubmitButton.propTypes = {
  processing: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  warning: PropTypes.bool,
  big: PropTypes.bool,
  medium: PropTypes.bool,
  fullWidth: PropTypes.bool
};

export default withTranslation("common")(FormSubmitButton);
