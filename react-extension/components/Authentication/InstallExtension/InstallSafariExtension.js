/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.10.0
 */
import React from "react";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import AppStoreSVG from "../../../../img/third_party/appstore.svg";

const APPLE_STORE_BROWSER_EXTENSION_URL = "https://apps.apple.com/app/6754879299";

class InstallSafariExtension extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInstallExtensionClick = this.handleInstallExtensionClick.bind(this);
    this.handleAlreadyInstalledClick = this.handleAlreadyInstalledClick.bind(this);
  }

  /**
   * Refresh the page
   */
  handleAlreadyInstalledClick() {
    this.props.onExtensionAlreadyInstalled();
  }

  /**
   * Handles Safari extension download process specifities.
   */
  handleInstallExtensionClick() {
    this.props.onExtensionDownloading();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="install-extension">
        <h1>
          <Trans>Please install the browser extension (BETA).</Trans>
        </h1>
        <p>
          <Trans>Please download the browser extension and refresh this page to continue.</Trans>
        </p>
        <a
          href={APPLE_STORE_BROWSER_EXTENSION_URL}
          className="browser-webstore safari"
          target="_blank"
          rel="noopener noreferrer"
          onClick={this.handleInstallExtensionClick}
        >
          <AppStoreSVG />
        </a>
        <div className="form-actions">
          <a
            href={APPLE_STORE_BROWSER_EXTENSION_URL}
            className="button primary big full-width"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.handleInstallExtensionClick}
          >
            <Trans>Download extension</Trans>
          </a>
          <button className="link" type="button" onClick={this.handleAlreadyInstalledClick}>
            <Trans>I already installed the extension</Trans>
          </button>
        </div>
      </div>
    );
  }
}

InstallSafariExtension.propTypes = {
  context: PropTypes.any, // The application context
  onExtensionDownloading: PropTypes.func, //callback to handle download extension click
  onExtensionAlreadyInstalled: PropTypes.func, //callback to hand "already installed" button click
};
export default withAppContext(withTranslation("common")(InstallSafariExtension));
