<!html>
<html style="" class="alpha version no-passboltplugin user js  cookies no-cssscrollbar" lang="en">
<head>
	<meta charset="utf-8">
	<base href="../src/">
	<title>Passbolt - The simple password management system | Passbolt</title>
	<meta name="description" content="Passbolt is a simple password manager that allows you to easily share secrets with your team without making compromises on security! ">
	<meta name="keywords" content="Passbolt, password manager, online password manager, open source password manager">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/devel.css">
</head>
<body>
<!-- main -->
<div id="container" class="page password">
	<div class="launching-screen">
		<div class="launching-screen-holder">
			<div class="logo">
				<h1><span>Passbolt</span></h1>
			</div>
			<div class="progress-bar-wrapper">
				<span class="progress-bar big infinite"><span class="progress "></span></span>
			</div>
			<p class="details">loading, please wait...</p>
		</div>
	</div>
	<div class="mad_event_event_bus"></div>
	<div id="b919b566-a832-8f70-fcdb-338705f912fc" class="mad_devel_devel">
		<div class="mad_devel_devel_sidebar_controller mad_view_view js_component ready" id="js-devel-sidebar-ctl">
			<button id="js-devel-sidebar-toggle-button" class="devel-sidebar-toggle-button mad_controller_component_button_controller mad_view_view js_component opened"></button>
			<div style="display: block;" id="js-devel-sidebar" class="devel-sidebar">
				<div class="devel-sidebar-menu-wrapper">
					<ul id="js-devel-sidebar-menu" class="devel-sidebar-menu mad_controller_component_menu_controller mad_view_component_tree menu ready">
						<li id="3abaa225-f88c-8c18-4d43-507d804d1385" class="ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>Components browser</span></a>
									</div>
								</div>
							</div>
						</li>
						<li id="aa6e547d-895d-5853-7662-872a0c9188d8" class="ready">
							<div class="row selected">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>SQL trace</span></a>
									</div>
								</div>
							</div>
						</li>
						<li id="5f472868-5b89-9c5c-fa31-bd0fa4878613" class="ready">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>Plugin configuration</span></a>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="passbolt_controller_app_controller mad_view_view js_component ready" id="js_app_controller">
		<div id="42e8bc4e-c510-3a17-1fba-b126dad2ac86" class="mad_controller_component_dialog_controller mad_view_component_dialog dialog-wrapper-devel-sql-trace dialog-wrapper ready">
			<div class="dialog">
				<div class="dialog-header">
					<h2>Sql trace</h2>
					<a href="#" class="dialog-close"><i class="icon close no-text"></i><span>close</span></a>
				</div>
				<div class="js_dialog_content dialog-content">
					<div class="row">
						<div class="col12">
							<table class="cake-sql-log" id="cakeSqlLog_14329921055569b969f33cf7_37037730">
								<caption>(default) 2 queries took 0 ms</caption>
								<thead>
								<tr>
									<th>Nr</th>
									<th>Query</th>
									<th>Error</th>
									<th>Affected</th>
									<th>Num. rows</th>
									<th>Took (ms)</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>1</td>
									<td>SELECT `Role`.`id`, `Role`.`name`, `Role`.`description`, `Role`.`created`, `Role`.`modified`, `Role`.`created_by`, `Role`.`modified_by` FROM `passbolt`.`roles` AS `Role`   WHERE `name` IN ('admin', 'user')</td>
									<td></td>
									<td style="text-align: right">2</td>
									<td style="text-align: right">2</td>
									<td style="text-align: right">0</td>
								</tr>
								<tr>
									<td>2</td>
									<td>SELECT `AuthenticationBlacklist`.`id`, `AuthenticationBlacklist`.`ip`, `AuthenticationBlacklist`.`expiry`, `AuthenticationBlacklist`.`created`, `AuthenticationBlacklist`.`modified` FROM `passbolt`.`authentication_blacklists` AS `AuthenticationBlacklist`   WHERE `expiry` &gt; '2015-05-30 13:21:45'</td>
									<td></td>
									<td style="text-align: right">0</td>
									<td style="text-align: right">0</td>
									<td style="text-align: right">0</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="js_app_panel_main" class="panel main">
		</div>
	</div>
</div>
<!-- footer -->
<footer>
	<div class="footer">
		<span class="copyright">2015 © Passbolt.com</span> •
		<span class="version">v.2.15.5</span>
	</div>
</footer>
<div style="display: none;" id="js-devel-sql-trace" class="devel-sql-trace grid mad_controller_component_controller mad_view_view js_component hidden">
	<div class="row">
		<div class="col12">
			<table class="cake-sql-log" id="cakeSqlLog_14329921055569b969f33cf7_37037730">
				<caption>(default) 2 queries took 0 ms</caption>
				<thead>
				<tr>
					<th>Nr</th>
					<th>Query</th>
					<th>Error</th>
					<th>Affected</th>
					<th>Num. rows</th>
					<th>Took (ms)</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>1</td>
					<td>SELECT `Role`.`id`, `Role`.`name`, `Role`.`description`, `Role`.`created`, `Role`.`modified`, `Role`.`created_by`, `Role`.`modified_by` FROM `passbolt`.`roles` AS `Role`   WHERE `name` IN ('admin', 'user')</td>
					<td></td>
					<td style="text-align: right">2</td>
					<td style="text-align: right">2</td>
					<td style="text-align: right">0</td>
				</tr>
				<tr>
					<td>2</td>
					<td>SELECT `AuthenticationBlacklist`.`id`, `AuthenticationBlacklist`.`ip`, `AuthenticationBlacklist`.`expiry`, `AuthenticationBlacklist`.`created`, `AuthenticationBlacklist`.`modified` FROM `passbolt`.`authentication_blacklists` AS `AuthenticationBlacklist`   WHERE `expiry` &gt; '2015-05-30 13:21:45'</td>
					<td></td>
					<td style="text-align: right">0</td>
					<td style="text-align: right">0</td>
					<td style="text-align: right">0</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</body>
</html>