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
 * Storybook tests on UserAvatar in regard of specifications
 */
import React from "react";
import UserAvatar from "./UserAvatar";
import {defaultProps} from "./UserAvatar.test.data";

export default {
  title: 'Components/Common/UserAvatar',
  component: UserAvatar
};



const Template = args =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div style={{width: "50%"}}>
      <UserAvatar {...args}/>
    </div>
    <div style={{width: "50%"}}>
      <UserAvatar {...args} attentionRequired={true}/>
    </div>
    <div className="avatar-with-name" style={{width: "50%", marginTop: "2.3rem"}}>
      <UserAvatar {...args}/>
      <div className="details center-cell">
        <span className="name">Name</span>
        <span className="email">name@passbolt.com</span>
      </div>
    </div>
    <div className="avatar-with-name" style={{width: "50%", marginTop: "2.3rem"}}>
      <UserAvatar {...args} attentionRequired={true}/>
      <div className="details center-cell">
        <span className="name">Name</span>
        <span className="email">name@passbolt.com</span>
      </div>
    </div>
  </div>;

export const Initial = Template.bind({});
// eslint-disable-next-line no-undef
Initial.args = defaultProps({baseUrl: process.env.ORIGIN_URL});
