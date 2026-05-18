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
 * @since         5.12.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";

import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withRbac } from "../../../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../../../shared/services/rbacs/uiActionEnumeration";
import HiddenPassword from "../../../../shared/components/Password/HiddenPassword";
import { withProgress } from "../../../contexts/ProgressContext";

import { withClipboard } from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";

import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";

class DisplayResourceDetailsPinCode extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {object}
   */
  getDefaultState() {
    return {
      open: true,
      plaintextSecret: null,
      isPinCodePreviewed: false,
    };
  }

  /**
   * Clear the secret (setting it to null) and stop the preview.
   */
  clearSecret() {
    this.setState({ plaintextSecret: null, isPinCodePreviewed: false });
  }

  /**
   * Checks if the resource has been changed or updated and if yes, reset the secret preview state.
   */
  componentDidUpdate(prevProps) {
    const previousResource = prevProps.resourceWorkspaceContext?.details?.resource;
    const currentResource = this.props.resourceWorkspaceContext?.details?.resource;
    const hasResourceChanged =
      previousResource?.id !== currentResource?.id || previousResource?.modified !== currentResource?.modified;

    if (hasResourceChanged) {
      this.clearSecret();
    }
  }

  bindCallbacks() {
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handlePinCodeCopyClick = this.handlePinCodeCopyClick.bind(this);
    this.handleTogglePinCodeView = this.handleTogglePinCodeView.bind(this);
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
    const open = !this.state.open;
    this.setState({ open });

    if (!open) {
      this.clearSecret();
    }
  }

  /**
   * Decrypt the pin code of the resource
   * @returns {Promise<string>} the decrypted pin code, an empty string if there was an error. The promise is rejected if the user aborts the operation.
   * @throws {UserAbortsOperationError} if the user aborts the operation.
   */
  async decryptPinCode() {
    const resourceId = this.resource.id;

    let plaintextSecret;

    try {
      this.props.progressContext.open(this.translate("Decrypting secret"));

      const plaintextSecretDto = await this.props.context.port.request(
        "passbolt.secret.find-by-resource-id",
        resourceId,
      );

      plaintextSecret = plaintextSecretDto?.pin_code;
    } catch (error) {
      if (error.name === "UserAbortsOperationError") {
        throw error; // Let the parent component handle this error
      } else {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    } finally {
      this.props.progressContext.close();
    }

    return plaintextSecret ?? "";
  }

  /**
   * Handle the pin code copy to clipboard on click.
   * @returns {Promise<void>}
   */
  async handlePinCodeCopyClick() {
    let plaintextSecret = this.state.plaintextSecret;
    if (!this.state.isPinCodePreviewed) {
      try {
        plaintextSecret = await this.decryptPinCode();
      } catch {
        // The user cancelled the passphrase dialog, we set plaintextSecret to null to avoid displaying the error
        plaintextSecret = null;
      }
    }

    if (plaintextSecret) {
      await this.props.clipboardContext.copyTemporarily(
        plaintextSecret,
        this.translate("The pin code has been copied to clipboard."),
      );

      await this.props.resourceWorkspaceContext.onResourceCopied();
    } else if (plaintextSecret?.length === 0) {
      await this.props.actionFeedbackContext.displayWarning(
        this.translate("The pin code is empty and cannot be copied to clipboard."),
      );
    }
  }

  /**
   * Toggle preview pin code on button click.
   * @returns {Promise<void>}
   */
  async handleTogglePinCodeView() {
    let isPinCodePreviewed = !this.state.isPinCodePreviewed;
    let plaintextSecret = null;

    if (isPinCodePreviewed) {
      try {
        plaintextSecret = await this.decryptPinCode();
      } catch {
        // The user cancelled the passphrase dialog,, do not display an error or the pin code.
        plaintextSecret = "";
        isPinCodePreviewed = false;
      }
    }

    this.setState({ plaintextSecret, isPinCodePreviewed });

    if (isPinCodePreviewed) {
      await this.props.resourceWorkspaceContext.onResourcePreviewed();
    }
  }

  /**
   * Can the user preview the secret
   * @returns {boolean}
   */
  get canPreviewSecret() {
    return (
      this.props.context.siteSettings.canIUse("previewPassword") &&
      this.props.rbacContext.canIUseAction(uiActions.SECRETS_PREVIEW)
    );
  }

  /**
   * Can the user copy the secret
   * @returns {boolean}
   */
  get canCopySecret() {
    return this.props.rbacContext.canIUseAction(uiActions.SECRETS_COPY);
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
    const { open: isOpen, plaintextSecret, isPinCodePreviewed } = this.state;

    return (
      <div className="detailed-pin-code accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button className="no-border" type="button" onClick={this.handleTitleClick}>
              <span className="accordion-title">
                <Trans>Pin code</Trans>
              </span>
              {isOpen && <CaretDownSVG />}
              {!isOpen && <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {isOpen && (
          <div className="accordion-content">
            <div className="information-label">
              <span className="pin-code label">
                <Trans>Pin code</Trans>
              </span>
            </div>
            <div className="information-value">
              <div className="pin-code-value">
                <div
                  className={`secret secret-pin-code ${this.canPreviewSecret ? "secret-with-preview" : ""} ${isPinCodePreviewed ? "" : "secret-copy"}`}
                  title={isPinCodePreviewed ? plaintextSecret : this.translate("Click to copy")}
                >
                  <HiddenPassword
                    canClick={this.canCopySecret}
                    preview={plaintextSecret}
                    onClick={this.handlePinCodeCopyClick}
                    emptySecretSentence={<Trans>There is no pin code</Trans>}
                  />
                </div>
                {this.canPreviewSecret && (
                  <button
                    type="button"
                    onClick={this.handleTogglePinCodeView}
                    className="pin-code-view inline button-transparent"
                  >
                    {isPinCodePreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsPinCode.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  progressContext: PropTypes.any, // The progress context
  clipboardContext: PropTypes.object, // the clipboard service provider
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withClipboard(
    withRbac(
      withActionFeedback(withResourceWorkspace(withProgress(withTranslation("common")(DisplayResourceDetailsPinCode)))),
    ),
  ),
);
