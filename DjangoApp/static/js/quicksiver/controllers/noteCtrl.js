(function (angular, $, _, console) {
    angular.module('quicksilver.controller')
        .controller('noteCtrl', [
            '$scope', 'noteSvc',
            function ($scope, noteSvc) {
                $scope.options = {
                    lang: 'ko-KR',
                    height: 550,
                    minHeight: null,             // set minimum height of editor
                    maxHeight: null,             // set maximum height of editor
                    focus: true,
                    tabsize: 4
                };

                $scope.note = noteSvc.getNote();
        }]);
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

