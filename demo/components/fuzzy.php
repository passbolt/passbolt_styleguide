<!DOCTYPE html>
<html>
<head>
	<meta charset=utf-8 />
	<base href="../../src/">
	<script type="text/javascript" src="js/jquery-2.2.4.min.js"></script>
	<script src="js/list.min.js"></script>
	<script src="js/list.fuzzysearch.min.js"></script>
	<title>JS Bin</title>
</head>
<body >
<div  id="faq-list" class="page background">
	<!-- first header -->
	<?php include('includes/headers/AA_header.php'); ?>

	<!-- second header -->
	<div class="header second">
		<div class="col1">
			<div class="logo ">
				<h1><span>Passbolt</span></h1>
			</div>
		</div>
		<div class="col2 search-wrapper">
			<h2 class="visuallyhidden"><span>Frequently Asked questions</span></h2>
			<!-- if js is enabled only -->
			<div>
					<div class="input  required">
						<label for="filter_faq">Search</label>
						<input id="filter_faq" maxlength="50" placeholder="search frequently asked questions" type="search" class="fuzzy-search">
					</div>
					<button value="search">
						<i class="fa fa-fw fa-search"></i>
						<span class="text visuallyhidden">search</span>
					</button>
			</div>
		</div>
	</div>

	<div class="panel main ">
		<!-- main -->
		<div class="panel middle" data-spy="scroll" data-target=".scrollspy">
			<div class="grid grid-responsive-12">
				<article>
					<ul class="list">
						<li><p class="name">Guybrush Threepwood</p></li>
						<li><p class="name">Elaine Marley</p></li>
						<li><p class="name">LeChuck</p></li>
						<li><p class="name">Stan</p></li>
						<li><p class="name">Voodoo Lady</p></li>
						<li><p class="name">Herman Toothrot</p></li>
						<li><p class="name">Meathook</p></li>
						<li><p class="name">Carla</p></li>
						<li><p class="name">Otis</p></li>
						<li><p class="name">Rapp Scallion</p></li>
						<li><p class="name">Rum Rogers Sr.</p></li>
						<li><p class="name">Men of Low Moral Fiber</p></li>
						<li><p class="name">Murray</p></li>
						<li><p class="name">Cannibals</p></li>
					</ul>
				</article>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>

<script type="application/javascript">
	$(function() {
		var monkeyList = new List('faq-list', {
			valueNames: ['name'],
			plugins: [ ListFuzzySearch() ]
		});
	});
</script>
</body>
</html>
