/*! For license information please see react-extension-components-Authentication-DisplayBrowserNotSupported-DisplayBrowserNotSupported-test-stories.d7f75e62.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[2144],{"./src/react-extension/components/Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayBrowserNotSupported_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class DisplayBrowserNotSupported extends react.Component{constructor(props){super(props),this.state=this.getDefaultState()}getDefaultState(){return{selectedBrowser:this.compatibleBrowserList[0]}}handleBrowserButtonClick(browserInfo){this.setState({selectedBrowser:browserInfo})}get compatibleBrowserList(){return[{name:"Mozilla Firefox",img:"firefox.svg",url:"https://www.mozilla.org/"},{name:"Google Chrome",img:"chrome.svg",url:"https://www.google.com/chrome/"},{name:"Microsoft Edge",img:"edge.svg",url:"https://www.microsoft.com/edge"},{name:"Brave",img:"brave.svg",url:"https://www.brave.com/"},{name:"Vivaldi",img:"vivaldi.svg",url:"https://www.vivaldi.com/"}]}render(){return react.createElement("div",{className:"browser-not-supported"},react.createElement("h1",null,react.createElement(es.x6,null,"Sorry, your browser is not supported.")),react.createElement("p",null,react.createElement(es.x6,null,"Please download one of these browsers to get started with passbolt:")),react.createElement("div",{className:"browser-button-list"},this.compatibleBrowserList.map(((browserInfo,key)=>react.createElement("button",{key,className:"browser"+(browserInfo.name===this.state.selectedBrowser.name?" focused":""),target:"_blank",onClick:()=>this.handleBrowserButtonClick(browserInfo)},react.createElement("img",{src:`${this.props.context.trustedDomain}/img/third_party/${browserInfo.img}`}))))),react.createElement("div",{className:"form-actions"},react.createElement("a",{href:this.state.selectedBrowser.url,rel:"noopener noreferrer",className:"button primary big full-width",role:"button",target:"_blank"},react.createElement(es.x6,null,"Download ",{browserName:this.state.selectedBrowser.name}))))}}DisplayBrowserNotSupported.propTypes={context:prop_types_default().any};const DisplayBrowserNotSupported_DisplayBrowserNotSupported=(0,AppContext.L)((0,es.CI)("common")(DisplayBrowserNotSupported));DisplayBrowserNotSupported.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Returns the default component state",modifiers:[],params:[],returns:null,description:"Returns the default component state"},{name:"handleBrowserButtonClick",docblock:null,modifiers:[],params:[{name:"browserInfo",optional:!1,type:null}],returns:null},{name:"compatibleBrowserList",docblock:"Returns the list of compatible browsers and their associated information.\n@returns {Array<object>}",modifiers:["get"],params:[],returns:{type:{name:"Array",elements:[{name:"object"}]}},description:"Returns the list of compatible browsers and their associated information."}],displayName:"DisplayBrowserNotSupported",props:{context:{description:"",type:{name:"any"},required:!1}}};const DisplayBrowserNotSupported_test_stories={title:"Components/Authentication/DisplayBrowserNotSupported",component:DisplayBrowserNotSupported_DisplayBrowserNotSupported},Initial=(args=>react.createElement("div",{id:"container",className:"container page login"},react.createElement("div",{className:"content"},react.createElement("div",{className:"login-form"},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(DisplayBrowserNotSupported_DisplayBrowserNotSupported,{...args,...routerProps})})))))).bind({});Initial.parameters={css:"ext_authentication"};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayBrowserNotSupported {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Initial.parameters?.docs?.source}}}}}]);