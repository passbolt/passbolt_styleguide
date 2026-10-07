import React from "react";
import ResourceViewPageTotp from "./ResourceViewPageTotp";
import { defaultProps, revealedTotpProps } from "./ResourceViewPageTotp.test.data";
import { defaultSecretRowState } from "./secretRowState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageTotp",
  component: ResourceViewPageTotp,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <ResourceViewPageTotp {...args} />
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
  args: revealedTotpProps(),
  parameters: parameters,
};

export const Copied = {
  render: Template,
  args: defaultProps({ totp: defaultSecretRowState({ copyStatus: "done", showTimer: true }) }),
  parameters: parameters,
};

export const NoRights = {
  render: Template,
  args: defaultProps({ canCopy: false, canPreview: false }),
  parameters: parameters,
};
