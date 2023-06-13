/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {withAnnouncement} from "../../../contexts/AnnouncementContext";
import {DateTime} from "luxon";
import DisplayGoingToExpireSubscriptionAnnouncement from "./DisplayGoingToExpireSubscriptionAnnouncement";
import DisplayExpiredSubscriptionAnnouncement from "./DisplayExpiredSubscriptionAnnouncement";
import DisplayInvalidSubscriptionAnnouncement from "./DisplayInvalidSubscriptionAnnouncement";

/**
 * This component takes care of checking when the user session is expired.
 */
class HandleSubscriptionAnnouncement extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleAnnouncementSubscriptionEvent = this.handleAnnouncementSubscriptionEvent.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleAnnouncementSubscriptionEvent();
  }

  /**
   * Whenever the component was updated
   */
  componentDidUpdate(previousProps) {
    this.handleRefreshSubscriptionAnnouncement(previousProps.context.refreshSubscriptionAnnouncement);
  }

  /**
   * Handle the refresh subscription announcement
   * @param previousRefreshSubscriptionAnnouncement
   * @returns {Promise<void>}
   */
  async handleRefreshSubscriptionAnnouncement(previousRefreshSubscriptionAnnouncement) {
    const refreshSubscriptionAnnouncementHasChanged = this.props.context.refreshSubscriptionAnnouncement !== previousRefreshSubscriptionAnnouncement;
    if (refreshSubscriptionAnnouncementHasChanged && this.props.context.refreshSubscriptionAnnouncement) {
      await this.handleAnnouncementSubscriptionEvent();
      this.props.context.setContext({refreshSubscriptionAnnouncement: null});
    }
  }

  /**
   * Handle the announcement subscription event
   */
  async handleAnnouncementSubscriptionEvent() {
    this.hideSubscriptionAnnouncement();
    try {
      const subscription = await this.props.context.onGetSubscriptionKeyRequested();
      if (this.isSubscriptionGoingToExpire(subscription.expiry)) {
        this.props.announcementContext.show(DisplayGoingToExpireSubscriptionAnnouncement, {expiry: subscription.expiry});
      }
    } catch (error) {
      if (error.name === "PassboltSubscriptionError") {
        this.props.announcementContext.show(DisplayExpiredSubscriptionAnnouncement);
      } else {
        this.props.announcementContext.show(DisplayInvalidSubscriptionAnnouncement);
      }
    }
  }

  /**
   * Hide subscription announcement if any.
   */
  hideSubscriptionAnnouncement() {
    const subscriptionAnnouncements = [
      DisplayGoingToExpireSubscriptionAnnouncement,
      DisplayExpiredSubscriptionAnnouncement,
      DisplayInvalidSubscriptionAnnouncement
    ];
    this.props.announcementContext.announcements.forEach(annoucement => {
      if (subscriptionAnnouncements.some(subscriptionAnnoucement => subscriptionAnnoucement === annoucement.Announcement)) {
        this.props.announcementContext.close(annoucement.key);
      }
    });
  }

  /**
   * Has subscription key is going to expire
   * @param {string} expiryDate The subscription expiry date
   * @returns {boolean}
   */
  isSubscriptionGoingToExpire(expiryDate) {
    return DateTime.fromISO(expiryDate) < DateTime.now().plus({days: 30});
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleSubscriptionAnnouncement.propTypes = {
  context: PropTypes.any, // The application context
  announcementContext: PropTypes.any, // the announcement context
};

export default withAppContext(withAnnouncement(HandleSubscriptionAnnouncement));
