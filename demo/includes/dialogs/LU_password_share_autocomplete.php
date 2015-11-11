<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog edit-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Share<span class="dialog-header-subtitle">Inkscape2</span></h2>
            <a href="../demo/LU_passwords.php" class="dialog-close"><i class="icon close no-text"></i><span>close</span></a>
        </div>
        <div class="js_dialog_content dialog-content"><div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
                <ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
                    <li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
                        <div class="row">
                            <div class="main-cell-wrapper">
                                <div class="main-cell">
                                    <a class="" href="../demo/LU_passwords_edit.php"><span>Edit</span></a>
                                </div>
                            </div>
                        </div>
                    </li><li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
                        <div class="row selected">
                            <div class="main-cell-wrapper">
                                <div class="main-cell">
                                    <a class="selected" href="../demo/LU_passwords_share.php"><span>Share</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="js_tabs_content tabs-content">
                    <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"
                        action="../demo/LU_passwords.php"><div class="form-content">

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

                            <div class="input text required js_form_element_wrapper">
                                <label for="js_field_username">Username</label>
                                <input name="passbolt.model.Resource.username" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_username" placeholder="name" type="text">
                                <div id="js_field_username_feedback" class="message mad_form_feedback js_component mad_view ready">
                                </div>
                            </div>
                            <div class="js_form_element_wrapper js_form_secret_wrapper">
                                <label for="js_field_secret_data_0">Password</label>
                                <div id="js_secret_edit_0" class="js_secret_edit_form passbolt_form_secret_create form mad_view_form ready">
                                    <input value="560a6da4-6814-4fb5-babc-1d48c0a8006f" name="passbolt.model.Secret.id" id="js_field_secret_id_0" class="js_field_secret_id form_field mad_form_textbox form-element mad_view_form_textbox ready" type="hidden">
                                    <input value="cd49eb9e-73a2-3433-a018-6ed993d421e8" name="passbolt.model.Secret.user_id" id="js_field_secret_user_id_0" class="js_field_secret_user_id form_field mad_form_textbox form-element mad_view_form_textbox ready" type="hidden">
                                    <textarea name="passbolt.model.Secret.data" id="js_field_secret_data_0" class="form_field hidden js_field_secret_data mad_form_textbox form-element mad_view_form_textbox ready" data-view-id="371"></textarea>
                                </div>
                                <iframe src="about:blank?passbolt=decryptInline" id="passbolt-iframe-secret-edition" frameborder="0"></iframe></div>
                            <div class="input textarea js_form_element_wrapper">
                                <label for="js_field_description">Description</label>
                                <textarea name="passbolt.model.Resource.description" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="150" id="js_field_description" placeholder="add a description" data-view-id="372">		</textarea>
                                <div id="js_field_description_feedback" class="message mad_form_feedback js_component mad_view ready">
                                </div>
                            </div>
                        </div>
                        <div class="submit-wrapper clearfix">
                            <input class="button primary" value="save" data-view-id="373" type="submit">
                            <a href="#" class="js-dialog-cancel cancel">cancel</a>
                        </div>
                    </form><div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission"><div class="form-content permission-edit">
                            <ul id="js_permissions_list" class="permissions scroll mad_component_tree mad_view_component_tree ready">
                                <li id="44a51f44-6f9f-3c03-af9b-3e80fd50c1f6" class="row direct-permission" data-view-id="382">
                                    <div class="avatar">
                                        <img src="img/avatar/user.png" data-view-id="383">
                                    </div>
                                    <div class="group">
                                        <span class="name">Ada Lovelace</span>
                                        <span class="details"><a href="#">ada@passbolt.com</a></span>
                                    </div>
                                    <div class="select rights">
                                        <form id="js_share_rs_perm_44a51f44-6f9f-3c03-af9b-3e80fd50c1f6" class="js_perm_edit_form" data-view-id="384">
                                            <select id="298a420e-8be2-0ef9-d7a3-a13a2f8c8908" class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_element ready">

                                                <option value="0" data-view-id="386">deny</option>

                                                <option value="1" data-view-id="387">can read</option>

                                                <option value="3" data-view-id="388">can create</option>

                                                <option value="7" data-view-id="389">can update</option>

                                                <option value="15" data-view-id="390">is owner</option>

                                            </select>
                                        </form>
                                    </div>
                                    <div class="actions">

                                        <a href="#" class="js_perm_delete close" title="remove" data-view-id="385">
                                            <i class="icon close no-text"></i>
                                            <span>remove</span>
                                        </a>

                                    </div>
                                </li><li id="1132c9d7-b066-345a-a249-2f9334b99f04" class="row direct-permission" data-view-id="391">
                                    <div class="avatar">
                                        <img src="img/avatar/user.png" data-view-id="392">
                                    </div>
                                    <div class="group">
                                        <span class="name">Betty Holberton</span>
                                        <span class="details"><a href="#">betty@passbolt.com</a></span>
                                    </div>
                                    <div class="select rights">
                                        <form id="js_share_rs_perm_1132c9d7-b066-345a-a249-2f9334b99f04" class="js_perm_edit_form" data-view-id="393">
                                            <select id="51842e43-34d9-ace0-b617-82b6e933ca55" class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_element ready">

                                                <option value="0" data-view-id="395">deny</option>

                                                <option value="1" data-view-id="396">can read</option>

                                                <option value="3" data-view-id="397">can create</option>

                                                <option value="7" data-view-id="398">can update</option>

                                                <option value="15" data-view-id="399">is owner</option>

                                            </select>
                                        </form>
                                    </div>
                                    <div class="actions">

                                        <a href="#" class="js_perm_delete close" title="remove" data-view-id="394">
                                            <i class="icon close no-text"></i>
                                            <span>remove</span>
                                        </a>

                                    </div>
                                </li><li id="e29abaab-bef6-3a2b-ab53-029c30d7da87" class="row direct-permission" data-view-id="400">
                                    <div class="avatar">
                                        <img src="img/avatar/user.png" data-view-id="401">
                                    </div>
                                    <div class="group">
                                        <span class="name">Carol Shaw</span>
                                        <span class="details"><a href="#">carol@passbolt.com</a></span>
                                    </div>
                                    <div class="select rights">
                                        <form id="js_share_rs_perm_e29abaab-bef6-3a2b-ab53-029c30d7da87" class="js_perm_edit_form" data-view-id="402">
                                            <select id="e6614c4d-d722-d8e0-03dd-2e50ff58ddba" class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_element ready">

                                                <option value="0" data-view-id="404">deny</option>

                                                <option value="1" data-view-id="405">can read</option>

                                                <option value="3" data-view-id="406">can create</option>

                                                <option value="7" data-view-id="407">can update</option>

                                                <option value="15" data-view-id="408">is owner</option>

                                            </select>
                                        </form>
                                    </div>
                                    <div class="actions">

                                        <a href="#" class="js_perm_delete close" title="remove" data-view-id="403">
                                            <i class="icon close no-text"></i>
                                            <span>remove</span>
                                        </a>

                                    </div>
                                </li><li id="468f753b-4317-39b8-a49d-79881820ee30" class="row direct-permission" data-view-id="409">
                                    <div class="avatar">
                                        <img src="img/avatar/user.png" data-view-id="410">
                                    </div>
                                    <div class="group">
                                        <span class="name">Edith Clarke</span>
                                        <span class="details"><a href="#">edith@passbolt.com</a></span>
                                    </div>
                                    <div class="select rights">
                                        <form id="js_share_rs_perm_468f753b-4317-39b8-a49d-79881820ee30" class="js_perm_edit_form" data-view-id="411">
                                            <select id="6888c00a-34db-5867-f19b-17a6d279971f" class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_element ready">

                                                <option value="0" data-view-id="413">deny</option>

                                                <option value="1" data-view-id="414">can read</option>

                                                <option value="3" data-view-id="415">can create</option>

                                                <option value="7" data-view-id="416">can update</option>

                                                <option value="15" data-view-id="417">is owner</option>

                                            </select>
                                        </form>
                                    </div>
                                    <div class="actions">

                                        <a href="#" class="js_perm_delete close" title="remove" data-view-id="412">
                                            <i class="icon close no-text"></i>
                                            <span>remove</span>
                                        </a>

                                    </div>
                                </li></ul>
                        </div>
                        <div id="js_permissions_changes" class="warning message hidden">
                            <span>You need to save to apply the changes.</span>
                        </div>
                        <div class="form-content permission-add">
							<iframe src="../demo/LU_iframe_permissioninput.php" id="passbolt-iframe-password-share" frameborder="0"></iframe>
							<iframe src="../demo/LU_iframe_permissioninput_autocomplete.php" id="passbolt-iframe-password-share-autocomplete" frameborder="0"></iframe>
                        </div>
                        <div class="submit-wrapper clearfix">
                            <input id="js_rs_share_save" class="button primary" value="save" data-view-id="375" type="submit">
                            <a href="../demo/LU_passwords.php" class="js-dialog-cancel cancel">cancel</a>
                        </div>
                    </div></div>
            </div></div>
    </div>
</div>