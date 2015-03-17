// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var lockup = angular.module('lockup', ['ionic', 'firebase']);

var fb = new Firebase("https://lockup.firebase.io");

lockup.factory("$cipherFactory", function () {

    return {

        encrypt: function (message, password) {

            var salt = forge.random.getBytesSync(128);
            var key = forge.pkcs5.pbkdf2(password, salt, 4, 16);
            var iv = forge.random.getBytesSync(16);
            var cipher = forge.cipher.createCipher('AES-CBC', key);
            cipher.start({iv: iv});
            cipher.update(forge.util.createBuffer(message));
            cipher.finish();

            var cipherText = forge.util.encode64(cipher.output.getBytes());
            return {

                cipher_text: cipherText,
                salt: forge.util.encode64(salt),
                iv: forge.util.encode64(iv)

            }

        }, decrypt : function (cipherText, password, salt, iv, options) {

            var key = forge.pkcs5.pbkdf2(password, forge.util.decode64(salt), 4, 16);

        }

    }

});

lockup.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
