(function (angular, $, _, console) {
    angular.module('quicksilver.controller')
        .controller('noteListCtrl', [
            '$scope', '$q', 'noteListSvc',
            function($scope, $q, noteListSvc) {
                $scope.noteList = [];
                $scope.noteListIndex = -1;

                $scope.showContextMenu = function ($index) {
                    console.log($index);
                    $scope.noteListIndex = $index;
                };

                $scope.newNote = function ($event) {
                    $scope.noteList.unshift({
                        title: 'untitle',
                        regDate: ''
                    });
                };

                $scope.$on("noteListCtrl:duplicateNote", function (e) {
                    var copyItem = $scope.noteList[$scope.noteListIndex];
                    $scope.noteList.unshift({
                        title: copyItem.title,
                        regDate: copyItem.regDate
                    });

                });

                $scope.$on("noteListCtrl:deleteNote", function (e) {
                    $scope.noteList.splice($scope.noteListIndex,1);
                });

                $scope.$on("notebookCtrl:selectNotebook", function (e, notebookObj) {
                    noteListSvc.getNoteList(notebookObj.id && notebookObj.id || 0)
                        .success(function (data, status, headers, config) {
                            $scope.noteList = data.data;
                        });
                });
        }])
        .controller('noteContextMenuCtrl', [
            '$scope', '$rootScope', '$element',
            function($scope, $rootScope, $element) {
                $scope.duplicateNote = function ($event) {
                    $rootScope.$broadcast("noteListCtrl:duplicateNote");
                    $element.removeClass("open");
                };

                $scope.deleteNote = function ($event) {
                    $rootScope.$broadcast("noteListCtrl:deleteNote");
                    $element.removeClass("open");
                };
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

