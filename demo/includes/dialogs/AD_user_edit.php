<div class="mad_component_dialog edit-profile-dialog dialog-wrapper mad_view_component_dialog ready" id="67f567ec-fe4c-ae9b-6b9d-eae9d13b3656">
    <div class="dialog">
        <div class="dialog-header">
            <h2>
                Edit User
                <span class="dialog-header-subtitle">Ada Lovelace</span>
            </h2>
            <a class="dialog-close" href="demo/AD_users.php">
                <i class="fa fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
                <li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
                    <div class="row">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a class="selected" href="demo/AD_users_edit_user.php"><span>Account</span></a>
                            </div>
                        </div>
                    </div>
                </li>
                <li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
                    <div class="row selected">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a class="" href="demo/AD_users_edit_user_group.php"><span>Groups</span></a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <form id="c5c77b2a-dee0-2362-8e1b-9256e49bc0bd" class="passbolt_form_user_create form mad_view_form ready">
                <div class="form-content">
                    <input name="passbolt.model.User.active" id="js_field_user_active" class="form_field mad_form_textbox form-element mad_view_form_textbox ready" value="" type="hidden">
                    <div class="input text required">
                        <label for="js_field_first_name">First Name</label>
                        <input value="Ada" name="passbolt.model.User.Profile.first_name" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_first_name" placeholder="first name" type="text">
                        <div id="js_field_first_name_feedback" class="message mad_form_feedback js_component mad_view ready">
                        </div>
                    </div>
                    <div class="input text required">
                        <label for="js_field_last_name">Last Name</label>
                        <input value="Lovelace" name="passbolt.model.User.Profile.last_name" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_last_name" placeholder="last name" type="text">
                        <div id="js_field_last_name_feedback" class="message mad_form_feedback js_component mad_view ready"></div>
                    </div>
                    <div class="input text required clearfix">
                        <label for="js_field_username">Username / Email</label>
                        <input name="passbolt.model.User.username" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_username" placeholder="email"  disabled="disabled" data-view-id="319" type="text" value="ada@passbolt.com">
                        <div id="js_field_username_feedback" class="message mad_form_feedback js_component mad_view ready"></div>
                    </div>
                    <div class="input checkbox">
                        <label for="js_field_role_id">Role</label>
                        <div id="js_field_role_id">
                            <input id='js_field_role_id_checkbox' name="passbolt.model.User.role_id" checked="checked" type="checkbox" />
                            <label for="js_field_role_id_checkbox">This user is an administrator</label>
                        </div>
                        <div class="message helptext">
                            Note: Administrators can add and delete users. They can also create groups and assign group managers.
                            Admin can not see all passwords.
                        </div>
                        <div id="js_field_role_id_feedback" class="message"></div>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <a class="button primary" href="demo/AD_users.php">save</a>
                    <a class="js-dialog-cancel cancel" href="demo/AD_users.php">cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>
