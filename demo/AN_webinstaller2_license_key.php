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
			<h2>We need your license key</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'License key';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<form>
							<div class="row">
								<div class="col12">
									<h3>Copy paste your passbolt pro license key here</h3>
									<div class="input textarea gpgkey">
										<textarea id="js_webinstaller_license_key_text" class="fluid code" name="data[Key][ascii]" placeholder=""></textarea>
									</div>
									<div class="input file">
										<input type="submit" id="js_setup_import_key_browse" value="Browse..." name="data[Key][file]">
										<span class="help-text">Or select a file from your computer</span>
									</div>
									<div id="ErrorMessage" class="message error hidden"></div>
								</div>
							</div>

							<div class="row last">
								<div class="input-wrapper">
									<a href="demo/AN_webinstaller1a1_systemcheck_success.php" class="button cancel big">cancel</a>
									<a href="demo/AN_webinstaller2a0_database.php" class="button primary next big">next</a>
								</div>
							</div>

						</form>
					</div>
					<div class="col5 last">
						<h2>What license key?</h2>
						<p>The license key is a file that was sent to you when you purchased passbolt pro. We need the license key in order to activate the pro features of passbolt.</p>
						<h2>How does it work?</h2>
						<p>After you insert your license key and press the next button, the installer will make a brief call to passbolt public server in order to verify if the license is valid. Once the validity is confirmed, you'll be able to continue with the installation process.</p>
						<a href="https://help.passbolt.com" target="_blank" rel="noopener" class="button primary big">
							<i class="fa fa-fw fa-life-saver"></i>
							Help
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>