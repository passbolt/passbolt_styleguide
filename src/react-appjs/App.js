import React, { Component} from "react";
import ErrorDialog from "./components/Common/ErrorDialog/ErrorDialog";

class App extends Component{
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindEventHandlers();
  }

  getDefaultState() {
    return {
      showStart: true,
      showErrorDialog: false,
    }
  }

  async getResetState() {
    const state = this.getDefaultState();
    state.showStart = false;
    return state;
  }

  async onShowDialog(slug) {
    const state = await this.getResetState();
    state[slug] = true;
    this.setState(state);
  }

  bindEventHandlers() {
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onShowDialog = this.onShowDialog.bind(this);
  }

  async onDialogClose() {
    const state = await this.getResetState();
    state.showStart = true;
    this.setState(state);
  }

  render(){
    return(
      <div id="container" className="page">
        {this.state.showStart &&
        <div style={{padding:'1em'}}>
          <h1>Misc</h1>
          <ul>
            <li><a onClick={() => this.onShowDialog('showErrorDialog')}>Show error dialog</a></li>
          </ul>
        </div>
        }
        {this.state.showErrorDialog &&
        <ErrorDialog onClose={this.onDialogClose} title="test title" message="test message"/>
        }
      </div>
    );
  }
}

export default App;
