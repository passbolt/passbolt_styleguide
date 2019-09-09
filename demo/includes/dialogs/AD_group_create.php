<div class="mad_component_dialog edit-group-dialog dialog-wrapper mad_view_component_dialog ready" id="67f567ec-fe4c-ae9b-6b9d-eae9d13b3656">
    <div class="dialog">
        <div class="dialog-header">
            <h2>
                Create a group
            </h2>
            <a class="dialog-close" href="demo/AD_users.php">
            <span class="fa icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div id="56ccb992-111e-7e68-c988-09cf96c793fe" class="passbolt_component_group_edit share-tab edit-group-dialog passbolt_view_component_group_edit ready">
                <form id="js_group_edit_form" class="passbolt_form_group_create group_edit_form form mad_view_form ready">
                    <div class="form-content">
                        <div class="input text required clearfix js_form_element_wrapper">
                            <label for="js_field_name">Group Name</label>
                            <input name="passbolt.model.Group.name" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_name" placeholder="group name" type="text">
                            <div id="js_field_name_feedback" class="message mad_form_feedback js_component mad_view ready">
                            </div>
                        </div>
                    </div>
                </form>

                <?php include('includes/dialogs/share/AD_permissions_list_create_group.php'); ?>
                <?php include('includes/dialogs/share/AD_permission_add_group_people.php'); ?>
                <div class="submit-wrapper clearfix">
                    <a class="button primary" href="demo/AD_users.php">Save</a>
                    <a class="js-dialog-cancel cancel" href="demo/AD_users.php">Cancel</a>
                </div>
            </div>
        </div>
    </div>
</div>
