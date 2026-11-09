/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.19.0
 */
// Usage: node config/css-color-diff.js <before> <after>
// Two build folders (or two copies of build/css/themes) with the same layout. Prints one line per declaration
// whose resolved value differs, as theme, output, selector, property, old -> new; nothing when they are identical.
const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");

// postcss belongs to the build's minimizer, not to the styleguide, and pnpm does not expose it here
const postcss = createRequire(require.resolve("css-minimizer-webpack-plugin"))("postcss");

const USAGE = "Usage: node config/css-color-diff.js <before> <after>";

// the *.min.css files under dir
const cssFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return cssFiles(file);
    }
    return file.endsWith(".min.css") ? [file] : [];
  });

// index of the parenthesis closing the one at open
const closingParen = (text, open) => {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text.charAt(i) === "(") {
      depth++;
    } else if (text.charAt(i) === ")" && --depth === 0) {
      return i;
    }
  }
  return text.length;
};

// replaces every var(--X) and var(--X, fallback) by its value, nested references included; unknown ones stay
const resolve = (value, tokens) => {
  let result = value;
  let from = 0;
  for (let guard = 0; guard < 100; guard++) {
    const start = result.indexOf("var(", from);
    if (start < 0) {
      break;
    }
    const end = closingParen(result, start + 3);
    const inside = result.slice(start + 4, end);
    const comma = inside.indexOf(",");
    const name = (comma < 0 ? inside : inside.slice(0, comma)).trim();
    const replacement = tokens.get(name) ?? (comma < 0 ? null : inside.slice(comma + 1).trim());
    if (replacement === null) {
      from = end + 1;
    } else {
      result = result.slice(0, start) + replacement + result.slice(end + 1);
    }
  }
  return result;
};

// the declarations of a compiled file, resolved against its :root tokens, keyed by at-rule, selector and property
const declarationsOf = (css) => {
  const root = postcss.parse(css);
  const tokens = new Map();
  root.walkRules(":root", (rule) => rule.walkDecls((decl) => tokens.set(decl.prop, decl.value)));
  const declarations = new Map();
  root.walkDecls((decl) => {
    const rule = decl.parent;
    if (rule.type !== "rule" || rule.selector === ":root") {
      return;
    }
    const context = rule.parent.type === "atrule" ? `@${rule.parent.name} ${rule.parent.params} ` : "";
    const key = `${context}${rule.selector}\t${decl.prop}`;
    if (!declarations.has(key)) {
      declarations.set(key, []);
    }
    declarations.get(key).push(resolve(decl.value, tokens));
  });
  return declarations;
};

const main = () => {
  const [before, after] = process.argv.slice(2);
  if (!after) {
    console.error(USAGE);
    return 1;
  }
  const files = cssFiles(before)
    .map((file) => path.relative(before, file))
    .filter((file) => fs.existsSync(path.join(after, file)));
  if (files.length === 0) {
    console.error(`${USAGE}\nNo .min.css file of ${before} has a counterpart in ${after}.`);
    return 1;
  }
  for (const file of files) {
    const previous = declarationsOf(fs.readFileSync(path.join(before, file), "utf8"));
    const current = declarationsOf(fs.readFileSync(path.join(after, file), "utf8"));
    const theme = path.basename(path.dirname(file));
    const output = path.basename(file, ".min.css");
    for (const [key, values] of current) {
      const olds = previous.get(key) ?? [];
      values.forEach((value, index) => {
        if (index < olds.length && olds.at(index) !== value) {
          console.log(`${theme}\t${output}\t${key}\t${olds.at(index)} -> ${value}`);
        }
      });
    }
  }
  return 0;
};

process.exitCode = main();
