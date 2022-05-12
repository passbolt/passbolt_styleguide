/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../shared/components/Icons/Icon";

class DisplayInFormMenuItem extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Binds methods callbacks
   */
  bindCallbacks() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Get the input button classname
   * @returns {string}
   */
  getClassName() {
    let name = 'in-form-menu-item';
    if (this.props.disabled) {
      name += ' disabled';
    }
    if (this.props.processing) {
      name += ' processing';
    }
    return name;
  }

  /**
   * Handle cancel click
   * @return {void}
   */
  handleClick() {
    this.props.onClick();
  }

  /**
   * Render the component
   */
  render() {
    return (
      <a className={this.getClassName()} onClick={this.handleClick}>
        <div className="in-form-menu-item-icon">
          <Icon name={this.props.processing ? "spinner" : this.props.icon} big={true} dim={true}/>
        </div>
        <div className="in-form-menu-item-content">
          <div className="in-form-menu-item-content-header">
            <strong>
              {this.props.title}
            </strong>
          </div>
          <div className="in-form-menu-item-content-subheader">
            {this.props.subtitle}
          </div>
          <div className="in-form-menu-item-content-description">
            {this.props.description}
          </div>
        </div>
      </a>
    );
  }
}

DisplayInFormMenuItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
  description: PropTypes.string,
  icon: PropTypes.any,
  processing: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default DisplayInFormMenuItem;
