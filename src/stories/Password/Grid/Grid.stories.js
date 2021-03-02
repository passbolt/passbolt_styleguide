import Grid from "../../../react-extension/components/Password/Grid/Grid";
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

export default {
  title: 'Passbolt/Password/Grid',
  component: Grid
};


const Template = (args) =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={(routerProps) => <Grid {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Empty = Template.bind({});