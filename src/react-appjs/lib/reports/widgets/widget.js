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

import ApexCharts from 'apexcharts';

class Widget {

  constructor(options) {
    this.options = options;
    this.chartOptions = {};
  }

  static getStyleSheetPropertyValue(selectorText, propertyName) {
    // search backwards because the last match is more likely the right one
    for (let s= document.styleSheets.length - 1; s >= 0; s--) {
      const cssRules = document.styleSheets[s].cssRules ||
        document.styleSheets[s].rules || []; // IE support
      for (let c=0; c < cssRules.length; c++) {
        if (cssRules[c].selectorText === selectorText)
          return cssRules[c].style[propertyName];
      }
    }
    return null;
  }

  getOptions() {
    return this.options;
  }

  getChartOptions() {
    return this.chartOptions;
  }

  getOption(name) {
    return this.options[name];
  }

  setChartOptions(chartOptions) {
    this.chartOptions = chartOptions;
  }

  getColorFromName(colorName) {
    const cssColorsPath = '.report-widget .colors.';
    const colorHex = Widget.getStyleSheetPropertyValue(cssColorsPath + colorName, 'color');

    return colorHex;
  }

  render(elt) {
    const chart = new ApexCharts(elt, this.getChartOptions());
    chart.render();
  }
}

export default Widget;