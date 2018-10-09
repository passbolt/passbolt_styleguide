<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha no-passboltplugin no-firefox chrome">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>

</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_web_installer.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>Enter your database details</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'Database';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h3>Database configuration</h3>
						<div class="message error">
							A connection could not be established to the database. Please verify the settings.
						</div>
						<div class="input text required">
							<label for="DbType">Type</label>
							<select name="data[Db][type]" class="required fluid" id="DbType" required="required" type="text" disabled="disabled">
								<option value="mysql">MySQL / Maria DB</option>
							</select>
						</div>
						<div class="input text required">
							<label for="DbHost">Host</label>
							<input name="data[Db][host]" class="required fluid" id="DbHost" required="required" type="text" placeholder="host name or ip address">
						</div>
						<div class="input text required">
							<label for="DbPort">Port</label>
							<input name="data[Db][port]" class="required fluid" id="DbPort" required="required" type="text" placeholder="port" value="5432">
						</div>
						<div class="input text required">
							<label for="DbUsername">Username</label>
							<input name="data[Db][username]" class="required fluid" id="DbPort" required="required" type="text" placeholder="username">
						</div>
						<div class="input text required">
							<label for="DbPassword">Password</label>
							<input name="data[Db][password]" class="required fluid" id="DbPassword" required="required" type="password" placeholder="password">
						</div>
						<div class="input text required">
							<label for="DbName">Database name</label>
							<input name="data[Db][name]" class="required fluid" id="DbName" required="required" type="text" placeholder="database name">
						</div>

						<div class="submit-wrapper">
							<a href="demo/AN_webinstaller3a0_server_keys.php" class="button primary big">save and continue</a>
						</div>
					</div>
					<div class="col5 last">
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>