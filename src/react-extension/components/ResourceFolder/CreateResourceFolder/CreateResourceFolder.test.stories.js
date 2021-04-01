import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import CreateResourceFolder from "./CreateResourceFolder";


export default {
  title: 'Passbolt/ResourceFolder/CreateResourceFolder',
  component: CreateResourceFolder
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <CreateResourceFolder {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});


