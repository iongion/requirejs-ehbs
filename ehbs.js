define(["handlebars"], function(Handlebars) {
  Handlebars = Handlebars || this.Handlebars;
  var buildMap = {},
      templateExtension = ".ehbs";

  return {

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Get the template extension.
      var ext = (config.ehbs && config.ehbs.templateExtension ? config.ehbs.templateExtension : templateExtension);

      if (config.isBuild) {
        // Use node.js file system module to load the template.
        // Sorry, no Rhino support.
        var fs = nodeRequire("fs");
        var fsPath = parentRequire.toUrl(name + ext);
        buildMap[name] = fs.readFileSync(fsPath).toString();
        onload();
      } else {
        // In browsers use the text-plugin to the load template. This way we
        // don't have to deal with ajax stuff
        parentRequire(["text!" + name + ext], function(raw) {
          // Just return the compiled template
          onload(Ember.Handlebars.compile(raw));
        });
      }

    },

    // http://requirejs.org/docs/plugins.html#apiwrite
    write: function (pluginName, name, write) {
      var compiled = Ember.Handlebars.precompile(buildMap[name]);
      // Write out precompiled version of the template function as AMD
      // definition.
      write(
        "define('ehbs!" + name + "', ['ember'], function(Ember){ \n" +
          "return Ember.Handlebars.template(" + compiled.toString() + ");\n" +
        "});\n"
      );
    }

  };
});
