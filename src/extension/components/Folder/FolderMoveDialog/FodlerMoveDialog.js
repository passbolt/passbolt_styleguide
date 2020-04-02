import React, {Component} from "react";
import DialogCloseButton from "../../Common/DialogCloseButton/DialogCloseButton";
import {hot} from "react-hot-loader";

class FolderCreateDialog extends Component {
  onCloseClick() {
  }

  render() {
    return (
      <div className="create-folder-dialog dialog-wrapper">
        <div className="dialog">
          <div className="dialog-header">
            <h2>
              <span>New folder 2</span>
            </h2>
            <DialogCloseButton onClose={this.onCloseClick.bind(this)}/>
          </div>
          <div className="dialog-content">
            <form id="js_folder_create_form" className="create-form folder_create_form">
              <div className="form-content">
                <div className="input text required clearfix js_form_element_wrapper">
                  <label htmlFor="folder-name">Name</label>
                  <input id="folder-name" className="required" maxLength="50" type="text"
                         placeholder="Untitled folder"/>
                </div>
              </div>
              <div className="submit-wrapper clearfix">
                <input className="button primary" value="Create" data-view-id="423" type="submit"/>
                <a className="cancel" href="#">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default hot(module)(FolderCreateDialog);
