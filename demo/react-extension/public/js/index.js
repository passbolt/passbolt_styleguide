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
 * @since         3.0.0
 */

import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import ReactExtension from "../../../../src/react-extension/ReactExtension.js";
import mockPort from "../../mock/mockPort";
import mockStorage from "../../mock/mockStorage";
import {BrowserRouter as Router, Link} from "react-router-dom";
import foldersFixture from "../../fixture/folders";
import resourcesFixture from "../../fixture/resources";

const mockedStorage = mockStorage();
const mockedPort = mockPort(mockedStorage);

const scenarios = {
  Passwords: [{
    name: "Passwords Workspace",
    path: "/app/passwords",
  }, {
    name: "Create password dialog",
    path: "/app/passwords",
    state: {
      showResourceCreateDialog: true
    }
  }, {
    name: "Edit password dialog",
    path: "/app/passwords/view/76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
    state: {
      showPasswordEditDialog: true,
      passwordEditDialogProps: {id: "76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8"}
    }
  }, {
    name: "Share password dialog",
    path: "/app/passwords",
    state: {
      showShareDialog: true,
      shareDialogProps: {
        resourcesIds: resourcesFixture.map(item => item.id)
      }
    }
  }],
  Folders: [{
    name: "Create folder dialog",
    path: "/app/passwords",
    state: {
      showFolderCreateDialog: true,
      folderCreateDialogProps: {folderParentId: null}
    }
  }, {
    name: "Rename folder dialog",
    path: "/app/folders/view/f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    state: {
      showFolderRenameDialog: true,
      folder: foldersFixture.find(item => item.id === "f1c1c6c0-90be-56c5-849f-ee099b1a27f4")
    }
  }, {
    name: "Delete folder dialog",
    path: "/app/folders/view/f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    state: {
      showFolderDeleteDialog: true,
      folder: foldersFixture.find(item => item.id === "f1c1c6c0-90be-56c5-849f-ee099b1a27f4")
    }
  }, {
    name: "Move folder strategy dialog",
    path: "/app/folders/view/f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    state: {
      showFolderMoveStrategyDialog: true,
      folderMoveStrategyProps: {
        folderId: "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
        resourcesIds: resourcesFixture.map(item => item.id),
        foldersIds: foldersFixture.map(item => item.id),
        requestId: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093"
      }
    }
  }, {
    name: "Share folder dialog",
    path: "/app/passwords",
    state: {
      showShareDialog: true,
      shareDialogProps: {
        foldersIds: foldersFixture.map(item => item.id)
      }
    }
  }],
  Misc: [{
    name: "Passphrase dialog",
    path: "/app/passwords",
    state: {
      showPassphraseEntryDialog: true
    }
  }, {
    name: "Progress dialog",
    path: "/app/passwords",
    state: {
      showProgressDialog: true,
      progressDialogProps: {
        message: "Please wait...",
        goals: 3,
      }
    }
  }, {
    name: "Error dialog",
    path: "/app/passwords",
    state: {
      showErrorDialog: true,
      errorDialogProps: {
        title: "Error title",
        message: "Error description ..."
      }
    }
  }]
};


class DemoReactExtension extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.initEventHandlers();
    this.createElementRefs();
  }

  async componentDidMount() {
    const scenario = window.localStorage.getItem("scenario");
    if (scenario) {
      this.handleStartDemo(JSON.parse(scenario));
    }
  }

  getDefaultState() {
    return {
      showDemoMenu: true,
    };
  }

  bindCallbacks() {
    this.handleBackToDemoMenu = this.handleBackToDemoMenu.bind(this);
    this.handleStartDemo = this.handleStartDemo.bind(this);
  }

  initEventHandlers() {
  }

  createElementRefs() {
    this.reactExtensionElement = React.createRef();
  }

  handleBackToDemoMenu() {
    window.localStorage.setItem("scenario", "");
    const showDemoMenu = true;
    this.setState({showDemoMenu});
  }

  async handleStartDemo(scenario) {
    const showDemoMenu = false;
    this.setState({showDemoMenu}, () => {
      this.reactExtensionElement.current.setState(scenario.state);
      window.localStorage.setItem("scenario", JSON.stringify(scenario));
    });
  }

  render() {
    const backToDemoMenuLinkStyle = {
      position: "absolute",
      zIndex: 999,
      top: 0,
      left: 0,
      backgroundColor: "black",
      color: "white"
    };

    return (
      <Router>
        {this.state.showDemoMenu &&
        <div style={{padding: '1em'}}>
          {Object.keys(scenarios).map(category => (
            <div key={category}>
              <h1>{category}</h1>
              <ul>
                {scenarios[category].map(scenario => (
                  <li key={scenario.name}>
                    <Link to={scenario.path} onClick={() => this.handleStartDemo(scenario)}>{scenario.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        }
        {!this.state.showDemoMenu &&
        <Fragment>
          <Link to="/app/passwords" onClick={this.handleBackToDemoMenu} style={backToDemoMenuLinkStyle}>&#60; back</Link>
          <ReactExtension ref={this.reactExtensionElement} port={mockedPort} storage={mockedStorage}/>
        </Fragment>
        }
      </Router>
    );
  }
}

const domContainer = document.getElementById("root");
ReactDOM.render(<DemoReactExtension/>, domContainer);
