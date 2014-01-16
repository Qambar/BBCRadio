/**
 * bbcInitDemo()
 * 
 * This function initializes the search autocomplete box and initializes the BBC Search widget.
 * This should be called after the document load is complete.
 * 
 * 
 **/
 
 function bbcInitDemo() {

    
    $.bbcSearch = $('#searchfield');

    //Initializing the widget
    $.bbcSearch['search']();
    //Setting the url
    $.bbcSearch['search']('setUrl','http://www.bbc.co.uk/iplayer/ion/searchextended/');
    
    //utility function only for this demo 
    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };
    
    //cache to store the previous queries so we don't keep on requesting same thing again 
    var cache = {};

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
        $('#searchbtn').css('background-image', 'url("images/loading.gif")');

        var responseData = [];
        $.getJSON( $.bbcSearch['search']('getSearchUrl') , request, function( data, status, xhr ) {

          for (var d in data.blocklist) {
            if (data.blocklist[d].brand_title.length > 2) {
              responseData.push(data.blocklist[d].brand_title);
            }
          }



          if (responseData.length == 0) {
            $('#resultext').text('No results found!');
          }
          //make sure the results are unique, because there are more than one episodes associated with single brand
          responseData = arrayUnique(responseData);
          
          cache[ term ] = responseData;
          $('#searchbtn').css('background-image', 'url("images/search.png")');
          
          //send back response to search field
          response( responseData );
        });

      }
    });
}
