;
(function (angular, $, _, console) {
    var moduleName = 'quicksilver.controller';
    var controllerName = "recentNoteListCtrl";

    angular.module(moduleName)
        .controller(controllerName, [
            '$scope', '$element', '$q', 'recentNoteListSvc', 'quicksilverModelSvc',
            function($scope, $element, $q, recentNoteListSvc, quicksilverModelSvc) {
                $scope.recentNoteListIndex = -1;
                $scope.recentNoteList = [];

                $scope.refash = function () {
                    recentNoteListSvc
                        .getRecentNoteList()
                        .success(function (data, status, headers, config) {
                            $scope.recentNoteList = [];
                            _.each(data.data, function (val, idx) {
                                $scope.recentNoteList.push(quicksilverModelSvc.createNote(val));
                            });
                        });
                };

                $scope.$on(controllerName + ':changeNoteList', function () {
                    $scope.refash();
                });

                $scope.refash();
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

