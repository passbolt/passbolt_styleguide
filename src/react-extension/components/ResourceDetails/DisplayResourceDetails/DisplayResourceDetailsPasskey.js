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

import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { withClipboard } from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";
import { isRpIdOfUrl } from "../../../../shared/utils/passkeyRpIdUtils";

import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

/**
 * Passkey section of the resource details: the website and account the passkey signs in to. The secret (private key)
 * is never requested.
 */
class DisplayResourceDetailsPasskey extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
    this.handleWebsiteClick = this.handleWebsiteClick.bind(this);
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Handle accordion title click.
   */
  handleTitleClick() {
    this.setState({ open: !this.state.open });
  }

  /**
   * Handle the username copy to clipboard on click.
   * @returns {Promise<void>}
   */
  async handleUsernameClick() {
    await this.props.clipboardContext.copy(
      this.resource.metadata.username,
      this.translate("The username has been copied to clipboard."),
    );
  }

  /**
   * Handle the website click.
   */
  handleWebsiteClick() {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.resource.metadata.uris[0]);
  }

  /**
   * Get the translate function
   * @returns {function(...*=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const rpId = this.resource.metadata.passkey?.rp_id;
    // The link opens the first uri, so it is shown only when that uri belongs to the domain it is labelled with.
    const isLink = isRpIdOfUrl(rpId, this.resource.metadata.uris?.[0]);

    return (
      <div className="detailed-passkey accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button className="no-border" type="button" onClick={this.handleTitleClick}>
              <span className="accordion-title">
                <Trans>Passkey</Trans>
              </span>
              {this.state.open && <CaretDownSVG />}
              {!this.state.open && <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {this.state.open && (
          <div className="accordion-content">
            <div className="information-label">
              <span className="website label">
                <Trans>Website</Trans>
              </span>
              <span className="username label">
                <Trans>Username</Trans>
              </span>
            </div>
            <div className="information-value">
              <span className="website value">
                {isLink ? (
                  <button type="button" className="link no-border" onClick={this.handleWebsiteClick}>
                    <span>{rpId}</span>
                  </button>
                ) : (
                  <span>{rpId}</span>
                )}
              </span>
              <span className="username value">
                <button type="button" className="no-border" onClick={this.handleUsernameClick}>
                  <span>{this.resource.metadata.username}</span>
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsPasskey.propTypes = {
  resourceWorkspaceContext: PropTypes.object,
  clipboardContext: PropTypes.object, // the clipboard service provider
  t: PropTypes.func, // The translation function
};

export default withClipboard(withResourceWorkspace(withTranslation("common")(DisplayResourceDetailsPasskey)));
