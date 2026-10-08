import React from "react";
import ResourceViewPagePinCode from "./ResourceViewPagePinCode";
import { defaultProps, revealedPinCodeProps } from "./ResourceViewPagePinCode.test.data";
import { copiedSecretState } from "./secretState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPagePinCode",
  component: ResourceViewPagePinCode,
  decorators: [
    (Story, { args }) => (
      <div className="container quickaccess">
        <div className="resource item-browse">
          <ul className="properties">
            <Story {...args} />
          </ul>
        </div>
      </div>
    ),
  ],
  parameters: {
    css: "ext_quickaccess",
  },
};

export const Masked = {
  args: defaultProps(),
};

export const Revealed = {
  args: revealedPinCodeProps(),
};

export const Copied = {
  args: defaultProps(copiedSecretState("pin_code")),
};

export const NoRights = {
  args: defaultProps({ canCopy: false, canPreview: false }),
};
