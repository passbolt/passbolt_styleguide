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
				<h2>Edit tag</h2>
				<a class="dialog-close js-dialog-close" href="demo/LU_passwords.php">
					<i class="fa fa-close"></i>
					<span class="visuallyhidden">close</span>
				</a>
			</div>
			<div class="js_dialog_content dialog-content">
				<form action="demo/LU_passwords.php" class="ready" id="js_tag_edit_form">
					<div class="form-content">
						<input value="50d77ffd-cf28-460e-b35e-1b63d7a10fce,50d77ffc-0414-49dd-9959-1b63d7a10fce" name="passbolt.model.Tag.id" 
							class="ready" type="hidden">
						<div class="input text required error">
							<label>Tag name</label>
							<input name="passbolt.model.Tag.name" class="required ready" maxlength="50" placeholder="name" type="text" value="#alpha">

							<div id="js_field_name_feedback" class="message error ready">
								A personal tag cannot be renamed as a shared tag.
							</div>
						</div>

					</div>
					<div class="submit-wrapper clearfix">
						<input class="button primary" value="save" type="submit">
						<a href="demo/LU_passwords.php" class="js-dialog-cancel cancel">cancel</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>

</html>