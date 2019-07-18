<script type="application/javascript">
  // DEMO ONLY -- not for production use
  $(function() {
    $('.announcement-close').click(function(e) {
      $('.announcement').remove();
      e.preventDefault();
      return false;
    });
  });
</script>
<div class="announcement">
    We have upgraded the privacy policy.
    <a href="#">Read more!</a>
    <a class="announcement-close" role="button" href="#">
        <i class="fa fa-close"></i>
        <span class="visuallyhidden">Close</span>
    </a>
</div>
