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
import DashboardCount from "../widgets/DashboardCount";
import DashboardPlots from "../widgets/DashboardPlots";
import LoginHistory from "../widgets/LoginHistory";

class Dashboard extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.plot1Data = {
        'title': 'Users',
        'data': [
          {
            'label' : 'Active users',
            'value' : 35,
            'percent': 95
          },
          {
            'label' : 'Never logged in',
            'value' : 5,
          },
          {
            'label' : 'Idle',
            'value' : 1,
          },
        ]
      };

    this.plot2Data = {
      'title': 'Items',
      'data': [
        {
          'label' : 'Shared',
          'value' : 1000,
          'percent': 95
        },
        {
          'label' : 'Private',
          'value' : 100,
          'percent': 10
        },
        {
          'label' : 'Organized in folders',
          'value' : 500,
          'percent': 50
        },
      ]
    };
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

  render() {
    return (
      <div className="report-wrapper">
        <div className="grid grid-responsive-12 report-dashboard">
          <div className="row">
            <div className="col9 push2">
              <div className="grid-responsive-12">
                <div className="row">
                  <div className="col12 last">
                    <h2>Dashboard</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col4">
                    <DashboardCount iconName="user" className="users" label="users" value="37" />
                  </div>
                  <div className="col4">
                    <DashboardCount iconName="users" className="groups" label="groups" value="14" />
                  </div>
                  <div className="col4 last">
                    <DashboardCount iconName="key" className="items"  label="items" value="1150" />
                  </div>
                </div>
                <div className="row">
                  <div className="col6">
                    <DashboardPlots title={this.plot1Data.title} data={this.plot1Data.data} className="users" />
                  </div>
                  <div className="col6 last">
                    <DashboardPlots title={this.plot2Data.title} data={this.plot2Data.data} className="items" />
                  </div>
                </div>
                <div className="row">
                  <div className="col12 last">
                    <LoginHistory/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;

