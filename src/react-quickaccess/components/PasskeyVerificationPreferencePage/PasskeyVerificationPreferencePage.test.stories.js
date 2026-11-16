/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.18.0
 */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PasskeyVerificationPreferencePage from "./PasskeyVerificationPreferencePage";
import Header from "../Header/Header";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { defaultAppContext } from "../../contexts/AppContext.test.data";

export default {
  title: "Components/QuickAccess/PasskeyVerificationPreferencePage",
  component: PasskeyVerificationPreferencePage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <div className="container quickaccess">
        <Header />
        <PasskeyVerificationPreferencePage {...args} context={context} />
      </div>
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = {
  render: Template,
  args: {
    context: defaultAppContext(),
    requestId: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    rpId: "github.com",
    onComplete: () => {},
  },
  parameters: {
    css: "ext_quickaccess",
  },
};
