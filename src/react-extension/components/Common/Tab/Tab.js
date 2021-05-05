

import React from "react";
import PropTypes from "prop-types";

/**
 * Display of the Tab component
 */
class Tab extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallback();
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle click
   * @param event
   */
  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <li className={`tab ${this.props.isActive ? 'active' : ''}`}>
        <a className="tab-link"  onClick={this.handleClick}>
          {this.props.name}
        </a>
      </li>
    );
  }
}

Tab.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any
};

Tab.defaultProps = {
  name: "default"
};

export default Tab;
