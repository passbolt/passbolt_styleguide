<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog edit-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
		<?php include('includes/dialogs/share/LU_share_dialog_header.php'); ?>
        <div class="js_dialog_content dialog-content">
			<div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
				<?php include('includes/dialogs/navigation/LU_password_share_tabs.php'); ?>
				<div class="js_tabs_content tabs-content">
                    <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
					<div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
						<?php $_GET['Users'] = [
							[
								'User' => [
									'first_name' => 'Frances',
									'last_name' => 'Allen',
									'email' => 'frances@passbolt.com',
									'avatar' => 'img/avatar/user.png',
									'fingerprint' => '3337 88B5 464B 797F DF10  A98F 2FE9 6B47 C7FF 421D'
								],
								'Permission' => [
									'id' => '002925da-8b35-31ef-ac1e-3f615c2a8f7d',
									'name' => 'owner',
									'change' => 'permission will change',
									'updated' => true
								]
							],
							[
								'User' => [
									'first_name' => 'HR',
									'last_name' => '',
									'email' => '3 members',
									'avatar' => 'img/avatar/group_default.png',
									'fingerprint' => 'Ada Lovelace, Betty Holberton, Grace Hopper'
								],
								'Permission' => [
									'id' => '002925da-8b35-31ef-ac1e-3f615c2a8f7d',
									'name' => 'read',
									'change' => 'will be added',
									'updated' => true
								]
							]
						]; ?>
						<?php include('includes/dialogs/share/LU_permissions_list.php'); ?>
						<?php include('includes/dialogs/share/LU_permission_warning.php'); ?>
						<?php include('includes/dialogs/share/LU_permission_add.php'); ?>
						<?php include('includes/dialogs/share/LU_permission_dialog_buttons.php'); ?>
					</div>
				</div>
            </div>
		</div>
    </div>
</div>

