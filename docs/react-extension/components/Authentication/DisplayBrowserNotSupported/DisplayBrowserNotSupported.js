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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";

class DisplayBrowserNotSupported extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    return {
      //we should always have a browser selected in the list, so by default the first one in the list is selected
      selectedBrowser: this.compatibleBrowserList[0]
    };
  }

  handleBrowserButtonClick(browserInfo) {
    this.setState({
      selectedBrowser: browserInfo
    });
  }

  /**
   * Returns the list of compatible browsers and their associated information.
   * @returns {Array<object>}
   */
  get compatibleBrowserList() {
    return [
      {
        name: "Mozilla Firefox",
        img: "firefox.svg",
        url: "https://www.mozilla.org/"
      },
      {
        name: "Google Chrome",
        img: "chrome.svg",
        url: "https://www.google.com/chrome/"
      },
      {
        name: "Microsoft Edge",
        img: "edge.svg",
        url: "https://www.microsoft.com/edge"
      },
      {
        name: "Brave",
        img: "brave.svg",
        url: "https://www.brave.com/"
      },
      {
        name: "Vivaldi",
        img: "vivaldi.svg",
        url: "https://www.vivaldi.com/"
      },
    ];
  }
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="browser-not-supported">
        <h1><Trans>Sorry, your browser is not supported.</Trans></h1>
        <p><Trans>Please download one of these browsers to get started with passbolt:</Trans></p>
        <div className="browser-button-list">
          {this.compatibleBrowserList.map((browserInfo, key) =>
            <button key={key} className={`browser${browserInfo.name === this.state.selectedBrowser.name ? ' focused' : ''}`} target="_blank" onClick={() => this.handleBrowserButtonClick(browserInfo)}>
              <img src={`${this.props.context.trustedDomain}/img/third_party/${browserInfo.img}`} />
            </button>
          )}
        </div>
        <div className="form-actions">
          <a href={this.state.selectedBrowser.url} rel="noopener noreferrer" className="button primary big full-width" role="button" target="_blank"><Trans>Download {{browserName: this.state.selectedBrowser.name}}</Trans></a>
        </div>
      </div>
    );
  }
}

DisplayBrowserNotSupported.propTypes = {
  context: PropTypes.any, // The application context
};
export default withAppContext(withTranslation("common")(DisplayBrowserNotSupported));
