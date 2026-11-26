import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import PassphraseDialog from "./PassphraseDialog";
import { defaultAppContext } from "./PassphraseDialog.test.data";
import MockPort from "../../../react-extension/test/mock/MockPort";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/PassphraseDialog",
  component: PassphraseDialog,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route
        component={(routerProps) => (
          <div className="container quickaccess">
            <PassphraseDialog {...args} {...routerProps} />
          </div>
        )}
      />
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess",
};

export const Initial = {
  render: Template,

  args: {
    context: defaultAppContext(),
    requestId: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    classname: "",
    onComplete: () => {},
  },

  parameters: parameters,
};

const passkeyPromptStory = (passkeyPrompt) => ({
  render: Template,

  args: {
    context: defaultAppContext(),
    requestId: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    passkeyPrompt: { rpId: "github.com", ceremony: "get", ...passkeyPrompt },
    onComplete: () => {},
  },

  parameters: parameters,
});

export const PasskeyVerifyOrganisation = passkeyPromptStory({ purpose: "verify-organisation" });
export const PasskeyVerify = passkeyPromptStory({ purpose: "verify" });
export const PasskeyVerifyRegistration = passkeyPromptStory({ purpose: "verify", ceremony: "create" });
export const PasskeyUnlock = passkeyPromptStory({ purpose: "unlock" });
export const PasskeyUnlockRegistration = passkeyPromptStory({ purpose: "unlock", ceremony: "create" });

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.keyring.private.checkpassphrase", () => {
  throw new Error();
});

const contextRequestError = {
  port: mockedPort,
};

export const ErrorPassphrase = {
  render: Template,

  args: {
    context: defaultAppContext(contextRequestError),
    requestId: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    classname: "",
    onComplete: () => {},
  },

  parameters: parameters,
};
