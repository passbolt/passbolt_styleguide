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
import AnnouncementWrapper
  from "../AnnouncementWrapper/AnnouncementWrapper";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {Trans, withTranslation} from "react-i18next";
import {withAnnouncement} from "../../../contexts/AnnouncementContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";

/**
 * This component allows to display the subscription announcement
 */
class DisplayGoingToExpireSubscriptionAnnouncement extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AnnouncementWrapper className="subscription" onClose={this.props.onClose} canClose={true}>
        <p>
          <Trans>Warning:</Trans>&nbsp;
          <Trans>your subscription key will expire</Trans> {formatDateTimeAgo(this.props.expiry, this.props.t, this.props.context.locale)}.
          <button className="link" type="button" onClick={this.props.navigationContext.onGoToAdministrationSubscriptionRequested}>
            <Trans>Manage Subscription</Trans>
          </button>
        </p>
      </AnnouncementWrapper>
    );
  }
}

DisplayGoingToExpireSubscriptionAnnouncement.propTypes = {
  context: PropTypes.any, // The application context
  expiry: PropTypes.string, // The subscription expiry date
  navigationContext: PropTypes.any, // The application navigation context
  onClose: PropTypes.func, // The close function
  t: PropTypes.func, // The translation function
};

export default withAppContext(withNavigationContext(withAnnouncement(withTranslation('common')(DisplayGoingToExpireSubscriptionAnnouncement))));
