// PHP Linter to CodeMirror, copyright (c) by Ioan CHIRIAC
// Distributed under a BSD 3-Clause License : https://github.com/glayzzle/codemirror-linter/blob/master/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require('php-parser'));
  else if (typeof define == "function" && define.amd) // AMD
    if (window.console) {
      window.console.error("Error: php-parser does not support AMD.");
    }
  else // Plain browser env
    mod(CodeMirror, phpParser);
})(function(CodeMirror, phpParser) {
  "use strict";

  // validate some code
  function validator(text, options) {
    if (phpParser) {
      try {
        phpParser.parseCode(text);
      } catch(e) {
        return [{
          message: e.message,
          severity: "error",
          from: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber),
          to: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber + 1)
        }];
      }
    } else if (window.console) {
      window.console.error("Error: php-parser not defined, CodeMirror PHP linting cannot run.");
    }
    return [];
  }

  CodeMirror.registerHelper("lint", "php", validator);

});
