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

class Gauge extends Widget {

  constructor(options) {
    super(options);

    const graphColor = this.getColorFromName(this.getOption('color'));
    const color = graphColor || "#636363";
    const radd = options.radd === undefined ? '' : options.radd;
    const value = options.value || 0;

    const chartOptions = {
      chart: {
        height: 200,
        type: 'radialBar',
      },
      series: [value],
      labels: ['total'],

      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%",
          },

          dataLabels: {
            showOn: "always",
            name: {
              show: false,
            },
            value: {
              offsetY: 7,
              color: "#000",
              fontSize: "25px",
              show: true,
              formatter: function (val) {
                return val + radd;
              }
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: [color]
      },
      stroke: {
        lineCap: "round",
      },
    };

    this.setChartOptions(chartOptions);
  }
}

export default Gauge;