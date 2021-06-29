import React from "react";
import PropTypes from "prop-types";
import AppContext from "./contexts/AppContext";
import AskInFormMenuDisplay from "./components/AskInFormMenuDisplay/AskInFormMenuDisplay";


/**
 * Entry point of the in-fprm call to action
 */
class ExtInFormCallToAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default stare
   */
  get defaultState() {
    return {
      port: this.props.port
    }
  }

  /**
   * Render the component
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AskInFormMenuDisplay />
      </AppContext.Provider>
    );
  }
}

ExtInFormCallToAction.propTypes = {
  port: PropTypes.object
};

export default ExtInFormCallToAction;