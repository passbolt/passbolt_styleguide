import React from "react";
import Transition from 'react-transition-group/Transition';
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import Icon from "../../../shared/components/Icons/Icon";
import ClipBoard from '../../../shared/lib/Browser/clipBoard';
import {uiActions} from "../../../shared/services/rbacs/uiActionEnumeration";
import {withRbac} from "../../../shared/context/Rbac/RbacContext";
import HiddenPassword from "../../../shared/components/Password/HiddenPassword";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import Totp from "../../../shared/components/Totp/Totp";
import {TotpCodeGeneratorService} from "../../../shared/services/otp/TotpCodeGeneratorService";

/**
 * Default display time of error message in ms.
 * @type {number}
 */
const DEFAULT_ERROR_DISPLAY_TIME_IN_MS = 5000;

class ResourceViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
    this.loadResource();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleCopyLoginClick = this.handleCopyLoginClick.bind(this);
    this.handleCopyPasswordClick = this.handleCopyPasswordClick.bind(this);
    this.handleGoToUrlClick = this.handleGoToUrlClick.bind(this);
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
    this.handleCopyTotpClick = this.handleCopyTotpClick.bind(this);
    this.handlePreviewTotpButtonClick = this.handlePreviewTotpButtonClick.bind(this);
  }

  initState() {
    return {
      resource: {},
      passphrase: "",
      usingOnThisTab: false,
      copyPasswordState: "default",
      copyLoginState: "default",
      copyTotpState: "default",
      error: "",
      errorTimeout: null,
      previewedSecret: null, // The type of previewed secret
      plaintextSecretDto: null, // The current resource password decrypted
      isPasswordDecrypting: false, // if the password is decrypting
      isTotpDecrypting: false // if the totp is decrypting
    };
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  handleGoBackClick(ev) {
    ev.preventDefault();

    // Additional variables were passed via the history.push state option.
    if (this.props.location.state) {
      /*
       * A specific number of entries to go back to was given in parameter.
       * It happens when the user comes from the create resource page by instance.
       */
      if (this.props.location.state.goBackEntriesCount) {
        this.props.history.go(this.props.location.state.goBackEntriesCount);
        return;
      }
    }

    this.props.history.goBack();
  }

  async loadResource() {
    const storageData = await this.props.context.storage.local.get(["resources"]);
    const resource = storageData.resources.find(item => item.id === this.props.match.params.id);
    this.setState({resource});
  }

  resetError() {
    this.setState({error: ""});
  }

  async handleCopyLoginClick(event) {
    event.preventDefault();
    this.resetError();
    if (!this.state.resource.username) {
      return;
    }

    try {
      this.setState({copyLoginState: 'processing'});
      await ClipBoard.copy(this.state.resource.username, this.props.context.port);
      this.setState({copyLoginState: 'done'});
      setTimeout(() => {
        this.setState({copyLoginState: 'default'});
      }, 15000);
    } catch (error) {
      console.error('An unexpected error occured', error);
    }
  }

  /**
   * Handle copy password click.
   */
  async handleCopyPasswordClick() {
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
    const isPasswordPreviewed = this.isPasswordPreviewed();
    let plaintextSecretDto;

    this.resetError();
    this.setState({copyPasswordState: 'processing'});

    if (isPasswordPreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      try {
        plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          return;
        }
      } finally {
        this.setState({copyPasswordState: 'default'});
      }
    }

    if (!plaintextSecretDto) {
      this.setState({copyPasswordState: 'default'});
      return;
    }

    if (!plaintextSecretDto.password?.length) {
      this.displayTemporarilyError(this.translate("The password is empty and cannot be copied to clipboard."));
      this.setState({copyPasswordState: 'default'});
      return;
    }

    await ClipBoard.copy(plaintextSecretDto.password, this.props.context.port);
    this.setState({copyPasswordState: 'done'});
    setTimeout(() => {
      this.setState({copyPasswordState: 'default'});
    }, 15000);
  }

  /**
   * Toggle preview password
   * @returns {Promise<void>}
   */
  async togglePreviewPassword() {
    const isPasswordPreviewed = this.isPasswordPreviewed();
    this.hidePreviewedSecret();
    if (!isPasswordPreviewed) {
      await this.previewPassword();
    }
  }

  /**
   * Hide the previewed resource secret.
   */
  hidePreviewedSecret() {
    this.setState({plaintextSecretDto: null, previewedSecret: null});
  }

  /**
   * Preview password
   * @returns {Promise<void>}
   */
  async previewPassword() {
    const previewedSecret = "password";
    let plaintextSecretDto;
    await this.setState({error: "", isPasswordDecrypting: true});

    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        return;
      }
    } finally {
      this.setState({isPasswordDecrypting: false});
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.password?.length) {
      this.displayTemporarilyError(this.translate("The password is empty and cannot be previewed."));
      return;
    }

    await this.setState({plaintextSecretDto, previewedSecret});
  }

  /**
   * Display error temporarily.
   * @param {string} error The error message
   * @param {number} time The time to persist the error.
   */
  displayTemporarilyError(error, time = DEFAULT_ERROR_DISPLAY_TIME_IN_MS) {
    clearTimeout(this.state.errorTimeout);
    const errorTimeout = setTimeout(() => this.setState({error: ""}), time);
    this.setState({errorTimeout, error});
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.props.context.port.request("passbolt.secret.decrypt", resourceId);
  }

  /**
   * Handle copy totp
   * @return {Promise<void>}
   */
  async handleCopyTotpClick() {
    let plaintextSecretDto;
    const isTotpPreviewed = this.isTotpPreviewed();

    this.resetError();
    this.setState({copyTotpState: 'processing'});

    if (isTotpPreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      try {
        plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          return;
        }
      } finally {
        this.setState({copyTotpState: 'default'});
      }
    }

    if (!plaintextSecretDto) {
      this.setState({copyTotpState: 'default'});
      return;
    }

    if (!plaintextSecretDto.totp) {
      this.displayTemporarilyError(this.translate("The totp is empty and cannot be copied to clipboard."));
      this.setState({copyTotpState: 'default'});
      return;
    }

    const code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    await ClipBoard.copy(code, this.props.context.port);
    this.setState({copyTotpState: 'done'});
    setTimeout(() => {
      this.setState({copyTotpState: 'default'});
    }, 15000);
  }

  /**
   * Handle preview totp button click.
   */
  async handlePreviewTotpButtonClick() {
    const isTotpPreviewed = this.isTotpPreviewed();
    this.hidePreviewedSecret();
    if (!isTotpPreviewed) {
      await this.previewTotp();
    }
  }

  /**
   * Preview totp
   * @returns {Promise<void>}
   */
  async previewTotp() {
    const previewedSecret = "totp";
    let plaintextSecretDto;

    await this.setState({error: "", isTotpDecrypting: true});

    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        return;
      }
    } finally {
      this.setState({isTotpDecrypting: false});
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      this.displayTemporarilyError(this.translate("The totp is empty and cannot be previewed."));
      return;
    }

    this.setState({plaintextSecretDto, previewedSecret});
  }

  handleGoToUrlClick(event) {
    this.resetError();
    if (!this.sanitizeResourceUrl()) {
      event.preventDefault();
    }
  }

  async handleUseOnThisTabClick(event) {
    event.preventDefault();
    this.setState({usingOnThisTab: true});
    try {
      await this.props.context.port.request('passbolt.quickaccess.use-resource-on-current-tab', this.state.resource.id, this.props.context.getOpenerTabId());
      window.close();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({usingOnThisTab: false});
      } else {
        console.error('An error occured', error);
        this.setState({
          usingOnThisTab: false,
          error: this.props.t("Unable to use the password on this page. Copy and paste the information instead.")
        });
      }
    }
  }

  sanitizeResourceUrl() {
    const resource = this.state.resource;
    let uri = resource.uri;

    // Wrong format.
    if (!uri || typeof uri !== "string" || !uri.length) {
      return false;
    }

    // Absolute url are not valid url.
    if (uri[0] === "/") {
      return false;
    }

    // If no protocol defined, use http.
    if (!/^((?!:\/\/).)*:\/\//.test(uri)) {
      uri = `http://${uri}`;
    }

    let url;
    try {
      url = new URL(uri);
    } catch (error) {
      return false;
    }
    if (!url || url.protocol.startsWith("javascript")) {
      return false;
    }
    return url.href;
  }

  /**
   * Check if the password is previewed
   * @returns {boolean}
   */
  isPasswordPreviewed() {
    return this.state.previewedSecret === 'password';
  }

  /**
   * Check if the totp is previewed
   * @returns {boolean}
   */
  isTotpPreviewed() {
    return this.state.previewedSecret === 'totp';
  }

  /**
   * Returns true if the logged in user can use the preview password capability.
   * @returns {boolean}
   */
  get canPreviewSecret() {
    return this.props.context.siteSettings.canIUse('previewPassword') && this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_PREVIEW);
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isTotpResources() {
    return this.props.context.resourceTypesSettings?.assertResourceTypeIdHasTotp(this.state.resource.resource_type_id);
  }

  /**
   * Is standalone TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return this.props.context.resourceTypesSettings?.assertResourceTypeIdIsStandaloneTotp(this.state.resource.resource_type_id);
  }

  render() {
    const sanitizeResourceUrl = this.sanitizeResourceUrl();
    const isPasswordPreviewed = this.isPasswordPreviewed();
    const isTotpPreviewed = this.isTotpPreviewed();
    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);

    return (
      <div className="resource item-browse">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title">{this.state.resource.name}</span>
          </a>
          <a href={`${this.props.context.userSettings.getTrustedDomain()}/app/passwords/view/${this.props.match.params.id}`} className="secondary-action button-transparent button" target="_blank" rel="noopener noreferrer" title={this.translate("View it in passbolt")}>
            <Icon name="internal-link"/>
            <span className="visually-hidden"><Trans>Edit in passbolt</Trans></span>
          </a>
        </div>
        <ul className="properties">
          {!this.isStandaloneTotpResource &&
            <>
              <li className="property">
                <div className="information">
                  <span className="property-name"><Trans>Username</Trans></span>
                  {this.state.resource.username &&
                    <a href="#" role="button" className="property-value" onClick={this.handleCopyLoginClick}>
                      {this.state.resource.username}
                    </a>
                  }
                  {!this.state.resource.username &&
                    <span className="property-value empty">
                      <Trans>no username provided</Trans>
                    </span>
                  }
                </div>
                <a role="button" className={`button button-transparent property-action ${!this.state.resource.username ? "disabled" : ""}`} onClick={this.handleCopyLoginClick} title={this.translate("Copy to clipboard")}>
                  <Transition in={this.state.copyLoginState === "default"} appear={false} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copyLoginState !== "default" ? "visually-hidden" : ""}`}>
                        <Icon name="copy-to-clipboard"/>
                      </span>
                    )}
                  </Transition>
                  <Transition in={this.state.copyLoginState === "processing"} appear={true} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copyLoginState !== "processing" ? "visually-hidden" : ""}`}>
                        <Icon name="spinner"/>
                      </span>
                    )}
                  </Transition>
                  <Transition in={this.state.copyLoginState === "done"} appear={true} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copyLoginState !== "done" ? "visually-hidden" : ""}`}>
                        <Icon name="check"/>
                      </span>
                    )}
                  </Transition>
                  <span className="visually-hidden"><Trans>Copy to clipboard</Trans></span>
                </a>
              </li>
              <li className="property">
                <div className="information">
                  <span className="property-name"><Trans>Password</Trans></span>
                  <div className="password-wrapper">
                    <div className={`property-value secret secret-password ${isPasswordPreviewed ? "" : "secret-copy"}`}
                      title={isPasswordPreviewed ? this.state.plaintextSecretDto?.password : "secret"}>
                      <HiddenPassword
                        canClick={canCopySecret}
                        preview={this.state.plaintextSecretDto?.password}
                        onClick={this.handleCopyPasswordClick} />
                    </div>
                    {this.canPreviewSecret &&
                      <a onClick={this.handleViewPasswordButtonClick}
                        className={`password-view button button-transparent ${this.state.isPasswordDecrypting ? "disabled" : ""}`}>
                        <Transition in={!this.state.isPasswordDecrypting} appear={false} timeout={500}>
                          {status => (
                            <span className={`transition fade-${status} ${this.state.isPasswordDecrypting ? "visually-hidden" : ""}`}>
                              <Icon name={isPasswordPreviewed ? "eye-close" : "eye-open"}/>
                            </span>
                          )}
                        </Transition>
                        <Transition in={this.state.isPasswordDecrypting} appear={true} timeout={500}>
                          {status => (
                            <span className={`transition fade-${status} ${!this.state.isPasswordDecrypting ? "visually-hidden" : ""}`}>
                              <Icon name="spinner"/>
                            </span>
                          )}
                        </Transition>
                        <span className="visually-hidden"><Trans>View</Trans></span>
                      </a>
                    }
                  </div>
                </div>
                {canCopySecret &&
                  <a role="button" className="button button-transparent property-action copy-password" onClick={this.handleCopyPasswordClick} title={this.translate("Copy to clipboard")}>
                    <Transition in={this.state.copyPasswordState === "default"} appear={false} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.copyPasswordState !== "default" ? "visually-hidden" : ""}`}>
                          <Icon name="copy-to-clipboard"/>
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.copyPasswordState === "processing"} appear={true} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.copyPasswordState !== "processing" ? "visually-hidden" : ""}`}>
                          <Icon name="spinner"/>
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.copyPasswordState === "done"} appear={true} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.copyPasswordState !== "done" ? "visually-hidden" : ""}`}>
                          <Icon name="check"/>
                        </span>
                      )}
                    </Transition>
                    <span className="visually-hidden"><Trans>Copy to clipboard</Trans></span>
                  </a>
                }
              </li>
            </>
          }
          {this.isTotpResources &&
            <li className="property">
              <div className="information">
                <span className="property-name"><Trans>TOTP</Trans></span>
                <div className="totp-wrapper">
                  <div className={`property-value secret secret-totp ${isTotpPreviewed ? "" : "secret-copy"}`}>
                    {isTotpPreviewed &&
                      <Totp
                        totp={this.state.plaintextSecretDto?.totp}
                        canClick={canCopySecret}
                        onClick={this.handleCopyTotpClick}/>
                    }
                    {!isTotpPreviewed &&
                      <button type="button" className="link no-border" onClick={this.handleCopyTotpClick} disabled={!canCopySecret}>
                        <span>Copy TOTP to clipboard</span>
                      </button>
                    }
                  </div>
                  {this.canPreviewSecret &&
                    <a onClick={this.handlePreviewTotpButtonClick}
                      className={`totp-view button button-transparent ${this.state.isTotpDecrypting ? "disabled" : ""}`}>
                      <Transition in={!this.state.isTotpDecrypting} appear={false} timeout={500}>
                        {status => (
                          <span className={`transition fade-${status} ${this.state.isTotpDecrypting ? "visually-hidden" : ""}`}>
                            <Icon name={isTotpPreviewed ? "eye-close" : "eye-open"}/>
                          </span>
                        )}
                      </Transition>
                      <Transition in={this.state.isTotpDecrypting} appear={true} timeout={500}>
                        {status => (
                          <span className={`transition fade-${status} ${!this.state.isTotpDecrypting ? "visually-hidden" : ""}`}>
                            <Icon name="spinner"/>
                          </span>
                        )}
                      </Transition>
                      <span className="visually-hidden"><Trans>View</Trans></span>
                    </a>
                  }
                </div>
              </div>
              {canCopySecret &&
                <a role="button" className="button button-transparent property-action copy-totp" onClick={this.handleCopyTotpClick} title={this.translate("Copy to clipboard")}>
                  <Transition in={this.state.copyTotpState === "default"} appear={false} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copyTotpState !== "default" ? "visually-hidden" : ""}`}>
                        <Icon name="copy-to-clipboard"/>
                      </span>
                    )}
                  </Transition>
                  <Transition in={this.state.copyTotpState === "processing"} appear={true} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copyTotpState !== "processing" ? "visually-hidden" : ""}`}>
                        <Icon name="spinner"/>
                      </span>
                    )}
                  </Transition>
                  <Transition in={this.state.copyTotpState === "done"} appear={true} timeout={500}>
                    {status => (
                      <span className={`transition fade-${status} ${this.state.copyTotpState !== "done" ? "visually-hidden" : ""}`}>
                        <Icon name="check"/>
                      </span>
                    )}
                  </Transition>
                  <span className="visually-hidden"><Trans>Copy to clipboard</Trans></span>
                </a>
              }
            </li>
          }
          <li className="property">
            <div className="information">
              <span className="property-name">URI</span>
              {this.state.resource.uri && sanitizeResourceUrl &&
                <a href={this.sanitizeResourceUrl()} role="button" className="property-value" target="_blank" rel="noopener noreferrer">
                  {this.state.resource.uri}
                </a>
              }
              {this.state.resource.uri && !sanitizeResourceUrl &&
                <span className="property-value">
                  {this.state.resource.uri}
                </span>
              }
              {!this.state.resource.uri &&
                <span className="property-value empty">
                  <Trans>no url provided</Trans>
                </span>
              }
            </div>
            <a href={`${sanitizeResourceUrl ? sanitizeResourceUrl : "#"}`} role="button" className={`button button-transparent property-action ${!sanitizeResourceUrl ? "disabled" : ""}`}
              onClick={this.handleGoToUrlClick} target="_blank" rel="noopener noreferrer" title={this.translate("open in a new tab")}>
              <Icon name="external-link"/>
              <span className="visually-hidden"><Trans>Open in new window</Trans></span>
            </a>
          </li>
        </ul>
        <div className="submit-wrapper input">
          <a href="#" id="popupAction" className={`button primary big full-width ${this.state.usingOnThisTab ? "disabled" : ""}`} role="button" onClick={this.handleUseOnThisTabClick}>
            {this.state.usingOnThisTab &&
              <Icon name="spinner"/>
            }
            {!this.state.usingOnThisTab &&
              <Trans>use on this page</Trans>
            }
          </a>
          {this.state.error &&
            <div className="error-message">{this.state.error}</div>
          }
        </div>
      </div>
    );
  }
}

ResourceViewPage.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withRouter(withTranslation('common')(ResourceViewPage))));
