/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.0
 */
import React, {Component} from "react";

class Intro extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="storybook-intro-hero">
        <link rel="stylesheet" href={`/stories/assets/intro/intro.css`}/>
        <link rel="stylesheet" href={`/css/themes/default/ext_app.css`}/>
        <div className="storybook-intro-hero-left">
          <h1><img src="img/logo/logo.svg" alt="Passbolt logo"/></h1>
          <p className="storybook-intro-hero-subtitle">
            Welcome to passbolt user interface design kit.
          </p>
          <div className="storybook-intro-hero-actions">
            <a href="https://passbolt.com" className="button primary">Visit our website</a>
            <a href="https://github.com/passbolt" className="button secondary">Follow on github</a>
          </div>
        </div>
        <div className="storybook-intro-hero-right">
          <img src="stories/assets/intro/hero.png"/>
        </div>
      </div>
    );
  }
}

Intro.propTypes = {

};
export default Intro;
