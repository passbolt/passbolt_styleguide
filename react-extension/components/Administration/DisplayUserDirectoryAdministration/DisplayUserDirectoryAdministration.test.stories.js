import React from "react";
import PropTypes from "prop-types";
import DisplayUserDirectoryAdministration from "./DisplayUserDirectoryAdministration";
import {defaultProps, mockUsers, mockResult} from "./DisplayUserDirectoryAdministration.test.data";
import {AdminUserDirectoryContextProvider} from '../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';


export default {
  title: 'Components/Administration/DisplayUserDirectoryAdministration',
  component: DisplayUserDirectoryAdministration
};

const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/directorysync\/settings.json/, async() => mockApiResponse(mockResult));
mockFetch.addGetFetchRequest(/users*/, async() => mockApiResponse(mockUsers));


const Template = args =>
  <AdminUserDirectoryContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayUserDirectoryAdministration {...args}/>
      </div>
    </div>
  </AdminUserDirectoryContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps(null, mockUsers[4].id);
Initial.parameters = {
  css: "api_main"
};
