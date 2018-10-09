<div id="a484a5eb-4258-bde9-6b1e-20c6f26204fb"
		 class="mad_controller_component_dialog_controller mad_view_component_dialog dialog-wrapper ready">
	<div class="dialog">
		<div class="dialog-header">
			<h2>Edit<span class="dialog-header-subtitle">shared resource</span></h2>
			<a href="demo/LU_passwords.php" class="dialog-close">
				<i class="fa fa-close"></i><span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">
			<div class="passbolt_controller_component_resource_actions_tab_controller mad_view_component_tab tabs ready"
					 id="d53f19e2-0c9a-6edb-ff47-4ca7510609af">
				<ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
					<li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
						<div class="row">
							<div class="main-cell-wrapper">
								<div class="main-cell">
									<a class="selected" href="demo/LU_passwords_edit.php"><span>Edit</span></a>
								</div>
							</div>
						</div>
					</li><li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
						<div class="row selected">
							<div class="main-cell-wrapper">
								<div class="main-cell">
									<a class="" href="demo/LU_passwords_share.php"><span>Share</span></a>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="js_tabs_content tabs-content">
					<form
						action="demo/LU_passwords.php"
						class="passbolt_controller_form_resource_create_form_controller mad_view_form_form_view tab-content ready selected"
						id="js_rs_edit">
						<div class="form-content">

							<input value="50d77ffd-cf28-460e-b35e-1b63d7a10fce,50d77ffc-0414-49dd-9959-1b63d7a10fce"
										 name="passbolt.model.Resource.Category.id" id="js_field_category_id"
										 class="form_field mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
										 type="hidden">

							<div class="input text required error js_form_element_wrapper">
								<label for="js_field_name">Name</label>
								<input name="passbolt.model.Resource.name"
											 class="required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
											 maxlength="50" id="js_field_name" placeholder="name" type="text">

								<div id="js_field_name_feedback"
										 class="message mad_form_feedback_controller error mad_view_view js_component ready">
									This is a very very long error messages to test line breaking, just a little bit more
								</div>
							</div>

							<div class="input text js_form_element_wrapper">
								<label for="js_field_uri">URL</label>
								<input
									class="mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
									name="passbolt.model.Resource.uri" maxlength="50" id="js_field_uri"
									placeholder="https://example.com/login" type="text">

								<div id="js_field_uri_feedback"
										 class="message mad_form_feedback_controller mad_view_view js_component ready">
								</div>
							</div>

							<div class="input text js_form_element_wrapper">
								<label for="js_field_username">Username</label>
								<input name="passbolt.model.Resource.username"
											 class="mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
											 maxlength="50" id="js_field_username" placeholder="name" type="text">

								<div id="js_field_username_feedback"
										 class="message mad_form_feedback_controller mad_view_view js_component ready">
								</div>
							</div>
							<div class="required js_form_element_wrapper js_form_secret_wrapper">
								<label for="js_field_secret">Password</label>

								<div id="js_secret_edit_0"
										 class="js_secret_edit_form passbolt_controller_form_secret_create_form_controller mad_view_form_form_view js_component ready">
									<input value="5534f61b-2ea8-4119-bd1e-1234dbeb2d5e" name="passbolt.model.Secret.id"
												 id="js_field_secret_id_0"
												 class="js_field_secret_id form_field mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
												 type="hidden">
									<input value="50cdea9c-a34c-406f-a9f1-2f4fd7a10fce" name="passbolt.model.Secret.user_id"
												 id="js_field_secret_user_id_0"
												 class="js_field_secret_user_id form_field mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
												 type="hidden">
											<textarea name="passbolt.model.Secret.data" id="js_field_secret_data_0"
																class="form_field hidden js_field_secret_data mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"></textarea>
								</div>
								<iframe src="demo/LU_iframe_passwordinput.php?complexity=<?php echo isset($password_complexity) ? $password_complexity : 'fair' ?><?php echo isset($password) ? "&password=$password" : '' ?><?php echo isset($js_field_password_class) ? "&js_field_password_class=$js_field_password_class" : '' ?>" id="passbolt-iframe-secret-edition"
												frameborder="0"></iframe>
							</div>
							<div class="input textarea js_form_element_wrapper">
								<label for="js_field_description">Description</label>
										<textarea name="passbolt.model.Resource.description"
															class="required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
															maxlength="150" id="js_field_description" placeholder="add a description"></textarea>

								<div id="js_field_description_feedback"
										 class="message mad_form_feedback_controller mad_view_view js_component ready">
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
	</div>
</div>