<div id="js_wsp_pwd_browser" class="tableview passbolt_component_password_browser passbolt_view_component_password_browser selection <?= $emptyGridSettings['filter'] ?> empty">
	<div class="tableview-header">
		<table>
			<thead>
			<tr>

				<th class="js_grid_column js_grid_column_multipleSelect cell_multipleSelect selections s-cell" data-view-id="1410">
					<div class="input checkbox"><input name="select all" value="checkbox-select-all" id="checkbox-select-all" disabled="disabled" type="checkbox"><label for="checkbox-select-all">select all</label> 					</div>
				</th>

				<th class="js_grid_column js_grid_column_favorite cell_favorite selections s-cell" data-view-id="1411">
					<a href="#"><i class="icon fav"></i><span class="visuallyhidden">fav</span></a>
				</th>

				<th class="js_grid_column js_grid_column_name cell_name m-cell" data-view-id="1412">
					Resource
				</th>

				<th class="js_grid_column js_grid_column_username cell_username m-cell" data-view-id="1413">
					Username
				</th>

				<th class="js_grid_column js_grid_column_secret cell_secret m-cell password" data-view-id="1414">
					Password
				</th>

				<th class="js_grid_column js_grid_column_uri cell_uri l-cell" data-view-id="1415">
					URI
				</th>

				<th class="js_grid_column js_grid_column_modified cell_modified m-cell" data-view-id="1416">
					Modified
				</th>

				<th class="js_grid_column js_grid_column_owner cell_owner m-cell" data-view-id="1417">
					Owner
				</th>

			</tr>
			</thead>
		</table>
	</div>
	<div class="tableview-content scroll">
		<div class="empty-content">
			<h2><?= $emptyGridSettings['title'] ?></h2>
			<p><?= $emptyGridSettings['subtitle'] ?></p>
		</div>
		<table>
			<tbody>
			</tbody>
		</table>
	</div>
</div>