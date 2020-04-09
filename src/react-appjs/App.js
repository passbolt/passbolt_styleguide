import React, { Component} from "react";
import MainMenu from "./components/Common/MainMenu/MainMenu";
import ReportsWorkspace from "./components/Workspace/Reports/ReportsWorkspace";
import Footer from "./components/Common/Footer/Footer";


class App extends Component{
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      showStart: true
    }
  }

  handleWorkspaceSelect(menuItem) {
    // If we selected anything else than reports, redirect to the corresponding url.
    if(menuItem.id === 'reports') {
      console.log("display report");
      return;
    }

    // Else, call the report workspace.
    //document.location.href='menuItem.url';
    console.log("go to url", menuItem.url);
    return;
  }

  render(){
    return(
      <div>
        <div id="container" className="page">
          <div className="header first">
            <MainMenu onClick={this.handleWorkspaceSelect} />
          </div>
          <ReportsWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
