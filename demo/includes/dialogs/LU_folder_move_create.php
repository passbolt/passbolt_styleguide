<div class="create-folder-dialog mad_controller_component_dialog_controller mad_view_component_dialog dialog-wrapper ready">
	<div class="dialog">
		<div class="dialog-header">
			<h2>Create a folder</h2>
			<a href="demo/LU_passwords_folders.php" class="dialog-close">
					<span class="svg-icon">
            <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
          </span>
				<span class="visuallyhidden">Close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">
			<div class="passbolt_controller_component_resource_actions_tab_controller mad_view_component_tab tabs ready" id="d53f19e2-0c9a-6edb-ff47-4ca7510609af">
				<ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
					<li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
						<div class="row">
							<div class="main-cell-wrapper">
								<div class="main-cell">
									<a class="selected" href="demo/LU_folders_create.php"><span>Create</span></a>
								</div>
							</div>
						</div>
					</li><li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
						<div class="row selected">
							<div class="main-cell-wrapper">
								<div class="main-cell">
									<a class="" href="demo/LU_folders_create_share.php"><span>Share</span></a>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="js_tabs_content tabs-content">
                <form id="js_folder_create_form" class="create-form passbolt_form_folder_create folder_create_form form mad_view_form ready">
                    <div class="form-content">
                        <div class="input text required clearfix js_form_element_wrapper">
                            <label for="js_field_name">Folder Name</label>
                            <input name="passbolt.model.Folder.name" class="required mad_form_textbox form-element mad_view_form_textbox ready" maxlength="50" id="js_field_name" placeholder="folder name" type="text" value="Untitled folder">
                            <div id="js_field_name_feedback" class="message mad_form_feedback js_component mad_view ready">
                            </div>
                        </div>
                    </div>
                </form>
                <div class="form-content parent-folder">
                    <label for="js_field_name">Parent folder</label>
                    <div id="js_wsp_password_breadcrumb" class="breadcrumbs folders passbolt.component.WorkspaceBreadcrumb mad.View js_component ready">
                        <ul class="mad.component.Menu mad.view.component.Tree menu ready">
                            <li>
                                <div class="main-cell">
                                    <a><span>Folders</span></a>
                                </div>
                            </li>
                            <li id="94650325-f2d2-48d3-9bba-ac9890eae9dd" class="">
                                <div class="main-cell">
                                    <a>
                                        <span class="svg-icon folder">
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                                        </span>
                                        <span>Plants</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
            </div>
            <div class="folder-change">
                <ul>
                    <li>
                        <div class="main-cell">
                            <a class="disabled">
                                <span class="svg-icon icon-only">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
                                </span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
          </div>      
          <div class="submit-wrapper clearfix">
              <a class="button primary" href="demo/LU_folders_move.php">Create</a>
              <a class="js-dialog-cancel cancel" href="demo/LU_folders_move.php">Cancel</a>
          </div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>