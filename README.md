	      ____                  __          ____
	     / __ \____  _____ ____/ /_  ____  / / /_
	    / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
	   / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
	  /_/    \__,_/____/____/_.___/\____/_/\__/

	The open source password manager for teams
	(c) 2021 Passbolt SA


License
==============

Passbolt - Open source password manager for teams

(c) 2021 Passbolt SA

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
Public License (AGPL) as published by the Free Software Foundation version 3.

The name "Passbolt" is a registered trademark of Passbolt SA, and Passbolt SA hereby declines to grant a trademark
license to "Passbolt" pursuant to the GNU Affero General Public License version 3 Section 7(e), without a separate
agreement with Passbolt SA.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not,
see [GNU Affero General Public License v3](http://www.gnu.org/licenses/agpl-3.0.html).

Images and logos in /src/img/third_party belongs to their respective owner.

About
=========

This is the official styleguide for Passbolt the open source password manager for teams.
This styleguide is used to extend, minify and test the stylesheets used by the different
passbolt components such as the website, the firefox addon, etc.

In /demo you can find a copy of each of the page HTML (or main states in case of the one page client)
so that you can test them out. You will need a simple php webserver, since we use it to factorise
some of the includes. Apart from this the HTML is static.

In /src and /build you can find the assets that are used by other projects, like the images
the less files, the minified css files, fonts, etc.

Credits
=========

https://www.passbolt.com/credits


Install
=========

Install grunt
```
npm install -g grunt-cli
```

Install the needed modules defined in the grunt config
```
npm install
```

Make sure Grunt watch for less changes and compile them into CSS
```
grunt watch
```

Edit one LESS file to see if it works!


Quick how-to for developers
==========================

## Starting the demo
After running this commands, the demo will be accessible from
[http://localhost:3000](http://localhost:3000)

```
npm run start-app-dev-server
```

Each change made on the js applications source code will trigger a build and refresh the browser tab where the demo has
been started.



How to update the styleguide?
=============================

We are using npm to manage the styleguide package in project using it.
Checkout npm documentation: https://docs.npmjs.com/developers

In a nutshell, once you are done changing, make sure you change the version
number in the package.json.
```
{
  "name": "passbolt-styleguide",
  "version": "X.X.X",
  [...]
}
```

You need to commit your changes and tag the new version of the styleguide.
This is how npm knows a new version is available in the project using the package.
```
grunt styleguide-publish
```

in your project you should also have a grunt task to manage the copy/pasting in the right place such as
```
grunt styleguide-update
```
