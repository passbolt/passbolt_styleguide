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
 * @since         5.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import HiddenPassword from "../../../../shared/components/Password/HiddenPassword";
import { withRbac } from "../../../../shared/context/Rbac/RbacContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import { uiActions } from "../../../../shared/services/rbacs/uiActionEnumeration";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withClipboard } from "../../../contexts/Clipboard/ManagedClipboardServiceProvider";

/**
 * This component display the custom fields section of a resource
 */
class DisplayResourceDetailsCustomFields extends React.Component {
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
    const hasResourceChanged =
      previousResource?.id !== currentResource?.id || previousResource?.modified !== currentResource?.modified;

    if (hasResourceChanged) {
      this.setState({
        secrets: [],
        secretPreviewed: [],
      });
    }
  }

  /**
   * Get default state
   * @returns {object}
   */
  getDefaultState() {
    return {
      open: true,
      secrets: [],
      secretPreviewed: [],
      isSecretsDecrypting: false,
    };
  }

  /**
   * Bind callback methods to the component instance
   * @returns {void}
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handlePreviewSecretClickEvent = this.handlePreviewSecretClickEvent.bind(this);
    this.handleShowAllEvent = this.handleShowAllEvent.bind(this);
    this.handleCopySecretEvent = this.handleCopySecretEvent.bind(this);
    this.handleCopyKeyEvent = this.handleCopyKeyEvent.bind(this);
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Handle when the user clicks the accordion title to toggle open/closed state
   * @returns {void}
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({ open });
  }

  /**
   * Check if a secret is currently being previewed
   * @param {string} id - The ID of the secret to check
   * @returns {boolean} True if the secret is previewed or show all is active
   */
  isPreviewed(id) {
    return this.state.secretPreviewed.includes(id);
  }

  /**
   * Get the decrypted secret value for a given ID
   * @param {string} id - The ID of the secret to retrieve
   * @returns {string|number|boolean} The secret value or undefined if not found
   */
  getSecretValue(id) {
    const secretValue = this.state.secrets?.find((secret) => secret.id === id)?.secret_value;
    return secretValue || "";
  }

  /**
   * Handle preview secret button click event
   * @param {string} id - The ID of the secret to preview/hide
   * @returns {Promise<void>}
   * @todo Implement secret decryption logic in the next ticket
   */
  async handlePreviewSecretClickEvent(id) {
    const { secretPreviewed } = this.state;

    if (secretPreviewed.includes(id)) {
      const updatedSecretPreviewed = secretPreviewed.filter((secretId) => secretId !== id);
      const secrets = updatedSecretPreviewed.length === 0 ? [] : this.state.secrets;
      this.setState({ secretPreviewed: updatedSecretPreviewed, secrets: secrets });
    } else {
      const secrets = await this.decryptCustomFieldSecrets();
      await this.props.resourceWorkspaceContext.onResourcePreviewed();
      this.setState({ secrets, secretPreviewed: [...secretPreviewed, id] });
    }
  }

  /**
   * Asynchronously decrypts a custom fields secrets.
   * @returns {Promise<Array>}
   */
  async decryptCustomFieldSecrets() {
    const resourceId = this.resource.id;
    let customFieldsSecrets;

    if (this.state.secrets?.length === 0) {
      try {
        const plaintextSecretDto = await this.props.context.port.request(
          "passbolt.secret.find-by-resource-id",
          resourceId,
        );
        customFieldsSecrets = plaintextSecretDto?.custom_fields;
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          this.props.actionFeedbackContext.displayError(error.message);
        }
      }
    } else {
      //We have many secrets, the user can preview one by one
      customFieldsSecrets = this.state.secrets;
    }
    if (!customFieldsSecrets) {
      customFieldsSecrets = [];
    }

    return customFieldsSecrets;
  }

  /**
   * Handle show/hide all secrets button click event
   * @returns {Promise<void>}
   */
  async handleShowAllEvent() {
    if (!this.showAll) {
      this.setState({ isSecretsDecrypting: true });
      const secrets = await this.decryptCustomFieldSecrets();
      this.setState({ secrets, isSecretsDecrypting: false });
      const secretPreviewed = this.resource.metadata.custom_fields.map((customField) => customField.id);
      this.setState({ secretPreviewed });
    } else {
      this.setState({ secrets: [], secretPreviewed: [] });
    }
  }

  /**
   * Handles the copying of a secret to the clipboard.
   * @param {string} id - The ID of the secret to be copied.
   * @returns {Promise<void>}
   */
  async handleCopySecretEvent(id) {
    const secrets = await this.decryptCustomFieldSecrets();
    const secret = secrets.find((secret) => secret.id === id);

    if (!secret || secret.secret_value.length === 0) {
      await this.props.actionFeedbackContext.displayWarning(
        this.props.t("The custom field value is empty and cannot be copied to clipboard."),
      );
      return;
    }
    this.props.clipboardContext.copyTemporarily(
      secret.secret_value,
      this.props.t("The custom field value has been copied to clipboard."),
    );
    await this.props.resourceWorkspaceContext.onResourceCopied();
  }

  /**
   * Handles the event when a key is copied.
   * @param {string} key - The key to be copied.
   * @returns {Promise<void>} A promise that resolves when the key has been copied and feedback is displayed.
   */
  async handleCopyKeyEvent(key) {
    this.props.clipboardContext.copy(key, this.props.t("The custom field key has been copied to clipboard."));
    await this.props.resourceWorkspaceContext.onResourceCopied();
  }

  /**
   * Determines whether all custom fields are currently being previewed.
   * @returns {boolean}
   */
  get showAll() {
    return this.state.secretPreviewed.length === this.resource.metadata.custom_fields.length;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canCopySecret = this.props.rbacContext.canIUseAction(uiActions.SECRETS_COPY);
    const canPreviewSecret =
      this.props.context.siteSettings?.canIUse("previewPassword") &&
      this.props.rbacContext.canIUseAction(uiActions.SECRETS_PREVIEW);

    return (
      <div className="detailed-information accordion sidebar-section custom-fields">
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClickEvent} className="link no-border section-opener">
              <span className="accordion-title">
                <Trans>Custom fields</Trans>
              </span>
              {this.state.open && <CaretDownSVG />}
              {!this.state.open && <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {this.state.open && (
          <div className="accordion-content">
            <div className="fields">
              <div className="information-label">
                {this.resource.metadata.custom_fields.map((customField, index) =>
                  customField.metadata_key.length > 0 ? (
                    <span
                      key={index}
                      title={customField.metadata_key}
                      className={`${customField.metadata_key} label ${canCopySecret && "can-copy"}`}
                      onClick={() => canCopySecret && this.handleCopyKeyEvent(customField.metadata_key)}
                    >
                      {customField.metadata_key}
                    </span>
                  ) : (
                    <span key={index} className="label empty" title={"no key"}>
                      <Trans>no key</Trans>
                    </span>
                  ),
                )}
              </div>
              <div className="information-value">
                {this.resource.metadata.custom_fields.map((customField) => {
                  const isPreviewed = this.isPreviewed(customField.id);

                  return (
                    <span key={customField.id} className={`${customField.metadata_key} field-secret-value`}>
                      <div
                        className={`secret secret-custom-fields ${canPreviewSecret ? "secret-with-preview" : ""} ${isPreviewed ? "" : "secret-copy"}`}
                        title={isPreviewed ? this.getSecretValue(customField.id) : this.props.t("Click to copy")}
                      >
                        <HiddenPassword
                          canClick={canCopySecret}
                          isPassword={false}
                          preview={isPreviewed ? this.getSecretValue(customField.id) : ""}
                          onClick={() => this.handleCopySecretEvent(customField.id)}
                          emptySecretSentence={this.props.t("There is no value")}
                        />
                      </div>

                      {canPreviewSecret && (
                        <button
                          type="button"
                          onClick={() => this.handlePreviewSecretClickEvent(customField.id)}
                          className="password-view inline button-transparent"
                        >
                          {isPreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
            {!this.showAll && canPreviewSecret ? (
              <button
                className={`button ${this.state.isSecretsDecrypting ? "processing" : ""}`}
                disabled={this.state.isSecretsDecrypting}
                onClick={this.handleShowAllEvent}
                id="show-all-button"
              >
                <EyeOpenSVG />
                <Trans>Show all</Trans>
                {this.state.isSecretsDecrypting && <SpinnerSVG />}
              </button>
            ) : (
              <button type="button" onClick={this.handleShowAllEvent} id="hide-all-button">
                <EyeCloseSVG />
                <Trans>Hide all</Trans>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsCustomFields.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.any, // The resource
  actionFeedbackContext: PropTypes.any, // The action feedback context
  clipboardContext: PropTypes.object, // the clipboard service provide
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withActionFeedback(
    withResourceWorkspace(withRbac(withClipboard(withTranslation("common")(DisplayResourceDetailsCustomFields)))),
  ),
);
