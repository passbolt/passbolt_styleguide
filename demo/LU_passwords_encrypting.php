<!doctype html>
<html style="" class=" js no-websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<meta charset="utf-8">
	<title>Passbolt - The simple password management system</title>
	<!--
					 ____                  __          ____
					/ __ \____  _____ ____/ /_  ____  / / /_
				 / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
				/ ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
			 /_/    \__,_/____/____/_.___/\____/_/\__/

			 The password management solution
			 (c) 2014 passbolt.com

	 -->
	<base href="../src/">
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/external.css">
	<link rel="stylesheet" type="text/css" href="css/devel.css">
	<script type="application/javascript">
		var cakephpConfig = {
			app: {
				name: "Passbolt",
				punchline: "The simple password management system",
				copyright: "",
				title: "%s | Passbolt",
				version: {
					number: "2.13.3",
					name: "Sauvage",
					song: "http://youtu.be/DaRG0ukxYqQ"
				},
				url: "http://passbolt.dev/",
				debug: "3"
			},
			user: {
				id: "50cdea9c-aa88-46cb-a09b-2f4fd7a10fce"
			},
			roles: {
				"user": "0208f57a-c5cd-11e1-a0c5-080027796c4c",
				"admin": "142c1188-c5cd-11e1-a0c5-080027796c4c"
			},
			image_storage: {
				public_path: "img/public"
			}
		};
	</script>
