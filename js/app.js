#!/usr/bin/env node
'use strict'

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