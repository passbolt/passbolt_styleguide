<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog share-folder-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
      <div class="dialog-header">
          <h2>
            <span>Share 2 folders</span>
            <div class="more_details tooltip-alt">
                <i class="fa fa-info-circle"></i>
                <div class="tooltip-text right">
                    Plants, books
                </div>
            </div>
          </h2>
          <a href="demo/legacy/LU_passwords_folders.php" class="dialog-close" role="button">
          <?php include('../includes/svg-icons/close.php'); ?>
          <span class="visuallyhidden">close</span></a>
      </div>
      <div class="js_dialog_content dialog-content">
          <div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
            <div class="js_tabs_content tabs-content">
                <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
                <div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
                <?php include('../includes/dialogs/share/LU_permissions_list_share_folder.php'); ?>
                <div id="js-share-feedbacks" class="feedbacks message warning">You need to save to apply the changes.</div>
                <div class="form-content permission-add">
                    <div class="input text autocomplete">
                        <label for="js_perm_create_form_aro_auto_cplt">Share with people or groups</label>
                        <input maxlength="50" id="js_perm_create_form_aro_auto_cplt" placeholder="Start typing a name or email" autocomplete="off" type="text">
                    </div>
                    <div class="autocomplete-wrapper">
                        <div class="autocomplete-content scroll">
                            <ul>
                                <li id="1c137bd7-2838-3c3d-a021-d2986d9126f5">
                                    <div class="row">
                                        <div class="main-cell-wrapper">
                                            <div class="main-cell">
                                                <a href="#">
                                                    <div class="avatar">
                                                        <img src="src/img/avatar/user.png"/>
                                                    </div>
                                                    <div class="user">
                                                        <span class="name">Frances Allen (57DE7D79)</span>
                                                        <span class="details" title="frances@passbolt.com">frances@passbolt.com</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li id="201b442c-d6ca-3ee6-a443-ce669ca0ec6e">
                                    <div class="row">
                                        <div class="main-cell-wrapper">
                                            <div class="main-cell">
                                                <a href="#">
                                                    <div class="avatar">
                                                        <img src="src/img//avatar/user.png"/>
                                                    </div>
                                                    <div class="user">
                                                        <span class="name">Kathleen Antonelli (12345678)</span>
                                                        <span class="details" title="kathleen@passbolt.com">kathleen@passbolt.com</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li id="7c7afd29-1b98-3c3e-ae55-adedc333fb4b">
                                    <div class="row">
                                        <div class="main-cell-wrapper">
                                            <div class="main-cell">
                                                <a href="#">
                                                    <div class="avatar">
                                                        <img src="src/img//avatar/group_default.png"/>
                                                    </div>
                                                    <div class="user">
                                                        <span class="name">IT Support</span>
                                                        <span class="details" title="5 members">5 Members</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li id="c996e4e9-e4c9-310a-a263-178b45b61b3c">
                                    <div class="row">
                                        <div class="main-cell-wrapper">
                                            <div class="main-cell">
                                                <a href="#">
                                                    <div class="avatar">
                                                        <img src="src/img//avatar/user.png"/>
                                                    </div>
                                                    <div class="user">
                                                        <span class="name">Edith Clarke (12345678)</span>
                                                        <span class="details" title="edith@passbolt.com">edith@passbolt.com</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li id="abfd50cb-ff86-36c4-a8c8-af176b201123">
                                    <div class="row">
                                        <div class="main-cell-wrapper">
                                            <div class="main-cell">
                                                <a href="#">
                                                    <div class="avatar">
                                                        <img src="src/img//avatar/user.png"/>
                                                    </div>
                                                    <div class="user">
                                                        <span class="name">Irène Greif (87654321)</span>
                                                        <span class="details" title="irene@passbolt.com">irene@passbolt.com</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <?php include('../includes/dialogs/share/LU_permission_dialog_buttons.php'); ?>
                </div>
            </div>
          </div>
        </div>
    </div>
</div>