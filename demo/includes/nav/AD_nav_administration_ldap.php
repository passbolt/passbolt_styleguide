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
		<li class="<?php echo isselected('administration'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/#"><span>Dashboard</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="<?php echo isselected('ldap_configuration'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_ldap_configuration.php"><span>Ldap configuration</span></a>
					</div>
				</div>
			</div>
		</li>
        <li class="<?php echo isselected('configuration'); ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="demo/AD_admin_ldap_reports.php"><span>Ldap reports</span></a>
                    </div>
                </div>
            </div>
        </li>
		<li class="<?php echo isselected('audit_log'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#"><span>Audit logs</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="<?php echo isselected('audit_log'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#"><span>Email notifications</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="<?php echo isselected('acl'); ?>">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#"><span>Access control list</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
