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
import Password from "../../../shared/components/Password/Password";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withPasswordExpiry } from "../../../react-extension/contexts/PasswordExpirySettingsContext";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceEditService, {
  USER_CANCELLATION_ERRORS,
} from "../../../shared/services/resourceEdit/resourceEditService";
import CanSuggestService from "../../../shared/services/canSuggestService/canSuggestService";
import RecipientsConfirmation from "../ResourceEditPage/RecipientsConfirmation";

/**
 * Find the resources that could be updated with credentials submitted on a web page.
 * A resource is a candidate when the user can update it, it has a password, one of its URIs matches the page and,
 * if a username was submitted, its username matches.
 * @param {Array<object>} resources The resources from the local storage
 * @param {ResourceTypesCollection} resourceTypes The resource types
 * @param {{uri: string, username: string}} credentials The submitted credentials
 * @returns {Array<object>}
 */
export function findUpdateCandidates(resources, resourceTypes, { uri, username }) {
  if (!uri || !Array.isArray(resources)) {
    return [];
  }
  const normalizedUsername = (username || "").trim().toLowerCase();
  return resources.filter((resource) => {
    if (!ResourceEditService.canUpdate(resource)) {
      return false;
    }
    if (!resourceTypes?.getFirstById(resource.resource_type_id)?.hasPassword()) {
      return false;
    }
    if (!CanSuggestService.canSuggestUris(uri, resource.metadata?.uris || [])) {
      return false;
    }
    const resourceUsername = (resource.metadata?.username || "").trim().toLowerCase();
    return !normalizedUsername || !resourceUsername || resourceUsername === normalizedUsername;
  });
}

/**
 * Offer to update an existing resource with a password changed on a website.
 */
class UpdateResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedResourceId: props.candidates[0]?.id || null,
      password: props.password || "",
      processing: false,
      unexpectedErrorMessage: "",
      recipientsSnapshot: null, // The recipients of a shared resource the user has to confirm before saving
    };
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSaveAsNewClick = this.handleSaveAsNewClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * The selected resource
   * @returns {object|undefined}
   */
  get selectedResource() {
    return this.props.candidates.find((resource) => resource.id === this.state.selectedResourceId);
  }

  /**
   * Get the translate function
   * @returns {function}
   */
  get translate() {
    return this.props.t;
  }

  handleResourceChange(event) {
    this.setState({ selectedResourceId: event.target.value, recipientsSnapshot: null });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value, unexpectedErrorMessage: "", recipientsSnapshot: null });
  }

  handleSaveAsNewClick(event) {
    event.preventDefault();
    this.props.onSaveAsNew();
  }

  async handleClose() {
    await this.props.onClose();
  }

  /**
   * Update the selected resource with the new password
   * @param {React.Event} event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing || !this.selectedResource) {
      return;
    }
    if (!this.state.password) {
      this.setState({ unexpectedErrorMessage: this.translate("A password is required.") });
      return;
    }

    this.setState({ processing: true, unexpectedErrorMessage: "" });
    const resourceEditService = new ResourceEditService(this.props.context.port, this.props.resourceTypes);
    try {
      const { resourceFormEntity, originalSecret } = await resourceEditService.load(this.selectedResource);
      if (originalSecret?.password === this.state.password) {
        // Nothing changed, the resource is already up to date.
        await this.handleClose();
        return;
      }
      const resourceFormDto = resourceFormEntity.toDto();
      resourceFormDto.secret.password = this.state.password;
      if (!resourceFormDto.metadata.username && this.props.username) {
        resourceFormDto.metadata.username = this.props.username;
      }
      const sanitizedResourceFormEntity = resourceEditService.sanitize(resourceFormDto);
      await this.props.passwordExpiryContext.findSettings?.();
      const { saved, snapshot } = await resourceEditService.save(sanitizedResourceFormEntity, originalSecret, {
        passwordExpirySettings: this.props.passwordExpiryContext.getSettings?.(),
        confirmedSnapshot: this.state.recipientsSnapshot,
      });
      if (!saved) {
        // The resource is shared: the user has to confirm who will receive the new password first.
        this.setState({ processing: false, recipientsSnapshot: snapshot });
        return;
      }
      await this.handleClose();
    } catch (error) {
      if (USER_CANCELLATION_ERRORS.includes(error?.name)) {
        this.setState({ processing: false });
        return;
      }
      console.error(error);
      this.setState({ processing: false, unexpectedErrorMessage: error?.message, recipientsSnapshot: null });
    }
  }

  /**
   * Render the resource label
   * @param {object} resource
   * @returns {string}
   */
  formatResourceLabel(resource) {
    const username = resource.metadata?.username;
    return username ? `${resource.metadata?.name} (${username})` : resource.metadata?.name;
  }

  render() {
    const hasSeveralCandidates = this.props.candidates.length > 1;
    return (
      <div className="resource-auto-save resource-auto-update">
        <h1 className="title">
          <Trans>Would you like to update this credential?</Trans>
        </h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="resource-auto-save-form">
            <div className="form-container">
              <p>
                {hasSeveralCandidates ? (
                  <Trans>
                    Several passwords exist for this website. Choose the one to update with the new password.
                  </Trans>
                ) : (
                  <Trans>A password already exists for this website. Do you want to replace it with the new one?</Trans>
                )}
              </p>
              <div className="input text">
                <label htmlFor="resource">
                  <Trans>Password to update</Trans>
                </label>
                {hasSeveralCandidates ? (
                  <select
                    id="resource"
                    name="resource"
                    value={this.state.selectedResourceId || ""}
                    onChange={this.handleResourceChange}
                    disabled={this.state.processing}
                  >
                    {this.props.candidates.map((resource) => (
                      <option key={resource.id} value={resource.id}>
                        {this.formatResourceLabel(resource)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="resource"
                    type="text"
                    className="fluid"
                    readOnly={true}
                    value={this.formatResourceLabel(this.selectedResource) || ""}
                  />
                )}
              </div>
              <div className="input-password-wrapper input required">
                <label htmlFor="password">
                  <Trans>New password</Trans>
                </label>
                <div className="password-button-inline">
                  <Password
                    name="password"
                    value={this.state.password}
                    preview={true}
                    onChange={this.handlePasswordChange}
                    disabled={this.state.processing}
                    placeholder={this.translate("Password")}
                    id="password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              {this.state.recipientsSnapshot && <RecipientsConfirmation snapshot={this.state.recipientsSnapshot} />}
              {this.state.unexpectedErrorMessage && (
                <div className="error-message">{this.state.unexpectedErrorMessage}</div>
              )}
              <a href="#" className="save-as-new" role="button" onClick={this.handleSaveAsNewClick}>
                <Trans>Save as a new password instead</Trans>
              </a>
            </div>
          </div>
          <div className="submit-wrapper input flex-row-end">
            <a className="cancel" role="button" onClick={this.handleClose}>
              {this.translate("no, thanks")}
            </a>
            <button
              type="submit"
              className={`button primary big ${this.state.processing ? "processing" : ""}`}
              disabled={this.state.processing}
            >
              {this.state.recipientsSnapshot ? <Trans>Confirm and update</Trans> : <Trans>Update</Trans>}
              {this.state.processing && <SpinnerSVG />}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

UpdateResource.propTypes = {
  context: PropTypes.any, // The application context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  passwordExpiryContext: PropTypes.object, // The password expiry context
  candidates: PropTypes.array.isRequired, // The resources that can be updated
  password: PropTypes.string, // The new password submitted on the website
  username: PropTypes.string, // The username submitted on the website
  onSaveAsNew: PropTypes.func.isRequired, // Called when the user prefers to create a new resource
  onClose: PropTypes.func.isRequired, // Called when the operation is over
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withResourceTypesLocalStorage(withPasswordExpiry(withTranslation("common")(UpdateResource))),
);
