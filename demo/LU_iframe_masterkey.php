<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_iframe.php'); ?>
    <?php include('includes/meta/LU_security_token_style.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog master-password">
		<div class="dialog-header">
			<h2>Passphrase</h2>
			<a class="dialog-close js-dialog-close" href="#">
			<span class="fa icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
				<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">

			<div class="form-content master-passphrase">

				<div class="input text required">
					<label for="js_master_password">Enter your passphrase to continue.</label>
                    <!-- The field below is invisible and used to receive the first focus after the iframe is loaded -->
                    <!-- This way we can control and treat the events received next -->
                    <input type="text" id="js_master_password_focus_first" class="focus_first">
					<input type="password" autofocus placeholder="passphrase" id="js_master_password" maxlength="50">
					<div class="security-token">CKR</div>
				</div>

				<div class="input checkbox">
					<input type="checkbox" id="js_remember_master_password">
					<label for="js_remember_master_password">Remember it for </label>
				</div>
				<div class="input select">
					<select id="js_remember_master_password_duration">
						<option value="900">15 minutes</option>
						<option value="1800">30 minutes</option>
						<option value="3600">1 hour</option>
						<option value="-1">until I log out</option>
					</select>
				</div>

			</div>

			<div class="form-content wrong-passphrase">
				The operation has been aborted.
			</div>

			<div class="submit-wrapper clearfix">
				<a class="button primary" id="master-password-submit">OK</a>
				<a class="js-dialog-close cancel" href="#">Cancel</a>
			</div>
		</div>
	</div>
</div>
<script type="application/javascript">
    // DEMO ONLY -- not for production use
    $(function() {
		$( document ).ready(function() {
			$('.form-content.wrong-passphrase').css('display', 'none');
			$( "#js_master_password" ).focus();
			var count = 0;
			$('#master-password-submit').click(function(event){
				$( "#js_master_password" ).focus();
				count++;
				$('label[for="js_master_password"]').text('Please enter a valid passphrase');
				if (count === 3) {
					// $('#master-password-submit').text("Cancel");
					$('.js-dialog-close.cancel').css('display', 'none');
					$('.form-content.master-passphrase').css('display', 'none');
					$('.form-content.wrong-passphrase').css('display', 'block');
					$('.dialog-header').find('h2').text('Wrong Passphrase!');
				}
			});
		});
	});
</script>
</body>
</html>
