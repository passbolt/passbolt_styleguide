import React from "react";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey";
import {AdminSubscriptionContextProvider} from '../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription';
import {
  defaultProps, expiredProps, goingToExpireProps, notFoundProps, usersExceededProps
} from "./DisplaySubscriptionKey.test.data";


export default {
  title: 'Components/Administration/DisplaySubscriptionKey',
  component: DisplaySubscriptionKey
};

const Template = args =>
  <AdminSubscriptionContextProvider{...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplaySubscriptionKey {...args}/>
      </div>
    </div>
  </AdminSubscriptionContextProvider>
;


export const Initial = Template.bind({});
Initial.args = defaultProps();

export const SubscriptionGoingToExpire = Template.bind({});
SubscriptionGoingToExpire.args = goingToExpireProps();

export const SubscriptionExpired = Template.bind({});
SubscriptionExpired.args = expiredProps();

export const SubscriptionUsersExceeded = Template.bind({});
SubscriptionUsersExceeded.args = usersExceededProps();

export const NoSubscriptionKey = Template.bind({});
NoSubscriptionKey.args = notFoundProps();
