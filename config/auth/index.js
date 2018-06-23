// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1717658845204530', // your App ID
        'clientSecret'    : '0b459b3ee7f8ec28cc9d74f092316e30', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'AqH8NemIzrdbTZ6sJCraD5Sx5',
        'consumerSecret'     : 'lgB5lUOzEJSwVuTESweNSeB40zWjdLmma6rVRKmpKiGYccNsuy',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '772050956594-6fu8up1fnjdkt1cnjeol0eb1cg6uv9v3.apps.googleusercontent.com',
        'clientSecret'     : 'RBTwNNrceTjaeJvmCyKDsYqV',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
