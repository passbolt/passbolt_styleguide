<script type="application/javascript">
  // DEMO ONLY -- not for production use
  $(function() {

    $('.tableview-content tr').draggable({
      cursor: "move",
      appendTo: "body",
      helper: function() {
        let content = $(this).find('td.cell_name')[0].innerText;
        let helper = $("<div>", {
          class: "drag-and-drop"
        });
        if ($(event.target).closest('table').find('input:checkbox:checked').length > 1) {
          helper = $("<div>", {
            class: "drag-and-drop-multiple"
          });
        }
        helper.append(`<span>${content}</span>`);
        return helper;
      },
      start: function (event, ui) {
        $(event.target).addClass('selected');
        $(event.target).find('input:checkbox').attr('checked', 'checked');
      },
      cursorAt: {
        top: 5,
        left: 5
      },
      opacity: "0.8",
      revert:  function(dropped) {
        let draggable = $(this);
        draggable.removeClass('selected');
        draggable.find('input:checkbox').removeAttr('checked');
        draggable.closest('table').find('tr.selected').removeClass('selected');
        draggable.closest('table').find('input:checkbox:checked').removeAttr('checked');
        let hasBeenDroppedBefore = draggable.data('hasBeenDropped');
        if (hasBeenDroppedBefore) {
          draggable.animate({ top: 0, left: 0 }, 'slow');
          return false;
        } else {
          return true;
        }
      }
    });

    const draggableElements = $('.folders .row:not(".disabled")');
    draggableElements.draggable({
      cursor: "move",
      appendTo: "body",
      start: function( event, ui ) {
        $(event.target).closest('li').find('.row').addClass('disabled');
      },
      helper: function() {
        let content = $(this).find('span.folder-name')[0].innerText;
        let helper = $("<div>", {
          class: "drag-and-drop"
        });
        helper.append(`<span>${content}</span>`);
        return helper;
      },
      cursorAt: {
        top: 5,
        left: 5
      },
      opacity: "0.8",
      revert:  function(event) {
        let draggable = $(this);
        draggable.closest('li').find('.row').removeClass('disabled');
        let hasBeenDroppedBefore = draggable.data('hasBeenDropped');
        if (hasBeenDroppedBefore) {
          draggable.animate({ top: 0, left: 0 }, 'slow');
          return false;
        } else {
          return true;
        }
      }
    });

    $('.folders .row:not(".disabled")').droppable({
      accept: function () {
        return draggableElements || '#4241e122-62d8-340c-a607-150d8ca0c5c5';
      },
      over: function(event, ui) {
        $(event.target).addClass('drop-focus');
        $(event.target).closest('li').find('.row.disabled').removeClass('passwords-folders-drop-focus-in');
      },
      out: function(event, ui) {
        $(event.target).removeClass('drop-focus');
      },
      drop: function(event, ui) {
        $(event.target).removeClass('drop-focus');
        $(ui.draggable).data('hasBeenDropped', true);
        $('#js_app_notificator .message.animated').addClass('fadeInUp').html('<strong>Success</strong> Dropped successfully!')
      }
    });

    $('.folder-tree li').droppable({
      accept: $('.tableview-content tr'),
      over: function(event, ui) {
        $(event.target).addClass('drop-focus');
      },
      out: function(event, ui) {
        $(event.target).removeClass('drop-focus');
      },
      drop: function(event, ui) {
        $(event.target).removeClass('tag-drop');
        $(ui.draggable).data('hasBeenDropped', true);
        $('#js_app_notificator .message.animated').addClass('fadeInUp').html('<strong>Success</strong> Tagged successfully!')
      }
    });
    
    $('ul#js_wsp_password_filter_tags_list li').droppable({
      accept: $('.tableview-content tr'),
      over: function(event, ui) {
        $(event.target).addClass('drop-focus');
      },
      out: function(event, ui) {
        $(event.target).removeClass('drop-focus');
      },
      drop: function(event, ui) {
        $(event.target).removeClass('tag-drop');
        $(ui.draggable).data('hasBeenDropped', true);
        $('#js_app_notificator .message.animated').addClass('fadeInUp').html('<strong>Success</strong> Tagged successfully!')
      }
    });
  });
</script>