/*! For license information please see 4790.fa36a3cf.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4790],{"./src/react-extension/components/MFA/DisplayProviderList/DisplayProviderList.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Gs:()=>defaultProps,Ek:()=>mockMfaContext,dG:()=>propsWithMfaProviders,rC:()=>propsWithoutMfaProviders});var RbacContext_test_data=__webpack_require__("./src/shared/context/Rbac/RbacContext.test.data.js"),ExtAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js"),MfaPolicyEnumeration=__webpack_require__("./src/shared/models/mfaPolicy/MfaPolicyEnumeration.js");const noMfaDefined={totp:!1,duo:!1,yubikey:!1},mfaDefined={totp:!0,duo:!1,yubikey:!1},allProviders={totp:!0,duo:!0,yubikey:!0};MfaPolicyEnumeration.F.MANDATORY,MfaPolicyEnumeration.F.OPTIN;function defaultProps(props={}){return{context:(0,ExtAppContext_test_data.st)(props.appContext),mfaContext:mockMfaContext(props.mfaContext),rbacContext:(0,RbacContext_test_data.mM)()}}function mockMfaContext(props={}){return{findPolicy:jest.fn(),getPolicy:jest.fn(),findMfaSettings:jest.fn(),hasMfaSettings:jest.fn(),isProcessing:jest.fn(),hasMfaOrganisationSettings:jest.fn(),validateYubikeyCode:jest.fn(),goToProviderList:jest.fn(),navigate:jest.fn(),...props}}const httpsTrustedDomain={userSettings:{getTrustedDomain:()=>"https://localhost:6006"}};function propsWithMfaProviders(props={}){const propsWithProviders=defaultProps({appContext:httpsTrustedDomain,mfaContext:{hasMfaOrganisationSettings:()=>!0,getMfaOrganisationSettings:()=>allProviders,getMfaUserSettings:()=>mfaDefined,setProvider:jest.fn(),navigate:jest.fn()}});return Object.assign(propsWithProviders,props)}function propsWithoutMfaProviders(props={}){const propsWithoutProviders=defaultProps({appContext:httpsTrustedDomain,mfaContext:{getMfaOrganisationSettings:()=>noMfaDefined,getMfaUserSettings:()=>noMfaDefined,hasMfaOrganisationSettings:()=>!1}});return Object.assign(propsWithoutProviders,props)}},"./src/react-extension/components/MFA/DisplayProviderList/MfaProviders.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=[{id:"totp",name:"TOTP authenticator",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",height:"5em",viewBox:"0 0 97 97",version:"1.1"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-1",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-3",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-5",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-7",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-9",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-11",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-13",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-15",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-17",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-19",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-21",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-23",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-25",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-27",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-29",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-31",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"path-33",cx:"48.5",cy:"48.5",r:"48.5"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("radialGradient",{cx:"14.6639205%",cy:"14.5530682%",fx:"14.6639205%",fy:"14.5530682%",r:"99.826875%",id:"radialGradient-35"},"  ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop",{stopColor:"#FFFFFF",stopOpacity:"0.1",offset:"0%"}),"  ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop",{stopColor:"#FFFFFF",stopOpacity:"0",offset:"100%"}))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"authenticator"},"  ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Clipped"},"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-2",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-1"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-1"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#616161",fillRule:"nonzero",mask:"url(#mask-2)",cx:"48.5",cy:"48.5",r:"48.5"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Group-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-4",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-3"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-3"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Group",mask:"url(#mask-4)"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{transform:"translate(-1.000000, -1.000000)"},"          ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{transform:"translate(0.590909, 0.590909)"},"            ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.9090909,79.7727273 C31.8624432,79.7727273 18.0454545,65.9557386 18.0454545,48.9090909 C18.0454545,31.8624432 31.8624432,18.0454545 48.9090909,18.0454545 C57.4296591,18.0454545 65.1455682,21.5010795 70.7340909,27.0840909 L83.2063068,14.611875 C74.4267045,5.83778409 62.3017045,0.40909091 48.9090909,0.40909091 C22.1238636,0.40909091 0.40909091,22.1238636 0.40909091,48.9090909 C0.40909091,75.6943182 22.1238636,97.409091 48.9090909,97.409091 C62.3017045,97.409091 74.4267045,91.9803977 83.2063068,83.2063068 L70.7340909,70.7340909 C65.1455682,76.3171023 57.4296591,79.7727273 48.9090909,79.7727273 Z",id:"Shape",fill:"#9E9E9E",fillRule:"nonzero"}),"          "),"        "),"      "),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-6",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-5"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-5"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M79.3636364,48.5 L63.9318182,48.5 C63.9318182,39.9794318 57.0205682,33.0681818 48.5,33.0681818 C39.9794318,33.0681818 33.0681818,39.9794318 33.0681818,48.5 C33.0681818,52.6500568 34.7105682,56.4143182 37.3780682,59.1920455 C37.3780682,59.1920455 37.3780682,59.1920455 37.3780682,59.1920455 L37.3670455,59.2030682 L56.4749432,78.3109659 L56.4804545,78.3164773 C69.658125,74.8002273 79.3636364,62.7854545 79.3636364,48.5 Z",id:"Shape",fill:"#424242",fillRule:"nonzero",mask:"url(#mask-6)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-8",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-7"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-7"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M97,48.5 L79.3636364,48.5 C79.3636364,62.7854545 69.6526136,74.8002273 56.4804545,78.3164773 L70.0990341,91.9350568 C86.0434091,83.9931818 97,67.5252273 97,48.5 Z",id:"Shape",fill:"#616161",fillRule:"nonzero",mask:"url(#mask-8)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-10",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-9"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-9"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.5,96.4488636 C21.8084659,96.4488636 0.154318182,74.8828977 0.00551136364,48.2244318 C0.00551136364,48.318125 0,48.4063068 0,48.5 C0,75.2852273 21.7147727,97 48.5,97 C75.2852273,97 97,75.2852273 97,48.5 C97,48.4063068 96.9944886,48.318125 96.9944886,48.2244318 C96.8456818,74.8828977 75.1915341,96.4488636 48.5,96.4488636 Z",id:"Shape",fillOpacity:"0.1",fill:"#212121",fillRule:"nonzero",mask:"url(#mask-10)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-12",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-11"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-11"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M56.4804545,78.3164773 L56.9103409,78.7463636 C69.8620455,75.0868182 79.3636364,63.1822727 79.3636364,49.0511364 L79.3636364,48.5 C79.3636364,62.7854545 69.6526136,74.8002273 56.4804545,78.3164773 Z",id:"Shape",fillOpacity:"0.05",fill:"#FFFFFF",fillRule:"nonzero",mask:"url(#mask-12)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Group-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-14",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-13"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-13"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Group",mask:"url(#mask-14)"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{transform:"translate(39.000000, 39.000000)"},"          ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{transform:"translate(0.681818, 0.681818)"},"            ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",null,"              ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.5,4.40909091 L8.81818182,4.40909091 C6.38215909,4.40909091 4.40909091,6.38215909 4.40909091,8.81818182 C4.40909091,11.2542045 6.38215909,13.2272727 8.81818182,13.2272727 L48.5,13.2272727 C50.9360227,13.2272727 52.9090909,11.2542045 52.9090909,8.81818182 C52.9090909,6.38215909 50.9360227,4.40909091 48.5,4.40909091 Z",id:"Shape",fill:"#9E9E9E",fillRule:"nonzero"}),"            "),"            ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.5,4.40909091 L8.81818182,4.40909091 C6.38215909,4.40909091 4.40909091,6.38215909 4.40909091,8.81818182 C4.40909091,11.2542045 6.38215909,13.2272727 8.81818182,13.2272727 L48.5,13.2272727 C50.9360227,13.2272727 52.9090909,11.2542045 52.9090909,8.81818182 C52.9090909,6.38215909 50.9360227,4.40909091 48.5,4.40909091 Z",id:"Shape",fill:"#BDBDBD",fillRule:"nonzero",opacity:"0.5"}),"          "),"        "),"      "),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-16",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-15"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-15"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#BDBDBD",fillRule:"nonzero",mask:"url(#mask-16)",cx:"8.81818182",cy:"48.5",r:"3.30681818"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-18",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-17"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-17"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#BDBDBD",fillRule:"nonzero",mask:"url(#mask-18)",cx:"48.5",cy:"8.81818182",r:"3.30681818"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-20",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-19"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-19"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#BDBDBD",fillRule:"nonzero",mask:"url(#mask-20)",cx:"48.5",cy:"88.1818182",r:"3.30681818"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-22",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-21"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-21"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#BDBDBD",fillRule:"nonzero",mask:"url(#mask-22)",cx:"20.3920455",cy:"20.4416477",r:"3.30681818"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-24",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-23"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-23"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#BDBDBD",fillRule:"nonzero",mask:"url(#mask-24)",cx:"20.3920455",cy:"76.6079545",r:"3.30681818"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Oval-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-26",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-25"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-25"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#757575",fillRule:"nonzero",mask:"url(#mask-26)",cx:"76.6079545",cy:"76.6079545",r:"3.30681818"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-28",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-27"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-27"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.5,44.6420455 L88.1818182,44.6420455 C90.5241477,44.6420455 92.4365909,46.4718182 92.574375,48.7755682 C92.5798864,48.681875 92.5909091,48.5936932 92.5909091,48.5 C92.5909091,46.0639773 90.6178409,44.0909091 88.1818182,44.0909091 L48.5,44.0909091 C46.0639773,44.0909091 44.0909091,46.0639773 44.0909091,48.5 C44.0909091,48.5936932 44.0964205,48.681875 44.1074432,48.7755682 C44.2452273,46.4718182 46.1576705,44.6420455 48.5,44.6420455 Z",id:"Shape",fillOpacity:"0.2",fill:"#FFFFFF",fillRule:"nonzero",mask:"url(#mask-28)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-30",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-29"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-29"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M92.574375,48.7755682 C92.4310795,51.0793182 90.5186364,52.9090909 88.1818182,52.9090909 L48.5,52.9090909 C46.1576705,52.9090909 44.2452273,51.0793182 44.1074432,48.7755682 C44.0964205,48.8692614 44.0909091,48.9574432 44.0909091,49.0511364 C44.0909091,51.4871591 46.0639773,53.4602273 48.5,53.4602273 L88.1818182,53.4602273 C90.6178409,53.4602273 92.5909091,51.4871591 92.5909091,49.0511364 C92.5909091,48.9574432 92.5853977,48.8692614 92.574375,48.7755682 Z",id:"Shape",fillOpacity:"0.2",fill:"#212121",fillRule:"nonzero",mask:"url(#mask-30)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-32",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-31"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-31"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.5,18.1875 C57.0205682,18.1875 64.7364773,21.643125 70.325,27.2261364 L83.0672727,14.4783523 C82.9735795,14.3846591 82.8853977,14.2909659 82.7917045,14.2027841 L70.325,26.675 C64.7364773,21.0919886 57.0205682,17.6363636 48.5,17.6363636 C31.4533523,17.6363636 17.6363636,31.4533523 17.6363636,48.5 C17.6363636,48.5936932 17.641875,48.681875 17.641875,48.7755682 C17.7906818,31.8556818 31.5470455,18.1875 48.5,18.1875 Z",id:"Shape",fillOpacity:"0.1",fill:"#212121",fillRule:"nonzero",mask:"url(#mask-32)"}),"    "),"    ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Shape-Clipped"},"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:"mask-34",fill:"white"},"        ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("use",{xlinkHref:"#path-33"}),"      "),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"path-33"}),"      ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M48.5,79.3636364 C31.5470455,79.3636364 17.7906818,65.6954545 17.641875,48.7755682 C17.641875,48.8692614 17.6363636,48.9574432 17.6363636,49.0511364 C17.6363636,66.0977841 31.4533523,79.9147727 48.5,79.9147727 C51.4155114,79.9147727 54.2318182,79.5014205 56.9048295,78.7463636 L56.4749432,78.3164773 C53.9342045,78.994375 51.2611932,79.3636364 48.5,79.3636364 Z M48.5,0 C21.7147727,0 0,21.7147727 0,48.5 C0,48.5936932 0.00551136364,48.681875 0.00551136364,48.7755682 C0.154318182,22.1171023 21.8084659,0.551136364 48.5,0.551136364 C61.7548295,0.551136364 73.7640909,5.86960227 82.5161364,14.4838636 L82.7972159,14.2027841 C74.0176136,5.42869318 61.8926136,0 48.5,0 Z",id:"Shape",fillOpacity:"0.1",fill:"#FFFFFF",fillRule:"nonzero",mask:"url(#mask-34)"}),"    "),"  "),"  ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"url(#radialGradient-35)",fillRule:"nonzero",cx:"48.5",cy:"48.5",r:"48.5"})))),configuration:{title:"Time based One Time Password (TOTP) is enabled!",description:"When logging in from a new device you will need to enter a unique verification code generated by an app on your mobile. "}},{id:"duo",name:"Duo",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1333.3333 1333.3333",xmlSpace:"preserve",id:"svg2",version:"1.1",height:"5em"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("metadata",{id:"metadata8"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs",{id:"defs6"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{transform:"matrix(1.3333333,0,0,-1.3333333,0,1333.3333)",id:"g10"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{transform:"scale(0.1)",id:"g12"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path14",style:{fill:"#59b734",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 10000,4999.95 C 10000,2238.49 7761.44,0 5000.09,0 2238.52,0 0,2238.49 0,4999.95 0,7761.4 2238.52,10000 5000.09,10000 7761.44,10000 10000,7761.4 10000,4999.95"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path16",style:{fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 2627.97,3949.39 H 1493.72 V 5018.13 H 3760.13 C 3726.28,4422.09 3232.32,3949.39 2627.97,3949.39"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path18",style:{fill:"#e6f3d8",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 2627.97,3949.39 H 1493.72 V 5018.13 H 3760.13 C 3726.28,4422.09 3232.32,3949.39 2627.97,3949.39"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path20",style:{fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 2627.97,6217.81 H 1493.72 V 5149.06 h 2266.41 c -33.85,595.83 -527.81,1068.75 -1132.16,1068.75"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path22",style:{fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 3866.76,6217.81 V 5083.64 c 0,-604.43 472.93,-1098.45 1068.86,-1132.27 V 6217.81 H 3866.76"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path24",style:{fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"m 7373.94,3949.39 c -604.24,0 -1098.13,472.7 -1132.15,1068.74 h 2264.49 c -34,-596.04 -527.95,-1068.74 -1132.34,-1068.74"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path26",style:{fill:"#e6f3d8",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"m 7373.94,3949.39 c -604.24,0 -1098.13,472.7 -1132.15,1068.74 h 2264.49 c -34,-596.04 -527.95,-1068.74 -1132.34,-1068.74"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path28",style:{fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"m 7373.94,6217.81 c -604.24,0 -1098.12,-472.92 -1132.15,-1068.75 h 2264.49 c -34,595.83 -527.95,1068.75 -1132.34,1068.75"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path30",style:{fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 6133.06,3951.37 H 5066.27 V 6217.82 H 6135.15 V 5083.64 c 0,-22.03 -0.81,-43.7 -2.09,-65.51 V 3951.37"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{id:"path32",style:{fill:"#e6f3d8",fillOpacity:1,fillRule:"nonzero",stroke:"none"},d:"M 6133.06,3951.37 H 5066.27 V 6217.82 H 6135.15 V 5083.64 c 0,-22.03 -0.81,-43.7 -2.09,-65.51 V 3951.37"})))),configuration:{title:"Duo multi-factor authentication is enabled!",description:"When logging in you will be asked to perform Duo Authentication."}},{id:"yubikey",name:"Yubikey",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"0 0 38 38",version:"1.1",height:"5em"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",null,"yubikey"),react__WEBPACK_IMPORTED_MODULE_0__.createElement("desc",null,"Created with Sketch."),react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs",null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{id:"yubikey",fillRule:"nonzero"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"Oval",fill:"#9ACA3C",cx:"19",cy:"19",r:"19"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("polygon",{id:"Shape",fill:"#FFFFFF",points:"19.6330475 18.8594925 22.5979793 11.0088111 27 11 19.6744596 27.8124413 15.0292528 27.8212523 17.14832 23.1601856 12 11.0273144 16.4962993 11.0185033"})))),configuration:{title:"Yubikey One Time Password is enabled!",description:"When logging in from a new device you will need a unique code generated by your yubikey."}}]},"./src/shared/context/Rbac/RbacContext.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E2:()=>defaultAdministratorRbacContext,UO:()=>denyRbacContext,mM:()=>defaultUserRbacContext});__webpack_require__("./src/shared/models/entity/groupUser/groupUserEntity.test.data.js"),__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js");function defaultAdministratorRbacContext(data={}){return{canIUseUiAction:()=>!0,...data}}function defaultUserRbacContext(data={}){return{canIUseUiAction:()=>!0,...data}}function denyRbacContext(data={}){return{canIUseUiAction:()=>!1,...data}}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/v5.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v5});var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js"),validate=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");const esm_browser_parse=function parse(uuid){if(!(0,validate.A)(uuid))throw TypeError("Invalid UUID");var v,arr=new Uint8Array(16);return arr[0]=(v=parseInt(uuid.slice(0,8),16))>>>24,arr[1]=v>>>16&255,arr[2]=v>>>8&255,arr[3]=255&v,arr[4]=(v=parseInt(uuid.slice(9,13),16))>>>8,arr[5]=255&v,arr[6]=(v=parseInt(uuid.slice(14,18),16))>>>8,arr[7]=255&v,arr[8]=(v=parseInt(uuid.slice(19,23),16))>>>8,arr[9]=255&v,arr[10]=(v=parseInt(uuid.slice(24,36),16))/1099511627776&255,arr[11]=v/4294967296&255,arr[12]=v>>>24&255,arr[13]=v>>>16&255,arr[14]=v>>>8&255,arr[15]=255&v,arr};function f(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:case 3:return x^y^z;case 2:return x&y^x&z^y&z}}function ROTL(x,n){return x<<n|x>>>32-n}const esm_browser_v5=function v35(name,version,hashfunc){function generateUUID(value,namespace,buf,offset){if("string"==typeof value&&(value=function stringToBytes(str){str=unescape(encodeURIComponent(str));for(var bytes=[],i=0;i<str.length;++i)bytes.push(str.charCodeAt(i));return bytes}(value)),"string"==typeof namespace&&(namespace=esm_browser_parse(namespace)),16!==namespace.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var bytes=new Uint8Array(16+value.length);if(bytes.set(namespace),bytes.set(value,namespace.length),(bytes=hashfunc(bytes))[6]=15&bytes[6]|version,bytes[8]=63&bytes[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=bytes[i];return buf}return(0,stringify.A)(bytes)}try{generateUUID.name=name}catch(err){}return generateUUID.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",generateUUID.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",generateUUID}("v5",80,(function sha1(bytes){var K=[1518500249,1859775393,2400959708,3395469782],H=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof bytes){var msg=unescape(encodeURIComponent(bytes));bytes=[];for(var i=0;i<msg.length;++i)bytes.push(msg.charCodeAt(i))}else Array.isArray(bytes)||(bytes=Array.prototype.slice.call(bytes));bytes.push(128);for(var l=bytes.length/4+2,N=Math.ceil(l/16),M=new Array(N),_i=0;_i<N;++_i){for(var arr=new Uint32Array(16),j=0;j<16;++j)arr[j]=bytes[64*_i+4*j]<<24|bytes[64*_i+4*j+1]<<16|bytes[64*_i+4*j+2]<<8|bytes[64*_i+4*j+3];M[_i]=arr}M[N-1][14]=8*(bytes.length-1)/Math.pow(2,32),M[N-1][14]=Math.floor(M[N-1][14]),M[N-1][15]=8*(bytes.length-1)&4294967295;for(var _i2=0;_i2<N;++_i2){for(var W=new Uint32Array(80),t=0;t<16;++t)W[t]=M[_i2][t];for(var _t=16;_t<80;++_t)W[_t]=ROTL(W[_t-3]^W[_t-8]^W[_t-14]^W[_t-16],1);for(var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],_t2=0;_t2<80;++_t2){var s=Math.floor(_t2/20),T=ROTL(a,5)+f(s,b,c,d)+e+K[s]+W[_t2]>>>0;e=d,d=c,c=ROTL(b,30)>>>0,b=a,a=T}H[0]=H[0]+a>>>0,H[1]=H[1]+b>>>0,H[2]=H[2]+c>>>0,H[3]=H[3]+d>>>0,H[4]=H[4]+e>>>0}return[H[0]>>24&255,H[0]>>16&255,H[0]>>8&255,255&H[0],H[1]>>24&255,H[1]>>16&255,H[1]>>8&255,255&H[1],H[2]>>24&255,H[2]>>16&255,H[2]>>8&255,255&H[2],H[3]>>24&255,H[3]>>16&255,H[3]>>8&255,255&H[3],H[4]>>24&255,H[4]>>16&255,H[4]>>8&255,255&H[4]]}))},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);