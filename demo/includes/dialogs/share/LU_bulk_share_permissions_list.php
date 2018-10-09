<?php
$permissionLabels = [
    'deny' => 'no access',
    'read' => 'can read',
    'update' => 'can update',
    'owner' => 'is owner'
];
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
            'name' => 'owner',
            'change' => 'unchanged',
            'updated' => false,
            'disabled' => true
        ],
        'permissions' => [
            'canjs' => 'owner',
            'enlightenment' => 'owner',
            'framasoft' => 'owner',
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
            'name' => 'read',
            'change' => 'unchanged',
            'updated' => false
        ],
        'permissions' => [
            'canjs' => 'read',
            'enlightenment' => 'read',
            'framasoft' => 'read',
        ]
    ],
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
            'name' => 'varies',
            'change' => 'unchanged',
            'updated' => false
        ],
        'permissions' => [
            'canjs' => 'read',
            'enlightenment' => 'update',
            'framasoft' => 'deny',
        ]
    ]
];

if(!empty($_GET['Users'])) {
    $users = array_merge($users,$_GET['Users']);
}
?>
<div class="form-content permission-edit">
    <ul id="js_permissions_list" class="permissions scroll mad_component_tree mad_view_component_tree ready">
<?php foreach ($users as $user) : ?>
        <li id="<?php echo $user['Permission']['id']; ?>" data-view-id="372"
            class="row direct-permission <?php if($user['Permission']['updated']) echo 'permission-updated'; ?>" >
            <div class="avatar">
                <img src="<?php echo $user['User']['avatar']; ?>" data-view-id="373">
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
                            class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_dropdown"
                            <?php if($user['Permission']['disabled']) echo 'disabled="disabled"';?>>
                        <?php if($user['Permission']['name'] == 'varies') : ?>
                        <option value="" data-view-id="376" <?php if($user['Permission']['name'] == 'varies') echo 'selected'; ?>>varies</option>
                        <? endif; ?>
                        <option value="1" data-view-id="376" <?php if($user['Permission']['name'] == 'read') echo 'selected'; ?>>can read</option>
                        <option value="7" data-view-id="377" <?php if($user['Permission']['name'] == 'update') echo 'selected'; ?>>can update</option>
                        <option value="15" data-view-id="378" <?php if($user['Permission']['name'] == 'owner') echo 'selected'; ?>>is owner</option>
                    </select>
                    <?php if($user['Permission']['name'] == 'varies') : ?>
                        <div href="#" class="more_details tooltip-alt">
                            <i class="fa fa-info-circle"></i>
                            <div class="tooltip-text right">
                                <b>no access</b>: canjs<br>
                                <b>can read</b>: Enlightenment, docker, kubernetes, CakePHP, passbolt<br>
                            </div>
                        </div>
                    <?php endif; ?>
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