</head>
<body>
<!-- main -->
<div id="container" class="page password">
	<div class="mad_event_event_bus"></div>
	<div id="ee22ae38-0500-ed38-57b2-d24993e0f884" class="mad_devel_devel">
		<div class="mad_devel_devel_sidebar_controller mad_view_view js_component ready"
				 id="js-devel-sidebar-ctl">
			<button id="js-devel-sidebar-toggle-button"
							class="devel-sidebar-toggle-button mad_controller_component_button_controller mad_view_view js_component closed"></button>
			<div id="js-devel-sidebar" class="devel-sidebar">
				<div class="devel-sidebar-menu-wrapper">
					<ul id="js-devel-sidebar-menu"
							class="devel-sidebar-menu mad_controller_component_menu_controller mad_view_component_tree menu ready">
						<li id="0f289e73-86de-6523-8856-fa7b58481576" class="ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>Components browser</span></a>
									</div>
								</div>
							</div>


						</li>
						<li id="55474e0a-310d-4043-5f6f-546a6c049b3c" class="ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>SQL trace</span></a>
									</div>
								</div>
							</div>


						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="passbolt_controller_app_controller mad_view_view js_component ready"
			 id="js_app_controller">
		<div id="js_app_loading_bar"
				 class="update-loading-bar passbolt_controller_component_loading_bar_controller passbolt_view_component_loading_bar js_component ready">
			<div class="progress-bar">
				<span style="width: 0%;"></span>
			</div>
		</div>
		<div class="notification-container">
			<div id="js_app_notificator"
					 class="notification col2_3 push_1 passbolt_controller_component_notification_controller">
			</div>
		</div>
		<div class="header first">
			<nav>
				<div class="primary navigation top">
					<ul id="js_app_navigation_left"
							class="left passbolt_controller_component_app_navigation_left_controller mad_view_component_tree menu ready">
						<li id="708926f0-f3d2-7ff2-b176-7f8db216c2a5"
								class="home ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>home</span></a>
									</div>
								</div>
							</div>


						</li>
						<li id="24016824-c551-9c6e-64b3-b52ae23d5257"
								class="passwords ready">
							<div class="row selected">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>passwords</span></a>
									</div>
								</div>
							</div>


						</li>
						<li id="0299f31d-3337-7946-06d6-8906f26bc09c"
								class="users ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>users</span></a>
									</div>
								</div>
							</div>


						</li>
					</ul>
					<ul id="js_app_navigation_right"
							class="right passbolt_controller_component_app_navigation_right_controller mad_view_component_tree menu ready">
						<li id="6bcec822-819d-f25c-deed-f707b9a87b5b"
								class="logout ready">
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
					<img src="img/logo/logo.png" alt="passbolt">
				</div>
			</div>
			<div class="col2 search-wrapper">
				<div
					class="passbolt_controller_component_app_filter_controller passbolt_view_component_app_filter js_component ready"
					id="js_app_filter">
					<form id="js_app_filter_form"
								class="search mad_form_form_controller mad_view_form_form_view js_component ready">
						<!-- <ul id="js_filter_tags" class="tags"></ul> -->
						<div class="input search required">
							<label for="js_app_filter_form">
								Search</label>
							<input id="js_app_filter_keywords"
										 class="required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
										 maxlength="50" placeholder="search passwords"
										 type="search">
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
				<div id="js_app_profile_dropdown"
						 class="user profile dropdown passbolt_controller_component_profile_dropdown_controller mad_view_component_button_dropdown js_component ready">
					<div class="center-cell-wrapper">
						<div class="details center-cell">
							<span class="name">Kevin Muller</span>
							<span class="email">kevin@passbolt.com</span>
						</div>
					</div>
					<div class="picture left-cell">
						<img
							src="img/public/images/ProfileAvatar/56/27/87/5537f445e42047efbe5f62968cebc04d/5537f445e42047efbe5f62968cebc04d.65a0ba70.png"
							alt="your picture">
					</div>
					<div class="more right-cell">
						<a href="#"><span>more</span></a>
					</div>
					<ul id="b941b7a3-715c-7d09-22c7-0cd5dbec0cd7"
							class="dropdown-content right mad_controller_component_menu_controller mad_view_component_tree menu ready">
						<li id="5c0b65e9-9e59-93b0-2862-4f14ea3f8a20" class="ready">
							<div class="row selected">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>my profile</span></a>
									</div>
								</div>
							</div>


						</li>
						<li id="75ecb8ac-efc9-0ae2-74dd-0051287fe9a1" class="ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>manage or generate new keys</span></a>
									</div>
								</div>
							</div>


						</li>
						<li id="8a5e0673-c420-cb06-f315-ffaafad0419a"
								class="separator-after ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>manage people</span></a>
									</div>
								</div>
							</div>


						</li>
						<li id="99b47b6f-7c03-213a-1e0c-ec30edd7f123" class="ready">
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
				<h1 class="workspace-title">Passwords</h1>
			</div>
			<div class="col2_3 actions-wrapper">
				<ul id="js_wsp_primary_menu"
						class="actions mad_controller_component_tab_controller mad_view_component_tab js_component ready">
					<div class="js_tabs_content tabs-content">
						<div style="display: block;"
								 class="passbolt_controller_component_password_workspace_menu_controller mad_view_view tab-content selected selection"
								 id="js_passbolt_passwordWorkspaceMenu_controller">
							<li>
								<a id="js_wk_menu_creation_button" href="#"
									 class="button mad_controller_component_button_controller mad_view_view js_component ready">
									<i class="icon create"></i>
									<span>create</span>
								</a>
							</li>
							<li>
								<a id="js_wk_menu_edition_button" href="#"
									 class="button mad_controller_component_button_controller mad_view_view js_component ready">
									<i class="icon edit"></i>
									<span>edit</span>
								</a>
							</li>
							<li>
								<a id="js_wk_menu_deletion_button" href="#"
									 class="button mad_controller_component_button_controller mad_view_view js_component ready">
									<i class="icon delete"></i>
									<span>delete</span>
								</a>
							</li>
							<li>
								<a disabled="disabled" id="js_wk_menu_sharing_button"
									 href="#"
									 class="button mad_controller_component_button_controller mad_view_view js_component disabled">
									<i class="icon share"></i>
									<span>share</span>
								</a>
							</li>
							<li>
								<div class="dropdown">
									<a id="js_wk_menu_more_button" href="#"
										 class="button mad_controller_component_button_dropdown_controller mad_view_component_button_dropdown js_component pressed open ready">
										<span>more</span>
										<i class="icon after arrowdown"></i>
									</a>
									<ul id="68d0157a-9c6e-1620-c6c3-8d1f8e3d1d79"
											class="dropdown-content mad_controller_component_menu_controller mad_view_component_tree menu ready visible">
										<li id="b86610f2-803b-dc3f-6c79-a4154e82fa4d"
												class="todo ready">
											<div class="row">
												<div class="main-cell-wrapper">
													<div class="main-cell">
														<a href="#"><span>copy login to clipboard</span></a>
													</div>
												</div>
											</div>


										</li>
										<li id="da11f411-379f-6541-c2cf-47f92a344dc1"
												class="todo ready">
											<div class="row selected">
												<div class="main-cell-wrapper">
													<div class="main-cell">
														<a href="#"><span>copy password to clipboard</span></a>
													</div>
												</div>
											</div>


										</li>
									</ul>
								</div>
							</li>
						</div>
						<div style="display: none;"
								 class="passbolt_controller_component_people_workspace_menu_controller mad_view_view tab-content hidden"
								 id="js_passbolt_peopleWorkspaceMenu_controller">

						</div>
						<div style="display: none;"
								 class="passbolt_controller_component_preference_workspace_menu_controller mad_view_view tab-content hidden"
								 id="js_passbolt_preferenceWorkspaceMenu_controller">
							<li>
								<a id="js_preference_wk_menu_edition_button" href="#"
									 class="button mad_controller_component_button_controller mad_view_view js_component ready">
									<i class="icon edit"></i>
									<span>edit</span>
								</a>
							</li>
						</div>
					</div>
				</ul>
				<ul id="js_wsp_secondary_menu"
						class="actions secondary passbolt_controller_component_workspace_secondary_menu_controller mad_view_view js_component ready">
					<li>
						<a style="display: block;"
							 id="js_wk_secondary_menu_view_sidebar_button" href="#"
							 class="button toggle mad_controller_component_toggle_button_controller mad_view_view js_component ready">
							<i class="icon layout eye big no-text"></i>
							<span>view sidebar</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div id="js_app_panel_main"
				 class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready">
			<div class="js_tabs_content tabs-content">
				<div style="display: block;"
						 class="passbolt_controller_password_workspace_controller mad_view_view tab-content ready selected"
						 id="js_passbolt_passwordWorkspace_controller">
					<div class="js_workspace">
						<div class="panel left">
							<div class="navigation first shortcuts">
								<ul id="js_wsp_pwd_rs_shortcuts"
										class="clearfix passbolt_controller_component_resource_shortcuts_controller mad_view_component_tree menu ready">
									<li id="1720e5b2-d1ab-a362-6793-a73fd58d68b9"
											class="selected ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>All items</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="c5e92042-c2f9-004e-2c19-21ea9a2d986e" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Favorite</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="b1311a97-1feb-6488-ad40-a7f2d869b47f" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Recently modified</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="6e8fc43e-0151-3554-d6b9-c4c67885cd43" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Shared with me</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="b66c798d-c18e-037e-06fb-e0a0e7f4ea19" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Items I own</span></a>
												</div>
											</div>
										</div>


									</li>
								</ul>
							</div>
							<div class="navigation last tree categories">
								<ul id="js_wsp_pwd_category_chooser">
								</ul>
							</div>
						</div>
						<div class="panel middle">
							<div id="js_wsp_pwd_breadcrumb"
									 class="breadcrumbs passbolt_controller_component_password_breadcrumb_controller mad_view_view js_component ready">
								<ul id="30fa09aa-d0eb-0ee2-6783-f8a9ab0b0e22"
										class="mad_controller_component_menu_controller mad_view_component_tree menu ready">
									<li id="fe4c08eb-71ed-ccd0-f9d6-b6566e0be285" class="ready">
										<div class="main-cell">
											<a href="#"><span>All items</span></a>
										</div>
									</li>
								</ul>
							</div>
							<div id="js_wsp_pwd_browser"
									 class="tableview passbolt_controller_component_password_browser_controller passbolt_view_component_password_browser selection">
								<div class="tableview-header">
									<table>
										<thead>
										<tr>

											<th class="js_grid_column js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div class="input checkbox"><label for="checkbox-select-all">select
													all</label></div>
											</th>

											<th class="js_grid_column js_grid_column_favorite cell_favorite selections s-cell">
												<a href="#"> <i class="icon fav no-text"></i> <span>fav</span>
												</a>
											</th>

											<th class="js_grid_column js_grid_column_name cell_name m-cell">
												Resource
											</th>

											<th class="js_grid_column js_grid_column_username cell_username m-cell">
												Username
											</th>

											<th class="js_grid_column js_grid_column_secret cell_secret m-cell password">
												Password
											</th>

											<th class="js_grid_column js_grid_column_uri cell_uri l-cell">
												URI
											</th>

											<th class="js_grid_column js_grid_column_modified cell_modified m-cell">
												Modified
											</th>

											<th class="js_grid_column js_grid_column_owner cell_owner m-cell">
												Owner
											</th>

											<th class="js_grid_column js_grid_column_copyLogin cell_copyLogin s-cell">

											</th>

											<th class="js_grid_column js_grid_column_copySecret cell_copySecret s-cell">

											</th>

										</tr>
										</thead>
									</table>
								</div>
								<div class="tableview-content scroll">
									<table>
										<tbody>
										<tr id="50d77ffd-5624-492c-842e-1b63d7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50d77ffd-5624-492c-842e-1b63d7a10fce">
														<div class="input checkbox">
															<input value="50d77ffd-5624-492c-842e-1b63d7a10fce"
																		 id="checkbox4988d6c9-74cd-a2dd-3619-b1d3881e7a72"
																		 type="checkbox">
															<label for="checkbox4988d6c9-74cd-a2dd-3619-b1d3881e7a72"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_favorite cell_favorite selections s-cell">
												<div title="">
													<div
														class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
														id="favorite_50d77ffd-5624-492c-842e-1b63d7a10fce"><a href="#"
																																									class="no-text">
														<i class="icon fav"></i>
														<span>fav</span>
													</a>
													</div>
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="shared resource">
													shared resource
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="admin">
													admin
												</div>
											</td>

											<td class="js_grid_column_secret cell_secret m-cell password">
												<div title="">
													<div class="secret-copy"><a href="#copy_secret"><span>copy password to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMAyFwuC5Agdg+AQgAt+/wm7dBx/RUEqskMQIT42/Mdl8xK1dTH4H9suPLSnFa
