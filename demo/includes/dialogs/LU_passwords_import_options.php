<div id="a484a5eb-4258-bde9-6b1e-20c6f26204fb"
		 class="mad_controller_component_dialog_controller mad_view_component_dialog dialog-wrapper ready">
	<div class="dialog import">
		<div class="dialog-header">
			<h2>Enter the password and/or key file</h2>
			<a href="../demo/LU_passwords.php" class="dialog-close">
				<i class="fa fa-close"></i><span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">

			<form
				action="../demo/LU_passwords.php"
				class="passbolt_controller_form_resource_create_form_controller mad_view_form_form_view tab-content ready selected"
				id="js_rs_import">
				<div class="form-content">

					<div class="input-password-wrapper">
						<div class="input password js_form_element_wrapper">
							<label>Keepass password</label>
							<input name="passbolt.model.Resource.passphrase"
							       maxlength="50" id="js_field_passphrase" placeholder="password" type="password">
							<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear" style="display: none;">
						</div>
						<ul class="actions inline">
							<li>
								<a href="#" id="js_secret_view" class="button toggle">
									<i class="fa fa-eye fa-fw fa-lg"></i>
									<span class="visuallyhidden">view</span>
								</a>
							</li>
						</ul>
					</div>

					<div class="input text js_form_element_wrapper">
						<label for="js_field_key_file">Keepass key file (optional)</label>
						<input
							class="mad_form_element_file_controller mad_view_form_element_textbox_view jfilestyle js_component ready"
							name="passbolt.model.Resource.uri" id="js_field_key_file" type="file"
							data-text="Choose a file" data-placeholder="No key file selected">

						<div id="js_field_key_file_feedback"
								 class="message mad_form_feedback_controller mad_view_view js_component ready">
						</div>
					</div>

				</div>
				<div class="submit-wrapper clearfix">
					<input class="button primary" value="Continue import" type="submit" onclick="javascript:window.location.href='../../LU_passwords_import_result_error.php'; return false;">
					<a href="../demo/LU_passwords.php" class="js-dialog-cancel cancel">cancel</a>
				</div>
			</form>
		</div>
	</div>
</div>