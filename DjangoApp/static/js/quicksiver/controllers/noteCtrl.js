;
(function (angular, $, _, console) {
    angular.module('quicksilver.controller')
        .controller('noteCtrl', [
            '$scope', '$q', 'noteSvc',
            function ($scope, $q, noteSvc) {
                $scope.options = {
                    lang: 'ko-KR',
                    height: 550,
                    minHeight: null,             // set minimum height of editor
                    maxHeight: null,             // set maximum height of editor
                    focus: true,
                    tabsize: 4
                };
                $scope.note = {};

                $scope.$on("noteCtrl:selectNote", function (e, noteObj) {
                    $scope.note = noteObj;
                });
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

