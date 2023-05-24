	      ____                  __          ____
	     / __ \____  _____ ____/ /_  ____  / / /_
	    / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
	   / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
	  /_/    \__,_/____/____/_.___/\____/_/\__/

	The open source password manager for teams
	(c) 2023 Passbolt SA


License
==============

Passbolt - Open source password manager for teams

(c) 2023 Passbolt SA

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


How to publish the styleguide?
=============================

We are using npm to manage the styleguide package in project using it.
Checkout npm documentation: https://docs.npmjs.com/developers

In a nutshell, once you are done changing you can publish the styleguide using npm tools as following:

1. Change the version, rebuild and tag the new package.

If you want to bump the minor version of the package by instance to go from v3.1.2 to v3.2.0
```
npm version v3.2.0
```

In a development scenario if you want to publish an alpha version of the package, you might want to go from
v3.1.2 to v3.2.0-alpha-0
```
npm version v3.2.0-alpha.0
```

Npm offers additional versions identifiers to not have to deal manually with the version numbers, if you want check out
the [npm version documentation](https://docs.npmjs.com/cli/v7/commands/npm-version).

2. Publish the new version of the package.

Once the package versioned you can publish it on the npm production channel to make it available to others.
```
npm publish
```

In a development scenario, you would prefer to publish the package on the alpha channel
```
npm publish --tag alpha
```

3. Upgrade the styleguide in the third party projects.

Upgrade the version of the styleguide in your project.
```
npm upgrade passbolt-styleguide
```

In some passbolt projects an additional grunt task help you manage the deployment of the styleguide assets
```
grunt styleguide-update
```

How to use Storybook?
=============================

We try to refer all the styleguide components in Storybook. This way you can play with every single component in
an isolated way.

Besides, we develop any new component by first testing it against Storybook and hence avoiding
the whole application reload.

To get started with storybook, first install its dependencies. As long as storybook has not migrated completely
to webpack 4, the dependencies will need to be installed manually.

```
npm run dev:storybook:install
```

To run Storybook, you just need to run the following command:

```
npm run dev:storybook:start
```

Building the related static website is possible as well using the following command:

```
npm run dev:storybook:build
```

Executing the stories locally to ensure no regression was introduced can be done as following:

```
npm run test:storybook
```
