import React from "react";
import PropTypes from "prop-types";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import UsePasskeyOnThisPage from "./UsePasskeyOnThisPage";
import { defaultProps, defaultTabPendingPasskeyRequestDto, mockTab } from "./UsePasskeyOnThisPage.test.data";

export default {
  title: "Components/QuickAccess/UsePasskeyOnThisPage",
  component: UsePasskeyOnThisPage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <div className="container quickaccess">
      <div className="submit-wrapper input">
        <UsePasskeyOnThisPage {...args} context={context} />
      </div>
    </div>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess",
};

const waitingProps = defaultProps({ context: defaultAppContext() });
mockTab(waitingProps.context, "https://example.com/login", [
  defaultTabPendingPasskeyRequestDto({ passkey_ids: [waitingProps.resource.id] }),
]);

export const WaitingSignIn = {
  render: Template,
  args: waitingProps,
  parameters: parameters,
};

const nothingWaitingProps = defaultProps({ context: defaultAppContext() });
mockTab(nothingWaitingProps.context, "https://example.com/login");

export const NothingWaiting = {
  render: Template,
  args: nothingWaitingProps,
  parameters: parameters,
};

const differentPasskeyProps = defaultProps({ context: defaultAppContext() });
mockTab(differentPasskeyProps.context, "https://example.com/login", [defaultTabPendingPasskeyRequestDto()]);

export const DifferentPasskeyAsked = {
  render: Template,
  args: differentPasskeyProps,
  parameters: parameters,
};
