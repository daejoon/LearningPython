;
(function (angular, $, _, console) {
    angular.module('quicksilver', ['ngRoute', 'quicksilver.controller', 'quicksilver.service']);
    angular.module('quicksilver.controller' , ['summernote', 'ng-context-menu', 'quicksilver.service']);
    angular.module('quicksilver.service' , []);

    angular.module('quicksilver')
        .config([
            '$routeProvider', '$httpProvider',
            function ($routeProvider, $httpProvider) {
                console.debug("config");
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

                $routeProvider
                    .when("/note", {templateUrl: 'quicksilver/tpl/note', controller: 'noteCtrl'});
            }])
        .run(function() {
            location.href = "#/note";
        });
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});
