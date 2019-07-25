﻿<ul id="js_contextual_menu" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready" >
    <li id="js_password_browser_menu_share" data-view-id="374">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Edit</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_delete" data-view-id="375">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Delete</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_share" data-view-id="377" class="disabled">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Reset MFA</span></a>
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