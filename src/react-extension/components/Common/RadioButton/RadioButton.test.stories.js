import React from "react";

export default {
  title: 'Passbolt/Common/RadioButton',
  component: "RadioButton"
};


const Template = () =>
  <div className="radiolist" style={{display: "flex", flexWrap: "wrap"}}>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" checked={false} disabled={false} readOnly={true}/>
      <label/>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" checked={false} disabled={true} readOnly={true}/>
      <label/>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" checked={true} disabled={false} readOnly={true}/>
      <label/>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" checked={true} disabled={true} readOnly={true}/>
      <label/>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" id="label1" checked={false} disabled={false} readOnly={true}/>
      <label htmlFor="label1">Label</label>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" id="label2" checked={false} disabled={true} readOnly={true}/>
      <label htmlFor="label2">Label</label>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" id="label3" checked={true} disabled={false} readOnly={true}/>
      <label htmlFor="label3">Label</label>
    </div>
    <div className="input radio" style={{width: "25%"}}>
      <input type="radio" id="label4" checked={true} disabled={true} readOnly={true}/>
      <label htmlFor="label4">Label</label>
    </div>
  </div>
  ;

export const Default = Template.bind({});
