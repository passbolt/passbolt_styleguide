import React from "react";
import PropTypes from "prop-types";
import DisplayMfaAdministration from "./DisplayMfaAdministration";


export default {
  title: 'Components/Administration/DisplayMfaAdministration',
  component: DisplayMfaAdministration
};

const Template = args =>
  <div className="page administration"><div className="grid grid-responsive-12">
    <DisplayMfaAdministration {...args}/>
  </div>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  administrationWorkspaceContext: {
    onGetMfaRequested: () => ({
      body: {
        providers: []
      }
    })
  }
};
