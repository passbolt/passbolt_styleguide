<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
	<script language="javascript">
		$(function() {
			var details = [
				'Installing database',
				'Validating GPG keys',
				'Setting up keys',
				'Collecting fairy dust',
				'Setting up SMTP',
				'Locating Elon Musk\'s car. Don\'t panic.',
				'Checking options',
				'Writing configuration file',
				'Brewing pale ale',
				'Checking status'
			];
			var i = 0;
			function displayStatus() {
				if (details[i] !== undefined) {
					$('.install-details').text(details[i]);
					setTimeout(function() { displayStatus() }, 1000);
					i++;
				}
				else {
					document.location.href='demo/AN_webinstaller7a0_createuser.php';
				}
			}
			displayStatus();
		});
	</script>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>Some binary things are happening...</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'Installation';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12">
				<form>
					<div class="row">
						<!-- left column -->
						<div class="col7">
							<h3>Installing</h3>

							<div class="progress-bar-wrapper">
								<span class="progress-bar big infinite"><span class="progress "></span></span>
							</div>

							<p class="install-details">Installing database</p>

						</div>

						<!-- right column -->
						<div class="col4 last"></div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
<!--							<a href="demo/AN_setup3a0_setmasterpassword.php" class="button cancel big">cancel</a>-->
							<a href="demo/AN_setup4a0_securitytoken.php" class="button primary next big processing">next</a>
						</div>
					</div>

				</form>

			</div>
		</div>

	</div>

	<!-- footer -->
	<div class="footer">
		<span class="copyright">&copy; 2015 passbolt.com </span>
	</div>
</div>
</body>
</html>