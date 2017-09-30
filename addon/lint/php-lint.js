// PHP Linter to CodeMirror, copyright (c) by Ioan CHIRIAC
// Distributed under a BSD 3-Clause License : https://github.com/glayzzle/codemirror-linter/blob/master/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") {
    mod(require("cm/lib/codemirror"), require('php-parser'));
  } else {
    mod(CodeMirror, require('php-parser'));
  }
})(function(CodeMirror, phpParser) {
  "use strict";

  // validate some code
  CodeMirror.registerHelper("lint", "php", function phpLint(text, options) {
    if (phpParser) {
      try {
        phpParser.parseCode(text);
      } catch(e) {
        return [{
          message: e.message,
          severity: "error",
          from: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber - 1),
          to: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber)
        }];
      }
    } else if (window.console) {
      window.console.error("Error: php-parser not defined, CodeMirror PHP linting cannot run.");
    }
    return [];
  });
});
