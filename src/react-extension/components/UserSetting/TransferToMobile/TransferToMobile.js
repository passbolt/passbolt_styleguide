/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from 'react';
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import QRCode from 'qrcode';
import {sha512} from "../../../lib/Crypto/sha512";
import {Trans, withTranslation} from "react-i18next";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import Icon from "../../../../shared/components/Icons/Icon";
import ShowErrorDetails from "../../Common/Error/ShowErrorDetails/ShowErrorDetails";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";
import MobileTransferIcon from "../../Common/Icons/MobileTransferIcon";

// Ref. http://blog.qr4.nl/page/QR-Code-Data-Capacity.aspx
const QRCODE_VERSION = 27;
const QRCODE_ERROR_CORRECTION = 'L';
const QRCODE_MAXSLICE = 1465;
const QRCODE_MARGIN = 4;
const QRCCODE_PROTOCOL_VERSION = 1;
const QRCODE_WIDTH = 325;

const FETCH_INTERVAL = 333; //in ms
const MAX_UINT8 = 255;

/**
 * This component displays the user profile information
 */
class TransferToMobile extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.timeout = undefined;
    this.request = 0;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      step: 'start',
      page: 0,
      processing: false,
      qrCodes: undefined, // QR code cache
      debug: true,
      error: undefined,
      showErrorDetails: false,
      transferDto: undefined
    };
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.context.loggedInUser;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Get current domain
   * @returns {string}
   */
  get domain() {
    return this.context.userSettings.getTrustedDomain();
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
  }

  /**
   * Whenever the user wants to start the transfer
   */
  async handleClickStart() {
    try {
      await this.toggleProcessing();
      await this.createTransfer();
      await this.toggleProcessing();
    } catch (error) {
      // Could be that the user canceled or couldn't remember the passphrase
      if (error.name === "UserAbortsOperationError") {
        return this.handleTransferCancel();
      } else {
        return this.handleTransferError(error);
      }
    }
  }

  /**
   * Build first QR code
   * @param {object} transferDto
   * @param {int} totalPages
   * @param {string} hash
   * @returns {Promise<string>} image data
   */
  async buildFirstQrCode(transferDto, totalPages, hash) {
    // sanity checks
    if (!transferDto) {
      throw new Error(this.translate('Server response is empty.'));
    }

    if (transferDto.total_pages !== totalPages || transferDto.hash !== hash) {
      const error = new Error(this.translate('Server response does not match initial request.'));
      error.data = {transferDto: transferDto, totalPages, hash};
      throw error;
    }

    if (!transferDto.authentication_token || !transferDto.authentication_token.token) {
      throw new Error(this.translate('Authentication token is missing from server response.'));
    }

    const str = this.getTransferMetadataDataAsString(transferDto);
    const slices = this.stringToSlices(str, 0);
    if (!slices || slices.length === 0) {
      throw new Error(this.translate('Sorry, it is not possible to proceed. The first QR code is empty.'));
    }
    if (slices.length > 1) {
      throw new Error(this.translate('Sorry, it is not possible to proceed. The first QR code is too big.'));
    }
    return await this.getQrCode(slices[0]);
  }

  /*
   *
   * Data prep
   *
   */
  /**
   * Get first QR code data
   *
   * @param {object} transferDto
   * @returns {string}
   */
  getTransferMetadataDataAsString(transferDto) {
    return JSON.stringify({
      transfer_id: transferDto.id,
      user_id: this.user.id,
      domain: this.domain,
      total_pages: transferDto.total_pages,
      hash: transferDto.hash,
      authentication_token: transferDto.authentication_token.token
    });
  }

  /**
   * Getter for bulk of the data to transfer
   *
   * @returns {Promise<string>} base64 encoded JSON string with
   * {user: uuid, fingerprint: string, armored_key: openpgp secret armored key block}
   */
  async getTransferDataAsString() {
    const fingerprint = await this.getFingerprint();
    const privateKey = await this.getPrivateKey();
    return JSON.stringify({user_id: this.user.id, fingerprint, armored_key: privateKey});
  }

  /**
   * Get the transfer data hash
   * Will be send to the server so that the client can double check the data integrity
   * at the end of the transfer process
   *
   * @param {string} message
   * @throws {Error} if message is empty or not a string
   * @returns {Promise<string>}
   */
  async getTransferHash(message) {
    return await sha512(message);
  }

  /*
   *
   * QR Code generation
   *
   */
  /**
   * Build QR codes
   * Get the raw data, slices it according to desired QR code size, build QR codes as images
   * @returns {Promise<[]>}
   */
  async buildQrCodes(rawData) {
    const slices = this.stringToSlices(rawData, 1);
    const qrCodes = [];
    for (let i = 0; i < slices.length; i++) {
      const qrCode = await this.getQrCode(slices[i]);
      qrCodes.push(qrCode);
    }
    return qrCodes;
  }

  /**
   * String to slice
   *
   * @param {string} data
   * @param {int} startPage
   * @returns {array} array of strings sliced to fit on the defined QR CODE size
   */
  stringToSlices(data, startPage) {
    const slices = [];

    /*
     * 2 reserved byte for page number, max page number 255
     * 1 reserved byte for protocol version
     */
    const sliceSize = QRCODE_MAXSLICE - (2 + 1);
    const sliceNeeded = Math.ceil(data.length / sliceSize);

    if (sliceNeeded > MAX_UINT8) {
      throw new Error('Cannot transfer the data, the private key is too big.');
    }
    if (typeof startPage === 'undefined') {
      startPage = 0;
    }

    for (let i = 0; i < sliceNeeded; i++) {
      const pageCounter = startPage + i;

      /*
       * Header - Version and page
       * UInt8 => Hex string => Unicode value of the individual characters
       * 255 => "ff" => 70 70
       *
       * Unfortunately we we cannot send these numbers as bytes.
       * This sub optimal encoding is due to compatibility issues with iOS QR Code scanning library
       */
      const version = (QRCCODE_PROTOCOL_VERSION.toString(16));
      const page = (pageCounter.toString(16)).padStart(2, '0');
      const uint8Header = new Uint8ClampedArray([
        version.charCodeAt(0), page.charCodeAt(0), page.charCodeAt(1)
      ]);

      /*
       * Data
       * Similar encoding, but since data is just ASCII chars, one less step
       * "F" => 102
       */
      const start = (i === 0) ? 0 : (i * sliceSize);
      let end = (i === 0) ? (sliceSize) : (sliceSize * (i + 1));
      end = (end > data.length) ? data.length : end;
      const slicedData = data.slice(start, end);
      const uint8Data = this.str2bytes(slicedData);

      // together
      slices[i] = Uint8ClampedArray.from([...uint8Header, ...uint8Data]);
    }

    return slices;
  }

  /**
   * Convert a 8bit encoded string into Uint8ClampedArray
   * @param {string} str
   * @returns {Uint8ClampedArray}
   */
  str2bytes(str) {
    const buffer = new Uint8ClampedArray(str.length);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      buffer[i] = str.charCodeAt(i);
    }
    return buffer;
  }

  /**
   * Populates the component with data
   * @param {Uint8ClampedArray} content
   * @returns {Promise<string>} image data
   */
  async getQrCode(content) {
    try {
      const data = new TextDecoder().decode(content);
      return await QRCode.toDataURL([{
        data: data,
        mode: 'byte'
      }], {
        version: QRCODE_VERSION,
        errorCorrectionLevel: QRCODE_ERROR_CORRECTION,
        type: 'image/jpeg',
        quality: 1,
        margin: QRCODE_MARGIN,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  /*
   *
   * API CALLS
   *
   */
  /**
   * Fetch the user key id
   */
  async getPrivateKey() {
    return await this.context.port.request('passbolt.keyring.get-private-key');
  }

  /**
   * Find a user gpg key
   *
   * @throws {Error} if fingerprint is not available
   * @returns {Promise<String>} fingerprint
   */
  async getFingerprint() {
    const key = await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    if (!key || !key.fingerprint) {
      throw new Error('The user fingerprint is not set.');
    }
    return key.fingerprint;
  }

  /*
   *
   * Transfer state machine
   *
   */
  /**
   * Initiate the exchange by creating a transfer entity server side
   * This will allow the clients to coordinate the transfer
   *
   * @returns {Promise<void>}
   */
  async createTransfer() {
    const rawString = await this.getTransferDataAsString();
    const hash = await this.getTransferHash(rawString);
    const qrCodes = await this.buildQrCodes(rawString);
    const totalPages = qrCodes.length + 1; // +1 for the first QR code with hash and auth token

    try {
      const data = {total_pages: totalPages, hash: hash};
      const transferDto = await this.context.port.request('passbolt.mobile.transfer.create', data);
      const firstQrCode = await this.buildFirstQrCode(transferDto, totalPages, hash);
      qrCodes.unshift(firstQrCode);
      this.setState({qrCodes, step: 'in progress', page: 0, transferDto}, () => {
        this.setInterval();
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get some update
   *
   * @returns {Promise<void>}
   */
  async getUpdatedTransfer() {
    let transferDto;
    try {
      this.request = 1;
      transferDto = await this.context.port.request('passbolt.mobile.transfer.get', this.state.transferDto.id);
      this.request = 0;
    } catch (error) {
      // if there is an error, consider the transfer cancelled
      await this.handleTransferError(error);
      return;
    }

    if (transferDto) {
      switch (transferDto.status) {
        case 'start':
          // update QR code only if the page changed
          break;
        case 'in progress':
          if (transferDto.current_page !== this.state.page) {
            await this.handleTransferUpdated(transferDto);
          }
          break;
        case 'complete':
          await this.handleTransferComplete();
          break;
        case 'error':
          await this.handleTransferError();
          break;
        case 'cancel':
          await this.handleTransferCancelled();
          break;
        default:
          await this.handleTransferError(new Error('Unsupported status'));
          break;
      }
    }
  }

  /**
   * Handle when the transfer was updated
   * Turn pages, etc.
   *
   * @param transferDto
   * @returns {Promise<void>}
   */
  async handleTransferUpdated(transferDto) {
    this.setState({transferDto, step: 'in progress', page: transferDto.current_page});
  }

  /**
   * Tell the server that the transfer is cancelled browser extension side
   * This allows the other client to also give up.
   *
   * @returns {Promise<void>}
   */
  async handleTransferCancel() {
    await this.toggleProcessing();
    this.clearInterval();
    try {
      // cancel server side if we had the time to create a transfer entity there
      if (this.state.transferDto && this.state.transferDto !== 'cancel') {
        const transferDto = {id: this.state.transferDto.id, status: 'cancel'};
        await this.context.port.request('passbolt.mobile.transfer.update', transferDto);
      }
    } catch (error) {
      // not much to recover from
      console.error(error);
    }
    this.setState(this.defaultState);
  }

  /**
   * Tell the server that the transfer is cancelled mobile side
   *
   * @returns {Promise<void>}
   */
  async handleTransferCancelled() {
    this.clearInterval();
    const cancelState = this.defaultState;
    cancelState.step = 'cancel';
    this.setState(cancelState);
  }

  /**
   * When the transfer is over
   * @returns {Promise<void>}
   */
  async handleTransferComplete() {
    this.clearInterval();
    const completeState = this.defaultState;
    completeState.step = 'complete';
    this.setState(completeState);
  }

  /**
   * When the transfer is reporting an issue
   * @returns {Promise<void>}
   */
  async handleTransferError(error) {
    this.clearInterval();
    if (!error) {
      const msg = this.translate('The transfer was cancelled because the other client returned an error.');
      error = new Error(msg);
    }
    this.handleError(error);
  }

  /*
   *
   * Update polling
   *
   */
  /**
   * componentWillUnmount
   * This method is called when a component is being removed from the DOM
   */
  componentWillUnmount() {
    this.clearInterval();
  }

  /**
   * Add an interval to fetch transfer update
   */
  setInterval() {
    this.timeout = window.setInterval(() => {
      // throttle requests so that there is only one pending at a given time
      if (this.request === 0) {
        this.getUpdatedTransfer();
      }
    }, FETCH_INTERVAL);
  }

  /**
   * Remove the interval fetching the last transfer update
   */
  clearInterval() {
    if (this.timeout) {
      window.clearInterval(this.timeout);
      this.timeout = null;
    }
    this.request = 0;
  }

  /*
   *
   * UI related events
   *
   */
  /**
   * What happens when the user clicks cancel
   *
   * @returns {Promise<void>}
   */
  async handleClickCancel() {
    this.handleTransferCancel();
  }

  /**
   * When the transfer is over and one wants to restart
   * @returns {Promise<void>}
   */
  async handleClickDone() {
    this.clearInterval();
    this.setState(this.defaultState);
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /*
   *
   * JSX Helpers
   *
   */
  /**
   * Handle error to display the error info and retry
   * @param {Error} error
   */
  handleError(error) {
    console.error(error);
    this.setState({step: 'error', error});
  }

  /**
   * Return the current QR code src (inline image)
   * @returns {string|*}
   */
  getCurrentQrCodeSrc() {
    if (typeof this.state.qrCodes[this.state.page] === 'undefined') {
      // TODO display something...
      return '';
    }
    return this.state.qrCodes[this.state.page];
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const processingClassName = this.state.processing ? 'processing' : '';
    return (
      <div className="grid grid-responsive-12 profile-mobile-transfer">
        <div className="row">
          {this.state.step === 'start' &&
          <>
            <div className="profile col6 main-column mobile-transfer-step-start">
              <h3><Trans>Welcome to the mobile app setup</Trans></h3>
              <h4 className="no-border"><Trans>Download the mobile app</Trans></h4>
              <p>
                <Trans>Passbolt is available on AppStore & PlayStore</Trans>
              </p>
              <a className="app-store" href="https://apps.apple.com/lv/app/passbolt-password-manager/id1569629432" target="_blank" rel="noopener noreferrer"></a>
              <a className="play-store" href="https://play.google.com/store/apps/details?id=com.passbolt.mobile.android" target="_blank" rel="noopener noreferrer"></a>
              <h4><Trans>Transfer your account key</Trans></h4>
              <div className="transfer-account">
                <MobileTransferIcon/>
                <div className="submit-wrapper">
                  <p><Trans>Click here to start once the mobile application is installed and opened on your phone and you are ready to scan QR codes.</Trans></p>
                  <button type="button" className={`button primary ${processingClassName}`} role="button" onClick={this.handleClickStart}>
                    <Trans>Start</Trans>
                  </button>
                </div>
              </div>
            </div>
            <div className="col4 last">
              <div className="sidebar-help">
                <h3><Trans>Get started in 5 easy steps</Trans></h3>
                <p><Trans>1. Install the application from the store.</Trans></p>
                <p><Trans>2. Open the application on your phone.</Trans></p>
                <p><strong><Trans>3. Click start, here, in your browser.</Trans></strong></p>
                <p><Trans>4. Scan the QR codes with your phone.</Trans></p>
                <p><Trans>5. And you are done!</Trans></p>
                <a className="button" href="https://help.passbolt.com/" target="_blank" rel="noopener noreferrer">
                  <Icon name="document"/>
                  <span><Trans>Read the documentation</Trans></span>
                </a>
              </div>
            </div>
          </>
          }
          {this.state.step === 'in progress' &&
            <>
              <div className="profile col6 main-column mobile-transfer-step-in-progress">
                <h3><Trans>Transfer in progress...</Trans></h3>
                <img id="qr-canvas" style={{width: `${QRCODE_WIDTH}px`, height: `${QRCODE_WIDTH}px`}} src={this.getCurrentQrCodeSrc()}/>
                <div className="submit-wrapper">
                  <button className={`button cancel ${processingClassName}`} type="button" onClick={this.handleClickCancel}>
                    <Trans>Cancel</Trans>
                  </button>
                </div>
              </div>
              <div className="col4 last">
                <div className="sidebar-help">
                  <h3><Trans>Get started in 5 easy steps</Trans></h3>
                  <p><Trans>1. Install the application from the store.</Trans></p>
                  <p><Trans>2. Open the application on your phone.</Trans></p>
                  <p><Trans>3. Click start, here, in your browser.</Trans></p>
                  <p><Trans><strong>4. Scan the QR codes with your phone.</strong></Trans></p>
                  <p><Trans>5. And you are done!</Trans></p>
                  <a className="button" href="https://help.passbolt.com/" target="_blank" rel="noopener noreferrer">
                    <Icon name="document"/>
                    <span><Trans>Read the documentation</Trans></span>
                  </a>
                </div>
              </div>
            </>
          }
          {this.state.step === 'complete' &&
            <>
              <div className="profile main-column col6 mobile-transfer-step-complete">
                <h3><Trans>Transfer complete!</Trans></h3>
                <div className="feedback-card">
                  <AnimatedFeedback name='success' />
                  <div className="additional-information">
                    <p>
                      <Trans>You are now ready to continue the setup on your phone.</Trans>&nbsp;
                      <Trans>You can restart this process if you want to configure another phone.</Trans>
                    </p>
                    <div className="submit-wrapper">
                      <button className={`button primary ${processingClassName}`} type="button" onClick={this.handleClickDone}>
                        <Trans>Configure another phone</Trans>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col4 last">
                <div className="sidebar-help">
                  <h3><Trans>Get started in 5 easy steps</Trans></h3>
                  <p><Trans>1. Install the application from the store.</Trans></p>
                  <p><Trans>2. Open the application on your phone.</Trans></p>
                  <p><Trans>3. Click start, here, in your browser.</Trans></p>
                  <p><Trans>4. Scan the QR codes with your phone.</Trans></p>
                  <p><Trans><strong>5. And you are done!</strong></Trans></p>
                  <a className="button" href="https://help.passbolt.com/" target="_blank" rel="noopener noreferrer">
                    <Icon name="document"/>
                    <span><Trans>Read the documentation</Trans></span>
                  </a>
                </div>
              </div>
            </>
          }
          {this.state.step === 'cancel' &&
          <>
            <div className="profile main-column col6 mobile-transfer-step-error">
              <h3><Trans>The operation was cancelled.</Trans></h3>
              <div className="feedback-card">
                <AnimatedFeedback name='error' />
                <div className="additional-information">
                  <p>
                    <Trans>If there was an issue during the transfer, either the operation was cancelled on the mobile side,
                      or the authentication token expired.</Trans>&nbsp;
                    <Trans>Please try again later or contact your administrator.</Trans>
                  </p>
                  <div className="submit-wrapper">
                    <button className={`button primary ${processingClassName}`} type="button" onClick={this.handleClickStart}>
                      <Trans>Restart</Trans>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col4 last">
              <div className="sidebar-help">
                <h3><Trans>Need some help?</Trans></h3>
                <p><Trans>Contact your administrator with details about what went wrong.</Trans></p>
                <p><Trans>Alternatively you can also get in touch with support on community forum or via the paid support channels.</Trans></p>
                <a className="button" href="https://help.passbolt.com/" target="_blank" rel="noopener noreferrer">
                  <Icon name="document"/>
                  <span><Trans>Help site</Trans></span>
                </a>
              </div>
            </div>
          </>
          }
          {this.state.step === 'error' &&
          <>
            <div className="profile col6 main-column mobile-transfer-step-error">
              <h3><Trans>Oops, something went wrong</Trans></h3>
              <div className="feedback-card">
                <AnimatedFeedback name='error' />
                <div className="additional-information">
                  <p>
                    <Trans>There was an issue during the transfer. Please try again later or contact your administrator.</Trans>
                  </p>
                  <div className="submit-wrapper">
                    <button className={`button primary ${processingClassName}`} type="button" onClick={this.handleClickStart}>
                      <Trans>Restart</Trans>
                    </button>
                  </div>
                </div>
              </div>
              <ShowErrorDetails error={this.state.error} />
            </div>
            <div className="col4 last">
              <div className="sidebar-help">
                <h3><Trans>Need some help?</Trans></h3>
                <p><Trans>Contact your administrator with the error details.</Trans></p>
                <p><Trans>Alternatively you can also get in touch with support on community forum or via the paid support channels.</Trans></p>
                <a className="button" href="https://help.passbolt.com/" target="_blank" rel="noopener noreferrer">
                  <Icon name="document"/>
                  <span><Trans>Help site</Trans></span>
                </a>
              </div>
            </div>
          </>
          }
        </div>
      </div>
    );
  }
}

TransferToMobile.contextType = AppContext;
TransferToMobile.propTypes = {
  dialogContext: PropTypes.object, // The dialog context
  userSettingsContext: PropTypes.object, // The user settings context
  t: PropTypes.func, // The translation function
  i18n: PropTypes.any // The i18n context translation
};

export default withDialog(withUserSettings(withTranslation('common')(TransferToMobile)));
