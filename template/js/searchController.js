var getQueryStringParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


var searchController = function($scope, $http, $filter) {
	$scope.serverSearchResult = [];
	$scope.uiResult = [];
	$scope.noResults = false;
	$scope.backgroundProcess = false;
	$scope.uiSearchExpression = "";

	// object to hold current search expression and filter settings
	$scope.filterExpression = {
		initialStartDate: "",
		initialEndDate: "",
		searchTerm: getQueryStringParameterByName("searchQuery"),
		startDate: "",
		endDate: "",
		filterByType: "",
		filterByCategory: ""
	};

	// object to hold the search statistic
	$scope.searchStats = {
		type: {
			word: 0,
			pdf: 0,
			page: 0,
			all: 0
		},
		category: {
			email: 0,
			cms: 0,
			formulare: 0,
			api: 0,
			all: 0
		}
	}

	function initSearch() {
		$scope.queryServerData();
	}

	// query server
	$scope.queryServerData = function() {
		if ($scope.filterExpression.searchTerm.length > 0) {
			$scope.noResults = false;
			$scope.resetFilter();
			// $scope.filterExpression.searchTerm <- add search term to server call
			$scope.backgroundProcess = true;
			$http.get("http://cmsapi.seven49.net/search/?query=" + $scope.filterExpression.searchTerm + "&hitsOnPage=1000").success(function(response) {
				// add category to all entries
				if (response.length > 0) {

					// save original server search result
					$scope.serverSearchResult = response;
					// bind result to UI
					$scope.uiResult = response;
					$scope.noResults = $scope.uiResult.length == 0;

					analyseSearchResult(true, true);
					$scope.uiSearchExpression = $scope.filterExpression.searchTerm;
					$scope.backgroundProcess = false;
				} else {
					$scope.serverSearchResult = [];
					$scope.uiResult = [];
					$scope.noResults = true;
					$scope.uiSearchExpression = $scope.filterExpression.searchTerm;
					$scope.backgroundProcess = false;
				}

			}).error(function(data, status, headers, config) {
					$scope.backgroundProcess = false;
				});
		}
	};

	// event handling method for filter by object type (e. g. page, pdf ...)
	// parameter qryCategory: selected object type or empty for reset button
	$scope.filterByType = function(qryTpe) {
		$scope.filterExpression.filterByType = qryTpe;
		if (qryTpe == '') {
			$scope.filterExpression.filterByCategory = '';
			applySessionFilter();
			analyseSearchResult(true, true);
		} else {
			applySessionFilter();
			analyseSearchResult(false, true);
		}
	};

	// event handling method for filter by category type (e. g. Grundbildung, Weiterbildung ...).
	// parameter qryCategory: selected category or empty for reset button
	$scope.filterByCategory = function(qryCategory) {
		$scope.filterExpression.filterByCategory = qryCategory;
		if (qryCategory == '') {
			$scope.filterExpression.filterByType = '';
			applySessionFilter();
			analyseSearchResult(true, true);
		} else {
			applySessionFilter();
			analyseSearchResult(true, false);
		}
	};

	// event method for the button "Suchen"
	$scope.filterForDate = function() {
		applySessionFilter();
		analyseSearchResult(true, true);
	};

	$scope.resetFilter = function() {
		$scope.filterExpression.filterByCategory = '';
		$scope.filterExpression.filterByType = '';
		$scope.filterExpression.startDate = $scope.filterExpression.initialStartDate;
		$scope.filterExpression.endDate = $scope.filterExpression.initialEndDate;
		applySessionFilter();
	};

	$scope.isFilterActive = function() {
		return $scope.filterExpression.filterByType == '' && $scope.filterExpression.filterByCategory == '' && $scope.filterExpression.initialStartDate == $scope.filterExpression.startDate && $scope.filterExpression.initialEndDate == $scope.filterExpression.endDate;
	};

	// use the current filter selection and query/filter the original server search result
	var  applySessionFilter = function() {
		var temp = $scope.serverSearchResult;
		if ($scope.filterExpression.filterByCategory.length > 0) {
			temp = $filter("filter")(temp, {
				Category: $scope.filterExpression.filterByCategory
			}, function(actual, expected) {
				return angular.equals(actual.toLowerCase(), expected);
			});
		}
		if ($scope.filterExpression.filterByType.length > 0) {
			temp = $filter("filter")(temp, {
				FileExtension: $scope.filterExpression.filterByType
			}, function(actual, expected) {
				return angular.equals(actual.toLowerCase(), expected);
			});
		}
		$scope.uiResult = temp;
	};

	// creates the search result statistic. Find the newest and oldest entry in the current search result

	var analyseSearchResult = function(recalcType, recalcCat) {
		// object type
		if (recalcType) {
			$scope.searchStats.type.pdf = $filter("filter")($scope.uiResult, {
				FileExtension: "pdf"
			}, function(actual, expected) {
				return angular.equals(actual.toLowerCase(), expected);
			}).length;
			$scope.searchStats.type.word = $filter("filter")($scope.uiResult, {
				FileExtension: "word"
			}, function(actual, expected) {
				return angular.equals(actual.toLowerCase(), expected);
			}).length;
			$scope.searchStats.type.page = $filter("filter")($scope.uiResult, {
				FileExtension: "page"
			}, function(actual, expected) {
				return angular.equals(actual.toLowerCase(), expected);
			}).length;
			$scope.searchStats.type.all = $scope.searchStats.type.pdf + $scope.searchStats.type.word + $scope.searchStats.type.page;
		}
	};
	initSearch();
};
