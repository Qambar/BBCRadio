/**
*	Widget	: BBC Search Widget
*	Desc	: I want to search for available episodes by brand name, So that I may easily find the programme I’m looking for.
*	Version	: 1.0
*	Author	: Qambar Raza
**/

//###############################################################
//#	BBC Search Widget - Brand Name Searcher
//###############################################################

'use strict';


$.widget('bbc.search', {
	url: ''
	,arguments: {}
	,required: { query: false, searchAvailability: false }

	,options: {}

	,_init: function() {
		// stuff that is called on initialization of the plugin

		//this.options a combination of the defualt options and the ones passed in during the plugin initialization
		if (this.options.foo) {
			//this.element is the element that the plugin was called on
			this.element.fadeOut();
		}

		console.log(this.options);
	}



	/**
	 * Adds arguments to the url for querying specific string.
	 * @param argName 	- Argument Name e.g 'category'
	 * @param argValue 	- Argument Value e.g 'Music'
	 * @return arguments
	 */
	,_addArgument: function(argName, argValue) {
		this.arguments[argName] = encodeURIComponent(argValue);
		console.log(this.arguments);
		return this.arguments;
	}

	,setUrl: function(val) {
		this.url = val;
	}

	/**
	 * Sugar Methods for creating the url.
	 * @param argName 	- Argument Name e.g 'category'
	 * @param argValue 	- Argument Value e.g 'Music'
	 * @return arguments
	 */
	 //Category for search
	,addCategory: function(val) {
		this._addArgument('category', val);
	}
	,addLocalRadio: function(val) {
		this._addArgument('local_radio', val);
	}
	//A valid masterband on which to filter results
	,addMasterbrand: function(val) {
		this._addArgument('masterbrand', val);
	}
	//Maximum tleo results to return
	,addMaxTleos: function(val) {
		this._addArgument('max_tleos', val);
	}
	//The page of results to return
	,addPage: function(val) {
		this._addArgument('page', val);
	}
	//Number of results per page
	,addPerPage: function(val) {
		this._addArgument('max_tleos', val);
	}
	//Required - Search query (keyword)
	,addQuery: function(val) {
		this._addArgument('q', val);
		this.required.query = true;
	}
	//Required - search_availability e.g iplayer, any, discoverable, ondemand, simulcast, comingup etc.
	,addSearchAvailability: function(val) {
		this._addArgument('search_availability', val);
		this.required.searchAvailability = true;
	}
	//Filter to TV or Radio. Default is both.
	,addServiceType: function(val) {
		this._addArgument('service_type', val);
	}
	//End of add argument methods.

	,isRequiredHappy: function(){
		for (var r in this.required) {
			if (!this.required[r]) return false;
		}
		return true;
	}
	,argumentsForUrlString:function() {
		var argumentsForUrl = '';
		for (var a in this.arguments) {
			argumentsForUrl += a + '/' + this.arguments[a] + '/';
			console.log(a);
		}
		return argumentsForUrl;
	}

	,getSearchUrl: function() {
		console.log("URL ::" +  this.url + this.argumentsForUrlString());
		return this.url + this.argumentsForUrlString();

	}

	,destroy: function() {
		$.widget.prototype.apply(this, arguments); // default destroy
		this.arguments 	= null;
		this.url 		= null;
		// this is where you would want to undo anything you do on init to reset the page to before the plugin was initialized.
	}

});

