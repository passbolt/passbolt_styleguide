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
				<a class="dialog-close js-dialog-close" href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH) ?>">
				<span class="fa icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
					<span class="visuallyhidden">close</span>
				</a>
			</div>
			<div class="js_dialog_content dialog-content">
				<form action="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH) ?>" class="ready" id="js_tag_edit_form">
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
						<input class="button primary" value="Save" type="submit">
						<a href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH) ?>" class="js-dialog-cancel cancel">Cancel</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>

</html>