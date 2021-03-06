(function() {
    function SongPlayer($rootScope, Fixtures) {

/**
* @desc songPlayer Object that contains factory PlaySong methods
* @type {Object}
*/
        var SongPlayer = {};

/**
* @desc Current album playing
* @type {Object}
*/
        var currentAlbum = Fixtures.getAlbum();

/**
* @desc Buzz object aduio file
* @type {Object}
*/
        var currentBuzzObject = null;

/**
* @function setSong
* @desc Stop currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;

        };

/**
* @function playSong
* @desc Plays the selected song
* @param {Object} song
*/
        var playSong = function() {
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        };

/**
* @function stopSong
* @desc Stops playing selected song
* @param {Object} song
*/

        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = false;
        };

/**
* @function getSongIndex
* @desc Gets the index of the currently playing song
* @param {Object} song
* @returns {index}
*/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

/**
* @desc Song that is currently playing
* @type {Object}
*/
        SongPlayer.currentSong = null;

/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
         SongPlayer.currentTime = null;

/**
* @desc Current volume of the song player
* @type {Number}
*/

        SongPlayer.currentVolume = 50;

/**
* @desc Maximum volume of the song player
* @type {Number}
*/

        SongPlayer.maxVolume = 100;

/**
* @function play method for SongPlayer
* @desc Plays song when it's clicked if its a new song or the player is paused
* @param {Object} song
*/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong();

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            }
        };

/**
* @function pause method for SongPlayer
* @desc When pause button is clicked, the song is paused
* @param {Object} song
* @returns {SongPlayer}
*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

/**
* @function next method for SongPlayer
* @desc When the next button is clicked the next song is played
*/

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            };
        };

/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/

      SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
          }
      };

/**
* @functionn setCurrentVolume
* @desc Sets the volume of the thumbwheel to the player's volume
*/
        SongPlayer.setCurrentVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
                SongPlayer.currentVolume = currentBuzzObject.getVolume();
            }
        };


/**
* @function previous method for SongPlayer
* @desc When previous button is clicked the song prior to the current song is played
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            };
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
