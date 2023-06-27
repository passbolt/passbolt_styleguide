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
  }

  initState() {
    return {
      resource: {},
      passphrase: "",
      usingOnThisTab: false,
      copySecretState: "default",
      copyLoginState: "default",
      useOnThisTabError: "",
      previewedPassword: null,
      isSecretDecrypting: false // if the secret is decrypting
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
    this.setState({useOnThisTabError: ""});
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
    let password;

    this.resetError();
    this.setState({copySecretState: 'processing'});

    if (isPasswordPreviewed) {
      password = this.state.previewedPassword;
    } else {
      try {
        const plaintext = await this.decryptResourceSecret(this.state.resource.id);
        password = this.extractPlaintextPassword(plaintext);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.setState({copySecretState: 'default'});
          return;
        }
      }
    }

    await ClipBoard.copy(password, this.props.context.port);
    this.setState({copySecretState: 'done'});
    setTimeout(() => {
      this.setState({copySecretState: 'default'});
    }, 15000);
  }

  /**
   * Toggle preview password
   * @returns {Promise<void>}
   */
  async togglePreviewPassword() {
    const isPasswordPreviewed = this.isPasswordPreviewed();
    if (isPasswordPreviewed) {
      this.hidePreviewedPassword();
    } else {
      await this.previewPassword();
    }
  }

  /**
   * Hide the previewed resource password.
   */
  hidePreviewedPassword() {
    this.setState({previewedPassword: null});
  }

  /**
   * Preview password
   * @returns {Promise<void>}
   */
  async previewPassword() {
    const resourceId = this.state.resource.id;
    let previewedPassword;

    await this.setState({isSecretDecrypting: true});

    try {
      const plaintext = await this.decryptResourceSecret(resourceId);
      previewedPassword = this.extractPlaintextPassword(plaintext);
      this.setState({previewedPassword, isSecretDecrypting: false});
    } catch (error) {
      await this.setState({isSecretDecrypting: false});
      if (error.name !== "UserAbortsOperationError") {
        throw error;
      }
    }
  }

  /**
   * Get the password property from a secret plaintext object.
   * @param {string|object} plaintextDto The secret plaintext
   * @returns {string}
   */
  extractPlaintextPassword(plaintextDto) {
    if (!plaintextDto) {
      throw new TypeError('The secret plaintext is empty.');
    }
    if (typeof plaintextDto === 'string') {
      return plaintextDto;
    }
    if (typeof plaintextDto !== 'object') {
      throw new TypeError('The secret plaintext must be a string or an object.');
    }
    if (!Object.prototype.hasOwnProperty.call(plaintextDto, 'password')) {
      throw new TypeError('The secret plaintext must have a password property.');
    }
    return plaintextDto.password;
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.props.context.port.request("passbolt.secret.decrypt", resourceId, {showProgress: true});
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
      await this.props.context.port.request('passbolt.quickaccess.use-resource-on-current-tab', this.state.resource.id, this.props.context.tabId);
      window.close();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({usingOnThisTab: false});
      } else {
        console.error('An error occured', error);
        this.setState({
          usingOnThisTab: false,
          useOnThisTabError: this.props.t("Unable to use the password on this page. Copy and paste the information instead.")
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
    return this.state.previewedPassword !== null;
  }

  /**
   * Returns true if the logged in user can use the preview password capability.
   * @returns {boolean}
   */
  get canUsePreviewPassword() {
    return this.props.context.siteSettings.canIUse('previewPassword') && this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_PREVIEW);
  }

  render() {
    const sanitizeResourceUrl = this.sanitizeResourceUrl();
    const isPasswordPreviewed = this.isPasswordPreviewed();
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
              <span className="property-name">Password</span>
              <div className="password-wrapper">
                <div className={`property-value secret ${isPasswordPreviewed ? "" : "secret-copy"}`}
                  title={isPasswordPreviewed ? this.state.previewedPassword : "secret"}>
                  <HiddenPassword
                    canClick={canCopySecret}
                    preview={this.state.previewedPassword}
                    onClick={this.handleCopyPasswordClick} />
                </div>
                {this.canUsePreviewPassword &&
                  <a onClick={this.handleViewPasswordButtonClick}
                    className={`password-view button button-transparent ${this.state.isSecretDecrypting ? "disabled" : ""}`}>
                    <Transition in={!this.state.isSecretDecrypting} appear={false} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${this.state.isSecretDecrypting ? "visually-hidden" : ""}`}>
                          <Icon name={isPasswordPreviewed ? "eye-close" : "eye-open"}/>
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.isSecretDecrypting} appear={true} timeout={500}>
                      {status => (
                        <span className={`transition fade-${status} ${!this.state.isSecretDecrypting ? "visually-hidden" : ""}`}>
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
                <Transition in={this.state.copySecretState === "default"} appear={false} timeout={500}>
                  {status => (
                    <span className={`transition fade-${status} ${this.state.copySecretState !== "default" ? "visually-hidden" : ""}`}>
                      <Icon name="copy-to-clipboard"/>
                    </span>
                  )}
                </Transition>
                <Transition in={this.state.copySecretState === "processing"} appear={true} timeout={500}>
                  {status => (
                    <span className={`transition fade-${status} ${this.state.copySecretState !== "processing" ? "visually-hidden" : ""}`}>
                      <Icon name="spinner"/>
                    </span>
                  )}
                </Transition>
                <Transition in={this.state.copySecretState === "done"} appear={true} timeout={500}>
                  {status => (
                    <span className={`transition fade-${status} ${this.state.copySecretState !== "done" ? "visually-hidden" : ""}`}>
                      <Icon name="check"/>
                    </span>
                  )}
                </Transition>
                <span className="visually-hidden"><Trans>Copy to clipboard</Trans></span>
              </a>
            }
          </li>
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
          {this.state.useOnThisTabError &&
          <div className="error-message">{this.state.useOnThisTabError}</div>
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
