<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Help with version issues | Passbolt</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="../src/css/public.css">
	<script src="../src/js/jquery-3.3.1.min.js"></script>
	<script src="../src/js/bootstrap-scrollspy.js"></script>
	<script src="../src/js/imagelightbox.min.js"></script>
	<script src="../src/js/greedynav.js"></script>
</head>
<body>
<div id="container" class="page background">
	<!-- first header -->
	<?php include('includes/headers/AA_header.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2 search-wrapper">
			<h2><span>Version issues</span></h2>
		</div>
	</div>

	<div class="panel main">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard scrollspy" role="navigation">
				<ul class="nav">
					<li>
						<h2><a href="#">Help Sections</a></h2>
					</li>
					<li>
						<a href="#client">Update the plugin</a>
					</li>
					<li>
						<a href="#server">Update the server</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle" data-spy="scroll" data-target=".scrollspy">
			<div class="grid grid-responsive-12">
				<span id="client"></span>
				<?php $_GET['breadcrumbs'] = array(
						'home' => 'AA_home.php',
						'help' => 'AA_help.php',
						'version issues' => 'AA_help_version_issue.php'
				);
				include('includes/LU_breadcrumbs.php'); ?>
				<article class="faq">
					<ul class="list">
					<li>
					<div class="row">
						<div class="col7">
							<h3>What is happening to us?</h3>
							<div>
								<p>
									For each major or minor release both the plugin and the client need to be updated.
									However depending on the timing of the update, since the plugin gets updated automatically
									from Google Chrome Marketplace or Mozilla Addons, the server or the plugin may be behind one
									version or more.
								</p>
								<p>
									Passbolt team take great care to make sure that the plugin and server are backward compatible
									but this is not always possible, especially when introducing
									new major features. This is why the application may issue one of the following warnings.
								</p>
								<h3>Current known issues</h3>
								<p class="warning message">
									Version 1.5.0 is still pending approval from volunteers at Mozilla reviewing addons.
									It may not be possible for you to update at the moment.
									Please use Chrome in the meantime. Sorry for the inconvenience.
								</p>
							</div>
						</div>
						<div class="col5 last">
							<div class="tldr">
								<p>Do you have a question that is not in this list? Get in touch!</p>
								<a href="mailto:contact@passbolt.com" class="button primary">contact us</a>
							</div>
						</div>
					</div>
					</li>
					<li>
						<div class="row">
							<div class="col7">
								<h3>Update the plugin</h3>
								<div>
									<figure>
										<img src="../src/img/screenshots/AN_partial_version_issue_client.png" alt="warning dialog client" style="max-width: 450px;">
									</figure>
									<p>
										You can get this error when a new version of the plugin has been release but you are not using
										the latest version. Here are some resources that explains how to update your plugins:
									</p>
									<h4>On firefox</h4>
									<ul>
										<li>Got to <a href="about:addons">about:addons</a></li>
										<li>Select passbolt plugin.</li>
										<li>If auto update is disabled, click on "check for updates"</li>
									</ul>
									<h4>On chrome</h4>
									<ul>
										<li>Go to <a href="chrome://extensions/">chrome://extensions/</a></li>
										<li>Check on update extensions now buttons.</li>
									</ul>
								</div>
							</div>
						</div>
					</li>
						<li>
							<span id="server"></span>
							<div class="row">
								<div class="col7">
									<h3>Update the server</h3>
									<div>
										<figure>
											<img src="../src/img/screenshots/AN_partial_version_issue_server.png" alt="warning dialog server" style="max-width: 450px;">
										</figure>
										<p>
											You can find instructions on how to update the passbolt backend on
											<a href="#">this dedicated help page</a>.
										</p>
								</div>
							</div>
						</li>
					</ul>
				</article>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>