﻿<ul id="js_contextual_menu" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready" >
    <li id="js_password_browser_menu_copy_username" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Copy username</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_copy_password" class="ready closed" data-view-id="370">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Copy password</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_copy_uri" class="ready closed" data-view-id="371">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Copy URI</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_open_uri" class="separator-after ready closed" data-view-id="372">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Open URI in a new tab</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_edit" class="ready closed" data-view-id="373">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Edit</span></a>
                </div>
            </div>
        </div>
    </li><li id="js_password_browser_menu_share" class="disabled closed" data-view-id="374">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Share</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_delete" class="ready closed" data-view-id="375">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Delete</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<script type="application/javascript">
    // DEMO ONLY -- not for production use
    $(function() {
        var mouse = { x: -1, y: -1 };
        $(document).mousemove(function(event) {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        });

        $('.tableview-content tr').contextmenu(function() {
            $('#js_contextual_menu').css('display','block').css('left', mouse.x).css('top', mouse.y);
            return false;
        });
        $('html body').click(function(){
            $('#js_contextual_menu').css('display','none');
        });
    });
</script>