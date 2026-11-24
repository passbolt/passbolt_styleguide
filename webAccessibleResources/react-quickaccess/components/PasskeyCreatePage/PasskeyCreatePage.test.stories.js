import React from "react";
import { MemoryRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PasskeyCreatePage from "./PasskeyCreatePage";
import { defaultPasskeyCreateRequestDto, defaultProps, mockCreateRequest } from "./PasskeyCreatePage.test.data";
import Header from "../Header/Header";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { defaultAppContext } from "../../contexts/AppContext.test.data";

export default {
  title: "Components/QuickAccess/PasskeyCreatePage",
  component: PasskeyCreatePage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <div className="container quickaccess">
        <Header />
        <PasskeyCreatePage {...args} context={context} />
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
mockCreateRequest(initialAppContext);

export const Initial = {
  render: Template,
  args: defaultProps({ context: initialAppContext }),
  parameters: parameters,
};

const longNamesAppContext = defaultAppContext();
mockCreateRequest(
  longNamesAppContext,
  defaultPasskeyCreateRequestDto({
    rp_id: "accounts.a-very-long-subdomain-name-for-a-relying-party.example.com",
    name: "A site with a very long name that does not fit on one line of the window",
    user_display_name: "مستخدم بالعربية",
  }),
);

export const LongAndRightToLeftNames = {
  render: Template,
  args: defaultProps({ context: longNamesAppContext }),
  parameters: parameters,
};
