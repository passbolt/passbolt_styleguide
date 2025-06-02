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
import SafariQuickaccessConfigurationLightSVG from "../../../../img/svg/safari_quickaccess_configuration_light.svg";
import SafariQuickaccessConfigurationDarkSVG from "../../../../img/svg/safari_quickaccess_configuration_dark.svg";

class ApiConfigureSafariExtension extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleExtensionNotInstalledClick = this.handleExtensionNotInstalledClick.bind(this);
  }

  /**
   * Handles "I didn't download the extension" click.
   */
  handleExtensionNotInstalledClick() {
    this.props.onExtensionNotDownloaded();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return (
      <div className="install-extension">
        <h1>
          <Trans>Allow the extension on every website.</Trans>
        </h1>
        <p>
          <Trans>
            Once the extension is installed, it must be allowed on every website, otherwise it won&apos;t work as
            expected.{" "}
            <a href="https://www.passbolt.com/docs/" rel="noopener noreferrer" target="_blank">
              Learn more
            </a>
          </Trans>
        </p>
        {isDarkTheme ? <SafariQuickaccessConfigurationDarkSVG /> : <SafariQuickaccessConfigurationLightSVG />}
        <div className="form-actions">
          <p>
            <Trans>
              Click on <span className="passbolt-logo">@</span> in the toolbar and select &quot;
              <strong>Always allow on every website&hellip;</strong>&quot;
            </Trans>
          </p>
          <button className="link" type="button" onClick={this.handleExtensionNotInstalledClick}>
            <Trans>I didn&apos;t install the extension</Trans>
          </button>
        </div>
      </div>
    );
  }
}

ApiConfigureSafariExtension.propTypes = {
  context: PropTypes.any, // The application context
  onExtensionNotDownloaded: PropTypes.func, // the callback for when the user didn't download the extension
};
export default withAppContext(withTranslation("common")(ApiConfigureSafariExtension));
