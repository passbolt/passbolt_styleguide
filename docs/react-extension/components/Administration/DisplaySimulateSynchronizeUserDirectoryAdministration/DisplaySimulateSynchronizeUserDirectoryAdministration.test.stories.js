import React from "react";
import PropTypes from "prop-types";
import DisplaySimulateSynchronizeUserDirectoryAdministration
  from "./DisplaySimulateSynchronizeUserDirectoryAdministration";
import {AdminUserDirectoryContextProvider} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import {defaultProps} from "../DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import MockFetch from '../../../test/mock/MockFetch';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {mockSynchronizeBody} from "../DisplaySynchronizeUserDirectoryAdministration/DisplaySynchronizeUserDirectoryAdministration.test.data";

export default {
  title: 'Components/Administration/DisplaySimulateSynchronizeUserDirectoryAdministration',
  component: DisplaySimulateSynchronizeUserDirectoryAdministration
};

const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/directorysync\/synchronize\/dry-run/, async() => mockApiResponse(mockSynchronizeBody));

const Template = args =>
  <AdminUserDirectoryContextProvider {...args}>
    <DisplaySimulateSynchronizeUserDirectoryAdministration {...args}/>
  </AdminUserDirectoryContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();
