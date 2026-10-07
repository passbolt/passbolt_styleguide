import React from "react";
import ResourceViewPagePassword from "./ResourceViewPagePassword";
import { defaultProps, noUsernameProps, revealedPasswordProps } from "./ResourceViewPagePassword.test.data";
import { defaultSecretRowState } from "./secretRowState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPagePassword",
  component: ResourceViewPagePassword,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <ResourceViewPagePassword {...args} />
      </ul>
    </div>
  </div>
);

const parameters = {
  css: "ext_quickaccess",
};

export const Masked = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const Revealed = {
  render: Template,
  args: revealedPasswordProps(),
  parameters: parameters,
};

export const Copied = {
  render: Template,
  args: defaultProps({ password: defaultSecretRowState({ copyStatus: "done", showTimer: true }) }),
  parameters: parameters,
};

export const NoUsername = {
  render: Template,
  args: noUsernameProps(),
  parameters: parameters,
};

export const NoRights = {
  render: Template,
  args: defaultProps({ canCopy: false, canPreview: false }),
  parameters: parameters,
};
