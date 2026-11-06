import React from "react";
import ResourceViewPageTotp from "./ResourceViewPageTotp";
import { defaultProps, revealedTotpProps } from "./ResourceViewPageTotp.test.data";
import { copiedSecretState } from "./secretState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageTotp",
  component: ResourceViewPageTotp,
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
  args: revealedTotpProps(),
};

export const Copied = {
  args: defaultProps(copiedSecretState("totp")),
};

export const NoRights = {
  args: defaultProps({ canCopy: false, canPreview: false }),
};
