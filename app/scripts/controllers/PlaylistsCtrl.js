(function() {
    function PlaylistsCtrl(Fixtures, SongPlayer) {
      this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('PlaylistsCtrl', ['Fixtures', 'SongPlayer', PlaylistsCtrl]);
})();
