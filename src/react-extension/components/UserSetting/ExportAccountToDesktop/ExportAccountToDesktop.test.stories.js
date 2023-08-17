import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import ExportAccountToDesktop from "./ExportAccountToDesktop";


export default {
  title: 'Components/UserSetting/ExportAccountToDesktop',
  component: ExportAccountToDesktop
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <div id="container" className="page settings">
      <ExportAccountToDesktop {...args}/>
    </div>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