WAN3UBzGirzJNFMxlltBurgoOPVkUlk8wrtg+oVC0vpaVOHXECriYm9xcpRl0MvQ
AEATG8UZx+xlzuyTe3PAZo70X9+RrwCly8zeG9/4Z38a36Fm7abEFWC1kB2ZFNSn
Tj2oI9ejweSDQ3mkyrJtIapn55aESjs8shfbtMLRv0Dz/Z+5UguMHq7p/cVvyPJQ
pnb2YaID+WOMHUJXZz8SDKh6lDNpOjoE32Ia5fqhVVR1qeF7VgEVSDl5RpRFo079
0xia4BvospMp3un5NH9ItKgGfBBC/6JYj555X2hssNJHAabPATxyjQjCn58fnStQ
405HZasa6bMOjmTJVkm7VOXMeADz4ot4TpR16Ylz8LrjEdwilBudk5/nVsDQlGQp
DEqQlcLM0u4=
=rD1r
-----END PGP MESSAGE-----
</pre>
													</div>
												</div>
											</td>

											<td class="js_grid_column_uri cell_uri l-cell">
												<div title="http://shared.resource.net/">
													http://shared.resource.net/
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="2 years ago">
													2 years ago
												</div>
											</td>

											<td class="js_grid_column_owner cell_owner m-cell">
												<div title="anonymous@passbolt.com">
													anonymous@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_copyLogin cell_copyLogin s-cell">
												<div title="">

												</div>
											</td>

											<td class="js_grid_column_copySecret cell_copySecret s-cell">
												<div title="">

												</div>
											</td>

										</tr>
										<tr id="50d77ff9-c358-4dfb-be34-1b63d7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50d77ff9-c358-4dfb-be34-1b63d7a10fce">
														<div class="input checkbox">
															<input value="50d77ff9-c358-4dfb-be34-1b63d7a10fce"
																		 id="checkbox3ce76763-eb11-62d3-5a59-5e278005bf4a"
																		 type="checkbox">
															<label for="checkbox3ce76763-eb11-62d3-5a59-5e278005bf4a"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_favorite cell_favorite selections s-cell">
												<div title="">
													<div
														class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
														id="favorite_50d77ff9-c358-4dfb-be34-1b63d7a10fce"><a href="#"
																																									class="no-text">
														<i class="icon fav"></i>
														<span>fav</span>
													</a>
													</div>
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="salesforce account">
													salesforce account
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="passbolt">
													passbolt
												</div>
											</td>

											<td class="js_grid_column_secret cell_secret m-cell password">
												<div title="">
													<div class="secret-copy"><a href="#copy_secret"><span>copy password to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMAyFwuC5Agdg+AQf8CmYO8RKn4K8TFCwmJhB8/fkZY6rwhb3nu74N0P9Odq92
X9W43MuinoN5dFZXUwqGVZAjspm5w/yRXKOKm/uzyy7+J4qrY5Jn/YfB9S3CGT50
r0lekGXXPJI12LFdD9qt4ZK6ZrSZZyvWkBcn7170g2RzT33rV6oynMHERYIv6KGp
SNO00F2VlvzTjk9HBGlNCtZfHrasiBXSXiQdWVXR+25qQTZZLKstY+Bz4GPwlWF5
AAZDVVtXqLuV2J2kSVwgBzOL1nszV341jzodLNznyzOcYc/ZudWMnbjRepprPP7w
+65y5KMHrj4STDn3RT5ePd0T4KQNdQJqHLBEY5oSL9JHATVugbrQH1GYlDZujJN4
ULXDyPFYyxRBJGYNY6jWE736zd495vMfqlFzD0Ssf7K4oKGDMy6ag/mP6AyP5IBc
0zBObSZRJ/8=
=30SP
-----END PGP MESSAGE-----
</pre>
													</div>
												</div>
											</td>

											<td class="js_grid_column_uri cell_uri l-cell">
												<div title="https://salesforce.com">
													https://salesforce.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="2 years ago">
													2 years ago
												</div>
											</td>

											<td class="js_grid_column_owner cell_owner m-cell">
												<div title="anonymous@passbolt.com">
													anonymous@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_copyLogin cell_copyLogin s-cell">
												<div title="">

												</div>
											</td>

											<td class="js_grid_column_copySecret cell_copySecret s-cell">
												<div title="">

												</div>
											</td>

										</tr>
										<tr class="selected" id="50d77ff9-fdd8-4035-b7c6-1b63d7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50d77ff9-fdd8-4035-b7c6-1b63d7a10fce">
														<div class="input checkbox">
															<input checked="checked"
																		 value="50d77ff9-fdd8-4035-b7c6-1b63d7a10fce"
																		 id="checkbox1545e8f0-ce2e-295e-1f5f-fe1a7f277089"
																		 type="checkbox">
															<label for="checkbox1545e8f0-ce2e-295e-1f5f-fe1a7f277089"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_favorite cell_favorite selections s-cell">
												<div title="">
													<div
														class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
														id="favorite_50d77ff9-fdd8-4035-b7c6-1b63d7a10fce"><a href="#"
																																									class="no-text">
														<i class="icon fav"></i>
														<span>fav</span>
													</a>
													</div>
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="tetris license">
													tetris license
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="passbolt">
													passbolt
												</div>
											</td>

											<td class="js_grid_column_secret cell_secret m-cell password">
												<div title="">
													<div class="secret-copy"><a href="#copy_secret"><span>copy password to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMAyFwuC5Agdg+AQf/cf6roWU6VRXIvXD6iBYu0RKxHSikMcF7OuoHdzGELKX5
