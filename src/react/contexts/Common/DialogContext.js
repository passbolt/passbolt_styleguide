
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
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

/**
 * The dialog context
 */
export const DialogContext = React.createContext({
  dialogs: [], // The current of displayed dialogs
  open: () => {}, // Open a dialog
  close: () => {} // Close a dialog
});

/**
 * The related context provider
 */
export default class DialogContextProvider extends React.Component {
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
      dialogs: [],
      open: (Dialog, DialogProps) => {
        const dialogKey = uuidv4();
        this.setState({dialogs: [...this.state.dialogs, {key: dialogKey, Dialog, DialogProps}]});
        return dialogKey;
      },
      close: async dialogKey => await this.setState({dialogs: this.state.dialogs.filter(dialog => dialogKey !== dialog.key)})
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogContext.Provider value={this.state}>
        {this.props.children}
      </DialogContext.Provider>
    );
  }
}
DialogContextProvider.displayName = 'DialogContextProvider';
DialogContextProvider.propTypes = {
  children: PropTypes.any
};

/**
 * Dialog Context Consumer HOC
 * @param WrappedComponent
 */
export function withDialog(WrappedComponent) {
  return class WithDialog extends React.Component {
    render() {
      return (
        <DialogContext.Consumer>
          {
            dialogContext => <WrappedComponent dialogContext={dialogContext} {...this.props} />
          }
        </DialogContext.Consumer>
      );
    }
  };
}
