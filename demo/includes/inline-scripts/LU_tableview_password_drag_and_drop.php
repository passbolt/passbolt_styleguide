<script type="application/javascript">
  // DEMO ONLY -- not for production use
  let dragFeedbackElement = null;

  function handleFoldersListDragStartEvent(event) {
    $(event.target).closest('li').find('.row').addClass('disabled');
    const folderName = event.target.title;
    addFoldersListDragGhostFeedback(event, folderName);
  }

  function handleFoldersListDragEndEvent(event) {
    $(event.target).closest('li').find('.row').removeClass('disabled');
    dragFeedbackElement.remove();
  }

  function handleFoldersListDragOverEvent(event) {
    event.preventDefault();
    $(event.target).closest('li .row').addClass('drop-focus');
  }

  function handleFoldersListDragLeaveEvent(event) {
    $(event.target).closest('li .row').removeClass('drop-focus');
  }

  function handleFoldersListDropEvent(event) {
    $(event.target).closest('li .row').removeClass('drop-focus');
    return true;
  }

  function addFoldersListDragGhostFeedback(event, folderName) {
    dragFeedbackElement = document.createElement('div');
    dragFeedbackElement.className = "drag-and-drop";
    // dragFeedbackElement.style.cursor = "move"; // does not work
    dragFeedbackElement.style.top = "-1000px";
    const dragFeedbackText = document.createTextNode(folderName);
    dragFeedbackElement.appendChild(dragFeedbackText);
    document.body.appendChild(dragFeedbackElement);
    event.dataTransfer.setDragImage(dragFeedbackElement, 5, 5);
  }

  function handleGridDragStartEvent(event) {
    const foldersNames = [];
    const checkedElements = $(event.target).closest('table').find('input:checkbox:checked');
    checkedElements.each((index, element) => {
      foldersNames.push(element.closest('tr').title);
    });
    addGridDragGhostFeedback(event, foldersNames);
  }

  function handleGridDragEndEvent(event) {
    dragFeedbackElement.remove();
  }

  function addGridDragGhostFeedback(event, foldersNames) {
    const isMultiple = foldersNames.length > 1;
    dragFeedbackElement = document.createElement('div');
    dragFeedbackElement.className = isMultiple ? "drag-and-drop-multiple" : "drag-and-drop";
    // dragFeedbackElement.style.cursor = "move"; // does not work
    dragFeedbackElement.style.top = "-1000px";
    const dragFeedbackText = document.createTextNode(foldersNames[0]);
    dragFeedbackElement.appendChild(dragFeedbackText);

    // Display the number of selected folders.
    if (isMultiple) {
      const dragFeedbackCountElement = document.createElement('span');
      dragFeedbackCountElement.className = "count";
      const dragFeedbackCountText = document.createTextNode(foldersNames.length);
      dragFeedbackCountElement.appendChild(dragFeedbackCountText);
      dragFeedbackElement.appendChild(dragFeedbackCountElement);
    }

    document.body.appendChild(dragFeedbackElement);
    event.dataTransfer.setDragImage(dragFeedbackElement, 5, 5);
  }

  $(function () {
    // Initialize drag & drop for the sidebar folders list.
    $('.folders .row').each((index, row) => {
      row.addEventListener('dragstart', (event) => handleFoldersListDragStartEvent(event));
      row.addEventListener('dragend', (event) => handleFoldersListDragEndEvent(event));
      row.addEventListener('dragover', (event) => handleFoldersListDragOverEvent(event));
      row.addEventListener('dragleave', (event) => handleFoldersListDragLeaveEvent(event));
      row.addEventListener('drop', (event) => handleFoldersListDropEvent(event));
    });

    // Initialize drag & drop for the grid component.
    $('#js_wsp_pwd_browser .tableview-content tr').each((index, row) => {
      row.addEventListener('dragstart', (event) => handleGridDragStartEvent(event));
      row.addEventListener('dragend', (event) => handleGridDragEndEvent(event));
    });
  });
</script>