<?php
	$groups = [
		['Group' => ['name' => 'HR', 'selected' => false]],
		['Group' => ['name' => 'IT Support', 'selected' => true]],
		['Group' => ['name' => 'Finance', 'selected' => false]],
		['Group' => ['name' => 'Web Team', 'selected' => false]],
		['Group' => ['name' => 'Director\'s Department', 'selected' => false]],
		['Group' => ['name' => 'Facilities','selected' => false]],
		['Group' => ['name' => 'Social Media', 'selected' => false]]
	]
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
					<a href="#more"><span>more</span></a>
				</div>
			</div>
		</li>
<?php foreach($groups as $group): ?>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="<?php echo $group['Group']['name']; ?>'"><span>
								<?php echo $group['Group']['name']; ?>
							</span></a>
					</div>
				</div>
				<div class="right-cell more-ctrl">
					<a href="#more"><span>more</span></a>
				</div>
			</div>
		</li>
<?php endforeach; ?>
	</ul>
</div>
