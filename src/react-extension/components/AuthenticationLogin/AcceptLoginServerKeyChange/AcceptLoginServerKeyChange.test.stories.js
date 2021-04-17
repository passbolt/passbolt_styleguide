import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AcceptLoginServerKeyChange from "./AcceptLoginServerKeyChange";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";


export default {
  title: 'Passbolt/AuthenticationLogin/AcceptLoginServerKeyChange',
  component: AcceptLoginServerKeyChange
};

const context = {
  onGetServerKeyRequested: () => ({fingerprint: "0c1d1761110d1e33c9006d1a5b1b332ed06426d3"})
};


const Template = args =>
  <MockTranslationProvider>
    <AuthenticationContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <AcceptLoginServerKeyChange {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </AuthenticationContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

