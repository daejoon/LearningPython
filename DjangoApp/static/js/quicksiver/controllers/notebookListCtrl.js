(function (angular, $, _, console) {
    angular.module('quicksilver.controller')
        .controller('notebookListCtrl',[
            '$scope', '$rootScope', '$element', '$q', 'notebookListSvc',
            function($scope, $rootScope, $element, $q, notebookListSvc) {

                $scope.notebookList = [];
                $scope.notebookListIndex = -1;

                $q.all([notebookListSvc.getNoteBookList(), notebookListSvc.getTrashNoteList()])
                    .then(function (resultArray) {
                        $scope.notebookList.concat(resultArray[0].data.data);
                        $scope.notebookList.push({
                            title: 'Trash',
                            noteCnt: resultArray[1].data.data.length,
                            isModify: false
                        })
                    });

                $scope.newNotebook = function () {
                    $scope.notebookList.unshift({
                        title: 'untitle', noteCnt:0, isModify:false
                    })
                };

                $scope.showContextMenu = function ($index) {
                    // 마지막 요소인지 검사한다.
                    if ( $index+1 === $scope.notebookList.length ) {
                        $("#notebook-contextmenu")
                                .find("li")
                                .hide()
                            .end()
                                .find("li")
                                .last()
                                .show();
                    } else {
                        $("#notebook-contextmenu")
                                .find("li")
                                .show()
                            .end()
                                .find("li")
                                .last()
                                .hide();
                    }
                    $scope.notebookListIndex = $index;
                };

                $scope.hideContextMenu = function ($index) {
                    console.log($index);
                };

                $scope.selectNotebook = function ($index) {
                    console.log($index);
                    $scope.notebookListIndex = $index;

                    // Trash 아니라면 ...
                    if ( $scope.notebookList.length-1 !== $scope.notebookListIndex ) {
                        var currnetNotebook = $scope.notebookList[$index];
                        $rootScope.$broadcast("notebookCtrl:selectNotebook", currnetNotebook);
                    }
                };

                $scope.keyPress = function (e) {
                    if ( e.which === 13 ) {
                        $scope.notebookList[$scope.notebookListIndex].isModify = false;
                    }
                };

                $scope.doModify = function ($index) {
                    $scope.notebookListIndex = $index;
                    if ( $scope.notebookList.length-1 === $scope.notebookListIndex ) {
                        $scope.notebookList[$index].isModify = false;
                    } else {
                        $scope.notebookList[$index].isModify = true;
                    }
                };

                $scope.$on("notebookCtrl:renameNotebook", function (e) {
                    $scope.notebookList[$scope.notebookListIndex].isModify = true;
                });

                $scope.$on("notebookCtrl:deleteNotebook", function (e) {
                    $scope.notebookList.splice($scope.notebookListIndex,1);
                });

                $scope.$on("notebookCtrl:emptyTrash", function (e) {
                    $scope.notebookList[$scope.notebookList.length-1].noteCnt = 0;
                });
        }])
        .controller('notebookContextMenuCtrl', [
            '$scope', '$rootScope', '$element',
            function($scope, $rootScope, $element) {
                $scope.renameNotebook = function () {
                    $rootScope.$broadcast("notebookCtrl:renameNotebook");
                    $element.removeClass("open");
                };

                $scope.deleteNotebook = function () {
                    $rootScope.$broadcast("notebookCtrl:deleteNotebook");
                    $element.removeClass("open");
                };

                $scope.emptyTrash = function () {
                    $rootScope.$broadcast("notebookCtrl:emptyTrash");
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

