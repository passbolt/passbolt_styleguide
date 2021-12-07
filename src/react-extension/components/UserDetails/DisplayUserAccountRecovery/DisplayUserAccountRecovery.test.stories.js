import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserAccountRecovery from "./DisplayUserAccountRecovery";

export default {
  title: 'Passbolt/UserDetails/DisplayUserAccountRecovery',
  component: DisplayUserAccountRecovery
};

const Template = args =>
  <MockTranslationProvider>
    <div className="panel aside">
      <div className="detailed-information">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <DisplayUserAccountRecovery {...args} {...routerProps}/>}></Route>
        </MemoryRouter>
      </div>
    </div>
  </MockTranslationProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  pendingAccountRecoveryRequest: false,
  accountRecoveryRequestsCount: "0",
};

export const AccountRecoveryApproved = Template.bind({});
AccountRecoveryApproved.args = {
  pendingAccountRecoveryRequest: false,
  previousAccountRecoveryRequest: {
    status: "Approved",
    date: "2020-05-13T09:32:49+00:00"
  },
  accountRecoveryRequestsCount: "2",
};

export const AccountRecoveryRejected = Template.bind({});
AccountRecoveryRejected.args = {
  pendingAccountRecoveryRequest: false,
  previousAccountRecoveryRequest: {
    status: "Rejected",
    date: "2020-08-13T09:32:49+00:00"
  },
  accountRecoveryRequestsCount: "1",
};

export const AccountRecoveryPending = Template.bind({});
AccountRecoveryPending.args = {
  pendingAccountRecoveryRequest: true,
  previousAccountRecoveryRequest: {
    status: "Rejected",
    date: "2020-08-13T09:32:49+00:00"
  },
  accountRecoveryRequestsCount: "1",
};
