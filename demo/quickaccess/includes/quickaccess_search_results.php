<div class="container page quickaccess">
    <?php include('components/quickaccess_header.php'); ?>
    <div class="index-list">
        <?php include('components/quickaccess_search.php'); ?>
        <div class="list-container" data-simplebar>
            <div class="list-section">
                <div class="list-title">
                    <h2>Suggested</h2>
                </div>
                <ul class="list-items">
                    <li class="resource-entry">
                        <a href="#">
                            <span class="title">Twitter</span>
                            <span class="username">(@passbolt)</span>
                            <span class="url">https://www.twitter.com/auth/login</span>
                        </a>
                    </li>
                    <li class="resource-entry">
                        <a href="#">
                            <span class="title">Twitter2</span>
                            <span class="username">(@passbolt2)</span>
                            <span class="url">https://www.twitter.com/auth/login</span>
                        </a>
                    </li>
                    <li class="resource-entry">
                        <a href="#">
                            <span class="title">Twitter3</span>
                            <span class="username">(@passbolt2)</span>
                            <span class="url">https://www.twitter.com/auth/login</span>
                        </a>
                    </li>
                </ul>
            </div>
            <?php include('components/quickaccess_index_filters.php'); ?>
        </div>
        <?php include('components/quickaccess_submit_create.php'); ?>
    </div>
</div>