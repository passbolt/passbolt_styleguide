import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import NotifyExpiredSession from "./NotifyExpiredSession";


export default {
  title: 'Passbolt/Authentication/NotifyExpiredSession',
  component: NotifyExpiredSession
};

const context = {
};


const Template = args =>
  <MockTranslationProvider>
    <AuthenticationContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <NotifyExpiredSession {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </AuthenticationContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

