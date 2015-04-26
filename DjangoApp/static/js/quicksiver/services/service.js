(function (angular, $, _, console) {
    angular.module('quicksilver.service')
        .factory('notebookListSvc', [function () {
            var data = [
                {title: 'Java', noteCnt:1, isModify:false},
                {title: 'Python', noteCnt:10, isModify:false},
                {title: 'AngularJs', noteCnt:20, isModify:false},
                {title: 'Trash', noteCnt:5, isModify:false}
            ];

            return {
                getNoteBookList: function() {
                    return data;
                }
            };
        }])
        .factory('noteListSvc', [function () {
            var data = [
                {title: 'Python이란', regDate:'2015.01.08'},
                {title: 'Django', regDate:'2015.01.08'},
                {title: '클래스', regDate:'2015.01.08'},
            ];

            return {
                getNoteList: function() {
                    return data;
                }
            };
        }])
        .factory('recentNoteListSvc', [function () {
            var data = [
                {title: 'Python이란', regDate:'2015.01.08'},
                {title: 'Django', regDate:'2015.01.08'},
                {title: '클래스', regDate:'2015.01.08'},
            ];

            return {
                getRecentNoteList: function() {
                    return data;
                }
            };
        }])
        .factory('noteSvc', [function () {
            var data = {
                title: '파이썬의 이해?',
                content: '파이썬은 쉽고 재미있습니다.<br/>마누라가 무서워요'
            };

            return {
                getNote: function() {
                    return data;
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

