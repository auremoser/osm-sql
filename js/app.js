'use strict'
/* Take textarea input and make request to API */

// format string from textfield to send request
// remove carriage returns etcet

function sanitizeQuery(query){
   query = query.replace(/’/gm, "'"); //remove the weird quote symbol, replace with '
   query = query.replace(/(\r\n|\n|\r)/gm, '');//remove all new lines
   return query;
}

// submit query request and render result

function makeRequest(query){
	$('#submit').attr('disable', true).css({opacity:0.2});
	$('#result').val('Sending request...');
	console.log(query);
	$.ajax({
      type: 'GET',
      url: 'http://osm.cartodb.com/api/v2/sql',
      data: {
        format: 'geojson',
        q:query
      },
      dataType: "json"
    }).done(function(data) {
        $('#result').val(JSON.stringify(data));
    }).fail(function(jqXhr, status, error) {
        $('#result').val("error"+status+error);
		console.error('ERROR', status, error);
    }).always(function(){
    	$('#submit').attr('disable', null).css({opacity:1});
	});
}

function handleSubmit(){
	var query = $('#query').val();
	query = sanitizeQuery(query);
	makeRequest(query);
}

$(function(){
	$('#submit').on('click', handleSubmit);
});
