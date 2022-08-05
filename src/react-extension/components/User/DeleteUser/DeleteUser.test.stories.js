import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DeleteUser from "./DeleteUser";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/User/DeleteUser',
  component: DeleteUser
};

const context = {
  deleteUserDialogProps: {
    user: {
      "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "carol@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-05-11T09:32:49+00:00",
      "modified": "2020-05-12T09:32:49+00:00",
      "profile": {
        "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "first_name": "Carol",
        "last_name": "Shaw",
        "created": "2020-05-13T09:32:49+00:00",
        "modified": "2020-05-13T09:32:49+00:00",
        "avatar": {
          "id": "0f769127-3053-45e4-bd8e-75e766bb4d52",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "model": "Avatar",
          "filename": "carol.png",
          "filesize": 733439,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
          "path": "Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.png",
          "adapter": "Local",
          "created": "2020-05-13T09:32:51+00:00",
          "modified": "2020-05-13T09:32:51+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.a99472d5.png",
            "small": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.65a0ba70.png"
          }
        }
      },
      "__placeholder_last_logged_in__": "",
      "last_logged_in": ""
    }
  },
  setContext: () => {},
  port: new MockPort()
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteUser {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: context,
  onClose: () => {}
};
