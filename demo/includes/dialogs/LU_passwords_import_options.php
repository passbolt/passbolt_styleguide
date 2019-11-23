<?php require(__DIR__ . '/LU_passwords_import.php'); ?>
<div class="dialog-wrapper" id="kdbx-credentials">
	<div class="dialog kdbx-credentials">
		<div class="dialog-header">
			<h2>Enter the password and/or key file</h2>
			<a href="#" class="dialog-close">
			<?php include('includes/svg-icons/close.php'); ?>	
			<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">
			<form id="js_rs_import">
				<div class="form-content">
					<div class="input-password-wrapper">
						<div class="input password">
							<label>Keepass password</label>
							<input name="passbolt.model.Resource.passphrase" maxlength="50" id="js_field_passphrase" placeholder="password" type="password">
							<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear">
                            <ul class="actions inline">
                                <li>
                                    <a href="#" id="js_secret_view" class="button toggle">
                                        <span class="svg-icon icon-only">
											<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"/></svg>
										</span>
                                        <span class="visuallyhidden">view</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
					<div class="input text">
						<label for="js_field_key_file">Keepass key file (optional)</label>
						<input class="jfilestyle" name="passbolt.model.Resource.uri" id="js_field_key_file" type="file" data-text="Choose a file" data-placeholder="No key file selected">
						<div id="js_field_key_file_feedback" class="message"></div>
					</div>
				</div>
				<div class="submit-wrapper clearfix">
					<input class="button primary" value="Continue import" type="submit">
					<a href="#" class="js-dialog-cancel cancel">Cancel</a>
				</div>
			</form>
		</div>
	</div>
</div>
