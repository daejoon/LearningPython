;
(function (angular, $, _, console) {
    var moduleName = "quicksilver.service";

    angular.module(moduleName)
        .factory('quicksilverModelSvc', [
            function() {

            var _removeHashkey = function(setting) {
                return _.omit(setting||{}, '$$hashKey');
            };

            return {
                createNoteBook: function(setting) {
                    return _.extendOwn({
                        id: 0,
                        type: 'notebook', // notebook, search, trash 3가지 종류
                        title: 'Untitled Notebook',
                        isDelete: false,
                        isModify: false,
                        isFocus: false,
                        regDate: '',
                        modifyDate: '',
                        deleteDate: '',
                        noteCnt: 0
                    }, setting||{});
                },
                createNote: function(setting) {
                    return _.extendOwn({
                        id: 0,
                        title: 'Untitled Note',
                        content: '',
                        isDelete: false,
                        isFocus: false,
                        regDate: '',
                        modifyDate: '',
                        deleteDate: '',
                        notebook: 0 // NoteBook의 id
                    }, setting||{});
                },
                copyNoteBook: function(setting, bDeleteHashKey) {
                    if ( bDeleteHashKey || true ) {
                        setting = _removeHashkey(setting)
                    }
                    return this.createNoteBook(setting);
                },
                copyNote: function(setting, bDeleteHashKey) {
                    if ( bDeleteHashKey || true ) {
                        setting = _removeHashkey(setting)
                    }
                    return this.createNote(setting);
                }
            };
        }])
        .factory('notebookListSvc', [
            '$http',
            function ($http) {

            return {
                getNoteBookList: function() {
                    return $http.get("/quicksilver/notebook");
                },
                addNoteBook: function(notebook) {
                    return $http.put("/quicksilver/notebook", {data:notebook});
                },
                deleteNoteBook: function(notebook) {
                    return $http.delete("/quicksilver/notebook/"+notebook.id);
                },
                getTrashNoteList: function() {
                    return $http.get("/quicksilver/trash");
                },
                deleteTrashNoteList: function() {
                    return $http.delete("/quicksilver/trash");
                }
            };
        }])
        .factory('noteListSvc', [
            '$http',
            function ($http) {

            return {
                getNoteList: function(notebook_id) {
                    return $http.get("/quicksilver/notelist/"+notebook_id);
                },
                getNoteListSearch: function(searchText) {
                    return $http.get("/quicksilver/notelist/search/"+searchText);
                }
            };
        }])
        .factory('recentNoteListSvc', [
            '$http',
            function ($http) {

            return {
                getRecentNoteList: function() {
                    return $http.get("/quicksilver/recentnote");
                }
            };
        }])
        .factory('noteSvc', [
            '$http',
            function ($http) {

            return {
                getNote: function(noteObj) {
                    return $http.get("/quicksilver/note/" + noteObj.id);
                },
                addNote: function(noteObj) {
                    return $http.put("/quicksilver/note", {data:noteObj});
                },
                deleteNote: function(noteObj) {
                    return $http.delete("/quicksilver/note/"+noteObj.id);
                },
                trashDeleteNote: function(noteObj) {
                    return $http.delete("/quicksilver/trash/" + noteObj.id);
                }
            };
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

