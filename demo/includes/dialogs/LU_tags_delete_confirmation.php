<?php include('_includes/bootstrap.php'); ?>
<!doctype html>
<html>

<head>
	<?php include('includes/meta/LU_meta_iframe.php'); ?>
</head>

<body class="iframe">
	<div class="dialog-wrapper">
		<div class="dialog confirm">
			<div class="dialog-header">
				<h2>Do you really want to delete tag?</h2>
				<a class="dialog-close js-dialog-close" href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH) ?>">
					<i class="fa fa-close"></i>
					<span class="visuallyhidden">close</span>
				</a>
			</div>
			<div class="js_dialog_content dialog-content">
				<div class="form-content">
					<p>
						<b>You are about to delete the tag "alpha".</b>
					</p>
					<p>
						Please confirm you really want to delete the tag. After clicking ok, the tag will be <strong>deleted permanently</strong>.
					</p>
				</div>

				<div class="submit-wrapper clearfix">
					<a class="button primary warning" href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH) ?>">Delete tag</a>
					<a class="js-dialog-close cancel" href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH) ?>">cancel</a>
				</div>
			</div>
		</div>
	</div>
</body>

</html>