<?php
	$sections = [
		'System check',
		'License key',
		'Database',
		'Server keys',
		'Emails',
		'Options',
		'Installation',
		'First user',
		'That\'s it!',
	];
?>
<ul>

	<?php
	$i = 0;
	$disabled = false;
	if (!isset($sectionSelected)) { $sectionSelected = $sections[0]; }
	foreach($sections as $section): ?>
		<?php
		  $className = "";
		  if ($section == $sectionSelected) {
			  $className = 'selected';
		  }
		?>
	<li class="<?= $className ?>">
		<?= ($disabled ? '' : '<a href="#">') . ($i +1) . '. '. $section . ($disabled ? '' : '</a>') ?>
	</li>
	<?php
	if ($section == $sectionSelected) {
		$disabled = true;
	}
	$i++;
	endforeach;
	?>
</ul>