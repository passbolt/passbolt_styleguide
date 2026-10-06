import React from "react";
import SecretPropertyRow from "./SecretPropertyRow";
import {
  customFieldProps,
  defaultProps,
  noteProps,
  revealedNoteProps,
  revealedPasswordProps,
  revealedTotpProps,
  totpProps,
} from "./SecretPropertyRow.test.data";

export default {
  title: "Components/QuickAccess/SecretPropertyRow",
  component: SecretPropertyRow,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <SecretPropertyRow {...args} />
      </ul>
    </div>
  </div>
);

const parameters = {
  css: "ext_quickaccess",
};

export const MaskedPassword = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const RevealedPassword = {
  render: Template,
  args: revealedPasswordProps(),
  parameters: parameters,
};

export const DecryptingPassword = {
  render: Template,
  args: defaultProps({ decrypting: true }),
  parameters: parameters,
};

export const CopyingPassword = {
  render: Template,
  args: defaultProps({ copyStatus: "processing" }),
  parameters: parameters,
};

export const CopiedPassword = {
  render: Template,
  args: defaultProps({ copyStatus: "done", showTimer: true }),
  parameters: parameters,
};

export const MaskedTotp = {
  render: Template,
  args: totpProps(),
  parameters: parameters,
};

export const RevealedTotp = {
  render: Template,
  args: revealedTotpProps(),
  parameters: parameters,
};

export const MaskedNote = {
  render: Template,
  args: noteProps(),
  parameters: parameters,
};

export const RevealedNote = {
  render: Template,
  args: revealedNoteProps(),
  parameters: parameters,
};

export const CustomFieldWithoutKey = {
  render: Template,
  args: customFieldProps({ label: "" }),
  parameters: parameters,
};
