import React from "react";
import PropTypes from "prop-types";
import DisplayMfaAdministration from "./DisplayMfaAdministration";
import {AdminMfaContextProvider} from "../../../contexts/Administration/AdministrationMfa/AdministrationMfaContext";
import {defaultProps, mockMfaSettings} from "./DisplayMfaAdministration.test.data";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';

export default {
  title: 'Components/Administration/DisplayMfaAdministration',
  component: DisplayMfaAdministration
};


const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/mfa\/settings/, async() => mockApiResponse(mockMfaSettings));


const Template = args =>
  <AdminMfaContextProvider{...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayMfaAdministration {...args}/>
      </div>
    </div>
  </AdminMfaContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();

