var search = {
	getResultWindow: function(keywords, langIso) {
		var segment1 = "/" + langIso + "/";
		// get search result page with search query
		window.location = segment1 + 'search.htm?searchQuery=' + encodeURI(keywords);
	},
	onKeyDown: function(event,keywords) {
		if (event.keyCode === 13) {
			Search.getResultWindow(keywords);
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				// IE<9 variant:
				event.returnValue = false;
			}
			// bubbling - stop
			event.stopPropagation();
			// added for completeness
			return false;
		}
	}
};

/* in controller or main
$(document).ready(function() {
	$('#keywords').on("keydown", function(event){
		if (event.keyCode === 13) {
			search.getResultWindow($("#keywords").val(), langIso);
			event.preventDefault();
		}
	});
	$('#search-button').on("click", function(event){
		search.getResultWindow($("#keywords").val(), langIso);
		event.preventDefault();
	});
});


*/