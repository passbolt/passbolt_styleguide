import React from "react";
import ResourceViewPageNote from "./ResourceViewPageNote";
import { defaultProps, revealedNoteProps } from "./ResourceViewPageNote.test.data";
import { copiedSecretState } from "./secretState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageNote",
  component: ResourceViewPageNote,
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

export const Hidden = {
  args: defaultProps(),
};

export const Revealed = {
  args: revealedNoteProps(),
};

export const Copied = {
  args: defaultProps(copiedSecretState("note")),
};

export const NoRights = {
  args: defaultProps({ canCopy: false, canPreview: false }),
};
