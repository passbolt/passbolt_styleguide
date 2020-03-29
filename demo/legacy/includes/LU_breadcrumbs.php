<?php
	if(!isset($_GET['breadcrumbs'])) return;
?>
<div class="breadcrumbs passbolt_controller_component_preference_breadcrumb_controller mad_view_view js_component ready"
		 id="js_wsp_preference_breadcrumb">
	<ul class="mad_controller_component_menu_controller mad_view_component_tree menu ready">
<?php foreach($_GET['breadcrumbs'] as $name => $link) : ?>
		<li>
			<div class="main-cell">
				<a href="<?php echo $link; ?>"><span><?php echo $name; ?></span></a>
			</div>
		</li>
<?php endforeach; ?>
	</ul>
</div>