<div class="dialog-wrapper">
	<div class="dialog medium key-info">
		<div class="dialog-header">
			<h2>Please verify the server key</h2>
			<a href="#" class="dialog-close" role="button">
				<?php include('includes/svg-icons/close.php'); ?>
				<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">
			<div class="form-content">
				<p>
					<strong>
						Check that the details of the GPG key below are valid. Do not hesitate to contact your support person in case of doubt!
					</strong>
				</p>
				<table>
					<tbody>
						<tr>
							<td class="label">Key ID</td>
							<td>292F8400D09A70DC</td>
						</tr>
						<tr>
							<td class="label">Fingerprint</td>
							<td>292F8400D09A70DC</td>
						</tr>
						<tr>
							<td class="label">Created</td>
							<td>18 march 2015 21:00</td>
						</tr>
						<tr>
							<td class="label">Expires</td>
							<td>18 march 2015 21:00</td>
						</tr>
						<tr>
							<td class="label">Length</td>
							<td>2048</td>
						</tr>
						<tr>
							<td class="label">Algorithm</td>
							<td>RSA</td>
						</tr>
						<tr>
							<td class="label">Owner UID</td>
							<td>passbolt.com (this is a comment) &lt;contact@passbolt.com&gt;</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="submit-wrapper clearfix">
				<input type="submit" value="OK" class="button primary" id="master-password-submit">
				<a href="#" class="button" id="js_keyinfo_help">Help!</a>
			</div>
		</div>
	</div>
</div>