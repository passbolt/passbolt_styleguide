<script>
  // DEMO ONLY -- not for production use
  $(function () {
    $(".js_grid_column_avatar.grid_column_avatar img").on("error", function (event) {

      const colorsArray = ['dc4242', '4990e2', '4ad4b6', 'da3549', 'd5783b', '7d54d6', 'e259a6', '50e3c2', 'db8d5a', 'cee14a'];
      $(this).hide();
      const str = $(event.target).closest('tr').find('td.js_grid_column_name')[0].innerText,
        firstname = str.substr(0, str.indexOf(' ')).charAt(0),
        lastname = str.substr(str.lastIndexOf(' ') + 1).charAt(0),
        color = `#${colorsArray[((str.length) % 10)]}`;
      let getLabel = `${firstname}${lastname}`;
      let labelName = getLabel.toUpperCase();
      $(event.target).closest('tr').find('.js_grid_column_avatar.grid_column_avatar div').css({'background': color}).addClass('text-label').text(labelName);
    });
  });
</script>