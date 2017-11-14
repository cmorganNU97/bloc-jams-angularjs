//angular.module('blocJams', ['ui.router']);
(function() {
    function config($stateProvider, $locationProvider) {
      $locationProvider
        .html5Mode({
          enabled: true,
          requireBase: false
        });

      $stateProvider
        .state('landing', {
          url: '/',
          controller: 'LandingCtrl as landing',
          templateUrl: '/templates/landing.html'
        })

        .state('album', {
          url: '/album',
          controller: 'AlbumCtrl as album',
          templateUrl: '/templates/album.html'
        })

        .state('collection', {
          url: '/collection',
          controller: 'CollectionCtrl as collection',
          templateUrl: '/templates/collection.html'
        })

        .state('playlists', {
          url: '/playlists',
          controller: 'PlaylistsCtrl as playlists',
          templateUrl: '/templates/playlists.html'
        });
    }

    angular.module('blocJams', ['ui.router']);
      angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
