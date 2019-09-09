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
		<span class="fa icon icon-only">
				<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"/></svg>
			</span>
			<span class="visuallyhidden">view</span>
		</a>
		<a href="#" class="button">
		<span class="fa icon icon-only">
					<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1254 581l293-293-107-107-293 293zm447-293q0 27-18 45l-1286 1286q-18 18-45 18t-45-18l-198-198q-18-18-18-45t18-45l1286-1286q18-18 45-18t45 18l198 198q18 18 18 45zm-1351-190l98 30-98 30-30 98-30-98-98-30 98-30 30-98zm350 162l196 60-196 60-60 196-60-196-196-60 196-60 60-196zm930 478l98 30-98 30-30 98-30-98-98-30 98-30 30-98zm-640-640l98 30-98 30-30 98-30-98-98-30 98-30 30-98z"/></svg>
				</span>
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
        <input type="submit" class="button primary processing" value="input3"/>
        <button class="button cancel processing">button</button>
        <a role="button" class="button cancel loading">button</a>
    </div>
</div>
</body>
</html>