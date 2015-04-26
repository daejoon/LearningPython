(function (angular, $, _, console) {
    angular
        .module('Home', ['ngRoute', 'summernote', 'ng-context-menu'])
        .config(function ($routeProvider) {
            console.debug("config");
            $routeProvider
                .when("/content", {templateUrl: 'quicksilver/tpl/content', controller: 'contentCtrl'});
        })
        .run(function() {
            console.debug("run");
            location.href = "#content";
        })
        .controller('notebookCtrl', ['$scope', '$element', function($scope, $element) {
            $scope.notebookList = [
                {title: 'Java', noteCnt:1, isModify:false},
                {title: 'Python', noteCnt:10, isModify:false},
                {title: 'AngularJs', noteCnt:20, isModify:false},
                {title: 'Trash', noteCnt:5, isModify:false}
            ];

            $scope.recentNoteList = [
                {title: 'Python이란', regDate:'2015.01.08'},
                {title: 'Django', regDate:'2015.01.08'},
                {title: '클래스', regDate:'2015.01.08'},
            ];

            $scope.newNotebook = function () {
                $scope.notebookList.unshift({
                    title: 'untitle', noteCnt:0, isModify:false
                })
            };

            $scope.notebookListIndex = -1;


            $scope.hello = function () {
                alert("Hello, AngularJS");
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
            };

            $scope.keyPress = function (e) {
                if ( e.which === 13 ) {
                    $scope.notebookList[$scope.notebookListIndex].isModify = false;
                }
            };

            $scope.doModify = function ($index) {
                $scope.notebookListIndex = $index;
                $scope.notebookList[$index].isModify = true;
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
        .controller('notebookContextMenuCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
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
        }])
        .controller('noteCtrl', ['$scope', function($scope) {
            $scope.noteList = [
                {title: 'Python이란', regDate:'2015.01.08'},
                {title: 'Django', regDate:'2015.01.08'},
                {title: '클래스', regDate:'2015.01.08'},
            ];

            $scope.noteListIndex = -1;
            $scope.showContextMenu = function ($index) {
                console.log($index);
                $scope.noteListIndex = $index;
            };

            $scope.newNote = function ($event) {
                $scope.noteList.unshift({
                    title: 'untitle',
                    regDate: Date.now()
                });
            };

            $scope.$on("noteCtrl:duplicateNote", function (e) {
                var copyItem = $scope.noteList[$scope.noteListIndex];
                $scope.noteList.unshift({
                    title: copyItem.title,
                    regDate: copyItem.regDate
                });

            });

            $scope.$on("noteCtrl:deleteNote", function (e) {
                $scope.noteList.splice($scope.noteListIndex,1);
            });
        }])
        .controller('noteContextMenuCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
            $scope.duplicateNote = function ($event) {
                $rootScope.$broadcast("noteCtrl:duplicateNote");
                $element.removeClass("open");
            };

            $scope.deleteNote = function ($event) {
                $rootScope.$broadcast("noteCtrl:deleteNote");
                $element.removeClass("open");
            };
        }])
        .controller('contentCtrl', ['$scope', function ($scope) {
            $scope.options = {
                lang: 'ko-KR',
                height: 550,
                minHeight: null,             // set minimum height of editor
                maxHeight: null,             // set maximum height of editor
                focus: true,
                tabsize: 4
            };

            $scope.note = {
                title: '파이썬의 이해?',
                content: '파이썬은 쉽고 재미있습니다.'
            };
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

