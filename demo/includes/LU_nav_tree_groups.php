<?php
	$groups = [
		['Group' => ['name' => 'HR', 'selected' => false, 'editable' => true]],
		['Group' => ['name' => 'IT Support', 'selected' => true, 'editable' => true]],
		['Group' => ['name' => 'Finance', 'selected' => false, 'editable' => true]],
		['Group' => ['name' => 'Web Team', 'selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Director\'s Department', 'selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Facilities','selected' => false, 'editable' => false]],
		['Group' => ['name' => 'Social Media', 'selected' => false, 'editable' => false]]
	];
?>
<div class="navigation flat tree groups">
	<ul>
		<li class="open node root">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3>All Groups</h3>
					</div>
				</div>
				<div class="right-cell more-ctrl">
					<a href="#"><span>more</span></a>
				</div>
			</div>
		</li>
<?php foreach($groups as $group): ?>
		<li class="open node root">
			<div class="row <?php if($group['Group']['selected']) echo 'selected'; ?>">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="<?php echo $group['Group']['name']; ?>'"><span>
								<?php echo $group['Group']['name']; ?>
							</span></a>
					</div>
				</div>
				<div class="right-cell more-ctrl">
<?php if($group['Group']['editable']) : ?>
					<a href="#"><span>more</span></a>
<?php endif; ?>
				</div>
			</div>
		</li>
<?php endforeach; ?>
	</ul>
</div>
