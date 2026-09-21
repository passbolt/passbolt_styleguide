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
 * @since         3.2.0
 */
import React from "react";
import Transition from "react-transition-group/Transition";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { uiActions } from "../../../shared/services/rbacs/uiActionEnumeration";
import { withRbac } from "../../../shared/context/Rbac/RbacContext";
import HiddenPassword from "../../../shared/components/Password/HiddenPassword";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import Totp from "../../../shared/components/Totp/Totp";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";
import sanitizeUrl, { urlProtocols } from "../../../react-extension/lib/Sanitize/sanitizeUrl";
import { resourceLinkAuthorizedProtocols } from "../../../react-extension/contexts/ResourceWorkspaceContext";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import CaretDownSVG from "../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import GoSVG from "../../../img/svg/go.svg";
import CopySVG from "../../../img/svg/copy.svg";
import HealthCheckSuccessSvg from "../../../img/svg/healthcheck_success.svg";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";
import TimerSVG from "../../../img/svg/timer.svg";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import SecretServiceWorkerService from "../../../shared/services/serviceWorker/secret/secretServiceWorkerService";

const CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND = 30;

/**
 * Default display time of error message in ms.
 * @type {number}
 */
const DEFAULT_ERROR_DISPLAY_TIME_IN_MS = 5000;

const TRANSITION_STATES = {
  COPY_LOGIN_STATE_DEFAULT: "copy_login_state_default",
  COPY_LOGIN_STATE_PROCESSING: "copy_login_state_processing",
  COPY_LOGIN_STATE_DONE: "copy_login_state_done",

  COPY_PASSWORD_STATE_DEFAULT: "copy_password_state_default",
  COPY_PASSWORD_STATE_PROCESSING: "copy_password_state_processing",
  COPY_PASSWORD_STATE_DONE: "copy_password_state_done",

  COPY_TOTP_STATE_DEFAULT: "copy_totp_state_default",
  COPY_TOTP_STATE_PROCESSING: "copy_totp_state_processing",
  COPY_TOTP_STATE_DONE: "copy_totp_state_done",

  COPY_PIN_CODE_STATE_DEFAULT: "copy_pin_code_state_default",
  COPY_PIN_CODE_STATE_PROCESSING: "copy_pin_code_state_processing",
  COPY_PIN_CODE_STATE_DONE: "copy_pin_code_state_done",

  COPY_NOTE_STATE_DEFAULT: "copy_note_state_default",
  COPY_NOTE_STATE_PROCESSING: "copy_note_state_processing",
  COPY_NOTE_STATE_DONE: "copy_note_state_done",

  PASSWORD_DECRYPTING: "password_decrypting",
  PASSWORD_NOT_DECRYPTING: "password_not_decrypting",

  TOTP_DECRYPTING: "totp_decrypting",
  TOTP_NOT_DECRYPTING: "totp_not_decrypting",

  PIN_CODE_DECRYPTING: "pin_code_decrypting",
  PIN_CODE_NOT_DECRYPTING: "pin_code_not_decrypting",

  NOTE_DECRYPTING: "note_decrypting",
  NOTE_NOT_DECRYPTING: "note_not_decrypting",
};

class ResourceViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
    this.loadResource();
    this.currentTimeout = null;
    this.clipboardServiceWorkerService = new ClipboardServiceWorkerService(props.context.port);
    this.secretServiceWorkerService = new SecretServiceWorkerService(props.context.port, props.activeSession);
    this.generateNodeRefs();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleCopyLoginClick = this.handleCopyLoginClick.bind(this);
    this.handleCopyPasswordClick = this.handleCopyPasswordClick.bind(this);
    this.handleCopyPinCodeClick = this.handleCopyPinCodeClick.bind(this);
    this.handleGoToUrlClick = this.handleGoToUrlClick.bind(this);
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
    this.handleViewPinCodeButtonClick = this.handleViewPinCodeButtonClick.bind(this);
    this.handleCopyTotpClick = this.handleCopyTotpClick.bind(this);
    this.handlePreviewTotpButtonClick = this.handlePreviewTotpButtonClick.bind(this);
    this.handleCopyNoteClick = this.handleCopyNoteClick.bind(this);
    this.handleViewNoteButtonClick = this.handleViewNoteButtonClick.bind(this);
    this.handleCopyCustomFieldClick = this.handleCopyCustomFieldClick.bind(this);
    this.handleViewCustomFieldButtonClick = this.handleViewCustomFieldButtonClick.bind(this);
    this.handleClickAdditionalUrisSection = this.handleClickAdditionalUrisSection.bind(this);
    this.getNodeRef = this.getNodeRef.bind(this);
  }

  initState() {
    return {
      resource: {},
      passphrase: "",
      usingOnThisTab: false,
      copyPasswordState: "default",
      copyLoginState: "default",
      copyTotpState: "default",
      copyPinCodeState: "default",
      copyNoteState: "default",
      copyCustomFieldId: null, // the custom field being copied
      copyCustomFieldState: "default",
      error: "",
      errorTimeout: null,
      previewedSecret: null, // The type of previewed secret
      previewedCustomFieldIds: [], // The ids of the previewed custom fields
      plaintextSecretDto: null, // The current resource password decrypted
      isPasswordDecrypting: false, // if the password is decrypting
      isTotpDecrypting: false, // if the totp is decrypting
      isPinCodeDecrypting: false, // if the pin code is decrypting
      isNoteDecrypting: false, // if the note is decrypting
      isCustomFieldsDecrypting: false, // if the custom fields are decrypting
      isOpenAdditionalUris: false, // section additional uris open
      copiedProperty: null, //the last property copied
    };
  }

  componentWillUnmount() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }

  /**
   * Create refs for each Transition
   * @returns {void}
   */
  generateNodeRefs() {
    this.nodeRefs = {};
    Object.values(TRANSITION_STATES).forEach((stateKey) => {
      this.nodeRefs[stateKey] = React.createRef();
    });
  }

  /**
   * Get NodeRef or create if it doesn't exist
   * @param {string} key - The key for the node ref
   * @returns {React.RefObject<HTMLElement>} The ref object for the node
   */
  getNodeRef(key) {
    if (!this.nodeRefs[key]) {
      this.nodeRefs[key] = React.createRef();
    }
    return this.nodeRefs[key];
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
    const resource = storageData.resources.find((item) => item.id === this.props.match.params.id);
    this.setState({ resource });
  }

  resetError() {
    this.setState({ error: "" });
  }

  async handleCopyLoginClick(event) {
    event.preventDefault();
    this.resetError();

    if (!this.state.resource.metadata?.username) {
      return;
    }

    try {
      this.setState({
        copiedProperty: "username",
        copyLoginState: "processing",
        copyPasswordState: "default",
        copyTotpState: "default",
        copyPinCodeState: "default",
        copyNoteState: "default",
        copyCustomFieldState: "default",
      });

      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout);
      }

      await this.clipboardServiceWorkerService.copy(this.state.resource.metadata?.username);
      this.setState({ copyLoginState: "done" });

      this.currentTimeout = setTimeout(() => {
        this.setState({ copyLoginState: "default" });
      }, 15000);
    } catch (error) {
      console.error("An unexpected error occured", error);
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
    this.setState({ copyPasswordState: "processing" });

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
        this.setState({ copyPasswordState: "default" });
      }
    }

    if (!plaintextSecretDto) {
      this.setState({ copyPasswordState: "default" });
      return;
    }

    if (!plaintextSecretDto.password?.length) {
      this.displayTemporarilyError(this.translate("The password is empty and cannot be copied to clipboard."));
      this.setState({ copyPasswordState: "default" });
      return;
    }

    await this.clipboardServiceWorkerService.copyTemporarily(plaintextSecretDto.password);

    const newState = {
      copyLoginState: "default",
      copyPasswordState: "done",
      copyTotpState: "default",
      copyPinCodeState: "default",
      copiedProperty: null,
    };
    this.setState(newState, () => {
      //ensure it refreshes the animation after another click on the same property
      this.setState({ copiedProperty: "password" });
    });

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.setState({ copyPasswordState: "default", copiedProperty: null });
    }, CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND * 1000);
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
    this.setState({ plaintextSecretDto: null, previewedSecret: null });
  }

  /**
   * Preview password
   * @returns {Promise<void>}
   */
  async previewPassword() {
    const previewedSecret = "password";
    let plaintextSecretDto;
    this.setState({ error: "", isPasswordDecrypting: true });

    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        return;
      }
    } finally {
      this.setState({ isPasswordDecrypting: false });
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.password?.length) {
      this.displayTemporarilyError(this.translate("The password is empty and cannot be previewed."));
      return;
    }

    this.setState({ plaintextSecretDto, previewedSecret });
  }

  /**
   * Display error temporarily.
   * @param {string} error The error message
   * @param {number} time The time to persist the error.
   */
  displayTemporarilyError(error, time = DEFAULT_ERROR_DISPLAY_TIME_IN_MS) {
    clearTimeout(this.state.errorTimeout);
    const errorTimeout = setTimeout(() => this.setState({ error: "" }), time);
    this.setState({ errorTimeout, error });
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.secretServiceWorkerService.findByResourceId(resourceId);
  }

  /**
   * Handle copy totp
   * @return {Promise<void>}
   */
  async handleCopyTotpClick() {
    let plaintextSecretDto;
    const isTotpPreviewed = this.isTotpPreviewed();

    this.resetError();
    this.setState({ copyTotpState: "processing" });

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
        this.setState({ copyTotpState: "default" });
      }
    }

    if (!plaintextSecretDto) {
      this.setState({ copyTotpState: "default" });
      return;
    }

    if (!plaintextSecretDto.totp) {
      this.displayTemporarilyError(this.translate("The TOTP is empty and cannot be copied to clipboard."));
      this.setState({ copyTotpState: "default" });
      return;
    }

    const code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    await this.clipboardServiceWorkerService.copyTemporarily(code);

    const newState = {
      copyLoginState: "default",
      copyTotpState: "done",
      copyPasswordState: "default",
      copiedProperty: null,
    };
    this.setState(newState, () => {
      //ensure it refreshes the animation after another click on the same property
      this.setState({ copiedProperty: "totp" });
    });

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.setState({ copyTotpState: "default", copiedProperty: null });
    }, CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND * 1000);
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

    this.setState({ error: "", isTotpDecrypting: true });

    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        return;
      }
    } finally {
      this.setState({ isTotpDecrypting: false });
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      this.displayTemporarilyError(this.translate("The TOTP is empty and cannot be previewed."));
      return;
    }

    this.setState({ plaintextSecretDto, previewedSecret });
  }

  /**
   * Handle copy pin code click
   */
  async handleCopyPinCodeClick() {
    await this.copyPinCodeToClipboard();
  }

  /**
   * Handle preview pin code button click
   */
  async handleViewPinCodeButtonClick() {
    await this.togglePreviewPinCode();
  }

  /**
   * Toggle preview pin code
   * @returns {Promise<void>}
   */
  async togglePreviewPinCode() {
    const isPinCodePreviewed = this.isPinCodePreviewed();
    this.hidePreviewedSecret();
    if (!isPinCodePreviewed) {
      await this.previewPinCode();
    }
  }

  /**
   * Copy the pin code resource to clipboard
   * @return {Promise<void>}
   */
  async copyPinCodeToClipboard() {
    let plaintextSecretDto;
    const isPinCodePreviewed = this.isPinCodePreviewed();

    this.resetError();
    this.setState({ copyPinCodeState: "processing" });

    if (isPinCodePreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      try {
        plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          return;
        }
      } finally {
        this.setState({ copyPinCodeState: "default" });
      }
    }

    if (!plaintextSecretDto) {
      this.setState({ copyPinCodeState: "default" });
      return;
    }

    if (!plaintextSecretDto.pin_code?.length) {
      this.displayTemporarilyError(this.translate("The pin code is empty and cannot be copied to clipboard."));
      this.setState({ copyPinCodeState: "default" });
      return;
    }

    await this.clipboardServiceWorkerService.copyTemporarily(plaintextSecretDto.pin_code);

    const newState = {
      copyLoginState: "default",
      copyPinCodeState: "done",
      copyPasswordState: "default",
      copyTotpState: "default",
      copiedProperty: null,
    };
    this.setState(newState, () => {
      //ensure it refreshes the animation after another click on the same property
      this.setState({ copiedProperty: "pin_code" });
    });

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.setState({ copyPinCodeState: "default", copiedProperty: null });
    }, CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND * 1000);
  }

  /**
   * Preview pin code
   * @returns {Promise<void>}
   */
  async previewPinCode() {
    const previewedSecret = "pin_code";
    let plaintextSecretDto;
    this.setState({ error: "", isPinCodeDecrypting: true });

    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        return;
      }
    } finally {
      this.setState({ isPinCodeDecrypting: false });
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.pin_code?.length) {
      this.displayTemporarilyError(this.translate("The pin code is empty and cannot be previewed."));
      return;
    }

    this.setState({ plaintextSecretDto, previewedSecret });
  }

  /**
   * Handle copy note click
   */
  async handleCopyNoteClick() {
    await this.copyNoteToClipboard();
  }

  /**
   * Handle preview note button click
   */
  async handleViewNoteButtonClick() {
    await this.togglePreviewNote();
  }

  /**
   * Toggle preview note
   * @returns {Promise<void>}
   */
  async togglePreviewNote() {
    const isNotePreviewed = this.isNotePreviewed();
    this.hidePreviewedSecret();
    if (!isNotePreviewed) {
      await this.previewNote();
    }
  }

  /**
   * Copy the note resource to clipboard
   * @return {Promise<void>}
   */
  async copyNoteToClipboard() {
    let plaintextSecretDto;
    const isNotePreviewed = this.isNotePreviewed();

    this.resetError();
    this.setState({ copyNoteState: "processing" });

    if (isNotePreviewed) {
      plaintextSecretDto = this.state.plaintextSecretDto;
    } else {
      try {
        plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
      } catch (error) {
        if (error.name !== "UserAbortsOperationError") {
          return;
        }
      } finally {
        this.setState({ copyNoteState: "default" });
      }
    }

    if (!plaintextSecretDto) {
      this.setState({ copyNoteState: "default" });
      return;
    }
    // The note text is stored under "description" in the standalone note secret schema
    if (!plaintextSecretDto.description?.length) {
      this.displayTemporarilyError(this.translate("The note is empty and cannot be copied to clipboard."));
      this.setState({ copyNoteState: "default" });
      return;
    }
    // "description" holds the whole note, copied as it is
    await this.clipboardServiceWorkerService.copyTemporarily(plaintextSecretDto.description);

    const newState = {
      copyLoginState: "default",
      copyPinCodeState: "default",
      copyPasswordState: "default",
      copyTotpState: "default",
      copyNoteState: "done",
      copiedProperty: null,
    };
    this.setState(newState, () => {
      //ensure it refreshes the animation after another click on the same property
      this.setState({ copiedProperty: "note" });
    });

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.setState({ copyNoteState: "default", copiedProperty: null });
    }, CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND * 1000);
  }

  /**
   * Preview note
   * @returns {Promise<void>}
   */
  async previewNote() {
    const previewedSecret = "note";
    let plaintextSecretDto;
    this.setState({ error: "", isNoteDecrypting: true });

    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        return;
      }
    } finally {
      this.setState({ isNoteDecrypting: false });
    }

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.description?.length) {
      this.displayTemporarilyError(this.translate("The note is empty and cannot be previewed."));
      return;
    }

    this.setState({ plaintextSecretDto, previewedSecret });
  }

  /**
   * Handle copy custom field click
   * @param {string} fieldId The custom field id
   */
  async handleCopyCustomFieldClick(fieldId) {
    await this.copyCustomFieldToClipboard(fieldId);
  }

  /**
   * Handle preview custom field button click
   * @param {string} fieldId The custom field id
   */
  async handleViewCustomFieldButtonClick(fieldId) {
    await this.togglePreviewCustomField(fieldId);
  }

  /**
   * Toggle the preview of a custom field
   * @param {string} fieldId The custom field id
   * @returns {Promise<void>}
   */
  async togglePreviewCustomField(fieldId) {
    if (this.isCustomFieldPreviewed(fieldId)) {
      const previewedCustomFieldIds = this.state.previewedCustomFieldIds.filter((id) => id !== fieldId);
      this.setState({ previewedCustomFieldIds });
      return;
    }
    await this.previewCustomField(fieldId);
  }

  /**
   * Copy a custom field value to clipboard
   * @param {string} fieldId The custom field id
   * @return {Promise<void>}
   */
  async copyCustomFieldToClipboard(fieldId) {
    this.resetError();
    this.setState({ copyCustomFieldId: fieldId, copyCustomFieldState: "processing" });

    const plaintextSecretDto = await this.getOrDecryptCustomFieldsSecret();
    if (!plaintextSecretDto) {
      this.setState({ copyCustomFieldState: "default" });
      return;
    }

    const value = this.getCustomFieldValue(plaintextSecretDto, fieldId);
    if (!value.length) {
      this.displayTemporarilyError(
        this.translate("The custom field value is empty and cannot be copied to clipboard."),
      );
      this.setState({ copyCustomFieldState: "default" });
      return;
    }

    await this.clipboardServiceWorkerService.copyTemporarily(value);

    const newState = {
      copyLoginState: "default",
      copyPinCodeState: "default",
      copyPasswordState: "default",
      copyTotpState: "default",
      copyNoteState: "default",
      copyCustomFieldState: "done",
      copiedProperty: null,
    };
    this.setState(newState, () => {
      //ensure it refreshes the animation after another click on the same property
      this.setState({ copiedProperty: fieldId });
    });

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.setState({ copyCustomFieldId: null, copyCustomFieldState: "default", copiedProperty: null });
    }, CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND * 1000);
  }

  /**
   * Preview a custom field
   * @param {string} fieldId The custom field id
   * @returns {Promise<void>}
   */
  async previewCustomField(fieldId) {
    this.resetError();
    this.setState({ isCustomFieldsDecrypting: true });
    const plaintextSecretDto = await this.getOrDecryptCustomFieldsSecret();
    this.setState({ isCustomFieldsDecrypting: false });
    if (!plaintextSecretDto) {
      return;
    }

    this.setState({ previewedCustomFieldIds: [...this.state.previewedCustomFieldIds, fieldId] });
  }

  /**
   * Get the decrypted custom fields secret
   * @returns {Promise<object|null>} The plaintext secret dto, or null if the decryption failed or was cancelled
   */
  async getOrDecryptCustomFieldsSecret() {
    if (this.state.plaintextSecretDto) {
      return this.state.plaintextSecretDto;
    }

    let plaintextSecretDto;
    try {
      plaintextSecretDto = await this.decryptResourceSecret(this.state.resource.id);
    } catch {
      return null;
    }

    this.setState({ plaintextSecretDto });
    return plaintextSecretDto;
  }

  /**
   * Get the value of a custom field from a decrypted secret, as text
   * @param {object|null} plaintextSecretDto The decrypted secret
   * @param {string} fieldId The custom field id
   * @returns {string} The value, empty if the field has no value or is not in the secret
   */
  getCustomFieldValue(plaintextSecretDto, fieldId) {
    const field = plaintextSecretDto?.custom_fields?.find((customField) => customField.id === fieldId);
    return String(field?.secret_value ?? "");
  }

  handleGoToUrlClick(event) {
    const primaryUri = this.state.resource.metadata?.uris?.[0];

    this.resetError();
    if (!this.sanitizeResourceUrl(primaryUri)) {
      event.preventDefault();
    }
  }

  async handleUseOnThisTabClick(event) {
    event.preventDefault();
    this.setState({ usingOnThisTab: true });
    try {
      await this.props.context.port.request(
        "passbolt.quickaccess.use-resource-on-current-tab",
        this.state.resource.id,
        this.props.context.openerTabId,
      );

      this.props.context.closeWindow();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({ usingOnThisTab: false });
      } else {
        console.error("An error occured", error);
        this.setState({
          usingOnThisTab: false,
          error: this.props.t("Unable to use the password on this page. Copy and paste the information instead."),
        });
      }
    }
  }

  /**
   * Handle click on additional uris
   */
  handleClickAdditionalUrisSection() {
    this.setState({ isOpenAdditionalUris: !this.state.isOpenAdditionalUris });
  }

  /**
   * Sanitize resource url
   * @param url
   * @returns {string|boolean|*}
   */
  sanitizeResourceUrl(url) {
    return sanitizeUrl(url, {
      whiteListedProtocols: resourceLinkAuthorizedProtocols,
      defaultProtocol: urlProtocols.HTTPS,
    });
  }

  /**
   * Check if the password is previewed
   * @returns {boolean}
   */
  isPasswordPreviewed() {
    return this.state.previewedSecret === "password";
  }

  /**
   * Check if the totp is previewed
   * @returns {boolean}
   */
  isTotpPreviewed() {
    return this.state.previewedSecret === "totp";
  }

  /**
   * Check if the pin code is previewed
   * @returns {boolean}
   */
  isPinCodePreviewed() {
    return this.state.previewedSecret === "pin_code";
  }

  /**
   * Check if the note is previewed
   * @returns {boolean}
   */
  isNotePreviewed() {
    return this.state.previewedSecret === "note";
  }

  /**
   * Check if a custom field is previewed
   * @param {string} fieldId The custom field id
   * @returns {boolean}
   */
  isCustomFieldPreviewed(fieldId) {
    return this.state.previewedCustomFieldIds.includes(fieldId);
  }

  /**
   * Returns true if the logged in user can use the preview password capability.
   * @returns {boolean}
   */
  get canPreviewSecret() {
    return (
      this.props.context.siteSettings.canIUse("previewPassword") &&
      this.props.rbacContext.canIUseAction(uiActions.SECRETS_PREVIEW)
    );
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isTotpResources() {
    return (
      Boolean(this.state.resource.resource_type_id) &&
      this.props.resourceTypes?.getFirstById(this.state.resource.resource_type_id)?.hasTotp()
    );
  }

  /**
   * Is standalone TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return (
      Boolean(this.state.resource.resource_type_id) &&
      this.props.resourceTypes?.getFirstById(this.state.resource.resource_type_id)?.isStandaloneTotp()
    );
  }

  /**
   * Is standalone PIN code resource
   * @return {boolean}
   */
  get isStandalonePinCodeResource() {
    return (
      Boolean(this.state.resource.resource_type_id) &&
      this.props.resourceTypes?.getFirstById(this.state.resource.resource_type_id)?.isStandalonePinCode()
    );
  }

  /**
   * Is standalone note resource
   * @return {boolean}
   */
  get isStandaloneNoteResource() {
    return (
      Boolean(this.state.resource.resource_type_id) &&
      this.props.resourceTypes?.getFirstById(this.state.resource.resource_type_id)?.isStandaloneNote()
    );
  }

  /**
   * Is standalone custom fields resource
   * @return {boolean}
   */
  get isStandaloneCustomFieldsResource() {
    return (
      Boolean(this.state.resource.resource_type_id) &&
      this.props.resourceTypes?.getFirstById(this.state.resource.resource_type_id)?.isStandaloneCustomFields()
    );
  }

  render() {
    const primaryUri = this.state.resource.metadata?.uris?.[0];
    const additionalUris = this.state.resource.metadata?.uris?.slice(1);
    const isPasswordPreviewed = this.isPasswordPreviewed();
    const isTotpPreviewed = this.isTotpPreviewed();
    const isNotePreviewed = this.isNotePreviewed();
    const customFields = this.state.resource.metadata?.custom_fields || [];
    const hasUsernameAndPassword =
      !this.isStandaloneTotpResource &&
      !this.isStandalonePinCodeResource &&
      !this.isStandaloneNoteResource &&
      !this.isStandaloneCustomFieldsResource;
    const canUseOnThisPage =
      !this.isStandalonePinCodeResource && !this.isStandaloneNoteResource && !this.isStandaloneCustomFieldsResource;
    const canCopySecret = this.props.rbacContext.canIUseAction(uiActions.SECRETS_COPY);

    return (
      <div className="resource item-browse">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick}>
            <CaretLeftSVG />
            <span className="primary-action-title">{this.state.resource.metadata?.name}</span>
          </a>
          <a
            href={`${this.props.context.userSettings.getTrustedDomain()}/app/passwords/view/${this.props.match.params.id}`}
            className="secondary-action button-transparent button"
            target="_blank"
            rel="noopener noreferrer"
            title={this.translate("View it in passbolt")}
          >
            <GoSVG />
            <span className="visually-hidden">
              <Trans>Edit in passbolt</Trans>
            </span>
          </a>
        </div>
        <ul className="properties">
          {hasUsernameAndPassword && (
            <>
              <li className="property">
                <div className="information">
                  <span className="property-name">
                    <Trans>Username</Trans>
                  </span>
                  {this.state.resource.metadata?.username && (
                    <a href="#" role="button" className="property-value" onClick={this.handleCopyLoginClick}>
                      {this.state.resource.metadata?.username}
                    </a>
                  )}
                  {!this.state.resource.metadata?.username && (
                    <span className="property-value empty">
                      <Trans>no username provided</Trans>
                    </span>
                  )}
                </div>
                <a
                  role="button"
                  className={`button button-transparent property-action ${!this.state.resource.metadata?.username ? "disabled" : ""}`}
                  onClick={this.handleCopyLoginClick}
                  title={this.translate("Copy to clipboard")}
                >
                  <Transition
                    in={this.state.copyLoginState === "default"}
                    appear={false}
                    timeout={500}
                    nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_DEFAULT)}
                  >
                    {(status) => (
                      <span
                        className={`transition fade-${status} ${this.state.copyLoginState !== "default" ? "visually-hidden" : ""}`}
                      >
                        <CopySVG />
                      </span>
                    )}
                  </Transition>
                  <Transition
                    in={this.state.copyLoginState === "processing"}
                    appear={true}
                    timeout={500}
                    nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_PROCESSING)}
                  >
                    {(status) => (
                      <span
                        className={`transition fade-${status} ${this.state.copyLoginState !== "processing" ? "visually-hidden" : ""}`}
                      >
                        <SpinnerSVG />
                      </span>
                    )}
                  </Transition>
                  <Transition
                    in={this.state.copyLoginState === "done"}
                    appear={true}
                    timeout={500}
                    nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_DONE)}
                  >
                    {(status) => (
                      <span
                        className={`transition fade-${status} ${this.state.copyLoginState !== "done" ? "visually-hidden" : ""}`}
                      >
                        <HealthCheckSuccessSvg />
                      </span>
                    )}
                  </Transition>
                  <span className="visually-hidden">
                    <Trans>Copy to clipboard</Trans>
                  </span>
                </a>
              </li>
              <li className="property">
                <div className="information">
                  <span className="property-name">
                    <Trans>Password</Trans>
                  </span>
                  <div className="password-wrapper">
                    <div
                      className={`property-value secret secret-password ${isPasswordPreviewed ? "" : "secret-copy"}`}
                      title={
                        isPasswordPreviewed ? this.state.plaintextSecretDto?.password : this.translate("Click to copy")
                      }
                    >
                      <HiddenPassword
                        canClick={canCopySecret}
                        preview={this.state.plaintextSecretDto?.password}
                        onClick={this.handleCopyPasswordClick}
                      />
                    </div>
                    {this.canPreviewSecret && (
                      <button
                        onClick={this.handleViewPasswordButtonClick}
                        className="password-view inline button-transparent"
                        disabled={this.state.isPasswordDecrypting}
                      >
                        <Transition
                          in={!this.state.isPasswordDecrypting}
                          appear={false}
                          timeout={500}
                          nodeRef={this.getNodeRef(TRANSITION_STATES.PASSWORD_NOT_DECRYPTING)}
                        >
                          {(status) => (
                            <span
                              className={`transition fade-${status} ${this.state.isPasswordDecrypting ? "visually-hidden" : ""}`}
                            >
                              {isPasswordPreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                            </span>
                          )}
                        </Transition>
                        <Transition
                          in={this.state.isPasswordDecrypting}
                          appear={true}
                          timeout={500}
                          nodeRef={this.getNodeRef(TRANSITION_STATES.PASSWORD_DECRYPTING)}
                        >
                          {(status) => (
                            <span
                              className={`transition fade-${status} ${!this.state.isPasswordDecrypting ? "visually-hidden" : ""}`}
                            >
                              <SpinnerSVG />
                            </span>
                          )}
                        </Transition>
                        <span className="visually-hidden">
                          <Trans>View</Trans>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                {canCopySecret && (
                  <>
                    <a
                      role="button"
                      className="button button-transparent property-action copy-password"
                      onClick={this.handleCopyPasswordClick}
                      title={this.translate("Copy to clipboard")}
                    >
                      <Transition
                        in={this.state.copyPasswordState === "default"}
                        appear={false}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_PASSWORD_STATE_DEFAULT)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${this.state.copyPasswordState !== "default" ? "visually-hidden" : ""}`}
                          >
                            <CopySVG />
                          </span>
                        )}
                      </Transition>
                      <Transition
                        in={this.state.copyPasswordState === "processing"}
                        appear={true}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_PASSWORD_STATE_PROCESSING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${this.state.copyPasswordState !== "processing" ? "visually-hidden" : ""}`}
                          >
                            <SpinnerSVG />
                          </span>
                        )}
                      </Transition>
                      <Transition
                        in={this.state.copyPasswordState === "done"}
                        appear={true}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_PASSWORD_STATE_DONE)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${this.state.copyPasswordState !== "done" ? "visually-hidden" : ""}`}
                          >
                            <HealthCheckSuccessSvg />
                          </span>
                        )}
                      </Transition>
                      <span className="visually-hidden">
                        <Trans>Copy to clipboard</Trans>
                      </span>
                    </a>
                    {this.state.copiedProperty === "password" && (
                      <TimerSVG
                        style={{
                          "--timer-duration": `${CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND}s`,
                        }}
                      />
                    )}
                  </>
                )}
              </li>
            </>
          )}
          {this.isTotpResources && (
            <li className="property">
              <div className="information">
                <span className="property-name">
                  <Trans>TOTP</Trans>
                </span>
                <div className="totp-wrapper">
                  <div
                    className={`property-value secret secret-totp ${isTotpPreviewed ? "" : "secret-copy"}`}
                    title={isTotpPreviewed ? this.state.plaintextSecretDto?.totp : this.translate("Click to copy")}
                  >
                    {isTotpPreviewed && (
                      <Totp
                        totp={this.state.plaintextSecretDto?.totp}
                        canClick={canCopySecret}
                        onClick={this.handleCopyTotpClick}
                      />
                    )}
                    {!isTotpPreviewed && (
                      <button
                        type="button"
                        className="no-border"
                        onClick={this.handleCopyTotpClick}
                        disabled={!canCopySecret}
                      >
                        <span>Copy TOTP to clipboard</span>
                      </button>
                    )}
                  </div>
                  {this.canPreviewSecret && (
                    <button
                      onClick={this.handlePreviewTotpButtonClick}
                      className="totp-view inline button-transparent"
                      disabled={this.state.isTotpDecrypting}
                    >
                      <Transition
                        in={!this.state.isTotpDecrypting}
                        appear={false}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.TOTP_NOT_DECRYPTING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${this.state.isTotpDecrypting ? "visually-hidden" : ""}`}
                          >
                            {isTotpPreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                          </span>
                        )}
                      </Transition>
                      <Transition
                        in={this.state.isTotpDecrypting}
                        appear={true}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.TOTP_DECRYPTING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${!this.state.isTotpDecrypting ? "visually-hidden" : ""}`}
                          >
                            <SpinnerSVG />
                          </span>
                        )}
                      </Transition>
                      <span className="visually-hidden">
                        <Trans>View</Trans>
                      </span>
                    </button>
                  )}
                </div>
              </div>
              {canCopySecret && (
                <>
                  <a
                    role="button"
                    className="button button-transparent property-action copy-totp"
                    onClick={this.handleCopyTotpClick}
                    title={this.translate("Copy to clipboard")}
                  >
                    <Transition in={this.state.copyTotpState === "default"} appear={false} timeout={500}>
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyTotpState !== "default" ? "visually-hidden" : ""}`}
                        >
                          <CopySVG />
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.copyTotpState === "processing"} appear={true} timeout={500}>
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyTotpState !== "processing" ? "visually-hidden" : ""}`}
                        >
                          <SpinnerSVG />
                        </span>
                      )}
                    </Transition>
                    <Transition in={this.state.copyTotpState === "done"} appear={true} timeout={500}>
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyTotpState !== "done" ? "visually-hidden" : ""}`}
                        >
                          <HealthCheckSuccessSvg />
                        </span>
                      )}
                    </Transition>
                    <span className="visually-hidden">
                      <Trans>Copy to clipboard</Trans>
                    </span>
                  </a>
                  {this.state.copiedProperty === "totp" && (
                    <TimerSVG
                      style={{
                        "--timer-duration": `${CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND}s`,
                      }}
                    />
                  )}
                </>
              )}
            </li>
          )}
          {this.isStandalonePinCodeResource && (
            <li className="property">
              <div className="information">
                <span className="property-name">
                  <Trans>Pin code</Trans>
                </span>
                <div className="password-wrapper">
                  <div
                    className={`property-value secret secret-pin-code ${this.isPinCodePreviewed() ? "" : "secret-copy"}`}
                    title={
                      this.isPinCodePreviewed()
                        ? this.state.plaintextSecretDto?.pin_code
                        : this.translate("Click to copy")
                    }
                  >
                    <HiddenPassword
                      canClick={canCopySecret}
                      preview={this.state.plaintextSecretDto?.pin_code}
                      onClick={this.handleCopyPinCodeClick}
                    />
                  </div>
                  {this.canPreviewSecret && (
                    <button
                      onClick={this.handleViewPinCodeButtonClick}
                      className="password-view inline button-transparent"
                      disabled={this.state.isPinCodeDecrypting}
                    >
                      <Transition
                        in={!this.state.isPinCodeDecrypting}
                        appear={false}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.PIN_CODE_NOT_DECRYPTING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${this.state.isPinCodeDecrypting ? "visually-hidden" : ""}`}
                          >
                            {this.isPinCodePreviewed() ? <EyeCloseSVG /> : <EyeOpenSVG />}
                          </span>
                        )}
                      </Transition>
                      <Transition
                        in={this.state.isPinCodeDecrypting}
                        appear={true}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.PIN_CODE_DECRYPTING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${!this.state.isPinCodeDecrypting ? "visually-hidden" : ""}`}
                          >
                            <SpinnerSVG />
                          </span>
                        )}
                      </Transition>
                      <span className="visually-hidden">
                        <Trans>View</Trans>
                      </span>
                    </button>
                  )}
                </div>
              </div>
              {canCopySecret && (
                <>
                  <a
                    role="button"
                    className="button button-transparent property-action copy-pin-code"
                    onClick={this.handleCopyPinCodeClick}
                    title={this.translate("Copy to clipboard")}
                  >
                    <Transition
                      in={this.state.copyPinCodeState === "default"}
                      appear={false}
                      timeout={500}
                      nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_PIN_CODE_STATE_DEFAULT)}
                    >
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyPinCodeState !== "default" ? "visually-hidden" : ""}`}
                        >
                          <CopySVG />
                        </span>
                      )}
                    </Transition>
                    <Transition
                      in={this.state.copyPinCodeState === "processing"}
                      appear={true}
                      timeout={500}
                      nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_PIN_CODE_STATE_PROCESSING)}
                    >
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyPinCodeState !== "processing" ? "visually-hidden" : ""}`}
                        >
                          <SpinnerSVG />
                        </span>
                      )}
                    </Transition>
                    <Transition
                      in={this.state.copyPinCodeState === "done"}
                      appear={true}
                      timeout={500}
                      nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_PIN_CODE_STATE_DONE)}
                    >
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyPinCodeState !== "done" ? "visually-hidden" : ""}`}
                        >
                          <HealthCheckSuccessSvg />
                        </span>
                      )}
                    </Transition>
                    <span className="visually-hidden">
                      <Trans>Copy to clipboard</Trans>
                    </span>
                  </a>
                  {this.state.copiedProperty === "pin_code" && (
                    <TimerSVG
                      style={{
                        "--timer-duration": `${CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND}s`,
                      }}
                    />
                  )}
                </>
              )}
            </li>
          )}
          {this.isStandaloneNoteResource && (
            <li className="property">
              <div className="information">
                <span className="property-name">
                  <Trans>Notes</Trans>
                </span>
                <div className="password-wrapper">
                  <div
                    className="property-value secret secret-note"
                    title={isNotePreviewed ? undefined : this.translate("Click to copy")}
                  >
                    {isNotePreviewed ? (
                      <div className="note-previewed">{this.state.plaintextSecretDto?.description}</div>
                    ) : (
                      <button
                        type="button"
                        className="no-border encrypted-description"
                        onClick={this.handleCopyNoteClick}
                        disabled={!canCopySecret}
                      >
                        Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never
                        gonna make you cry.
                      </button>
                    )}
                  </div>
                  {this.canPreviewSecret && (
                    <button
                      onClick={this.handleViewNoteButtonClick}
                      className="password-view inline button-transparent"
                      disabled={this.state.isNoteDecrypting}
                    >
                      <Transition
                        in={!this.state.isNoteDecrypting}
                        appear={false}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.NOTE_NOT_DECRYPTING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${this.state.isNoteDecrypting ? "visually-hidden" : ""}`}
                          >
                            {isNotePreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                          </span>
                        )}
                      </Transition>
                      <Transition
                        in={this.state.isNoteDecrypting}
                        appear={true}
                        timeout={500}
                        nodeRef={this.getNodeRef(TRANSITION_STATES.NOTE_DECRYPTING)}
                      >
                        {(status) => (
                          <span
                            className={`transition fade-${status} ${!this.state.isNoteDecrypting ? "visually-hidden" : ""}`}
                          >
                            <SpinnerSVG />
                          </span>
                        )}
                      </Transition>
                      <span className="visually-hidden">
                        <Trans>View</Trans>
                      </span>
                    </button>
                  )}
                </div>
              </div>
              {canCopySecret && (
                <>
                  <a
                    role="button"
                    className="button button-transparent property-action copy-note"
                    onClick={this.handleCopyNoteClick}
                    title={this.translate("Copy to clipboard")}
                  >
                    <Transition
                      in={this.state.copyNoteState === "default"}
                      appear={false}
                      timeout={500}
                      nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_NOTE_STATE_DEFAULT)}
                    >
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyNoteState !== "default" ? "visually-hidden" : ""}`}
                        >
                          <CopySVG />
                        </span>
                      )}
                    </Transition>
                    <Transition
                      in={this.state.copyNoteState === "processing"}
                      appear={true}
                      timeout={500}
                      nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_NOTE_STATE_PROCESSING)}
                    >
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyNoteState !== "processing" ? "visually-hidden" : ""}`}
                        >
                          <SpinnerSVG />
                        </span>
                      )}
                    </Transition>
                    <Transition
                      in={this.state.copyNoteState === "done"}
                      appear={true}
                      timeout={500}
                      nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_NOTE_STATE_DONE)}
                    >
                      {(status) => (
                        <span
                          className={`transition fade-${status} ${this.state.copyNoteState !== "done" ? "visually-hidden" : ""}`}
                        >
                          <HealthCheckSuccessSvg />
                        </span>
                      )}
                    </Transition>
                    <span className="visually-hidden">
                      <Trans>Copy to clipboard</Trans>
                    </span>
                  </a>
                  {this.state.copiedProperty === "note" && (
                    <TimerSVG
                      style={{
                        "--timer-duration": `${CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND}s`,
                      }}
                    />
                  )}
                </>
              )}
            </li>
          )}
          {this.isStandaloneCustomFieldsResource && customFields.length === 0 && (
            <li className="property">
              <div className="information">
                <span className="property-name">
                  <Trans>Custom fields</Trans>
                </span>
                <span className="property-value empty">
                  <Trans>No custom fields</Trans>
                </span>
              </div>
            </li>
          )}
          {this.isStandaloneCustomFieldsResource &&
            customFields.map((customField) => {
              const isCustomFieldPreviewed = this.isCustomFieldPreviewed(customField.id);
              const customFieldValue = isCustomFieldPreviewed
                ? this.getCustomFieldValue(this.state.plaintextSecretDto, customField.id)
                : null;
              const copyCustomFieldState =
                this.state.copyCustomFieldId === customField.id ? this.state.copyCustomFieldState : "default";
              return (
                <li className="property" key={customField.id}>
                  <div className="information">
                    {customField.metadata_key?.length > 0 ? (
                      <span className="property-name">{customField.metadata_key}</span>
                    ) : (
                      <span className="property-name empty">
                        <Trans>no key</Trans>
                      </span>
                    )}
                    <div className="password-wrapper">
                      <div
                        className={`property-value secret secret-custom-fields ${isCustomFieldPreviewed ? "" : "secret-copy"}`}
                        title={isCustomFieldPreviewed ? customFieldValue : this.translate("Click to copy")}
                      >
                        <HiddenPassword
                          canClick={canCopySecret}
                          preview={customFieldValue}
                          onClick={() => this.handleCopyCustomFieldClick(customField.id)}
                          emptySecretSentence={this.translate("There is no value")}
                        />
                      </div>
                      {this.canPreviewSecret && (
                        <button
                          onClick={() => this.handleViewCustomFieldButtonClick(customField.id)}
                          className="password-view inline button-transparent"
                          disabled={this.state.isCustomFieldsDecrypting}
                        >
                          <Transition
                            in={!this.state.isCustomFieldsDecrypting}
                            appear={false}
                            timeout={500}
                            nodeRef={this.getNodeRef(`custom_field_not_decrypting_${customField.id}`)}
                          >
                            {(status) => (
                              <span
                                className={`transition fade-${status} ${this.state.isCustomFieldsDecrypting ? "visually-hidden" : ""}`}
                              >
                                {isCustomFieldPreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                              </span>
                            )}
                          </Transition>
                          <Transition
                            in={this.state.isCustomFieldsDecrypting}
                            appear={true}
                            timeout={500}
                            nodeRef={this.getNodeRef(`custom_field_decrypting_${customField.id}`)}
                          >
                            {(status) => (
                              <span
                                className={`transition fade-${status} ${!this.state.isCustomFieldsDecrypting ? "visually-hidden" : ""}`}
                              >
                                <SpinnerSVG />
                              </span>
                            )}
                          </Transition>
                          <span className="visually-hidden">
                            <Trans>View</Trans>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                  {canCopySecret && (
                    <>
                      <a
                        role="button"
                        className="button button-transparent property-action copy-custom-field"
                        onClick={() => this.handleCopyCustomFieldClick(customField.id)}
                        title={this.translate("Copy to clipboard")}
                      >
                        <Transition
                          in={copyCustomFieldState === "default"}
                          appear={false}
                          timeout={500}
                          nodeRef={this.getNodeRef(`copy_custom_field_state_default_${customField.id}`)}
                        >
                          {(status) => (
                            <span
                              className={`transition fade-${status} ${copyCustomFieldState !== "default" ? "visually-hidden" : ""}`}
                            >
                              <CopySVG />
                            </span>
                          )}
                        </Transition>
                        <Transition
                          in={copyCustomFieldState === "processing"}
                          appear={true}
                          timeout={500}
                          nodeRef={this.getNodeRef(`copy_custom_field_state_processing_${customField.id}`)}
                        >
                          {(status) => (
                            <span
                              className={`transition fade-${status} ${copyCustomFieldState !== "processing" ? "visually-hidden" : ""}`}
                            >
                              <SpinnerSVG />
                            </span>
                          )}
                        </Transition>
                        <Transition
                          in={copyCustomFieldState === "done"}
                          appear={true}
                          timeout={500}
                          nodeRef={this.getNodeRef(`copy_custom_field_state_done_${customField.id}`)}
                        >
                          {(status) => (
                            <span
                              className={`transition fade-${status} ${copyCustomFieldState !== "done" ? "visually-hidden" : ""}`}
                            >
                              <HealthCheckSuccessSvg />
                            </span>
                          )}
                        </Transition>
                        <span className="visually-hidden">
                          <Trans>Copy to clipboard</Trans>
                        </span>
                      </a>
                      {this.state.copiedProperty === customField.id && (
                        <TimerSVG
                          style={{
                            "--timer-duration": `${CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND}s`,
                          }}
                        />
                      )}
                    </>
                  )}
                </li>
              );
            })}
          {!this.isStandalonePinCodeResource && (
            <li className="property">
              <div className="information">
                <span className="property-name">URI</span>
                {primaryUri && this.sanitizeResourceUrl(primaryUri) && (
                  <a
                    href={this.sanitizeResourceUrl(primaryUri)}
                    role="button"
                    className="property-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {primaryUri}
                  </a>
                )}
                {primaryUri && !this.sanitizeResourceUrl(primaryUri) && (
                  <span className="property-value">{primaryUri}</span>
                )}
                {!primaryUri && (
                  <span className="property-value empty">
                    <Trans>no url provided</Trans>
                  </span>
                )}
              </div>
              <a
                href={`${this.sanitizeResourceUrl(primaryUri) ? this.sanitizeResourceUrl(primaryUri) : "#"}`}
                role="button"
                className={`button button-transparent property-action ${!this.sanitizeResourceUrl(primaryUri) ? "disabled" : ""}`}
                onClick={this.handleGoToUrlClick}
                target="_blank"
                rel="noopener noreferrer"
                title={this.translate("open in a new tab")}
              >
                <GoSVG />
                <span className="visually-hidden">
                  <Trans>Open in new window</Trans>
                </span>
              </a>
            </li>
          )}

          {additionalUris?.length > 0 && (
            <li className="property">
              <div className="information">
                <div className="accordion">
                  <div className="accordion-header additional-uris" onClick={this.handleClickAdditionalUrisSection}>
                    <button type="button" className="link no-border property-name">
                      {this.state.isOpenAdditionalUris ? (
                        <CaretDownSVG className="caret-down" />
                      ) : (
                        <CaretRightSVG className="caret-right" />
                      )}
                      <span>
                        <Trans>Additional URIs</Trans>
                      </span>
                    </button>
                  </div>
                  {this.state.isOpenAdditionalUris && (
                    <div className="accordion-content">
                      <div className="list-uris">
                        {additionalUris.map((uri, index) => {
                          const safeUri = this.sanitizeResourceUrl(uri);
                          if (safeUri) {
                            return (
                              <a
                                href={safeUri}
                                className="property-value"
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="ellipsis">{uri}</span>
                              </a>
                            );
                          }
                          return (
                            <span className="property-value" key={index}>
                              {uri}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )}
        </ul>
        <div className="submit-wrapper input">
          {canUseOnThisPage && (
            <a
              href="#"
              id="popupAction"
              className={`button primary big full-width ${this.state.usingOnThisTab ? "disabled" : ""}`}
              role="button"
              onClick={this.handleUseOnThisTabClick}
            >
              {this.state.usingOnThisTab && <SpinnerSVG />}
              {!this.state.usingOnThisTab && <Trans>Use on this page</Trans>}
            </a>
          )}
          {this.state.error && <div className="error-message">{this.state.error}</div>}
        </div>
      </div>
    );
  }
}

ResourceViewPage.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The role based access control context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withActiveSessionLocalStorage(
  withAppContext(withRbac(withRouter(withResourceTypesLocalStorage(withTranslation("common")(ResourceViewPage))))),
);
