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

import Widget from "./widget";

class Area extends Widget {

  constructor(options) {
    super(options);

    const chartOptions = {
      series: this.getOption('series'),
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }

      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      labels: this.getOption('labels'),
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true
      },
      colors: [this.getColorFromName('blue')],
      legend: {
        horizontalAlign: 'left'
      }
    };

    this.setChartOptions(chartOptions);
  }
}

export default Area;