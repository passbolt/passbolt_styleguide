import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import LogoSVG from "../../../img/svg/logo.svg";
import PowerSVG from "../../../img/svg/power.svg";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import { withRouter } from "react-router-dom";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.handleOfflineLogoutClick = this.handleOfflineLogoutClick.bind(this);
    this.handleOnlineLogoutClick = this.handleOnlineLogoutClick.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Sign out of an offline session. There is no server session to destroy, so the sign-out is local, and
   * the destination is the triage route: it is the only one that can tell an offline sign-in page from a
   * server unavailable screen once the session is signed out.
   * @returns {Promise<void>}
   */
  async handleOfflineLogoutClick() {
    await this.props.context.port.request("passbolt.auth.local-logout");
    this.props.history.push("/webAccessibleResources/quickaccess.html");
  }

  /**
   * Sign out of an online session: the server session is destroyed and the user lands on the login page.
   * @returns {Promise<void>}
   */
  async handleOnlineLogoutClick() {
    await this.props.context.port.request("passbolt.auth.logout", false);
    this.props.history.push("/webAccessibleResources/quickaccess/login");
  }

  /**
   * The sign-out handler matching the current session type according to the server status if it is reachable or not.
   * - Online session with server reachable => online logout
   * - Online session with server not reachable => offline logout
   * - Offline session => offline logout
   * @returns {function(): Promise<void>}
   */
  get logoutHandler() {
    return this.props.activeSession?.isSessionOnline && this.props.activeSession?.isServerReachable
      ? this.handleOnlineLogoutClick
      : this.handleOfflineLogoutClick;
  }

  render() {
    return (
      <div className="quickaccess-header">
        <div className="logo-svg">
          <a
            href={this.props.context.userSettings ? this.props.context.userSettings.getTrustedDomain() : "#"}
            target="_blank"
            rel="noopener noreferrer"
            title={this.translate("open passbolt in a new tab")}
          >
            <LogoSVG role="img" width="10rem" height="1.8rem" />
          </a>
        </div>
        {this.props.activeSession?.isAuthenticated && (
          <span>
            <a
              role="button"
              className={`option-link button button-transparent`}
              onClick={this.logoutHandler}
              title={this.translate("sign out")}
            >
              <span className="visually-hidden">
                <Trans>sign out</Trans>
              </span>
              <PowerSVG />
            </a>
          </span>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  context: PropTypes.any, // The application context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The application active session
  history: PropTypes.any, // The history
  t: PropTypes.func, // The translation function
};

export default withActiveSessionLocalStorage(withAppContext(withRouter(withTranslation("common")(Header))));
