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
 * @since         2.12.0
 */

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import BasicLogin from "./BasicLogin";
import StepLogin from "./StepLogin";
import Iframe from "./Iframe";

/**
 * The passbolt Login in form menu application served by the demo.
 */
class ExtLogin extends Component {
  /*
   * =============================================================
   *  View
   * =============================================================
   */
  render() {
    return (
      <Router>
        <Switch>
          {/* in form menu in basic login */}
          <Route exact path={[
            "/",
            "/in-form-menu",
            "/in-form-menu/basic-login",
          ]}>
            <BasicLogin/>
          </Route>
          {/* in form menu in basic login in iframe */}
          <Route exact path={[
            "/in-form-menu/iframe/basic-login"
          ]}>
            <Iframe>
              <BasicLogin/>
            </Iframe>
          </Route>
          {/* in form menu in basic login in iframe */}
          <Route exact path={[
            "/in-form-menu/iframe/step-login"
          ]}>
            <Iframe>
              <StepLogin/>
            </Iframe>
          </Route>
          {/* in form menu in step login */}
          <Route exact path={[
            "/in-form-menu/step-login"
          ]}>
            <StepLogin/>
          </Route>
          {/* in form menu in step login in iframe */}
          <Route exact path={[
            "/in-form-menu/iframe/step-login"
          ]}>
            <Iframe loginComponent={StepLogin}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

ExtLogin.propTypes = {
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtLogin;
