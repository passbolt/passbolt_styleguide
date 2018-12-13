<div class="container page quickaccess">
    <?php include('components/quickaccess_header.php'); ?>
    <div class="index-list">
        <?php include('components/quickaccess_search.php'); ?>
        <div class="back-link">
            <a href="#" class="primary-action">
               <span class="icon fa">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
               </span>
                <span class="primary-action-title">Groups</span>
            </a>
            <a href="#" class="secondary-action button-icon button">
                <span class="fa icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                </span>
                <span class="visually-hidden">cancel</span>
            </a>
        </div>
        <div class="list-container" data-simplebar>
            <ul class="list-items">
                <?php include(dirname(__DIR__) . '../../fixtures/groups.php'); ?>
                <?php foreach($groups as $group): ?>
                <li class="filter-entry">
                    <a href="#filters">
                        <span class="filter"><?= $group['name']; ?></span>
                    </a>
                </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php include('components/quickaccess_submit_create.php'); ?>
    </div>
</div>