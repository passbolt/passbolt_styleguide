<?php
	if(!isset($_GET['shortcuts'])) {
		$_GET['shortcuts'] = 'profile';
	}
	function isselected($i) {
		if ($i == $_GET['shortcuts'])
			return 'selected';
	}
?>
<div class="navigation first">
	<ul class="clearfix passbolt_controller_component_preference_menu_controller mad_view_component_tree menu ready"
			id="js_wk_preference_menu">
		<li class="<?php echo isselected('profile'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/LU_users_profile.php"><span>Profile</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="<?php echo isselected('loginhistory'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/LU_users_profile_loginhistory.php"><span>Login history</span></a>
					</div>
				</div>
			</div>
		</li>
        <li class="<?php echo isselected('themes'); ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="demo/LU_users_profile_themes.php"><span>Theme</span></a>
                    </div>
                </div>
            </div>
        </li>

        <li class="<?php echo isselected('mfa'); ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="demo/LU_users_profile_mfa.php"><span>Authentication</span></a>
                    </div>
                </div>
            </div>
        </li>
		<li class="<?php echo isselected('notifications'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/LU_users_profile_notifications.php"><span>Email notifications</span></a>
					</div>
				</div>
			</div>
		</li>

        <!--
        <li class="<?php echo isselected('keyinspector'); ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="demo/LU_users_profile_keyinspector.php"><span>Keys inspector</span></a>
                    </div>
                </div>
            </div>
        </li>
        <li class="<?php echo isselected('identities'); ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="demo/LU_users_profile_keyinspector_identities.php"><span>Identities</span></a>
                    </div>
                </div>
            </div>
        </li>
        <li class="<?php echo isselected('subkeys'); ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="demo/LU_users_profile_keyinspector_subkeys.php"><span>Subkeys</span></a>
                    </div>
                </div>
            </div>
        </li>-->
	</ul>
</div>
