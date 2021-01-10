<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha no-passboltplugin no-firefox chrome">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
    <script src="src/js/jquery-3.5.0.min.js"></script>
    <script src="src/js/jquery-ui.min.js"></script>
    <script src="src/js/chosen.jquery.js"></script>
    <script type="text/javascript">

        $(function() {
            $("#ConnectionProtocol").chosen({width: '100%', disable_search: true});
        });
    </script>
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
<!--						<div class="message error">-->
<!--							A connection could not be established to the database. Please verify the settings.-->
<!--						</div>-->
                        <div class="message notice">
                            <p>An existing database has been detected on your server. The connection details are pre-filled below.<br/>
                                You can keep it as it is (default), or configure another database.
                            </p>
                        </div>
                        <div class="singleline connection_info protocol_host_port clearfix required">
                            <label>Database connection url</label>
                            <div class="input text field_protocol_host">
                                <div class="input text protocol">
                                    <select name="data[Db][type]" class="required fluid" id="ConnectionProtocol" required="required">
                                        <option value="1">mysql://</option>
                                    </select>
                                </div>
                                <div class="input text host">
                                    <input name="data[Db][host]" type="text" class="required fluid" placeholder="host or ip" value="localhost">
                                </div>
                            </div>
                            <div class="input text port">
                                <input name="data[Db][port]" type="number" class="required fluid" placeholder="port" value="389" value="3306">
                            </div>
                        </div>
                        <div class="singleline clearfix">
                            <div class="input text first-field required">
                                <label for="DbUsername">Username</label>
                                <input name="data[Db][username]" type="text" class="required fluid" placeholder="username" value="passbolt">
                            </div>
                            <div class="input text last-field required">
                                <label for="DbPassword">Password</label>
                                <input name="data[Db][password]" type="password" class="required fluid" placeholder="password" value="******">
                            </div>
                        </div>
						<div class="input text required">
							<label for="DbName">Database name</label>
							<input name="data[Db][name]" class="required fluid" id="DbName" required="required" type="text" placeholder="database name" value="passbolt_db">
						</div>
                        <br>
						<div class="submit-wrapper">
							<a href="demo/legacy/AN_webinstaller3a0_server_keys.php" class="button primary big">Save and continue</a>
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