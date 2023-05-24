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
 * @since         3.0.0
 */

export const BROWSER_NAMES = {
  CHROME: "chrome",
  EDGE: "edge",
  FIREFOX: "firefox",
  INTERNET_EXPLORER: "internet-explorer",
  OPERA: "opera",
  SAFARI: "safari",
  SAMSUNG: "samsung",
  UNKNOWN: "unknown",
};

/**
 * Detect the browser name.
 * Code based on: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator#Example_1_Browser_detect_and_return_a_string
 * @returns {string}
 */
export function detectBrowserName() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  let browserName;

  if (userAgent.indexOf("firefox") > -1) {
    browserName = BROWSER_NAMES.FIREFOX;
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (userAgent.indexOf("samsungbrowser") > -1) {
    browserName = BROWSER_NAMES.SAMSUNG;
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1) {
    browserName = BROWSER_NAMES.OPERA;
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (userAgent.indexOf("trident") > -1) {
    browserName = BROWSER_NAMES.INTERNET_EXPLORER;
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (userAgent.indexOf("edg") > -1) {
    browserName = BROWSER_NAMES.EDGE;
    /*
     * "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
     * 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34'
     */
  } else if (userAgent.indexOf("chrome") > -1) {
    browserName = BROWSER_NAMES.CHROME;
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (userAgent.indexOf("safari") > -1) {
    browserName = BROWSER_NAMES.SAFARI;
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    browserName = BROWSER_NAMES.UNKNOWN;
  }

  return browserName;
}
