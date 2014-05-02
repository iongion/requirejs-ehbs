define(['handlebars'], function(Handlebars) {
  Handlebars = Handlebars || this.Handlebars;
  var buildMap = {},
      templateExtension = '.ehbs',
      emberExports = 'ember'
  
  return {

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Get the template extension.
      var ext = (config.ehbs && config.ehbs.templateExtension ? config.ehbs.templateExtension : templateExtension),
          root = (config.ehbs && config.ehbs.templateRoot ? config.ehbs.templateRoot : ''),
          register = (config.ehbs && config.ehbs.autoRegister ? config.ehbs.autoRegister : (!Ember.isEmpty(root))),
          key = name.replace(root, '').replace(ext, '');
      
      if (key[0] === '/') { key = key.slice(1); }
      
      if (config.isBuild) {
        // Use node.js file system module to load the template.
        // Sorry, no Rhino support.
        var fs = nodeRequire('fs');
        var fsPath = parentRequire.toUrl(name + ext);
        buildMap[name] = {
          key: key,
          register: register,
          contents: fs.readFileSync(fsPath).toString()
        }
        onload();
      } else {
        // In browsers use the text-plugin to the load template. This way we
        // don't have to deal with ajax stuff
        parentRequire(['text!' + name + ext], function(raw) {
          // Just return the compiled template
          var template = Ember.Handlebars.compile(raw)
          if (register) {
            Ember.TEMPLATES[key] = template
          }
          onload(template);
        });
      }

    },

    // http://requirejs.org/docs/plugins.html#apiwrite
    write: function (pluginName, name, write) {
      var compiled = Ember.Handlebars.precompile(buildMap[name].contents);
      // Write out precompiled version of the template function as AMD definition
      var generated =  "define('ehbs!" + name + "', ['" + emberExports + "'], function(Ember) { \n" +
          "var template = Ember.Handlebars.template(" + compiled.toString() + ");\n" +
          (buildMap[name].register ? 'Ember.TEMPLATES["'+buildMap[key]+'"] = template;\n' : '') +
          "return template;\n" +
        "});\n"
      write(generated);
    }

  };
});
