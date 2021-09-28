import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import LoadingSpinner from "./LoadingSpinner";


export default {
  title: 'Passbolt/Common/LoadingSpinner',
  component: LoadingSpinner
};

const Template = args =>
  <MockTranslationProvider>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <LoadingSpinner {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

export const GenerateKeyAccountRecover = Template.bind({});
GenerateKeyAccountRecover.args = {
  title: "Generating your secret key. Please wait."
};
