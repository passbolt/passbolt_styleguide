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
 * @since         5.3.2
 */

import React from "react";
import PropTypes from "prop-types";
import assertString from "validator/es/lib/util/assertString";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withActionFeedback } from "../../contexts/ActionFeedbackContext";

export const ManagedClipboardServiceContext = React.createContext({
  copyTemporarily: () => {},
  copy: () => {},
});

/**
 * The related context provider
 */
export class ManagedClipboardServiceProvider extends React.Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = this.defaultState;

    this.clipboardServiceWorkerService = new ClipboardServiceWorkerService(props.context.port);
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      copyTemporarily: this.copyTemporarily.bind(this),
      copy: this.copy.bind(this),
    };
  }

  /**
   * Copies temporarily the given secret to the clipboard.
   * This requires a service worker to work properly.
   * In other words, this service is not (yet) tailored to work on
   * pages served by the API only.
   * @param {string} secret
   * @param {string} message
   * @returns {Promise<void>}
   */
  async copyTemporarily(secret, message) {
    assertString(secret);
    assertString(message);

    await this.clipboardServiceWorkerService.copyTemporarily(secret);

    this.props.actionFeedbackContext.displaySuccess(
      <>
        {message} <Trans>It will clear in 30 seconds.</Trans>
      </>,
    );
  }

  /**
   * Copies the given secret to the clipboard.
   * This requires a service worker to work properly.
   * In other words, this service is not (yet) tailored to work on
   * pages served by the API only.
   * @param {string} secret
   * @param {string} message
   * @returns {Promise<void>}
   */
  async copy(secret, message) {
    assertString(secret);
    assertString(message);

    await this.clipboardServiceWorkerService.copy(secret);

    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ManagedClipboardServiceContext.Provider value={this.state}>
        {this.props.children}
      </ManagedClipboardServiceContext.Provider>
    );
  }
}

ManagedClipboardServiceProvider.propTypes = {
  context: PropTypes.any.isRequired, // The application context
  actionFeedbackContext: PropTypes.any.isRequired, // The action feedback context
  children: PropTypes.any, // The children components
  t: PropTypes.func, // the translation function
};

export default withAppContext(withActionFeedback(withTranslation("common")(ManagedClipboardServiceProvider)));

/**
 * Clipboard provider HOC
 * @param WrappedComponent
 */
export function withClipboard(WrappedComponent) {
  return class WithClipboard extends React.Component {
    render() {
      return (
        <ManagedClipboardServiceContext.Consumer>
          {(clipboard) => <WrappedComponent clipboardContext={clipboard} {...this.props} />}
        </ManagedClipboardServiceContext.Consumer>
      );
    }
  };
}
