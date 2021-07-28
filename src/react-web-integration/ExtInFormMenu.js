import React from "react";
import PropTypes from "prop-types";
import AppContext from "./contexts/AppContext";
import DisplayInFormMenu from "./components/DisplayInFormMenu/DisplayInFormMenu";


/**
 * Entry point of the in-form menu
 */
class ExtInForm extends React.Component {
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
        <div className="web-integration">
          <DisplayInFormMenu/>
        </div>
      </AppContext.Provider>
    );
  }
}

ExtInForm.propTypes = {
  port: PropTypes.object
};

export default ExtInForm;