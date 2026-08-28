import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import LogoSVG from "../../../img/svg/logo.svg";
import PowerSVG from "../../../img/svg/power.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  async handleLogoutClick() {
    this.props.context.port.request("passbolt.auth.logout", false);
    this.props.logoutSuccessCallback();
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
        {this.props.context.isAuthenticated && (
          <span>
            <a
              role="button"
              className={`option-link button button-transparent`}
              onClick={this.handleLogoutClick}
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
  logoutSuccessCallback: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(Header));
