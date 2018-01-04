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
<!-- should go at page bottom -->
<script src="js/swiper.jquery.min.js"></script>
<script type="application/javascript">
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
