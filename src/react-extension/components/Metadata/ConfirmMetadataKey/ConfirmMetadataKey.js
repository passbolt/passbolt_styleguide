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
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";

class ConfirmMetadataKey extends Component {
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
      processing: false
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleMoreInformationClicked = this.handleMoreInformationClicked.bind(this);
  }

  /**
   * Get the user who created the metadata key.
   * @returns {object}
   */
  get creator() {
    return this.metadataKey?.creator || {profile: {first_name: this.translate("unknown"), last_name: this.translate("unknown")}};
  }

  /**
   * Get the trusted metadata key.
   * @returns {object}
   */
  get metadataTrustedKey() {
    return this.props.confirmMetadataKey.metadataTrustedKey;
  }

  /**
   * Get the metadata key.
   * @returns {object}
   */
  get metadataKey() {
    return this.props.confirmMetadataKey.metadataKey;
  }

  /**
   * Get the creator name.
   * @returns {string}
   */
  get creatorName() {
    return `${this.creator.profile.first_name} ${this.creator.profile.last_name}`;
  }

  /**
   * Close the dialog.
   */
  close() {
    this.props.context.port.emit(this.props.requestId, false);
    this.props.onClose();
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
    this.setState({openMoreInformation: !this.state.openMoreInformation});
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    this.setState({processing: true});
    this.props.context.port.emit(this.props.requestId, true);
    this.setState({processing: false});
    this.props.onClose();
  }

  /**
   * Is metadata key rotation
   * @returns {boolean}
   */
  get isMetadataKeyRotation() {
    const signedDate = this.metadataTrustedKey.signed;
    const newMetadataSignedDate = this.metadataKey.metadata_private_keys?.[0]?.data_signed_by_current_user;
    return newMetadataSignedDate > signedDate;
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
    const creatorName = this.creatorName;
    const isMetadataKeyRotation = this.isMetadataKeyRotation;
    return (
      <DialogWrapper className="confirm-metadata-key-dialog"  title={this.translate("The metadata key has changed.")} onClose={this.handleCloseClick}>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-content">
            <ul>
              <li className="usercard-detailed-col-2">
                <div className="content-wrapper">
                  <div className="content">
                    <div>
                      <span className="name"><Trans>The encryption key used to share metadata between users has been updated by <span className="creator">{{creatorName}}</span>.</Trans></span>
                    </div>
                  </div>
                </div>
                <UserAvatar
                  user={this.creator}
                  baseUrl={this.props.context.userSettings.getTrustedDomain()}
                  attentionRequired={false}/>
              </li>
            </ul>
            <p>
              {isMetadataKeyRotation &&
                <Trans>If you weren’t expecting this, you can verify with your administrator.</Trans>
              }
              {!isMetadataKeyRotation &&
                <Trans>This is unusual, please verify with your administrator.</Trans>
              }
            </p>
            <div className="accordion accordion-section no-margin-divider no-padding-bottom">
              <div className="accordion-header" onClick={this.handleMoreInformationClicked}>
                <h4>
                  <button type="button" className="no-border">
                    <span><Trans>More information</Trans></span>
                    {this.state.openMoreInformation
                      ? <CaretDownSVG className="baseline svg-icon"/>
                      : <CaretRightSVG className="baseline svg-icon"/>
                    }
                  </button>
                </h4>
              </div>
              {this.state.openMoreInformation &&
                <div className="accordion-content">
                  <p>
                    {isMetadataKeyRotation &&
                      <Trans>Your administrator may have rotated the metadata key and you need to trust it prior to its usage.</Trans>
                    }
                    {!isMetadataKeyRotation &&
                      <Trans>Your administrator may have rolled back the metadata key and you need to trust it prior to its usage.</Trans>
                    }

                  </p>
                  <div className="information-details">
                    <div className="info-type">
                      <Trans>Key fingerprint</Trans>
                    </div>
                    <div className="info-data">
                      <Fingerprint fingerprint={this.metadataKey.fingerprint}/>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.state.processing} onClick={this.handleCloseClick}></FormCancelButton>
            <FormSubmitButton disabled={this.state.processing} processing={this.state.processing} warning={!isMetadataKeyRotation} attention={isMetadataKeyRotation} value={this.translate(isMetadataKeyRotation ? "Trust the new key" : "Trust the key")}></FormSubmitButton>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmMetadataKey.propTypes = {
  context: PropTypes.object, // The application context
  requestId: PropTypes.string.isRequired, // The request id
  confirmMetadataKey: PropTypes.object.isRequired, // Object containing the previous metadata key trusted and the new one to trust
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ConfirmMetadataKey));
