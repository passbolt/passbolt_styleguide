<div class="notification-container">
	<div id="js_app_notificator" class="notification passbolt_controller_component_notification_controller">
        <span class="message animated fadeInUp success">
            <strong>Error</strong>
            this is a fake and very long error message
        </span>
	</div>
</div>
<script type="application/javascript">
    $(function() {
        function fade_out() {
          var selection = window.getSelection().toString();
          if (selection === '') {
            $('#js_app_notificator .message.animated').removeClass('fadeInUp').addClass('fadeOutUp');
          }
        }
        $('#js_app_notificator').click(function() {
            fade_out();
        });
        setTimeout(fade_out, 5000);
    });
</script>