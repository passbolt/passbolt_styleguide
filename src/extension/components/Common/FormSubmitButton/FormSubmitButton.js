import React, { Component} from "react";
import PropTypes from "prop-types";
import {hot} from "react-hot-loader";

class FormSubmitButton extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }

  bindEventHandlers() {
    this.getClassName = this.getClassName.bind(this);
  }

  getClassName() {
    let name = 'button primary';
    if (this.props.disabled) {
      name += ' disabled';
    }
    if (this.props.processing) {
      name += ' processing';
    }
    return name;
  }

  render() {
    return (
      <input type="submit"
             className={this.getClassName()}
             disabled={this.props.disabled}
             value={this.props.value || 'Save'}
      />
    )
  }
}

FormSubmitButton.propTypes = {
  processing: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

export default hot(module)(FormSubmitButton);
