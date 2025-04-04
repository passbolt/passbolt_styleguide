/*! For license information please see react-extension-components-Authentication-InstallExtension-InstallExtension-test-stories.5a7f5489.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[9289],{"./src/react-extension/components/Authentication/InstallExtension/InstallExtension.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Chrome:()=>Chrome,Edge:()=>Edge,Firefox:()=>Firefox,UnsupportedBrowser:()=>UnsupportedBrowser,__namedExportsOrder:()=>__namedExportsOrder,default:()=>InstallExtension_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),detectBrowserName=__webpack_require__("./src/shared/lib/Browser/detectBrowserName.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class InstallExtension extends react.Component{constructor(props){super(props),this.state=this.getDefaultState(),this.bindCallbacks()}getDefaultState(){const currentTheme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return{browserName:(0,detectBrowserName.h)(),theme:currentTheme}}bindCallbacks(){this.handleRefreshClick=this.handleRefreshClick.bind(this)}get browserStoreThumbnailUrl(){const color="dark"===this.state.theme?"white":"black";switch(this.state.browserName){case detectBrowserName.U.FIREFOX:return`${this.props.context.trustedDomain}/img/third_party/FirefoxAMO_${color}.svg`;case detectBrowserName.U.EDGE:return`${this.props.context.trustedDomain}/img/third_party/edge-addon-${color}.svg`;case detectBrowserName.U.CHROME:default:return`${this.props.context.trustedDomain}/img/third_party/ChromeWebStore_${color}.svg`}}get storeUrl(){switch(this.state.browserName){case detectBrowserName.U.CHROME:return"https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf";case detectBrowserName.U.FIREFOX:return"https://addons.mozilla.org/firefox/addon/passbolt";case detectBrowserName.U.EDGE:return"https://microsoftedge.microsoft.com/addons/detail/passbolt-extension/ljeppgjhohmhpbdhjjjbiflabdgfkhpo";default:return"https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf"}}get storeClassName(){return`browser-webstore ${this.state.browserName}`}handleRefreshClick(){window.location.reload()}render(){return react.createElement("div",{className:"install-extension"},react.createElement("h1",null,react.createElement(es.x6,null,"Please install the browser extension.")),react.createElement("p",null,react.createElement(es.x6,null,"Please download the browser extension and refresh this page to continue.")),this.state.browserName&&react.createElement("a",{href:this.storeUrl,className:this.storeClassName,target:"_blank",rel:"noopener noreferrer"},react.createElement("img",{src:this.browserStoreThumbnailUrl,alt:"browser store thumbnail"})),react.createElement("div",{className:"form-actions"},react.createElement("a",{href:this.storeUrl,className:"button primary big full-width",role:"button",target:"_blank",rel:"noopener noreferrer"},react.createElement(es.x6,null,"Download extension")),react.createElement("button",{className:"link",type:"button",onClick:this.handleRefreshClick},react.createElement(es.x6,null,"Refresh to detect extension"))))}}InstallExtension.propTypes={context:prop_types_default().any};const InstallExtension_InstallExtension=(0,AppContext.L)((0,es.CI)("common")(InstallExtension));InstallExtension.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Returns the default component state",modifiers:[],params:[],returns:null,description:"Returns the default component state"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"browserStoreThumbnailUrl",docblock:"Get the browser store thumbnail url\nBy default if unknown, return the chrome image.\n@todo handle unknown browser case\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the browser store thumbnail url\nBy default if unknown, return the chrome image."},{name:"storeUrl",docblock:"Get the browser store url.\nBy default if unknown, return the chrome webstore url.\n@todo handle unknown browser case\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the browser store url.\nBy default if unknown, return the chrome webstore url."},{name:"storeClassName",docblock:"Get the store classname\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the store classname"},{name:"handleRefreshClick",docblock:"Refresh the page",modifiers:[],params:[],returns:null,description:"Refresh the page"}],displayName:"InstallExtension",props:{context:{description:"",type:{name:"any"},required:!1}}};const InstallExtension_test_stories={title:"Components/Authentication/InstallExtension",component:InstallExtension_InstallExtension},Template=args=>react.createElement("div",{id:"container",className:"container page login"},react.createElement("div",{className:"content"},react.createElement("div",{className:"login-form"},react.createElement(react_router.MemoryRouter,{initialEntries:["/"]},react.createElement(react_router.Route,{component:routerProps=>react.createElement(InstallExtension_InstallExtension,{...args,...routerProps})}))))),defaultParameters={css:"ext_authentication"},Firefox=Template.bind({});Firefox.loaders=[async()=>{Object.defineProperty(window,"navigator",{value:{userAgent:"Firefox"},writable:!0})}],Firefox.parameters=defaultParameters;const Chrome=Template.bind({});Chrome.loaders=[async()=>{Object.defineProperty(window,"navigator",{value:{userAgent:"Chrome"},writable:!0})}],Chrome.parameters=defaultParameters;const Edge=Template.bind({});Edge.loaders=[async()=>{Object.defineProperty(window,"navigator",{value:{userAgent:"Edge"},writable:!0})}],Edge.parameters=defaultParameters;const UnsupportedBrowser=Template.bind({});UnsupportedBrowser.loaders=[async()=>{Object.defineProperty(window,"navigator",{value:{userAgent:"Unsupported Browser"},writable:!0})}],UnsupportedBrowser.parameters=defaultParameters;const __namedExportsOrder=["Firefox","Chrome","Edge","UnsupportedBrowser"];Firefox.parameters={...Firefox.parameters,docs:{...Firefox.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <InstallExtension {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Firefox.parameters?.docs?.source}}},Chrome.parameters={...Chrome.parameters,docs:{...Chrome.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <InstallExtension {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Chrome.parameters?.docs?.source}}},Edge.parameters={...Edge.parameters,docs:{...Edge.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <InstallExtension {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Edge.parameters?.docs?.source}}},UnsupportedBrowser.parameters={...UnsupportedBrowser.parameters,docs:{...UnsupportedBrowser.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <InstallExtension {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...UnsupportedBrowser.parameters?.docs?.source}}}},"./src/shared/lib/Browser/detectBrowserName.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>BROWSER_NAMES,h:()=>detectBrowserName});const BROWSER_NAMES={CHROME:"chrome",EDGE:"edge",FIREFOX:"firefox",INTERNET_EXPLORER:"internet-explorer",OPERA:"opera",SAFARI:"safari",SAMSUNG:"samsung",UNKNOWN:"unknown"};function detectBrowserName(){const userAgent=window.navigator.userAgent.toLowerCase();let browserName;return browserName=userAgent.indexOf("firefox")>-1?BROWSER_NAMES.FIREFOX:userAgent.indexOf("samsungbrowser")>-1?BROWSER_NAMES.SAMSUNG:userAgent.indexOf("opera")>-1||userAgent.indexOf("opr")>-1?BROWSER_NAMES.OPERA:userAgent.indexOf("trident")>-1?BROWSER_NAMES.INTERNET_EXPLORER:userAgent.indexOf("edg")>-1?BROWSER_NAMES.EDGE:userAgent.indexOf("chrome")>-1?BROWSER_NAMES.CHROME:userAgent.indexOf("safari")>-1?BROWSER_NAMES.SAFARI:BROWSER_NAMES.UNKNOWN,browserName}}}]);