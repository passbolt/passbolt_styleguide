import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";

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
    this.props.context.port.request("passbolt.auth.logout");
    this.props.logoutSuccessCallback();
  }

  render() {
    return (
      <div className="quickaccess-header">
        <h1 className="logo">
          <a href={this.props.context.userSettings ? this.props.context.userSettings.getTrustedDomain() : "#"} target="_blank" rel="noopener noreferrer" title={this.translate("open passbolt in a new tab")}>
            <span className="visually-hidden">Passbolt</span>
          </a>
        </h1>
        {this.props.context.isAuthenticated &&
          <span>
            <a role="button" className={`option-link button button-transparent`} onClick={this.handleLogoutClick} title={this.translate("sign out")}>
              <span className="visually-hidden"><Trans>sign out</Trans></span>
              <Icon name="power"/>
            </a>
          </span>
        }
      </div>
    );
  }
}

Header.propTypes = {
  context: PropTypes.any, // The application context
  logoutSuccessCallback: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(Header));
