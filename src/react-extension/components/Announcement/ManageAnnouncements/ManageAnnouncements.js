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
import {withAnnouncement} from "../../../contexts/AnnouncementContext";

/**
 * This component acts as an anchor for the different project announcements.
 */
class ManageAnnouncements extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallback();
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.close = this.close.bind(this);
  }

  /**
   * Removes the index-th announcement
   */
  async close(index) {
    this.props.announcementContext.close(index);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        {
          this.props.announcementContext.announcements.map(({key, Announcement, AnnouncementProps}) =>
            <Announcement
              key={key}
              onClose={ () => this.close(key)}
              {...AnnouncementProps} />)
        }
        {this.props.children}
      </>
    );
  }
}

ManageAnnouncements.propTypes = {
  announcementContext: PropTypes.any,
  children: PropTypes.any
};

export default withAnnouncement(ManageAnnouncements);
