;
(function (angular, $, _, console) {
    var moduleName = 'quicksilver.controller';
    var controllerName = 'noteCtrl';
    angular.module(moduleName)
        .controller(controllerName, [
            '$scope', '$rootScope', '$q', 'noteSvc',
            function ($scope, $rootScope, $q, noteSvc) {
                $scope.options = {
                    lang: 'ko-KR',
                    height: 550,
                    minHeight: null,             // set minimum height of editor
                    maxHeight: null,             // set maximum height of editor
                    focus: true,
                    tabsize: 4
                };
                $scope.note = {};

                $scope.saveNote = function (noteObj) {
                    noteSvc.addNote(noteObj)
                        .success(function (data, status, headers, config) {
                            $rootScope.$broadcast("recentNoteListCtrl:changeNoteList");
                        })
                        .error(function (data, status, headers, config) {
                            console.log(status);
                        });
                };

                $scope.onBlur = function ($event) {
                    console.log("note onBlur");

                    $scope.saveNote($scope.note);
                };

                $scope.prevNote = function () {
                    $rootScope.$broadcast("noteListCtrl:prevNote");
                };

                $scope.nextNote = function () {
                    $rootScope.$broadcast("noteListCtrl:nextNote");
                };

                $scope.$on("noteCtrl:selectNote", function (e, noteObj) {
                    $scope.note = noteObj;
                });

                $scope.$watch('note', function (newValue, oldValue) {
                    console.log('watch note!!');
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

