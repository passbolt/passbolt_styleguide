<!doctype html>
<html>
<head>
	<?php include('includes/LU_meta_iframe.php'); ?>
	<style>
		#js_perm_create_form_aro_auto_cplt:focus,
		#js_perm_create_form_aro_auto_cplt ~ .security-token {
			background:#ffbbbb;
			color:#000;
		}
		#js_perm_create_form_aro_auto_cplt:focus ~ .security-token {
			background:#000;
			color:#ffbbbb;
		}
	</style>
</head>
<body>
<div class="form-content permission-add">
<div class="input text autocomplete">
	<label for="js_perm_create_form_aro_auto_cplt">Share with people</label>
	<input maxlength="50" id="js_perm_create_form_aro_auto_cplt" placeholder="start typing a person name" autocomplete="off" type="text">
	<div class="security-token">CKR</div>
</div>

<div class="select left perm-type">
	<select id="js_perm_create_form_type" class="permission">
		<option value="1" data-view-id="229">can read</option>
		<option value="7" data-view-id="230">can update</option>
		<option value="15" data-view-id="231">is owner</option>
	</select>
</div>

<div class="actions">
	<input id="js_perm_create_form_add_btn" class="button primary" value="add" type="submit">
</div>

<div class="input blank">
	<div id="js_perm_create_form_feedback" class="message"></div>
</div>
</div>
</body>
</html>