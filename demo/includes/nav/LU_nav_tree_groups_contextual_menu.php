<!-- groups nav header context switch -->
﻿<ul id="js_contextual_menu_group_header" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready">
    <li id="js_contextual_menu_group_header_all" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>All groups</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_contextual_menu_group_header_manager" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Groups I manage</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_contextual_menu_group_header_manager" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Groups I am a member of</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<!-- group item action -->
﻿<ul id="js_contextual_menu_group_edit" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready">
    <li id="js_group_browser_menu_edit" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Edit Group</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_group_browser_menu_delete" class="ready closed" data-view-id="375">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="../demo/AD_users_delete_group_confirmation.php"><span>Delete Group</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<script type="application/javascript">
    // DEMO ONLY -- not for production use
    $(function() {
        // group header actions
        $('.navigation.groups .group-header .more-ctrl').click(function() {
            var p = $(this).offset();
            p.top += 16;
            p.left -= 4;
            $('#js_contextual_menu_group_edit').css('display','none');
            $('#js_contextual_menu_group_header').css('display','block').css('left', p.left).css('top', p.top);
            return false;
        });
        // group item actions
        $('.navigation.groups .group-item .more-ctrl').click(function() {
            var p = $(this).offset();
            p.top += 16;
            p.left -= 4;
            $('#js_contextual_menu_group_header').css('display','none');
            $('#js_contextual_menu_group_edit').css('display','block').css('left', p.left).css('top', p.top);
            return false;
        });
        // hide everything
        $('html body').click(function(){
            $('#js_contextual_menu_group_edit').css('display','none');
            $('#js_contextual_menu_group_header').css('display','none');
        });
    });
</script>