Meteor.startup(function () {
  Meteor.publish("messages", function(room_key) {
    return Messages.find({room_key: room_key}, {
      fields: {room_key: false}
    });
  });
  // Disable synchronized client-side writes. Writes controlled via Meteor.call invokations.
  _.each(['messages'], function(collection) {
    _.each(['insert', 'update', 'remove'], function(method) {
      Meteor.default_server.method_handlers['/' + collection + '/' + method] = function() {};
    });
  });
});

Meteor.methods({
  // Method call since write access is protected
  insert_message: function(attr) {
    var now = new Date();
    console.log("[" + now.toJSON() + "] insert_message:" + JSON.stringify(attr));
    return Messages.insert({
      room_key: attr.room_key,
      screenname: attr.screenname,
      chattext: attr.chattext, 
      timestamp: now.getTime()
    });
  }
});