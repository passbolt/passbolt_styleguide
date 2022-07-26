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
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";

const DOWNLOAD_FIREFOX_URL = "https://www.mozilla.org/firefox/download/thanks/";
const DOWNLOAD_CHROME_URL = "https://www.google.com/chrome/";

class DisplayBrowserNotSupported extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "black" : "white";

    return {
      theme: currentTheme
    };
  }
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="browser-not-supported">
        <h1><Trans>Sorry, your browser is not supported.</Trans></h1>
        <p><Trans>Please download chrome or firefox to get started with passbolt.</Trans></p>
        <a href={`${DOWNLOAD_FIREFOX_URL}`} className="browser" target="_blank" rel="noopener noreferrer">
          <img src={`${this.props.context.trustedDomain}/img/third_party/firefox_logo-${this.state.theme}.png`} />
        </a>
        <div className="form-actions">
          <a href={DOWNLOAD_FIREFOX_URL} className="button primary big full-width" role="button" target="_blank" rel="noopener noreferrer"><Trans>Download Firefox</Trans></a>
          <a href={DOWNLOAD_CHROME_URL} role="button" target="_blank" rel="noopener noreferrer"><Trans>Download Chrome</Trans></a>
          {/*<a role="button">Why is my browser not supported?</a>*/}
        </div>
      </div>
    );
  }
}

DisplayBrowserNotSupported.propTypes = {
  context: PropTypes.any, // The application context
};
export default withAppContext(withTranslation("common")(DisplayBrowserNotSupported));
