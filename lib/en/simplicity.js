var _ = require("lodash");
var tokenize = require("../tokenize");
var simpler = require("./data/simpler");

var re = new RegExp('\\b(' + _.pluck(simpler, "value").join('|') + ')\\b', 'gi');

module.exports = tokenize.flow(
    tokenize.re(re),
    tokenize.define(function (text, token, prev) {
        var replacement = _.find(simpler, { value: text.toLowerCase() });
        if (replacement) replacement = [{ value: replacement }];

        return {
            level: "warn",
            message: '"<%- value %>" has a simpler alternative',
            replacements: replacement
        };
    })
);