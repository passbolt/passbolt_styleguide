<!doctype html>
<html lang="en" class="version alpha no-passboltplugin">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/devel.css" />
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>Welcome to passbolt! Let's take 5 min to setup your system.</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<ul>
					<li class="selected">
						<a href="#">1. Get the plugin</a>
					</li>
					<li class="disabled">
						2. Define your keys
					</li>
					<li class="disabled">
						3. Set a passphrase
					</li>
					<li class="disabled">
						4. Set a security token
					</li>
					<li class="disabled">
						5. Login!
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12">
				<div class="row">
					<div class="col7">
						<div class="plugin-check-wrapper">
							<h3>Plugin check</h3>
							<div class="plugin-check firefox error">
								<p class="message">An add-on is required to use Passbolt. Download it at <a href="#">addons.mozilla.org</a>.</p>
							</div>
						</div>
						<div class="why-plugin-wrapper">
							<h3>Why do I need a plugin</h3>
							<p>
								Passbolt requires a browser add-on to guarantee that your secret key and your passphrase are never accessible to any website (including passbolt.com itself).
								This is also the only way to guarantee that the core cryptographic libraries cannot be tampered with.
								<a href="#">Learn more</a>
							</p>
						</div>
						<div class="submit-input-wrapper">
							<a href="../demo/AN_setup1a1_plugincheckok.php" class="button primary big">retry</a>
						</div>
					</div>
					<div class="col5 last">
						<div class="video-wrapper">
							<iframe width="400" height="300" src="https://www.youtube.com/embed/u-vDLf7cmf0" frameborder="0" allowfullscreen></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
