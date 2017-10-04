(function() {
    function SongPlayer() {

/**
* @desc songPlayer Object that contains factory PlaySong methods
* @type {Object}
*/
        var SongPlayer = {};

/**
* @desc Song that is currently playing
* @type {Object}
*/
        var currentSong = null;

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
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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
* @function play method for SongPlayer
* @desc Plays song when it's clicked if its a new song or the player is paused
* @param {Object} song
*/
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };

/**
* @function pause method for SongPlayer
* @desc When pause button is clicked, the song is paused
* @param
*/
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
