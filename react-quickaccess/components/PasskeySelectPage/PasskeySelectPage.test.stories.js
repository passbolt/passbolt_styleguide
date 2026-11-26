import React from "react";
import { MemoryRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PasskeySelectPage from "./PasskeySelectPage";
import { defaultPasskeyGetRequestDto, defaultProps, mockGetRequest } from "./PasskeySelectPage.test.data";
import Header from "../Header/Header";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { defaultAppContext } from "../../contexts/AppContext.test.data";

export default {
  title: "Components/QuickAccess/PasskeySelectPage",
  component: PasskeySelectPage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <div className="container quickaccess">
        <Header />
        <PasskeySelectPage {...args} context={context} />
      </div>
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess",
};

const initialAppContext = defaultAppContext();
mockGetRequest(initialAppContext);

export const Initial = {
  render: Template,
  args: defaultProps({ context: initialAppContext }),
  parameters: parameters,
};

const longNamesAppContext = defaultAppContext();
mockGetRequest(
  longNamesAppContext,
  defaultPasskeyGetRequestDto({
    rp_id: "accounts.a-very-long-subdomain-name-for-a-relying-party.example.com",
    passkeys: [
      {
        id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        name: "A passkey with a very long name that does not fit on one line of the window",
        username: "a.very.long.username.for.this.account@a-very-long-domain.example.com",
      },
      { id: "f848277c-5398-58f8-a82a-72397af2d450", name: "مستخدم بالعربية" },
    ],
  }),
);

export const LongAndRightToLeftNames = {
  render: Template,
  args: defaultProps({ context: longNamesAppContext }),
  parameters: parameters,
};