<div id="js-devel-sql-trace" class="devel-sql-trace grid">
	<div class="row">
		<div class="col12">
			<table class="cake-sql-log" id="cakeSqlLog_14329909275569b4cf3063c6_14351990"><caption>(default) 7 queries took 0 ms</caption>	<thead>
				<tr><th>Nr</th><th>Query</th><th>Error</th><th>Affected</th><th>Num. rows</th><th>Took (ms)</th></tr>
				</thead>
				<tbody>
				<tr><td>1</td><td>SELECT `Role`.`id`, `Role`.`name`, `Role`.`description`, `Role`.`created`, `Role`.`modified`, `Role`.`created_by`, `Role`.`modified_by` FROM `passbolt`.`roles` AS `Role`   WHERE `name` IN (&#039;admin&#039;, &#039;user&#039;)</td><td></td><td style="text-align: right">2</td><td style="text-align: right">2</td><td style="text-align: right">0</td></tr>
				<tr><td>2</td><td>SELECT `AuthenticationBlacklist`.`id`, `AuthenticationBlacklist`.`ip`, `AuthenticationBlacklist`.`expiry`, `AuthenticationBlacklist`.`created`, `AuthenticationBlacklist`.`modified` FROM `passbolt`.`authentication_blacklists` AS `AuthenticationBlacklist`   WHERE `expiry` &gt; &#039;2015-05-30 13:02:06&#039;</td><td></td><td style="text-align: right">0</td><td style="text-align: right">0</td><td style="text-align: right">0</td></tr>
				<tr><td>3</td><td>SELECT `AuthenticationToken`.`id`, `AuthenticationToken`.`token`, `AuthenticationToken`.`user_id`, `AuthenticationToken`.`active`, `AuthenticationToken`.`created`, `AuthenticationToken`.`modified`, `AuthenticationToken`.`created_by`, `AuthenticationToken`.`modified_by` FROM `passbolt`.`authentication_tokens` AS `AuthenticationToken`   WHERE `AuthenticationToken`.`user_id` = &#039;55698afc-94b8-4c9b-964d-3e34c0a80067&#039; AND `AuthenticationToken`.`token` = &#039;c6a2f44ab9e4b0f82fd7e048d2d4f803&#039; AND `AuthenticationToken`.`active` = &#039;1&#039;   ORDER BY `created` DESC  LIMIT 1</td><td></td><td style="text-align: right">1</td><td style="text-align: right">1</td><td style="text-align: right">0</td></tr>
				<tr><td>4</td><td>SELECT DISTINCT `User`.`id`, `User`.`username`, `User`.`role_id`, `User`.`created`, `User`.`modified`, `Profile`.`id`, `Profile`.`first_name`, `Profile`.`last_name`, `Profile`.`created`, `Profile`.`modified`, `Gpgkey`.`uid`, `Gpgkey`.`bits`, `Gpgkey`.`fingerprint`, `Gpgkey`.`key_id`, `Gpgkey`.`key_created`, `Gpgkey`.`expires`, `Gpgkey`.`type`, `Gpgkey`.`key`, `Role`.`id`, `Role`.`name`, `User`.`id` FROM `passbolt`.`users` AS `User` left JOIN `passbolt`.`groups_users` AS `GroupsUser` ON (`User`.`id` = `GroupsUser`.`user_id`) left JOIN `passbolt`.`groups` AS `Group` ON (`Group`.`id` = `GroupsUser`.`group_id`) LEFT JOIN `passbolt`.`roles` AS `Role` ON (`User`.`role_id` = `Role`.`id`) LEFT JOIN `passbolt`.`profiles` AS `Profile` ON (`Profile`.`user_id` = `User`.`id`) LEFT JOIN `passbolt`.`gpgkeys` AS `Gpgkey` ON (`Gpgkey`.`user_id` = `User`.`id`)  WHERE `User`.`active` = &#039;&#039; AND `User`.`deleted` = &#039;0&#039; AND `User`.`id` = &#039;55698afc-94b8-4c9b-964d-3e34c0a80067&#039;    LIMIT 1</td><td></td><td style="text-align: right">1</td><td style="text-align: right">1</td><td style="text-align: right">0</td></tr>
				<tr><td>5</td><td>SELECT `Avatar`.`id`, `Avatar`.`user_id`, `Avatar`.`foreign_key`, `Avatar`.`model`, `Avatar`.`filename`, `Avatar`.`filesize`, `Avatar`.`mime_type`, `Avatar`.`extension`, `Avatar`.`hash`, `Avatar`.`path`, `Avatar`.`adapter`, `Avatar`.`created`, `Avatar`.`modified` FROM `passbolt`.`file_storage` AS `Avatar`   WHERE `Avatar`.`foreign_key` = &#039;55698afc-57fc-4bec-bc62-3e34c0a80067&#039;</td><td></td><td style="text-align: right">0</td><td style="text-align: right">0</td><td style="text-align: right">0</td></tr>
				<tr><td>6</td><td>SELECT `GroupUser`.`group_id`, `GroupUser`.`user_id` FROM `passbolt`.`groups_users` AS `GroupUser`   WHERE `GroupUser`.`user_id` = (&#039;55698afc-94b8-4c9b-964d-3e34c0a80067&#039;)</td><td></td><td style="text-align: right">0</td><td style="text-align: right">0</td><td style="text-align: right">0</td></tr>
				<tr><td>7</td><td>SELECT `Group`.`id`, `Group`.`name`, `Group`.`created`, `Group`.`modified`, `GroupsUser`.`id`, `GroupsUser`.`group_id`, `GroupsUser`.`user_id`, `GroupsUser`.`created`, `GroupsUser`.`created_by` FROM `passbolt`.`groups` AS `Group` JOIN `passbolt`.`groups_users` AS `GroupsUser` ON (`GroupsUser`.`user_id` = &#039;55698afc-94b8-4c9b-964d-3e34c0a80067&#039; AND `GroupsUser`.`group_id` = `Group`.`id`) </td><td></td><td style="text-align: right">0</td><td style="text-align: right">0</td><td style="text-align: right">0</td></tr>
				</tbody></table>
		</div>
	</div>
</div>
</body>
</html>