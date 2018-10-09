<div id="501a1f88-2696-7a89-5739-4b650e8ea625" class="mad_component_dialog create-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Create Password</h2>
            <a href="demo/LU_passwords.php" class="dialog-close">
                <i class="fa fa-fw fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <form action='demo/LU_passwords.php' class="passbolt_form_resource_create form mad_view_form ready" id="3997083d-e933-b5b6-9de3-58727f931817">
                <div class="form-content">

                    <input value="" name="passbolt.model.Resource.Category.id" id="js_field_category_id" class="form_field mad_form_textbox form-element mad_view_form_textbox ready" type="hidden">

                    <div class="input text required js_form_element_wrapper">
                        <label for="js_field_name">Name</label>
                        <input name="passbolt.model.Resource.name" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_name" placeholder="name" type="text">
                        <div id="js_field_name_feedback" class="message mad_form_feedback js_component mad_view ready">
                        </div>
                    </div>

                    <div class="input text js_form_element_wrapper">
                        <label for="js_field_uri">URI</label>
                        <input class="mad_form_textbox form-element mad_view_form_textbox ready" name="passbolt.model.Resource.uri" maxlength="50" id="js_field_uri" placeholder="https://example.com/login" type="text">
                        <div id="js_field_uri_feedback" class="message mad_form_feedback js_component mad_view ready">
                        </div>
                    </div>

                    <div class="input text js_form_element_wrapper">
                        <label for="js_field_username">Username</label>
                        <input name="passbolt.model.Resource.username" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_username" placeholder="name" type="text">
                        <div id="js_field_username_feedback" class="message mad_form_feedback js_component mad_view ready">
                        </div>
                    </div>
                    <div class="required js_form_element_wrapper js_form_secret_wrapper">
                        <label for="js_field_secret_data_0">Password</label>
                        <div id="js_secret_edit_0" class="js_secret_edit_form">
                            <input name="passbolt.model.Secret.id" id="js_field_secret_id_0" class="js_field_secret_id form_field" type="hidden">
                            <input name="passbolt.model.Secret.user_id" id="js_field_secret_user_id_0" class="js_field_secret_user_id form_field" type="hidden">
                            <textarea name="passbolt.model.Secret.data" id="js_field_secret_data_0" class="form_field hidden js_field_secret_data" data-view-id="421"></textarea>
                        </div>

                        <iframe src="demo/LU_iframe_passwordinput.php" id="passbolt-iframe-secret-edition" frameborder="0"></iframe>

                    </div>
                    <div class="input textarea js_form_element_wrapper">
                        <label for="js_field_description">Description</label>
                        <textarea name="passbolt.model.Resource.description" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="150" id="js_field_description" placeholder="add a description" data-view-id="422">		</textarea>
                        <div id="js_field_description_feedback" class="message mad_form_feedback js_component mad_view ready">
                        </div>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <input class="button primary" value="save" data-view-id="423" type="submit">
                    <a href="demo/LU_passwords.php" class="js-dialog-cancel cancel">cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>