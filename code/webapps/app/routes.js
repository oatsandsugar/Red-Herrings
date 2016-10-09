var mongoose = require('mongoose');

var _ = require('underscore')

var tools =require('./tools/tools');

tools.DataGrouper.register("sum", function(item) {
	    return _.extend({}, item.key, {Value: _.reduce(item.vals, function(memo, node) {
	        return memo + Number(node.Value);
	    }, 0)});
	});
module.exports = function(app) {
	var Whd = mongoose.model('Whd');
	var Dictionary = mongoose.model('Dictionary');
	var Complaint = mongoose.model('Complaint');
	var Inspection = mongoose.model('Inspection');
	var Legal = mongoose.model('Legal');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	app.get('/getWhd',function(req, res, next){
		var queryWhd = Whd.find({
								"latlng":{'$exists':true},
								"trade_nm":{'$exists':true},
								"rating":{'$exists':true}
								},{"latlng":1,
									"trade_nm":1,
									"rating":1
									}).limit(10000);;

    	queryWhd.exec(function (err, whd){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!whd) { return next(new Error('can\'t find whd')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.whd = whd;
      res.json(req.whd);
    });

	})

	app.get('/getDictionary', function(req, res) {
		var queryDictionary = Dictionary.find({"Data Type": "Numeric"},{"Display Name":1,"Column Name":1});

    	queryDictionary.exec(function (err, dict){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!dict) { return next(new Error('can\'t find dict')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.dict = dict;
      res.json(req.dict);
	})
    })
    app.get('/getComplaint', function(req, res) {
		var queryComplaint = Complaint.find({"latlng":{'$exists':true}},{});

    	queryComplaint.exec(function (err, complaint){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!complaint) { return next(new Error('can\'t find complaint')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.complaint = complaint;
      res.json(req.complaint);
	})
    })
    app.get('/getInspection', function(req, res) {
		var queryInspection = Inspection.find({"latlng":{'$exists':true}},{});

    	queryInspection.exec(function (err, inspection){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!inspection) { return next(new Error('can\'t find inspection')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.inspection = inspection;
      res.json(req.inspection);
	})
    })
    app.get('/getLegal', function(req, res) {
		var queryLegal = Legal.find({"latlng":{'$exists':true}},{});

    	queryLegal.exec(function (err, legal){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!legal) { return next(new Error('can\'t find legal')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.legal = legal;
      res.json(req.legal);
	})
    })
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};