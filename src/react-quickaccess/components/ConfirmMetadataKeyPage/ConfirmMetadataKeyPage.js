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
 * @since         5.1.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import CaretDownSVG from "../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import CloseSVG from "../../../img/svg/close.svg";

class ConfirmMetadataKeyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Default state
   * @returns {*}
   */
  get defaultState() {
    return {
      openMoreInformation: false,
      processing: false,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleMoreInformationClicked = this.handleMoreInformationClicked.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Close the dialog.
   */
  close() {
    this.props.context.port.emit(this.props.requestId, "SUCCESS", false);
    this.props.onComplete();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.close();
  }

  /**
   * Handle more information button click.
   */
  handleMoreInformationClicked() {
    this.setState({ openMoreInformation: !this.state.openMoreInformation });
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    this.setState({ processing: true });
    this.props.context.port.emit(this.props.requestId, "SUCCESS", true);
    this.setState({ processing: false });
    this.props.onComplete();
  }

  /**
   * Is metadata key rotation
   * @returns {boolean}
   */
  get isMetadataKeyRotation() {
    // The key would not be already signed for a rotation.
    return this.props.metadataKey.metadataPrivateKeys?.items?.[0]?.dataSignedByCurrentUser === null;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Handle key down event
   * @param {ReactEvent} event The triggered event
   */
  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // If not stop it will bubble to the QuickAccess component and it will close the quickaccess dialog.
      event.stopPropagation();
      this.close();
    }
  }

  render() {
    const isMetadataKeyRotation = this.isMetadataKeyRotation;
    const creatorName = this.props.metadataKey?.creator ? (
      <>
        {this.props.metadataKey?.creator?.profile?.name} ({this.props.metadataKey?.creator.username})
      </>
    ) : (
      this.translate("Unknown user")
    );

    return (
      <div className="confirm-metadata-key" onKeyDown={this.handleKeyDown}>
        <div className="back-link">
          <a className="primary-action">
            <span className="primary-action-title">
              <Trans>The metadata key has changed</Trans>
            </span>
          </a>
          <a
            onClick={this.handleCloseClick}
            className="secondary-action button-transparent button"
            title={this.translate("Cancel the operation")}
          >
            <CloseSVG className="close" />
            <span className="visually-hidden">
              <Trans>Cancel</Trans>
            </span>
          </a>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-container">
            <p>
              <Trans>
                The encryption key used to share metadata between users has been updated by{" "}
                <span className="creator">{{ creatorName }}</span>.
              </Trans>
            </p>
            <p>
              {isMetadataKeyRotation && (
                <Trans>If you weren’t expecting this, you can verify with your administrator.</Trans>
              )}
              {!isMetadataKeyRotation && <Trans>This is unusual, please verify with your administrator.</Trans>}
            </p>
            <div className="accordion accordion-section no-margin-divider no-padding-bottom">
              <div className="accordion-header" onClick={this.handleMoreInformationClicked}>
                <h4>
                  <button type="button" className="no-border">
                    <span>
                      <Trans>More information</Trans>
                    </span>
                    {this.state.openMoreInformation ? (
                      <CaretDownSVG className="baseline svg-icon" />
                    ) : (
                      <CaretRightSVG className="baseline svg-icon" />
                    )}
                  </button>
                </h4>
              </div>
              {this.state.openMoreInformation && (
                <div className="accordion-content">
                  <p>
                    {isMetadataKeyRotation && (
                      <Trans>
                        Your administrator may have rotated the metadata key and you need to trust it prior to its
                        usage.
                      </Trans>
                    )}
                    {!isMetadataKeyRotation && (
                      <Trans>
                        Your administrator may have rolled back the metadata key and you need to trust it prior to its
                        usage.
                      </Trans>
                    )}
                  </p>
                  <div className="information-details">
                    <div className="info-type">
                      <Trans>Key fingerprint</Trans>
                    </div>
                    <div className="info-data">
                      <div className="fingerprint">
                        <div className="fingerprint-line">
                          {this.props.metadataKey.fingerprint?.substring(0, 20)?.replace(/.{4}/g, "$& ")}
                        </div>
                        <div className="fingerprint-line">
                          {this.props.metadataKey.fingerprint?.substring(20)?.replace(/.{4}/g, "$& ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="submit-wrapper">
            <button
              type="submit"
              className={`button primary full-width ${this.state.processing ? "processing" : ""} ${isMetadataKeyRotation ? "attention" : "warning"}`}
              disabled={this.state.processing}
            >
              {this.translate(isMetadataKeyRotation ? "Trust the new key" : "Trust the key")}
              {this.state.processing && <SpinnerSVG />}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ConfirmMetadataKeyPage.propTypes = {
  context: PropTypes.object, // The application context
  requestId: PropTypes.string.isRequired, // The request id
  metadataKey: PropTypes.object.isRequired, // New metadata key entity
  metadataTrustedKey: PropTypes.object.isRequired, // Trusted metadata key entity
  onComplete: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(ConfirmMetadataKeyPage));
