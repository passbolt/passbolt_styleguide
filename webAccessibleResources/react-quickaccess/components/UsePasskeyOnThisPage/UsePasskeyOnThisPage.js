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
 * @since         5.18.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { isRpIdOfUrl, parseRpIdFromUris } from "../../../shared/utils/passkeyRpIdUtils";

/**
 * The "Use on this page" action of a passkey: signs in with it when a waiting sign-in of the page accepts it. On the
 * passkey's site without such a sign-in, the action is disabled and tells the user why; on another site it is hidden.
 */
class UsePasskeyOnThisPage extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      isReady: false, // Whether the tab and its waiting sign-ins are known
      activeTabUrl: null, // The url of the tab QuickAccess was opened for
      pendingPasskeyRequests: [], // The passkey sign-ins the pages of the tab wait for
      isProcessing: false, // Whether the user signs in
      error: null, // The error to display
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * ComponentDidMount hook.
   */
  componentDidMount() {
    this.loadTab();
  }

  /**
   * Loads the url of the tab and the passkey sign-ins its pages wait for.
   * @returns {Promise<void>}
   */
  async loadTab() {
    try {
      const [activeTabUrl, pendingPasskeyRequests] = await Promise.all([
        this.props.context.port.request("passbolt.active-tab.get-url", this.props.context.openerTabId),
        this.props.context.port.request("passbolt.passkey.get-tab-pending-requests", this.props.context.openerTabId),
      ]);
      this.setState({ isReady: true, activeTabUrl, pendingPasskeyRequests });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Whether the tab is on the site of the passkey.
   * @returns {boolean}
   */
  get isOnPasskeySite() {
    return isRpIdOfUrl(parseRpIdFromUris(this.props.resource.metadata?.uris), this.state.activeTabUrl);
  }

  /**
   * The waiting sign-in of the page that accepts the passkey, if any.
   * @returns {{id: string, rp_id: string, passkey_ids: Array<string>}|undefined}
   */
  get acceptingRequest() {
    return this.state.pendingPasskeyRequests.find((request) => request.passkey_ids.includes(this.props.resource.id));
  }

  /**
   * Handles the click on the action: signs in with the passkey, then closes QuickAccess. A cancelled passphrase prompt
   * leaves the action available.
   * @param {React.MouseEvent} event The click event.
   * @returns {Promise<void>}
   */
  async handleClick(event) {
    event.preventDefault();
    const request = this.acceptingRequest;
    if (!request || this.state.isProcessing) {
      return;
    }
    this.setState({ isProcessing: true, error: null });
    try {
      await this.props.context.port.request("passbolt.passkey.authenticate", request.id, this.props.resource.id);
      await this.props.context.closeWindow();
    } catch (error) {
      if (error?.name !== "UserAbortsOperationError") {
        console.error(error);
        this.setState({ error: this.props.t("Unable to sign in with the passkey on this page.") });
      }
      this.setState({ isProcessing: false });
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    if (!this.state.isReady || !this.isOnPasskeySite) {
      return null;
    }
    const isEnabled = Boolean(this.acceptingRequest);
    const isDisabled = !isEnabled || this.state.isProcessing;
    return (
      <>
        <a
          href="#"
          id="popupAction"
          className={`button primary big full-width ${isDisabled ? "disabled" : ""}`}
          role="button"
          aria-disabled={isDisabled}
          onClick={this.handleClick}
        >
          {this.state.isProcessing ? <SpinnerSVG /> : <Trans>Use on this page</Trans>}
        </a>
        {!isEnabled && (
          <p className="use-passkey-hint">
            {this.state.pendingPasskeyRequests.length > 0 ? (
              <Trans>This page asks for a different passkey.</Trans>
            ) : (
              <Trans>No passkey sign-in is waiting on this page. Start one, or reload the page.</Trans>
            )}
          </p>
        )}
        {this.state.error && <div className="error-message">{this.state.error}</div>}
      </>
    );
  }
}

UsePasskeyOnThisPage.propTypes = {
  context: PropTypes.any, // The application context
  resource: PropTypes.object.isRequired, // The passkey resource
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(UsePasskeyOnThisPage));
