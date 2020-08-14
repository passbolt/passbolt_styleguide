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
import Icon from "../../../../../react/components/Common/Icons/Icon";

class GridReport extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    this.handleSelectChange = this.handleSelectChange.bind(this);
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

  handleSelectChange(selectedOption) {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  }

  render() {
    return (
      <div className="report-wrapper">
        <h2>Grid report</h2>
        <div className="grid-report">
          <div className="table-info-actions">
            <div className="table-info-filters">
              <Autocomplete
                id="share-name-input"
                name="name"
                label="Share with people or groups"
                placeholder="Start typing a user or group name"
                searchCallback={this.fetchAutocompleteItems}
                onSelect={this.handleAutocompleteSelect}
                onServiceError={this.handleServiceError}
                onOpen={this.handleAutocompleteOpen}
                onClose={this.handleAutocompleteClose}
                disabled={this.hasAllInputDisabled()}
              />

              <div className="date-range">

                <input type="date" />
                <input type="date" />
              </div>
            </div>
          </div>
          <table className="table-info horizontal with-borders">
            <thead>
            <tr>
              <th>
                <a role="button" className="sortable">
                  <span>status</span>
                  <Icon name="caret-up"/>
                </a>
              </th>
              <th>IP Address</th>
              <th>
                <a role="button" className="sortable">
                  <span>status</span>
                  <Icon name="caret-down"/>
                </a>
              </th>
              <th><a role="button">Date</a></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>success</td>
              <td>192.168.102.120</td>
              <td>22 Mar 2015 @ 12:31</td>
              <td>22 Mar 2015 @ 12:31</td>
            </tr>
            <tr>
              <td>warning</td>
              <td>192.168.102.122</td>
              <td>22 Mar 2015 @ 12:31</td>
              <td>22 Mar 2015 @ 12:31</td>
            </tr>
            <tr>
              <td>error</td>
              <td>192.168.102.120</td>
              <td>22 Mar 2015 @ 12:31</td>
              <td>22 Mar 2015 @ 12:31</td>
            </tr>
            </tbody>
          </table>
          <div className="table-info-pagination">
            <div className="pagination-limit">
              <label htmlFor="limit">Number of items:</label>
              <select name="limit">
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>
            </div>
            <div className="pagination-pages">
              <div className="page-location">
                1 – 100 of 20,136
              </div>
              <ul className="page-buttons">
                <li>
                  <a role="button" className="button disabled">
                    <span className="visually-hidden">previous page</span>
                    <Icon name="chevron-left"/>
                  </a>
                  <a role="button" className="button">
                    <span className="visually-hidden">next page</span>
                    <Icon name="chevron-right"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GridReport.propTypes = {

};

export default GridReport;

