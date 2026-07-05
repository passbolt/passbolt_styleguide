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
 * @since         5.13.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";

import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

/**
 * Shows the passkeys stored inside the selected resource secret (read-only). The section is only
 * rendered when the resource actually has at least one passkey — it is loaded silently on mount using
 * the cached passphrase, so it never prompts and never shows for password-only resources. Passkeys
 * are not deleted from here: removal is done from the resource edit form (which requires the master
 * passphrase) so a passkey cannot be dropped by accident.
 */
class DisplayResourceDetailsPasskeys extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, loaded: false, passkeys: [] };
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  componentDidMount() {
    this.loadPasskeys();
  }

  componentDidUpdate(prevProps) {
    const previousResource = prevProps.resourceWorkspaceContext?.details?.resource;
    const currentResource = this.props.resourceWorkspaceContext?.details?.resource;
    if (previousResource?.id !== currentResource?.id) {
      this.setState({ loaded: false, passkeys: [] }, () => this.loadPasskeys());
    }
  }

  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  handleTitleClick() {
    this.setState({ open: !this.state.open });
  }

  async loadPasskeys() {
    try {
      // Silent load: uses the cached passphrase only (no prompt). A locked vault yields an empty list,
      // so the section simply stays hidden until the vault is unlocked and the resource re-selected.
      const passkeys = await this.props.context.port.request("passbolt.fido2-passkey.list", this.resource.id, true);
      this.setState({ loaded: true, passkeys: passkeys || [] });
    } catch {
      this.setState({ loaded: true, passkeys: [] });
    }
  }

  render() {
    const { open, passkeys } = this.state;
    if (!passkeys.length) {
      return null; // hide the whole section unless the resource really has a passkey
    }
    return (
      <div className="detailed-passkeys accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button className="no-border" type="button" onClick={this.handleTitleClick}>
              <span className="accordion-title">
                <Trans>Passkeys</Trans>
              </span>
              {open ? <CaretDownSVG /> : <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {open && (
          <div className="accordion-content">
            {passkeys.map((passkey) => (
              <div key={passkey.credential_id} className="information-value passkey-row">
                <div>
                  <div className="passkey-name">{passkey.user_name || passkey.rp_id}</div>
                  <div className="passkey-meta">
                    {passkey.rp_id}
                    {passkey.created ? ` · ${new Date(passkey.created).toLocaleDateString()}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsPasskeys.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.object, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withActionFeedback(withResourceWorkspace(withTranslation("common")(DisplayResourceDetailsPasskeys))),
);
