/*! For license information please see react-extension-components-AuthenticationLogin-SsoLogin-SsoLogin-test-stories.f129773d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[5084],{"./src/react-extension/components/AuthenticationLogin/SsoLogin/SsoLogin.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SsoLogin_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),SsoLogin=__webpack_require__("./src/react-extension/components/AuthenticationLogin/SsoLogin/SsoLogin.js"),UserSettings=__webpack_require__("./src/shared/lib/Settings/UserSettings.js"),ExtAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js"),SsoProviders_data=__webpack_require__("./src/react-extension/components/Administration/ManageSsoSettings/SsoProviders.data.js");const SsoLogin_test_stories={title:"Components/AuthenticationLogin/SsoLogin",component:SsoLogin.A},Initial=(args=>react.createElement("div",{id:"container",className:"container page login"},react.createElement("div",{className:"content"},react.createElement("div",{className:"login-form"},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(SsoLogin.A,{...args,...routerProps})})))))).bind({});Initial.args=function defaultProps(props={}){const userSettings=new UserSettings.A({"user.settings.trustedDomain":new URL(window.location.href).origin,"user.id":"d57c10f5-639d-5160-9c81-8a0c6c4ec856","user.username":"admin@passbolt.com","user.firstname":"Admin","user.lastname":"User","user.settings.locale":"fr-FR"}),defaultProps1={context:(0,ExtAppContext_test_data.st)({userSettings}),userSettings,onSignIn:jest.fn((()=>Promise.resolve())),onSecondaryActionClick:jest.fn((()=>Promise.resolve())),ssoProvider:SsoProviders_data.A.find((provider=>"azure"===provider.id))};return Object.assign(defaultProps1,props)}(),Initial.parameters={css:"ext_authentication"};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <SsoLogin {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/Administration/ManageSsoSettings/SsoProviders.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=[{id:"azure",name:"Microsoft",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{width:"65",height:"64",viewBox:"0 0 65 64",fill:"none",xmlns:"http://www.w3.org/2000/svg"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M31.3512 3.04762H3.92261V30.4762H31.3512V3.04762Z",fill:"#F25022"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M31.3512 33.5238H3.92261V60.9524H31.3512V33.5238Z",fill:"#00A4EF"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M61.8274 3.04762H34.3988V30.4762H61.8274V3.04762Z",fill:"#7FBA00"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M61.8274 33.5238H34.3988V60.9524H61.8274V33.5238Z",fill:"#FFB900"})),defaultConfig:{url:"https://login.microsoftonline.com",client_id:"",client_secret:"",tenant_id:"",client_secret_expiry:"",prompt:"login",email_claim:"email"}},{id:"google",name:"Google",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{width:"65",height:"64",viewBox:"0 0 65 64",fill:"none",xmlns:"http://www.w3.org/2000/svg"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M63.9451 32.72C63.9451 30.6133 63.7584 28.6133 63.4384 26.6667H33.3051V38.6933H50.5584C49.7851 42.64 47.5184 45.9733 44.1584 48.24V56.24H54.4517C60.4784 50.6667 63.9451 42.4533 63.9451 32.72Z",fill:"#4285F4"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M33.305 64C41.945 64 49.1717 61.12 54.4517 56.24L44.1583 48.24C41.2783 50.16 37.625 51.3333 33.305 51.3333C24.9583 51.3333 17.8917 45.7067 15.3583 38.1067H4.745V46.3467C9.99833 56.8 20.7983 64 33.305 64Z",fill:"#34A853"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M15.3584 38.1067C14.6917 36.1867 14.3451 34.1333 14.3451 32C14.3451 29.8667 14.7184 27.8133 15.3584 25.8933V17.6533H4.74505C2.55838 21.9733 1.30505 26.8267 1.30505 32C1.30505 37.1733 2.55838 42.0267 4.74505 46.3467L15.3584 38.1067Z",fill:"#FBBC05"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M33.305 12.6667C38.025 12.6667 42.2383 14.2933 45.5717 17.4667L54.6917 8.34667C49.1717 3.17334 41.945 0 33.305 0C20.7983 0 9.99833 7.20001 4.745 17.6533L15.3583 25.8933C17.8917 18.2933 24.9583 12.6667 33.305 12.6667Z",fill:"#EA4335"})),defaultConfig:{client_id:"",client_secret:""}},{id:"oauth2",name:"OpenID",hiddenIfDisabled:!0,disabledForRecover:!0,icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{width:"65",height:"60",viewBox:"0 0 65 60",fill:"none",xmlns:"http://www.w3.org/2000/svg"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M64.2468 34.9929L62.9089 21.0968L57.9256 23.9083C53.2914 21.0968 47.3581 19.1061 40.7332 18.3046V24.4577C44.5336 25.117 47.9462 26.3321 50.7513 27.9544L45.5031 30.9146L64.2533 34.9929H64.2468Z",fill:"#B3B3B3"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M9.94184 38.8774C9.94184 32.0069 17.4264 26.2222 27.632 24.4577V18.2981C12.023 20.1854 0.246826 28.6783 0.246826 38.8774C0.246826 49.0766 12.8891 58.1769 29.3319 59.6312V53.5557C18.2666 52.166 9.94184 46.1228 9.94184 38.8774Z",fill:"#B3B3B3"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M29.332 5.09999V59.6377L39.027 55.0746V0.362366L29.332 5.09999Z",fill:"#F8931E"})),defaultConfig:{url:"",openid_configuration_path:"",scope:"openid email profile",client_id:"",client_secret:""}},{id:"adfs",name:"AD FS",hiddenIfDisabled:!0,disabledForRecover:!0,icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{width:"65",height:"64",viewBox:"0 0 65 64",fill:"none",xmlns:"http://www.w3.org/2000/svg"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M64.5443 48.7454V62.166C64.5443 63.7378 64.0607 64.0602 62.5695 63.8184C52.5746 62.3272 42.4587 60.957 32.3831 59.5464C30.5695 59.3046 29.9247 58.6597 29.9247 56.6849C30.0859 49.5514 30.0053 42.3776 29.9247 35.1635C29.9247 33.5917 30.4083 33.1081 31.9801 33.1081C42.2975 33.1887 52.4536 33.1887 62.5695 33.1887C64.2219 33.1887 64.6249 33.8335 64.6249 35.3247C64.4637 39.8386 64.5443 44.2718 64.5443 48.7454Z",fill:"#00AAF2"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M47.416 30.6093C42.3379 30.6093 37.2598 30.5287 32.1817 30.6093C30.6099 30.6093 29.9651 30.2869 29.9651 28.4733C30.0457 21.1786 30.0457 14.0048 29.9651 6.79069C29.9651 5.38011 30.4487 4.89648 31.7787 4.65467C42.1767 3.16349 52.5747 1.7126 62.9726 0.140816C64.7862 -0.100997 64.4638 1.10807 64.4638 2.11563C64.4638 8.56399 64.5444 15.1333 64.4638 21.5816C64.4638 23.9595 64.3832 26.3373 64.4638 28.7151C64.5444 30.2063 63.9802 30.6093 62.5696 30.6093C57.5721 30.5287 52.4941 30.6093 47.416 30.6093Z",fill:"#00AAF2"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M13.8038 33.3096H25.1691C26.3782 33.3096 26.9021 33.7126 26.9021 34.962V57.37C26.9021 58.6597 26.3378 58.7806 25.1691 58.6597C17.6326 57.5312 10.096 56.4431 2.59981 55.3952C1.10863 55.1534 0.625 54.6698 0.625 53.098C0.705605 47.1332 0.705605 41.1685 0.625 35.0829C0.625 33.5917 1.02802 33.1887 2.51921 33.1887C6.34792 33.3096 10.0154 33.3096 13.8038 33.3096Z",fill:"#00AAF2"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M13.8038 30.6093H2.59977C1.18919 30.6093 0.705566 30.1257 0.705566 28.6345C0.786171 22.7504 0.786171 16.8663 0.705566 10.9418C0.705566 9.53126 1.10859 9.04763 2.59977 8.80582C10.1363 7.83856 17.6728 6.7504 25.169 5.54133C26.902 5.29952 27.0633 5.86375 27.0633 7.27433V28.7151C27.0633 30.2869 26.4184 30.5287 25.0078 30.5287C21.2597 30.5287 17.4713 30.6093 13.8038 30.6093Z",fill:"#00AAF2"})),defaultConfig:{url:"",openid_configuration_path:"",scope:"openid email profile",client_id:"",client_secret:""}}]},"./src/react-extension/components/AuthenticationLogin/SsoLogin/SsoLogin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__),_Common_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/context/AppContext/AppContext.js");class SsoLogin extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindEventHandlers()}get defaultState(){return{actions:{processing:!1}}}get areActionsAllowed(){return!this.state.actions.processing}get isProcessing(){return this.state.actions.processing}get fullname(){return this.props.userSettings?.fullName||`${this.props.account?.first_name} ${this.props.account?.last_name}`}get username(){return this.props.userSettings?.username||this.props.account?.username}get trustedDomain(){return this.props.userSettings?.getTrustedDomain()||this.props.account?.domain}bindEventHandlers(){this.handleSwitchToPassphrase=this.handleSwitchToPassphrase.bind(this),this.handleSignInWithSso=this.handleSignInWithSso.bind(this)}toggleProcessing(){this.setState({actions:{processing:!this.state.actions.processing}})}handleSwitchToPassphrase(event){event.preventDefault(),this.isProcessing||this.props.switchToPassphraseLogin()}async handleSignInWithSso(event){event.preventDefault(),this.setState({actions:{processing:!0}}),await this.props.onSsoSignIn(),this.setState({actions:{processing:!1}})}get ssoProviderData(){return this.props.ssoProvider}render(){const ssoProviderData=this.ssoProviderData;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"login"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"login-user"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_1__.A,{user:this.props.account?.user,baseUrl:this.trustedDomain,className:"big avatar user-avatar"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{className:"login-user-name"},this.fullname),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{className:"login-user-email"},this.username)),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-actions sso-login-form"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",className:`sso-login-button ${this.isProcessing?"disabled":""} ${ssoProviderData.id}`,onClick:this.handleSignInWithSso,disabled:this.isProcessing},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"provider-logo"},ssoProviderData.icon),this.props.t("Sign in with {{providerName}}",{providerName:ssoProviderData.name})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link",type:"button",onClick:this.handleSwitchToPassphrase},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Sign in with my passphrase."))))}}SsoLogin.propTypes={account:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,userSettings:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,onSsoSignIn:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func,switchToPassphraseLogin:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func,ssoProvider:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,t:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__.L)((0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(SsoLogin));SsoLogin.__docgenInfo={description:"This component allows the user to log in with his account",methods:[{name:"defaultState",docblock:"Returns the default state",modifiers:["get"],params:[],returns:null,description:"Returns the default state"},{name:"areActionsAllowed",docblock:"Returns true if the user can perform actions on the component\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user can perform actions on the component"},{name:"isProcessing",docblock:"Returns true if the component must be in a processing mode\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the component must be in a processing mode"},{name:"fullname",docblock:"Returns the user full name",modifiers:["get"],params:[],returns:null,description:"Returns the user full name"},{name:"username",docblock:"Returns the username",modifiers:["get"],params:[],returns:null,description:"Returns the username"},{name:"trustedDomain",docblock:"Returns the trusted domain",modifiers:["get"],params:[],returns:null,description:"Returns the trusted domain"},{name:"bindEventHandlers",docblock:"Handle component event handlers",modifiers:[],params:[],returns:null,description:"Handle component event handlers"},{name:"toggleProcessing",docblock:"Toggle the processing mode",modifiers:[],params:[],returns:null,description:"Toggle the processing mode"},{name:"handleSwitchToPassphrase",docblock:"Switches the UI to the passphrase mode.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Switches the UI to the passphrase mode."},{name:"handleSignInWithSso",docblock:"Handle the click on the SSO login button.\n@returns {Promise<void>}",modifiers:["async"],params:[{name:"event",optional:!1}],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Handle the click on the SSO login button."},{name:"ssoProviderData",docblock:"Returns the provider information of the current SSO provider configured.\n@return {object}",modifiers:["get"],params:[],returns:{type:{name:"object"}},description:"Returns the provider information of the current SSO provider configured."}],displayName:"SsoLogin",props:{account:{description:"",type:{name:"object"},required:!1},userSettings:{description:"",type:{name:"object"},required:!1},onSsoSignIn:{description:"",type:{name:"func"},required:!1},switchToPassphraseLogin:{description:"",type:{name:"func"},required:!1},ssoProvider:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Avatar/UserAvatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");const DEFAULT_AVATAR_URL_REGEXP=/img\/avatar\/user(_medium)?\.png$/;class UserAvatar extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.getDefaultState(),this.bindCallbacks()}getDefaultState(){return{error:!1}}bindCallbacks(){this.handleError=this.handleError.bind(this)}get avatarUrl(){return this.props?.user?.profile?.avatar?.url?.medium}propsHasUrl(){return Boolean(this.avatarUrl)}propsUrlHasProtocol(){return this.avatarUrl.startsWith("https://")||this.avatarUrl.startsWith("http://")}formatUrl(url){return`${this.props.baseUrl}/${url}`}isDefaultAvatarUrlFromApi(){return DEFAULT_AVATAR_URL_REGEXP.test(this.avatarUrl)}getAvatarSrc(){return this.propsHasUrl()?this.propsUrlHasProtocol()?this.avatarUrl:this.formatUrl(this.avatarUrl):null}handleError(){console.error(`Could not load avatar image url: ${this.getAvatarSrc()}`),this.setState({error:!0})}getAltText(){const user=this.props?.user;return user?.first_name&&user?.last_name?this.props.t("Avatar of user {{first_name}} {{last_name}}.",{firstname:user.first_name,lastname:user.last_name}):"..."}render(){const srcAvatar=this.getAvatarSrc(),shouldDisplayDefaultAvatar=this.state.error||this.isDefaultAvatarUrlFromApi()||!srcAvatar;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`${this.props.className} ${this.props.attentionRequired?"attention-required":""}`},shouldDisplayDefaultAvatar&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 42 42","aria-labelledby":"svg-title"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",{id:"svg-title"},this.getAltText()),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{fill:"#939598",cx:"21",cy:"21",r:"21"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:"#ffffff",d:"m21,23.04c-4.14,0-7.51-3.37-7.51-7.51s3.37-7.51,7.51-7.51,7.51,3.37,7.51,7.51-3.37,7.51-7.51,7.51Z"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:"#ffffff",d:"m27.17,26.53h-12.33c-2.01,0-3.89.78-5.31,2.2-1.42,1.42-2.2,3.3-2.2,5.31v1.15c3.55,3.42,8.36,5.53,13.67,5.53s10.13-2.11,13.67-5.53v-1.15c0-2.01-.78-3.89-2.2-5.31-1.42-1.42-3.3-2.2-5.31-2.2Z"})),!shouldDisplayDefaultAvatar&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{src:srcAvatar,onError:this.handleError,alt:this.getAltText()}),this.props.attentionRequired&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"exclamation"}))}}UserAvatar.defaultProps={className:"avatar user-avatar"},UserAvatar.propTypes={baseUrl:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,user:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,attentionRequired:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,className:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,t:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(UserAvatar);UserAvatar.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Get default state\n@returns {*}",modifiers:[],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"avatarUrl",docblock:"Returns the current avatar URL from the props\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Returns the current avatar URL from the props"},{name:"propsHasUrl",docblock:"Return true if the user from props contains a valid profile with avatar url properties\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Return true if the user from props contains a valid profile with avatar url properties"},{name:"propsUrlHasProtocol",docblock:"Check if the url has a protocol like http or https?\n@todo only check https for now\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Check if the url has a protocol like http or https?"},{name:"formatUrl",docblock:"Format the avatar url to point on the site url.\n@param {string} url The relative url\n@returns {string}",modifiers:[],params:[{name:"url",description:"The relative url",type:{name:"string"},optional:!1}],returns:{type:{name:"string"}},description:"Format the avatar url to point on the site url."},{name:"isDefaultAvatarUrlFromApi",docblock:"Returns true if the given URL matches a default avatar from the API\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the given URL matches a default avatar from the API"},{name:"getAvatarSrc",docblock:"Get the user avatar url. If the user has no avatar defined, return the default one.\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the user avatar url. If the user has no avatar defined, return the default one."},{name:"handleError",docblock:"Handle error while loading the user avatar image.\nBy instance when the image is not present on the server.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle error while loading the user avatar image.\nBy instance when the image is not present on the server."},{name:"getAltText",docblock:"Get the user avatar image alternative text.\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the user avatar image alternative text."}],displayName:"UserAvatar",props:{className:{defaultValue:{value:'"avatar user-avatar"',computed:!1},description:"",type:{name:"string"},required:!1},baseUrl:{description:"",type:{name:"string"},required:!1},user:{description:"",type:{name:"object"},required:!1},attentionRequired:{description:"",type:{name:"bool"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/abstract/entity.js"),validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/validator/es/lib/util/assertString.js"),_entityValidationError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");const SCALAR_PROPERTY_TYPES=["string","number","integer","boolean"];class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_2__.A{static _cachedSchema={};constructor(dtos={},options={}){const validate=options?.validate??!0;if(super(dtos,options),this.marshall(),validate){const error=this.validate({schema:options?.schema,validateBuildRules:options?.validateBuildRules});if(error)throw error}}marshall(){}validate(options={}){try{this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules)}catch(error){if(!(error instanceof _entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A))throw error;return error}return null}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}get(propName){(0,validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__.A)(propName);const schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');return this._props[propName]}set(propName,value,options={}){(0,validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__.A)(propName);const validate=options?.validate??!0,schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');validate&&_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validateProp(propName,value,schemaProperties),this._props[propName]=value}diffProps(compareEntity){if(!(compareEntity instanceof EntityV2))throw new TypeError('The property "compareEntity" should be of "EntityV2" type.');const diff={};for(const prop of Object.keys(this._props)){const schemaProperties=this.constructor.getSchema().properties[prop];if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))continue;const comparedPropValue=compareEntity.get(prop);this.get(prop)!==comparedPropValue&&(diff[prop]=comparedPropValue)}return diff}hasDiffProps(compareEntity){const diff=this.diffProps(compareEntity);return Object.keys(diff).length>0}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/v5.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v5});var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js"),validate=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");const esm_browser_parse=function parse(uuid){if(!(0,validate.A)(uuid))throw TypeError("Invalid UUID");var v,arr=new Uint8Array(16);return arr[0]=(v=parseInt(uuid.slice(0,8),16))>>>24,arr[1]=v>>>16&255,arr[2]=v>>>8&255,arr[3]=255&v,arr[4]=(v=parseInt(uuid.slice(9,13),16))>>>8,arr[5]=255&v,arr[6]=(v=parseInt(uuid.slice(14,18),16))>>>8,arr[7]=255&v,arr[8]=(v=parseInt(uuid.slice(19,23),16))>>>8,arr[9]=255&v,arr[10]=(v=parseInt(uuid.slice(24,36),16))/1099511627776&255,arr[11]=v/4294967296&255,arr[12]=v>>>24&255,arr[13]=v>>>16&255,arr[14]=v>>>8&255,arr[15]=255&v,arr};function f(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:case 3:return x^y^z;case 2:return x&y^x&z^y&z}}function ROTL(x,n){return x<<n|x>>>32-n}const esm_browser_v5=function v35(name,version,hashfunc){function generateUUID(value,namespace,buf,offset){if("string"==typeof value&&(value=function stringToBytes(str){str=unescape(encodeURIComponent(str));for(var bytes=[],i=0;i<str.length;++i)bytes.push(str.charCodeAt(i));return bytes}(value)),"string"==typeof namespace&&(namespace=esm_browser_parse(namespace)),16!==namespace.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var bytes=new Uint8Array(16+value.length);if(bytes.set(namespace),bytes.set(value,namespace.length),(bytes=hashfunc(bytes))[6]=15&bytes[6]|version,bytes[8]=63&bytes[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=bytes[i];return buf}return(0,stringify.A)(bytes)}try{generateUUID.name=name}catch(err){}return generateUUID.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",generateUUID.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",generateUUID}("v5",80,(function sha1(bytes){var K=[1518500249,1859775393,2400959708,3395469782],H=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof bytes){var msg=unescape(encodeURIComponent(bytes));bytes=[];for(var i=0;i<msg.length;++i)bytes.push(msg.charCodeAt(i))}else Array.isArray(bytes)||(bytes=Array.prototype.slice.call(bytes));bytes.push(128);for(var l=bytes.length/4+2,N=Math.ceil(l/16),M=new Array(N),_i=0;_i<N;++_i){for(var arr=new Uint32Array(16),j=0;j<16;++j)arr[j]=bytes[64*_i+4*j]<<24|bytes[64*_i+4*j+1]<<16|bytes[64*_i+4*j+2]<<8|bytes[64*_i+4*j+3];M[_i]=arr}M[N-1][14]=8*(bytes.length-1)/Math.pow(2,32),M[N-1][14]=Math.floor(M[N-1][14]),M[N-1][15]=8*(bytes.length-1)&4294967295;for(var _i2=0;_i2<N;++_i2){for(var W=new Uint32Array(80),t=0;t<16;++t)W[t]=M[_i2][t];for(var _t=16;_t<80;++_t)W[_t]=ROTL(W[_t-3]^W[_t-8]^W[_t-14]^W[_t-16],1);for(var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],_t2=0;_t2<80;++_t2){var s=Math.floor(_t2/20),T=ROTL(a,5)+f(s,b,c,d)+e+K[s]+W[_t2]>>>0;e=d,d=c,c=ROTL(b,30)>>>0,b=a,a=T}H[0]=H[0]+a>>>0,H[1]=H[1]+b>>>0,H[2]=H[2]+c>>>0,H[3]=H[3]+d>>>0,H[4]=H[4]+e>>>0}return[H[0]>>24&255,H[0]>>16&255,H[0]>>8&255,255&H[0],H[1]>>24&255,H[1]>>16&255,H[1]>>8&255,255&H[1],H[2]>>24&255,H[2]>>16&255,H[2]>>8&255,255&H[2],H[3]>>24&255,H[3]>>16&255,H[3]>>8&255,255&H[3],H[4]>>24&255,H[4]>>16&255,H[4]>>8&255,255&H[4]]}))},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);