/*! For license information please see 6650.647559f1.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[6650],{"./src/react-extension/components/User/DisplayUsers/DisplayUsers.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DisplayUsers_DisplayUsers});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),react=__webpack_require__("./node_modules/react/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),ActionFeedbackContext=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),ContextualMenuContext=__webpack_require__("./src/react-extension/contexts/ContextualMenuContext.js"),UserWorkspaceContext=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.js"),DisplayUsersContextualMenu=__webpack_require__("./src/react-extension/components/User/DisplayUsersContextualMenu/DisplayUsersContextualMenu.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),AccountRecoveryUserContext=__webpack_require__("./src/react-extension/contexts/AccountRecoveryUserContext.js"),userUtils=__webpack_require__("./src/shared/utils/userUtils.js"),ColumnCheckboxModel=__webpack_require__("./src/shared/models/column/ColumnCheckboxModel.js"),CellChecbox=__webpack_require__("./src/shared/components/Table/CellChecbox.js"),CellHeaderCheckbox=__webpack_require__("./src/shared/components/Table/CellHeaderCheckbox.js"),CellHeaderDefault=__webpack_require__("./src/shared/components/Table/CellHeaderDefault.js"),ColumnModifiedModel=__webpack_require__("./src/shared/models/column/ColumnModifiedModel.js"),CellDate=__webpack_require__("./src/shared/components/Table/CellDate.js"),GridTable=__webpack_require__("./src/shared/components/Table/GridTable.js"),attention=__webpack_require__("./src/img/svg/attention.svg");class CellUserProfile extends react.Component{get isAttentionRequired(){return Boolean(this.props.value.pending_account_recovery_request)}get name(){return`${this.props.value.profile?.first_name} ${this.props.value.profile?.last_name}`}render(){const hasAttentionRequired=this.props.hasAttentionRequiredFeature&&this.isAttentionRequired;return react.createElement("div",{title:this.name},react.createElement("span",null,this.name),hasAttentionRequired&&react.createElement(attention.A,{className:"attention-required"}))}}CellUserProfile.propTypes={value:prop_types_default().object.isRequired,hasAttentionRequiredFeature:prop_types_default().bool.isRequired};const Table_CellUserProfile=(0,react.memo)(CellUserProfile);CellUserProfile.__docgenInfo={description:"This component represents a table cell user profile name",methods:[{name:"isAttentionRequired",docblock:"Returns true if the given date is under the current date.\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the given date is under the current date."},{name:"name",docblock:"Get the name\n@return {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Get the name"}],displayName:"CellUserProfile",props:{value:{description:"",type:{name:"object"},required:!0},hasAttentionRequiredFeature:{description:"",type:{name:"bool"},required:!0}}};var ColumnModel=__webpack_require__("./src/shared/models/column/ColumnModel.js");class ColumnUserUsernameModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.USERNAME,columnDto.field=ColumnModel.uH.USER_USERNAME,columnDto.width=columnDto.width||145,columnDto.defaultWidth=145,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,super(columnDto)}}const column_ColumnUserUsernameModel=ColumnUserUsernameModel;class CellUserRole extends react.Component{get roleName(){return this.props.userWorkspaceContext.getTranslatedRoleName(this.props.value)}render(){return react.createElement("div",{title:this.roleName},react.createElement("span",null,this.roleName))}}CellUserRole.propTypes={value:prop_types_default().string.isRequired,userWorkspaceContext:prop_types_default().any};const Table_CellUserRole=(0,UserWorkspaceContext.zY)(CellUserRole);CellUserRole.__docgenInfo={description:"This component represents a table cell user role name",methods:[{name:"roleName",docblock:"Get the name\n@return {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Get the name"}],displayName:"CellUserRole",props:{value:{description:"",type:{name:"string"},required:!0},userWorkspaceContext:{description:"",type:{name:"any"},required:!1}}};class ColumnUserRoleModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.ROLE,columnDto.field=ColumnModel.uH.USER_ROLE,columnDto.width=columnDto.width||100,columnDto.defaultWidth=100,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,super(columnDto)}}const column_ColumnUserRoleModel=ColumnUserRoleModel;class ColumnUserProfileModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.NAME,columnDto.field=ColumnModel.uH.USER_PROFILE,columnDto.width=columnDto.width||145,columnDto.defaultWidth=145,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,columnDto.getValue=value=>value,super(columnDto)}}const column_ColumnUserProfileModel=ColumnUserProfileModel;class ColumnUserSuspendedModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.SUSPENDED,columnDto.field=ColumnModel.uH.USER_SUSPENDED,columnDto.width=columnDto.width||145,columnDto.defaultWidth=145,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,super(columnDto)}}const column_ColumnUserSuspendedModel=ColumnUserSuspendedModel;class ColumnUserLastLoggedInModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.LAST_LOGGED_IN,columnDto.field=ColumnModel.uH.USER_LAST_LOGGED_IN,columnDto.width=columnDto.width||145,columnDto.defaultWidth=145,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,super(columnDto)}}const column_ColumnUserLastLoggedInModel=ColumnUserLastLoggedInModel;class ColumnUserMfaModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.MFA,columnDto.field=ColumnModel.uH.USER_MFA,columnDto.width=columnDto.width||145,columnDto.defaultWidth=145,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,super(columnDto)}}const column_ColumnUserMfaModel=ColumnUserMfaModel;class CellUserSuspended extends react.Component{get value(){return this.props.value?this.props.t("Yes"):this.props.t("No")}render(){return react.createElement("div",{title:this.value},react.createElement("span",null,this.value))}}CellUserSuspended.propTypes={value:prop_types_default().string,t:prop_types_default().func};const Table_CellUserSuspended=(0,es.CI)("common")(CellUserSuspended);CellUserSuspended.__docgenInfo={description:"This component represents a table cell user suspended",methods:[{name:"value",docblock:"Get the value\n@return {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the value"}],displayName:"CellUserSuspended",props:{value:{description:"",type:{name:"string"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};class CellUserMfa extends react.Component{get value(){return this.props.value?this.props.t("Enabled"):this.props.t("Disabled")}render(){return react.createElement("div",{title:this.value},react.createElement("span",null,this.value))}}CellUserMfa.propTypes={value:prop_types_default().bool,t:prop_types_default().func};const Table_CellUserMfa=(0,es.CI)("common")(CellUserMfa);CellUserMfa.__docgenInfo={description:"This component represents a table cell user MFA",methods:[{name:"value",docblock:"Get the value\n@return {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the value"}],displayName:"CellUserMfa",props:{value:{description:"",type:{name:"bool"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};class ColumnUserAccountRecoveryModel extends ColumnModel.Ay{constructor(columnDto={}){columnDto.id=ColumnModel.nN.ACCOUNT_RECOVERY,columnDto.field=ColumnModel.uH.USER_ACCOUNT_RECOVERY,columnDto.width=columnDto.width||145,columnDto.defaultWidth=145,columnDto.resizable=!0,columnDto.draggable=!0,columnDto.sortable=!0,super(columnDto)}}const column_ColumnUserAccountRecoveryModel=ColumnUserAccountRecoveryModel;class CellUserAccountRecovery extends react.Component{get value(){switch(this.props.value){case"approved":return this.props.t("Approved");case"rejected":return this.props.t("Rejected");default:return this.props.t("Pending")}}render(){return react.createElement("div",{title:this.value},react.createElement("span",null,this.value))}}CellUserAccountRecovery.propTypes={value:prop_types_default().object,t:prop_types_default().func};const Table_CellUserAccountRecovery=(0,es.CI)("common")(CellUserAccountRecovery);CellUserAccountRecovery.__docgenInfo={description:"This component represents a table cell user account recovery status",methods:[{name:"value",docblock:"Get the value\n@return {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the value"}],displayName:"CellUserAccountRecovery",props:{value:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var columnsSettingCollection=__webpack_require__("./src/shared/models/entity/columnSetting/columnsSettingCollection.js");class ColumnsUserSettingCollection extends columnsSettingCollection.A{static get DEFAULT(){return new columnsSettingCollection.A([{id:"name",label:"Name",position:1,show:!0},{id:"username",label:"Username",position:2,show:!0},{id:"role",label:"Role",position:3,show:!0},{id:"suspended",label:"Suspended",position:4,show:!0},{id:"modified",label:"Modified",position:5,show:!0},{id:"last_logged_in",label:"Last logged in",position:6,show:!0},{id:"mfa",label:"MFA",position:6,show:!0},{id:"account_recovery",label:"Account Recovery",position:8,show:!0}])}}const columnsUserSettingCollection=ColumnsUserSettingCollection;var circle_off=__webpack_require__("./src/img/svg/circle_off.svg");class DisplayUsers extends react.Component{constructor(props){super(props),this.defaultColumns=[],this.state=this.getDefaultState(),this.initEventHandlers(),this.createRefs()}getDefaultState(){return{columns:[]}}initEventHandlers(){this.handleUserSelected=this.handleUserSelected.bind(this),this.handleUserRightClick=this.handleUserRightClick.bind(this),this.handleCheckboxWrapperClick=this.handleCheckboxWrapperClick.bind(this),this.handleSortByColumnClick=this.handleSortByColumnClick.bind(this),this.isRowInactive=this.isRowInactive.bind(this)}createRefs(){this.listRef=react.createRef()}async componentDidMount(){await this.props.accountRecoveryContext.loadAccountRecoveryPolicy(),this.initColumns(),this.mergeAndSortColumns()}componentDidUpdate(){this.handleUserScroll()}initColumns(){this.defaultColumns.push(new ColumnCheckboxModel.A({cellRenderer:{component:CellChecbox.A,props:{onClick:this.handleCheckboxWrapperClick}},headerCellRenderer:{component:CellHeaderCheckbox.A,props:{disabled:!0}}})),this.defaultColumns.push(new column_ColumnUserProfileModel({cellRenderer:{component:Table_CellUserProfile,props:{hasAttentionRequiredFeature:this.hasAttentionRequiredColumn}},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Name")}}})),this.defaultColumns.push(new column_ColumnUserUsernameModel({headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Username")}}})),this.defaultColumns.push(new column_ColumnUserRoleModel({cellRenderer:{component:Table_CellUserRole},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Role")}}})),this.hasSuspendedColumn&&this.defaultColumns.push(new column_ColumnUserSuspendedModel({cellRenderer:{component:Table_CellUserSuspended},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Suspended")}}})),this.defaultColumns.push(new ColumnModifiedModel.A({cellRenderer:{component:CellDate.A,props:{locale:this.props.context.locale,t:this.props.t}},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Modified")}}})),this.defaultColumns.push(new column_ColumnUserLastLoggedInModel({cellRenderer:{component:CellDate.A,props:{locale:this.props.context.locale,t:this.props.t}},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Last logged in")}}})),this.hasMfaColumn&&this.defaultColumns.push(new column_ColumnUserMfaModel({cellRenderer:{component:Table_CellUserMfa},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("MFA")}}})),this.hasAccountRecoveryColumn&&this.defaultColumns.push(new column_ColumnUserAccountRecoveryModel({cellRenderer:{component:Table_CellUserAccountRecovery},headerCellRenderer:{component:CellHeaderDefault.A,props:{label:this.translate("Account recovery")}}}))}mergeAndSortColumns(){const columnsUserSetting=this.columnsUserSetting.toHashTable(),columns=this.defaultColumns.map((column=>Object.assign(new ColumnModel.Ay(column),columnsUserSetting[column.id])));columns.sort(((columnA,columnB)=>(columnA.position||0)<(columnB.position||0)?-1:1)),this.setState({columns})}handleUserScroll(){const userToScroll=this.props.userWorkspaceContext.scrollTo.user;userToScroll&&(this.scrollTo(userToScroll.id),this.props.userWorkspaceContext.onUserScrolled())}async handleUserSelected(event,user){event.preventDefault(),event.stopPropagation(),await this.selectUser(user)}async handleUserRightClick(event,user){event.preventDefault(),this.displayContextualMenu(event,user),await this.selectUserIfNotAlreadySelected(user)}handleCheckboxWrapperClick(event,user){event.stopPropagation(),this.props.userWorkspaceContext.onUserSelected.single(user)}async handleSortByColumnClick(sortProperty){this.props.userWorkspaceContext.onSorterChanged(sortProperty)}get users(){return this.props.userWorkspaceContext.filteredUsers}get selectedUsers(){return this.props.userWorkspaceContext.selectedUsers}get columnsUserSetting(){return columnsUserSettingCollection.DEFAULT}displayContextualMenu(event,user){const contextualMenuProps={left:event.pageX,top:event.pageY,user};this.props.contextualMenuContext.show(DisplayUsersContextualMenu.A,contextualMenuProps)}async selectUser(user){await this.props.userWorkspaceContext.onUserSelected.single(user)}scrollTo(userId){const userIndex=this.users.findIndex((user=>user.id===userId)),[visibleStartIndex,visibleEndIndex]=this.listRef.current.getVisibleRange();(userIndex<visibleStartIndex||userIndex>visibleEndIndex)&&this.listRef.current.scrollTo(userIndex)}async selectUserIfNotAlreadySelected(user){const[selectedUser]=this.props.userWorkspaceContext.selectedUsers;(!selectedUser||selectedUser.id!==user.id)&&await this.selectUser(user)}isSortedColumn(column){return this.props.userWorkspaceContext.sorter.propertyName===column}isSortedAsc(){return this.props.userWorkspaceContext.sorter.asc}get isLoggedInUserAdmin(){return this.props.context.loggedInUser&&"admin"===this.props.context.loggedInUser.role.name}get hasAttentionRequiredColumn(){return this.props.context.siteSettings.canIUse("accountRecovery")&&this.isLoggedInUserAdmin}get hasMfaColumn(){return this.props.context.siteSettings.canIUse("multiFactorAuthentication")&&this.isLoggedInUserAdmin}get hasSuspendedColumn(){return this.props.context.siteSettings.canIUse("disableUser")&&this.isLoggedInUserAdmin}get hasAccountRecoveryColumn(){return this.props.context.siteSettings.canIUse("accountRecovery")&&this.isLoggedInUserAdmin&&this.props.accountRecoveryContext.isPolicyEnabled()}get selectedUsersIds(){return this.selectedUsers.map((user=>user.id))}isRowInactive(user){return!user.active||this.hasSuspendedColumn&&(0,userUtils.B7)(user)}get columnsFiltered(){return this.state.columns.filter((column=>"checkbox"===column.id||column.show))}get translate(){return this.props.t}render(){const isReady=null!==this.users,isEmpty=isReady&&0===this.users.length,filterType=this.props.userWorkspaceContext.filter.type,isGridReady=isReady&&0!==this.users.length&&0!==this.columnsFiltered.length;return react.createElement(react.Fragment,null,!isReady&&react.createElement("div",{className:"tableview empty"},react.createElement("div",{className:"empty-content"})),isEmpty&&react.createElement("div",{className:"tableview empty"},filterType===UserWorkspaceContext.aj.TEXT&&react.createElement("div",{className:"empty-content"},react.createElement(circle_off.A,null),react.createElement("div",{className:"message"},react.createElement("h1",null,react.createElement(es.x6,null,"None of the users matched this search.")),react.createElement("p",{className:"try-another-search"},react.createElement(es.x6,null,"Try another search or use the left panel to navigate into your organization.")))),filterType===UserWorkspaceContext.aj.SUSPENDED_USER&&react.createElement("div",{className:"empty-content"},react.createElement(circle_off.A,null),react.createElement("div",{className:"message"},react.createElement("h1",null,react.createElement(es.x6,null,"There is no users.")),react.createElement("p",{className:"try-another-filter"},react.createElement(es.x6,null,"You could remove some filters."))))),isGridReady&&react.createElement(GridTable.A,{columns:this.columnsFiltered,rows:this.users,sorter:this.props.userWorkspaceContext.sorter,onSortChange:this.handleSortByColumnClick,onRowClick:this.handleUserSelected,onRowContextMenu:this.handleUserRightClick,selectedRowsIds:this.selectedUsersIds,isRowInactive:this.isRowInactive,rowsRef:this.listRef}))}}DisplayUsers.propTypes={context:prop_types_default().any,userWorkspaceContext:prop_types_default().any,actionFeedbackContext:prop_types_default().any,contextualMenuContext:prop_types_default().any,accountRecoveryContext:prop_types_default().object,t:prop_types_default().func};const DisplayUsers_DisplayUsers=(0,AppContext.L)((0,react_router.withRouter)((0,ActionFeedbackContext.ot)((0,ContextualMenuContext.t6)((0,UserWorkspaceContext.zY)((0,AccountRecoveryUserContext.Le)((0,es.CI)("common")(DisplayUsers)))))));DisplayUsers.__docgenInfo={description:"This component allows to display the filtered users into a grid",methods:[{name:"getDefaultState",docblock:"Returns the component default state",modifiers:[],params:[],returns:null,description:"Returns the component default state"},{name:"initEventHandlers",docblock:"Initialize the component event handlers",modifiers:[],params:[],returns:null,description:"Initialize the component event handlers"},{name:"createRefs",docblock:"Create DOM nodes or React elements references in order to be able to access them programmatically.",modifiers:[],params:[],returns:null,description:"Create DOM nodes or React elements references in order to be able to access them programmatically."},{name:"initColumns",docblock:"Init the grid columns.",modifiers:[],params:[],returns:null,description:"Init the grid columns."},{name:"mergeAndSortColumns",docblock:"Merge and sort columns",modifiers:[],params:[],returns:null,description:"Merge and sort columns"},{name:"handleUserScroll",docblock:"Handles the user scroll ( with a specific manual user url /users/view/:id )",modifiers:[],params:[],returns:null,description:"Handles the user scroll ( with a specific manual user url /users/view/:id )"},{name:"handleUserSelected",docblock:"Handle the user selection\n@param event The DOM event\n@param user The selected user",modifiers:["async"],params:[{name:"event",description:"The DOM event",optional:!1},{name:"user",description:"The selected user",optional:!1}],returns:null,description:"Handle the user selection"},{name:"handleUserRightClick",docblock:"Handle the right click on a user\n@param event A DOM event\n@param user A user",modifiers:["async"],params:[{name:"event",description:"A DOM event",optional:!1},{name:"user",description:"A user",optional:!1}],returns:null,description:"Handle the right click on a user"},{name:"handleCheckboxWrapperClick",docblock:"Handle the checkbox click wrapping\n@param event An event\n@param user An user",modifiers:[],params:[{name:"event",description:"An event",optional:!1},{name:"user",description:"An user",optional:!1}],returns:null,description:"Handle the checkbox click wrapping"},{name:"handleSortByColumnClick",docblock:"Handle the user sorter change\n@param sortProperty The user property to sort on",modifiers:["async"],params:[{name:"sortProperty",description:"The user property to sort on",optional:!1}],returns:null,description:"Handle the user sorter change"},{name:"users",docblock:"Returns the current list of filtered users to display",modifiers:["get"],params:[],returns:null,description:"Returns the current list of filtered users to display"},{name:"selectedUsers",docblock:"Returns the current list of selected users",modifiers:["get"],params:[],returns:null,description:"Returns the current list of selected users"},{name:"columnsUserSetting",docblock:"get columns user setting\n@return {ColumnsSettingCollection}",modifiers:["get"],params:[],returns:{type:{name:"ColumnsSettingCollection"}},description:"get columns user setting"},{name:"displayContextualMenu",docblock:"Displays the contextual menu for the given user and following the given event\n@param event A dom event\n@param user A user",modifiers:[],params:[{name:"event",description:"A dom event",optional:!1},{name:"user",description:"A user",optional:!1}],returns:null,description:"Displays the contextual menu for the given user and following the given event"},{name:"selectUser",docblock:"Select the user.\n@param user An user",modifiers:["async"],params:[{name:"user",description:"An user",optional:!1}],returns:null,description:"Select the user."},{name:"scrollTo",docblock:"Scroll to the given user\n@param userId An user identifier",modifiers:[],params:[{name:"userId",description:"An user identifier",optional:!1}],returns:null,description:"Scroll to the given user"},{name:"selectUserIfNotAlreadySelected",docblock:"Select the user if not already selected.\n@param user An user",modifiers:["async"],params:[{name:"user",description:"An user",optional:!1}],returns:null,description:"Select the user if not already selected."},{name:"isSortedColumn",docblock:"Check if the grid is sorted for a given column\n@param column The column name",modifiers:[],params:[{name:"column",description:"The column name",optional:!1}],returns:null,description:"Check if the grid is sorted for a given column"},{name:"isSortedAsc",docblock:"Check if the sort is ascendant.\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Check if the sort is ascendant."},{name:"isLoggedInUserAdmin",docblock:"Check if the logged in user is admin\n@return {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Check if the logged in user is admin"},{name:"hasAttentionRequiredColumn",docblock:"Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the accountRecovery feature is enabled and if the logged in user is an admin."},{name:"hasMfaColumn",docblock:"Returns true if the mfa feature is enabled and if the logged in user is an admin.\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the mfa feature is enabled and if the logged in user is an admin."},{name:"hasSuspendedColumn",docblock:"Returns true if the suspended user feature is enabled.\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the suspended user feature is enabled."},{name:"hasAccountRecoveryColumn",docblock:"Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the accountRecovery feature is enabled and if the logged in user is an admin."},{name:"selectedUsersIds",docblock:"Get selected users ids\n@return {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get selected users ids"},{name:"isRowInactive",docblock:"Is row inactive\n@param user\n@returns {boolean}",modifiers:[],params:[{name:"user",optional:!1}],returns:{type:{name:"boolean"}},description:"Is row inactive"},{name:"columnsFiltered",docblock:"Get the columns to display\n@return {[]}",modifiers:["get"],params:[],returns:{type:{name:"tuple",elements:[]}},description:"Get the columns to display"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"DisplayUsers",props:{context:{description:"",type:{name:"any"},required:!1},userWorkspaceContext:{description:"",type:{name:"any"},required:!1},actionFeedbackContext:{description:"",type:{name:"any"},required:!1},contextualMenuContext:{description:"",type:{name:"any"},required:!1},accountRecoveryContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./node_modules/uuid/dist/esm-browser/v5.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v5});var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js"),validate=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");const esm_browser_parse=function parse(uuid){if(!(0,validate.A)(uuid))throw TypeError("Invalid UUID");var v,arr=new Uint8Array(16);return arr[0]=(v=parseInt(uuid.slice(0,8),16))>>>24,arr[1]=v>>>16&255,arr[2]=v>>>8&255,arr[3]=255&v,arr[4]=(v=parseInt(uuid.slice(9,13),16))>>>8,arr[5]=255&v,arr[6]=(v=parseInt(uuid.slice(14,18),16))>>>8,arr[7]=255&v,arr[8]=(v=parseInt(uuid.slice(19,23),16))>>>8,arr[9]=255&v,arr[10]=(v=parseInt(uuid.slice(24,36),16))/1099511627776&255,arr[11]=v/4294967296&255,arr[12]=v>>>24&255,arr[13]=v>>>16&255,arr[14]=v>>>8&255,arr[15]=255&v,arr};function f(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:case 3:return x^y^z;case 2:return x&y^x&z^y&z}}function ROTL(x,n){return x<<n|x>>>32-n}const esm_browser_v5=function v35(name,version,hashfunc){function generateUUID(value,namespace,buf,offset){if("string"==typeof value&&(value=function stringToBytes(str){str=unescape(encodeURIComponent(str));for(var bytes=[],i=0;i<str.length;++i)bytes.push(str.charCodeAt(i));return bytes}(value)),"string"==typeof namespace&&(namespace=esm_browser_parse(namespace)),16!==namespace.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var bytes=new Uint8Array(16+value.length);if(bytes.set(namespace),bytes.set(value,namespace.length),(bytes=hashfunc(bytes))[6]=15&bytes[6]|version,bytes[8]=63&bytes[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=bytes[i];return buf}return(0,stringify.A)(bytes)}try{generateUUID.name=name}catch(err){}return generateUUID.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",generateUUID.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",generateUUID}("v5",80,(function sha1(bytes){var K=[1518500249,1859775393,2400959708,3395469782],H=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof bytes){var msg=unescape(encodeURIComponent(bytes));bytes=[];for(var i=0;i<msg.length;++i)bytes.push(msg.charCodeAt(i))}else Array.isArray(bytes)||(bytes=Array.prototype.slice.call(bytes));bytes.push(128);for(var l=bytes.length/4+2,N=Math.ceil(l/16),M=new Array(N),_i=0;_i<N;++_i){for(var arr=new Uint32Array(16),j=0;j<16;++j)arr[j]=bytes[64*_i+4*j]<<24|bytes[64*_i+4*j+1]<<16|bytes[64*_i+4*j+2]<<8|bytes[64*_i+4*j+3];M[_i]=arr}M[N-1][14]=8*(bytes.length-1)/Math.pow(2,32),M[N-1][14]=Math.floor(M[N-1][14]),M[N-1][15]=8*(bytes.length-1)&4294967295;for(var _i2=0;_i2<N;++_i2){for(var W=new Uint32Array(80),t=0;t<16;++t)W[t]=M[_i2][t];for(var _t=16;_t<80;++_t)W[_t]=ROTL(W[_t-3]^W[_t-8]^W[_t-14]^W[_t-16],1);for(var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],_t2=0;_t2<80;++_t2){var s=Math.floor(_t2/20),T=ROTL(a,5)+f(s,b,c,d)+e+K[s]+W[_t2]>>>0;e=d,d=c,c=ROTL(b,30)>>>0,b=a,a=T}H[0]=H[0]+a>>>0,H[1]=H[1]+b>>>0,H[2]=H[2]+c>>>0,H[3]=H[3]+d>>>0,H[4]=H[4]+e>>>0}return[H[0]>>24&255,H[0]>>16&255,H[0]>>8&255,255&H[0],H[1]>>24&255,H[1]>>16&255,H[1]>>8&255,255&H[1],H[2]>>24&255,H[2]>>16&255,H[2]>>8&255,255&H[2],H[3]>>24&255,H[3]>>16&255,H[3]>>8&255,255&H[3],H[4]>>24&255,H[4]>>16&255,H[4]>>8&255,255&H[4]]}))}}]);