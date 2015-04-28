;
(function (angular, $, _, console) {
    var moduleName = 'quicksilver.controller';
    var controllerName = "recentNoteListCtrl";

    angular.module(moduleName)
        .controller(controllerName, [
            '$scope', '$rootScope', '$element', '$q', 'recentNoteListSvc', 'quicksilverModelSvc',
            function($scope, $rootScope, $element, $q, recentNoteListSvc, quicksilverModelSvc) {
                $scope.recentNoteListIndex = -1;
                $scope.recentNoteList = [];

                $scope.refash = function () {
                    recentNoteListSvc
                        .getRecentNoteList()
                        .success(function (data, status, headers, config) {
                            console.log(data);
                            $scope.recentNoteListIndex = -1;
                            $scope.recentNoteList = [];
                            _.each(data.data, function (val, idx) {
                                $scope.recentNoteList.push(quicksilverModelSvc.createNote(val));
                            });
                        });
                };

                $scope.clickRecentNote = function ($index) {
                    console.log("Recent click: " + $index);
                    $rootScope.$broadcast("notebookListCtrl:selectNoteBook", $scope.recentNoteList[$index]);
                };

                $scope.$on(controllerName + ':changeNoteList', function (e) {
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

