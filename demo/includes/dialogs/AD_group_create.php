<div class="mad_component_dialog edit-group-dialog dialog-wrapper mad_view_component_dialog ready" id="67f567ec-fe4c-ae9b-6b9d-eae9d13b3656">
    <div class="dialog">
        <div class="dialog-header">
            <h2>
                Create group
            </h2>
            <a class="dialog-close" href="../demo/AD_users.php">
                <i class="fa fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content share-tab">
            <form id="c5c77b2a-dee0-2362-8e1b-9256e49bc0bd" class="passbolt_form_user_create form mad_view_form ready"></form>
            <div class="form-content">
                <input name="passbolt.model.User.active" id="js_field_user_active" class="form_field mad_form_textbox form-element mad_view_form_textbox ready" value="" type="hidden">
                <div class="input text required clearfix">
                    <label for="js_field_group_name">Group Name</label>
                    <input name="passbolt.model.Group.name" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_group_name" placeholder="group name" type="text">
                    <div id="js_field_group_name_feedback" class="message mad_form_feedback js_component mad_view ready">
                    </div>
                </div>
                <div class="input required">
                    <label for="js_field_group_permission">Group members</label>
                </div>
            </div>
            <?php include('includes/dialogs/share/AD_permissions_list_create_group.php'); ?>
            <?php include('includes/dialogs/share/AD_permission_add_group_people.php'); ?>
            <div class="submit-wrapper clearfix">
                <a class="button primary" href="../demo/AD_users.php">save</a>
                <a class="js-dialog-cancel cancel" href="../demo/AD_users.php">cancel</a>
            </div>
        </div>
    </div>
</div>
