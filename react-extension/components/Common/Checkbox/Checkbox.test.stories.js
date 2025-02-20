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
  title: 'Foundations/Checkbox',
  component: "Checkbox"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox1" checked={false} disabled={false} readOnly={true}/>
      <label htmlFor="checkbox1"/>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox2" checked={false} disabled={true} readOnly={true}/>
      <label htmlFor="checkbox2"/>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox3" checked={true} disabled={false} readOnly={true}/>
      <label htmlFor="checkbox3"/>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox4" checked={true} disabled={true} readOnly={true}/>
      <label htmlFor="checkbox4"/>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox5" checked={false} disabled={false} readOnly={true}/>
      <label htmlFor="checkbox5">Label</label>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox6" checked={false} disabled={true} readOnly={true}/>
      <label htmlFor="checkbox6">Label</label>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox7" checked={true} disabled={false} readOnly={true}/>
      <label htmlFor="checkbox7">Label</label>
    </div>
    <div className="input checkbox" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox8" checked={true} disabled={true} readOnly={true}/>
      <label htmlFor="checkbox8">Label</label>
    </div>
    <div className="input checkbox error" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox9" checked={false} disabled={false} readOnly={true}/>
      <label htmlFor="checkbox9">Label</label>
    </div>
    <div className="input checkbox error" style={{width: "25%"}}>
      <input type="checkbox" id="checkbox10" checked={true} disabled={false} readOnly={true}/>
      <label htmlFor="checkbox10">Label</label>
    </div>
  </div>
  ;

export const Default = Template.bind({});
