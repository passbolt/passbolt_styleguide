<?php
 include('fixtures/users.php');
?>
<div id="js_wsp_ppl_browser" class="tableview passbolt_controller_component_user_browser_controller passbolt_view_component_user_browser selection">
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
		<table>
			<tbody>
<?php foreach($users as $user) : ?>
			<tr id="dada6042-c5cd-11e1-a0c5-080027796c51"<?=  $user['User']['username'] =='ada@passbolt.com' ? ' class="selected"' : '' ?> <?=  $user['User']['username'] =='jean@passbolt.com' ? ' class="inactive"' : '' ?>>
				<td class="js_grid_column_multipleSelect selections cell_multipleSelect s-cell">
					<div title="">
						<div id="multiple_select_checkbox_dada6042-c5cd-11e1-a0c5-080027796c51"
								 class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready">
							<div class="input checkbox">
								<input type="checkbox" value="dada6042-c5cd-11e1-a0c5-080027796c51" id="checkboxc49705e1-42c4-49d6-5052-038ce441dae7">
								<label for="checkboxc49705e1-42c4-49d6-5052-038ce441dae7"></label>
							</div>
						</div>
					</div>
				</td>

				<td class="js_grid_column_avatar s1-cell cell_avatar">
					<div title="">
						<img src="src/img/avatar/user.png" width="25" height="25" alt="avatar picture">
					</div>
				</td>

				<td class="js_grid_column_name m-cell">
					<div title="<?php echo $user['User']['first_name'] . ' ' . $user['User']['last_name']; ?>">
						<?php echo $user['User']['first_name'] . ' ' . $user['User']['last_name']; ?>
					</div>
				</td>

				<td class="js_grid_column_username m-cell">
					<div title="<?php echo $user['User']['username']; ?>">
						<?php echo $user['User']['username']; ?>
					</div>
				</td>

				<td class="js_grid_column_fingerprint l-cell">
					<div title="<?php echo $user['User']['fingerprint']; ?>">
						<code><?php echo substr($user['User']['fingerprint'],-25); ?></code>
					</div>
				</td>

				<td class="js_grid_column_group_role m-cell">
					<div title="<?php echo $user['User']['group_role']; ?>">
						<?php echo $user['User']['group_role']; ?>
					</div>
				</td>

			</tr>
<?php endforeach; ?>
			</tbody>
		</table>
	</div>
</div>