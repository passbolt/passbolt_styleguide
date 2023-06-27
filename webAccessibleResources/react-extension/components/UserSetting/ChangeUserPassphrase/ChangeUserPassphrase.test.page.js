
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
 * @since         3.1.0
 */
import {render} from "@testing-library/react";
import React from "react";
import ChangeUserPassphrase from "./ChangeUserPassphrase";

/**
 * The ChangeUserPassphrase component represented as a page
 */
export default class ChangeUserPassphrasePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <ChangeUserPassphrase {...props}/>
    );
  }

  /**
   * Returns the loading element
   */
  get loading() {
    const element = this._page.container.querySelector('.loading');
    return {
      exists() {
        return element !== null;
      }
    };
  }

  /**
   * Returns the introduction element
   */
  get introduction() {
    const element = this._page.container.querySelector('.introduction');
    return {
      exists() {
        return element !== null;
      }
    };
  }

  /**
   * Returns the confirm passphrase element
   */
  get confirmPassphrase() {
    const element = this._page.container.querySelector('.confirm');
    return {
      exists() {
        return element !== null;
      }
    };
  }

  /**
   * Returns the update passphrase element
   */
  get updatePassphrase() {
    const element = this._page.container.querySelector('.update');
    return {
      exists() {
        return element !== null;
      }
    };
  }

  /**
   * Returns the download backup element
   */
  get downloadBackup() {
    const element = this._page.container.querySelector('.download');
    return {
      exists() {
        return element !== null;
      }
    };
  }
}





