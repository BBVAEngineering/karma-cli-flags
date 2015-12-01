var merge = require('merge');
var parseArgs = require('minimist');
var template = require('lodash.template');

var defaults = {
    export: 'ENV',
    wrap: false,
    namespace: '__cliFlags__'
};

var argv = parseArgs(process.argv.slice(2));

// Lodash templates
var tWrapper = '(function(window, undefined){\n<%= content %>\n})(window)';

var createProcessPreprocessor = function(args, logger) {
    args = merge(defaults, args);
    
    var log = logger.create('preprocessor.cli-flags');

    return function(content, file, done) {
        var prepend = '';
        // Store exported var
        var stored = 'var ' + args.namespace + ' = ' + defaults.export + ';\n';
        prepend += stored;
        // Inject cli flags
        var flags = 'var ' + args.export + ' = ' + JSON.stringify(argv) + ';\n';
        prepend += flags;
        // Restore exported var
        var restored = args.export + ' = ' + defaults.namespace + ';\n';
        // Add vars
        content = prepend + content + restored;
        // Wrap content
        if(args.wrap){
            content = template(tWrapper)({content: content});
        }
        // Return wrapped content
        done(content);
    };
};

createProcessPreprocessor.$inject = ['config.cliFlags', 'logger'];

// PUBLISH DI MODULE
module.exports = {
    'preprocessor:cli-flags': ['factory', createProcessPreprocessor]
};
