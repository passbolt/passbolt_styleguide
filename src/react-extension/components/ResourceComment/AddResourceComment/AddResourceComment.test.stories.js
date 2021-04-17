import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AddResourceComment from "./AddResourceComment";


export default {
  title: 'Passbolt/ResourceComment/AddComment',
  component: AddResourceComment
};

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: 'some url'
      }
    }
  }
};


const Template = args =>
  <MockTranslationProvider>
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <div className="panel aside">
          <div className="comments">
            <Route component={routerProps => <AddResourceComment {...args} {...routerProps}/>}></Route>
          </div>
        </div>
      </MemoryRouter>
    </AppContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

