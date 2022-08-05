import React from "react";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey";
import {
  defaultProps,
  mockSubscriptionExpired, mockSubscriptionGoingToExpire,
  mockSubscriptionUsersExceeded,
  mockUsers
} from "./DisplaySubscriptionKey.test.data";


export default {
  title: 'Components/Administration/DisplaySubscriptionKey',
  component: DisplaySubscriptionKey
};

const Template = args =>
  <div className="grid grid-responsive-12">
    <DisplaySubscriptionKey {...args}/>
  </div>;

export const Initial = Template.bind({});
Initial.args = defaultProps();

const propsSubscriptionGoingToExpire = {
  context: {
    port: {
      request: () => mockUsers
    },
    onGetSubscriptionKeyRequested: () => mockSubscriptionGoingToExpire,
    setContext: jest.fn()
  }
};
export const SubscriptionGoingToExpire = Template.bind({});
SubscriptionGoingToExpire.args = defaultProps(propsSubscriptionGoingToExpire);

const propsSubscriptionExpired = {
  context: {
    port: {
      request: () => mockUsers
    },
    onGetSubscriptionKeyRequested: () => mockSubscriptionExpired,
    setContext: jest.fn()
  }
};
export const SubscriptionExpired = Template.bind({});
SubscriptionExpired.args = defaultProps(propsSubscriptionExpired);

const propsSubscriptionUsersExceeded = {
  context: {
    port: {
      request: () => mockUsers
    },
    onGetSubscriptionKeyRequested: () => mockSubscriptionUsersExceeded,
    setContext: jest.fn()
  }
};
export const SubscriptionUsersExceeded = Template.bind({});
SubscriptionUsersExceeded.args = defaultProps(propsSubscriptionUsersExceeded);


const propsNoSubscriptionKey = {
  context: {
    port: {
      request: () => mockUsers
    },
    onGetSubscriptionKeyRequested: () => {},
    setContext: jest.fn()
  }
};
export const NoSubscriptionKey = Template.bind({});
NoSubscriptionKey.args = defaultProps(propsNoSubscriptionKey);
