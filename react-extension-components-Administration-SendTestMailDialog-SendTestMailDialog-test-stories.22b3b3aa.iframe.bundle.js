/*! For license information please see react-extension-components-Administration-SendTestMailDialog-SendTestMailDialog-test-stories.22b3b3aa.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3961],{"./src/react-extension/components/Administration/SendTestMailDialog/SendTestMailDialog.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EmailSendError:()=>EmailSendError,EmailSendSuccess:()=>EmailSendSuccess,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SendTestMailDialog_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),mockApiResponse=__webpack_require__("./test/mocks/mockApiResponse.js"),MockFetch=__webpack_require__("./src/react-extension/test/mock/MockFetch.js"),SendTestMailDialog=__webpack_require__("./src/react-extension/components/Administration/SendTestMailDialog/SendTestMailDialog.js"),ApiAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ApiAppContext.test.data.js");function defaultProps(props={}){const defaultProps1={context:(0,ApiAppContext_test_data.s)(props?.context),administrationWorkspaceContext:{setDisplayAdministrationWorkspaceAction:jest.fn(),resetDisplayAdministrationWorkspaceAction:jest.fn()},dialogContext:{open:jest.fn()}};return delete props.context,Object.assign(defaultProps1,props)}function defaultDebugResponse(data={}){return{...{debug:[{message:"Email configuration\n  -------------------------------------------------------------------------------\n  Host: smtp.mandrillapp.com\n  Port: 587\n  Username: contact@passbolt.com\n  Password: *********\n  TLS: true\n  Sending email from: test <test@passbolt.com>\n  Sending email to: no-reply@passbolt.com\n  -------------------------------------------------------------------------------\n  Trace\n  [220] smtp.mandrillapp.com ESMTP\n  > EHLO localhost\n  [250] relay-8.eu-west-1.relay-prod\n  [250] PIPELINING\n  [250] SIZE 26214400\n  [250] STARTTLS\n  [250] AUTH PLAIN LOGIN\n  [250] ENHANCEDSTATUSCODES\n  [250] 8BITMIME\n  [250] CHUNKING\n  > STARTTLS\n  [220] 2.0.0 Ready to start TLS\n  > EHLO localhost\n  [250] relay-8.eu-west-1.relay-prod\n  [250] PIPELINING\n  [250] SIZE 26214400\n  [250] AUTH PLAIN LOGIN\n  [250] ENHANCEDSTATUSCODES\n  [250] 8BITMIME\n  [250] CHUNKING\n  > AUTH PLAIN XXXXXXXXXXXXXXXXX\n  [235] 2.7.0 Authentication successful\n  > MAIL FROM:<test@passbolt.com>\n  [250] 2.1.0 Ok\n  > RCPT TO:<no-reply@passbolt.com>\n  [250] 2.1.5 Ok\n  > DATA\n  [354] End data with <CR><LF>.<CR><LF>\n  > From: test <test@passbolt.com>\n  To: no-reply@passbolt.com\n  Date: Tue, 26 Jul 2022 12:52:22 +0000\n  Message-ID: <2304-03249-20394@debian-gnu-linux-10-vm>\n  Subject: Passbolt test email\n  MIME-Version: 1.0\n  Content-Type: text/plain; charset=UTF-8\n  Content-Transfer-Encoding: 8bit\n  \n  Congratulations!\n  If you receive this email, it means that your passbolt smtp configuration is working fine.\n  \n  \n  \n  \n  .\n  [250] 2.0.0 Ok: queued as 6F5ED20581\n  > QUIT\n  The message has been successfully sent!"}]},...data}}var AdminSmtpSettingsContext=__webpack_require__("./src/react-extension/contexts/AdminSmtpSettingsContext.js");const SendTestMailDialog_test_stories={title:"Components/Administration/SendTestMailDialog",component:SendTestMailDialog.A};let currentStory=null;(new MockFetch.A).addPostFetchRequest(/smtp\/email\.json/,(async()=>{switch(currentStory){case"components-administration-sendtestmaildialog--email-send-success":return(0,mockApiResponse._)(defaultDebugResponse());case"components-administration-sendtestmaildialog--email-send-error":{const response={header:{message:"Something went wrong!"},body:defaultDebugResponse()};return new Response(JSON.stringify(response),{status:400})}}throw new Error("Unsupported story")}));const Template=args=>react.createElement(AdminSmtpSettingsContext.Ay,args,react.createElement(SendTestMailDialog.A,args),";"),decorators=[(Story,context)=>(currentStory=context.id,react.createElement(Story,null))],EmailSendSuccess=Template.bind({});EmailSendSuccess.args=defaultProps(),EmailSendSuccess.decorators=decorators;const EmailSendError=Template.bind({});EmailSendError.args=defaultProps(),EmailSendError.decorators=decorators;const __namedExportsOrder=["EmailSendSuccess","EmailSendError"];EmailSendSuccess.parameters={...EmailSendSuccess.parameters,docs:{...EmailSendSuccess.parameters?.docs,source:{originalSource:"args => <AdminSmtpSettingsContextProvider {...args}>\n    <SendTestMailDialog {...args} />;\n  </AdminSmtpSettingsContextProvider>",...EmailSendSuccess.parameters?.docs?.source}}},EmailSendError.parameters={...EmailSendError.parameters,docs:{...EmailSendError.parameters?.docs,source:{originalSource:"args => <AdminSmtpSettingsContextProvider {...args}>\n    <SendTestMailDialog {...args} />;\n  </AdminSmtpSettingsContextProvider>",...EmailSendError.parameters?.docs?.source}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}}}]);