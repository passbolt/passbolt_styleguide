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

    if(Object.keys(report).length === 0) {
      breadcrumbs.push(
        <a><span>error</span></a>
      );
    } else {
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

  ReportError() {
    return (
      <p className="message error">The selected report does not exist</p>
    );
  }

  Report(props) {
    const report = this.reports.findBySlug(props.slug);

    // If report doesn't exist, we display an error.
    if(Object.keys(report).length === 0) {
      return <this.ReportError/>
    }

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
						        <span className="svg-icon printer">
							        <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M448 1536h896v-256h-896v256zm0-640h896v-384h-160q-40 0-68-28t-28-68v-160h-640v640zm1152 64q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128 0v416q0 13-9.5 22.5t-22.5 9.5h-224v160q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-224q-13 0-22.5-9.5t-9.5-22.5v-416q0-79 56.5-135.5t135.5-56.5h64v-544q0-40 28-68t68-28h672q40 0 88 20t76 48l152 152q28 28 48 76t20 88v256h64q79 0 135.5 56.5t56.5 135.5z"/></svg>
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

