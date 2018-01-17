<?php include(dirname(__DIR__) . '../../fixtures/tags.php'); ?>
<div id="js_wsp_password_filter_tags" class="open navigation accordion js_component mad_view ready">
    <ul id="js_wsp_pwd_password_filter_tag_selector" class="accordion-header">
        <li class="open node root">
            <div class="row title">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <h3><a href="#" class="accordion-trigger">Filter by tags</a></h3>
                    </div>
                </div>
                <div class="right-cell more-ctrl">
                    <a href="#" class="filter"><span>more</span></a>
                </div>
            </div>
        </li>
    </ul>
    <ul id="js_wsp_password_filter_tags_list" class="accordion-content">
<?php foreach ($tags as $i => $tag) : ?>
            <li class="open node root tag-item" id="tag_<?= $tag['id']; ?>" data-view-id="<?= $i; ?>">
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
