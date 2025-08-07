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
 * @since         5.2.0
 */

import PropTypes from "prop-types";
import React from "react";
import {withTranslation} from "react-i18next";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import MetadataKeysServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";

/**
 * Component for confirming and handling the sharing of missing metadata keys.
 */
class ConfirmShareMissingMetadataKeys extends React.Component {
  /**
   * Constructor
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.metadataKeysServiceWorkerService = new MetadataKeysServiceWorkerService(props.context.port);
  }

  /**
   * Get default state
   * @returns {Object} The default state object.
   */
  get defaultState() {
    return {
      processing: false
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleConfirmShare = this.handleConfirmShare.bind(this);
  }

  /**
   * Handles the form submission for sharing metadata keys.
   * @param {Event} event - The form submission event.
   * @returns {Promise<void>}
   */
  async handleConfirmShare(event) {
    event.preventDefault();
    if (this.numberOfKeysCanBeShared === 0) {
      this.props.onClose();
      return;
    }
    this.setState({processing: true});
    try {
      await this.metadataKeysServiceWorkerService.share(this.props.user.id);
      this.props.userWorkspaceContext.onRefreshSelectedUsers();
      this.props.actionFeedbackContext.displaySuccess(this.props.t("Metadata keys have been shared with ({{username}})", {username: this.props.user.username}));
    } catch (error) {
      console.error(error);
      if (error.message) {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
    this.setState({processing: false});
    this.props.onClose();
  }

  /**
   * Returns true if the buttons must be disabled.
   * @returns {boolean} Whether all buttons should be disabled.
   */
  hasAllButtonsDisabled() {
    return this.state.processing;
  }

  /**
   * The number of metadata keys that can be shared with the user.
   * @returns {number} The number of metadata keys that can be shared.
   */
  get numberOfKeysCanBeShared() {
    const loggedInUserMissingMetadataKeys = this.props.context.loggedInUser.missing_metadata_key_ids;
    const userMissingMetadataKeys = this.props.user.missing_metadata_key_ids;

    if (loggedInUserMissingMetadataKeys.length === 0) {
      return userMissingMetadataKeys.length;
    } else {
      return userMissingMetadataKeys.filter(key => !loggedInUserMissingMetadataKeys.includes(key)).length;
    }
  }

  /**
   * Retrieves the full name of the user.
   * @returns {string} The full name of the user.
   */
  get userFullName() {
    return `${this.props.user.profile.first_name} ${this.props.user.profile.last_name}`;
  }

  /**
   * Render the component
   * @returns {JSX} The rendered component.
   */
  render() {
    const isDisabled = this.hasAllButtonsDisabled();
    const loggedInUserMissingMetadataKeys = this.props.context.loggedInUser.missing_metadata_key_ids;
    const userMissingMetadataKeys = this.props.user.missing_metadata_key_ids;

    return (
      <DialogWrapper className='delete-sso-settings-dialog' title={this.props.t("Share missing metadata keys?")} onClose={this.props.onClose} disabled={isDisabled}>
        <form onSubmit={this.handleConfirmShare} noValidate>
          <div className="form-content">
            {
              loggedInUserMissingMetadataKeys.length === 0 &&
                <p>{this.props.t("Share missing metadata keys with {{name}} ({{username}})", {name: this.userFullName, username: this.props.user.username})}</p>
            }
            {
              this.numberOfKeysCanBeShared === 0 &&
                <p>{this.props.t("You can't share metadata keys with {{name}} ({{username}}) because you don't have access to them. Ask another administrator for help.", {name: this.userFullName, username: this.props.user.username})}</p>
            }
            {
              this.numberOfKeysCanBeShared > 0 && this.numberOfKeysCanBeShared < userMissingMetadataKeys.length &&
                <p>{this.props.t("Share your available metadata keys with {{name}} ({{username}})? You're missing some keys yourself. Ask another administrator to share the remaining keys.", {name: this.userFullName, username: this.props.user.username})}</p>
            }
          </div>
          <div className="submit-wrapper clearfix">
            {
              this.numberOfKeysCanBeShared > 0 && (
                <>
                  <FormCancelButton disabled={isDisabled} onClick={this.props.onClose}/>
                  <FormSubmitButton disabled={isDisabled} processing={this.state.processing} value={this.props.t("Share")}/>
                </>
              )
            }
            {
              this.numberOfKeysCanBeShared === 0 && (
                <FormSubmitButton disabled={isDisabled} processing={this.state.processing} value={this.props.t("Ok")}/>
              )
            }
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmShareMissingMetadataKeys.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  userWorkspaceContext: PropTypes.any, // the user workspace context
  user: PropTypes.object, // The user which is missing keys
  onClose: PropTypes.func, // The close dialog callback
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withUserWorkspace(withTranslation('common')(ConfirmShareMissingMetadataKeys))));
