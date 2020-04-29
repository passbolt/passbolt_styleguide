<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_legacy.php'); ?>
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
		<input name="passbolt.model.User.password" type="password" id="js_field_password" placeholder="decrypting..." value="<?php echo isset($_GET['password']) ? $_GET['password'] : ''; ?>" class="<?php echo isset($_GET['js_field_password_class']) ? $_GET['js_field_password_class'] : ''; ?>">
		<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear">
		<div class="security-token">CKR</div>
	</div>
	<ul class="actions inline">
		<li>
			<a id="js_secret_view" class="button toggle" role="button">
				<span class="svg-icon icon-only">
					<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"/></svg>
				</span>
				<span class="visuallyhidden">view</span>
			</a>
		</li>
		<li>
			<a id="js_secret_generate" class="button" role="button">
				<span class="svg-icon icon-only">
					<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1254 581l293-293-107-107-293 293zm447-293q0 27-18 45l-1286 1286q-18 18-45 18t-45-18l-198-198q-18-18-18-45t18-45l1286-1286q18-18 45-18t45 18l198 198q18 18 18 45zm-1351-190l98 30-98 30-30 98-30-98-98-30 98-30 30-98zm350 162l196 60-196 60-60 196-60-196-196-60 196-60 60-196zm930 478l98 30-98 30-30 98-30-98-98-30 98-30 30-98zm-640-640l98 30-98 30-30 98-30-98-98-30 98-30 30-98z"/></svg>
				</span>
				<span class="visuallyhidden">generate</span>
			</a>
		</li>
	</ul>

	<div id="js_user_pwd_strength" class="password-complexity <?php echo isset($_GET['complexity']) ? $_GET['complexity'] : 'fair'; ?>">
		<span class="progress"><span class="progress-bar <?php echo isset($_GET['complexity']) ? $_GET['complexity'] : 'fair'; ?>"></span></span>
		<span class="complexity-text">complexity: <strong>mediocre</strong></span>
    <?php
    $complexityText = isset($_GET['complexity']) ? $_GET['complexity'] : 'fair';
    if ($complexityText == 'not_available') {
      $complexityText = '--';
    }
    ?>
	</div>

    <div class="input text">
        <div id="js_field_password_feedback" class="message error">This information is required </div>
    </div>
</div>
</div>
<script type="application/javascript">
	resizeIframe('#passbolt-iframe-secret-edition', {
		width: '100%'
	});
	$('#js_secret_view').click(function() {
        $('#js_field_password').toggleClass('hidden');
        $('#js_field_password_clear').toggleClass('hidden');
    });
</script>
</body>
</html>
