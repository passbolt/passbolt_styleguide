import React from "react";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey";
import {AdminSubscriptionContextProvider} from '../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription';
import {
  defaultProps, expiredProps, goingToExpireProps, notFoundProps, usersExceededProps
} from "./DisplaySubscriptionKey.test.data";


export default {
  title: 'Components/Administration/DisplaySubscriptionKey',
  component: DisplaySubscriptionKey,
  decorators: [(Story, {args}) =>
    <AdminSubscriptionContextProvider{...args}>
      <div id="container" className="page administration">
        <div id="app" className="app" tabIndex="1000">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="breadcrumbs-and-grid">
                  <div className="main-page">
                    <Story {...args}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSubscriptionContextProvider>
  ]
};

export const Initial = {
  args: defaultProps()
};

export const SubscriptionGoingToExpire = {
  args: goingToExpireProps()
};

export const SubscriptionExpired = {
  args: expiredProps()
};

export const SubscriptionUsersExceeded = {
  args: usersExceededProps()
};

export const NoSubscriptionKey = {
  args: notFoundProps()
};
