<?php

    $groups = [
        [
            'User' => [
                'first_name' => 'IT-Support',
                'last_name' => '',
                'email' => '5 members',
                'avatar' => 'img/avatar/group_default.png',
                'fingerprint' => 'Ada Lovelace, Betty Holberton, Dame Steve Shirley, France Allen'
            ],
            'Permission' => [
                'id' => '93ba06a7-e912-3ce1-a24b-b9ed766e42c4',
                'name' => 'manager',
                'change' => 'unchanged',
                'updated' => false
            ]
        ],
        [
            'User' => [
                'first_name' => 'HR',
                'last_name' => '',
                'email' => '5 members',
                'avatar' => 'img/avatar/group_default.png',
                'fingerprint' => 'Ada Lovelace, Betty Holberton, Dame Steve Shirley, France Allen'
            ],
            'Permission' => [
                'id' => '93ba06a7-e912-3ce1-a24b-b9ed766e42c4',
                'name' => 'manager',
                'change' => 'Role will change',
                'updated' => true
            ]
        ],
        [
            'User' => [
                'first_name' => 'Director\'s office',
                'last_name' => '',
                'email' => '5 members',
                'avatar' => 'img/avatar/group_default.png',
                'fingerprint' => 'Ada Lovelace, Betty Holberton, Dame Steve Shirley, France Allen'
            ],
            'Permission' => [
                'id' => '93ba06a7-e912-3ce1-a24b-b9ed766e42c4',
                'name' => 'member',
                'change' => 'A request will be sent',
                'updated' => true
            ]
        ]
    ];
if(!empty($_GET['Groups'])) {
    $groups = array_merge($users,$_GET['Groups']);
}
?>
<div class="form-content permission-edit">
    <ul id="js_permissions_list" class="permissions scroll mad_component_tree mad_view_component_tree ready">
<?php foreach ($groups as $user) : ?>
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
</div>
