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
 * @since        3.4.0
 */

import React, {useEffect} from "react";
import InFormIcon from "./InFormIcon";
import ReactDOM from "react-dom";
import "../../../css/themes/default/ext_quickaccess.css";

export default {
  title: 'Passbolt/QuickAccess/InFormIcon',
  component: InFormIcon
};


// Simulate Iframe anchor of In-form components
const InFormAnchor = () => {
  useEffect(() => {
    const loginInput = document.querySelector('input')
    const anchor = document.createElement("div");
    loginInput.parentNode.insertBefore(anchor, loginInput);

    // Find the position to insert the in-form component in regard of the input
    const {top, left, width, height} = loginInput.getBoundingClientRect();
    const leftAnchorPosition = left + width - 25 // 25px inside the input
    const topAnchorPosition = top + (height-16) / 2; // Look for the difference between the input height and the icon size 16
    const containerStyle = {zIndex: 200, position: 'absolute', top: topAnchorPosition, left: leftAnchorPosition};
    const InForm = () => <div style={containerStyle}><InFormIcon/></div>;
    ReactDOM.render(<InForm/>, anchor);
  }, []);
  return (<></>);
}

const Template = () =>
  <div>
    <input
      type="text"
      placeholder="username"/>
    <InFormAnchor/>
  </div>;

export const Initial = Template.bind({});
