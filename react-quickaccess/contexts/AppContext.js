import React from "react";

const AppContext = React.createContext({
  siteSettings: null,
  userSettings: null,
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
