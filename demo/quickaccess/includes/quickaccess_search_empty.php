<div class="container page quickaccess">
    <?php include('components/quickaccess_header.php'); ?>
    <div class="index-list">
        <?php include('components/quickaccess_search.php'); ?>
        <div class="list-container scrollbar">
            <div class="list-section">
                <div class="list-title">
                    <h2>Suggested</h2>
                </div>
                <ul class="list-items">
                    <li class="empty-entry">
                        <p>No passwords found for the current page. You can use the search.</p>
                    </li>
                </ul>
            </div>
            <?php include('components/quickaccess_index_filters.php'); ?>
        </div>
        <?php include('components/quickaccess_submit_create.php'); ?>
    </div>
</div>