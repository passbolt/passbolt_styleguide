<div id="a484a5eb-4258-bde9-6b1e-20c6f26204fb"
		 class="mad_controller_component_dialog_controller mad_view_component_dialog dialog-wrapper ready">
	<div class="dialog import">
		<div class="dialog-header">
			<h2>Import passwords</h2>
			<a href="../demo/LU_passwords.php" class="dialog-close">
				<i class="fa fa-close"></i><span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">
			<div class="passbolt_controller_component_resource_actions_tab_controller mad_view_component_tab tabs ready"
					 id="d53f19e2-0c9a-6edb-ff47-4ca7510609af">

				<div class="js_tabs_content tabs-content">
					<form
						action="../demo/LU_passwords.php"
						class="passbolt_controller_form_resource_create_form_controller mad_view_form_form_view tab-content ready selected"
						id="js_rs_import">
						<div class="form-content">
							<div class="input text required">
								<label>Select a csv or kdbx file.</label>
								<input name="passbolt.model.Import.file"
											 class="jfilestyle"
											 id="js_field_name" placeholder="name" type="file"
                                       data-text="Choose a file" data-placeholder="No file selected">

								<div id="js_field_import_feedback"
										 class="message ready">

								</div>
							</div>
							<div class="input text js_form_element_wrapper">
<!--								<label for="js_field_name">Options</label>-->
								<input type="checkbox" name="passbolt.model.Import.category_as_tags"
								       id="js_field_category_as_tags"> <label>Import categories as tags</label>
							</div>

						</div>
						<div class="submit-wrapper clearfix">
							<input class="button primary" value="Import" type="submit" onclick="javascript:window.location.href='../demo/LU_passwords_import_options.php'; return false;">
							<a href="../demo/LU_passwords.php" class="js-dialog-cancel cancel">cancel</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>