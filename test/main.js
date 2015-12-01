'use strict';

var assert = require('assert');
var template = require('lodash.template');
var cliFlagsFactory = require('../index')['preprocessor:cli-flags'][1];

var logger = {create: function(){}};

var defaultContent = 'test';

it('it should return any content', function (cb) {
    var preprocessor = cliFlagsFactory({}, logger);
    
    preprocessor(defaultContent, '', function(content){
        assert(content, 'content does not exist');

        cb();
    });
});

it('it should wrap content', function (cb) {
    var preprocessor = cliFlagsFactory({ wrap: true }, logger);
    
    preprocessor(defaultContent, '', function(content){
        assert(content.match(/^\(function\(window,\ undefined\)\{/), 'content must start with anonymous function');
        assert(content.match(/\}\)\(window\)$/), 'content must close the wrapper');

        cb();
    });
});

it('it should store & restore current exported var', function (cb) {
    var preprocessor = cliFlagsFactory({}, logger);
    
    preprocessor(defaultContent, '', function(content){
        assert(content.match(/var\ __cliFlags__\ =\ ENV;/), 'content must export current var');
            assert(content.match(/ENV\ =\ __cliFlags__;/), 'content must export current var');

        cb();
    });
});
