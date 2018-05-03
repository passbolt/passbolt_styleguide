<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_iframe.php'); ?>
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
	<script type="application/javascript">
		$(document).ready(function () {
			$(window).one('click', function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				$('.autocomplete-content')
					.addClass('loading');
				$('.autocomplete-content ul')
					.empty();

				$('.autocomplete-content ul').click(function () {
					$('.autocomplete-content')
						.removeClass('loading')
						.addClass('loaded');
					var emptyHtml = '<div class="row"> \
						<div class="main-cell-wrapper"> \
							<div class="main-cell"> \
								No user found \
							</div> \
						</div> \
					</div>';
					$('.autocomplete-content ul')
						.append(emptyHtml);
				});
			});
		});
	</script>
</head>
<body class="iframe">
<div class="autocomplete-content scroll">
	<ul>
		<li id="1c137bd7-2838-3c3d-a021-d2986d9126f5">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#">
							<div class="avatar">
								<img src="img/avatar/user.png"/>
							</div>
							<div class="user">
								<span class="name">Frances Allen (57DE7D79)</span>
								<span class="details" title="frances@passbolt.com">frances@passbolt.com</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</li>
		<li id="201b442c-d6ca-3ee6-a443-ce669ca0ec6e">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#">
							<div class="avatar">
								<img src="img/avatar/user.png"/>
							</div>
							<div class="user">
								<span class="name">Kathleen Antonelli (12345678)</span>
								<span class="details" title="kathleen@passbolt.com">kathleen@passbolt.com</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</li>
		<li id="7c7afd29-1b98-3c3e-ae55-adedc333fb4b">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#">
							<div class="avatar">
								<img src="img/avatar/group_default.png"/>
							</div>
							<div class="user">
								<span class="name">IT Support</span>
								<span class="details" title="5 members">5 Members</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</li>
		<li id="c996e4e9-e4c9-310a-a263-178b45b61b3c">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#">
							<div class="avatar">
								<img src="img/avatar/user.png"/>
							</div>
							<div class="user">
								<span class="name">Edith Clarke (12345678)</span>
								<span class="details" title="edith@passbolt.com">edith@passbolt.com</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</li>
		<li id="abfd50cb-ff86-36c4-a8c8-af176b201123">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#">
							<div class="avatar">
								<img src="img/avatar/user.png"/>
							</div>
							<div class="user">
								<span class="name">Irène Greif (87654321)</span>
								<span class="details" title="irene@passbolt.com">irene@passbolt.com</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</li>
		<!--	<li id="dc8d196f-f7e9-3531-a9de-b15a3b48b11b">-->
		<!--		<div class="row">-->
		<!--			<div class="main-cell-wrapper">-->
		<!--				<div class="main-cell">-->
		<!--					<a href="#">-->
		<!--						<div class="avatar">-->
		<!--							<img src="img/avatar/user.png"/>-->
		<!--						</div>-->
		<!--						<div class="user">-->
		<!--							<span class="name">Betty Holberton</span>-->
		<!--							<span class="details" title="57DE7D79ABE733A235EB1F84CDF8FC8682945D3E">57DE7D79ABE733A235EB1F84CDF8FC8682945D3E</span>-->
		<!--						</div>-->
		<!--					</a>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</div>-->
		<!--	</li>-->
		<!--	<li id="c6855b6d-6cec-3f2f-ade5-398a8c4a7c03">-->
		<!--		<div class="row">-->
		<!--			<div class="main-cell-wrapper">-->
		<!--				<div class="main-cell">-->
		<!--					<a href="#">-->
		<!--						<div class="avatar">-->
		<!--							<img src="img/avatar/user.png"/>-->
		<!--						</div>-->
		<!--						<div class="user">-->
		<!--							<span class="name">Grace Hopper</span>-->
		<!--							<span class="details" title="57DE7D79ABE733A235EB1F84CDF8FC8682945D3E">57DE7D79ABE733A235EB1F84CDF8FC8682945D3E</span>-->
		<!--						</div>-->
		<!--					</a>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</div>-->
		<!--	</li>-->
	</ul>
</div>
</body>
</html>