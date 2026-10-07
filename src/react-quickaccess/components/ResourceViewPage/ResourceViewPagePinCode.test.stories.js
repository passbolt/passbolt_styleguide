import React from "react";
import ResourceViewPagePinCode from "./ResourceViewPagePinCode";
import { defaultProps, revealedPinCodeProps } from "./ResourceViewPagePinCode.test.data";
import { defaultSecretRowState } from "./secretRowState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPagePinCode",
  component: ResourceViewPagePinCode,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <ResourceViewPagePinCode {...args} />
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
  args: revealedPinCodeProps(),
  parameters: parameters,
};

export const Copied = {
  render: Template,
  args: defaultProps({ pinCode: defaultSecretRowState({ copyStatus: "done", showTimer: true }) }),
  parameters: parameters,
};

export const NoRights = {
  render: Template,
  args: defaultProps({ canCopy: false, canPreview: false }),
  parameters: parameters,
};
