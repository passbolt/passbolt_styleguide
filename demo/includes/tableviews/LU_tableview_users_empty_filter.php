<?php
 include('fixtures/users.php');
?>
<div id="js_wsp_ppl_browser" class="tableview passbolt_controller_component_user_browser_controller passbolt_view_component_user_browser empty filtered">
	<div class="tableview-header">
		<table>
			<thead>
			<tr>

				<th class="js_grid_column js_grid_column_multipleSelect selections s-cell">
					<input type="checkbox" value="all" id="checkbox-select-all-people" disabled="disabled">
					<div class="input checkbox"><label for="checkbox-select-all-people">select all</label></div>
				</th>

				<th class="js_grid_column js_grid_column_avatar s1-cell cell_avatar">

				</th>

				<th class="js_grid_column js_grid_column_name m-cell sortable sorted sort-asc">
					<a href="#">User</a>
				</th>

				<th class="js_grid_column js_grid_column_username m-cell sortable">
					<a href="#">Username</a>
				</th>

				<th class="js_grid_column js_grid_column_fingerprint l-cell sortable">
					<a href="#">Fingerprint</a>
				</th>

				<th class="js_grid_column js_grid_column_group_role m-cell sortable">
					<a href="#">Group role</a>
				</th>

			</tr>
			</thead>
		</table>
	</div>
	<div class="tableview-content scroll">
		<div class="empty-content">
			<h2>None of the users matched this search.</h2>
			<p>Try another search or use the left panel to navigate into your organization.</p>
		</div>
		<table>
			<tbody>
			</tbody>
		</table>
	</div>
</div>