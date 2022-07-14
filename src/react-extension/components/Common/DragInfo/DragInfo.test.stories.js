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
 * @since         3.6.0
 */
import React from "react";
import Icon from "../../../../shared/components/Icons/Icon";

export default {
  title: 'Foundations/DragInfo',
  component: "DragInfo"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div style={{width: "50%"}}>
      <div className="drag-and-drop-wrapper" draggable={true} style={{top: "1%"}}>
        <div className="drag-and-drop item-1">
          <span className="message">First name of the resource/folder/user</span>
        </div>
      </div>
    </div>
    <div style={{width: "50%"}}>
      <div className="drag-and-drop-wrapper" draggable={true} style={{top: "1%"}}>
        <div className="drag-and-drop item-2">
          <span className="message">First name of the resource/folder/user</span>
          <span className="count">2</span>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div style={{width: "50%"}}>
      <div className="drag-and-drop-wrapper" draggable={true} style={{top: "8%"}}>
        <div className="drag-and-drop item-n">
          <span className="message">First name of the resource/folder/user</span>
          <span className="count">3</span>
        </div>
      </div>
    </div>
    <div style={{width: "50%"}}>
      <div className="drag-and-drop-wrapper" draggable={true} style={{top: "8%"}}>
        <div className="drag-and-drop item-n">
          <span className="message">First name of the resource/folder/user</span>
          <span className="count">99+</span>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div style={{width: "25%"}}>
      <div className="drag-and-drop-wrapper" draggable={true} style={{top: "15%"}}>
        <div className="drag-and-drop item-1">
          <Icon name="ban"/>
          <span className="message not-allowed">You are not allowed to move this content</span>
        </div>
      </div>
    </div>

  </div>
  ;

export const Default = Template.bind({});
