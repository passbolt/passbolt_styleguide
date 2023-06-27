
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
 * @since         3.2.0
 */

import React from "react";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

/**
 * The announcement context
 */
export const AnnouncementContext = React.createContext({
  announcements: [], // The current of displayed announcements
  show: () => {}, // Show an announcement
  close: () => {} // Close an announcement
});

/**
 * The related context provider
 */
export default class AnnouncementContextProvider extends React.Component {
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
      announcements: [],
      show: (Announcement, AnnouncementProps) => {
        const announcementKey = uuidv4();
        this.setState({announcements: [...this.state.announcements, {key: announcementKey, Announcement, AnnouncementProps}]});
        return announcementKey;
      },
      close: async announcementKey => await this.setState({announcements: this.state.announcements.filter(announcement => announcementKey !== announcement.key)})
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AnnouncementContext.Provider value={this.state}>
        {this.props.children}
      </AnnouncementContext.Provider>
    );
  }
}
AnnouncementContextProvider.displayName = 'AnnouncementContextProvider';
AnnouncementContextProvider.propTypes = {
  children: PropTypes.any
};

/**
 * Announcement Context Consumer HOC
 * @param WrappedComponent
 */
export function withAnnouncement(WrappedComponent) {
  return class WithAnnouncement extends React.Component {
    render() {
      return (
        <AnnouncementContext.Consumer>
          {
            announcementContext => <WrappedComponent announcementContext={announcementContext} {...this.props} />
          }
        </AnnouncementContext.Consumer>
      );
    }
  };
}
