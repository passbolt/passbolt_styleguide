/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import SubscriptionModel from '../../../../shared/models/subscription/SubscriptionModel';

/**
 * The Administration Subscription Context
 * @type {React.Context<Object>}
 */
export const AdminSubscriptionContext = React.createContext({
  getSubscription: () => {}, // Returns settings for UI changes
  findSubscriptionKey: () => {}, // Find the subscription key
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  setProcessing: () => {}, // Set processing state
  getActiveUsers: () => {}, //get active users numbers
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The Administration Subscription context provider
 */
export class AdminSubscriptionContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      subscription: new SubscriptionModel(), // Change done to the subscription object
      processing: true, // Context is processing data
      getSubscription: this.getSubscription.bind(this), // Returns settings for UI changes
      findSubscriptionKey: this.findSubscriptionKey.bind(this), // Find the subscription key
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this), // Set processing state
      getActiveUsers: this.getActiveUsers.bind(this), //get active users numbers
      clearContext: this.clearContext.bind(this), // put the data to its default state value
    };
  }

  /**
   * Find the subscription key
   * @return {Promise<void>}
   */
  async findSubscriptionKey() {
    this.setProcessing(true);
    let subscription = new SubscriptionModel();
    try {
      const result = await this.props.context.onGetSubscriptionKeyRequested();
      subscription = new SubscriptionModel(result);
    } catch (error) {
      if (error.name === "PassboltSubscriptionError") {
        subscription = new SubscriptionModel(error.subscription);
      }
    } finally {
      //Init subscription which will interact with UI
      this.setState({subscription});
      this.setProcessing(false);
    }
  }

  /**
   * Get active users
   * @returns {*}
   * @constructor
   */
  async getActiveUsers() {
    const users = await this.props.context.port.request("passbolt.users.get-all");
    const filterActiveUsers = user => user.active;
    return users.filter(filterActiveUsers).length;
  }

  /**
   * Returns the subscription that have been fetch previously.
   * @returns {object}
   */
  getSubscription() {
    return this.state.subscription;
  }

  /**
   * Returns true when the data is under processing
   * @returns {boolean}
   *
   */
  isProcessing() {
    return this.state.processing;
  }

  /**
   * Handle processing change.
   * @params {Boolean} processing value
   * @returns {void}
   */
  setProcessing(processing) {
    this.setState({processing});
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {subscription, processing} = this.defaultState;
    this.setState({
      subscription, processing
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminSubscriptionContext.Provider value={this.state}>
        {this.props.children}
      </AdminSubscriptionContext.Provider>
    );
  }
}

AdminSubscriptionContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(AdminSubscriptionContextProvider);


/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSubscription(WrappedComponent) {
  return class WithAdminSubscription extends React.Component {
    render() {
      return (
        <AdminSubscriptionContext.Consumer>
          {
            adminSubcriptionContext => <WrappedComponent adminSubcriptionContext={adminSubcriptionContext} {...this.props} />
          }
        </AdminSubscriptionContext.Consumer>
      );
    }
  };
}

