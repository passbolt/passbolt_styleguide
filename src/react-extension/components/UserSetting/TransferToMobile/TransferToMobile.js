
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */

import React from 'react';
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import QRCode from 'qrcode';

// Ref. http://blog.qr4.nl/page/QR-Code-Data-Capacity.aspx
const QRCODE_VERSION = 27;
const QRCODE_ERROR_CORRECTION = 'L'
const QRCODE_MAXSLICE = 1465;
const QRCODE_MARGIN = 4;
const QRCCODE_PROTOCOL_VERSION = 1;
const QRCODE_WIDTH = 399;

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
    this.bindHandlers();
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      step: 'start',
      page: 0,
      processing: false,
      qrCodes: undefined,
      slices: undefined,
      debug: true,
    };
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.context.loggedInUser;
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  /**
   * Whenever the user wants to start the transfer
   */
  async handleClickStart() {
    // request passphrase
    // get user key, trusted domain, etc.
    await this.toggleProcessing();

    // try {
       const data = await this.getPrivateData();
       const slices = this.stringToSlice(data);
       const qrCodes = await this.buildQrCodes(slices);
       this.setState({slices, qrCodes}, this.onQrCodesReady);
    // } catch(error) {
    //   // Could be that the user canceled or couldn't remember the passphrase
    //   if (error.name !== "UserAbortsOperationError") {
    //     console.error(error);
    //   }
    //   this.setState({processing: false, step: 'start'});
    // }
  }

  async buildQrCodes(rawData) {
    const qrCodes = [];
    for (let i = 0; i < rawData.length; i++) {
      const qrCode = await this.getQrCode(rawData[i]);
      qrCodes.push(qrCode);
    }
    return qrCodes;
  }

  onQrCodesReady() {
    this.timeout = window.setInterval(() => this.onQrCodeChange(), 250);
  }

  async onQrCodeChange() {
    if (this.state.step !== 'scan') {
      this.setState({step: 'scan', processing: false});
    }
    if (this.state && this.state.qrCodes && this.state.qrCodes.length) {
      let page = this.state.page;
      if (page < this.state.qrCodes.length) {
        await this.updateQrCode(this.state.qrCodes[page]);
        const str = this.sliceToString(this.state.slices[page]);
        page = this.state.page +1; // move to next QR code
        this.setState({page});
      } else {
        window.clearInterval(this.timeout);
        this.timeout = undefined;
        this.setState({step: 'complete', page:0});
      }
    }
  }

  /**
   * Getter for privateData
   * @returns {Promise<string>} base64 encoded JSON string with
   * {user: uuid, fingerprint: string, armored_key: openpgp secret armored key block}
   */
  async getPrivateData() {
    const fingerprint = await this.getFingerprint();
    const privateKey = await this.getPrivateKey();
    return JSON.stringify({user_id: this.user.id, fingerprint, armored_key: privateKey});
  }

  /**
   *
   * @param {string} data
   * @returns {[]}
   */
  stringToSlice(data) {
    const slices = [];

    // 2 reserved byte for page number, max page number 65535
    // 1 reserved byte for protocol version
    const sliceSize = QRCODE_MAXSLICE - (2 + 1);
    const sliceNeeded = Math.ceil(data.length / sliceSize);

    if (sliceNeeded > 65535) {
      throw new Error('Cannot transfer the data, the key is probably too big.');
    }
    for (let i = 0; i < sliceNeeded; i++ ) {
      const start = (i === 0) ? 0 : (i * sliceSize) +1;
      let end = (i === 0) ? (sliceSize * (i+1)) : (sliceSize * (i+1) +1);
      end = (end > data.length) ? data.length : end;
      const page = (i < 255) ? '0' + i.toString() : i.toString();
      const slice = QRCCODE_PROTOCOL_VERSION.toString() + page + data.slice(start, end);
      //console.log(`${start} : ${end} - ${page} / ${sliceNeeded} ${sliceSize}`);
      slices[i] = this.str2bytes(slice);
    }

    return slices;
  }

  sliceToString(slice) {
    let str = '';
    // skip first 3 bytes for protocol + page sizes
    for (let i = 3; i < slice.length; i++) {
      str += String.fromCharCode(slice[i]);
    }
    return str;
  }

  async handleClickCancel() {
    if (this.timeout) {
      window.clearInterval(this.timeout);
    }
    this.setState({step: 'start', page: 0});
  }

  /**
   * Convert a 8bit encoded string into Uint8ClampedArray
   * @param {string} str
   * @returns {Uint8ClampedArray}
   */
  str2bytes(str) {
    const buffer = new Uint8ClampedArray(str.length);
    for (let i=0, strLen=str.length; i < strLen; i++) {
      buffer[i] = str.charCodeAt(i);
    }
    return buffer;
  }

  async updateQrCode(qrcode) {
    const img = document.getElementById('qr-canvas');
    img.src = qrcode;
  }

  /**
   * Populates the component with data
   * @param {Uint8ClampedArray} content
   */
  async getQrCode(content) {
    try {
      return await QRCode.toDataURL([{
        data: content,
        mode: 'byte'
      }], {
        version: QRCODE_VERSION,
        errorCorrectionLevel: QRCODE_ERROR_CORRECTION,
        type: 'image/jpeg',
        quality: 1,
        margin: QRCODE_MARGIN,
      });
    } catch (err) {
      console.error(err)
    }
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

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const processingClassName = this.state.processing ? 'processing' : '';

    return (
      <div className="grid grid-responsive-12 profile-detailed-information">
        <div className="row">
          <div className="profile col7">
          {this.state.step === 'start' &&
            <div>
              <h3>Mobile transfer</h3>
              <p>TODO explain with image</p>
              <a className={`button primary ${processingClassName}`} role="button" onClick={this.handleClickStart}>Start</a>
            </div>
          }
          {this.state.step === 'scan' &&
            <div>
              <h3>Transfer in progress...</h3>
              <img id="qr-canvas" style={{width: QRCODE_WIDTH + 'px', height: QRCODE_WIDTH + 'px'}}/>
              <a className="button cancel" role="button" onClick={this.handleClickCancel}>Cancel</a>
            </div>
          }
          {this.state.step === 'complete' &&
            <div>
              <h3>Transfer complete!</h3>
              <div className="success success-large message animated">
                <div className="illustration">
                  <svg id="successAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 70 70">
                    <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="transparent"/>
                    <polyline id="successAnimationCheck" stroke="#000000" strokeWidth="3" points="23 34 34 43 47 27" linecap="round" fill="transparent"/>
                  </svg>
                </div>
                <div className="additional-information">
                  <p>
                    You are now ready to continue the setup on your phone.
                    See you around.
                  </p>
                  <p className="created date">
                    Added: Sep 12, 6:45 PM.
                  </p>
                  <p>
                    <a className={`button primary${processingClassName}`} role="button" onClick={this.handleClickStart}>Done</a>
                    <a className={`button cancel ${processingClassName}`} role="button" onClick={this.handleClickStart}>Restart</a>
                  </p>
                </div>
              </div>
            </div>
          }
          </div>
          <div className="avatar col5 last">
            <h3>Help</h3>
            <pre>
              TODO
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

TransferToMobile.contextType = AppContext;
TransferToMobile.propTypes = {
  dialogContext: PropTypes.object // The dialog context
};

export default withDialog(TransferToMobile);
