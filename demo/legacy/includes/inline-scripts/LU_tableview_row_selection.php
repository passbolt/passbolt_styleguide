<script type="application/javascript">
  // DEMO ONLY -- not for production use
  $(function () {
    $('.tableview-content tr').click(function (event) {
      if ($(event.target).closest('tr').hasClass('selected')) {
        $(event.target).closest('tr').removeClass('selected');
        $(event.target).closest('tr').find('input:checkbox').removeAttr('checked');
      } else {
        $(event.target).closest('tr').addClass('selected');
        $(event.target).closest('tr').find('input:checkbox').attr('checked', 'checked');
      }
      $('.passbolt_view_component_resource_sidebar').css('display', 'none');

    });
  });
</script>
