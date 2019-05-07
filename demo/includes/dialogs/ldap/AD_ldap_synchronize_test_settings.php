<div id="a484a5eb-4258-bde9-6b1e-20c6f26204fb" class="dialog-wrapper ready">
	<div class="dialog">
		<div class="dialog-header">
			<h2>Test settings report</h2>
			<a href="demo/AD_admin_ldap_configuration.php" class="dialog-close">
				<i class="fa fa-close"></i><span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content ldap-test-settings-report">
		<div class="form-content">
			<p><strong>A connection could be established with your server.</strong></p>
			<p>4 users and 4 groups were found.</p>
			<div class="accordion directory-list closed">
				<div class="accordion-header">
					<a role="link">See list</a>
				</div>
				<div class="accordion-content hidden">
					<table class="table-parameters">
                        <tr><td>Groups</td><td>Users</td>
                        <tr>
                            <td>
                                <span class="error">cn=finance,dc=passbolt,dc=local</span><br>
                                Operations <em>(2 members)</em><br>
                                Finance <em>(1 members)</em><br>
                                Operations <em>(2 members)</em><br>
                                Finance <em>(1 members)</em><br>
                                Operations <em>(2 members)</em><br>
                                Finance <em>(1 members)</em><br>
                                Operations <em>(2 members)</em><br>
                                Finance <em>(1 members)</em><br>
                                Operations <em>(2 members)</em><br>
                                Finance <em>(1 members)</em><br>
                                Operations <em>(2 members)</em>
                            </td>
                            <td>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em><br>
                                Ada Lovelalce <em>(ada@passbolt.com)</em>
                            </td>
                        </tr>
                    </table>
				</div>

			</div>

            <div class="accordion accordion-directory-structure closed">
                <div class="accordion-header">
                    <a role="link">See entities structure</a>
                </div>
                <div class="accordion-content hidden">
                    <div class="directory-structure">
                        <ul>
                            <li class="group">Root
                                <ul>
                                    <li class="user">Betty Holberton <em>(betty@passbolt.com)</em></li>
                                    <li class="user">Neil Amstrong <em>(neil@passbolt.com)</em></li>
                                    <li class="user">Sofia Kovalevskaya <em>(sofia@passbolt.com)</em></li>
                                    <li class="group">
                                        Operations <em>(2 members)</em>
                                        <ul>
                                            <li class="user">Zoe Logos <em>(zoe@passbolt.com)</em></li>
                                            <li class="group">Test 1 <em>(0 members)</em>
                                                <ul>
                                                    <li class="group">Test 2 <em>(1 members)</em>
                                                        <ul>
                                                            <li class="user error">cn=jean valjean,dc=passbolt,dc=local</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p class="directory-errors error">2 entries had errors and will be ignored during synchronization.</p>
            <div class="accordion accordion-directory-errors closed">
                <div class="accordion-header">
                    <a role="link">See error details</a>
                </div>
                <div class="accordion-content hidden">
                    <div class="directory-errors">
                        <textarea>Error: email: user email could not be retrieved

{
    "id": "f3911a62-ef08-1038-82b0-57ce92a91ef9",
    "directory_name": "cn=jean valjean,dc=passbolt,dc=local",
    "directory_created": "2019-04-09T11:47:09+00:00",
    "directory_modified": "2019-04-09T11:47:09+00:00",
    "user": {
        "username": null,
        "profile": {
            "first_name": "jean",
            "last_name": "valjean"
        }
    }
}
Error: email: user email could not be retrieved

{
    "id": "bc9c9d2c-ef0f-1038-82b1-57ce92a91ef9",
    "directory_name": "cn=test testtwo,cn=testgroup,dc=passbolt,dc=local",
    "directory_created": "2019-04-09T12:35:43+00:00",
    "directory_modified": "2019-04-09T13:07:17+00:00",
    "user": {
        "username": null,
        "profile": {
            "first_name": "test",
            "last_name": "testtwo1"
        }
    }
}
                        </textarea>
                    </div>
                </div>
            </div>
		</div>
		<div class="submit-wrapper clearfix">
			<a class="button primary" href="demo/AD_admin_ldap_synchronize.php">Ok</a>
			<a class="js-dialog-cancel cancel" href="demo/AD_admin_ldap_configuration.php">cancel</a>
		</div>
		</div>
	</div>
</div>