<?php include(dirname(__DIR__) . '../../fixtures/tags.php'); ?>
<div class="navigation flat tree closed accordion groups passbolt_component_password_filters js_component mad_view ready" id="js_wsp_pwd_password_filter_group">
    <ul id="js_wsp_pwd_password_filter_group_selector">
        <li class="open node root group-header">
            <div class="row title">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <h3><a href="#">Filter by tags</a></h3>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <ul id="js_wsp_password_filter_groups_list" class="passbolt_component_password_filters_groups_list tree passbolt_view_component_groups_list ready">
<?php $i =0; foreach ($tags as $tag) : $i++; ?>
            <li class="open node root group-item" id="group_<?= $tag['id']; ?>" data-view-id="<?= $i; ?>">
                <div class="row">
                    <div class="main-cell-wrapper">
                        <div class="main-cell">
                            <a href="#" title="Leadership team'" data-view-id="<?= $i; ?>"><span><?= $tag['name']; ?></span></a>
                        </div>
                    </div>
                </div>
            </li>
<?php endforeach; ?>
    </ul>
</div>