# karma-cli-flags [![Build Status](https://travis-ci.org/BBVAEngineering/karma-cli-flags.svg?branch=master)](https://travis-ci.org/BBVAEngineering/karma-cli-flags)[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fkarma-cli-flags.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fkarma-cli-flags)

## Information

<table>
<tr> 
<td>Package</td><td>karma-cli-flags</td>
</tr>
<tr>
<td>Description</td>
<td>Karma preprocessor to inject cli flags</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Installation

Just add `karma-cli-flags` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma-cli-flags": "~0.1.0"
  }
}
```
Or issue the following command:
```bash
npm install karma-cli-flags --save-dev
```

## Configuration

The code below shows a sample configuration of the preprocessor.
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.js': ['cli-flags']
    }
  });
};
```
Optionally, you can define the next parameters:
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    cliFlags: 
        export: 'ENV',
        wrap: false,
        namespace: '__cliFlags__'
    }
  });
};
```

#### export

Variable containing cli args to override until the end of file

    export: 'ENV'
   
#### wrap

Wrap code into a function

    wrap: false
    
#### namespace

Temp var to store exported variable value

    namespace: '__cliFlags__'
