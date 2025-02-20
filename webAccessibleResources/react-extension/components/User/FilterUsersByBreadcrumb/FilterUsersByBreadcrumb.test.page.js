import {render} from "@testing-library/react";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import FilterUsersByBreadcrumb from "./FilterUsersByBreadcrumb";

/**
 * The FilterUsersByBreadcrumb component represented as a page
 */
export default class FilterUsersByBreadcrumbPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Router>
            <FilterUsersByBreadcrumb {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the index-th breadcrumb label
   * @param index The index of the breadcrumb label
   */
  breadcrumbLabels(index) {
    const breadcrumbElements = this._page.container.querySelectorAll('li button');
    if (breadcrumbElements && breadcrumbElements.length > 1) {
      return breadcrumbElements[index - 1].innerHTML;
    } else if (index > 1) {
      return undefined;
    } else {
      return this._page.container.querySelector('li button').innerHTML;
    }
  }

  /**
   * Return the number of users displayed
   * @return {string | any}
   */
  get itemNumberDisplayed() {
    return this._page.container.querySelector('.chips').textContent;
  }
}
