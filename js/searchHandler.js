 $(function() {

    $.bbcSearch = $('#searchfield');

    $.bbcSearch['search']();
    $.bbcSearch['search']('setUrl','http://www.bbc.co.uk/iplayer/ion/searchextended/');

    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };
    var cache = {};
    var jsonpCallback;

    $( "#searchfield" ).autocomplete({
      minLength: 2,
      source: function( request, response ) {
        var term = request.term;
        if ( term in cache ) {
          response( cache[ term ] );
          return;
        }

        $.bbcSearch['search']('addSearchAvailability','iplayer');
        $.bbcSearch['search']('addQuery',term);



        //console.log(term);


        //$.bbcSearch['search']('setUrl','http://www.bbc.co.uk/iplayer/ion/searchextended/');

        var responseData = [];
        $.getJSON( $.bbcSearch['search']('getSearchUrl') , request, function( data, status, xhr ) {

          for (var d in data.blocklist) {
            responseData.push(data.blocklist[d].brand_title);
          }

          if (responseData.length == 0) {
            $('#resultext').text('No results found!');
          }
          responseData = arrayUnique(responseData);
          cache[ term ] = responseData;

          response( responseData );
        });


      }
    });
  });