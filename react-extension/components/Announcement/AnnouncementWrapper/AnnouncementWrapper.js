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
 * @since         3.2.0
 */
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";

class AnnouncementWrapper extends Component {
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
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className={`${this.props.className} announcement`}>
        <div className="announcement-content">
          {this.props.canClose &&
          <button type="button" className="announcement-close dialog-close button-transparent" onClick={this.handleClose}>
            <Icon name='close'/>
            <span className="visually-hidden"><Trans>Close</Trans></span>
          </button>
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

AnnouncementWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  canClose: PropTypes.bool,
  onClose: PropTypes.func
};

export default withTranslation("common")(AnnouncementWrapper);
