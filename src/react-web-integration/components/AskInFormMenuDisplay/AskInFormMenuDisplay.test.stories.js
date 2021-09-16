/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React, {useEffect} from "react";
import AskInFormMenuDisplay from "./AskInFormMenuDisplay";
import ReactDOM from "react-dom";
import "../../../css/themes/default/ext_in_form_cta.css";
import AppContext from "../../contexts/AppContext";

export default {
  title: 'Passbolt/WebIntegration/AskInFormMenuDisplay',
  component: AskInFormMenuDisplay
};


// Simulate Iframe anchor of In-form components
const InFormAnchor = ({context}) => {
  useEffect(() => {
    const loginInput = document.querySelector('input')
    const anchor = document.createElement("div");
    loginInput.parentNode.insertBefore(anchor, loginInput);

    // Find the position to insert the in-form component in regard of the input
    const {top, left, width, height} = loginInput.getBoundingClientRect();
    const leftAnchorPosition = left + width - 25 // 25px inside the input
    const topAnchorPosition = top + (height-16) / 2; // Look for the difference between the input height and the icon size 16
    const containerStyle = {zIndex: 200, position: 'absolute', top: topAnchorPosition, left: leftAnchorPosition};
    const InForm = () =>
      <AppContext.Provider value={context}>
        <div style={containerStyle}>
          <div className="web-integration">
            <AskInFormMenuDisplay/>
          </div>
        </div>
      </AppContext.Provider>
    ReactDOM.render(<InForm/>, anchor);
  }, []);
  return (<></>);
}

const Template = ({context}) =>
  <div>
    <input
      type="text"
      placeholder="username"/>
    <InFormAnchor context={context}/>
  </div>;



export const Inactive = Template.bind({});
Inactive.args = {
  context: {
    port: {
      request: () => {throw {data: {code: 401}}}
    }
  }
};

export const ActiveWithNoSuggestion = Template.bind({});
ActiveWithNoSuggestion.args = {
  context: {
    port: {
      request: () => ({isActive: true, suggestedResourcesCount: 0})
    }
  }
};

export const ActiveWithOneSuggestion = Template.bind({});
ActiveWithOneSuggestion.args = {
  context: {
    port: {
      request: () => ({isActive: true, suggestedResourcesCount: 1})
    }
  }
};
