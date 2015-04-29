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
                    height: 550,
                    minHeight: null,             // set minimum height of editor
                    maxHeight: null,             // set maximum height of editor
                    focus: true,
                    tabsize: 4
                };
                $scope.note = {};

                var note_title_id = "#note-title";

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

                $scope.$on(controllerName + ":selectNote", function (e, noteObj) {
                    $scope.note = noteObj;
                    $timeout(function () {
                        $(note_title_id).trigger("select");
                    }, 100);
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

