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
 * @since         5.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {
  resourceLinkAuthorizedProtocols,
  withResourceWorkspace
} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import sanitizeUrl, {urlProtocols} from "../../../lib/Sanitize/sanitizeUrl";
import {Trans, withTranslation} from "react-i18next";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withProgress} from "../../../contexts/ProgressContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import Totp from "../../../../shared/components/Totp/Totp";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import DisplayResourceUrisBadge from "../../Resource/DisplayResourceUrisBadge/DisplayResourceUrisBadge";

class DisplayResourceDetailsTotp extends React.Component {
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
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true,
      isSecretPreviewed: null, // The is secret previewed boolean property
      plaintextSecret: null, // The current resource totp decrypted
    };
  }

  /**
   * componentDidUpdate React hook
   * Invoked immediately after props are updated.
   * Checks if the resource has been changed or updated and if yes, reset the secret preview state.
   */
  componentDidUpdate(prevProps) {
    const previousResource = prevProps.resourceWorkspaceContext?.details?.resource;
    const currentResource = this.props.resourceWorkspaceContext?.details?.resource;
    const hasResourceChanged = previousResource?.id !== currentResource?.id
      || previousResource?.modified !== currentResource?.modified;

    if (hasResourceChanged) {
      this.setState({
        isSecretPreviewed: null,
        plaintextSecret: null
      });
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleTotpClickEvent = this.handleTotpClickEvent.bind(this);
    this.handleViewTotpButtonClick = this.handleViewTotpButtonClick.bind(this);
    this.handleGoToResourceUriClick = this.handleGoToResourceUriClick.bind(this);
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * the resource safe uri
   * @return {string}
   */
  get safeUri() {
    return sanitizeUrl(
      this.mainUri, {
        whiteListedProtocols: resourceLinkAuthorizedProtocols,
        defaultProtocol: urlProtocols.HTTPS
      });
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});

    if (!open) {
      this.setState({plaintextSecret: null, isSecretPreviewed: false});
    }
  }

  /**
   * Handle copy totp click.
   */
  async handleTotpClickEvent() {
    await this.copyTotpToClipboard();
  }

  /**
   * Handle preview totp button click.
   */
  async handleViewTotpButtonClick() {
    await this.togglePreviewTotp();
  }

  /**
   * Copy the resource totp to clipboard.
   * @returns {Promise<void>}
   */
  async copyTotpToClipboard() {
    const resourceId = this.resource.id;
    const isTotpPreviewed = this.state.isSecretPreviewed;
    let plaintextSecret, code;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    if (isTotpPreviewed) {
      plaintextSecret = this.state.plaintextSecret;
    } else {
      try {
        const plaintextSecretDto = await this.decryptResourceSecret(resourceId);
        plaintextSecret = plaintextSecretDto?.totp;
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecret) {
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be copied to clipboard."));
      return;
    }

    try {
      code = TotpCodeGeneratorService.generate(plaintextSecret);
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to copy the TOTP"));
      return;
    }

    await ClipBoard.copy(code, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The TOTP has been copied to clipboard"));
  }

  /**
   * Toggle preview password
   * @returns {Promise<void>}
   */
  async togglePreviewTotp() {
    const isTotpPreviewed = this.state.isSecretPreviewed;
    this.hidePreviewedSecret();
    if (!isTotpPreviewed) {
      await this.previewTotp();
      await this.props.resourceWorkspaceContext.onResourcePreviewed();
    }
  }

  /**
   * Hide the previewed resource secret.
   */
  hidePreviewedSecret() {
    this.setState({plaintextSecret: null, isSecretPreviewed: false});
  }

  /**
   * Preview totp
   * @returns {Promise<void>}
   */
  async previewTotp() {
    const resourceId = this.resource.id;
    const isSecretPreviewed = true;
    let plaintextSecret;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    try {
      const plaintextSecretDto = await this.decryptResourceSecret(resourceId);
      plaintextSecret = plaintextSecretDto?.totp;
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecret) {
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be previewed."));
      return;
    }

    this.setState({plaintextSecret, isSecretPreviewed});
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The plaintext secret DTO
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", resourceId);
  }

  /**
   * Whenever the user wants to follow a resource uri.
   */
  handleGoToResourceUriClick() {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.resource.metadata.uris[0]);
  }

  /**
   * Get the main uri
   * @return {string}
   */
  get mainUri() {
    return this.resource.metadata.uris?.[0];
  }

  /**
   * Get the additional uris
   * @return {Array<string>}
   */
  get additionalUris() {
    return this.resource.metadata.uris?.slice(1);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canPreviewSecret = this.props.context.siteSettings.canIUse("previewPassword")
      && this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_PREVIEW);
    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);
    const isTotpPreviewed = this.state.isSecretPreviewed;
    const isStandaloneTotp = this.props.isStandaloneTotp;

    return (
      <div className="detailed-totp accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button className="no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span className="accordion-title">
                <Trans>TOTP</Trans>
              </span>
              {this.state.open &&
              <CaretDownSVG/>
              }
              {!this.state.open &&
              <CaretRightSVG/>
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
          <div className="accordion-content">
            <div className="information-label">
              <span className="totp label"><Trans>TOTP</Trans></span>
              {isStandaloneTotp &&
                <span className="uri label"><Trans>URI</Trans></span>
              }
            </div>
            <div className="information-value">
              <div className="totp-value">
                <div className={`secret secret-totp ${canPreviewSecret ? "secret-with-preview" : ""} ${isTotpPreviewed ? "" : "secret-copy"}`}
                  title={isTotpPreviewed ? this.state.plaintextSecret : this.translate("Click to copy")}>
                  {isTotpPreviewed &&
                    <Totp
                      totp={this.state.plaintextSecret}
                      canClick={canCopySecret}
                      onClick={this.handleTotpClickEvent}/>
                  }
                  {!isTotpPreviewed &&
                    <button type="button" className="no-border" onClick={this.handleTotpClickEvent} disabled={!canCopySecret}>
                      <span>Copy TOTP to clipboard</span>
                    </button>
                  }
                </div>
                {canPreviewSecret &&
                  <button type="button" onClick={this.handleViewTotpButtonClick}
                    className="totp-view inline button-transparent">
                    {isTotpPreviewed ? <EyeCloseSVG/> : <EyeOpenSVG/>}
                  </button>
                }
              </div>
              {isStandaloneTotp &&
                <span className="uri value">
                  {this.safeUri &&
                    <button type="button" className="link no-border" onClick={this.handleGoToResourceUriClick}>
                      <span>{this.mainUri}</span></button>}
                  {!this.safeUri && <span>{this.mainUri}</span>}
                  {this.additionalUris?.length > 0 &&
                    <DisplayResourceUrisBadge additionalUris={this.additionalUris}/>
                  }
                </span>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

DisplayResourceDetailsTotp.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.object,
  isStandaloneTotp: PropTypes.bool, // The resource types is standalone totp
  actionFeedbackContext: PropTypes.any, // The action feedback context
  progressContext: PropTypes.any, // The progress context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withActionFeedback(withResourceWorkspace(withProgress(withTranslation('common')(DisplayResourceDetailsTotp))))));
