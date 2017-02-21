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
                'data-view-id' => '372',
                'name' => 'owner',
                'change' => 'unchanged'
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
                'data-view-id' => '380',
                'name' => 'update',
                'change' => 'unchanged'
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
                'name' => 'read',
                'change' => 'unchanged'
            ]
        ],
    ];
foreach ($users as $user) : ?>
<li id="<?php echo $user['Permission']['id']; ?>" class="row direct-permission" data-view-id="372">
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
            <a href="#"><?php echo $user['Permission']['change']; ?></a>
        </div>
    </div>
    <div class="select rights">
        <form id="js_share_rs_perm_<?php echo $user['Permission']['id']; ?>" class="js_perm_edit_form" data-view-id="372">
            <select id="js_share_perm_type_<?php echo $user['Permission']['id']; ?>"
                    class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_dropdown">
                <option value="1" data-view-id="376" <?php if($user['Permission']['name'] =='read') echo 'selected'; ?>>can read</option>
                <option value="7" data-view-id="377" <?php if($user['Permission']['name'] =='update') echo 'selected'; ?>>can update</option>
                <option value="15" data-view-id="378" <?php if($user['Permission']['name'] =='owner') echo 'selected'; ?>>is owner</option>
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