4cNEI/br6CgLr/QlUxH62XCgi8MCyqaV8ewbH94xtR6nHtA1izLeBNKBjkFTE3wL
qVga+xgHwpxblq1RJVbfo77+gcbx4d2sm9udbKe0Ufej3P1INMIRPPl7dhbwuWTV
sZRqWe2Y7R2QybT3lc2fp7P7BkEkdy0luaOIG4+AESMdg0+OkEGMl1nT31bgi6k6
bUc7GhPlveuIfkeHrQzHs8eq6YUkFCZJ+k2VQ14P3RLk2ibE4+B8YHW4V7TSk6tI
6ZIZDrpxfzXXWcDykh0Ebz3ZPPimoSwlk7XwgaFBptJIAYcQEog5Dbfh5fLO/DBf
3lJcM7Q/DKrSrJVtOBwJe4vdO5Tdfi0Zn9QHDl0MnkslFxLVVnhiAH2HJ0DufMhl
9AaKzfwbSvV5
=JVBU
-----END PGP MESSAGE-----
</pre>
													</div>
												</div>
											</td>

											<td class="js_grid_column_uri cell_uri l-cell">
												<div title="https://tetris.com">
													https://tetris.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="2 years ago">
													2 years ago
												</div>
											</td>

											<td class="js_grid_column_owner cell_owner m-cell">
												<div title="anonymous@passbolt.com">
													anonymous@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_copyLogin cell_copyLogin s-cell">
												<div title="">

												</div>
											</td>

											<td class="js_grid_column_copySecret cell_copySecret s-cell">
												<div title="">

												</div>
											</td>

										</tr>
										<tr id="509bb871-5168-49d4-a676-fb098cebc04d">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_509bb871-5168-49d4-a676-fb098cebc04d">
														<div class="input checkbox">
															<input value="509bb871-5168-49d4-a676-fb098cebc04d"
																		 id="checkboxd5312275-cdd6-9fa2-7c31-8582dc50c1de"
																		 type="checkbox">
															<label for="checkboxd5312275-cdd6-9fa2-7c31-8582dc50c1de"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_favorite cell_favorite selections s-cell">
												<div title="">
													<div
														class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
														id="favorite_509bb871-5168-49d4-a676-fb098cebc04d"><a href="#"
																																									class="no-text">
														<i class="icon fav"></i>
														<span>fav</span>
													</a>
													</div>
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="facebook account">
													facebook account
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="passbolt">
													passbolt
												</div>
											</td>

											<td class="js_grid_column_secret cell_secret m-cell password">
												<div title="">
													<div class="secret-copy"><a href="#copy_secret"><span>copy password to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMAyFwuC5Agdg+AQgAoC311FmBOos11H5s47hTd6SqEy6gVgVZ8PAoYFH8Pbi6
ZwvvCzkd0wJf2kh73QDYPIPLq7d2HBxbF8T5OjTLuENNbviY5qki8MAGkqAIRiBq
RcIqzBX70IbMhxYoz8VxIRn/N3dJPXGc2SmerNwJJ/pFrUa/u7k2WUv/NwPR+tx1
gLFSoUOpqVeS2NxHG/p01ZcedIX1R0Q2EiPP4rkQ1Zdee0YMdFqsmf5Uxf8npIyd
X69MX2X7exheqWq6gxqXYfl8TQj0q7nTULvXM+LsQIXYVsttRF7VLktm63UpBqHU
/xyxptL9tDycIqVyAKmubyXd2AkPGKx3VVIZtNFxDNJFAYv7V0YvImHu/JuWNeYN
UmX5g8NRA1skr1jQut9HkXuZ/NLK4LMAai1Lyt97RewFixhWnpBWbTEeDwqeYZfH
IGToRTYP
=UgZQ
-----END PGP MESSAGE-----
</pre>
													</div>
												</div>
											</td>

											<td class="js_grid_column_uri cell_uri l-cell">
												<div title="https://facebook.com">
													https://facebook.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="2 years ago">
													2 years ago
												</div>
											</td>

											<td class="js_grid_column_owner cell_owner m-cell">
												<div title="ismail@passbolt.com">
													ismail@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_copyLogin cell_copyLogin s-cell">
												<div title="">

												</div>
											</td>

											<td class="js_grid_column_copySecret cell_copySecret s-cell">
												<div title="">

												</div>
											</td>

										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="bffc90f8-8efa-009a-1659-d3f110482422"
								 class="panel aside js_wsp_pwd_sidebar_second passbolt_controller_component_resource_details_controller passbolt_view_component_resource_details js_component ready"
								 style="">
							<div class="resource">
								<h3>tetris license</h3>
								<a href="#" class="dialog-close"><i
									class="icon close no-text"></i><span>close</span></a>

								<div class="detailed-information">
									<h4>Information</h4>
									<ul>
										<li class="username">
											<span class="label">Username</span>
											<span class="value">passbolt</span>
										</li>
										<li class="password">
											<div class="label">Password</div>
											<div class="value">
												<div class="secret-copy">
													<a href="#copy_secret">
														<span>copy password to clipboard</span>
													</a>
					<pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMAyFwuC5Agdg+AQf/cf6roWU6VRXIvXD6iBYu0RKxHSikMcF7OuoHdzGELKX5
