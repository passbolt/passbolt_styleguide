<?php include('../_includes/bootstrap.php'); ?><!doctype html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<title>Form input tests</title>
	<link rel="stylesheet" type="text/css" href="../../src/css/themes/<?= $theme; ?>/api_main.css">
</head>
<body>
<div style="width:640px;margin:auto">
	<h1>Button test</h1>
	<h2>Normal size</h2>
	<div class="input-wrapper">
		<a href="#" class="button" tabindex="1">button</a>
		<a href="#" class="button processing">button</a>
		<a href="#" class="button primary" tabindex="2">.primary</a>
		<a href="#" class="button disabled">.disabled</a>
	</div>
	<h2>Big size</h2>
	<div class="input-wrapper">
		<a href="#" class="button big warning"  tabindex="3">.big.warning</a>
		<a href="#" class="button big disabled">.big.disabled</a>
		<a href="#" class="button primary big">.primary.big</a>
		<a href="#" class="button primary processing big">.primary.big.processing</a>
		<a href="#" class="button big primary disabled">.primary.disabled</a>
	</div>
	<h2>Icons with font</h2>
	<div>
		<a href="#" class="button toggle">
			<i class="fa fa-eye fa-lg"></i>
			<span class="visuallyhidden">view</span>
		</a>
		<a href="#" class="button">
			<i class="fa fa-magic fa-lg"></i>
			<span class="visuallyhidden">generate</span>
		</a>
	</div>
	<h2>Icons with SVG</h2>
	<div>
		<a href="#" class="button toggle"  tabindex="4">
			<i class="fa fa-eye fa-lg fa-svg"></i>
			<span class="visuallyhidden">view</span>
		</a>
		<a href="#" class="button">
			<i class="fa fa-magic fa-lg fa-svg"></i>
			<span class="visuallyhidden">generate</span>
		</a>
	</div>
    <h2>Icons with SVG</h2>
    <div>
        <input type="submit" class="button big primary" value="input"/>
        <input type="button" class="button big primary" value="input2"/>
        <button class="button big primary">button</button>
        <a role="button" class="button big primary">button</a>
    </div>
    <h2>Icons with SVG</h2>
    <div>
        <input type="submit" class="button primary" value="input"/>
        <input type="button" class="button primary" value="input2"/>
        <button class="button cancel processing">button</button>
        <a role="button" class="button cancel loading">button</a>
    </div>
</div>
</body>
</html>