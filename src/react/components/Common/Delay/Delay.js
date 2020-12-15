import React from 'react';
import PropTypes from 'prop-types';


/**
 * This component delays the display of component(s) for a given amount of time.
 * A fallback component can be displayed during the delay.
 */
class Delay extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component
   */
  get defaultState() {
    return {
      isExpired: false // True if the delay is expired
    };
  }

  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    setTimeout(() => {
      this.setState({isExpired: true});
    }, this.props.duration);
  }

  /**
   * Renders the component
   */
  render() {
    return this.state.isExpired ? this.props.children : this.props.fallback;
  }
}

Delay.propTypes = {
  duration: PropTypes.number, // Delay duration in ms
  fallback: PropTypes.any, // The fallback component to display during the delay
  children: PropTypes.any // Children component to display after the delay
};

Delay.defaultProps = {
  fallback: <></>
};

export default Delay;
