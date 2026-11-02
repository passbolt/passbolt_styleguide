/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         6.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import ActiveSessionEntity from "../../models/entity/session/userActiveSessionEntity";
import ActiveSessionServiceWorkerService from "../../services/serviceWorker/activeSession/activeSessionServiceWorkerService";

export const ActiveSessionLocalStorageContext = React.createContext({
  get: () => {}, // Get the active session from the session storage and/or init them if not the case already
  activeSession: null, // the current active session loaded from the session storage
  updateSessionStorage: () => {}, // triggers an update of the session storage
});

/**
 * The active session session storage context provider
 */
class ActiveSessionLocalStorageContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.runningLocalStorageUpdatePromise = null;
    this.activeSessionServiceWorkerService = new ActiveSessionServiceWorkerService(props.port);
    this.initEventHandlers();
  }

  /**
   * Returns the default component state
   * @returns {Object}
   */
  get defaultState() {
    return {
      get: this.get.bind(this), // Get the active session from the session storage and/or init them if not the case already
      activeSession: null, // the current active session loaded from the session storage
      updateSessionStorage: this.updateSessionStorage.bind(this), // triggers an update of the session storage
    };
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  /**
   * ComponentDidMount hook.
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.props.storage.onChanged.addListener(this.handleStorageChange);
  }

  /**
   * componentWillUnmount hook.
   */
  componentWillUnmount() {
    this.props.storage.onChanged.removeListener(this.handleStorageChange);
  }

  /**
   * Handles update of the active session in the session storage.
   */
  handleStorageChange(changes) {
    if (changes[this.storageKey] && changes[this.storageKey].newValue) {
      this.set(changes[this.storageKey].newValue);
    }
  }

  /**
   * Set activeSession.
   * @param {Object} activeSession The active session to set.
   * @private
   */
  set(activeSession) {
    const activeSessionEntity = new ActiveSessionEntity(activeSession);
    this.setState({ activeSession: activeSessionEntity });
  }

  /**
   * Get the active session from the session storage and/or init them if not the case already.
   * @returns {ActiveSessionEntity|null}
   */
  get() {
    if (this.state.activeSession === null) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.activeSession;
  }

  /**
   * Get the storage key.
   * @returns {string}
   */
  get storageKey() {
    return `active_session-${this.props.account?.id}`;
  }

  /**
   * Load the active session from the session storage if it is available.
   * If the session storage is not yet initialised, then it asks for its initialisation.
   * @returns {Promise<void>}
   * @private
   */
  async loadLocalStorage() {
    const storageData = await this.props.storage.session.get([this.storageKey]);
    if (!storageData[this.storageKey]) {
      this.updateSessionStorage();
      return;
    }

    this.set(storageData[this.storageKey]);
  }

  /**
   * Forces the update of the active session in the session storage.
   * @return {Promise<void>}
   */
  async updateSessionStorage() {
    if (this.runningLocalStorageUpdatePromise === null) {
      this.runningLocalStorageUpdatePromise =
        this.activeSessionServiceWorkerService.findAndUpdateAuthenticationStatus();
      const activeSession = await this.runningLocalStorageUpdatePromise;
      if (activeSession) {
        this.set(activeSession);
      }
      this.runningLocalStorageUpdatePromise = null;
    } else {
      await this.runningLocalStorageUpdatePromise;
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ActiveSessionLocalStorageContext.Provider value={this.state}>
        {this.props.children}
      </ActiveSessionLocalStorageContext.Provider>
    );
  }
}

ActiveSessionLocalStorageContextProvider.propTypes = {
  port: PropTypes.any, // The application port
  storage: PropTypes.any, // The application storage
  account: PropTypes.any, // The application account
  children: PropTypes.any, // The children components
};
export default ActiveSessionLocalStorageContextProvider;

/**
 * Offline Settings Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withActiveSessionLocalStorage(WrappedComponent) {
  return class WithActiveSessionLocalStorage extends React.Component {
    render() {
      return (
        <ActiveSessionLocalStorageContext.Consumer>
          {(activeSessionLocalStorageContext) => (
            <WrappedComponent
              activeSessionLocalStorageContext={activeSessionLocalStorageContext}
              activeSession={activeSessionLocalStorageContext.get()}
              {...this.props}
            />
          )}
        </ActiveSessionLocalStorageContext.Consumer>
      );
    }
  };
}
