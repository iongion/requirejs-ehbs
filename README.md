requirejs-ehbs
==============

### Simple precompiling Handlebars plugin for RequireJS and Ember

Simpler version of [epeli/requirejs-hbs][] without any extra
helpers to configure (i18n). Just a simple
[Handlebars][] loader and precompiler for [RequireJS][].

While this plugin precompiles the templates it does not swap out the Handlebars dependency to runtime only
version on builds automatically.

### Usage

The loader uses the AMD [text] loader plugin to handle all ajax stuff so make
sure you have it and a Handlebars fork with an AMD definition in your setup.

Unlike [epeli/requirejs-hbs] this plugin requires Ember to compile the templates, add dependency on that in your config.

After that requirejs-hbs can be used like the original Handlebars plugin:

```javascript
require(['Ember', 'ehbs!app/templates/hello'], function ( Ember, template ) {
  var View = Ember.View.extend({
    classNames: ['page-wrap'],
    templateName: 'application',
    template: template
  })
});
```

### Configure 

Currently only overriding the template extension is configurable.
In your RequireJS config file, you could optionally add a hbs entry:

```javascript
require.config({
  paths: { ... },
  ehbs: {
    templateExtension: ".html"
  },    
  shim : { ... },
});
```

Otherwise it defaults to '.ehbs' template extension.

### TODO

Be able to specify Ember


[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[epeli/requirejs-hbs]: https://github.com/epeli/requirejs-hbs
[text]: https://github.com/requirejs/text

