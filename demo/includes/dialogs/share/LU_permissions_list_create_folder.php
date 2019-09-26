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
            'name' => 'owner',
            'change' => 'Will be added',
            'updated' => false
        ]
    ]
    
];

if(!empty($_GET['Users'])) {
    $users = array_merge($users,$_GET['Users']);
}
?>
<div id="js_folder_permissions" class="folders-permissions">
  <div class="form-content permission-edit">
      <ul id="js_permissions_list" class="permissions scroll mad_component_tree mad_view_component_tree ready">
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
                      <div class="more_details tooltip-alt">
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
                      <select disabled="disabled" id="js_share_perm_type_<?php echo $user['Permission']['id']; ?>"
                              class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_dropdown">
                          <option value="1" data-view-id="376" <?php if($user['Permission']['name'] =='read') echo 'selected'; ?>>can read</option>
                          <option value="7" data-view-id="377" <?php if($user['Permission']['name'] =='update') echo 'selected'; ?>>can update</option>
                          <option value="15" data-view-id="378" <?php if($user['Permission']['name'] =='owner') echo 'selected'; ?>>is owner</option>
                      </select>
                  </form>
              </div>
              <div class="actions">
                  <a disabled="disabled" id="js_share_perm_delete_<?php echo $user['Permission']['id']; ?>" href="#"
                    class="js_perm_delete permission-close close mad_component_button js_component mad_view disabled" title="remove"
                    data-view-id="372">
                      <span class="svg-icon">
                        <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
                      </span>
                      <span class="visuallyhidden">remove</span>
                  </a>
              </div>
          </li>
  <?php endforeach; ?>
      </ul>
  </div>
</div>