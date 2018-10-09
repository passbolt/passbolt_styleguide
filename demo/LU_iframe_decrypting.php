<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
<?php include('includes/meta/LU_meta_iframe.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog">
		<div class="dialog-header">
			<h2>Decrypting ...</h2>
			<a class="dialog-close js-dialog-close" href="#">
				<i class="fa fa-close"></i>
				<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">

			<!-- Form content class to have the white background -->
			<div class="form-content">

				<div class="progress-bar-wrapper">
					<span class="progress-bar big infinite" id="js_progress_bar_container">
						<span class="progress"></span>
					</span>
				</div>

				<div class="progress-details">
					<span class="progress-step-label" id="js_progress_step_label">completed</span>
					<span style="float:right" class="progress-percent"><span id="js_progress_percent">100</span>%</span>
				</div>

			</div>
			<div class="submit-wrapper clearfix">
				<a href="demo/LU_passwords.php" class="button primary processing" id="progress-waiting">Close</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$('.progress-bar-wrapper .progress-bar.big.infinite').width('20%');
</script>
</body>
</html>