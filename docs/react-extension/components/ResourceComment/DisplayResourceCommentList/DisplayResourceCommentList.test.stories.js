import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DisplayResourceCommentList from "./DisplayResourceCommentList";


export default {
  title: 'Components/ResourceComment/DisplayResourceCommentList',
  component: DisplayResourceCommentList
};

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: (new URL(window.location.href)).origin
      }
    },
  },
  port: {
    request: () => ([{
      children: [],
      content: "This is a comment",
      created: "2020-08-22T13:13:19+00:00",
      created_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
      creator: {
        id: "5247399c-6c8a-47f0-8880-aa854e01e554",
        role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
        active: true,
        deleted: false,
        last_logged_in: "",
        profile: {
          avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
          created: "2020-09-01T13:11:08+00:00",
          first_name: "Ada",
          id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
          last_name: "Lovelace",
          modified: "2020-09-01T13:11:08+00:00",
          user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
        },
      },
      role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
      username: "ada@passbolt.com",
      foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
      foreign_model: "Resource",
      id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
      modified: "2020-09-02T13:13:19+00:00",
      modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
      parent_id: null,
      user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    }, {
      children: [],
      content: "This is another comment",
      created: "2021-09-01T13:13:19+00:00",
      created_by: "5247399c-6c8a-47f0-8880-aa854e01e555",
      creator: {
        id: "5247399c-6c8a-47f0-8880-aa854e01e555",
        role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
        active: true,
        deleted: false,
        last_logged_in: "",
        profile: {
          avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
          created: "2020-09-01T13:11:08+00:00",
          first_name: "Carol",
          id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
          last_name: "Shaw",
          modified: "2020-09-01T13:11:08+00:00",
          user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
        },
      },
      role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
      username: "carol@passbolt.com",
      foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
      foreign_model: "Resource",
      id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
      modified: "2020-09-01T13:13:19+00:00",
      modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
      parent_id: null,
      user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    }, {
      children: [],
      content: "This is a third comment",
      created: "2020-08-25T13:13:19+00:00",
      created_by: "5247399c-6c8a-47f0-8880-aa854e01e556",
      creator: {
        id: "5247399c-6c8a-47f0-8880-aa854e01e556",
        role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
        active: true,
        deleted: false,
        last_logged_in: "",
        profile: {
          avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
          created: "2020-09-01T13:11:08+00:00",
          first_name: "Betty",
          id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
          last_name: "Holberton",
          modified: "2020-09-01T13:11:08+00:00",
          user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
        },
      },
      role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
      username: "betty@passbolt.com",
      foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
      foreign_model: "Resource",
      id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
      modified: "2020-09-01T13:13:19+00:00",
      modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
      parent_id: null,
      user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    }])
  },
  loggedInUser: {
    id: "5247399c-6c8a-47f0-8880-aa854e01e554"
  },
  setContext: () => {}
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel aside">
        <div className="comments accordion sidebar-section">
          <div className="accordion-content">
            <Route component={routerProps => <DisplayResourceCommentList {...args} {...routerProps}/>}></Route>
          </div>
        </div>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  resource: {
    id:  "f302754f-f290-42a6-9ea3-7049c6d4dbe3"
  },
  onFetch: () => {}
};
