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
import AppContext from "../../contexts/AppContext";
import MockPort from "../../../react-extension/test/mock/MockPort";
import PropTypes from "prop-types";

export default {
  title: 'Components/WebIntegration/AskInFormMenuDisplay',
  component: AskInFormMenuDisplay
};


// Simulate Iframe anchor of In-form components
const InFormAnchor = ({context}) => {
  useEffect(() => {
    const loginInput = document.querySelector('input');
    const anchor = document.createElement("div");
    loginInput.parentNode.insertBefore(anchor, loginInput);

    // Find the position to insert the in-form component in regard of the input
    const {top, left, width, height} = loginInput.getBoundingClientRect();
    const leftAnchorPosition = left + width - 25; // 25px inside the input
    const topAnchorPosition = top + (height - 16) / 2; // Look for the difference between the input height and the icon size 16
    const containerStyle = {zIndex: 200, position: 'absolute', top: topAnchorPosition, left: leftAnchorPosition};
    const InForm = () =>
      <AppContext.Provider value={context}>
        <div style={containerStyle}>
          <div className="web-integration">
            <AskInFormMenuDisplay/>
          </div>
        </div>
      </AppContext.Provider>;
    ReactDOM.render(<InForm/>, anchor);
  }, []);
  return (<></>);
};

InFormAnchor.propTypes = {
  context: PropTypes.object,
};

const Template = ({context}) =>
  <div>
    <input
      type="text"
      placeholder="username"/>
    <InFormAnchor context={context}/>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_in_form_cta"
};

const inactiveMockedPort = new MockPort();
inactiveMockedPort.addRequestListener('passbolt.in-form-cta.check-status', () => ({isAuthenticated: false, isMfaRequired: false}));
export const Inactive = Template.bind({});
Inactive.args = {
  context: {
    port: inactiveMockedPort
  }
};
Inactive.parameters = parameters;

const activeWithNoSuggestionMockedPort = new MockPort();
activeWithNoSuggestionMockedPort.addRequestListener('passbolt.in-form-cta.check-status', () => ({isAuthenticated: true, isMfaRequired: false}));
activeWithNoSuggestionMockedPort.addRequestListener('passbolt.in-form-cta.suggested-resources', () => 0);
export const ActiveWithNoSuggestion = Template.bind({});
ActiveWithNoSuggestion.args = {
  context: {
    port: activeWithNoSuggestionMockedPort
  }
};
ActiveWithNoSuggestion.parameters = parameters;

const activeWithOneSuggestionMockedPort = new MockPort();
activeWithOneSuggestionMockedPort.addRequestListener('passbolt.in-form-cta.check-status', () => ({isAuthenticated: true, isMfaRequired: false}));
activeWithOneSuggestionMockedPort.addRequestListener('passbolt.in-form-cta.suggested-resources', () => 1);
export const ActiveWithOneSuggestion = Template.bind({});
ActiveWithOneSuggestion.args = {
  context: {
    port: activeWithOneSuggestionMockedPort
  }
};
ActiveWithOneSuggestion.parameters = parameters;
