import { MemoryRouter, Route } from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import NavigateIntoUserSettingsWorkspace from "./NavigateIntoUserSettingsWorkspace";
import { defaultProps } from "./NavigateIntoUserSettingsWorkspace.test.data";

export default {
  title: "Components/UserSetting/NavigateIntoUserSettingsWorkspace",
  component: NavigateIntoUserSettingsWorkspace,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <div className="panel">
      <MemoryRouter initialEntries={["/"]}>
        <Route component={(routerProps) => <NavigateIntoUserSettingsWorkspace {...args} {...routerProps} />}></Route>
      </MemoryRouter>
    </div>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = {
  render: Template,

  args: {
    ...defaultProps(),
  },
};

export const PendingAccountRecovery = {
  render: Template,

  args: {
    ...defaultProps(),
    hasPendingAccountRecoveryChoice: true,
  },
};
