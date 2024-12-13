/*! For license information please see 8178.79a07c07.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[8178],{"./src/react-extension/components/Common/Dropdown/Dropdown.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_DropdownContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Dropdown/DropdownContext.js");class Dropdown extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DropdownContext__WEBPACK_IMPORTED_MODULE_1__.Ay,null,this.props.children)}}Dropdown.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any.isRequired};const __WEBPACK_DEFAULT_EXPORT__=Dropdown;Dropdown.__docgenInfo={description:"This component acts as an anchor for the dropdown button.",methods:[],displayName:"Dropdown",props:{children:{description:"",type:{name:"any"},required:!0}}}},"./src/react-extension/components/Common/Dropdown/DropdownButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_DropdownContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Dropdown/DropdownContext.js");class DropdownButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleDropdownMenuClickEvent=this.handleDropdownMenuClickEvent.bind(this)}handleDropdownMenuClickEvent(){this.props.dropdownContext.onOpen()}get dropdownOpen(){return this.props.dropdownContext.dropdownOpen}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",className:`${this.props.className} ${this.dropdownOpen?"open":""}`,disabled:this.props.disabled,onClick:this.handleDropdownMenuClickEvent},this.props.children)}}DropdownButton.defaultProps={disabled:!1,direction:"right",className:"button-dropdown"},DropdownButton.propTypes={className:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,direction:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,dropdownContext:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_DropdownContext__WEBPACK_IMPORTED_MODULE_1__.Mv)(DropdownButton);DropdownButton.__docgenInfo={description:"This component acts as an anchor for the dropdown button.",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleDropdownMenuClickEvent",docblock:"Handle create click event",modifiers:[],params:[],returns:null,description:"Handle create click event"},{name:"dropdownOpen",docblock:"Dropdown open\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Dropdown open"}],displayName:"DropdownButton",props:{disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},direction:{defaultValue:{value:'"right"',computed:!1},description:"",type:{name:"string"},required:!1},className:{defaultValue:{value:'"button-dropdown"',computed:!1},description:"",type:{name:"string"},required:!1},dropdownContext:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/components/Common/Dropdown/DropdownContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>DropdownContextProvider,Mv:()=>withDropdown});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const DropdownContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({dropdownOpen:!1,onOpen:()=>{},onClose:()=>{}});class DropdownContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks(),this.createRefs()}get defaultState(){return{dropdownOpen:!1,onClose:this.handleCloseDropdown.bind(this),onOpen:this.handleOpenDropdown.bind(this)}}createRefs(){this.dropdownRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}bindCallbacks(){this.handleDocumentClickEvent=this.handleDocumentClickEvent.bind(this),this.handleDocumentContextualMenuEvent=this.handleDocumentContextualMenuEvent.bind(this),this.handleDocumentDragStartEvent=this.handleDocumentDragStartEvent.bind(this),this.handleCloseDropdown=this.handleCloseDropdown.bind(this)}componentDidMount(){document.addEventListener("click",this.handleDocumentClickEvent,{capture:!0}),document.addEventListener("contextmenu",this.handleDocumentContextualMenuEvent,{capture:!0}),document.addEventListener("dragstart",this.handleDocumentDragStartEvent,{capture:!0})}componentWillUnmount(){document.removeEventListener("click",this.handleDocumentClickEvent,{capture:!0}),document.removeEventListener("contextmenu",this.handleDocumentContextualMenuEvent,{capture:!0}),document.removeEventListener("dragstart",this.handleDocumentDragStartEvent,{capture:!0})}handleDocumentDragStartEvent(){this.handleCloseDropdown()}handleDocumentClickEvent(event){this.dropdownRef.current.contains(event.target)||this.handleCloseDropdown()}handleDocumentContextualMenuEvent(event){this.dropdownRef.current.contains(event.target)||this.handleCloseDropdown()}handleCloseDropdown(){this.setState({dropdownOpen:!1})}handleOpenDropdown(){const dropdownOpen=!this.state.dropdownOpen;this.setState({dropdownOpen})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DropdownContext.Provider,{value:this.state},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dropdown",ref:this.dropdownRef},this.props.children))}}function withDropdown(WrappedComponent){return class withDropdown extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DropdownContext.Consumer,null,(dropdownContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{dropdownContext,...this.props})))}}}DropdownContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},DropdownContextProvider.__docgenInfo={description:"This component represents a Dropdown Context",methods:[{name:"defaultState",docblock:"Get default state\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"createRefs",docblock:"Create DOM nodes or React elements references in order to be able to access them programmatically.",modifiers:[],params:[],returns:null,description:"Create DOM nodes or React elements references in order to be able to access them programmatically."},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleDocumentDragStartEvent",docblock:"Handle drag start event on document. Hide the component if any.",modifiers:[],params:[],returns:null,description:"Handle drag start event on document. Hide the component if any."},{name:"handleDocumentClickEvent",docblock:"Handle click events on document. Hide the component if the click occurred outside of the component.\n@param {ReactEvent} event The event",modifiers:[],params:[{name:"event",description:"The event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle click events on document. Hide the component if the click occurred outside of the component."},{name:"handleDocumentContextualMenuEvent",docblock:"Handle contextual menu events on document. Hide the component if the click occurred outside of the component.\n@param {ReactEvent} event The event",modifiers:[],params:[{name:"event",description:"The event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle contextual menu events on document. Hide the component if the click occurred outside of the component."},{name:"handleCloseDropdown",docblock:"Removes dropdown items",modifiers:[],params:[],returns:null,description:"Removes dropdown items"},{name:"handleOpenDropdown",docblock:"Removes dropdown items",modifiers:[],params:[],returns:null,description:"Removes dropdown items"}],displayName:"DropdownContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/components/Common/Dropdown/DropdownMenu.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_DropdownContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Dropdown/DropdownContext.js");class DropdownMenu extends react__WEBPACK_IMPORTED_MODULE_0__.Component{get dropdownMenuMustShow(){return this.props.dropdownContext.dropdownOpen}render(){return this.dropdownMenuMustShow&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",{className:`dropdown-content menu visible ${this.props.direction}`},this.props.children)}}DropdownMenu.defaultProps={direction:"right"},DropdownMenu.propTypes={direction:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,dropdownContext:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_DropdownContext__WEBPACK_IMPORTED_MODULE_1__.Mv)(DropdownMenu);DropdownMenu.__docgenInfo={description:"This component acts as a dropdown item.",methods:[{name:"dropdownMenuMustShow",docblock:"Dropdown must show menu",modifiers:["get"],params:[],returns:null,description:"Dropdown must show menu"}],displayName:"DropdownMenu",props:{direction:{defaultValue:{value:'"right"',computed:!1},description:"",type:{name:"string"},required:!1},dropdownContext:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/components/Common/Dropdown/DropdownMenuItem.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_DropdownContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Dropdown/DropdownContext.js");class DropdownMenuItem extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallback()}bindCallback(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.keepOpenOnClick||this.props.dropdownContext.onClose()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{onClick:this.handleClick,className:""+(this.props.separator?"separator-after":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},this.props.children))))}}DropdownMenuItem.defaultProps={keepOpenOnClick:!1},DropdownMenuItem.propTypes={separator:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,keepOpenOnClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,dropdownContext:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_DropdownContext__WEBPACK_IMPORTED_MODULE_1__.Mv)(DropdownMenuItem);DropdownMenuItem.__docgenInfo={description:"This component acts as a dropdown item.",methods:[{name:"bindCallback",docblock:"Bind class methods callback",modifiers:[],params:[],returns:null,description:"Bind class methods callback"},{name:"handleClick",docblock:"Handle click item",modifiers:[],params:[],returns:null,description:"Handle click item"}],displayName:"DropdownMenuItem",props:{keepOpenOnClick:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},separator:{description:"",type:{name:"bool"},required:!1},dropdownContext:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}}}]);