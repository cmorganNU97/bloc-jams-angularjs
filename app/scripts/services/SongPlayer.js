(function() {
    function SongPlayer(Fixtures) {

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

            SongPlayer.currentSong = song;
        };

/**
* @function playSong
* @desc Plays the selected song
* @param {Object} song
*/
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
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
* @function play method for SongPlayer
* @desc Plays song when it's clicked if its a new song or the player is paused
* @param {Object} song
*/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
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
* @function previous method for SongPlayer
* @desc When previous button is clicked the song prior to the current song is played
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            };
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
