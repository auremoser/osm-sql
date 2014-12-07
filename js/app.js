'use strict'
/* GUI SCRIPT*/
/* Take GUI text and make request to API */

// format string from textfield to send request
// remove carriage returns etcet
function formatQuery(){
	var query = "SELECT ST_Centroid(the_geo m) as the_geom, \n tags->’name’ as name \n FROM planet \n WHERE tags@>'aeroway=>aerodrome' \n AND the_geom && ST_MakeEnvelope(-125.0, 24.9, -66.9, 49.5,4326)";
	query = query.replace(/(\r\n|\n|\r)/gm, '');
}

// make ajax request based on query
$.ajax({
    type: 'GET',
    url: 'http://osm.cartodb.com/api/v2/sql',
    data: {
        format: 'geojson',
        q: "SELECT ST_Centroid(the_geom) as the_geom, tags->'name' as name FROM planet WHERE tags@>'aeroway=>aerodrome' AND the_geom && ST_MakeEnvelope(-125.0, 24.9, -66.9, 49.5,4326)"
    },
    dataType: "json"
}).done(function(data) {
    console.log(data)
}).fail(function() {
    alert("error");
});