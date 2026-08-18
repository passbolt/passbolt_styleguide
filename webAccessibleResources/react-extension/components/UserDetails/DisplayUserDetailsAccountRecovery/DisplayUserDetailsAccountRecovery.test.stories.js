/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import { MemoryRouter, Route } from "react-router-dom";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserDetailsAccountRecovery from "./DisplayUserDetailsAccountRecovery";
import {
  defaultProps,
  oneUserAccountRequestsApproved,
  oneUserAccountRequestsPending,
  userAccountRequestsApproved,
  userAccountRequestsApprovedWithPending,
  userAccountRequestsRejected,
  userAccountRequestsRejectedWithPending,
} from "./DisplayUserDetailsAccountRecovery.test.data";

export default {
  title: "Components/UserDetails/DisplayUserDetailsAccountRecovery",
  component: DisplayUserDetailsAccountRecovery,
};

const Template = (args) => (
  <MockTranslationProvider>
    <div className="panel aside">
      <div className="detailed-information">
        <MemoryRouter initialEntries={["/"]}>
          <Route component={(routerProps) => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>
        </MemoryRouter>
      </div>
    </div>
  </MockTranslationProvider>
);

const contextWithLoadingRequest = {
  context: {
    port: {},
  },
};

export const Loading = {
  render: Template,
  args: defaultProps(contextWithLoadingRequest),
};

const contextWithNoAccountRecoveryRequest = {
  context: {
    port: {
      request: () => [],
    },
  },
};

export const NoAccountRecovery = {
  render: Template,
  args: defaultProps(contextWithNoAccountRecoveryRequest),
};

const contextWithPreviousApproved = {
  context: {
    port: {
      request: () => userAccountRequestsApproved,
    },
  },
};

export const AccountRecoveryApproved = {
  render: Template,
  args: defaultProps(contextWithPreviousApproved),
};

const contextWithPreviousRejected = {
  context: {
    port: {
      request: () => userAccountRequestsRejected,
    },
  },
};

export const AccountRecoveryRejected = {
  render: Template,
  args: defaultProps(contextWithPreviousRejected),
};

const contextWithPreviousApprovedAndPending = {
  context: {
    port: {
      request: () => userAccountRequestsApprovedWithPending,
    },
  },
  userWorkspaceContext: {
    details: {
      user: {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        pending_account_recovery_request: { status: "pending" },
      },
    },
  },
};

export const AccountRecoveryApprovedWithPending = {
  render: Template,
  args: defaultProps(contextWithPreviousApprovedAndPending),
};

const contextWithPreviousRejectedAndPending = {
  context: {
    port: {
      request: () => userAccountRequestsRejectedWithPending,
    },
  },
  userWorkspaceContext: {
    details: {
      user: {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        pending_account_recovery_request: { status: "pending" },
      },
    },
  },
};

export const AccountRecoveryRejectedWithPending = {
  render: Template,
  args: defaultProps(contextWithPreviousRejectedAndPending),
};

const contextWithOnePending = {
  context: {
    port: {
      request: () => oneUserAccountRequestsPending,
    },
  },
  userWorkspaceContext: {
    details: {
      user: {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        pending_account_recovery_request: { status: "pending" },
      },
    },
  },
};

export const AccountRecoveryWithOneRequestPending = {
  render: Template,
  args: defaultProps(contextWithOnePending),
};

const contextWithOneRequest = {
  context: {
    port: {
      request: () => oneUserAccountRequestsApproved,
    },
  },
};

export const AccountRecoveryWithOneRequest = {
  render: Template,
  args: defaultProps(contextWithOneRequest),
};
