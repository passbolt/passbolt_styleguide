/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */

import React from "react";
import LoadingBar from "../LoadingBar/LoadingBar";
import PropTypes from "prop-types";
import {withLoading} from "../../../../contexts/LoadingContext";

/**
 * This component acts as an anchor for loading bar.
 */
class ManageLoading extends React.Component {
  /**
   * Default contructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Whenever the component is updated
   * @param previousProps The component previous props
   */
  componentDidUpdate(previousProps) {
    this.handleLoadingCounterChanged(previousProps);
  }

  /**
   * The component default state
   */
  get defaultState() {
    return {
      progressRate: 0, // The current rate of progress
      mustShow: false // Flag to display the loading bar
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleProgressCompleted = this.handleProgressCompleted.bind(this);
  }

  /**
   * Handle the progress completed event
   */
  handleProgressCompleted() {
    // We hide the loading bar only if the progress rate is to 100%
    const isCompleted = this.state.progressRate === 100;
    if (isCompleted) {
      this.reset();
    }
  }

  /**
   * Handle the change of loading counter
   * @param previousProps The component previous props
   */
  handleLoadingCounterChanged(previousProps) {
    const hasCounterChange = previousProps.loadingContext.counter !== this.props.loadingContext.counter;
    if (hasCounterChange) {
      const mustStartLoad = previousProps.loadingContext.counter === 0 && this.props.loadingContext.counter > 0;
      const mustEndLoad = previousProps.loadingContext.counter > 0 && this.props.loadingContext.counter === 0;
      if (mustStartLoad) {
        // Start to load and wait for the end
        this.load(80);
      } else if (mustEndLoad) {
        // Complete the load
        this.load(100);
      }
    }
  }

  /**
   * Reset the loading bar
   */
  reset() {
    this.setState({progressRate: 0, mustShow: false});
  }

  /**
   * Grows the loading bar until the given progress rate
   * @param progressRate A progress rate
   */
  load(progressRate) {
    this.setState({mustShow: true});
    setTimeout(() => { this.setState({progressRate}); });
  }

  /**
   * Renders the component
   */
  render() {
    return (
      <div className="loading-bar-wrapper">
        {this.state.mustShow &&
          <LoadingBar
            progress={this.state.progressRate}
            onProgressCompleted={this.handleProgressCompleted}/>
        }
      </div>
    );
  }
}

ManageLoading.propTypes = {
  loadingContext: PropTypes.any // The loading context
};

export default withLoading(ManageLoading);
