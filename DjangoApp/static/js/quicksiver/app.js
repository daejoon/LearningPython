(function (angular, $, _, console) {
    angular.module('quicksilver', ['ngRoute', 'quicksilver.controller', 'quicksilver.service']);
    angular.module('quicksilver.controller' , ['summernote', 'ng-context-menu', 'quicksilver.service']);
    angular.module('quicksilver.service' , []);

    angular.module('quicksilver')
        .config(['$routeProvider', function ($routeProvider) {
            console.debug("config");
            $routeProvider
                .when("/note", {templateUrl: 'quicksilver/tpl/note', controller: 'noteCtrl'});
        }])
        .run(function() {
            console.debug("run");
            location.href = "#/note";
        });
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});
