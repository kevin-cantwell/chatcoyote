Meteor.startup(function () {
  // I find it a common op to check if a document
  // exists and if not, create it.
  _.each([Users, UserSessions, Rooms], function(collection) {
    collection.findsert = function(doc) {
      var existing = collection.findOne(doc);
      return existing ? existing._id : collection.insert(doc);
    }
  });
});