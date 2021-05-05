import React from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";

/**
 * Tabs component to handle the display of selected tab
 */
class Tabs extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallback();
  }

  /**
   * Default state
   * @param props Component props
   */
  getDefaultState(props) {
    return {
      activeTabName: props.activeTabName
    };
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  /**
   * Toggle currently active tab
   * @param tabName
   */
  handleTabClick(props) {
    this.setState({activeTabName: props.name});
    props.onClick();
  }

  render() {
    return (
      <div className="tabs">
        <ul className="tabs-nav tabs-nav--bordered nav navbar-nav navbar-left">
          {
            this.props.children.map(({key, props}) =>
              <Tab
                key={key}
                name={props.name}
                onClick={ () => this.handleTabClick(props)}
                isActive={props.name === this.state.activeTabName}
              />)
          }
        </ul>
        <div className="tabs-active-content">
          {this.props.children.find(tab => tab.props.name === this.state.activeTabName).props.children}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeTabName: PropTypes.string,
  children: PropTypes.any
};

Tabs.defaultProps = {
  activeTabName: "default"
};

export default Tabs;

