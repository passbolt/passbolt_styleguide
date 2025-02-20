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

/**
 * Storybook tests on Tootlip in regard of specifications
 */
import React from "react";
import Icon from "../../../../shared/components/Icons/Icon";
import Tooltip from "./Tooltip";

export default {
  title: 'Foundations/Tooltip',
  component: Tooltip
};



const Template = () =>
  <div style={{marginLeft: "auto", marginTop: "20rem", textAlign: "center"}}>
    <div>Put the mouse below</div>
    <Tooltip message="Tool tip placeholder" direction="top">
      <Tooltip message="Tool tip placeholder" direction="right">
        <Tooltip message="Tool tip placeholder" direction="bottom">
          <Tooltip message="Tool tip placeholder" direction="left">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </Tooltip>
    <br/>
    <br/>
    <br/>
    <br/>
    <Tooltip message="Tool tip placeholder" direction="top">
      <Tooltip message="Tool tip placeholder" direction="right">
        <Tooltip message="Tool tip placeholder" direction="bottom">
          <Tooltip message="Tool tip placeholder" direction="left">
            <Icon name="info-circle"/>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </Tooltip>
  </div>;

export const Initial = Template.bind({});
