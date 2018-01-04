<div class="col3 profile-wrapper">
	<div id="js_app_profile_dropdown"
			 class="user profile dropdown passbolt_controller_component_profile_dropdown_controller mad_view_component_button_dropdown js_component ready">
		<div class="center-cell-wrapper">
			<div class="details center-cell">
				<span class="name">Ada Lovelace</span>
				<span class="email">ada@passbolt.com</span>
			</div>
		</div>
		<div class="picture left-cell">
			<img src="img/avatar/user.png" alt="your picture">
		</div>
		<div class="more right-cell">
			<a href="#"><span>more</span></a>
		</div>
		<ul class="dropdown-content right mad_controller_component_menu_controller mad_view_component_tree menu ready"
				id="7f698bbc-95d5-c5f7-c35a-c3225a5aa45b">
			<li id="99f5527d-ca11-8fff-d129-3d3baae51d3e" class="ready">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="../demo/LU_users_profile.php"><span>my profile</span></a>
						</div>
					</div>
				</div>
			</li>
			<li id="b3a82a3b-78c7-5b20-08fa-507e0c9c292d" class="ready">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="#"><span>manage or generate new keys</span></a>
						</div>
					</div>
				</div>
			</li>
			<li id="02ce93d8-9795-08b2-9230-f304abef7d8d" class="separator-after ready">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="#"><span>manage people</span></a>
						</div>
					</div>
				</div>
			</li>
			<li id="afe3c814-a0fb-04e5-e4b0-64f8717a3a33" class="ready">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="#"><span>logout</span></a>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</div>
<script type="application/javascript">
	$(function() {
		$('#js_app_profile_dropdown .more').click(function() {
			$('#js_app_profile_dropdown .dropdown-content').css('display','block');
			return false;
		});
		$('html body').click(function(){
			$('#js_app_profile_dropdown .dropdown-content').css('display','none');
		});
	});
</script>