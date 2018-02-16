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
			<h2>Create a new server key or <a href="../demo/AN_webinstaller3a1_server_keys_import.php" class="button primary">import</a> an existing one</h2>
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
								<!-- left column -->
								<div class="col6">
									<h3>Create a new GPG key for your server</h3>
									<div class="input text required">
										<label for="OwnerName">Server Name</label>
										<input name="data[Owner][name]" class="required fluid" id="OwnerName" required="required" type="text" placeholder="My Company Server">
									</div>
									<div class="input text required disabled">
										<label for="OwnerEmail">Server Email</label>
										<input name="data[Owner][email]" class="required fluid" id="OwnerEmail" required="required" type="text" placeholder="admin@your-server.com">
									</div>
									<div class="input text">
										<label for="KeyComment">Comment</label>
										<input name="data[Key][comment]" class="required fluid" id="KeyComment" required="required" type="text" placeholder="add a comment (optional)">
									</div>
								</div>

								<!-- right column -->
								<div class="col4 last">
									<h3>Advanced settings</h3>
									<div class="input select required">
										<label for="KeyType">Key Type</label>
										<select name="data[Key][type]" id="KeyType" disabled="disabled" class="fluid">
											<option value="RSA-DSA" selected="selected">RSA and DSA (default)</option>
											<option value="DSA-EL" >DSA and Elgamal</option>
										</select>
									</div>
									<div class="input select required">
										<label for="KeyLength">Key Length</label>
										<select name="data[Key][length]" id="KeyLength" disabled="disabled" class="fluid">
											<option value="1024" >1024</option>
											<option value="2048" selected="selected">2048</option>
											<option value="3076" >3076</option>
										</select>
									</div>

									<div class="input date">
										<label for="KeyExpire">Key Expire</label>
										<input name="data[Key][expire]" class="required fluid" id="KeyExpire" disabled="disabled" required="required" type="text" placeholder="dd/mm/yyyy">
										<span class="input-addon"><i class="fa fa-calendar fa-fw"></i></span>
									</div>

								</div>

							</div>

							<div class="row last">
								<div class="input-wrapper">
									<a href="../demo/AN_webinstaller2a0_database.php" class="button cancel big">cancel</a>
									<a href="../demo/AN_webinstaller4a0_emails.php" class="button primary next big">next</a>
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