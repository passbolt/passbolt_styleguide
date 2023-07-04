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

export default {
  title: 'Foundations/Toggle',
  component: "Toggle"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={false} checked={true} readOnly={true}/>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={false} checked={false} readOnly={true}/>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={true} checked={true} readOnly={true}/>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={true} checked={false} readOnly={true}/>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={false} checked={true} readOnly={true} id="toggle1"/>
      <label htmlFor="toggle1">Label</label>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={false} checked={false} readOnly={true} id="toggle2"/>
      <label htmlFor="toggle2">Label</label>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={true} checked={true} readOnly={true} id="toggle3"/>
      <label htmlFor="toggle3">Label</label>
    </div>
    <div className="input toggle-switch" style={{width: "25%"}}>
      <input type="checkbox" className="toggle-switch-checkbox checkbox" disabled={true} checked={false} readOnly={true} id="toggle4"/>
      <label htmlFor="toggle4">Label</label>
    </div>
  </div>;

export const Default = Template.bind({});
