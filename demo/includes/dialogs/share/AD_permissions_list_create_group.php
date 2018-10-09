<?php

$users = [
    [
        'User' => [
            'first_name' => 'Ada',
            'last_name' => 'Lovelace',
            'email' => 'ada@passbolt.com',
            'avatar' => 'img/avatar/user.png',
            'fingerprint' => '3337 88B5 464B 797F DF10  A98F 2FE9 6B47 C7FF 421A'
        ],
        'Permission' => [
            'id' => '002925da-8b35-31ef-ac1e-3f615c2a8f7c',
            'name' => 'member',
            'change' => 'will be added',
            'updated' => false
        ]
    ],
    [
        'User' => [
            'first_name' => 'Betty',
            'last_name' => 'Holberton with a very long name',
            'email' => 'betty.holberton@passbolt.com',
            'avatar' => 'img/avatar/user.png',
            'fingerprint' => '3337 88B5 464B 797F DF10  A98F 2FE9 6B47 C7FF 421A'
        ],
        'Permission' => [
            'id' => '93ba06a7-e912-3ce1-a24b-b9ed766e42c4',
            'name' => 'manager',
            'change' => 'will be added',
            'updated' => false
        ]
    ]
];
if(!empty($_GET['Users'])) {
    $users = array_merge($users,$_GET['Users']);
}
if (isset($groupUsersEmpty)) {
    $groupUsersEmpty = 'empty';
} else {
    $groupUsersEmpty = '';
}
?>
<div id="js_group_members" class="group_members <?= $groupUsersEmpty ?>">
	<div class="form-content">
		<div class="input required">
			<label for="js_field_group_permission">Group members</label>
		</div>
	</div>
    <div class="form-content permission-edit">
        <ul id="js_permissions_list" class="permissions scroll mad_component_tree group_user mad_view_component_tree ready">
            <?php foreach ($users as $user) : ?>
                <li id="<?php echo $user['Permission']['id']; ?>" data-view-id="372"
                    class="row direct-permission <?php if($user['Permission']['updated']) echo 'permission-updated'; ?>" >
                    <div class="avatar">
                        <img src="src/<?php echo $user['User']['avatar']; ?>" data-view-id="373">
                    </div>
                    <div class="user"> <!-- or class=group -->
                        <div class="details">
                        <span class="name">
                            <?php echo $user['User']['first_name']; ?> <?php echo $user['User']['last_name']; ?>
                        </span>
                            <div href="#" class="more_details tooltip-alt">
                                <i class="fa fa-info-circle"></i>
                                <div class="tooltip-text right">
                                    <div class="email"><?php echo $user['User']['email']; ?></div>
                                    <div class="fingerprint"><?php echo $user['User']['fingerprint']; ?></div>
                                </div>
                            </div>
                        </div>
                        <div class="permission_changes">
                            <span><?php echo $user['Permission']['change']; ?></span>
                        </div>
                    </div>
                    <div class="select rights">
                        <form id="js_share_rs_perm_<?php echo $user['Permission']['id']; ?>" class="js_perm_edit_form" data-view-id="372">
                            <select id="js_share_perm_type_<?php echo $user['Permission']['id']; ?>"
                                    class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_dropdown">
                                <option value="7" data-view-id="377" <?php if($user['Permission']['name'] =='member') echo 'selected'; ?>>Member</option>
                                <option value="1" data-view-id="376" <?php if($user['Permission']['name'] =='manager') echo 'selected'; ?>>Group manager</option>
                            </select>
                        </form>
                    </div>
                    <div class="actions">
                        <a disabled="disabled" id="js_share_perm_delete_<?php echo $user['Permission']['id']; ?>" href="#"
                           class="js_perm_delete close mad_component_button js_component mad_view disabled" title="remove"
                           data-view-id="372">
                            <i class="fa fa-times-circle"></i>
                            <span class="visuallyhidden">remove</span>
                        </a>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
        <div class="message warning empty-permission">
            The group is empty, please add a group manager.
        </div>
    </div>
</div>
