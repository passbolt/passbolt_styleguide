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
import Chart from "../../../Common/Charts/Chart";


class LoginHistory extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.series = [{
      name: 'users login',
      data: [
        11,
      32,
      0,
      0,
      34,
      52,
      41,
      12,
      11,
      0,
      6,
      12,
      30,
      3,
      0
    ]}];

    this.labels = [
      "2018-09-19T00:00:00.000Z",
      "2018-09-20T00:00:00.000Z",
      "2018-09-21T00:00:00.000Z",
      "2018-09-22T00:00:00.000Z",
      "2018-09-23T00:00:00.000Z",
      "2018-09-24T00:00:00.000Z",
      "2018-09-25T00:00:00.000Z",
      "2018-09-26T00:00:00.000Z",
      "2018-09-27T00:00:00.000Z",
      "2018-09-28T00:00:00.000Z",
      "2018-09-29T00:00:00.000Z",
      "2018-09-30T00:00:00.000Z",
      "2018-10-01T00:00:00.000Z",
      "2018-10-02T00:00:00.000Z",
      "2018-10-03T00:00:00.000Z",
    ];
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

  plot () {
    return (
      <div className="plot-container">
        <div className="plot">
          <span className="label">Active users</span>
          <div className="bar-container">
            <div className="bar" style={{width:'50%'}}>
            </div>
          </div>
        </div>
        <div className="plot-value">15</div>
      </div>
    );
  }

  render() {
    return (
      <div className="report-widget widget-login-history">
        <h2>Login History</h2>
        <Chart type="area" data={{series: this.series, labels: this.labels}}/>
      </div>
    );
  }
}

LoginHistory.propTypes = {

};

export default LoginHistory;

