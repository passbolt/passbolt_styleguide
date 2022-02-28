/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.0
 */
import React from "react";
import Icon from "../Icons/Icon";

export default {
  title: 'Passbolt/Common/IconButton',
  component: "IconButton"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div style={{width: "25%"}}>
      <a className="button button-icon">
        <Icon name='settings'/>
      </a>
    </div>
    <div style={{width: "25%"}}>
      <a className="button button-icon disabled">
        <Icon name='settings'/>
      </a>
    </div>
    <div style={{width: "25%"}}>
      <a className="button button-icon">
        <Icon name='dice'/>
      </a>
    </div>
    <div style={{width: "25%"}}>
      <a className="button button-icon disabled">
        <Icon name='dice'/>
      </a>
    </div>
  </div>
  ;

export const Default = Template.bind({});
