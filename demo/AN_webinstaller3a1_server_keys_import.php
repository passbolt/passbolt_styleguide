<!doctype html>
<html lang="en" class="version alpha no-passboltplugin no-firefox chrome">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/devel.css" />
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_web_installer.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2 id="js_step_title">Import an existing key or <a class="button primary" href="../demo/AN_webinstaller3a0_server_keys.php" id="js_setup_goto_define_key">create</a> a new one!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'Server keys';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="grid grid-responsive-12">
						<form>
							<div class="row">
								<div class="col6">
									<h3><?= __('Copy paste your public and private key below'); ?></h3>
									<div class="input textarea gpgkey">
										<textarea id="js_setup_import_key_text" class="fluid code" name="data[Key][ascii]" placeholder=""></textarea>
									</div>
									<div class="input file">
										<input type="submit" id="js_setup_import_key_browse" value="Browse..." name="data[Key][file]">
										<span class="help-text"><?= __('Or select a file from your computer'); ?></span>
									</div>
									<div id="KeyErrorMessage" class="message error hidden"></div>
								</div>
							</div>

							<div class="row last">
								<div class="input-wrapper">
									<a href="../demo/AN_webinstaller3a0_server_keys.php" class="button cancel big">cancel</a>
									<a href="../demo/AN_webinstaller3a1_server_keys_import_error.php" class="button primary next big">next</a>
								</div>
							</div>

						</form>

					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>