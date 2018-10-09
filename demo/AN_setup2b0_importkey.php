<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2 id="js_step_title">Import an existing key or <a class="button primary" href="#" id="js_setup_goto_define_key">create</a> a new one!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div id="js_menu" class="navigation wizard"><ul>

				<li class="past">
					<a href="#">1. Get the plugin</a>
				</li>
				<li class="selected">
					<a href="#">2. Import your key</a>
				</li>
				<li class="disabled">
					3. Review key info
				</li>
				<li class="disabled">
					4. Set a security token
				</li>
				<li class="disabled">
					5. Login !
				</li>

			</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12">
				<div id="js_step_content" class="row import-key-wrapper">
					<div class="col6">
						<h3>Copy paste your public and private key below</h3>
						<div class="input textarea gpgkey">
							<textarea id="js_setup_import_key_text" class="fluid code" name="data[Key][ascii]" placeholder=""></textarea>
						</div>
						<div class="input file">
							<input type="submit" id="js_setup_import_key_browse" value="Browse..." name="data[Key][file]">
							<span class="help-text">Or select a file from your computer</span>
						</div>
						<div id="KeyErrorMessage" class="message error hidden"></div>
					</div>

				</div>
				<div class="row last">
					<div id="js_step_actions" class="submit-input-wrapper">
						<a class="button primary big js-state-enabled enabled" href="demo/AN_setup1a1_plugincheckok.php" id="js_setup_cancel_step">Cancel</a>
						<a class="button primary big js-state-disabled disabled" href="demo/AN_setup3b1_importedkeywarn.php" id="js_setup_submit_step">Next</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>