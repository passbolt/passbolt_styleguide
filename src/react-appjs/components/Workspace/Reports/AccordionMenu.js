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

import { matchPath } from "react-router"

import {
  Link,
  withRouter
} from "react-router-dom";

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

    }
  }

  onClick(e, elt) {
    e.preventDefault();
    const eltId = elt.dataset.id;
    const childrenElt = document.querySelector("#section-" + eltId);
    const navParent = elt.closest('.accordion.navigation');
    navParent.classList.toggle('closed');
    childrenElt.classList.toggle('hidden');
  }

  getRoute(item){
    return "/reports/" + item.slug;
  }

  checkSelected(menuItem) {
    let selected = false;
    if (menuItem.slug) {
      const match = matchPath(this.props.location.pathname, {
        path: this.getRoute(menuItem),
        exact: false,
        strict: false
      });
      if (match) {
        selected = true;
      }
    }

    return selected;
  }

  Head(name) {
    return(
      <ul className="accordion-header">
        <li className="open node root">
          <div className="row title">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <h3>
                  <a onClick={e => this.onClick(e, e.target)} data-id={this.sectionNumber}>
                    {name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }

  Section(section) {
    return(
      <div className="accordion navigation section" key={'section_' + this.sectionNumber++}>
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
      <div className="navigation accordion first" key={'top_item_' + this.sectionNumber++}>
        <ul>
          {this.Item(item)}
        </ul>
      </div>
    );
  }

  Item(item) {
    const selected = this.checkSelected(item);

    return(
      <li className="open node root group-item" key={'item_' + this.sectionNumber++}>
        <div className={selected?"row selected": "row"}>
          <div className="main-cell-wrapper">
            <div className="main-cell">
              {this.ReportItemLink(item)}
            </div>
          </div>
        </div>
      </li>
    );
  }

  ReportItemLink(item){
    return(
      <Link to={this.getRoute(item)} title={item.name}>
        <span>{item.name}</span>
      </Link>
    );
  }

  render() {
    return (
      <div>
        {((this.props.items).map((item) => {
          if (item.children) {
            return this.Section(item);
          }
          else {
            return this.TopItem(item);
          }
        }))}
      </div>
    );
  }
}

AccordionMenu.propTypes = {
  items: PropTypes.array,
};

export default withRouter(AccordionMenu);

