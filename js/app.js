// 'use strict'
/* Take textarea input and make request to API */
(function() {
    var sql = new cartodb.SQL({
		// want to get around querying to specific user db. undocumented prop :)
		completeDomain: 'http://osm.cartodb.com',
		// we don't use user, but if we remove it
		// throws error! :/ muy mal
        user: 'cartodb_user'
    });
// format string from textfield to send request
// remove carriage returns etcet
    function sanitizeQuery(query) {
        query = query.replace(/’/gm, "'"); //remove the weird quote symbol, replace with '
        query = query.replace(/(\r\n|\n|\r)/gm, ''); //remove all new lines
        return query;
    }

    function beforeRequest(){
        $('#submit').attr('disable', true).css({
            opacity: 0.2
        });
        $('#result').val('Sending request...');
    }

    function onRequestDone(){
        $('#submit').attr('disable', null).css({
            opacity: 1
        });
    }
// submit query request and render result
    function makeRequest(query, data) {
        if(!data) data = {};

        beforeRequest();

        sql.execute(query, data)
        .done(function(data) {
            console.log(data.rows);
            $('#result').val(JSON.stringify(data));
            onRequestDone();
        })
        .error(function(errors) {
            // errors contains a list of errors
            console.log("errors:" + errors);
            $('#result').val("errors: " + errors);
            onRequestDone();
        });
    }

    function handleSubmit() {
        var query = $('#query').val();
        query = sanitizeQuery(query);
        makeRequest(query);
    }

    $(function() {
        $('#submit').on('click', handleSubmit);
    });

})();