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
import Icon from "../../../Common/Icons/Icon";
import ReactDOM from "react-dom";
import $ from 'jquery';


class DashboardCount extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      loading: true,
    }
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    $('.animate-count', $(el)).each(function () {
      $(this).prop('Counter',0).animate({
        Counter: $(this).text()
      }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  }

  render() {
    return (
      <div className={"report-widget widget-dashboard-count " + this.props.className}>
        <div className="count">
          <span className="number animate-count">{this.props.value}</span>
          <span className="label">{this.props.label}</span>
        </div>
        <div className="illustration">
          <Icon name={this.props.iconName} />
        </div>
        <div className="since">
          <span>+2</span> since last month
        </div>
      </div>
    );
  }
}

DashboardCount.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default DashboardCount;

