<?php include(dirname(__DIR__) . '../../fixtures/groups.php'); ?>
<div id="js_wsp_pwd_password_filter_group" class="navigation accordion" >
    <ul id="js_wsp_pwd_password_filter_group_selector" class="accordion-header">
        <li class="open node root">
            <div class="row title">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <h3><a href="#">Filter by groups</a></h3>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <ul id="js_wsp_password_filter_groups_list" class="accordion-content ready">
<?php foreach ($groups as $i => $group): if ($i > 7) break; ?>
        <li class="open node root group-item" id="group_<?= $group['id']; ?>" data-view-id="<?= $i; ?>">
            <div class="row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a href="#" title="Leadership team'" data-view-id="<?= $i; ?>"><span><?= $group['name']; ?></span></a>
                    </div>
                </div>
            </div>
        </li>
<?php endforeach; ?>
    </ul>
</div>