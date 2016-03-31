<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbot | The open source password manager for teams</title>
    <?php include('includes/AA_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="css/public.css" />
    <style>
    </style>
</head>
<body>
<div id="container" class="page home">
<?php include('includes/AA_header_prelaunch.php'); ?>
    <div class="page-row three-little-birds">
        <div class="logo no-img">
            <h1><span>Passbolt</span></h1>
        </div>
        <div class="teaser-text">
            <p>
                The password manager your team was waiting for.<br>
                Free, open source, extensible.
            </p>
        </div>
        <div class="call-to-action">
            <a href="AN_login.php" class="button primary">Try the online demo</a>
        </div>
    </div>
    <div class="page-row features">
        <h2>Available now on firefox & chrome is coming soon!</h2>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/teaser-screenshot-login.png" />
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    <h3>GPG based authentication</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/teaser-screenshot-share.png" />
                    <h3>Share passwords with your team</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/teaser-screenshot4.png" />
                    <h3>Search and filter on passwords</h3>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
    <div class="page-row usp">
        <h2>How is passbolt different from other password managers?</h2>
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col6">
                    <div class="tile">
                        <div class="tile-teaser"><i class="slack"></i></div>
                        <div class="tile-title">Built for teams</div>
                        <div class="tile-description">
                            Works with tools your team already use such as your email client and chat.
                        </div>
                    </div>
                    <div class="tile">
                        <div class="tile-teaser"><i class="opensource"></i></div>
                        <div class="tile-title">Open source & free</div>
                        <div class="tile-description">
                            Run it on your own servers. Customize it and share back the changes.
                        </div>
                    </div>
                    <div class="tile">
                        <div class="tile-teaser"><i class="json"></i></div>
                        <div class="tile-title">API & extensible design</div>
                        <div class="tile-description">
                            Build on top of our API to get more of your password solution.
                        </div>
                    </div>
                </div>
                <div class="col6 last">
                    <div class="tile first">
                        <div class="tile-teaser"><i class="gnupg"></i></div>
                        <div class="tile-title">Built on security standards</div>
                        <div class="tile-description">
                            Secrets are encrypted in a browser extension using GPG and sent over SSL.
                        </div>
                    </div>
                    <div class="tile first">
                        <div class="tile-teaser"><i class="docker"></i></div>
                        <div class="tile-title">Top of the line tooling</div>
                        <div class="tile-description">
                            We ship with tools and code standards your admin team will like to work with.
                        </div>
                    </div>
                    <div class="tile first">
                        <div class="tile-teaser"><i class="jenkins"></i></div>
                        <div class="tile-title">Methodically tested</div>
                        <div class="tile-description">
                             Half of the code base is there to make sure the other half is bug free.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php include('includes/AN_footer.php'); ?>
</div>
<script src="js/jquery-2.1.3.min.js"></script>
<script src="js/swiper.jquery.min.js"></script>
<script>
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        keyboardControl: true,
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : false
        },
        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    })
</script>
</body>
</body>
</html>