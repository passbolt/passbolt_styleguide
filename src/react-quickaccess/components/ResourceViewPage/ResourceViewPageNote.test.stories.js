import React from "react";
import ResourceViewPageNote from "./ResourceViewPageNote";
import { defaultProps, revealedNoteProps } from "./ResourceViewPageNote.test.data";
import { defaultSecretRowState } from "./secretRowState.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageNote",
  component: ResourceViewPageNote,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <ResourceViewPageNote {...args} />
      </ul>
    </div>
  </div>
);

const parameters = {
  css: "ext_quickaccess",
};

export const Hidden = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const Revealed = {
  render: Template,
  args: revealedNoteProps(),
  parameters: parameters,
};

export const Copied = {
  render: Template,
  args: defaultProps({ note: defaultSecretRowState({ copyStatus: "done", showTimer: true }) }),
  parameters: parameters,
};

export const NoRights = {
  render: Template,
  args: defaultProps({ canCopy: false, canPreview: false }),
  parameters: parameters,
};
