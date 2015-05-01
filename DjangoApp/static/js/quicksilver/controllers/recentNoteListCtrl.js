;
(function (angular, $, _, console) {
    var moduleName = 'quicksilver.controller';
    var controllerName = "recentNoteListCtrl";

    angular
        .module(moduleName)
        .controller(controllerName, [
            '$scope', '$rootScope', '$timeout', '$element', '$q', 'recentNoteListSvc', 'quicksilverModelSvc',
            function($scope, $rootScope, $timeout, $element, $q, recentNoteListSvc, quicksilverModelSvc) {
                'use strict';

                $scope.recentNoteListIndex = -1;
                $scope.recentNoteList = [];

                /**
                 * 최근 사용목록 리스트를 갱신한다.
                 */
                $scope.refash = function () {
                    recentNoteListSvc
                        .getRecentNoteList()
                        .success(function (data, status, headers, config) {
                            $scope.recentNoteListIndex = -1;
                            $scope.recentNoteList = [];
                            _.each(data.data, function (val, idx) {
                                $scope.recentNoteList.push(quicksilverModelSvc.createNote(val));
                            });
                        });
                };

                /**
                 * 최근 노트를 클릭한다.
                 * @param $index
                 */
                $scope.clickRecentNote = function ($index) {
                    $rootScope.$broadcast("notebookListCtrl:selectNoteBook", $scope.recentNoteList[$index]);
                };

                /**
                 * 변경 이벤트
                 */
                $scope.$on('recentNoteListCtrl:changeNoteList', function (e) {
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

