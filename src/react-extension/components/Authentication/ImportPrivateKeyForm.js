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
 * @since         3.0.0
 */
import React, {Component} from "react";

class ImportPrivateKeyForm extends Component {
  render() {
    return (
      <div className="import-private-key">
        <h1>Please enter your private key to continue.</h1>
        <form acceptCharset="utf-8">
          <div className="input textarea required openpgp-key">
            <label htmlFor="private-key">Private key</label>
            <textarea name="private-key" placeholder="Your OpenPGP private key block" required="required"/>
          </div>
          <div className="input-file-chooser-wrapper">
            <div className="input text">
              <input type="file" ref={this.fileUploaderRef} onChange={this.handleFileSelected}/>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="button primary big" role="button">Verify</button>
            <a href="#">Help, I lost my private key.</a>
          </div>
        </form>
      </div>
    );
  }
}

export default ImportPrivateKeyForm;