4cNEI/br6CgLr/QlUxH62XCgi8MCyqaV8ewbH94xtR6nHtA1izLeBNKBjkFTE3wL
qVga+xgHwpxblq1RJVbfo77+gcbx4d2sm9udbKe0Ufej3P1INMIRPPl7dhbwuWTV
sZRqWe2Y7R2QybT3lc2fp7P7BkEkdy0luaOIG4+AESMdg0+OkEGMl1nT31bgi6k6
bUc7GhPlveuIfkeHrQzHs8eq6YUkFCZJ+k2VQ14P3RLk2ibE4+B8YHW4V7TSk6tI
6ZIZDrpxfzXXWcDykh0Ebz3ZPPimoSwlk7XwgaFBptJIAYcQEog5Dbfh5fLO/DBf
3lJcM7Q/DKrSrJVtOBwJe4vdO5Tdfi0Zn9QHDl0MnkslFxLVVnhiAH2HJ0DufMhl
9AaKzfwbSvV5
=JVBU
-----END PGP MESSAGE-----
</pre>
												</div>
											</div>
										</li>
										<li class="url">
											<span class="label">URL</span>
			<span class="value">
				<a href="https://tetris.com"
					 target="_blank">https://tetris.com</a>
			</span>
										</li>
										<li class="modified">
											<span class="label">Modified</span>
											<span class="value">2 years ago</span>
										</li>
										<li class="modified-by">
											<span class="label">Modified by</span>
											<span class="value">anonymous@passbolt.com</span>
										</li>
										<li class="modified-by">
											<span class="label">Owner</span>
											<span class="value">anonymous@passbolt.com</span>
										</li>
										<!--<li class="expire">-->
										<!--<span class="label">Expire</span>-->
										<!--<span class="value">never</span>-->
										<!--</li>-->
										<!--<li class="strength">
												<span class="label">Strength</span>
												<span>
														-
												</span>
										</li>-->
									</ul>
								</div>
								<!-- Description management -->
								<div
									class="description passbolt_controller_component_sidebar_section_sidebar_section_description_controller passbolt_view_component_sidebar_section_sidebar_section_description js_component ready"
									id="js_rs_details_description"><h4>Description</h4>

									<a href="#" class="edit_description_button section-action"
										 id="js_edit_description_button">
										<i class="icon edit no-text"></i>
										<span>edit</span>
									</a>

									<p class="description_content">tetris license description</p>
									<!-- edit description form -->
									<div style="display: none;"
											 class="passbolt_controller_form_resource_edit_description_form_controller mad_view_form_form_view js_component hidden"
											 id="js_rs_details_edit_description">
										<div class="form-content resource-description-edit-wrapper">
											<input value="50d77ff9-fdd8-4035-b7c6-1b63d7a10fce"
														 id="2620916c-18d0-5f72-b2a5-799dfc6b9398"
														 name="data[Resource][id]"
														 class="js_resource_id required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
														 type="hidden">

											<div class="input text required js_form_element_wrapper">
                        <textarea id="4187d830-a008-d7be-dbef-c17063290de9"
																	name="data[Resource][description]"
																	class="js_resource_description required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																	maxlength="150"
																	placeholder="enter description"></textarea>

												<div id="82c135d9-1982-73bd-e14f-073342640054"
														 class="js_resource_description_feedback message mad_form_feedback_controller mad_view_view js_component ready">
												</div>
											</div>
											<div class="actions">
												<input class="button resource-submit" value="save"
															 type="submit">
											</div>
										</div>
									</div>
								</div>
								<!-- Tags management -->
								<div class="tags clearfix" id="js_rs_details_tags"></div>
								<!-- Comments management -->
								<div
									class="comments clearfix passbolt_controller_component_comments_controller passbolt_view_component_comments js_component ready"
									id="js_rs_details_comments"><h4>Comments</h4>
									<a href="#" class="section-action"><i
										class="icon create no-text"></i><span>create</span></a>

									<div style="display: none;"
											 class="passbolt_controller_form_comment_create_form_controller mad_view_form_form_view js_component hidden"
											 id="js_rs_details_comments_add_form">
										<ul>
											<li class="comment-wrapper">
												<div class="comment add">
													<div class="author profile picture"><a href="#"><img
														src="img/user.png" alt="comment author picture" ></a></div>
													<div class="form-content">
														<div class="input textarea required">
															<label for="Comment">Add a comment</label>
															<input value=""
																		 id="9b6d6cc6-d2c4-64df-b87c-1f755aa4f4f8"
																		 name="data[comment][parent_id]"
																		 class="js_comment_parent_id required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																		 type="hidden">
															<input value="50d77ff9-fdd8-4035-b7c6-1b63d7a10fce"
																		 id="e77d526a-6be7-f061-6426-09e026cf535a"
																		 name="data[comment][foreign_id]"
																		 class="js_comment_foreign_id required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																		 type="hidden">
															<input value="Resource"
																		 id="8d465103-f2ba-99f9-2eab-53c34ba05adf"
																		 name="data[comment][foreign_model]"
																		 class="js_comment_foreign_model required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																		 type="hidden">
                                    <textarea
																			id="46ce112a-1995-31b8-9f31-dddb097abc72"
																			name="data[comment][content]"
																			class="js_comment_content required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																			maxlength="150"
																			placeholder="add a comment"></textarea>

															<div id="51625daa-d10f-4f52-cf20-b007a7590986"
																	 class="js_comment_content_feedback message mad_form_feedback_controller mad_view_view js_component ready">
															</div>
														</div>
														<div class="metadata">
															<span class="author username"><a href="#">You</a></span>
															<span class="modified">right now</span>
														</div>
														<div class="actions">
															<a href="#"
																 class="button comment-submit"><span>send</span></a>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
									<ul
										class="passbolt_controller_component_comments_list_controller passbolt_view_component_comments_list tree ready"
										id="js_rs_details_comments_list"></ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="display: none;"
						 class="passbolt_controller_people_workspace_controller mad_view_view tab-content hidden"
						 id="js_passbolt_peopleWorkspace_controller">
					<div class="js_users_workspace">
						<div class="panel left">
							<div class="navigation first shortcuts">
								<ul id="js_wsp_users_group_shortcuts"
										class="clearfix passbolt_controller_component_user_shortcuts_controller mad_view_component_tree menu ready">
									<li id="2a97b970-69b9-f91f-e94f-d61fd6cb3f30" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>All users</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="fd0509b5-6c70-6a40-2382-159e6b3aa9fe" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Recently modified</span></a>
												</div>
											</div>
										</div>


									</li>
								</ul>
							</div>
							<div class="navigation last tree groups">
								<ul id="js_wsp_users_group_chooser">
								</ul>
							</div>
						</div>
						<div class="panel middle">
							<div id="js_wsp_ppl_breadcrumb"
									 class="breadcrumbs passbolt_controller_component_people_breadcrumb_controller mad_view_view js_component ready">
								<ul id="c9dfc8c3-4243-f150-41aa-86f433f07fde"
										class="mad_controller_component_menu_controller mad_view_component_tree menu ready">
									<li id="196935b9-19f0-2c5e-28e7-3f297d25dad0" class="ready">
										<div class="main-cell">
											<a href="#"><span>All users</span></a>
										</div>
									</li>
								</ul>
							</div>
							<div id="js_wsp_ppl_browser"
									 class="tableview passbolt_controller_component_user_browser_controller passbolt_view_component_user_browser selection">
								<div class="tableview-header">
									<table>
										<thead>
										<tr>

											<th class="js_grid_column js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div class="input checkbox"><label for="checkbox-select-all">select
													all</label></div>
											</th>

											<th class="js_grid_column js_grid_column_avatar cell_avatar s-cell">

											</th>

											<th class="js_grid_column js_grid_column_name cell_name m-cell">
												User
											</th>

											<th class="js_grid_column js_grid_column_username cell_username m-cell">
												Username
											</th>

											<th class="js_grid_column js_grid_column_modified cell_modified m-cell">
												Modified
											</th>

										</tr>
										</thead>
									</table>
								</div>
								<div class="tableview-content scroll">
									<table>
										<tbody>
										<tr id="dada6042-c5cd-11e1-a0c5-080027796c51">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_dada6042-c5cd-11e1-a0c5-080027796c51">
														<div class="input checkbox">
															<input value="dada6042-c5cd-11e1-a0c5-080027796c51"
																		 id="checkbox95eea83f-dd4a-fe08-4083-89c3fc894349"
																		 type="checkbox">
															<label for="checkbox95eea83f-dd4a-fe08-4083-89c3fc894349"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Root Abaga">
													Root Abaga
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="root@passbolt.com">
													root@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr class="selected" id="50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce">
														<div class="input checkbox">
															<input checked="checked"
																		 value="50cdea9c-7e80-4eb6-b4cc-2f4fd7a10fce"
																		 id="checkbox707c599b-5ab4-24cf-0cbe-3324bd3c187a"
																		 type="checkbox">
															<label for="checkbox707c599b-5ab4-24cf-0cbe-3324bd3c187a"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img
														src="img/public/images/ProfileAvatar/24/20/32/5537f446d5004e688c6d62968cebc04d/5537f446d5004e688c6d62968cebc04d.65a0ba70.png"
														height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Cedric Alfonsi">
													Cedric Alfonsi
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="cedric@passbolt.com">
													cedric@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdea9c-4380-4eb6-b4cc-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-4380-4eb6-b4cc-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdea9c-4380-4eb6-b4cc-2f4fd7a10fce"
																		 id="checkbox8b8ab85a-2ca9-b224-bbca-672536b1a92e"
																		 type="checkbox">
															<label for="checkbox8b8ab85a-2ca9-b224-bbca-672536b1a92e"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Jean René Bergamotte">
													Jean René Bergamotte
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="jean-rene@test.com">
													jean-rene@test.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdea9c-a34c-406f-a9f1-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-a34c-406f-a9f1-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdea9c-a34c-406f-a9f1-2f4fd7a10fce"
																		 id="checkboxb7b88876-387c-5f05-4981-310db0afba95"
																		 type="checkbox">
															<label for="checkboxb7b88876-387c-5f05-4981-310db0afba95"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img
														src="img/public/images/ProfileAvatar/00/00/48/5537f444ef1c43b4a1e262968cebc04d/5537f444ef1c43b4a1e262968cebc04d.65a0ba70.png"
														height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Remy Bertot">
													Remy Bertot
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="remy@passbolt.com">
													remy@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="533d37a0-aa11-4945-9b11-1663a0a895dc">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_533d37a0-aa11-4945-9b11-1663a0a895dc">
														<div class="input checkbox">
															<input value="533d37a0-aa11-4945-9b11-1663a0a895dc"
																		 id="checkboxca982611-1d3a-eafc-0eec-d9dab51ce9f4"
																		 type="checkbox">
															<label for="checkboxca982611-1d3a-eafc-0eec-d9dab51ce9f4"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Userone Company A">
													Userone Company A
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="a-usr1@companya.com">
													a-usr1@companya.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdea9c-fa10-47af-aaa8-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-fa10-47af-aaa8-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdea9c-fa10-47af-aaa8-2f4fd7a10fce"
																		 id="checkbox3d3a1f8c-628e-64b7-8e17-a66bbe44086a"
																		 type="checkbox">
															<label for="checkbox3d3a1f8c-628e-64b7-8e17-a66bbe44086a"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img
														src="img/public/images/ProfileAvatar/60/80/29/5537f444bc4444fea0e662968cebc04d/5537f444bc4444fea0e662968cebc04d.65a0ba70.png"
														height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Myriam Djerouni">
													Myriam Djerouni
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="myriam@passbolt.com">
													myriam@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdea9c-f214-4549-9807-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-f214-4549-9807-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdea9c-f214-4549-9807-2f4fd7a10fce"
																		 id="checkboxcb86c803-70b5-0d41-1325-b68e4aa741e7"
																		 type="checkbox">
															<label for="checkboxcb86c803-70b5-0d41-1325-b68e4aa741e7"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Aurelie Gherards">
													Aurelie Gherards
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="aurelie@passbolt.com">
													aurelie@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdea9c-af80-4e5e-86d0-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-af80-4e5e-86d0-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdea9c-af80-4e5e-86d0-2f4fd7a10fce"
																		 id="checkboxcd4ca330-9a63-c6ec-03a6-05f6bf4b2039"
																		 type="checkbox">
															<label for="checkboxcd4ca330-9a63-c6ec-03a6-05f6bf4b2039"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img
														src="img/public/images/ProfileAvatar/13/58/44/5537f445184c4acda3b562968cebc04d/5537f445184c4acda3b562968cebc04d.65a0ba70.png"
														height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Ismail Guennouni">
													Ismail Guennouni
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="ismail@passbolt.com">
													ismail@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="533d37a0-bc80-4945-9b11-1663c0a895dc">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_533d37a0-bc80-4945-9b11-1663c0a895dc">
														<div class="input checkbox">
															<input value="533d37a0-bc80-4945-9b11-1663c0a895dc"
																		 id="checkbox4220cbaf-c1c1-40cf-f536-d00dc192bb4a"
																		 type="checkbox">
															<label for="checkbox4220cbaf-c1c1-40cf-f536-d00dc192bb4a"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Admin Istrator">
													Admin Istrator
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="admin@passbolt.com">
													admin@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdab9c-4380-4eb6-b4cc-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdab9c-4380-4eb6-b4cc-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdab9c-4380-4eb6-b4cc-2f4fd7a10fce"
																		 id="checkboxc8fbb4a6-615b-4ff8-e45f-d7b6f190a778"
																		 type="checkbox">
															<label for="checkboxc8fbb4a6-615b-4ff8-e45f-d7b6f190a778"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="User Lambda">
													User Lambda
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="user@passbolt.com">
													user@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="533d346d-d378-4acc-affd-1663c0a895dc">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_533d346d-d378-4acc-affd-1663c0a895dc">
														<div class="input checkbox">
															<input value="533d346d-d378-4acc-affd-1663c0a895dc"
																		 id="checkboxfc9be7d4-0223-2732-24b9-53e42df07318"
																		 type="checkbox">
															<label for="checkboxfc9be7d4-0223-2732-24b9-53e42df07318"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Frank Leboeuf">
													Frank Leboeuf
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="frank@passbolt.com">
													frank@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="533d32c0-1f30-438c-8f26-1768c0a895dc">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_533d32c0-1f30-438c-8f26-1768c0a895dc">
														<div class="input checkbox">
															<input value="533d32c0-1f30-438c-8f26-1768c0a895dc"
																		 id="checkboxedaaa101-676d-5e7f-e357-8226ca4cc416"
																		 type="checkbox">
															<label for="checkboxedaaa101-676d-5e7f-e357-8226ca4cc416"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Great Manager">
													Great Manager
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="manager.nogroup@passbolt.com">
													manager.nogroup@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="50cdea9c-aa88-46cb-a09b-2f4fd7a10fce">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_50cdea9c-aa88-46cb-a09b-2f4fd7a10fce">
														<div class="input checkbox">
															<input value="50cdea9c-aa88-46cb-a09b-2f4fd7a10fce"
																		 id="checkboxb3a967d4-f9f4-fb28-5471-2004611b66c4"
																		 type="checkbox">
															<label for="checkboxb3a967d4-f9f4-fb28-5471-2004611b66c4"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img
														src="img/public/images/ProfileAvatar/56/27/87/5537f445e42047efbe5f62968cebc04d/5537f445e42047efbe5f62968cebc04d.65a0ba70.png"
														height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Kevin Muller">
													Kevin Muller
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="kevin@passbolt.com">
													kevin@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="533d3564-03e8-4963-94a7-178cc0a895dc">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_533d3564-03e8-4963-94a7-178cc0a895dc">
														<div class="input checkbox">
															<input value="533d3564-03e8-4963-94a7-178cc0a895dc"
																		 id="checkbox4da0090b-3adf-e97a-e555-4c542a16debd"
																		 type="checkbox">
															<label for="checkbox4da0090b-3adf-e97a-e555-4c542a16debd"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Guest Star">
													Guest Star
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="guest@passbolt.com">
													guest@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="eeee6042-c5cd-11e1-a0c5-080027796c51">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_eeee6042-c5cd-11e1-a0c5-080027796c51">
														<div class="input checkbox">
															<input value="eeee6042-c5cd-11e1-a0c5-080027796c51"
																		 id="checkbox4b8e9017-47cf-9922-0b9d-9162fe264afe"
																		 type="checkbox">
															<label for="checkbox4b8e9017-47cf-9922-0b9d-9162fe264afe"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="User Test">
													User Test
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="utest@passbolt.com">
													utest@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="bbd56042-c5cd-11e1-a0c5-080027796c4e">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_bbd56042-c5cd-11e1-a0c5-080027796c4e">
														<div class="input checkbox">
															<input value="bbd56042-c5cd-11e1-a0c5-080027796c4e"
																		 id="checkboxf9a02222-b8ef-ad32-8aa5-190771d8ae14"
																		 type="checkbox">
															<label for="checkboxf9a02222-b8ef-ad32-8aa5-190771d8ae14"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="User b Test">
													User b Test
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="test@passbolt.com">
													test@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="dada6042-c5cd-11e1-a0c5-080027796c4c">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_dada6042-c5cd-11e1-a0c5-080027796c4c">
														<div class="input checkbox">
															<input value="dada6042-c5cd-11e1-a0c5-080027796c4c"
																		 id="checkbox062edb6d-6205-f0c6-484a-4b9daf4eeb76"
																		 type="checkbox">
															<label for="checkbox062edb6d-6205-f0c6-484a-4b9daf4eeb76"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img
														src="img/public/images/ProfileAvatar/71/94/14/5537f444537448bcb17362968cebc04d/5537f444537448bcb17362968cebc04d.65a0ba70.png"
														height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Darth Vader">
													Darth Vader
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="darth.vader@passbolt.com">
													darth.vader@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										<tr id="bbd56042-c5cd-11e1-a0c5-080027796c4c">

											<td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
												<div title="">
													<div
														class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
														id="multiple_select_checkbox_bbd56042-c5cd-11e1-a0c5-080027796c4c">
														<div class="input checkbox">
															<input value="bbd56042-c5cd-11e1-a0c5-080027796c4c"
																		 id="checkboxdb75101e-bf8d-014b-09e9-5addf8be0b01"
																		 type="checkbox">
															<label for="checkboxdb75101e-bf8d-014b-09e9-5addf8be0b01"></label>
														</div>
													</div>
												</div>
											</td>

											<td class="js_grid_column_avatar cell_avatar s-cell">
												<div title="avatar">
													<img src="img/avatar/user.png" height="30" width="30">
												</div>
											</td>

											<td class="js_grid_column_name cell_name m-cell">
												<div title="Anon Ymous">
													Anon Ymous
												</div>
											</td>

											<td class="js_grid_column_username cell_username m-cell">
												<div title="anonymous@passbolt.com">
													anonymous@passbolt.com
												</div>
											</td>

											<td class="js_grid_column_modified cell_modified m-cell">
												<div title="7 days ago">
													7 days ago
												</div>
											</td>

										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="3e989c9e-4920-5fa4-b912-878779b70e2c"
								 class="panel aside js_wsp_users_sidebar_second passbolt_controller_component_user_details_controller passbolt_view_component_user_details js_component ready"
								 style="">
							<div class="user">
								<div class="header">
									<img
										src="img/public/images/ProfileAvatar/24/20/32/5537f446d5004e688c6d62968cebc04d/5537f446d5004e688c6d62968cebc04d.65a0ba70.png">

									<h3>
										<span class="name">Cedric Alfonsi</span>
										<span class="username">cedric@passbolt.com</span>
									</h3>
								</div>
								<a href="#" class="dialog-close"><i
									class="icon close no-text"></i><span>close</span></a>

								<div class="detailed-information">
									<h4>Information</h4>
									<ul>
										<li class="username">
											<span class="label">Password</span>
											<span class="value">**********</span>
										</li>
										<li class="password">
											<span class="label">Role</span>
											<span class="value">User</span>
										</li>
										<li class="modified">
											<span class="label">Modified</span>
											<span class="value">7 days ago</span>
										</li>
									</ul>
								</div>
								<div class="key-information">
									<h4>Public Key</h4>
									<ul>
										<li class="keyid">
											<span class="label">Key id</span>
											<span class="value">36E2C9F9</span>
										</li>
										<li class="type">
											<span class="label">Type</span>
											<span class="value">RSA</span>
										</li>
										<li class="created">
											<span class="label">Created</span>
											<span class="value">2015-03-20 14:33:40</span>
										</li>
										<li class="expires">
											<span class="label">Expires</span>
											<span class="value"></span>
										</li>
										<li class="key">
											<span class="label">Public key</span>
				<span class="value">
					<a href="#" class="button copy-public-key">
						<span>copy</span>
					</a>
				</span>
										</li>
										<li>
                    <textarea>-----BEGIN PGP PUBLIC KEY BLOCK-----
                        Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
                        Comment: GPGTools - https://gpgtools.org

                        mQENBFUML8QBCADTdYERI9gz3EoT7AVOT0l75xFCNsppcaLfgJthQfH2pNvhgT4a
                        1xbNNahxetVR9UbDD/vBwLqhf1bakF0p5z7KM2/+0aySrD2H/GCz+L9sxMilgIR4
                        Lw7fvjGrPnSRvPaoMoGxiS170jp00S1uLaux77nN7BjZ/ih9imIkz/CsdFEz32zY
                        jAqELdIq1G5Y9NwmoYapyo/auVxwk8BCOxGTIppnHWRGFpzoP4ud0YnPcGr+5har
                        4fvEV403N6FAAFnw0+D8Vui5mqfw85poPGjz51d2R1Muru2nN6xzWPwnefgfYp1x
                        cmhOUSvoNpi46RKTPFdiXDrjiftp6mDP1YS7ABEBAAG0LENlZHJpYyBBbGZvbnNp
                        IDxjZWRyaWMuYWxmb25zaUBwYXNzYm9sdC5jb20+iQE3BBMBCgAhBQJVDC/EAhsD
                        BQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAAAoJEFN8aLs24sn5pIIH/RrTQTk32zwa
                        XYTGjmkR+k2DT1Rs/VZGvbksPAfB3keH3v4ByAHBXlMwrDzYE/IpvLTTsjkUS/oO
                        m3Ni13Sg7Zw4UyOldZ7FZ4pvCH8ImiU1nueNkZ1Z5kIsOV51XgYqnu/HGIM++Zvw
                        RO/qT5NYjcA0rh85Bfq2W32DYsJsU+xi6IqKoTricE7xnFxnJbueu+HU+tE/Y6L+
                        pN9qUV2MQ5jFBluxa0q55ZC8tPzsCqgIQJOovRLeMPDfinszQ/cmed12PmoyD4WN
                        qT5PyXkw1ziXeAfbF8nc56Kkurd1kYWKlzj3TRLq+prv0jhbFUJ3zh3eNW703Ram
                        KFePzbnbzyK5AQ0EVQwvxAEIANoW8Uan1j0jUmEii4GOBuMDuWn/67pPkSlZnuGT
                        di4S6zruBkbM8JSCh3otVubujqPbZ14/9eZpXU3192amoxmzBOQGK9E/BkgIu/72
                        /MfyQA0H28DB62kMNbZrMQKx2aA3NUfFdKaQ/HySpOVHqFrZ2+YZWphjaNQ3Lo79
                        p1VXKrIqkwSMMaQDFbU7BNAkCBp4VFuQnFRv7TOp/vsuE43utHdsp+PxhoJGGXYy
                        Y2DUlyHmsE2TkRUDSpRjHVTDWpqGJwTv3+UPqe0mo2iM8aylcFFTBhykWJYe20TK
                        xuLA8CYVXBvD4qZFjv4rBOGT/8u2754434GBTLN38dBZuA0AEQEAAYkBHwQYAQoA
                        CQUCVQwvxAIbDAAKCRBTfGi7NuLJ+XwYB/oCKWz6aUPketyD8//ClxvExRuOUNSd
                        xtNbJ19gYatzMWIrcRuvExmBCIAYhfZZVPdiLWA1vcC/3VuARE34Etsiwur8bRdk
                        H/wLeojeqZiHnT5S88c3eb6NTHxY8tKVNLwF4ialORJUFA68auwtPPjwV3CsFOpN
                        5T2vEOhvvE4OaL/XZsbjmT1m5tVDsn+SyclxR1GrbY2dFb1WZLPTeHC120cfshk3
                        aIPzDFNnaO1TD86F0sHthvj2e1BgRifXNgz5z5H0PftCv/hepsop1qK0rfBNfVEK
                        EqYVvACgtOksdPIONyG8tJN1rT0yDasL07qA4ZqG4zOhrWJXppblKnSc
                        =iiFb
                        -----END PGP PUBLIC KEY BLOCK-----
                    </textarea>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="display: none;"
						 class="passbolt_controller_preference_workspace_controller mad_view_view tab-content hidden"
						 id="js_passbolt_preferenceWorkspace_controller">
					<div class="js_preference_workspace">
						<div class="panel left">
							<div class="navigation first">
								<ul id="js_wk_preference_menu"
										class="clearfix passbolt_controller_component_preference_menu_controller mad_view_component_tree menu ready">
									<li id="9dd16733-2aa9-9fca-2683-0194f4f2b2a0"
											class="selected ready">
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
							<div id="js_wsp_preference_breadcrumb"
									 class="breadcrumbs passbolt_controller_component_preference_breadcrumb_controller mad_view_view js_component ready">
								<ul id="00225aeb-12c6-1ad3-b737-97440f1f7cc7"
										class="mad_controller_component_menu_controller mad_view_component_tree menu ready">
									<li id="5afa9a8a-936b-44f9-3022-0e7eed05fb14" class="ready">
										<div class="main-cell">
											<a href="#"><span>All users</span></a>
										</div>
									</li>
									<li id="fecd2a42-6893-f9c9-bc16-eb4d7af1174d" class="ready">
										<div class="main-cell">
											<a href="#"><span>Kevin Muller</span></a>
										</div>
									</li>
									<li id="1037c9f5-339b-88da-c22c-55e140d291a9" class="ready">
										<div class="main-cell">
											<a href="#"><span>Profile</span></a>
										</div>
									</li>
								</ul>
							</div>
							<div class="mad_controller_component_tab_controller mad_view_component_tab js_component ready"
									 id="js_wk_preference_main">
								<div class="js_tabs_content tabs-content">
									<div style="display: block;"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected"
											 id="js_preference_wk_profile_controller">
										<div class="profile">
											<h3>Profile</h3>

											<div class="section detailed-information">
												<div class="avatar" style="float:left;">
													<div class="value">
														<img
															src="img/public/images/ProfileAvatar/56/27/87/5537f445e42047efbe5f62968cebc04d/5537f445e42047efbe5f62968cebc04d.a99472d5.png"
															style="width: 200px;" height="200"
															width="200">
													</div>
													<div class="edit">
														<a class="edit-avatar-action" href="#"
															 title="Change Avatar">
															<i class="icon camera"></i>
															<span class="text">Click here to upload a new picture.</span>
														</a>
													</div>
												</div>
												<ul>
													<li>
														<span class="label">Name</span>
														<span class="value">Kevin Muller</span>
													</li>
													<li>
														<span class="label">Email</span>
														<span class="value">kevin@passbolt.com</span>
													</li>
													<li>
														<span class="label">Role</span>
														<span class="value">user</span>
													</li>
													<li>
														<span class="label">Modified</span>
														<span class="value">7 days ago</span>
													</li>
													<li>
														<span class="label">Created</span>
														<span class="value">a few seconds ago</span>
													</li>
													<li>
														<span class="label">Public key</span>
														<span class="value">2C058586</span>

														<p><em>Note: Sorry it is not possible to
															change your key at the moment. <a
																href="#">learn more
																›</a></em></p>
													</li>
													<!--<li>-->
													<!--<span class="label">Groups</span>-->
													<!--<div class="value">-->
													<!--<ul id="js_wk_preference_profile_groups"></ul>-->
													<!--</div>-->
													<!--</li>-->
												</ul>
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
	</div>
</div>
<!-- footer -->
<footer>
	<div class="footer">
		<span class="copyright">2013 © Passbolt.com</span> •
		<span class="version">v.2.13.3</span>
	</div>
</footer>

<iframe frameborder="0" id="passbolt-iframe-progress-dialog" src="LU_iframe_encrypting.php" class="passbolt-plugin-dialog"></iframe>

</html>