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
import Logo from "../../Common/Navigation/Header/Logo";
import SearchBar from "../../Common/Navigation/Search/SearchBar";
import UserBadgeMenu from "../../Common/Navigation/Header/UserBadgeMenu";
import Breadcrumbs from "../../Common/Navigation/Breadcrumbs/Breadcrumbs";
import AccordionMenu from "./AccordionMenu";
import reports from "./config/reports";
import ReportsCollection from './utility/ReportsCollection';
import HTMLReport from './HTMLReport';
import GridReport from './reports/GridReport';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  withRouter
} from "react-router-dom";
import Icon from "../../Common/Icons/Icon";

class ReportsWorkspace extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.reports = new ReportsCollection(reports);

    this.Report = this.Report.bind(this);
    this.ActionBar = this.ActionBar.bind(this);
    this.Workspace = this.Workspace.bind(this);
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      loading: true,
      currentReportSlug: '',
      breadcrumbs: [],
    }
  }

  onMenuItemClick(menuItem) {
    this.props.onMenuItemClick(menuItem);
  }

  getCurrentReportSlug() {
    const { reportSlug } = useParams();
    return reportSlug;
  }

  getBreadcrumbItems(slug) {
    console.log(slug);
    const report = this.reports.findBySlug(slug);
    return [{
      link: "/",
      name: "Home"
    },{
      link: "/reports",
      name: "All reports"
    },{
      link: `/reports/${report.slug}`,
      name: report.slug
    }];
  }

  // Called when IFrame is loaded.
  onIframeLoaded() {
    console.log('Iframe is now loaded');
  }

  onIframeError() {
    console.error('error while loading iframe');
  }

  render() {
    return (
      <div>
        <div className="header second">
          <Logo/>
          <SearchBar disabled={true} placeholder=" "/>
          <UserBadgeMenu onClick={this.onMenuItemClick.bind(this)} />
        </div>
        <this.ActionBar/>
        <this.Workspace/>
      </div>
    );
  }

  ReportError() {
    return (
      <p className="message error">The selected report does not exist</p>
    );
  }

  Report() {
    const report = this.reports.findBySlug(this.getCurrentReportSlug());

    // If report doesn't exist, we display an error.
    if(Object.keys(report).length === 0) {
      return <this.ReportError/>
    }

    if (process.env.NODE_ENV === 'development') {
      if (report.slug === "mfa-users-onboarding") {
        return <GridReport />;
        // return <HTMLReport url="http://passbolt.local:8086/demo/reports/mfa_onboarding_report.php" />
      } else if (report.slug == "not-available-on-server") {
        return <HTMLReport url="http://passbolt.local:8086/demo/reports/report_not_available.php" />
      } else if (report.slug == "report-loading") {
        return <HTMLReport/>
      } else if (report.component) {
        return report.component;
      } else {
        return <h3>Requested report: {report.name}</h3>;
      }
    } else {
      if (report.slug === "dashboard") {
        return report.component;
      } else {
        const reportUrl = "/reports/" + report.slug;
        return <HTMLReport url={reportUrl} />
      }
    }
  }

  Workspace() {
    const { match, location, history } = this.props;
    return (
      <Router basename="/app">
        <div className="panel main">
          <div className="reports-workspace">
            <div className="panel left">
              <AccordionMenu items={this.reports.toAccordionMenuItems()}/>
            </div>
            <div className="panel middle">
              <Switch>
                <Route path={`${match.path}/:reportSlug`}>
                  <Breadcrumbs items={this.getBreadcrumbItems(match)}/>
                  <div className="workspace-reports-content">
                    <this.Report />
                  </div>
                </Route>
                <Route path={match.path}>
                  <Redirect to="/reports/dashboard" />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  handlePrint(e) {
    e.preventDefault();
    document.getElementById("report-iframe").contentWindow.print();
  }

  ActionBar() {
    return (
      <div className="header third">
        <div className="col1">
        </div>
        <div className="col2_3 actions-wrapper">
          <ul className="actions">
            <div className="tabs-content">
              <div className="selected selection">
                <li>
                  <a className="button" onClick={e => this.handlePrint(e)}>
						        <Icon name='printer' />
                    <span>Print</span>
                  </a>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

ReportsWorkspace.propTypes = {
  onMenuItemClick: PropTypes.func,

  // Private Routing props.
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(ReportsWorkspace);

