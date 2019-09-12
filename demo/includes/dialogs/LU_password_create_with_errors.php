<div id="501a1f88-2696-7a89-5739-4b650e8ea625" class="mad_component_dialog create-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Create a password</h2>
            <a href="#" class="dialog-close">
            <span class="svg-icon">
                <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
            </span>
                <span class="visuallyhidden">Close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <form class="passbolt_form_resource_create form mad_view_form ready" id="c13e9f36-641a-5c50-89da-6d1788ceab69">
                <div class="form-content">

                    <input value="" name="passbolt.model.Resource.Category.id" id="js_field_category_id" class="form_field mad_form_textbox form-element mad_view_form_textbox ready" type="hidden">

                    <div class="input text required js_form_element_wrapper error">
                        <label class="error" for="js_field_name">Resource</label>
                        <input name="passbolt.model.Resource.name" class="required mad_form_textbox form-element mad_view_form_textbox error" maxlength="50" id="js_field_name" placeholder="resource name" type="text">
                        <div id="js_field_name_feedback" class="message mad_form_feedback js_component mad_view error">This information is required</div>
                    </div>

                    <div class="input text js_form_element_wrapper">
                        <label for="js_field_uri">URI</label>
                        <input class="mad_form_textbox form-element mad_view_form_textbox success" name="passbolt.model.Resource.uri" maxlength="50" id="js_field_uri" placeholder="https://example.com/login" type="text">
                        <div id="js_field_uri_feedback" class="message mad_form_feedback js_component mad_view success"></div>
                    </div>

                    <div class="input text js_form_element_wrapper">
                        <label for="js_field_username">Username</label>
                        <input name="passbolt.model.Resource.username" class="mad_form_textbox form-element mad_view_form_textbox" maxlength="50" id="js_field_username" placeholder="username" type="text">
                    </div>
                    <div class="input text required js_form_element_wrapper js_form_secret_wrapper error">
                        <label for="js_field_secret_data_0">Password</label>
                        <iframe src="demo/LU_iframe_passwordinput_error.php" id="passbolt-iframe-secret-edition" frameborder="0"></iframe>
                        <div id="js_secret_edit_0" class="js_secret_edit_form">
                            <input name="passbolt.model.Secret.id" id="js_field_secret_id_0" class="js_field_secret_id form_field" type="hidden">
                            <input name="passbolt.model.Secret.user_id" id="js_field_secret_user_id_0" class="js_field_secret_user_id form_field" type="hidden">
                            <textarea name="passbolt.model.Secret.data" id="js_field_secret_data_0" class="form_field hidden js_field_secret_data" data-view-id="363"></textarea>
                        </div>
                    </div>
                    <div class="input textarea js_form_element_wrapper">
                        <label for="js_field_description">Description</label>
                        <textarea name="passbolt.model.Resource.description" class="required mad_form_textbox form-element mad_view_form_textbox success" maxlength="150" id="js_field_description" placeholder="add a description" data-view-id="364">		</textarea>
                        <div id="js_field_description_feedback" class="message mad_form_feedback js_component mad_view success"></div>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <input class="button primary" value="Save" data-view-id="365" type="submit">
                    <a href="#" class="js-dialog-cancel cancel">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>