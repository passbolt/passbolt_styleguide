<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_iframe.php'); ?>
	<style>
		#js_field_password:focus,
		#js_field_password ~ .security-token {
			background:#ffbbbb;
			color:#000;
		}
		#js_field_password:focus ~ .security-token {
			background:#000;
			color:#ffbbbb;
		}
	</style>
</head>
<body class="iframe">
<div class="form-content">
<div class="input-password-wrapper">
	<div class="input password required">
		<label for="js_field_password" class="hidden">New passphrase</label>
		<input name="passbolt.model.User.password" type="password" id="js_field_password" placeholder="decrypting..." value="<?php echo isset($_GET['password']) ? $_GET['password'] : ''; ?>" class="error <?php echo isset($_GET['js_field_password_class']) ? $_GET['js_field_password_class'] : ''; ?>">
		<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear">
		<div class="security-token">CKR</div>
	</div>
	<ul class="actions inline">
		<li>
			<a href="#" id="js_secret_view" class="button toggle">
				<i class="fa fa-eye fa-fw fa-lg"></i>
				<span class="visuallyhidden">view</span>
			</a>
		</li>
		<li>
			<a href="#" id="js_secret_generate" class="button">
				<i class="fa fa-magic fa-fw fa-lg"></i>
				<span class="visuallyhidden">generate</span>
			</a>
		</li>
	</ul>

	<div id="js_user_pwd_strength" class="password-complexity <?php echo isset($_GET['complexity']) ? $_GET['complexity'] : 'fair'; ?>">
		<span class="progress"><span class="progress-bar <?php echo isset($_GET['complexity']) ? $_GET['complexity'] : 'fair'; ?>"></span></span>
    <?php
    $complexityText = isset($_GET['complexity']) ? $_GET['complexity'] : 'fair';
    if ($complexityText == 'not_available') {
      $complexityText = '--';
    }
    ?>
		<span class="complexity-text">complexity: <strong><?php echo $complexityText; ?></strong></span>
	</div>
	<div class="input text">
		<div id="js_field_secret_feedback" class="message error">This information is required</div>
	</div>
</div>
</div>
<script type="application/javascript">
	resizeIframe('#passbolt-iframe-secret-edition', {
		width: '100%'
	});
</script>
</body>
</html>
