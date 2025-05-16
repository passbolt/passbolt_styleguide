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
import HiddenPassword from "../../../../shared/components/Password/HiddenPassword";
import {withProgress} from "../../../contexts/ProgressContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import DisplayResourceUrisBadge from "../../Resource/DisplayResourceUrisBadge/DisplayResourceUrisBadge";

class DisplayResourceDetailsPassword extends React.Component {
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
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true,
      isSecretPreviewed: null, // The is secret previewed boolean property
      plaintextSecret: null, // The current resource password decrypted
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleUsernameClickEvent = this.handleUsernameClickEvent.bind(this);
    this.handlePasswordClickEvent = this.handlePasswordClickEvent.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
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
   * Handle when the user select the username of the resource
   */
  async handleUsernameClickEvent() {
    await ClipBoard.copy(this.resource.metadata.username, this.props.context.port);
    this.displaySuccessNotification(this.translate("The username has been copied to clipboard"));
  }

  /**
   * Handle copy password click.
   */
  async handlePasswordClickEvent() {
    await this.copyPasswordToClipboard();
  }

  /**
   * Handle preview password button click.
   */
  async handleViewPasswordButtonClick() {
    await this.togglePreviewPassword();
  }

  /**
   * Copy the resource password to clipboard.
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard() {
    const resourceId = this.resource.id;
    const isPasswordPreviewed = this.state.isSecretPreviewed;
    let plaintextSecret;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    if (isPasswordPreviewed) {
      plaintextSecret = this.state.plaintextSecret;
    } else {
      try {
        const plaintextSecretDto = await this.decryptResourceSecret(resourceId);
        plaintextSecret = plaintextSecretDto?.password;
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecret?.length) {
      await this.props.actionFeedbackContext.displayWarning(this.translate("The password is empty and cannot be copied to clipboard."));
      return;
    }

    await ClipBoard.copy(plaintextSecret, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The secret has been copied to clipboard"));
  }

  /**
   * Toggle preview password
   * @returns {Promise<void>}
   */
  async togglePreviewPassword() {
    const isPasswordPreviewed = this.state.isSecretPreviewed;
    this.hidePreviewedSecret();
    if (!isPasswordPreviewed) {
      await this.previewPassword();
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
   * Preview password
   * @returns {Promise<void>}
   */
  async previewPassword() {
    const resourceId = this.resource.id;
    const isSecretPreviewed = true;
    let plaintextSecret;

    this.props.progressContext.open(this.props.t('Decrypting secret'));

    try {
      const plaintextSecretDto = await this.decryptResourceSecret(resourceId);
      plaintextSecret = plaintextSecretDto?.password;
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }

    this.props.progressContext.close();

    if (!plaintextSecret?.length) {
      plaintextSecret = "";
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
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(this.mainUri);
  }

  /**
   * display a success notification message
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
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
    const isPasswordPreviewed = this.state.isSecretPreviewed;

    return (
      <div className="detailed-password accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button className="no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span className="accordion-title">
                <Trans>Password</Trans>
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
              <span className="username label"><Trans>Username</Trans></span>
              <span className="password label"><Trans>Password</Trans></span>
              <span className="uri label"><Trans>URI</Trans></span>
            </div>
            <div className="information-value">
              <span className="username value"><button type="button" className="no-border" onClick={this.handleUsernameClickEvent}><span>{this.resource.metadata.username}</span></button></span>
              <div className="password-value">
                <div className={`secret secret-password ${canPreviewSecret ? "secret-with-preview" : ""} ${isPasswordPreviewed ? "" : "secret-copy"}`}
                  title={isPasswordPreviewed ? this.state.plaintextSecret : "secret"}>
                  <HiddenPassword
                    canClick={canCopySecret}
                    preview={this.state.plaintextSecret}
                    onClick={this.handlePasswordClickEvent}/>
                </div>
                {canPreviewSecret &&
                  <button type="button" onClick={this.handleViewPasswordButtonClick}
                    className="password-view inline button-transparent">
                    {isPasswordPreviewed ? <EyeCloseSVG/> : <EyeOpenSVG/>}
                  </button>
                }
              </div>
              <span className="uri value">
                {this.safeUri &&
                  <button type="button" className="link no-border" onClick={this.handleGoToResourceUriClick}>
                    <span>{this.mainUri}</span></button>}
                {!this.safeUri && <span>{this.mainUri}</span>}
                {this.additionalUris?.length > 0 &&
                  <DisplayResourceUrisBadge additionalUris={this.additionalUris}/>
                }
              </span>
            </div>
          </div>
        }
      </div>
    );
  }
}

DisplayResourceDetailsPassword.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  progressContext: PropTypes.any, // The progress context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withActionFeedback(withResourceWorkspace(withProgress(withTranslation('common')(DisplayResourceDetailsPassword))))));
