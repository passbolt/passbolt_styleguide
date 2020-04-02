<div id="js_app_loading_bar"
		 class="update-loading-bar passbolt_controller_component_loading_bar_controller passbolt_view_component_loading_bar js_component ready">
	<div class="progress-bar">
		<span style="width:0%;"></span>
	</div>
</div>
<script type="application/javascript">
    $(function(){
      $(".progress-bar span").animate({width:'100%'}, 500).fadeOut();
    });
</script>