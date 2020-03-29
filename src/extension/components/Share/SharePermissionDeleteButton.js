import React, { Component} from "react";
import PropTypes from "prop-types";
import {hot} from "react-hot-loader";
import Icon from "../Common/Icons/Icon";

class SharePermissionDeleteButton extends Component {
  handleCloseClick() {
    this.props.onClose();
  }

  getClassName() {
    let className = 'remove-item';
    if (this.props.disabled) {
      className += ' disabled';
    }
    return className;
  }

  render() {
    return (
      <a className={this.getClassName()} onClick={this.handleCloseClick.bind(this)} role="button">
        <Icon name='close-circle' />
        <span className="visually-hidden">Remove</span>
      </a>
    )
  }
}
SharePermissionDeleteButton.propTypes = {
  onClose: PropTypes.func,
  disabled: PropTypes.bool
};

export default hot(module)(SharePermissionDeleteButton);
