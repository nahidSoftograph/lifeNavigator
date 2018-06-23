var assert = require('assert');

var findAllUser = function(db, callback) {
    var collection = db.collection('users');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

var findSingleUser = function(db, id, callback) {
    var collection = db.collection('users');

    collection.find({"_id": id}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

module.exports = {
    findAllUser,
    findSingleUser
};