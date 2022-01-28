import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayExpiredAccountRecovery from "./DisplayExpiredAccountRecovery";


export default {
  title: 'Passbolt/User/DisplayExpiredAccountRecovery',
  component: DisplayExpiredAccountRecovery
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayExpiredAccountRecovery {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;

export const Initial = Template.bind({});
