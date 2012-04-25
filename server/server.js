Meteor.startup(function () {
  Meteor.publish("messages", function(room_key) {
    return Messages.find({room_key: room_key}, {
      fields: {room_key: false},
      sort: {timestamp: -1},
      limit: 50
    });
  });
  // Disable synchronized client-side writes. Writes controlled via Meteor.call invokations.
  Meteor.default_server.method_handlers['/messages/insert'] = function (data) {
    Messages.insert({
        room_key: data.room_key,
        screenname: data.screenname,
        chattext: data.chattext, 
        timestamp: new Date().getTime()
    });
  };
});