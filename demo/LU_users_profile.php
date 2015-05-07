<!doctype html>
<html lang="en" class=" js no-websqldatabase draganddrop cssscrollbar" style="">
<head>
	<meta charset="utf-8">
	<title>Passbolt - The simple password management system</title>
	<base href="../src/">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link href="css/main.css" type="text/css" rel="stylesheet">
	<link href="css/devel.css" type="text/css" rel="stylesheet">
	<script src="js/modernizr.js"></script>
</head>
<body>
<div class="page" id="container">
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<div class="update-loading-bar passbolt_controller_component_loading_bar_controller passbolt_view_component_loading_bar js_component ready"
				 id="js_app_loading_bar">
			<div class="progress-bar">
				<span style="width: 0%;"></span>
			</div>
		</div>
		<div class="notification-container">
			<div class="notification col2_3 push_1 passbolt_controller_component_notification_controller passbolt_view_component_notification js_component hidden"
					 id="js_app_notificator" style="display: none;">
				<span class="message animated fadeInUp success">
						<strong>success</strong>
						The Public key has been copied in your clipboard
				</span>
			</div>
		</div>
		<div class="header first">
			<nav>
				<div class="primary navigation top">
					<ul class="left passbolt_controller_component_app_navigation_left_controller mad_view_component_tree menu ready"
							id="js_app_navigation_left">
						<li class="home ready"
								id="1a8ed7ba-a1d3-d00f-56b7-a35d324c8de3">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>home</span></a>
									</div>
								</div>
							</div>

						</li>
						<li class="passwords ready"
								id="cef6a246-e56e-3a84-cc08-7dd04f4a30b4">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>passwords</span></a>
									</div>
								</div>
							</div>
						</li>
						<li class="users ready"
								id="f6ddcbfe-1c55-75af-59e1-175330c6eb49">
							<div class="row selected">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>users</span></a>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<ul class="right passbolt_controller_component_app_navigation_right_controller mad_view_component_tree menu ready"
							id="js_app_navigation_right">
						<li class="logout ready"
								id="398a8891-4dbd-972f-6c17-e84356a7f8d3">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>logout</span></a>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
		<div class="header second">
			<div class="col1">
				<div class="logo">
					<img alt="passbolt" src="img/logo/logo.png">
				</div>
			</div>
			<div class="col2 search-wrapper">
				<div id="js_app_filter"
						 class="passbolt_controller_component_app_filter_controller passbolt_view_component_app_filter js_component ready">
					<form class="search mad_form_form_controller mad_view_form_form_view js_component ready"
								id="js_app_filter_form">
						<!-- <ul id="js_filter_tags" class="tags"></ul> -->
						<div class="input search required">
							<label for="js_app_filter_form">
								Search</label>
							<input type="search" placeholder="search people"
										 maxlength="50"
										 class="required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
										 id="js_app_filter_keywords">
						</div>
						<button value="search">
							<i class="icon search"></i>
							<span class="text visuallyhidden">search</span>
						</button>
					</form>
					<!-- <form id="js_filter_form">
							<ul id="js_filter_tags" class="tags"></ul>
							<fieldset>
									<legend>
											Please enter a search keyword
									</legend>
									<div class="input text required">
											<label for="js_filter_keywords">
													Search</label>
											<input id="js_filter_keywords" class="required" maxlength="50" type="text"/>
									</div>
							</fieldset>
							<span id="js_filter_reset" class="control reset">x</span>
							<div class="submit">
									<input type="submit" />
							</div>
					</form> --></div>
			</div>
			<div class="col3 profile-wrapper">
				<div class="user profile dropdown passbolt_controller_component_profile_dropdown_controller mad_view_component_button_dropdown js_component ready"
						 id="js_app_profile_dropdown">
					<div class="center-cell-wrapper">
						<div class="details center-cell">
							<span class="name">Admin Istrator</span>
							<span class="email">admin@passbolt.com</span>
						</div>
					</div>
					<div class="picture left-cell">
						<img alt="your picture" src="img/avatar/user.png">
					</div>
					<div class="more right-cell">
						<a href="#"><span>more</span></a>
					</div>
					<ul class="dropdown-content right mad_controller_component_menu_controller mad_view_component_tree menu ready"
							id="4d74f679-a67d-431c-9bd6-93c02ecf419d">
						<li class="ready" id="65fbb9fc-3fb3-8550-34c5-5edda47c25e2">
							<div class="row selected">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>my profile</span></a>
									</div>
								</div>
							</div>
						</li>
						<li class="ready" id="2474a6c6-a125-9282-55ef-3cf2f10505af">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>manage or generate new keys</span></a>
									</div>
								</div>
							</div>
						</li>
						<li class="separator-after ready"
								id="374d53aa-61bd-4ee8-6066-9f6489c958a3">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>manage people</span></a>
									</div>
								</div>
							</div>
						</li>
						<li class="ready" id="cf6f60ed-dd5f-6659-08f7-3be74f8c038f">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>logout</span></a>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="header third">
			<div class="col1 workspace-title-wrapper">
				<h1 class="workspace-title">User Profile</h1>
			</div>
			<div class="col2_3 actions-wrapper">
				<ul class="actions secondary passbolt_controller_component_workspace_secondary_menu_controller mad_view_view js_component ready"
						id="js_wsp_secondary_menu">
					<li>
						<a class="button toggle mad_controller_component_toggle_button_controller mad_view_view js_component ready"
							 href="#" id="js_wk_secondary_menu_view_sidebar_button"
							 >
							<i class="icon layout eye big no-text"></i>
							<span>view sidebar</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<div class="navigation first">
								<ul class="clearfix passbolt_controller_component_preference_menu_controller mad_view_component_tree menu ready"
										id="js_wk_preference_menu">
									<li class="selected ready"
											id="36c943d5-fd8f-e149-437c-fd9c888d1eb2">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>My profile</span></a>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="panel middle">
							<div class="breadcrumbs passbolt_controller_component_preference_breadcrumb_controller mad_view_view js_component ready"
									 id="js_wsp_preference_breadcrumb">
								<ul class="mad_controller_component_menu_controller mad_view_component_tree menu ready"
										id="179edd9e-14f2-00d5-2055-1b4f2693f843">
									<li class="ready" id="6b53afd8-706e-0562-e205-4d5b019d8d17">
										<div class="main-cell">
											<a href="#"><span>All users</span></a>
										</div>
									</li>
									<li class="ready" id="8e75616e-f07a-e1ff-7dad-a4cc4a6007ae">
										<div class="main-cell">
											<a href="#"><span>Admin Istrator</span></a>
										</div>
									</li>
									<li class="ready" id="c29a5b36-b1af-aaaf-b3ce-eff1df012545">
										<div class="main-cell">
											<a href="#"><span>Profile</span></a>
										</div>
									</li>
								</ul>
							</div>
							<div id="js_wk_preference_main"
									 class="mad_controller_component_tab_controller mad_view_component_tab js_component ready">
								<div class="js_tabs_content tabs-content">
									<div id="js_preference_wk_profile_controller"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected">

										<div class="grid grid-responsive-12">
											<div class="row">

												<div class="profile col8">
													<h3>Profile</h3>
													<div class="section detailed-information">
														<div class="avatar">
															<div class="value">
																<img src="img/avatar/user_medium.png" alt="profile picture">
															</div>
															<div class="edit">
																<a title="Change Avatar" href="#"
																	 class="edit-avatar-action">
																	<i class="icon camera"></i>
																	<span class="help-text">Click here to upload a new picture.</span>
																</a>
															</div>
														</div>
														<table class="table-info">
															<tr>
																<td>Name</td>
																<td>Mr. Testy test this is a very long test</td>
															</tr>
															<tr>
																<td>Email</td>
																<td>test@passbolt</td>
															</tr>
															<tr>
																<td>Role</td>
																<td>Admin</td>
															</tr>
															<tr>
																<td>Created</td>
																<td>18 march 2013 21:00</td>
															</tr>
															<tr>
																<td>Modified</td>
																<td>18 march 2019 21:00</td>
															</tr>
															<tr>
																<td>Public Key</td>
																<td>292F8400D09A70DB
																	<p>
																		<em>Note: Sorry it is not possible to change your key at the moment.
																			<a href="#">learn more ›</a></em>
																	</p>
																</td>
															</tr>
														</table>
													</div>
												</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

</body>
</html>