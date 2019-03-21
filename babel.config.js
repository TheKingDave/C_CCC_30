const presets = [
    [
        "@babel/env",
        {
            targets: {
                node: 'current'
            },
            useBuiltIns: "usage",
            corejs: "core-js@3",
        }
    ]
];

const plugins = [
    'babel-plugin-dynamic-import-nodeg',
];

module.exports = {presets, plugins}