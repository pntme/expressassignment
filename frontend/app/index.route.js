(function() {
    'use strict';
    angular.module('node')
            .config(function($stateProvider, $urlRouterProvider) {
                $stateProvider.
                        state('form', {
                            url: '/form',
                            templateUrl: "app/form/form.html",
                            controller: 'formCtrl'
                        });
                $urlRouterProvider.otherwise('/form');
            });
})();