<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
	<script language="javascript">
		$(function() {
			var details = [
				'Installing database',
				'Creating GPG key pair',
				'Setting up keys',
				'Collecting fairy dust',
				'Setting up Emails',
				'Locating Elon Musk\'s car. Don\'t panic.',
				'Checking options',
				'Writing configuration',
				'Brewing pale ale',
				'Checking status'
			];
			var i = 0;
			function displayStatus() {
				if (details[i] !== undefined) {
					$('.status').text(details[i]);
					setTimeout(function() { displayStatus() }, 1000);
					i++;
				}
				else {
					document.location.href='../demo/AA_cloud_free_trial_deployment_done.php';
				}
			}
			displayStatus();
		});
	</script>
</head>
<body>
<div id="container" class="page featured free-trial-deployment-progress">
    <?php include('includes/headers/AA_header.php'); ?>

    <div class="page-row free-trial-deployment-progress">
        <div class="grid grid-responsive-12">
            <div class="row">
	            <div class="col12">
		            <h1>Sit down and relax</h1>
					<p class="subtitle">We are currently deploying an instance of passbolt on our servers. Please wait...</p>
		            <div class="progress-bar-wrapper">
			            <span class="progress-bar big infinite"><span class="progress "></span></span>
		            </div>

		            <p class="status">Installing database</p>
	            </div>
            </div>
		</div>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>