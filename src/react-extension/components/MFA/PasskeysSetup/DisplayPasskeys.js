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
 * @since         5.17.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { DateTime } from "luxon";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withMfa } from "../../../contexts/MFAContext";
import { withDialog } from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import Tooltip from "../../Common/Tooltip/Tooltip";
import PasskeyAuthenticatorIcon from "../../../../shared/components/Icons/PasskeyAuthenticatorIcon";
import { formatDateTimeAgo } from "../../../../shared/utils/dateUtils";
import DeletePasskeyDialog from "./DeletePasskeyDialog";
import AddSVG from "../../../../img/svg/add.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";

/**
 * This component displays the passkeys of the user and lets them add or delete one.
 */
class DisplayPasskeys extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      passkeys: [],
      settings: null,
      loading: true,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.loadData = this.loadData.bind(this);
    this.handleAddPasskeyClick = this.handleAddPasskeyClick.bind(this);
    this.handleDeletePasskeyClick = this.handleDeletePasskeyClick.bind(this);
    this.handleManageProvidersClick = this.handleManageProvidersClick.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.loadData();
  }

  /**
   * Load the passkeys and the organisation passkey settings.
   * @returns {Promise<void>}
   */
  async loadData() {
    try {
      const [passkeys, settings] = await Promise.all([
        this.props.mfaContext.findPasskeys(),
        this.props.mfaContext.findPasskeySettings(),
      ]);
      this.setState({ passkeys, settings, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
      this.props.dialogContext.open(NotifyError, { error });
    }
  }

  /**
   * Handle the add passkey click
   */
  async handleAddPasskeyClick() {
    await this.props.mfaContext.startPasskeyRegistration();
  }

  /**
   * Handle the delete passkey click
   * @param {object} passkey the passkey to delete
   */
  handleDeletePasskeyClick(passkey) {
    this.props.dialogContext.open(DeletePasskeyDialog, { passkey, onDeleted: this.loadData });
  }

  /**
   * Handle the manage providers click
   */
  handleManageProvidersClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Is the number of passkeys at the organisation limit
   * @returns {boolean}
   */
  get isLimitReached() {
    return Boolean(this.state.settings) && this.state.passkeys.length >= this.state.settings.max_credentials_per_user;
  }

  /**
   * Is the context processing an action
   * @returns {boolean}
   */
  get isProcessing() {
    return this.props.mfaContext.isProcessing();
  }

  /**
   * Format the creation date as a short date in the user locale
   * @param {string} date
   * @returns {string}
   */
  formatCreatedDate(date) {
    return DateTime.fromISO(date).setLocale(this.props.context.locale).toLocaleString(DateTime.DATE_SHORT);
  }

  /**
   * Format the last used date relatively
   * @param {string|null} date
   * @returns {string}
   */
  formatLastUsed(date) {
    return date ? formatDateTimeAgo(date, this.props.t, this.props.context.locale) : this.props.t("Never");
  }

  /**
   * Render a passkey row
   * @param {object} passkey
   * @returns {JSX}
   */
  renderPasskey(passkey) {
    return (
      <li className="passkey" key={passkey.id}>
        <PasskeyAuthenticatorIcon aaguid={passkey.aaguid} className="passkey-icon" />
        <div className="passkey-details">
          <span className="passkey-name">{passkey.name ?? this.props.t("Passkey")}</span>
          <dl>
            <dt>
              <Trans>Date created:</Trans>
            </dt>
            <dd className="passkey-created">{this.formatCreatedDate(passkey.created)}</dd>
            <dt>
              <Trans>Last used:</Trans>
            </dt>
            <dd className="passkey-last-used">{this.formatLastUsed(passkey.last_used)}</dd>
          </dl>
        </div>
        <button
          type="button"
          className="delete-passkey button-transparent inline"
          onClick={() => this.handleDeletePasskeyClick(passkey)}
          disabled={this.isProcessing}
          aria-label={this.props.t("Delete passkey")}
        >
          <DeleteSVG />
        </button>
      </li>
    );
  }

  /**
   * Render the add passkey button
   * @returns {JSX}
   */
  renderAddPasskeyButton() {
    const button = (
      <button
        type="button"
        className="button primary add-passkey-button"
        onClick={this.handleAddPasskeyClick}
        disabled={this.isLimitReached || this.state.loading || this.isProcessing}
      >
        <AddSVG />
        <span>
          <Trans>Add passkey</Trans>
        </span>
      </button>
    );
    if (this.isLimitReached) {
      return (
        <Tooltip message={this.props.t("The maximum number of passkeys has been reached.")} direction="top">
          {button}
        </Tooltip>
      );
    }
    return button;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="main-column mfa-setup passkeys-setup">
          <div className="main-content">
            <h3>
              <Trans>Passkeys</Trans>
            </h3>
            <p>
              <Trans>Add passkeys as an additional authentication.</Trans>
            </p>
            {this.state.passkeys.length > 0 && (
              <>
                <div className="divider" />
                <ul className="passkeys-list">{this.state.passkeys.map((passkey) => this.renderPasskey(passkey))}</ul>
              </>
            )}
            <div className="add-passkey">{this.renderAddPasskeyButton()}</div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            className="button cancel secondary"
            type="button"
            onClick={this.handleManageProvidersClick}
            disabled={this.isProcessing}
          >
            <Trans>Manage providers</Trans>
          </button>
        </div>
      </>
    );
  }
}

DisplayPasskeys.propTypes = {
  context: PropTypes.object, // the app context
  mfaContext: PropTypes.object, // The mfa context
  dialogContext: PropTypes.object, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withMfa(withDialog(withTranslation("common")(DisplayPasskeys))));
