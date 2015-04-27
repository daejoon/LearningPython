;
(function (angular, $, _, console) {
    angular.module('quicksilver.service')
        .factory('quicksilverModelSvc', [
            function() {

            var _copyModel = function(setting) {
                return _.extendOwn({}, _.omit(setting||{}, '$$hashKey') );
            };

            return {
                createNoteBook: function(setting) {
                    return _.extendOwn({
                        id: 0,
                        title: 'untitle',
                        isDelete: false,
                        isModify: false,
                        regDate: '',
                        modifyDate: '',
                        deleteDate: '',
                        noteCnt: 0
                    }, setting||{});
                },
                createNote: function(setting) {
                    return _.extendOwn({
                        id: 0,
                        title: 'untitle',
                        content: '',
                        isDelete: false,
                        regDate: '',
                        modifyDate: '',
                        deleteDate: '',
                        notebook_id: 0
                    }, setting||{});
                },
                copyNoteBook: function(setting) {
                    return _copyModel(setting);
                },
                copyNote: function(setting) {
                    return _copyModel(setting);
                }

            };
        }])
        .factory('notebookListSvc', [
            '$http', 'quicksilverModelSvc',
            function ($http, quicksilverModelSvc) {

            return {
                getNoteBookList: function() {
                    return $http.get("/quicksilver/notebook");
                },
                addNoteBook: function(notebook) {
                    return $http.put("/quicksilver/notebook", {data:quicksilverModelSvc.copyNote(notebook)});
                },
                deleteNoteBook: function(notebook) {
                    return $http.delete("/quicksilver/notebook", notebook);
                },
                getTrashNoteList: function() {
                    return $http.get("/quicksilver/trash");
                }
            };
        }])
        .factory('noteListSvc', [
            '$http',
            function ($http) {

            return {
                getNoteList: function(notebook_id) {
                    return $http.get("/quicksilver/notelist/"+notebook_id);
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
                getNote: function(note_id) {
                    return $http.get("/quicksilver/note/" + note_id);
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

