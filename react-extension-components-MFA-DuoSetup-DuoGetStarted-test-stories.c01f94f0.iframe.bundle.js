/*! For license information please see react-extension-components-MFA-DuoSetup-DuoGetStarted-test-stories.c01f94f0.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[9287],{"./src/react-extension/components/MFA/DuoSetup/DuoGetStarted.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_MFAContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/contexts/MFAContext.js"),_DisplayProviderList_DisplayProviderList_test_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/MFA/DisplayProviderList/DisplayProviderList.test.data.js"),_DuoGetStarted__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/MFA/DuoSetup/DuoGetStarted.js"),_test_mock_components_Internationalisation_MockTranslationProvider__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/MFA/DuoGetStarted",component:_DuoGetStarted__WEBPACK_IMPORTED_MODULE_3__.A},Default=(args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_contexts_MFAContext__WEBPACK_IMPORTED_MODULE_1__.N8,args,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_test_mock_components_Internationalisation_MockTranslationProvider__WEBPACK_IMPORTED_MODULE_4__.A,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"panel middle"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"grid grid-responsive-12"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DuoGetStarted__WEBPACK_IMPORTED_MODULE_3__.A,args)))),";")).bind({});Default.args=(0,_DisplayProviderList_DisplayProviderList_test_data__WEBPACK_IMPORTED_MODULE_2__.Gs)();const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => <MfaContextProvider {...args}>\n    <MockTranslationProvider>\n      <div className="panel middle">\n        <div className="grid grid-responsive-12">\n          <DuoGetStarted {...args} />\n        </div>\n      </div>\n    </MockTranslationProvider>;\n  </MfaContextProvider>',...Default.parameters?.docs?.source}}}},"./src/react-extension/components/MFA/DisplayProviderList/DisplayProviderList.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Gs:()=>defaultProps,Ek:()=>mockMfaContext,dG:()=>propsWithMfaProviders,rC:()=>propsWithoutMfaProviders});var RbacContext_test_data=__webpack_require__("./src/shared/context/Rbac/RbacContext.test.data.js"),ExtAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js"),MfaPolicyEnumeration=__webpack_require__("./src/shared/models/mfaPolicy/MfaPolicyEnumeration.js");const noMfaDefined={totp:!1,duo:!1,yubikey:!1},mfaDefined={totp:!0,duo:!1,yubikey:!1},allProviders={totp:!0,duo:!0,yubikey:!0};MfaPolicyEnumeration.F.MANDATORY,MfaPolicyEnumeration.F.OPTIN;function defaultProps(props={}){return{context:(0,ExtAppContext_test_data.st)(props.appContext),mfaContext:mockMfaContext(props.mfaContext),rbacContext:(0,RbacContext_test_data.mM)()}}function mockMfaContext(props={}){return{findPolicy:jest.fn(),getPolicy:jest.fn(),findMfaSettings:jest.fn(),hasMfaSettings:jest.fn(),isProcessing:jest.fn(),hasMfaOrganisationSettings:jest.fn(),validateYubikeyCode:jest.fn(),goToProviderList:jest.fn(),navigate:jest.fn(),...props}}const httpsTrustedDomain={userSettings:{getTrustedDomain:()=>"https://localhost:6006"}};function propsWithMfaProviders(props={}){const propsWithProviders=defaultProps({appContext:httpsTrustedDomain,mfaContext:{hasMfaOrganisationSettings:()=>!0,getMfaOrganisationSettings:()=>allProviders,getMfaUserSettings:()=>mfaDefined,setProvider:jest.fn(),navigate:jest.fn()}});return Object.assign(propsWithProviders,props)}function propsWithoutMfaProviders(props={}){const propsWithoutProviders=defaultProps({appContext:httpsTrustedDomain,mfaContext:{getMfaOrganisationSettings:()=>noMfaDefined,getMfaUserSettings:()=>noMfaDefined,hasMfaOrganisationSettings:()=>!1}});return Object.assign(propsWithoutProviders,props)}},"./src/shared/context/Rbac/RbacContext.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E2:()=>defaultAdministratorRbacContext,UO:()=>denyRbacContext,mM:()=>defaultUserRbacContext});__webpack_require__("./src/shared/models/entity/groupUser/groupUserEntity.test.data.js"),__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js");function defaultAdministratorRbacContext(data={}){return{canIUseUiAction:()=>!0,...data}}function defaultUserRbacContext(data={}){return{canIUseUiAction:()=>!0,...data}}function denyRbacContext(data={}){return{canIUseUiAction:()=>!1,...data}}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/v5.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v5});var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js"),validate=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");const esm_browser_parse=function parse(uuid){if(!(0,validate.A)(uuid))throw TypeError("Invalid UUID");var v,arr=new Uint8Array(16);return arr[0]=(v=parseInt(uuid.slice(0,8),16))>>>24,arr[1]=v>>>16&255,arr[2]=v>>>8&255,arr[3]=255&v,arr[4]=(v=parseInt(uuid.slice(9,13),16))>>>8,arr[5]=255&v,arr[6]=(v=parseInt(uuid.slice(14,18),16))>>>8,arr[7]=255&v,arr[8]=(v=parseInt(uuid.slice(19,23),16))>>>8,arr[9]=255&v,arr[10]=(v=parseInt(uuid.slice(24,36),16))/1099511627776&255,arr[11]=v/4294967296&255,arr[12]=v>>>24&255,arr[13]=v>>>16&255,arr[14]=v>>>8&255,arr[15]=255&v,arr};function f(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:case 3:return x^y^z;case 2:return x&y^x&z^y&z}}function ROTL(x,n){return x<<n|x>>>32-n}const esm_browser_v5=function v35(name,version,hashfunc){function generateUUID(value,namespace,buf,offset){if("string"==typeof value&&(value=function stringToBytes(str){str=unescape(encodeURIComponent(str));for(var bytes=[],i=0;i<str.length;++i)bytes.push(str.charCodeAt(i));return bytes}(value)),"string"==typeof namespace&&(namespace=esm_browser_parse(namespace)),16!==namespace.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var bytes=new Uint8Array(16+value.length);if(bytes.set(namespace),bytes.set(value,namespace.length),(bytes=hashfunc(bytes))[6]=15&bytes[6]|version,bytes[8]=63&bytes[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=bytes[i];return buf}return(0,stringify.A)(bytes)}try{generateUUID.name=name}catch(err){}return generateUUID.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",generateUUID.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",generateUUID}("v5",80,(function sha1(bytes){var K=[1518500249,1859775393,2400959708,3395469782],H=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof bytes){var msg=unescape(encodeURIComponent(bytes));bytes=[];for(var i=0;i<msg.length;++i)bytes.push(msg.charCodeAt(i))}else Array.isArray(bytes)||(bytes=Array.prototype.slice.call(bytes));bytes.push(128);for(var l=bytes.length/4+2,N=Math.ceil(l/16),M=new Array(N),_i=0;_i<N;++_i){for(var arr=new Uint32Array(16),j=0;j<16;++j)arr[j]=bytes[64*_i+4*j]<<24|bytes[64*_i+4*j+1]<<16|bytes[64*_i+4*j+2]<<8|bytes[64*_i+4*j+3];M[_i]=arr}M[N-1][14]=8*(bytes.length-1)/Math.pow(2,32),M[N-1][14]=Math.floor(M[N-1][14]),M[N-1][15]=8*(bytes.length-1)&4294967295;for(var _i2=0;_i2<N;++_i2){for(var W=new Uint32Array(80),t=0;t<16;++t)W[t]=M[_i2][t];for(var _t=16;_t<80;++_t)W[_t]=ROTL(W[_t-3]^W[_t-8]^W[_t-14]^W[_t-16],1);for(var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],_t2=0;_t2<80;++_t2){var s=Math.floor(_t2/20),T=ROTL(a,5)+f(s,b,c,d)+e+K[s]+W[_t2]>>>0;e=d,d=c,c=ROTL(b,30)>>>0,b=a,a=T}H[0]=H[0]+a>>>0,H[1]=H[1]+b>>>0,H[2]=H[2]+c>>>0,H[3]=H[3]+d>>>0,H[4]=H[4]+e>>>0}return[H[0]>>24&255,H[0]>>16&255,H[0]>>8&255,255&H[0],H[1]>>24&255,H[1]>>16&255,H[1]>>8&255,255&H[1],H[2]>>24&255,H[2]>>16&255,H[2]>>8&255,255&H[2],H[3]>>24&255,H[3]>>16&255,H[3]>>8&255,255&H[3],H[4]>>24&255,H[4]>>16&255,H[4]>>8&255,255&H[4]]}))},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);