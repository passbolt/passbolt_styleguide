<!-- group item action -->
﻿<ul id="js_contextual_menu_tag_edit" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready">
    <li id="js_tag_browser_menu_edit" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/LU_tags_edit.php"><span>Edit Tag</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_delete_browser_menu_delete" class="ready closed" data-view-id="375">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/LU_tags_delete_confirmation.php"><span>Delete Tag</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<script type="application/javascript">
    // DEMO ONLY -- not for production use
    $(function() {
        // group item actions
        $('.navigation.tags .tag-item .more-ctrl').click(function() {
            var p = $(this).offset();
            p.top += 16;
            p.left -= 4;
            $('#js_contextual_menu_tag_edit').css('display','block').css('left', p.left).css('top', p.top);
            return false;
        });
        // hide everything
        $('html body').click(function(){
            $('#js_contextual_menu_tag_edit').css('display','none');
        });
    });
</script>