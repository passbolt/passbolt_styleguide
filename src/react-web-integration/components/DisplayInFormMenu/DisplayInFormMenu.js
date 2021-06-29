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
 * @since         3.4.0
 */

import React from "react";

const searchIcon = (
  <span className="fa icon">
        <svg xmlns="http://www.w3.org/2000/svg" aria-label="magnifying glass icon"><path id="search-icon" d="M15.781 13.844a.723.723 0 0 1 .219.531.723.723 0 0 1-.219.531l-.875.875a.723.723 0 0 1-.531.219.723.723 0 0 1-.531-.219l-3.125-3.125a.723.723 0 0 1-.219-.531v-.5C9.333 12.542 8 13 6.5 13a6.313 6.313 0 0 1-3.266-.875 6.567 6.567 0 0 1-2.359-2.36A6.313 6.313 0 0 1 0 6.5c0-1.187.292-2.276.875-3.266A6.567 6.567 0 0 1 3.235.875 6.313 6.313 0 0 1 6.5 0c1.187 0 2.276.292 3.266.875a6.567 6.567 0 0 1 2.359 2.36c.583.989.875 2.078.875 3.265 0 1.5-.458 2.833-1.375 4h.5c.208 0 .385.073.531.219l3.125 3.125zM6.5 10.5c.73 0 1.401-.177 2.016-.531a3.891 3.891 0 0 0 1.453-1.453A3.966 3.966 0 0 0 10.5 6.5c0-.73-.177-1.401-.531-2.016a3.891 3.891 0 0 0-1.453-1.453A3.966 3.966 0 0 0 6.5 2.5c-.73 0-1.401.177-2.016.531a3.891 3.891 0 0 0-1.453 1.453A3.966 3.966 0 0 0 2.5 6.5c0 .73.177 1.401.531 2.016a3.891 3.891 0 0 0 1.453 1.453A3.966 3.966 0 0 0 6.5 10.5z" fillRule="evenodd" /></svg>
      </span>
);
const magicWandIcon = (
  <span className="fa icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z" /></svg>
      </span>
);
const keyIcon = (
  <span className="fa icon">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key"
             className="svg-inline--fa fa-key fa-w-16" role="img" viewBox="0 0 512 512">
          <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"/>
        </svg>
      </span>
);

class DisplayInFormMenu extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className={`in-form-menu ${this.props.children.length > 3 ? 'in-form-menu--scrollable' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

DisplayInFormMenu.propTypes = {
  children: function (props, propName, componentName) {
    // Check the children types
  }
}

export default DisplayInFormMenu;

/*
 {this.state.isMenuOpen &&
          <div onBlur={this.toggleInFormMenu}>
            <DisplayInFormMenu>
              <DisplayInFormMenuItem
                title="Matching Credentials"
                description="john@pasbolt.com"
                icon={keyIcon}/>
              <DisplayInFormMenuItem
                title="Matching Credentials 2"
                description="john2@pasbolt.com"
                icon={keyIcon}/>
              <DisplayInFormMenuItem
                title="Save as a new password securely"
                subtitle={<span>Strength: <span style={{color: 'green'}}>strong</span></span>}
                description="Save the data entered as a new credential"
                icon={magicWandIcon}/>
              <DisplayInFormMenuItem
                title="Browser credentials"
                description="Search among available credentials"
                icon={searchIcon}/>
            </DisplayInFormMenu>
        </div>
 */