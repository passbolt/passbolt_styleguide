<!-- tags nav header context switch -->
﻿<ul id="js_contextual_menu_tag_header" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready">
    <li id="js_contextual_menu_tag_header_all" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>All tags</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_contextual_menu_tag_header_mine" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="#"><span>Only my tags</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<script type="application/javascript">
  // DEMO ONLY -- not for production use
  $(function() {
    // tag header actions
    $('#js_wsp_pwd_password_filter_tag_selector .more-ctrl').click(function () {
      var p = $(this).offset();
      p.top += 16;
      p.left -= 4;
      $('#js_contextual_menu_tag_header').css('display','block').css('left', p.left).css('top', p.top);
      return false;
    });
    // hide everything
    $('html body').click(function(){
      $('#js_contextual_menu_tag_header').css('display','none');
    });
  });
</script>