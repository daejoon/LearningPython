;
(function (angular, $, _, console) {
    var modduleName = "quicksilver.controller";
    var controllerName = "noteListCtrl";

    angular
        .module(modduleName)
        .controller(controllerName, [
            '$scope', '$rootScope', '$timeout', '$q', 'noteListSvc', 'noteSvc', 'quicksilverModelSvc',
            function($scope, $rootScope, $timeout, $q, noteListSvc, noteSvc, quicksilverModelSvc) {
                $scope.noteList = [];
                $scope.noteListIndex = -1;
                $scope.currentNotebook = quicksilverModelSvc.createNoteBook();
                $scope.notebookType = "";

                /**
                 * 메뉴가 보일때
                 * @param $index
                 */
                $scope.showContextMenu = function ($index) {
                    $scope.noteListIndex = $index;

                    // 마지막 요소인지 검사한다.
                    if ( $scope.notebookType.toLowerCase() === "trash") {
                        $("#note-contextmenu")
                                .find("li")
                                .hide()
                            .end()
                                .find("li")
                                .last()
                                .show();
                    } else if ($scope.notebookType.toLowerCase() === "notebook") {
                        $("#note-contextmenu")
                                .find("li")
                                .show();
                    } else if ( $scope.notebookType.toLowerCase() === "search" ) {
                        $("#note-contextmenu")
                                .find("li")
                                .hide()
                            .end()
                                .find("li")
                                .last()
                                .show();
                    }
                };

                /**
                 * 새로운 노트를 추가한다.
                 * @param $event
                 */
                $scope.addNote = function (newNote) {
                    if ( $scope.currentNotebook.id > 0 ) {
                        newNote = newNote || quicksilverModelSvc.createNote();
                        newNote.notebook = $scope.currentNotebook.id;
                        newNote.id = 0;
                        noteSvc.addNote(newNote)
                            .success(function (data, status, headers, config) {
                                $scope.noteList.unshift(quicksilverModelSvc.copyNote(data.data));
                                $scope.selectNote(0);
                                $scope.currentNotebook.noteCnt++;

                                $rootScope.$broadcast('recentNoteListCtrl:changeNoteList');
                            });
                    }
                };

                /**
                 * 리스트에서 노트를 선택한다.
                 * @param $index
                 */
                $scope.selectNote = function($index) {
                    $scope.noteListIndex = $index;
                    $rootScope.$broadcast("noteCtrl:selectNote", $scope.noteList[$index]);
                    _.each($scope.noteList, function (val, idx) {
                        val.isFocus = (idx === $index)?true:false;
                    });
                };

                /**
                 * 노트를 복사할때 이벤트
                 */
                $scope.$on("noteListCtrl:duplicateNote", function (e) {
                    var copyItem = $scope.noteList[$scope.noteListIndex];
                    $scope.addNote(copyItem);
                });

                /**
                 * 노트를 삭제할때 이벤트
                 */
                $scope.$on("noteListCtrl:deleteNote", function (e) {
                    var deleteNote = $scope.noteList[$scope.noteListIndex];
                    var fnName = "deleteNote";

                    switch ($scope.notebookType.toLowerCase()) {
                        case "notebook":
                        case "search":
                            fnName = "deleteNote";
                            break;
                        case "trash":
                            fnName = "trashDeleteNote";
                            break;
                    }

                    noteSvc[fnName](deleteNote)
                        .success(function (data, status, headers, config) {
                            $rootScope.$broadcast('recentNoteListCtrl:changeNoteList');
                            $rootScope.$broadcast('notebookListCtrl:changeNoteCnt', {
                                notebook_id: deleteNote.notebook,
                                notebookType: $scope.notebookType
                            });
                            $scope.noteList.splice($scope.noteListIndex,1);
                            $scope.selectNote(0);
                        })
                        .error(function(data, status) {
                            console.log(status);
                        });
                });

                /**
                 * 노트북이 선택되었을때 이벤트
                 */
                $scope.$on("noteListCtrl:selectNotebook", function (e, notebookObj, note) {
                    $scope.currentNotebook = notebookObj;

                    noteListSvc.getNoteList(notebookObj.id && notebookObj.id || 0)
                        .success(function (data, status, headers, config) {
                            var index = -1;
                            $scope.notebookType = data.notebookType;

                            $scope.noteList = [];
                            _.each(data.data, function (val, idx) {
                                if (_.isObject(note) && note.id === val.id ) {
                                    index = idx;
                                }
                                $scope.noteList.push(quicksilverModelSvc.createNote(val));
                            });

                            if ( $scope.noteList.length > 0 ) {
                                if ( _.isObject(note) ) {
                                    $scope.selectNote(index);
                                } else {
                                    $scope.selectNote(0);
                                }
                            }
                        });
                });

                /**
                 * 이전 노트로 이동
                 */
                $scope.$on(controllerName + ":prevNote", function (e) {
                    if ( $scope.noteListIndex > 0 ) {
                        $scope.selectNote($scope.noteListIndex - 1);
                    }
                });

                /**
                 * 이후 노트로 이동
                 */
                $scope.$on(controllerName + ":nextNote", function (e) {
                    if ( $scope.noteListIndex < $scope.noteList.length-1 ) {
                        $scope.selectNote($scope.noteListIndex + 1);
                    }
                });

                /**
                 * 검색
                 */
                $scope.$on(controllerName + ":searchText", function (e, searchText) {
                    noteListSvc.getNoteListSearch(searchText)
                        .success(function (data, status, headers, config) {
                            $scope.notebookType = data.notebookType;

                            $scope.noteList = [];
                            _.each(data.data, function (val, idx) {
                                $scope.noteList.push(quicksilverModelSvc.createNote(val));
                            });
                            $scope.selectNote(0);
                        });
                });

                /**
                 * 현재 노트북을 감시한다.
                 */
                $scope.$watch('currentNotebook', function (newValue, oldValue) {
                    console.log("watch currentNotebook newValue=" + newValue + ", oldValue=" + oldValue);
                }, true);

                /**
                 * 노트리스트를 감시한다.
                 */
                $scope.$watchCollection('noteList', function (newValue, oldValue) {
                    $rootScope.$broadcast('recentNoteListCtrl:changeNoteList');
                });
        }])
        .controller('noteContextMenuCtrl', [
            '$scope', '$rootScope', '$element',
            function($scope, $rootScope, $element) {
                $scope.duplicateNote = function ($event) {
                    $rootScope.$broadcast(controllerName + ":duplicateNote");
                    $element.removeClass("open");
                };

                $scope.deleteNote = function ($event) {
                    $rootScope.$broadcast(controllerName + ":deleteNote");
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

