(function (angular, $, _, console) {
    angular.module('quicksilver.controller')
        .controller('recentNoteListCtrl', [
            '$scope', '$element', '$q', 'recentNoteListSvc',
            function($scope, $element, $q, recentNoteListSvc) {

                $scope.recentNoteList = [];
                recentNoteListSvc
                    .getRecentNoteList()
                    .success(function (data, status, headers, config) {
                        $scope.recentNoteList.concat(data.data);
                    });
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

