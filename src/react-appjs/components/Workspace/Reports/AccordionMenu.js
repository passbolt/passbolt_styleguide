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
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

class AccordionMenu extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.sectionNumber=0;
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      menuItems: [
        {
          "name": "Dashboard"
        },
        {
          "name": "On-boarding",
          "children": [
            {
              "name": "MFA On-boarding report"
            },
            {
              "name": "Employees On-boarding report"
            },
            {
              "name": "Employees drop-out report"
            }]
        },
        {
          "name": "Users activity",
          "children": [
            {
              "name": "Users log-in report"
            },
            {
              "name": "Users activity report"
            },
            {
              "name": "Users evolution report"
            }]
        },
        {
          "name": "Groups activity",
          "children": [
            {
              "name": "report 1"
            },
            {
              "name": "report 2"
            },
            {
              "name": "report 3"
            }]
        },
        {
          "name": "Passwords usage",
          "children": [
            {
              "name": "report 1"
            },
            {
              "name": "report 2"
            },
            {
              "name": "report 3"
            }]
        }],
    }
  }

  onClick(e, elt) {
    e.preventDefault();
    const eltId = elt.dataset.id;
    const childrenElt = document.querySelector("#section-" + eltId);
    childrenElt.classList.toggle('hidden');
  }

  Head(name) {
    return(
      <ul className="accordion-header">
        <li className="open node root">
          <div className="row title">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <h3>
                  <a href="#" onClick={e => this.onClick(e, e.target)} data-id={this.sectionNumber}>{name}</a>
                </h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }

  Section(section) {
    this.sectionNumber++;
    return(
      <div class="section">
        {this.Head(section.name)}
        {section.children &&
          this.Children(section.children)
        }
      </div>
    );
  }

  Children(children) {
    return(
      <ul className="accordion-content" id={"section-" + this.sectionNumber}>
        {(children && (children).map((item) => {
          return this.Item(item);
        }))}
      </ul>
    );
  }

  TopItem(item) {
    return (
      <ul>
        {this.Item(item)}
      </ul>
    );
  }

  Item(item) {
    return(
      <li className="open node root group-item">
        <div className="row">
          <div className="main-cell-wrapper">
            <div className="main-cell">
              <a href="#" title={item.name}>
                <span>{item.name}</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className="navigation accordion first">
        {((this.state.menuItems).map((item) => {
          if (item.children) {
            return this.Section(item);
          } else {
            return this.TopItem(item);
          }
        }))}
      </div>
    );
  }
}

AccordionMenu.propTypes = {
  onMenuItemClick: PropTypes.func,
};

export default AccordionMenu;

