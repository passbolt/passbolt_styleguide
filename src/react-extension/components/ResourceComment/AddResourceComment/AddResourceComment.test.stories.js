import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockPort from "../../../test/mock/MockPort";
import AddResourceComment from "./AddResourceComment";


export default {
  title: 'Components/ResourceComment/AddComment',
  component: AddResourceComment
};

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: (new URL(window.location.href)).origin
      }
    }
  },
  loggedInUser: {

  },
  port: new MockPort()
};


const Template = args =>
  <AppContext.Provider value={args.context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel aside">
        <div className="comments accordion sidebar-section">
          <div className="accordion-content">
            <Route component={routerProps => <AddResourceComment {...args} {...routerProps}/>}></Route>
          </div>
        </div>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  context: context,
  resource: {
    id: "test"
  },
  onAdd: () => {}
};
