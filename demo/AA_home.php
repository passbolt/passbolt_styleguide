<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbot | The open source password manager for teams</title>
    <?php include('includes/AA_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="css/public.css" />
</head>
<body>
<div id="container" class="page home">
<?php include('includes/AA_header_prelaunch.php'); ?>
    <div class="page-row three-little-birds">
        <div class="grid grid-responsive-12">
            <div class="row ">
                <div class="col12">
                    <div class="logo bigger no-img">
                        <h1><span>Passbolt</span></h1>
                    </div>
                    <div class="teaser-text">
                        <p>
                            The password manager your team was waiting for.
                            Free, open source, extensible, GPG based.
                        </p>
                    </div>
                    <div class="call-to-action">
                        <a href="AN_login.php" class="button primary">
                            Try out the demo!
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="page-row features">
        <h2>Available now on firefox!</h2>
        <h2>and yes, a chrome add-on is on the roadmap</h2>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/AN_login.jpg" />
                    <h3>Authenticate using your gpg key</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/LU_password_share.jpg" />
                    <h3>Share passwords with your team</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/LU_passwords.jpg" />
                    <h3>Search and filter on passwords</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/LU_users.jpg" />
                    <h3>Manage your team members</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/LU_password_edit.jpg" />
                    <h3>Edit and review your password complexity</h3>
                </div>
                <div class="swiper-slide">
                    <img src="../src/img/screenshots/LU_profile_keyring.jpg" />
                    <h3>Import and export your gpg keys</h3>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
    </div>

    <div class="page-row cli">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col5">
                    <h2>Coming soon to a terminal near you!</h2>
                    <p>
                        Because system administrator appreciation day should be everyday we started building
                        a client based on nodejs. Come join us!
                    </p>
                    <a href="#" class="button cancel big">
                        <i class="fa fa-fw fa-github"></i>
                        Show me the code!
                    </a>
                </div>
                <div class="col7 last">
                    <div class="cli-window">
                        <div class="cli-header"><span class="visuallyhidden">Command line example</span></div>
                        <div class="cli-code">
<pre>
$ passbolt find --name=root@192.168.0.1
d1acbfc1-78d8-3e25-ad8b-7ab1eb0332dc

$ passbolt get d1acbfc1-78d8-3e25-ad8b-7ab1eb0332dc
-----BEGIN PGP MESSAGE-----
Version: GnuPG v2

hQIMAw0P12ReHhxtAQ//cgr5H+SxUNoIoLsACRlyPDyXeZ6Liyksv
TB9RVSuuO225+HgQUwkRIUQ6ufyGi/VXlw2uwrDdixhWQ600UwSQN
k7pogSmKC4bCiEWy/NGlZz6hscz0hN89c+tx3wjFRsXnGsvKVnRCM
FN/pSWklYlym1Se+0banl3/EPve2
=Bhgw
-----END PGP MESSAGE-----

$ gpg --decrypt $(passbolt get last)
please enter passphrase: <span class="blink seriously">█</span>
</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-row howitworks">
        <h2>How does collaboration works in passbolt?</h2>
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col12">
                    <img src="../src/img/diagrams/howitworks.svg" alt="diagram showing how it works"/>
                    <div class="visuallyhidden">
                        <ol>
                            <li>Ada have a password to share with betty</li>
                            <li>Ada encrypt the secret using passbolt plugin,</li>
                            <li>and Betty public key!</li>
                            <li>The the secret is sent encrypted over HTTPS</li>
                            <li>and stored on the passbolt server!</li>
                            <li>Betty receive and email notification</li>
                            <li>Betty logs in passsbolt with the CLI or web app</li>
                            <li>Then using her private key,</li>
                            <li>Betty decrypts the password and uses it to login!</li>
                        </ol>
                    </div>
                </div>
            </div>
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
                            It works with tools your team already uses such as your email client and chat.
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
                        <div class="tile-title">Extensible by design</div>
                        <div class="tile-description">
                            Start building on top of our API to get more of your password solution.
                        </div>
                    </div>
                </div>
                <div class="col6 last">
                    <div class="tile first">
                        <div class="tile-teaser"><i class="gnupg"></i></div>
                        <div class="tile-title">Embrace open security standards</div>
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
                             Half of the code base is there to make sure the other half is behaving.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row call-to-action">
                <div class="col12">
                    <a href="AN_login.php" class="button primary big">Try out the demo!</a>
                </div>
            </div>
        </div>
    </div>

    <div class="page-row api">
        <div class="api-wrapper">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col6 explain">
                    <h2>Discover passbolt API</h2>
                    <div class="teaser-text">
                        <p>
                            Our long term vision is to play nice with others. We aim to provide integrations with other
                            password managers, keyrings and user management services instead of trying to replace them.
                        </p>
                        <p>
                            Obviously there is still a long way to go, but for now you can already build custom
                            integrations by taking advantage of the JSON API.
                        </p>
                        <p>
                            Did we mention we also provide a styleguide in case you want to customize passbolt look
                            and feel?
                        </p>
                    </div>
                    <div class="call-to-action">
                        <a href="AN_login.php" class="button cancel big">
                            <i class="fa fa-fw fa-github-alt"></i>
                            Browse the code
                        </a>
                        <span class="button-spacer">or</span>
                        <a href="AN_login.php" class="button primary big">
                            Read the doc!
                        </a>
                    </div>
                </div>
                <div class="col5 push1 last show">
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="page-row signup">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col12 last">
                    <h2>Let's keep in touch!</h2>
                </div>
            </div>
            <div class="row">
                <div class="col8 newsletter">
                    <div class="registration form">
                        <form action="/" id="RegistrationsPrelaunchForm" method="post" accept-charset="utf-8"><div style="display:none;"><input type="hidden" name="_method" value="POST"/></div>
                            <div class="inline email input">
                            <label for="RegistrationEmail">Signup to the newsletter</label>
                            <input name="data[Registration][email]" class="required fluid" placeholder="Your email" type="email" id="RegistrationEmail" required="required"/></div>
                            <div class="submit"><input  class="button primary" type="submit" value="subscribe"/></div>
                            <div class="smallprint"><a href="#">We respect your privacy.</div>
                        </form>
                    </div>
                </div>
                <div class="col4 last social">
                    <a href="https://www.twitter.com/passbolt">
                        <i class="fa fa-fw fa-twitter-square"></i>
                    </a>
                    <a href="https://www.facebook.com/passbolt">
                        <i class="fa fa-fw fa-facebook-square"></i>
                    </a>
                    <a href="https://www.github.com/passbolt">
                        <i class="fa fa-fw fa-github-square"></i>
                    </a>
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