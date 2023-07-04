import React from "react";
import PropTypes from "prop-types";
import DisplaySynchronizeUserDirectoryAdministration from "./DisplaySynchronizeUserDirectoryAdministration";
import {AdminUserDirectoryContextProvider} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import {defaultProps} from "../DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import MockFetch from '../../../test/mock/MockFetch';
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {mockSynchronizeBody} from "./DisplaySynchronizeUserDirectoryAdministration.test.data";


export default {
  title: 'Components/Administration/DisplaySynchronizeUserDirectoryAdministration',
  component: DisplaySynchronizeUserDirectoryAdministration
};

const mockFetch = new MockFetch();
mockFetch.addPostFetchRequest(/directorysync\/synchronize*/, async() => mockApiResponse(mockSynchronizeBody));

const Template = args =>
  <AdminUserDirectoryContextProvider {...args}>
    <DisplaySynchronizeUserDirectoryAdministration {...args}/>
  </AdminUserDirectoryContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();
