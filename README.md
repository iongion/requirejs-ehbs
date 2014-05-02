requirejs-ehbs
==============

### Simple precompiling Handlebars plugin for RequireJS and Ember

Simple [Handlebars][] loader and precompiler for [RequireJS][].

While this plugin precompiles the templates it does not swap out the Handlebars dependency to runtime only
version on builds automatically.

### Usage

The loader uses the AMD [text] loader plugin to handle all ajax stuff so make
sure you have it and a Handlebars fork with an AMD definition in your setup.

Unlike [epeli/requirejs-hbs] this plugin requires Ember to compile the templates, add dependency on that in your config.

After that requirejs-hbs can be used like the original Handlebars plugin:

```javascript
require.config({
  paths: {
    'my-ember': 'bower_components/ember/ember',
    ...
  },
  ehbs: {
    templateExtension: ".html"
  },    
  shim : { ... },
});
```

```javascript
require(['my-ember', 'ehbs!app/templates/hello'], function ( Ember, template ) {
  var View = Ember.View.extend({
    classNames: ['page-wrap'],
    templateName: 'application',
    template: template,
    ember: 'my-ember'
  })
});
```

### Configuration options under `ehbs` key

- default extension is **.ehbs**
- you can specify **templateRoot**, if for the above example you set it to `app/templates` then the following occur:
  - templates are automatically registered, the above will be inside `Ember.TEMPLATES['helo']`
  - the require should be changed from ``ehbs!app/templates/hello`` to ``ehbs!hello``
- you can specify **ember** which is the key that you used in your ``require.config`` for loading ember, this is required unless you required ember with a key different than the literal string ``ember``, as in the above code ``my-ember``

### TODO

test compiled version

[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[epeli/requirejs-hbs]: https://github.com/epeli/requirejs-hbs
[text]: https://github.com/requirejs/text

