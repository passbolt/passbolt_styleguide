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
import Logo from "../../Common/Header/Logo";
import SearchBar from "../../Common/Header/SearchBar";
import ProfileMenu from "../../Common/Header/ProfileMenu";
import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import AccordionMenu from "./AccordionMenu";
import reports from "./config/reports";
import ReportsCollection from './utility/ReportsCollection';

import {
  Link,
} from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  withRouter
} from "react-router-dom";


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
    this.Breadcrumb = this.Breadcrumb.bind(this);
    this.WorkspaceContent = this.WorkspaceContent.bind(this);
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

  Breadcrumb() {
    let { reportSlug } = useParams();

    const report = this.reports.findBySlug(reportSlug);

    let breadcrumbs = [
      <Link to="/reports"><span>All reports</span></Link>
    ];

    if (report) {
      breadcrumbs.push(
        <a><span>{report.category}</span></a>
      );
      breadcrumbs.push(
        <Link to={"/reports/" + report.slug}><span>{report.slug}</span></Link>
      );
    }

    return (
      <Breadcrumbs items={breadcrumbs}/>
    );
  }

  WorkspaceContent() {
    let { reportSlug } = useParams();

    return (
      <div className="workspace-reports-content">
        <div className="tabs-content">
          <div className="tab-content selected">
            <this.Report slug={reportSlug}/>
          </div>
        </div>
      </div>
    );
  }

  // Called when IFrame is loaded.
  onIframeLoaded() {

  }

  onIframeError() {
    console.error('error while loading iframe');
  }

  Report(props) {
    const report = this.reports.findBySlug(props.slug);

    if (report.slug == "mfa-users-onboarding") {
      return (<iframe src="http://passbolt.local:8086/demo/reports/mfa_onboarding_report.php" width="100%" onLoad={this.onIframeLoaded} onError={this.onIframeError}></iframe>)
    } else if (report.slug == "not-available-on-server") {
      return (<iframe src="http://passbolt.local:8086/demo/reports/report_not_available.php" width="100%" onLoad={this.onIframeLoaded} onError={this.onIframeError}></iframe>)
    } else {
      return <h3>Requested report: {report.name}</h3>;
    }
  }

  Workspace() {
    const { match, location, history } = this.props;
    return (
      <Router>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <AccordionMenu items={this.reports.toAccordionMenuItems()}/>
                </div>
                <div className="panel middle">
                  <Switch>
                    <Route path={`${match.path}/:reportSlug`}>
                      <this.Breadcrumb />
                      <this.WorkspaceContent />
                    </Route>
                    <Route path={match.path}>
                      <Redirect to="/reports/dashboard" />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  handlePrint(e) {
    e.preventDefault();
    document.getElementById("report-frame").contentWindow.print();
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
						        <span className="svg-icon">
							        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                        <path d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path>
							        </svg>
						        </span>
                    <span>&nbsp;Print</span>
                  </a>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="header second">
          <Logo/>
          <SearchBar disabled={true} placeholder=" "/>
          <ProfileMenu onClick={this.onMenuItemClick.bind(this)} />
        </div>
        <this.ActionBar/>
        <this.Workspace/>
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

