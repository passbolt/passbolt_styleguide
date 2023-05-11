import React from "react";

const AppContext = React.createContext({
  user: null,
  users: null,
  roles: null,
  rememberMeOptions: {},
  resources: null,
  resource: null,
  shareResources: null,
  selectedResources: null,
  selectedUser: null,
  folders: null,
  resourceCommentId: null,
  mustRefreshComments: false,
  siteSettings: null,
  userSettings: null,
  onCheckIsAuthenticatedRequested: null
});


/**
 * App Context Consumer HOC
 * @param WrappedComponent
 */
export function withAppContext(WrappedComponent) {
  return class withAppContext extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {
            AppContext => <WrappedComponent context={AppContext} {...this.props} />
          }
        </AppContext.Consumer>
      );
    }
  };
}

export default AppContext;
