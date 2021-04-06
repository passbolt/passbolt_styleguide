import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import PasswordSearchBar from "./PasswordSearchBar";


export default {
  title: 'Passbolt/Password/PasswordSearchBar',
  component: PasswordSearchBar
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <PasswordSearchBar {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;



export const Initial = Template.bind({});
