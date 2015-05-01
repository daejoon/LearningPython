;
(function (angular, $, _, console) {
    var moduleName = 'quicksilver.controller';
    var controllerName = 'noteCtrl';
    angular.module(moduleName)
        .controller(controllerName, [
            '$scope', '$rootScope', '$timeout', '$q', 'noteSvc',
            function ($scope, $rootScope, $timeout, $q, noteSvc) {
                $scope.options = {
                    lang: 'ko-KR',
                    height: 500,
                    minHeight: null,             // set minimum height of editor
                    maxHeight: null,             // set maximum height of editor
                    focus: true,
                    tabsize: 4
                };
                $scope.note = {};
                $scope.searchText = "";

                $scope.saveNote = function (noteObj) {
                    noteSvc.addNote(noteObj)
                        .success(function (data, status, headers, config) {
                            // $scope.clickRecentNote 이벤트와 충돌이 난다. 우선 이렇게 땜빵을 ...
                            $timeout(function () {
                                $rootScope.$broadcast("recentNoteListCtrl:changeNoteList");
                            }, 100);
                        })
                        .error(function (data, status, headers, config) {
                            console.log(status);
                        });
                };

                $scope.onBlur = function ($event) {
                    $scope.saveNote($scope.note);
                };

                $scope.prevNote = function () {
                    $rootScope.$broadcast("noteListCtrl:prevNote");
                };

                $scope.nextNote = function () {
                    $rootScope.$broadcast("noteListCtrl:nextNote");
                };

                $scope.keypressSearchText = function ($event) {
                    if ( $event.which === 13 ) {
                        $rootScope.$broadcast("noteListCtrl:searchText", $scope.searchText);
                    }
                };

                $scope.clickSearchTextClear = function () {
                    $scope.searchText = "";
                    $rootScope.$broadcast("notebookListCtrl:initSearch");
                };

                $scope.$on(controllerName + ":selectNote", function (e, noteObj) {
                    $scope.note = noteObj;
                });

                $scope.$watch('note', function (newValue, oldValue) {
                    //if ( !_.isEmpty(oldValue) && oldValue.id > 0 ) {
                    //    $scope.saveNote(oldValue);
                    //}
                });
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

