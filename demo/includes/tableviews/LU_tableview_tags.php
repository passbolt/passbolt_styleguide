<?php
$tags = [
	'#alpha', '#beta', '#gamma', '#delta', '#epsilon', '#zeta', '#eta', '#theta',
	'#iota', '#kappa', '#lambda', '#mu', '#nu', '#xi', '#omicron', '#pi', '#rho', '#sigma',
	'#tau', '#upsilon', '#phi', '#chi', '#psi', '#omega'
];
?>

<div class="tableview selection">

	<div class="tableview-header" style="overflow: hidden;">
		<table>
			<thead>
				<tr>
					<th class="selections s-cell">
					</th>
					<th class="cell_name l-cell sortable">
						<a href="#">Name</a>
					</th>
					<th class="cell_usage m-cell sortable">
						<a href="#">Used</a>
					</th>
					<th class="cell_modified m-cell sortable sorted sort-desc">
						<a href="#">Modified</a>
					</th>
					<th class="cell_modified_by m-cell sortable">
						<a href="#">Modified by</a>
					</th>
				</tr>
			</thead>
		</table>
	</div>
	<div class="tableview-content scroll">

		<table>
			<tbody>
				<?php foreach ($tags as $tag) { ?>
					<tr>
						<td class="selections s-cell">
							<div title="">
								<div class="ready">
									<div class="input checkbox">
										<input value="2a18191d-288c-821d-e7c3-6e464f33564c" id="checkbox-2a18191d-288c-821d-e7c3-6e464f33564c" type="checkbox">
									</div>
								</div>
							</div>
						</td>
						<td class="cell_name l-cell">
							<div title="Inkscape">
								<?= $tag ?>
							</div>
						</td>
						<td class="cell_usage m-cell">
							<div title="vector">
								<?= rand(0, 100) ?>
							</div>
						</td>
						<td class="cell_modified m-cell">
							<div title="a day ago">
								a day ago
							</div>
						</td>
						<td class="cell_modified_by m-cell">
							<div title="edith@passbolt.com">
								<?= $tag ?>@passbolt.com
							</div>
						</td>
					</tr>
				<?php } ?>
			</tbody>
		</table>
	</div>
</div>