var _ = require('underscore');

module.exports = {
	DataGrouper : (function() {
	    var has = function(obj, target) {
	        return _.any(obj, function(value) {
	            return _.isEqual(value, target);
	        });
	    };

	    var keys = function(data, names) {
	        return _.reduce(data, function(memo, item) {
	            var key = _.pick(item, names);
	            if (!has(memo, key)) {
	                memo.push(key);
	            }
	            return memo;
	        }, []);
	    };

	    var group = function(data, names) {
	        var stems = keys(data, names);
	        return _.map(stems, function(stem) {
	            return {
	                key: stem,
	                vals:_.map(_.where(data, stem), function(item) {
	                    return _.omit(item, names);
	                })
	            };
	        });
	    };

	    group.register = function(name, converter) {
	        return group[name] = function(data, names) {
	            return _.map(group(data, names), converter);
	        };
	    };

	    return group;
	}())


}
