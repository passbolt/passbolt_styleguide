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
		<li>
			<div class="row <?php echo isselected('mfa'); ?>">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_mfa_configuration.php"><span>Multi Factor Authentication</span></a>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="row <?php echo isselected('ldap_configuration'); ?>">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_ldap_configuration.php"><span>User directory</span></a>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="row <?php echo isselected('email_notifications'); ?>">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_email_notifications.php"><span>Email notifications</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
