/**
 * Passbolt ~ Open source PasswordComplexity manager for teams
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
import PasswordComplexity from "./PasswordComplexity";

export default {
  title: 'Foundations/PasswordComplexity',
  component: "PasswordComplexity"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity error={true}/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity entropy={29.9}/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity entropy={65.9} error={true}/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity entropy={87.9} error={true}/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity entropy={117.98}/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <PasswordComplexity entropy={158.7}/>
    </div>
  </div>;

export const Default = Template.bind({});
