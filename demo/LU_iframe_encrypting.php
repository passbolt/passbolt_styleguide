<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
<?php include('includes/meta/LU_meta_iframe.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog">
		<div class="dialog-header">
			<h2>Encrypting ...</h2>
			<a class="dialog-close js-dialog-close" href="#">
			<span class="fa icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
				<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">

			<!-- Form content class to have the white background -->
			<div class="form-content">
				<label>Take a deep breath. Enjoy being in the present moment...</label>

				<div class="progress-bar-wrapper">
					<span class="progress-bar big " id="js_progress_bar_container"><span class="progress" id="js_progress_bar"></span></span>
				</div>

				<div class="progress-details">
					<span class="progress-step-label" id="js_progress_step_label">encrypting 1/300</span>
					<span style="float:right" class="progress-percent"><span id="js_progress_percent">3</span>%</span>
				</div>

			</div>
			<div class="submit-wrapper clearfix">
				<a href="demo/LU_passwords.php" class="button primary processing" id="progress-waiting">Close</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>