/*! For license information please see react-extension-components-User-FilterUsersByGroups-FilterUsersByGroup-test-stories.a603a718.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[5257],{"./src/react-extension/components/User/FilterUsersByGroups/FilterUsersByGroup.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,SelectedGroup:()=>SelectedGroup,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_FilterUsersByGroup__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/User/FilterUsersByGroups/FilterUsersByGroup.js"),_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/User/FilterUsersByGroup",component:_FilterUsersByGroup__WEBPACK_IMPORTED_MODULE_2__.A},context={groups:[{id:1,name:"Group 1"},{id:2,name:"Group 2"},{id:3,name:"Group 3"}]},Template=args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.A.Provider,{value:context},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.fS,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"panel"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.qh,{component:routerProps=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FilterUsersByGroup__WEBPACK_IMPORTED_MODULE_2__.A,{...args,...routerProps})})))),Initial=Template.bind({}),SelectedGroup=Template.bind({});SelectedGroup.args={userWorkspaceContext:{filter:{type:_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_3__.aj.GROUP,payload:{group:{id:1}}}}};const __namedExportsOrder=["Initial","SelectedGroup"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel\">\n        <Route component={routerProps => <FilterUsersByGroup {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}},SelectedGroup.parameters={...SelectedGroup.parameters,docs:{...SelectedGroup.parameters?.docs,source:{originalSource:"args => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel\">\n        <Route component={routerProps => <FilterUsersByGroup {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...SelectedGroup.parameters?.docs?.source}}}},"./src/react-extension/components/Common/ContextualMenu/ContextualMenuWrapper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class ContextualMenuWrapper extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.createRefs(),this.bindCallbacks()}get defaultState(){return{positionY:this.props.top}}bindCallbacks(){this.handleDocumentClickEvent=this.handleDocumentClickEvent.bind(this),this.handleDocumentContextualMenuEvent=this.handleDocumentContextualMenuEvent.bind(this),this.handleDocumentDragStartEvent=this.handleDocumentDragStartEvent.bind(this),this.handleDocumentScrollEvent=this.handleDocumentScrollEvent.bind(this)}createRefs(){this.elementRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}componentDidMount(){this.adjustPositionY(),document.addEventListener("click",this.handleDocumentClickEvent,{capture:!0}),document.addEventListener("contextmenu",this.handleDocumentContextualMenuEvent,{capture:!0}),document.addEventListener("dragstart",this.handleDocumentDragStartEvent,{capture:!0}),document.addEventListener("scroll",this.handleDocumentScrollEvent,{capture:!0})}componentWillUnmount(){document.removeEventListener("click",this.handleDocumentClickEvent,{capture:!0}),document.removeEventListener("contextmenu",this.handleDocumentContextualMenuEvent,{capture:!0}),document.removeEventListener("dragstart",this.handleDocumentDragStartEvent,{capture:!0}),document.removeEventListener("scroll",this.handleDocumentScrollEvent,{capture:!0})}handleDocumentScrollEvent(){this.props.hide()}handleDocumentClickEvent(event){this.elementRef.current.contains(event.target)||(event.stopPropagation(),this.props.hide())}handleDocumentContextualMenuEvent(event){this.elementRef.current.contains(event.target)||this.props.hide()}handleDocumentDragStartEvent(){this.props.hide()}adjustPositionY(){const contextMenuHeight=this.elementRef.current.offsetHeight;this.props.top+contextMenuHeight>window.innerHeight&&(this.setState({positionY:window.innerHeight-contextMenuHeight}),this.elementRef.current.style.zIndex=1e3)}getStyle(){return{position:"absolute",display:"block",left:this.props.left,top:this.state.positionY}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",{ref:this.elementRef,className:`contextual-menu ${this.props.className}`,style:this.getStyle()},this.props.children)}}ContextualMenuWrapper.defaultProps={className:""},ContextualMenuWrapper.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,left:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,hide:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,top:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=ContextualMenuWrapper;ContextualMenuWrapper.__docgenInfo={description:"The ContextualMenuWrapper has for aim to handle common contextual menus common behavior.\nYou can use it in your component as following\n\n<ContextualMenuWrapper\n  hide={callback_func} // Function to call when the contextual menu request to close itself\n  left={100} // Left position in absolute to display the contextual menu\n  top={100}> // Top position in absolute to display the contextual menu\n  <div>\n    Your contextual menu content\n  </div>\n</ContextualMenuWrapper>",methods:[{name:"defaultState",docblock:null,modifiers:["get"],params:[],returns:null},{name:"bindCallbacks",docblock:"Bind class methods callback",modifiers:[],params:[],returns:null,description:"Bind class methods callback"},{name:"createRefs",docblock:"Create DOM nodes or React elements references in order to be able to access them programmatically.",modifiers:[],params:[],returns:null,description:"Create DOM nodes or React elements references in order to be able to access them programmatically."},{name:"handleDocumentScrollEvent",docblock:"Handle scroll event on document. Hide the component if any.",modifiers:[],params:[],returns:null,description:"Handle scroll event on document. Hide the component if any."},{name:"handleDocumentClickEvent",docblock:"Handle click events on document. Hide the component if the click occurred outside of the component.\n@param {ReactEvent} event The event",modifiers:[],params:[{name:"event",description:"The event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle click events on document. Hide the component if the click occurred outside of the component."},{name:"handleDocumentContextualMenuEvent",docblock:"Handle contextual menu events on document. Hide the component if the click occurred outside of the component.\nDon't hide it if a contextual menu event occurred on the FoldersList component, this component props will be\nupdated with new datA.\n@param {ReactEvent} event The event",modifiers:[],params:[{name:"event",description:"The event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle contextual menu events on document. Hide the component if the click occurred outside of the component.\nDon't hide it if a contextual menu event occurred on the FoldersList component, this component props will be\nupdated with new datA."},{name:"handleDocumentDragStartEvent",docblock:"Handle drag start event on document. Hide the component if any.",modifiers:[],params:[],returns:null,description:"Handle drag start event on document. Hide the component if any."},{name:"adjustPositionY",docblock:null,modifiers:[],params:[],returns:null},{name:"getStyle",docblock:"Get the contextual menu style.",modifiers:[],params:[],returns:null,description:"Get the contextual menu style."}],displayName:"ContextualMenuWrapper",props:{className:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},left:{description:"",type:{name:"number"},required:!1},hide:{description:"",type:{name:"func"},required:!1},top:{description:"",type:{name:"number"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/ContextualMenuContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ContextualMenuContextProvider,t6:()=>withContextualMenu});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const ContextualMenuContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({ContextualMenu:null,show:()=>{},hide:()=>{}});class ContextualMenuContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{contextualMenus:[],show:(ContextualMenuComponent,componentProps)=>this.setState({contextualMenus:[...this.state.contextualMenus,{ContextualMenuComponent,componentProps}]}),hide:index=>this.setState({contextualMenus:this.state.contextualMenus.filter(((_,contextualMenuIndex)=>contextualMenuIndex!==index))})}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextualMenuContext.Provider,{value:this.state},this.props.children)}}function withContextualMenu(WrappedComponent){return class WithContextualMenu extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextualMenuContext.Consumer,null,(contextualMenuContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{contextualMenuContext,...this.props})))}}}ContextualMenuContextProvider.displayName="ContextualMenuContextProvider",ContextualMenuContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},ContextualMenuContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"}],displayName:"ContextualMenuContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/LoadingContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$A:()=>withLoading});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const LoadingContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({counter:[],add:()=>{},remove:()=>{}});class LoadingContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{counter:0,add:()=>{this.setState({counter:this.state.counter+1})},remove:()=>{this.setState({counter:Math.min(this.state.counter-1,0)})}}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Provider,{value:this.state},this.props.children)}}function withLoading(WrappedComponent){return class WithLoading extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Consumer,null,(loadingContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{loadingContext,...this.props})))}}}LoadingContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},LoadingContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"The component default state",modifiers:["get"],params:[],returns:null,description:"The component default state"}],displayName:"LoadingContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}}}]);