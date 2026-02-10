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
import SafariExtensionSettingsLightSVG from "../../../../img/svg/safari_extension_settings_light.svg";
import SafariExtensionSettingsDarkSVG from "../../../../img/svg/safari_extension_settings_dark.svg";

class ExtConfigureSafariExtension extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleGoToSettingsClick = this.handleGoToSettingsClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleExtensionPermissionChanged = this.handleExtensionPermissionChanged.bind(this);
  }

  componentDidMount() {
    this.bindEventListeners();
  }

  async componentWillUnmount() {
    await this.unbindEventListeners();
  }

  /**
   * Bind events to listen to permission update
   */
  async bindEventListeners() {
    this.props.context.port.on("passbolt.extension.on-permission-updated", this.handleExtensionPermissionChanged);

    await this.props.context.port.request("passbolt.extension.start-checking-for-permission-update");
  }

  /**
   * Unbind previously bound events to avoid memory leak
   */
  async unbindEventListeners() {
    await this.props.context.port.request("passbolt.extension.stop-checking-for-permission-update");
    this.props.context.port.removeListener(
      "passbolt.extension.on-permission-updated",
      this.handleExtensionPermissionChanged,
    );
  }

  /**
   * Callback when the user changed the permissions of the extension.
   * @returns {Promise<void>}
   */
  async handleExtensionPermissionChanged() {
    const isAllowedOnEveryWebsite = await this.props.context.port.request(
      "passbolt.extension.is-allowed-on-every-website",
    );
    if (!isAllowedOnEveryWebsite) {
      return;
    }

    await this.unbindEventListeners();
    this.props.onContinue();
  }

  /**
   * Handles "Go to settings" click.
   */
  handleGoToSettingsClick() {
    this.props.context.port.request("passbolt.safari.open-extension-settings");
  }

  /**
   * Handles "Continue" click.
   */
  handleContinueClick() {
    this.props.onContinue();
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
          <Trans>Congratulations! Passbolt extension has been installed.</Trans>
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
        {isDarkTheme ? <SafariExtensionSettingsDarkSVG /> : <SafariExtensionSettingsLightSVG />}
        <div className="form-actions">
          <p>
            <Trans>
              Go to the extension settings and click on &quot;<strong>Always allow on every websites&hellip;</strong>
              &quot;
            </Trans>
          </p>
          <button className="button big primary full-width" type="button" onClick={this.handleGoToSettingsClick}>
            <Trans>Go to settings</Trans>
          </button>
          <button className="link" type="button" onClick={this.handleContinueClick}>
            <Trans>Continue</Trans>
          </button>
        </div>
      </div>
    );
  }
}

ExtConfigureSafariExtension.propTypes = {
  context: PropTypes.any, // The application context
  onContinue: PropTypes.func, // the callback for when the user click on "continue"
};
export default withAppContext(withTranslation("common")(ExtConfigureSafariExtension));
