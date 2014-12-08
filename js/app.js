'use strict'
/* Take textarea input and make request to API */

var query = $('#query-textarea').val();
query =  sanitizeQuery(query);
// format string from textfield to send request
// remove carriage returns etcet

function sanitizeQuery(query){
   query = query.replace(/’/gm, "'"); //remove the weird quote symbol, replace with '
   query = query.replace(/(\r\n|\n|\r)/gm, '');//remove all new lines
   return query;
}

// make ajax request based on query
function makeRequest(query){
	$.ajax({
	    type: 'GET',
	    url: 'http://osm.cartodb.com/api/v2/sql',
	    data: {
	        format: 'geojson',
	        q:query
	    },
	    dataType: "json"
	}).done(function(data) {
	    console.log(data)
	}).fail(function() {
	    alert("error");
	});
}
