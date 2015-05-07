<!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/LU_meta.php'); ?>
</head>
<body>
<!-- main -->
<div id="container" class="page">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<?php include('includes/dialogs/password_edit.php');?>
		<?php include('includes/LU_loadingbar.php'); ?>
		<?php include('includes/LU_notifications.php'); ?>
		<?php include('includes/LU_header_first.php'); ?>
		<div class="header second">
			<?php include('includes/LU_header_second_logo.php'); ?>
			<?php include('includes/LU_header_search_passwords.php'); ?>
			<?php include('includes/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
			<?php include('includes/LU_header_third_title_passwords.php'); ?>
			<?php include('includes/LU_header_third_actions_passwords.php'); ?>
		</div>
		<div id="js_app_panel_main"
				 class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready">
			<div class="js_tabs_content tabs-content">
				<div class="passbolt_controller_password_workspace_controller mad_view_view tab-content ready selected"
						 id="js_passbolt_passwordWorkspace_controller">
					<div class="js_workspace">
						<div class="panel left">
							<div class="navigation first shortcuts">
								<ul id="js_wsp_pwd_rs_shortcuts"
										class="clearfix passbolt_controller_component_resource_shortcuts_controller mad_view_component_tree menu ready">
									<li id="d64b2df2-30cf-0a64-ed4d-fcef7449f767" class="selected ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>All items</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="12f65ed5-f20e-4ed4-859f-4a247a9fa483" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Favorite</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="d6b74f9a-6329-1364-25d6-4426ef64cb32" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Recently modified</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="3b638675-635d-3378-98ae-072f1e33db47" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Shared with me</span></a>
												</div>
											</div>
										</div>


									</li>
									<li id="bb7c3d53-8aed-52ff-c35d-3a4d68e27c09" class="ready">
										<div class="row">
											<div class="main-cell-wrapper">
												<div class="main-cell">
													<a href="#"><span>Items I own</span></a>
												</div>
											</div>
										</div>


									</li>
								</ul>
							</div>
							<div class="navigation last tree categories">
								<ul id="js_wsp_pwd_category_chooser">
								</ul>
							</div>
						</div>
						<div class="panel middle">
							<div id="js_wsp_pwd_breadcrumb"
									 class="breadcrumbs passbolt_controller_component_password_breadcrumb_controller mad_view_view js_component ready">
								<ul id="5f7123a9-e957-d06b-6b47-7287645da295"
										class="mad_controller_component_menu_controller mad_view_component_tree menu ready">
									<li id="5d6c107b-8791-c3ee-bf06-27ee3adb99a1" class="ready">
										<div class="main-cell">
											<a href="#"><span>All items</span></a>
										</div>
									</li>
								</ul>
							</div>
							<div id="js_wsp_pwd_browser"
									 class="tableview passbolt_controller_component_password_browser_controller passbolt_view_component_password_browser selection">
								<div class="tableview-header">
									<table>
										<thead>
										<tr>

											<th class="js_grid_column js_grid_column_multipleSelect selections s-cell">
												<div class="input checkbox"><label for="checkbox-select-all">select all</label></div>
											</th>

											<th class="js_grid_column js_grid_column_favorite selections s-cell">
												<a href="#"> <i class="icon fav no-text"></i> <span>fav</span> </a>
											</th>

											<th class="js_grid_column js_grid_column_name m-cell">
												Resource
											</th>

											<th class="js_grid_column js_grid_column_username m-cell">
												Username
											</th>

											<th class="js_grid_column js_grid_column_secret m-cell password">
												Password
											</th>

											<th class="js_grid_column js_grid_column_uri l-cell">
												URI
											</th>

											<th class="js_grid_column js_grid_column_modified m-cell">
												Modified
											</th>

											<th class="js_grid_column js_grid_column_owner m-cell">
												Owner
											</th>

											<th class="js_grid_column js_grid_column_copyLogin s-cell">

											</th>

											<th class="js_grid_column js_grid_column_copySecret s-cell">

											</th>

										</tr>
										</thead>
									</table>
								</div>
								<div class="tableview-content scroll">
									<table>
										<tbody>
										<tr class="selected" id="50d77ffd-5624-492c-842e-1b63d7a10fce">

											<td class="js_grid_column_multipleSelect selections s-cell">
		<span title=""><div
			class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
			id="multiple_select_checkbox_50d77ffd-5624-492c-842e-1b63d7a10fce">
			<div class="input checkbox">
				<input checked="checked" value="50d77ffd-5624-492c-842e-1b63d7a10fce"
							 id="checkbox2c6dea60-b131-6589-fc68-f63e10c36574" type="checkbox">
				<label for="checkbox2c6dea60-b131-6589-fc68-f63e10c36574"></label>
			</div>
		</div></span>
											</td>

											<td class="js_grid_column_favorite selections s-cell">
		<span title=""><div
			class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
			id="favorite_50d77ffd-5624-492c-842e-1b63d7a10fce"><a href="#" class="no-text">
			<i class="icon fav"></i>
			<span>fav</span>
		</a>
		</div></span>
											</td>

											<td class="js_grid_column_name m-cell">
		<span title="shared resource">
			shared resource
		</span>
											</td>

											<td class="js_grid_column_username m-cell">
		<span title="admin">
			admin
		</span>
											</td>

											<td class="js_grid_column_secret m-cell password">
		<span title=""><a href="#copy_secret"><span>copy to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMA02SO1yBnB4ZAQgAi8pJ/8DwyzpWwB0lcWkUEvKaPHUy2PFUsMg2tvAd67M2
zKcoS75nrWPcyyBJUROTK74+bSoHL1O8uHWE4SW1+yMwJ5bysJNP+mIdaXFKHk3Q
TjN5ZVdX62XlUgxCypCRdAqTtAAqMbp8SDV9reoVIHzjBBTUojjuViI5lY4RGD5m
TZANFyjIQILo4E8P06Ma5MMTZgTMEyzb+ZpjsRvOxGyx/5pRbVM4kLdkYZGr0oyH
I85oS+mh9UBS2C8JHKiSBlUylRoYvQ9A5u1JGZK6xkp3Enf/MzV2ANyVlndoFaAo
c6oiOxoXI8zECh1zJI7iqAKL+lyrNHobjJ4vHzR1FNJHASqmJ93foEA44J/Sv2Ag
Od9LVXHlZm7fMAos4P1C/75CwcBSn7F+EzsZgQkpI/OhOCYCWkdS2Hu/8jVZI65D
nciXk/hWKxk=
=+PWJ
-----END PGP MESSAGE-----
</pre></span>
											</td>

											<td class="js_grid_column_uri l-cell">
		<span title="http://shared.resource.net/">
			http://shared.resource.net/
		</span>
											</td>

											<td class="js_grid_column_modified m-cell">
		<span title="2 years ago">
			2 years ago
		</span>
											</td>

											<td class="js_grid_column_owner m-cell">
		<span title="anonymous@passbolt.com">
			anonymous@passbolt.com
		</span>
											</td>

											<td class="js_grid_column_copyLogin s-cell">
		<span title="">

		</span>
											</td>

											<td class="js_grid_column_copySecret s-cell">
		<span title="">

		</span>
											</td>

										</tr>
										<tr id="50d77ff9-c358-4dfb-be34-1b63d7a10fce">

											<td class="js_grid_column_multipleSelect selections s-cell">
		<span title=""><div
			class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
			id="multiple_select_checkbox_50d77ff9-c358-4dfb-be34-1b63d7a10fce">
			<div class="input checkbox">
				<input value="50d77ff9-c358-4dfb-be34-1b63d7a10fce" id="checkbox788a360e-41d7-d80b-0024-fa0195a9a4f7"
							 type="checkbox">
				<label for="checkbox788a360e-41d7-d80b-0024-fa0195a9a4f7"></label>
			</div>
		</div></span>
											</td>

											<td class="js_grid_column_favorite selections s-cell">
		<span title=""><div
			class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
			id="favorite_50d77ff9-c358-4dfb-be34-1b63d7a10fce"><a href="#" class="no-text">
			<i class="icon fav"></i>
			<span>fav</span>
		</a>
		</div></span>
											</td>

											<td class="js_grid_column_name m-cell">
		<span title="salesforce account">
			salesforce account
		</span>
											</td>

											<td class="js_grid_column_username m-cell">
		<span title="passbolt">
			passbolt
		</span>
											</td>

											<td class="js_grid_column_secret m-cell password">
		<span title=""><a href="#copy_secret"><span>copy to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMA02SO1yBnB4ZAQf6AjCX2aowFJB7aYe93GEMc/PUbeaTo9r3pdx4wFMdaCdU
XTMFYGfVnNVzFM9RF/3QK7Fk2Bkz3Su/tKnejMMn26OQVm6mmWhiLczfSTuwfK/r
x8asdQYhIEbzfzohlUzOEk5a3zncllzx8QBVv6ATcb2fFvrpyFoDQw+IyWJvfo4l
fp2HFoFeHehDrks76rZWIhKGbtO7DmwAHEJHkN8hOOu8Mb5YlIp+ziLLbq2gp9X1
jHd78lg5MFyK840GanYYUmIM6bBXyeHCO+3GNf7XEkXZQvQOBellKU2znMJQ1c3+
gat+3ghGVk7uM4fcv6jsm6On/hxLI6bbdT+myfskkNJHAX1zfr7gIymsPB0si+xa
GRXhrucs9TprKt1asrG7d7q48rkm9rLFCpa65esfgF6wU/WNhRs4OWcsqQ7zlJol
L6t2cWIH9P8=
=+9tq
-----END PGP MESSAGE-----
</pre></span>
											</td>

											<td class="js_grid_column_uri l-cell">
		<span title="https://salesforce.com">
			https://salesforce.com
		</span>
											</td>

											<td class="js_grid_column_modified m-cell">
		<span title="2 years ago">
			2 years ago
		</span>
											</td>

											<td class="js_grid_column_owner m-cell">
		<span title="anonymous@passbolt.com">
			anonymous@passbolt.com
		</span>
											</td>

											<td class="js_grid_column_copyLogin s-cell">
		<span title="">

		</span>
											</td>

											<td class="js_grid_column_copySecret s-cell">
		<span title="">

		</span>
											</td>

										</tr>
										<tr id="50d77ff9-fdd8-4035-b7c6-1b63d7a10fce">

											<td class="js_grid_column_multipleSelect selections s-cell">
		<span title=""><div
			class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
			id="multiple_select_checkbox_50d77ff9-fdd8-4035-b7c6-1b63d7a10fce">
			<div class="input checkbox">
				<input value="50d77ff9-fdd8-4035-b7c6-1b63d7a10fce" id="checkbox7f6e1d87-9c90-e4bc-7c5b-4dd07bb60216"
							 type="checkbox">
				<label for="checkbox7f6e1d87-9c90-e4bc-7c5b-4dd07bb60216"></label>
			</div>
		</div></span>
											</td>

											<td class="js_grid_column_favorite selections s-cell">
		<span title=""><div
			class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
			id="favorite_50d77ff9-fdd8-4035-b7c6-1b63d7a10fce"><a href="#" class="no-text">
			<i class="icon fav"></i>
			<span>fav</span>
		</a>
		</div></span>
											</td>

											<td class="js_grid_column_name m-cell">
		<span title="tetris license">
			tetris license
		</span>
											</td>

											<td class="js_grid_column_username m-cell">
		<span title="passbolt">
			passbolt
		</span>
											</td>

											<td class="js_grid_column_secret m-cell password">
		<span title=""><a href="#copy_secret"><span>copy to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMA02SO1yBnB4ZAQf+KHXEJo2iYAKXvwy2Y2KOuYQLYUKh0+KFq1cl3XyeYOl3
qUsFGKTmnlntuP+kbsP3vATuyEWgz4vutZnzKIe4p5qg15Es7ZeRKAVtigfobtl6
AaEBEa3SOryMRPZc0QkARLUmIX9e/hcHA8KfhM4KLf6sbQiTSEQ6Ete06vCBSwfM
K3kqyDmpzUo98YvSUrPERlqmfO7h5EJTF9AQbr/TM+UGTt4bGXEz6semZI5LC3eU
AVuw+B/6Tv5MEWqnz1UNBzGa8fyCjdnL7mdEkCMCuk1GPRw9FlNkPuMri0KkbBn1
iCv0tud6wrSei7nPLssEel6F2ufwDE0YDq2cVVuYnNJIAXfiZg0BJXwl/S6YE8/g
wR3gTOmfWxfi6qwZegqjrFfyvMYzJS3kQOgEAt2ZMRpZYjXVdUVl0myrsmbpm1hh
qCgAeC7ulWqC
=nbCJ
-----END PGP MESSAGE-----
</pre></span>
											</td>

											<td class="js_grid_column_uri l-cell">
		<span title="https://tetris.com">
			https://tetris.com
		</span>
											</td>

											<td class="js_grid_column_modified m-cell">
		<span title="2 years ago">
			2 years ago
		</span>
											</td>

											<td class="js_grid_column_owner m-cell">
		<span title="anonymous@passbolt.com">
			anonymous@passbolt.com
		</span>
											</td>

											<td class="js_grid_column_copyLogin s-cell">
		<span title="">

		</span>
											</td>

											<td class="js_grid_column_copySecret s-cell">
		<span title="">

		</span>
											</td>

										</tr>
										<tr id="509bb871-5168-49d4-a676-fb098cebc04d">

											<td class="js_grid_column_multipleSelect selections s-cell">
		<span title=""><div
			class="mad_form_element_checkbox_controller mad_view_form_element_checkbox_view js_checkbox_multiple_select ready"
			id="multiple_select_checkbox_509bb871-5168-49d4-a676-fb098cebc04d">
			<div class="input checkbox">
				<input value="509bb871-5168-49d4-a676-fb098cebc04d" id="checkboxb94b2c28-c50e-74f6-0b59-3b4c3a6c9664"
							 type="checkbox">
				<label for="checkboxb94b2c28-c50e-74f6-0b59-3b4c3a6c9664"></label>
			</div>
		</div></span>
											</td>

											<td class="js_grid_column_favorite selections s-cell">
		<span title=""><div
			class="passbolt_controller_component_favorite_controller passbolt_view_component_favorite js_component ready"
			id="favorite_509bb871-5168-49d4-a676-fb098cebc04d"><a href="#" class="no-text">
			<i class="icon fav"></i>
			<span>fav</span>
		</a>
		</div></span>
											</td>

											<td class="js_grid_column_name m-cell">
		<span title="facebook account">
			facebook account
		</span>
											</td>

											<td class="js_grid_column_username m-cell">
		<span title="passbolt">
			passbolt
		</span>
											</td>

											<td class="js_grid_column_secret m-cell password">
		<span title=""><a href="#copy_secret"><span>copy to clipboard</span></a><pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMA02SO1yBnB4ZAQf/XDf7jv9Zotvh4ofdgH8lWZD3XTJAVoAyKHP4IoVv2hKH
GqBxDL0BiqfQT+pWyZr3QIV4si6EmxS+q59YIE68N76X5hnPRHbjSCy7oOyPFEZe
4sOR/gCr8XGHk486wp24BBIhtyDFHZc94aI79h+9wnpbCMRVvZtgFbxs0HdDcpN5
B8iIIJttOby/6llxU8UPA0eyHyREvnUI9GHgLpG7c4cQ5ooq3ZXreNZ68mJnvDeV
2eV6cWM3VdXLNRgK8BeYa4PeUVJJix1doRBQmxTMVKzC03yHZgi+XkUJ8CDAmR/R
Q2aNxqqfnmGJ+v9qQS5Hh0InZLQmmZlZu6QTsTxtcNJFAQtXqnvLpS8JSkd6e2ah
/MXQAgcW5yC5J6Z7gdjA3fxVpB5hwFF1NU8VDGgGQH5NYKWvkyVuh6Gcso/XQXW8
P+Ei57UW
=QpE/
-----END PGP MESSAGE-----
</pre></span>
											</td>

											<td class="js_grid_column_uri l-cell">
		<span title="https://facebook.com">
			https://facebook.com
		</span>
											</td>

											<td class="js_grid_column_modified m-cell">
		<span title="2 years ago">
			2 years ago
		</span>
											</td>

											<td class="js_grid_column_owner m-cell">
		<span title="ismail@passbolt.com">
			ismail@passbolt.com
		</span>
											</td>

											<td class="js_grid_column_copyLogin s-cell">
		<span title="">

		</span>
											</td>

											<td class="js_grid_column_copySecret s-cell">
		<span title="">

		</span>
											</td>

										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="ea177b30-f307-5bc6-1f7e-e96a117c4dec"
								 class="panel aside js_wsp_pwd_sidebar_second passbolt_controller_component_resource_details_controller passbolt_view_component_resource_details js_component ready"
								 style="">
							<div class="resource">
								<h3>shared resource</h3>
								<a href="#" class="dialog-close"><i class="icon close no-text"></i><span>close</span></a>

								<div class="detailed-information">
									<h4>Information</h4>
									<ul>
										<li class="username">
											<span class="label">Username</span>
											<span class="value">admin</span>
										</li>
										<li class="password">
											<span class="label">Password</span>
			<span class="value">
				<a href="#copy_secret" class="copy-clipboard">
					<span>copy to clipboard</span>
				</a>
				<pre>-----BEGIN PGP MESSAGE-----
Version: GnuPG v1.4.12 (GNU/Linux)

hQEMA02SO1yBnB4ZAQgAi8pJ/8DwyzpWwB0lcWkUEvKaPHUy2PFUsMg2tvAd67M2
zKcoS75nrWPcyyBJUROTK74+bSoHL1O8uHWE4SW1+yMwJ5bysJNP+mIdaXFKHk3Q
TjN5ZVdX62XlUgxCypCRdAqTtAAqMbp8SDV9reoVIHzjBBTUojjuViI5lY4RGD5m
TZANFyjIQILo4E8P06Ma5MMTZgTMEyzb+ZpjsRvOxGyx/5pRbVM4kLdkYZGr0oyH
I85oS+mh9UBS2C8JHKiSBlUylRoYvQ9A5u1JGZK6xkp3Enf/MzV2ANyVlndoFaAo
c6oiOxoXI8zECh1zJI7iqAKL+lyrNHobjJ4vHzR1FNJHASqmJ93foEA44J/Sv2Ag
Od9LVXHlZm7fMAos4P1C/75CwcBSn7F+EzsZgQkpI/OhOCYCWkdS2Hu/8jVZI65D
nciXk/hWKxk=
=+PWJ
-----END PGP MESSAGE-----
</pre>
			</span>
										</li>
										<li class="url">
											<span class="label">URL</span>
			<span class="value">
				<a href="http://shared.resource.net/" target="_blank">http://shared.resource.net/</a>
			</span>
										</li>
										<li class="modified">
											<span class="label">Modified</span>
											<span class="value">2 years ago</span>
										</li>
										<li class="modified-by">
											<span class="label">Modified by</span>
											<span class="value">anonymous@passbolt.com</span>
										</li>
										<li class="modified-by">
											<span class="label">Owner</span>
											<span class="value">anonymous@passbolt.com</span>
										</li>
										<!--<li class="expire">-->
										<!--<span class="label">Expire</span>-->
										<!--<span class="value">never</span>-->
										<!--</li>-->
										<!--<li class="strength">
											<span class="label">Strength</span>
											<span>
												-
											</span>
										</li>-->
									</ul>
								</div>
								<!-- Description management -->
								<div
									class="description passbolt_controller_component_sidebar_section_sidebar_section_description_controller passbolt_view_component_sidebar_section_sidebar_section_description js_component ready"
									id="js_rs_details_description"><h4>Description</h4>

									<a href="#" class="edit_description_button section-action" id="js_edit_description_button">
										<i class="icon edit no-text"></i>
										<span>edit</span>
									</a>

									<p class="description_content">shared resource description</p>
									<!-- edit description form -->
									<div style="display: none;"
											 class="passbolt_controller_form_resource_edit_description_form_controller mad_view_form_form_view js_component hidden"
											 id="js_rs_details_edit_description">
										<div class="form-content resource-description-edit-wrapper">
											<input value="50d77ffd-5624-492c-842e-1b63d7a10fce" id="286db09f-1a52-00d8-f585-8635004f801c"
														 name="data[Resource][id]"
														 class="js_resource_id required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
														 maxlength="36" type="hidden">

											<div class="input text required js_form_element_wrapper">
												<textarea id="44f7948f-65a6-2124-b3c4-056944f4fb67" name="data[Resource][description]"
																	class="js_resource_description required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																	maxlength="150" placeholder="enter description"></textarea>

												<div id="db792408-aede-d511-6442-ff8687c91dd0"
														 class="js_resource_description_feedback message mad_form_feedback_controller mad_view_view js_component ready">
												</div>
											</div>
											<div class="actions">
												<input class="button resource-submit" value="save" type="submit">
											</div>
										</div>
									</div>
								</div>
								<!-- Tags management -->
								<div class="tags clearfix" id="js_rs_details_tags"></div>
								<!-- Comments management -->
								<div
									class="comments clearfix passbolt_controller_component_comments_controller passbolt_view_component_comments js_component ready"
									id="js_rs_details_comments"><h4>Comments</h4>
									<a href="#" class="section-action"><i class="icon create no-text"></i><span>create</span></a>

									<div style="display: none;"
											 class="passbolt_controller_form_comment_create_form_controller mad_view_form_form_view js_component hidden"
											 id="js_rs_details_comments_add_form">
										<ul>
											<li class="comment-wrapper">
												<div class="comment add">
													<div class="author profile picture"><a href="#"><img src="img/user.png"></a></div>
													<div class="form-content">
														<div class="input textarea required">
															<label for="Comment">Add a comment</label>
															<input value="" id="53269307-7baa-b6e7-a543-8e0a33dae2a7" name="data[comment][parent_id]"
																		 class="js_comment_parent_id required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																		 maxlength="36" type="hidden">
															<input value="50d77ffd-5624-492c-842e-1b63d7a10fce"
																		 id="a47e89e3-7434-6e8a-6529-8341c448e661" name="data[comment][foreign_id]"
																		 class="js_comment_foreign_id required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																		 maxlength="36" type="hidden">
															<input value="Resource" id="d11f391f-a71a-fbf1-1762-5db57040646f"
																		 name="data[comment][foreign_model]"
																		 class="js_comment_foreign_model required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																		 maxlength="36" type="hidden">
															<textarea id="17ac3e3c-95f7-4348-9464-39885da57985" name="data[comment][content]"
																				class="js_comment_content required mad_form_element_textbox_controller mad_view_form_element_textbox_view js_component ready"
																				maxlength="150" placeholder="add a comment"></textarea>

															<div id="7ffcaf92-95f2-da56-9a3e-aa0781a46e81"
																	 class="js_comment_content_feedback message mad_form_feedback_controller mad_view_view js_component ready">
															</div>
														</div>
														<div class="metadata">
															<span class="author username"><a href="#">You</a></span>
															<span class="modified">right now</span>
														</div>
														<div class="actions">
															<a href="#" class="button comment-submit"><span>send</span></a>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
									<ul
										class="passbolt_controller_component_comments_list_controller passbolt_view_component_comments_list tree ready"
										id="js_rs_details_comments_list"></ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="passbolt_controller_people_workspace_controller" id="js_passbolt_peopleWorkspace_controller"></div>
				<div class="passbolt_controller_preference_workspace_controller"
						 id="js_passbolt_preferenceWorkspace_controller"></div>
			</div>
		</div>
	</div>
</div>
<!-- footer -->
<footer>
	<div class="footer">
		<span class="copyright">2013 © Passbolt.com</span> •
		<span class="version">v.2.13.3</span>
	</div>
</footer>
</body>
</html>