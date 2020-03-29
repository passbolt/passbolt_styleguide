<?php
	$groups = [
		['Group' => ['name' => 'HR', 'selected' => false, 'editable' => true]],
		['Group' => ['name' => 'IT Support', 'selected' => true, 'editable' => false]],
		['Group' => ['name' => 'Finance', 'selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Web Team', 'selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Director\'s Department', 'selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Facilities','selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Social Media', 'selected' => false, 'editable' => false]]
	];
?>

<div id="js_wsp_users_groups" class="navigation groups passbolt_component_groups js_component mad_view ready">
	<ul id="js_wsp_users_groups_menu">
		<li class="open node root group-header">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3>Groups I am a member of</h3>
					</div>
				</div>
				<div class="right-cell more-ctrl">
					<a href="#" class="filter"><span>more</span></a>
				</div>
			</div>
		</li>
	</ul>

	<ul id="js_wsp_users_groups_list" class="passbolt_component_groups_list tree mad_view_component_tree ready">
<?php foreach($groups as $group): ?>
		<li class="open node root group-item">
			<div class="row <?php if($group['Group']['selected']) echo 'selected'; ?>">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="<?php echo $group['Group']['name']; ?>'"><span>
								<?php echo $group['Group']['name']; ?>
							</span></a>
					</div>
				</div>
				<div class="right-cell more-ctrl" style="float:right;">
<?php if($group['Group']['editable']) : ?>
					<a href="#"><span>more</span></a>
<?php endif; ?>
				</div>
			</div>
		</li>
<?php endforeach; ?>
	</ul>
</div>
