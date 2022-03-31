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
import SelectField from "./SelectField";
import {defaultProps} from "./SelectField.test.data";

export default {
  title: 'Passbolt/Common/SelectField',
  component: "SelectField"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%", marginBottom: ".5rem"}}>Select field</span>
    <div style={{width: "24%", marginRight: "1%"}}>
      <div className="select-field-wrapper input">
        <label>Label</label>
        <SelectField {...defaultProps({id: "select-field1"})} />
      </div>
    </div>
    <div style={{width: "24%", marginRight: "1%"}}>
      <div className="select-field-wrapper input disabled">
        <label>Label</label>
        <SelectField {...defaultProps({id: "select-field2", disabled: true})}/>
      </div>
    </div>
    <div style={{width: "24%", marginRight: "1%"}}>
      <div className="select-field-wrapper input">
        <label>Label</label>
        <SelectField {...defaultProps({id: "select-field3", search: true})}/>
      </div>
    </div>
    <div style={{width: "24%", marginRight: "1%"}}>
      <div className="select-field-wrapper input disabled">
        <label>Label</label>
        <SelectField {...defaultProps({id: "select-field4", disabled: true, search: true})}/>
      </div>
    </div>
    <div style={{width: "24%", marginRight: "1%"}}>
      <div className="select-field-wrapper input disabled">
        <label>Label</label>
        <SelectField {...defaultProps({id: "select-field4", disabled: true, search: true})}/>
      </div>
    </div>
  </div>;

export const Default = Template.bind({});
