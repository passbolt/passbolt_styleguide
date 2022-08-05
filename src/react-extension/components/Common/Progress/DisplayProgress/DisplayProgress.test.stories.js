import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import DisplayProgress from "./DisplayProgress";


export default {
  title: 'Components/Common/DisplayProgress',
  component: DisplayProgress
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <DisplayProgress {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;


export const Initial = Template.bind({});
Initial.args = {
  context: {
    progressDialogProps: {}
  }
};

export const ProgressMessage = Template.bind({});
ProgressMessage.args = {
  context: {
    progressDialogProps: {
      title: "Title",
      goals: 100,
      completed: 50,
      message: "message"
    }
  }
};
